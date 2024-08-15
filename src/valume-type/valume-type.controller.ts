import { Body, Controller, Get, Inject, Post, Res } from '@nestjs/common';
import { ValumeTypeService } from './valume-type.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import {
  ValumeTypeCreateDto,
  ValumeTypeUpdateDto,
} from './dto/valume-type.dto';
import { Response } from 'express';
import { ByIdDto, DeleteDto, ListDto } from '@shared/dtos/index.dto';

@Controller('valume-type')
@ApiTags('valume-type')
export class ValumeTypeController {
  @Inject() private readonly valumeTypeService: ValumeTypeService;

  @ApiBody({
    type: ValumeTypeCreateDto,
    description: 'sub-category create',
  })
  @Post('create')
  async create(@Body() params: ValumeTypeCreateDto) {
    return this.valumeTypeService.create(params);
  }

  @ApiBody({
    type: ValumeTypeUpdateDto,
    description: 'sub-category update',
  })
  @Post('update')
  async update(@Body() params: ValumeTypeUpdateDto) {
    return this.valumeTypeService.update(params);
  }

  @ApiBody({
    type: DeleteDto,
    description: 'sub-category delete',
  })
  @Post('delete')
  async delete(@Body() params: DeleteDto) {
    return this.valumeTypeService.delete(params);
  }

  @ApiBody({
    type: ListDto,
    description: 'list',
  })
  @Post('list')
  async list(@Body() params: ListDto) {
    return this.valumeTypeService.list(params);
  }

  @ApiBody({
    type: ByIdDto,
    description: 'get one',
  })
  @Post('get-one')
  async getOne(@Body() params: ByIdDto) {
    return this.valumeTypeService.getOne(params);
  }

  @Post('excel')
  async exportToExcel(@Body() params: ListDto, @Res() res: Response) {
    const buffer = await this.valumeTypeService.generateExcel(params);

    res.set({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename=category.xlsx',
    });

    res.send(buffer);
  }
}
