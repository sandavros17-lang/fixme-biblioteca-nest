import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class CreateSocioDto {
  @ApiProperty({ example: 'Ana Pérez' })
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @ApiProperty({ example: 'ana@correo.com' })
  @IsEmail()
  email!: string;
}
