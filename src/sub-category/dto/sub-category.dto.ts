import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsOptional, IsString } from 'class-validator';

export class SubCategoryCreateDto {
  @ApiProperty()
  @IsString()
  sub_category_name: string;

  @ApiProperty()
  @IsString()
  category_id: string
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
  category_id?: string
}

export class SubCategoryDeleteDto {
  @ApiProperty()
  @IsString()
  id: string;
}

export class SubCategoryByIdDto {
	@ApiProperty()
	@IsString()
	@IsDefined()
	id: string;
}