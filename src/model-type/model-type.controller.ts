import { Body, Controller, Get, Inject, Post, Res } from '@nestjs/common';
import { ModelTypeService } from './model-type.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ModelCreateDto, ModelUpdateDto } from './dto/model-type.dto';
import { Response } from 'express';
import { ByIdDto, DeleteDto, ListDto } from '@shared/dtos/index.dto';

@ApiTags('model-type')
@Controller('model-type')
export class ModelTypeController {
  @Inject() private readonly modelTypeService: ModelTypeService;

  @ApiBody({
    type: ModelCreateDto,
    description: 'Category create',
  })
  @Post('create')
  async create(@Body() params: ModelCreateDto) {
    return this.modelTypeService.create(params);
  }

  @ApiBody({
    type: ModelUpdateDto,
    description: 'Category update',
  })
  @Post('update')
  async update(@Body() params: ModelUpdateDto) {
    return this.modelTypeService.update(params);
  }

  @ApiBody({
    type: DeleteDto,
    description: 'Category delete',
  })
  @Post('delete')
  async delete(@Body() params: DeleteDto) {
    return this.modelTypeService.delete(params);
  }

  @ApiBody({
    type: ListDto,
    description: 'list',
  })
  @Post('list')
  async list(@Body() params: ListDto) {
    return this.modelTypeService.list(params);
  }

  @ApiBody({
    type: ByIdDto,
    description: 'get one',
  })
  @Post('get-one')
  async getOne(@Body() params: ByIdDto) {
    return this.modelTypeService.getOne(params);
  }

  @Post('excel')
  async exportToExcel(@Body() params: ListDto, @Res() res: Response) {
    const buffer = await this.modelTypeService.generateExcel(params);

    res.set({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename=category.xlsx',
    });

    res.send(buffer);
  }
}
