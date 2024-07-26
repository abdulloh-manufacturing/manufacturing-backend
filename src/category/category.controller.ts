import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryCreateDto } from './dto/category.dto';
import { ApiBody } from '@nestjs/swagger';

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

  @Post('update')
  async update(@Body() params) {
    return this.categoryService.update(params);
  }

  @Post('delete')
  async delete(@Body() params) {
    return this.categoryService.delete(params);
  }
}
