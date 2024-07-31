import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsRepo } from './repo/products.repo';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepo]
})
export class ProductsModule {}
