import { Inject, Injectable } from '@nestjs/common';
import { CategoryRepo } from './repo/category.repo';

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
		return this.categoryRepo.list(params)
	}

	async getOne(params) {
		return this.categoryRepo.getOne(params);
	}
}
