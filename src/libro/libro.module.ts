import { Module } from '@nestjs/common';
import { LibroController } from './libro.controller.js';
import { LibroService } from './libro.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [LibroController],
  providers: [LibroService],
})
export class LibroModule {}
