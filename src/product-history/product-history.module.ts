import { Module } from '@nestjs/common';
import { ProductHistoryController } from './product-history.controller';
import { ProductHistoryService } from './product-history.service';

@Module({
  controllers: [ProductHistoryController],
  providers: [ProductHistoryService]
})
export class ProductHistoryModule {}
