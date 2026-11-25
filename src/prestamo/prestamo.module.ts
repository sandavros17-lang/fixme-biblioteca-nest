import { Module } from '@nestjs/common';
import { PrestamoController } from './prestamo.controller.js';
import { PrestamoService } from './prestamo.service.js';

@Module({
  controllers: [PrestamoController],
  providers: [PrestamoService],
})
export class PrestamoModule {}
