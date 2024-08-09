import { BaseRepo } from '../../shared/providers/base-dao';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OutProductRepo extends BaseRepo<any> {
  constructor() {
    super(`public.out_product`);
  }

  async list(params) {
    const knex = this.knex;

    const { keyword, from_date, to_date, page, limit = 20 } = params;
    const offset = (page - 1) * limit;

    const query = knex
      .select([
        knex.raw('count(op.id) over() as total'),
        'op.id',
        knex.raw('p.id  as product_id'),
        knex.raw('p.name as porduct_name'),
        knex.raw('c.name as category_name'),
        knex.raw('sc.name as sub_category_name'),
        knex.raw('vt.name as valume_type_name'),
        'p.value',
        'p.created_at',
        'op.out_date',
        'p.color',
        'p.code',
        'p.price',
        'p.currency_type',
        knex.raw('m.name as model_name')
      ])
      .from(`${this.tableName} as op`)
      .leftJoin('products as p', 'p.id', 'op.product_id')
      .leftJoin('category as c', 'p.category_id', 'c.id')
      .leftJoin('sub_category as sc', 'sc.id', 'p.sub_category_id')
      .leftJoin('valume_types as vt', 'p.valume_type_id', 'vt.id')
      .leftJoin('model as m', 'm.id', 'p.model_id')
      .limit(limit ? Number(limit) : 20)
      .offset(offset ? Number(offset) : 0);

    if (from_date && to_date) {
      query.whereBetween('op.out_date', [from_date, to_date]);
    }

    if (keyword) {
      query.whereRaw(`p.name ilike ?`, ['%' + keyword + '%']);
    }

    return query;
  }
}
