import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsRepo } from './repo/products.repo';
import { ProductHistoryService } from 'src/product-history/product-history.service';
import { ProductHistoryModule } from 'src/product-history/product-history.module';

@Module({
  imports:[ProductHistoryModule],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepo],
  exports: [ProductsRepo]
})
export class ProductsModule {}
