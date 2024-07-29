import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ValumeTypeCreateDto {
  @ApiProperty()
  @IsString()
  valume_type_name: string;
}

export class ValumeTypeUpdateDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  valume_type_name: string;
}

export class ValumeTypeDeleteDto {
  @ApiProperty()
  @IsString()
  id: string;
}
