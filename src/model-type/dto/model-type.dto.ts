import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

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
