import { Body, Controller, Get, Inject, Post, Res } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryCreateDto, CategoryUpdateDto } from './dto/category.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ByIdDto, DeleteDto, ListDto } from '@shared/dtos/index.dto';

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
    type: DeleteDto,
    description: 'Category delete',
  })
  @Post('delete')
  async delete(@Body() params:DeleteDto) {
    return this.categoryService.delete(params);
  }

  @ApiBody({
    type: ListDto,
    description: 'list'
  })
  @Post('list')
  async list(@Body() params: ListDto){
    return this.categoryService.list(params)
  }

  @ApiBody({
		type: ByIdDto,
		description: 'get one',
	})
	@Post('get-one')
	async getOne(@Body() params: ByIdDto) {
		return this.categoryService.getOne(params);
	}

  @Post('excel')
  async exportToExcel(@Body() params: ListDto, @Res() res: Response) {
    
    const buffer = await this.categoryService.generateExcel(params);

    res.set({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename=category.xlsx',
    });

    res.send(buffer);
  }

}
