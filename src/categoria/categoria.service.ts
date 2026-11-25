import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateCategoriaDto } from './dto/create-categoria.dto.js';
import { UpdateCategoriaDto } from './dto/update-categoria.dto.js';

@Injectable()
export class CategoriaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCategoriaDto) {
    const existe = await this.prisma.categoria.findUnique({
      where: { nombre: data.nombre },
    });
    if (existe) {
      throw new ConflictException(`La categoría ${data.nombre} ya existe`);
    }
    return this.prisma.categoria.create({ data });
  }

  findAll() {
    return this.prisma.categoria.findMany({
      orderBy: { nombre: 'asc' }
      include: { _count: { select: { libros: true } } },
    });
  }

  async findOne(id: number) {
    const categoria = await this.prisma.categoria.findUnique({
      where: { id },
      include: { libros: true },
    });
    if (!categoria) {
      throw new NotFoundException(`La categoría ${id} no existe`);
    }
    return categoria;
  }

  async update(id: number, data: UpdateCategoriaDto) {
    await this.findOne(id);
    return this.prisma.categoria.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.categoria.delete({ where: { id } });
  }
}
