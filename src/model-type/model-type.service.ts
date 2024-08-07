import { Inject, Injectable } from '@nestjs/common';
import { ModelTypeRepo } from './repo/model-type.repo';

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
		return this.modelTypeRepo.list(params)
	}

    async getOne(params) {
		return this.modelTypeRepo.getOne(params);
	}
}
