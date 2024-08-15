import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsISO8601, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class DeleteDto {
  @ApiProperty()
  @IsString()
  id: string;
}

export class ListDto {
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

export class ByIdDto {
  @ApiProperty()
  @IsString()
  @IsDefined()
  id: string;
}
