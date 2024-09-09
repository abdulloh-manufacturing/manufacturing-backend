import { isEmpty } from 'lodash';
import { BaseRepo } from '../../shared/providers/base-dao';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductHistoryRepo extends BaseRepo<any> {
  constructor() {
    super(`public.products_history`);
  }

  async list(params) {
    const knex = this.knex;

    const { keyword, from_date, to_date, page, limit = 20 } = params;
    const offset = (page - 1) * limit;

    const query = knex
      .select([
        knex.raw('count(ph.id) over() as total'),
        'ph.id',
        knex.raw('c.name as category_name'),
        knex.raw('sc.name as sub_category_name'),
        knex.raw('vt.name as valume_type_name'),
        'ph.value',
        'ph.color',
        'ph.code',
        'ph.price',
        'ph.currency_type',
        'ph.created_at',
        'ph.unique_code',
      ])
      .from(`${this.tableName} as ph`)
      .leftJoin('category as c', 'ph.category_id', 'c.id')
      .leftJoin('sub_category as sc', 'sc.id', 'ph.sub_category_id')
      .leftJoin('valume_types as vt', 'ph.valume_type_id', 'vt.id')
      .whereRaw('ph.is_deleted is not true')
      .orderBy('ph.created_at', 'desc')
      .limit(limit ? Number(limit) : 20)
      .offset(offset ? Number(offset) : 0);

    if (from_date) {
      query.where(`ph.created_at`, '>=', knex.raw('?', from_date));
    }

    if (to_date) {
      query.where(`ph.created_at`, '<=', knex.raw('?', `${to_date} 23:59:59`));
    }

    if (keyword) {
      query.where((innerWhere) =>
        innerWhere
          .orWhereRaw(`c.name ilike ?`, ['%' + keyword + '%'])
          .orWhereRaw(`sc.name ilike ?`, ['%' + keyword + '%'])
          .orWhereRaw(`vt.name ilike ?`, ['%' + keyword + '%']),
      );
    }

    return query;
  }

  async getOne(params) {
    const knex = this.knex;

    const query = knex
      .select([
        'ph.id',
        'ph.category_id',
        'ph.sub_category_id',
        'ph.valume_type_id',
        'ph.value',
        'ph.created_at',
        'ph.color',
        'ph.code',
        'ph.price',
        'ph.currency_type',
        'ph.unique_code',
      ])
      .from(`${this.tableName} as ph`)
      .where('ph.id', params.id)
      .whereRaw('ph.is_deleted is not true')
      .first();

    return query;
  }

  async updateOne(params) {
    const data = await this.updateById(params.id, {
      category_id: params.category_id,
      sub_category_id: params.sub_category_id,
      valume_type_id: params.valume_type_id,
      value: params.value,
      color: params.color,
      code: params.code,
      price: params.price,
      currency_type: params.currency_type,
      unique_code: params.unique_code,
    });

    return data;
  }

  async deleteOne(params) {
    const data = await this.updateById(params.id, {
      is_deleted: true,
    });

    return { success: true };
  }
}
