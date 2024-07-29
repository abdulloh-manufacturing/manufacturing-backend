import { Module } from '@nestjs/common';
import { SubCategoryController } from './sub-category.controller';
import { SubCategoryService } from './sub-category.service';
import { SubCategoryRepo } from './repo/sub-category.repo';

@Module({
  controllers: [SubCategoryController],
  providers: [SubCategoryService, SubCategoryRepo]
})
export class SubCategoryModule {}
