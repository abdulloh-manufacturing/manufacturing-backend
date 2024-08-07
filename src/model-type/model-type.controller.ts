import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ModelTypeService } from './model-type.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import {
  ModelByIdDto,
  ModelCreateDto,
  ModelDeleteDto,
  ModelTypeListDto,
  ModelUpdateDto,
} from './dto/model-type.dto';

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
    type: ModelDeleteDto,
    description: 'Category delete',
  })
  @Post('delete')
  async delete(@Body() params: ModelDeleteDto) {
    return this.modelTypeService.delete(params);
  }


  @ApiBody({
    type: ModelTypeListDto,
    description: 'list'
  })
  @Post('list')
  async list(@Body() params) {
    return this.modelTypeService.list(params);
  }

  @ApiBody({
    type: ModelByIdDto,
    description: 'get one',
  })
  @Post('get-one')
  async getOne(@Body() params: ModelByIdDto) {
    return this.modelTypeService.getOne(params);
  }
}
