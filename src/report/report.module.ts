import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { CategoryModule } from 'src/category/category.module';

@Module({
  controllers: [ReportController],
  providers: [ReportService],
  imports: [CategoryModule]
})
export class ReportModule {}
