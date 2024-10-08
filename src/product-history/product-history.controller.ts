import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ProductHistoryService } from './product-history.service';
import { ByIdDto, DeleteDto, ListDto } from '@shared/dtos/index.dto';
import { ProductUpdateDto } from 'src/products/dto/products.dto';

@ApiTags('product-history')
@Controller('product-history')
export class ProductHistoryController {
  @Inject() private readonly productHistoryService: ProductHistoryService;

  @ApiBody({
    type: ListDto,
    description: 'list'
  })
  @Post('list')
  async list(@Body() params: ListDto){
    return this.productHistoryService.list(params)
  }

  @ApiBody({
    type: ProductUpdateDto,
  })
  @Post('update')
  async update(@Body() params: ProductUpdateDto) {
    return this.productHistoryService.update(params);
  }

  @ApiBody({
    type: DeleteDto,
  })
  @Post('delete')
  async delete(@Body() params: DeleteDto) {
    return this.productHistoryService.delete(params);
  }

  @ApiBody({
    type: ByIdDto,
    description: 'get one',
  })
  @Post('get-one')
  async getOne(@Body() params: ByIdDto) {
    return this.productHistoryService.getOne(params);
  }
}

//commit