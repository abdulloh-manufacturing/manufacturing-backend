import { Body, Controller, Get, Inject, Post, Res } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ByUniqueCodeDto, ProductCreateDto, ProductListDto, ProductUpdateDto } from './dto/products.dto';
import { Response } from 'express';
import { ByIdDto, DeleteDto } from '@shared/dtos/index.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  @Inject() private readonly productsService: ProductsService;

  @ApiBody({
    type: ProductCreateDto,
  })
  @Post('create')
  async create(@Body() params: ProductCreateDto) {
    return this.productsService.create(params);
  }

  @ApiBody({
    type: ProductUpdateDto,
  })
  @Post('update')
  async update(@Body() params: ProductUpdateDto) {
    return this.productsService.update(params);
  }

  @ApiBody({
    type: DeleteDto,
  })
  @Post('delete')
  async delete(@Body() params: DeleteDto) {
    return this.productsService.delete(params);
  }

  @ApiBody({
    type: ProductListDto,
  })
  @Post('list')
  async list(@Body() params: ProductListDto) {
    return this.productsService.list(params);
  }

  @ApiBody({
    type: ByIdDto,
    description: 'get one',
  })
  @Post('get-one')
  async getOne(@Body() params: ByIdDto) {
    return this.productsService.getOne(params);
  }

  @ApiBody({
    type: ByUniqueCodeDto,
    description: 'get unique code',
  })
  @Post('get-by-unique-code')
  async getByUniqueCode(@Body() params: ByUniqueCodeDto) {
    return this.productsService.getByUniqueCode(params);
  }

  @Post('excel')
  async exportToExcel(@Body() params: ProductListDto, @Res() res: Response) {
    const buffer = await this.productsService.generateExcel(params);

    res.set({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename=category.xlsx',
    });

    res.send(buffer);
  }
}
