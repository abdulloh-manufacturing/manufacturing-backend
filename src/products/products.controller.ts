import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ProductCreateDto, ProductDeleteDto, ProductListDto, ProductUpdateDto } from './dto/products.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
    @Inject() private readonly productsService: ProductsService;

  @ApiBody({
    type: ProductCreateDto
  })
  @Post('create')
  async create(@Body() params: ProductCreateDto) {
    return this.productsService.create(params);
  }

  @ApiBody({
    type: ProductUpdateDto
  })
  @Post('update')
  async update(@Body() params:ProductUpdateDto) {
    return this.productsService.update(params);
  }

  @ApiBody({
    type: ProductDeleteDto
  })
  @Post('delete')
  async delete(@Body() params:ProductDeleteDto) {
    return this.productsService.delete(params);
  }

  @ApiBody({
    type: ProductListDto
  })
  @Post('list')
  async list(@Body() params: ProductListDto){
    return this.productsService.list(params)
  }
}
