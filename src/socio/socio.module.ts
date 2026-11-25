import { Module } from '@nestjs/common';
import { SocioController } from './socio.controller.js';
import { SocioService } from './socio.service.js';
import { PrismaModule } from '../prisma/prisma.module.js'

@Module({
  imports: [PrismaModule],
  controllers: [SocioController],
  providers: [SocioService],
})
export class SocioModule {}
