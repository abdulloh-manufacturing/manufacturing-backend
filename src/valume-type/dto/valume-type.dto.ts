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

export class ValumeTypeDeleteDto {
  @ApiProperty()
  @IsString()
  id: string;
}

export class ValumeTypeListDto {
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

  @ApiProperty({example:1})
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiProperty({example:20})
  @IsNumber()
  @IsOptional()
  limit?: number;
}

export class ValumeTypeByIdDto {
	@ApiProperty()
	@IsString()
	@IsDefined()
	id: string;
}