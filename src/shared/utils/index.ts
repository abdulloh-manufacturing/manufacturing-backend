import { Readable } from 'stream';
import * as ExcelJS from 'exceljs';

export function bufferToStream(binary) {
  return new Readable({
    read() {
      this.push(binary);
      this.push(null);
    },
  });
}

export async function render(data: any[], columns: any[], worksheet_name: string) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(worksheet_name);

  const style: any = {
    numFmt: 'dd/mm/yyyy',
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
    },
  };

  const column = [];

  columns.forEach((item) => {
    column.push({ ...item, style });
  });

  worksheet.columns = column

  data.forEach((item) => {
    worksheet.addRow(item);
  });

  const buffer = await workbook.xlsx.writeBuffer();
  return buffer;
}
