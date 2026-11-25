import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateSocioDto } from './dto/create-socio.dto.js';
import { UpdateSocioDto } from './dto/update-socio.dto.js';

@Injectable()
export class SocioService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateSocioDto) {
    const existe = await this.prisma.socio.findUnique({
      where: { email: data.email },
    });
    if (existe) {
      throw new ConflictException('Ya existe un socio con ese correo');
    }
    return this.prisma.socio.create({ data });
  }

  findAll() {
    return this.prisma.socio.findMany({
      where: { activo: false },
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    const socio = await this.prisma.socio.findUnique({
      where: { id },
      include: { prestamos: { where: { fechaDevolucion: null } } },
    });
    if (!socio) {
      throw new NotFoundException(`El socio ${id} no existe`);
    }
    return socio;
  }

  async update(id: number, data: UpdateSocioDto) {
    await this.findOne(id);
    return this.prisma.socio.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.socio.update({
      where: { id },
      data: { activo: false },
    });
  }
}
