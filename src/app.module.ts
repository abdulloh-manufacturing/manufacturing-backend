import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SharedModule } from "@shared/shared.module";
import { CategoryModule } from './category/category.module';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { ValumeTypeModule } from './valume-type/valume-type.module';
import { ProductsModule } from './products/products.module';
import { ModelTypeModule } from './model-type/model-type.module';
import { OutProductModule } from './out-product/out-product.module';
import { ProductHistoryModule } from './product-history/product-history.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    SharedModule,
    CategoryModule,
    SubCategoryModule,
    ValumeTypeModule,
    ProductsModule,
    ModelTypeModule,
    OutProductModule,
    ProductHistoryModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
