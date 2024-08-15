import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDefined, IsISO8601, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ModelCreateDto {
  @ApiProperty()
  @IsString()
  model_name: string;
}

export class ModelUpdateDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  model_name: string;
}