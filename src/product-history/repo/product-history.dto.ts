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

    const {
      keyword,
      from_date,
      to_date,
      is_deleted,
      page,
      limit = 20,
    } = params;
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
      ])
      .from(`${this.tableName} as ph`)
      .leftJoin('category as c', 'ph.category_id', 'c.id')
      .leftJoin('sub_category as sc', 'sc.id', 'ph.sub_category_id')
      .leftJoin('valume_types as vt', 'ph.valume_type_id', 'vt.id')
      .orderBy('ph.created_at', 'desc')
      .limit(limit ? Number(limit) : 20)
      .offset(offset ? Number(offset) : 0);

    if (is_deleted === false) {
      query.whereRaw('ph.is_deleted is not true');
    }

    if (is_deleted === true) {
      query.whereRaw('ph.is_deleted is true');
    }

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
}
