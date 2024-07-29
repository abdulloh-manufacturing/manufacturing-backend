import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SharedModule } from "@shared/shared.module";
import { CategoryModule } from './category/category.module';
import { SubCategoryModule } from './sub-category/sub-category.module';




@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    SharedModule,
    CategoryModule,
    SubCategoryModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
