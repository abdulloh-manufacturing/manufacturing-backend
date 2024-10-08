import { Module } from '@nestjs/common';
import { ProductHistoryController } from './product-history.controller';
import { ProductHistoryService } from './product-history.service';
import { ProductHistoryRepo } from './repo/product-history.dto';

@Module({
  controllers: [ProductHistoryController],
  providers: [ProductHistoryService, ProductHistoryRepo],
  exports: [ProductHistoryService]
})
export class ProductHistoryModule {}
