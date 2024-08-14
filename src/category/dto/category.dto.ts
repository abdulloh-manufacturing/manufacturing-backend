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

export class CategoryCreateDto {
  @ApiProperty()
  @IsString()
  category_name: string;
}

export class CategoryUpdateDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  category_name: string;
}

export class CategoryDeleteDto {
  @ApiProperty()
  @IsString()
  id: string;
}

export class CategoryListDto {
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

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiProperty({ example: 20 })
  @IsNumber()
  @IsOptional()
  limit?: number;
}

export class CategoryByIdDto {
  @ApiProperty()
  @IsString()
  @IsDefined()
  id: string;
}
