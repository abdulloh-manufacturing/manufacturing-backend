import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ValumeTypeService } from './valume-type.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ValumeTypeCreateDto, ValumeTypeDeleteDto, ValumeTypeUpdateDto } from './dto/valume-type.dto';

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
}
