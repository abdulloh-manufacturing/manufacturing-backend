import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { OutProductService } from './out-product.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { OutProductDto } from './dto/out-product.dto';
import { Response } from 'express';
import { ListDto } from '@shared/dtos/index.dto';

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
    type: ListDto,
    description: 'list',
  })
  @Post('list')
  async list(@Body() params: ListDto){
    return this.outProductService.list(params)
  }

  @Post('excel')
  async exportToExcel(@Body() params: ListDto, @Res() res: Response) {
    
    const buffer = await this.outProductService.generateExcel(params);

    res.set({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename=category.xlsx',
    });

    res.send(buffer);
  }
}
