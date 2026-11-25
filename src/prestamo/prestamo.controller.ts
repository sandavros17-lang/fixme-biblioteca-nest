import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { PrestamoService } from './prestamo.service.js';
import { CreatePrestamoDto } from './dto/create-prestamo.dto.js';

@Controller('prestamos')
export class PrestamoController {
  constructor(private readonly prestamoService: PrestamoService) {}

  @Post()
  create(@Body() createPrestamoDto: CreatePrestamoDto) {
    return this.prestamoService.create(createPrestamoDto);
  }

  @Get()
  findAll() {
    return this.prestamoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.prestamoService.findOne(id);
  }

  @Get('vencidos')
  findVencidos() {
    return this.prestamoService.findVencidos();
  }

  @Patch(':id/devolver')
  devolver(@Param('id', ParseIntPipe) id: number) {
    return this.prestamoService.devolver(id);
  }
}
