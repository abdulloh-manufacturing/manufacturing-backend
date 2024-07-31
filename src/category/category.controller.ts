import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryCreateDto, CategoryDeleteDto, CategoryUpdateDto } from './dto/category.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  @Inject() private readonly categoryService: CategoryService;

  @ApiBody({
    type: CategoryCreateDto,
    description: 'Category create',
  })
  @Post('create')
  async create(@Body() params: CategoryCreateDto) {
    return this.categoryService.create(params);
  }

  @ApiBody({
    type: CategoryUpdateDto,
    description: 'Category update',
  })
  @Post('update')
  async update(@Body() params:CategoryUpdateDto) {
    return this.categoryService.update(params);
  }

  @ApiBody({
    type: CategoryDeleteDto,
    description: 'Category delete',
  })
  @Post('delete')
  async delete(@Body() params:CategoryDeleteDto) {
    return this.categoryService.delete(params);
  }

  @Get('list')
  async list(){
    return this.categoryService.list()
  }
}
