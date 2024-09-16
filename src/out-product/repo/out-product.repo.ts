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
        'op.out_value'
      ])
      .from(`${this.tableName} as op`)
      .leftJoin('products as p', 'p.id', 'op.product_id')
      .leftJoin('category as c', 'p.category_id', 'c.id')
      .leftJoin('sub_category as sc', 'sc.id', 'p.sub_category_id')
      .leftJoin('valume_types as vt', 'p.valume_type_id', 'vt.id')
      .orderBy('op.out_date', 'desc')
      .limit(limit ? Number(limit) : 20)
      .offset(offset ? Number(offset) : 0);

      if (from_date) {
        query.where(`op.out_date`, '>=', knex.raw('?', from_date));
      }
    
      if (to_date) {
        query.where(`op.out_date`, '<=', knex.raw('?', `${to_date} 23:59:59`));
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
}
