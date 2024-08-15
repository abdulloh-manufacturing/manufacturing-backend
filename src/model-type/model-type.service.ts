import { Inject, Injectable } from '@nestjs/common';
import { ModelTypeRepo } from './repo/model-type.repo';
import { render } from '@shared/utils';

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

	async generateExcel(params){
		const data = await this.modelTypeRepo.list(params);

		const columns = [
			{ header: 'Model nomi', key: 'model_name', width: 30 },
			{ header: 'Yaratilgan vaqti', key: 'created_at', width: 30},
		  ];

		return render(data, columns, 'model-type')
		
	  }	
}
