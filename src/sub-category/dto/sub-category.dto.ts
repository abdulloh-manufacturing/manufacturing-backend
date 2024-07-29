import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SubCategoryCreateDto {
  @ApiProperty()
  @IsString()
  category_name: string;

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
  category_name: string;

  @ApiProperty()
  @IsString()
  category_id: string;
}

export class SubCategoryDeleteDto {
  @ApiProperty()
  @IsString()
  id: string;
}
