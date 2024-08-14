import { Inject, Injectable } from '@nestjs/common';
import { ModelTypeRepo } from './repo/model-type.repo';
import * as ExcelJS from 'exceljs';

@Injectable()
export class ModelTypeService {
    @Inject() private readonly modelTypeRepo: ModelTypeRepo;

	async create(params) {
		return this.modelTypeRepo.create(params);
	}

	async update(params) {
		return this.modelTypeRepo.updateOne(params);
	}

	async delete(params) {
		return this.modelTypeRepo.deleteOne(params);
	}

	async list(params){
		const data = await this.modelTypeRepo.list(params);

		return { total: data.length > 0 && data[0].total, data }
	}

    async getOne(params) {
		return this.modelTypeRepo.getOne(params);
	}

	async generateExcel(data: any[]) {
		const workbook = new ExcelJS.Workbook();
		const worksheet = workbook.addWorksheet('Category');
	
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
	
		worksheet.columns = [
		  { header: 'Kategoriya nomi', key: 'category_name', width: 30, style },
		  { header: 'Yaratilgan vaqti', key: 'created_at', width: 30, style },
		  // add other columns as needed
		];
	
		data.forEach((item) => {
		  worksheet.addRow(item);
		});
	
		const buffer = await workbook.xlsx.writeBuffer();
		return buffer;
	  }
}
