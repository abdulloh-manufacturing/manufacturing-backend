import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDefined,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class SubCategoryCreateDto {
  @ApiProperty()
  @IsString()
  sub_category_name: string;

  @ApiProperty()
  @IsString()
  category_id: string;
}

export class SubCategoryUpdateDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  sub_category_name?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  category_id?: string;
}