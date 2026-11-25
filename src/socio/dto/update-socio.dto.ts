import { PartialType } from '@nestjs/mapped-types';
import { CreateSocioDto } from './create-socio.dto.js';

export class UpdateSocioDto extends PartialType(CreateSocioDto) {}
