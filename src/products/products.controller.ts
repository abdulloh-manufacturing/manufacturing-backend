import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ProductCreateDto, ProductDeleteDto, ProductUpdateDto } from './dto/products.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
    @Inject() private readonly productsService: ProductsService;

  @ApiBody({
    type: ProductCreateDto,
    description: 'sub-category create',
  })
  @Post('create')
  async create(@Body() params: ProductCreateDto) {
    return this.productsService.create(params);
  }

  @ApiBody({
    type: ProductUpdateDto,
    description: 'sub-category update',
  })
  @Post('update')
  async update(@Body() params:ProductUpdateDto) {
    return this.productsService.update(params);
  }

  @ApiBody({
    type: ProductDeleteDto,
    description: 'sub-category delete',
  })
  @Post('delete')
  async delete(@Body() params:ProductDeleteDto) {
    return this.productsService.delete(params);
  }

  @Get('list')
  async list(){
    return this.productsService.list()
  }
}
