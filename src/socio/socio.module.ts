import { Module } from '@nestjs/common';
import { SocioController } from './socio.controller.js';
import { SocioService } from './socio.service';

@Module({
  controllers: [SocioController],
  providers: [SocioService],
})
export class SocioModule {}
