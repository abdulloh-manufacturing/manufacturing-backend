import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDefined, IsISO8601, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ValumeTypeCreateDto {
  @ApiProperty()
  @IsString()
  valume_type_name: string;

  @ApiProperty()
  @IsString()
  sub_category_id: string;
}

export class ValumeTypeUpdateDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  valume_type_name?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  sub_category_id?: string;
}