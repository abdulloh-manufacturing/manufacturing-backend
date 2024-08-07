import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDefined, IsISO8601, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ModelCreateDto {
  @ApiProperty()
  @IsString()
  model_name: string;
}

export class ModelUpdateDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  model_name: string;
}

export class ModelDeleteDto {
  @ApiProperty()
  @IsString()
  id: string;
}

export class ModelTypeListDto {
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

export class ModelByIdDto {
	@ApiProperty()
	@IsString()
	@IsDefined()
	id: string;
}