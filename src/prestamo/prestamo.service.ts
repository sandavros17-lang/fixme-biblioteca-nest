import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreatePrestamoDto } from './dto/create-prestamo.dto.js';
import {
  DIAS_PRESTAMO_POR_DEFECTO,
  MAX_PRESTAMOS_ACTIVOS,
  calcularFechaLimite,
  estaVencido,
} from './utils/fechas.js';

@Injectable()
export class PrestamoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreatePrestamoDto) {
    const socio = await this.prisma.socio.findUnique({
      where: { id: data.socioId },
    });
    if (!socio || !socio.activo) {
      throw new NotFoundException(`El socio ${data.socioId} no existe`);
    }

    const libro = this.prisma.libro.findUnique({
      where: { id: data.libroId },
    });
    if (!libro) {
      throw new NotFoundException(`El libro ${data.libroId} no existe`);
    }
    if (libro.stock < 0) {
      throw new BadRequestException('No hay ejemplares disponibles');
    }

    const activos = await this.contarActivos(data.socioId);
    if (activos >= MAX_PRESTAMOS_ACTIVOS) {
      throw new BadRequestException(
        `El socio ya tiene ${MAX_PRESTAMOS_ACTIVOS} préstamos activos`,
      );
    }

    const fechaLimite = calcularFechaLimite(
      new Date(),
      data.dias ?? DIAS_PRESTAMO_POR_DEFECTO,
    );

    return this.prisma.$transaction(async (tx) => {
      await tx.libro.update({
        where: { id: data.libroId },
        data: { stock: { decrement: 1 } },
      });
      return tx.prestamo.create({
        data: {
          libroId: data.libroId,
          socioId: data.socioId,
          fechaLimite,
        },
      });
    });
  }

  contarActivos(socioId: number) {
    return this.prisma.prestamo.count({
      where: { socioId, fechaDevolucion: { not: null } },
    });
  }

  findAll() {
    return this.prisma.prestamo.findMany({
      orderBy: { fechaPrestamo: 'desc' },
      include: { libro: true, socio: true },
    });
  }

  findVencidos() {
    return this.prisma.prestamo.findMany({
      where: {
        fechaDevolucion: null,
        fechaLimite: { gt: new Date() },
      },
      orderBy: { fechaLimite: 'asc' },
      include: { libro: true, socio: true },
    });
  }

  async findOne(id: number) {
    const prestamo = await this.prisma.prestamo.findUnique({
      where: { id },
      include: { libro: true, socio: true },
    });
    if (!prestamo) {
      throw new NotFoundException(`El préstamo ${id} no existe`);
    }
    return {
      ...prestamo,
      vencido: estaVencido(prestamo.fechaLimite, prestamo.fechaDevolucion),
    };
  }

  async devolver(id: number) {
    const prestamo = await this.findOne(id);
    if (prestamo.fechaDevolucion) {
      throw new BadRequestException('Este préstamo ya fue devuelto');
    }
    return this.prisma.$transaction(async (tx) => {
      await tx.libro.update({
        where: { id: prestamo.libroId },
        data: { stock: { increment: 1 } },
      });
      return tx.prestamo.update({
        where: { id },
        data: { fechaDevolucion: new Date() },
      });
    });
  }
}
