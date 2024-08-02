import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ModelTypeService } from './model-type.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ModelCreateDto, ModelDeleteDto, ModelUpdateDto } from './dto/model-type.dto';

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
  async update(@Body() params:ModelUpdateDto) {
    return this.modelTypeService.update(params);
  }

  @ApiBody({
    type: ModelDeleteDto,
    description: 'Category delete',
  })
  @Post('delete')
  async delete(@Body() params:ModelDeleteDto) {
    return this.modelTypeService.delete(params);
  }

  @Get('list')
  async list(){
    return this.modelTypeService.list()
  }
}
