import { Module } from '@nestjs/common';
import { AutorController } from './autor.controller.js';
import { AutorService } from './autor.service.js';

@Module({
  controllers: [AutorController],
  providers: [AutorService],
})
export class AutorModule {}
