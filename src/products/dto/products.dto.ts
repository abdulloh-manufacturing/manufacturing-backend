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
  @IsString()
  model_id:string;
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

  @ApiProperty()
  @IsString()
  @IsOptional()
  model_id?:string;
}

export class ProductDeleteDto {
  @ApiProperty()
  @IsString()
  id: string;
}
