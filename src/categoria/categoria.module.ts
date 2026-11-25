import { Module } from '@nestjs/common';
import { CategoriaController } from './categoria.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js'
import { CategoriaService } from './categoria.service.js';

@Module({
  imports: [PrismaModule],
  controllers: [CategoriaController],

  providers: [CategoriaService],
})
export class CategoriaModule {}
