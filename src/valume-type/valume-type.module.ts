import { Module } from '@nestjs/common';
import { ValumeTypeController } from './valume-type.controller';
import { ValumeTypeService } from './valume-type.service';
import { ValumeTypeRepo } from './repo/valume-type.repo';

@Module({
  controllers: [ValumeTypeController],
  providers: [ValumeTypeService, ValumeTypeRepo]
})
export class ValumeTypeModule {}
