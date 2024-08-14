import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';

@Injectable()
export class ReportService {
  async generateExcel(data: any[]) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Category');
    // let rowToStart = 2;

    const style: any = {
      numFmt:'dd/mm/yyyy',
      alignment: {
        vertical: 'middle',
        horizontal: 'center',
        wrapText: true,
      },
      border: {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      }

    };

    worksheet.columns = [
        { header: 'Kategoriya nomi', key: 'name', width: 30, style },
        { header: 'Yaratilgan vaqti', key: 'created_at', width: 30 , style},
        // add other columns as needed
      ];
  
      data.forEach((item) => {
        worksheet.addRow(item);
      });



    // worksheet.getCell(`A1`).value = 'Kategoriya nomi';
    // worksheet.getCell(`B1`).value = 'Yaratilgan vaqti';
    // worksheet.getCell(`A1`).style = style;
    // worksheet.getCell(`B1`).style = style;

    // for (let i = 0; i < data.length; i++) {
    //   const currentData = data[i];

    //   worksheet.getCell(`A${rowToStart}`).value = currentData.name;
    //   worksheet.getCell(`B${rowToStart}`).value = currentData.created_at;
    //   worksheet.getCell(`A${rowToStart}`).style = style;
    //   worksheet.getCell(`B${rowToStart}`).style = style;

    //   rowToStart++;
    // }

    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
  }
}
