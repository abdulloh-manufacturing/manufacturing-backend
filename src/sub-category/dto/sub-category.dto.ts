import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SubCategoryCreateDto {
  @ApiProperty()
  @IsString()
  sub_category_name: string;
}

export class SubCategoryUpdateDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  sub_category_name: string;
}

export class SubCategoryDeleteDto {
  @ApiProperty()
  @IsString()
  id: string;
}
