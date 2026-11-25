import { Module } from '@nestjs/common';
import { CategoriaController } from './categoria.controller.js';

@Module({
  controllers: [CategoriaController],
  providers: [],
})
export class CategoriaModule {}
