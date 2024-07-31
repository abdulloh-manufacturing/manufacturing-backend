import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ProductCreateDto {
  @ApiProperty()
  @IsString()
  product_name: string;

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
}

export class ProductUpdateDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  product_name?: string;

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
}

export class ProductDeleteDto {
  @ApiProperty()
  @IsString()
  id: string;
}
