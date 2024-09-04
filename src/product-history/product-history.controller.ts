import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ProductHistoryService } from './product-history.service';
import { ListDto } from '@shared/dtos/index.dto';

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
}
