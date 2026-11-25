import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSocioDto {
  @ApiProperty({ example: 'Ana Pérez' })
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @ApiProperty({ example: 'ana@correo.com' })
  @IsEmail()
  email!: string;
}
