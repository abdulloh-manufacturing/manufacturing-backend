import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { SubCategoryByIdDto, SubCategoryCreateDto, SubCategoryDeleteDto, SubCategoryUpdateDto } from './dto/sub-category.dto';

@Controller('sub-category')
@ApiTags('sub-category')
export class SubCategoryController {
    @Inject() private readonly subCategoryService: SubCategoryService;

  @ApiBody({
    type: SubCategoryCreateDto,
    description: 'sub-category create',
  })
  @Post('create')
  async create(@Body() params: SubCategoryCreateDto) {
    return this.subCategoryService.create(params);
  }

  @ApiBody({
    type: SubCategoryUpdateDto,
    description: 'sub-category update',
  })
  @Post('update')
  async update(@Body() params:SubCategoryUpdateDto) {
    return this.subCategoryService.update(params);
  }

  @ApiBody({
    type: SubCategoryDeleteDto,
    description: 'sub-category delete',
  })
  @Post('delete')
  async delete(@Body() params:SubCategoryDeleteDto) {
    return this.subCategoryService.delete(params);
  }

  @Get('list')
  async list(){
    return this.subCategoryService.list()
  }

  @ApiBody({
		type: SubCategoryByIdDto,
		description: 'get one',
	})
	@Post('get-one')
	async getOne(@Body() params: SubCategoryByIdDto) {
		return this.subCategoryService.getOne(params);
	}
}
