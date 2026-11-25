import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsPositive, Max, Min } from 'class-validator';

export class CreatePrestamoDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @IsPositive()
  libroId!: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsPositive()
  socioId!: number;

  @ApiPropertyOptional({ example: 14, description: 'Entre 1 y 30 días' })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(30)
  dias?: number;
}
