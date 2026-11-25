import { Module } from '@nestjs/common';
import { AutorController } from './autor.controller.js';
import { AutorService } from './autor.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [AutorController],
  providers: [AutorService],
})
export class AutorModule {}
