import { Module } from '@nestjs/common';
import { OutProductController } from './out-product.controller';
import { OutProductService } from './out-product.service';
import { OutProductRepo } from './repo/out-product.repo';
import { ProductsModule } from 'src/products/products.module';

@Module({
  controllers: [OutProductController],
  providers: [OutProductService, OutProductRepo],
  imports: [ProductsModule]
})
export class OutProductModule {}
