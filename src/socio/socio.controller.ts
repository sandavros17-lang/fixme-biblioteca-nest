import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { SocioService } from './socio.service.js';
import { CreateSocioDto } from './dto/create-socio.dto.js';
import { UpdateSocioDto } from './dto/update-socio.dto.js';

@Controller('socios')
export class SocioController {
  constructor(private readonly socioService: SocioService) {}

  @Post()
  create(@Body() createSocioDto: CreateSocioDto) {
    return this.socioService.create(createSocioDto);
  }

  @Get()
  findAll() {
    return this.socioService.findAll();

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.socioService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSocioDto: UpdateSocioDto,
  ) {
    return this.socioService.update(id, updateSocioDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.socioService.remove(id);
  }
}
