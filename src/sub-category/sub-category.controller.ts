import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import {
  SubCategoryCreateDto,
  SubCategoryUpdateDto,
} from './dto/sub-category.dto';
import { Response } from 'express';
import { ByIdDto, DeleteDto, ListDto } from '@shared/dtos/index.dto';

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
  async update(@Body() params: SubCategoryUpdateDto) {
    return this.subCategoryService.update(params);
  }

  @ApiBody({
    type: DeleteDto,
    description: 'sub-category delete',
  })
  @Post('delete')
  async delete(@Body() params: DeleteDto) {
    return this.subCategoryService.delete(params);
  }

  @ApiBody({
    type: ListDto,
    description: 'list',
  })
  @Post('list')
  async list(@Body() params: ListDto) {
    return this.subCategoryService.list(params);
  }

  @ApiBody({
    type: ByIdDto,
    description: 'get one',
  })
  @Post('get-one')
  async getOne(@Body() params: ByIdDto) {
    return this.subCategoryService.getOne(params);
  }

  @Post('excel')
  async exportToExcel(@Body() params: ListDto, @Res() res: Response) {
    const buffer = await this.subCategoryService.generateExcel(params);

    res.set({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename=category.xlsx',
    });

    res.send(buffer);
  }
}
