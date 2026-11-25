import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateLibroDto {
  @ApiProperty({ example: 'Cien años de soledad' })
  @IsString()
  @IsNotEmpty()
  titulo!: string;

  @ApiProperty({ example: '978-0307474728' })
  @IsString()
  @IsNotEmpty()
  isbn!: string;

  @ApiProperty({ example: 1967 })
  anioPublicacion!: number;

  @ApiProperty({ example: 3, description: 'Ejemplares disponibles' })
  @IsInt()
  @Min(0)
  stock!: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsPositive()
  autorId!: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsPositive()
  categoriaId!: number;
}
