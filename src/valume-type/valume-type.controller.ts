import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ValumeTypeService } from './valume-type.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ValumeTypeByIdDto, ValumeTypeCreateDto, ValumeTypeDeleteDto, ValumeTypeListDto, ValumeTypeUpdateDto } from './dto/valume-type.dto';

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
    async update(@Body() params:ValumeTypeUpdateDto) {
      return this.valumeTypeService.update(params);
    }
  
    @ApiBody({
      type: ValumeTypeDeleteDto,
      description: 'sub-category delete',
    })
    @Post('delete')
    async delete(@Body() params:ValumeTypeDeleteDto) {
      return this.valumeTypeService.delete(params);
    }

    @ApiBody({
      type: ValumeTypeListDto,
      description: 'list'
    })
    @Post('list')
    async list(@Body() params: ValumeTypeListDto){
      return this.valumeTypeService.list(params);
    }

    @ApiBody({
      type: ValumeTypeByIdDto,
      description: 'get one',
    })
    @Post('get-one')
    async getOne(@Body() params: ValumeTypeByIdDto) {
      return this.valumeTypeService.getOne(params);
    }
}
