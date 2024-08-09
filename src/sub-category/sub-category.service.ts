import { Inject, Injectable } from '@nestjs/common';
import { SubCategoryRepo } from './repo/sub-category.repo';

@Injectable()
export class SubCategoryService {
  @Inject() private readonly subCategoryRepo: SubCategoryRepo;

  async create(params) {
    return this.subCategoryRepo.create(params);
  }

  async update(params) {
    return this.subCategoryRepo.updateOne(params);
  }

  async delete(params) {
    return this.subCategoryRepo.deleteOne(params);
  }

  async list(params) {
    const data = await this.subCategoryRepo.list(params);

		return { total: data.length > 0 && data[0].total, data }
  }

  async getOne(params) {
    return this.subCategoryRepo.getOne(params);
  }
}
