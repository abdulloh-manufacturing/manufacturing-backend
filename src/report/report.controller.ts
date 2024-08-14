import { Controller, Get, Res } from '@nestjs/common';
import { ReportService } from './report.service';
import { CategoryRepo } from 'src/category/repo/category.repo';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('report')
@Controller('report')
export class ReportController {
  constructor(
    private readonly categoryRepo: CategoryRepo,
    private readonly reportService: ReportService,
  ) {}

  @Get('excel')
  async exportToExcel(@Res() res: Response) {
    const data = await this.categoryRepo.getAll({ is_deleted: false }, [
      'id',
      'name',
      'created_at',
    ]);
    
    const buffer = await this.reportService.generateExcel(data);

    res.set({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename=category.xlsx',
    });

    res.send(buffer);
  }
}
