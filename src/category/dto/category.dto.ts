import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

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

export class CategoryByIdDto {
	@ApiProperty()
	@IsString()
	@IsDefined()
	id: string;
}