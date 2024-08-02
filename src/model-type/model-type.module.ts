import { Module } from '@nestjs/common';
import { ModelTypeController } from './model-type.controller';
import { ModelTypeService } from './model-type.service';
import { ModelTypeRepo } from './repo/model-type.repo';

@Module({
  controllers: [ModelTypeController],
  providers: [ModelTypeService, ModelTypeRepo]
})
export class ModelTypeModule {}
