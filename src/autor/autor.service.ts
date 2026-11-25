import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateAutorDto } from './dto/create-autor.dto.js';
import { UpdateAutorDto } from './dto/update-autor.dto.js';

@Injectable()
export class AutorService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateAutorDto) {
    return this.prisma.autor.create({ data });
  }

  findAll() {
    return this.prisma.autor.findMany({ orderBy: { nombre: 'asc' } });
  }

  async findOne(id: number) {
    const autor = await this.prisma.autor.findUnique({
      where: { id },
      include: { libros: true },
    });
    if (!autor) {
      throw new NotFoundException(`El autor ${id} no existe`);
    }
    return autor;
  }

  async update(id: number, data: UpdateAutorDto) {
    await this.findOne(id);
    return this.prisma.autor.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.autor.delete({ where: { id } });
  }
}
