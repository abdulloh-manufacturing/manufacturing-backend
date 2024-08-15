import { Inject, Injectable } from '@nestjs/common';
import { CategoryRepo } from './repo/category.repo';
import { render } from '@shared/utils';

@Injectable()
export class CategoryService {
    @Inject() private readonly categoryRepo: CategoryRepo;

	async create(params) {
		return this.categoryRepo.create(params);
	}

	async update(params) {
		return this.categoryRepo.updateOne(params);
	}

	async delete(params) {
		return this.categoryRepo.deleteOne(params);
	}

	async list(params){
		const data = await this.categoryRepo.list(params);

		return { total: data.length > 0 && data[0].total, data }
	}

	async getOne(params) {
		return this.categoryRepo.getOne(params);
	}

	async generateExcel(params){
		const data = await this.categoryRepo.list(params);

		const columns = [
			{ header: 'Kategoriya nomi', key: 'category_name', width: 30 },
			{ header: 'Yaratilgan vaqti', key: 'created_at', width: 30},
		  ];

		return render(data, columns, 'category')
		
	  }	
}
