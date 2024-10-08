import { isEmpty } from 'lodash';
import { BaseRepo } from '../../shared/providers/base-dao';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsRepo extends BaseRepo<any> {
  constructor() {
    super(`public.products`);
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
      unique_code: params.unique_code
    });

    return data;
  }

  async deleteOne(params) {
    const data = await this.updateById(params.id, {
      is_deleted: true,
    });

    return { success: true };
  }

  async list(params) {
    const knex = this.knex;

    const {keyword, from_date, to_date, page, limit = 20 } = params;
    const offset = (page - 1) * limit;

    const query = knex
      .select([
        knex.raw('count(p.id) over() as total'),
        'p.id',
        knex.raw('c.name as category_name'),
        knex.raw('sc.name as sub_category_name'),
        knex.raw('vt.name as valume_type_name'),
        'p.value',
        'p.color',
        'p.code',
        'p.price',
        'p.currency_type',
        'p.created_at',
        'p.unique_code'
      ])
      .from(`${this.tableName} as p`)
      .leftJoin('category as c', 'p.category_id', 'c.id')
      .leftJoin('sub_category as sc', 'sc.id', 'p.sub_category_id')
      .leftJoin('valume_types as vt', 'p.valume_type_id', 'vt.id')
      .whereRaw('p.is_deleted is not true')
      .orderBy('p.created_at', 'desc')
      .limit(limit ? Number(limit) : 20)
      .offset(offset ? Number(offset) : 0);

    if (from_date) {
      query.where(`p.created_at`, '>=', knex.raw('?', from_date));
    }

    if (to_date) {
      query.where(`p.created_at`, '<=', knex.raw('?', `${to_date} 23:59:59`));
    }

    if (keyword) {
			query.where((innerWhere) =>
				innerWhere
					.orWhereRaw(`c.name ilike ?`, ['%' + keyword + '%'])
					.orWhereRaw(`sc.name ilike ?`, ['%' + keyword + '%'])
					.orWhereRaw(`vt.name ilike ?`, ['%' + keyword + '%'])
          .orWhereRaw(`p.unique_code ilike ?`, ['%' + keyword + '%'])
			);
		}

    return query;
  }

  async getOne(params) {
    const knex = this.knex;

    const query = knex
      .select([
        'p.id',
        'p.category_id',
        'p.sub_category_id',
        'p.valume_type_id',
        'p.value',
        'p.created_at',
        'p.color',
        'p.code',
        'p.price',
        'p.currency_type',
        'p.unique_code'
      ])
      .from(`${this.tableName} as p`)
      .where('p.id', params.id)
      .whereRaw('p.is_deleted is not true')
      .first();

    return query;
  }

  async getByUniqueCode(params) {
    const knex = this.knex;

    const query = knex
      .select([
        'p.id',
        'p.category_id',
        'p.sub_category_id',
        'p.valume_type_id',
        'p.value',
        'p.created_at',
        'p.color',
        'p.code',
        'p.price',
        'p.currency_type',
        'p.unique_code'
      ])
      .from(`${this.tableName} as p`)
      .where('p.unique_code', params.unique_code)
      .whereRaw('p.is_deleted is not true')
      .first();

    return query;
  }
  
}
