import { Body, Controller, Inject, Post } from '@nestjs/common';
import { OutProductService } from './out-product.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { OutProductDto, OutProductListDto } from './dto/out-product.dto';

@ApiTags('out-product')
@Controller('out-product')
export class OutProductController {
  @Inject() private readonly outProductService: OutProductService;

  @ApiBody({
    type: OutProductDto,
    description: 'Category create',
  })
  @Post('out')
  async out(@Body() params: OutProductDto) {
    return this.outProductService.out(params);
  }

  @ApiBody({
    type: OutProductListDto,
    description: 'list',
  })
  @Post('list')
  async list(@Body() params){
    return this.outProductService.list(params)
  }
}
