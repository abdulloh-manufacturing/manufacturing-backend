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

export class SubCategoryDeleteDto {
  @ApiProperty()
  @IsString()
  id: string;
}

export class SubCategoryListDto {
  @ApiProperty()
  @IsOptional()
	@IsString()
	keyword?: string;
  
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

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiProperty({ example: 20 })
  @IsNumber()
  @IsOptional()
  limit?: number;
}

export class SubCategoryByIdDto {
  @ApiProperty()
  @IsString()
  @IsDefined()
  id: string;
}
