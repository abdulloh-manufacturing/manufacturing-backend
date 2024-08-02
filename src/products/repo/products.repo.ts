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
      value: params.value,
      color: params.color,
      code: params.code,
      price: params.price,
      currency_type: params.currency_type,
      model_id: params.model_id,
    });

    return data;
  }

  async updateOne(params) {
    const data = await this.updateById(params.id, {
      name: params.product_name,
      category_id: params.category_id,
      sub_category_id: params.sub_category_id,
      valume_type_id: params.valume_type_id,
      value: params.value,
      color: params.color,
      code: params.code,
      price: params.price,
      currency_type: params.currency_type,
      model_id: params.model_id,
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
      .select([
        'p.id',
        'p.name',
        'p.category_id',
        'p.sub_category_id',
        'p.valume_type_id',
        'p.value',
        'p.color',
        'p.code',
        'p.price',
        'p.currency_type',
        'p.model_id',
      ])
      .from(`${this.tableName} as p`)
      .whereRaw('p.is_deleted is not true');

    return query;
  }

  async deletedList() {
    const knex = this.knex;

    const query = knex
      .select([
        'p.id',
        'p.name',
        'p.category_id',
        'p.sub_category_id',
        'p.valume_type_id',
        'p.value',
        'p.color',
        'p.code',
        'p.price',
        'p.currency_type',
        'p.model_id',
      ])
      .from(`${this.tableName} as p`)
      .whereRaw('p.is_deleted is true');

    return query;
  }

  async listAll() {
    const knex = this.knex;

    const query = knex
      .select([
        'p.id',
        'p.name',
        'p.category_id',
        'p.sub_category_id',
        'p.valume_type_id',
        'p.value',
        'p.color',
        'p.code',
        'p.price',
        'p.currency_type',
        'p.model_id',
      ])
      .from(`${this.tableName} as p`);

    return query;
  }

  // async getOne(params) {
  // 	const knex = this.knex;
  // }
}
