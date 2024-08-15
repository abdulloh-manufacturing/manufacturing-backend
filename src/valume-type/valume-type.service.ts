import { Inject, Injectable } from '@nestjs/common';
import { ValumeTypeRepo } from './repo/valume-type.repo';
import { render } from '@shared/utils';

@Injectable()
export class ValumeTypeService {
  @Inject() private readonly valumeTypeRepo: ValumeTypeRepo;

  async create(params) {
    return this.valumeTypeRepo.create(params);
  }

  async update(params) {
    return this.valumeTypeRepo.updateOne(params);
  }

  async delete(params) {
    return this.valumeTypeRepo.deleteOne(params);
  }

  async list(params) {
    const data = await this.valumeTypeRepo.list(params);

    return { total: data.length > 0 && data[0].total, data };
  }

  async getOne(params) {
    return this.valumeTypeRepo.getOne(params);
  }

  async generateExcel(params) {
    const data = await this.valumeTypeRepo.list(params);

    const columns = [
      { header: 'Subkategoriya nomi', key: 'sub_category_name', width: 30 },
      { header: "O'lchov birligi nomi", key: 'valume_type_name', width: 30 },
      { header: 'Yaratilgan vaqti', key: 'created_at', width: 30 },
    ];

    return render(data, columns, 'valume-type');
  }
}
