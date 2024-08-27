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

export class ProductCreateDto {
  @ApiProperty()
  @IsString()
  category_id: string;

  @ApiProperty()
  @IsString()
  sub_category_id: string;

  @ApiProperty()
  @IsString()
  valume_type_id: string;

  @ApiProperty()
  @IsNumber()
  value: number;

  @ApiProperty()
  @IsString()
  color: string;

  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsString()
  currency_type: string;

  @ApiProperty()
  @IsNumber()
  unique_code: number;
}

export class ProductUpdateDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  category_id?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  sub_category_id?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  valume_type_id?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  value?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  color?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  code?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  currency_type?: string;
}

export class ProductListDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  keyword: string;

  @ApiProperty()
  @IsISO8601()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  from_date: Date | string;

  @ApiProperty()
  @IsISO8601()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  to_date: Date | string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  is_deleted: boolean;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiProperty({ example: 20 })
  @IsNumber()
  @IsOptional()
  limit?: number;
}

//some text for test
