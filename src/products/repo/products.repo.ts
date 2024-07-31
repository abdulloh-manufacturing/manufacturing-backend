import { BaseRepo } from '../../shared/providers/base-dao';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsRepo extends BaseRepo<any> {
  constructor() {
    super(`public.products`);
  }

  async create(params) {
    const data = await this.insert({
      id: this.generateRecordId(),
      name: params.product_name,
      category_id: params.category_id,
      sub_category_id: params.sub_category_id,
      valume_type_id: params.valume_type_id,
      value: params.value
    });

    return data;
  }

  async updateOne(params) {
    const data = await this.updateById(params.id, {
        name: params.product_name,
        category_id: params.category_id,
        sub_category_id: params.sub_category_id,
        valume_type_id: params.valume_type_id,
        value: params.value
    });

    return data;
  }

  async deleteOne(params) {
    const data = await this.updateById(params.id, {
      is_deleted: true,
    });

    return { success: true };
  }

  async list() {
    const knex = this.knex;

  const query = knex
          .select(['p.*'])
          .from(`${this.tableName} as p`)
          .whereRaw('p.is_deleted is not true');

    return query
}

  // async getOne(params) {
  // 	const knex = this.knex;
  // }
}
