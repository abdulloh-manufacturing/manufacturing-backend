import { Inject, Injectable } from '@nestjs/common';
import { SubCategoryRepo } from './repo/sub-category.repo';
import { render } from '@shared/utils';

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

  async generateExcel(params){
    const data = await this.subCategoryRepo.list(params);

    const columns = [
        { header: 'Kategoriya', key: 'category_name', width: 30 },
        { header: 'Subkategoriya nomi', key: 'sub_category_name', width: 30},
        { header: 'Yaratilgan vaqti', key: 'created_at', width: 30},
      ];

    return render(data, columns, 'sub-category')
  }	
}
