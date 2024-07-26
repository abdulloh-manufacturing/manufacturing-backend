import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

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
