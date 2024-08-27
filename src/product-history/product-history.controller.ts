import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { ProductHistoryService } from './product-history.service';

@Controller('product-history')
export class ProductHistoryController {
//   @Inject() private readonly productHistoryService: ProductHistoryService;

//   @ApiBody({
//     type: ProductCreateDto,
//   })
//   @Post('create')
//   async create(@Body() params: ProductCreateDto) {
//     return this.productHistoryService.create(params);
//   }
}
