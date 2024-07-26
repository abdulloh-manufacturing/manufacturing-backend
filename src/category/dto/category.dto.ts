import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CategoryCreateDto {
  @ApiProperty()
  @IsString()
  category_name: string;
}
