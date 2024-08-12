import { BaseRepo } from '../../shared/providers/base-dao';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ValumeTypeRepo extends BaseRepo<any> {
  constructor() {
    super(`public.valume_types`);
  }

  async create(params) {
    const data = await this.insert({
      id: this.generateRecordId(),
      name: params.valume_type_name,
      sub_category_id: params.sub_category_id,
    });

    return data;
  }

  async updateOne(params) {
    const data = await this.updateById(params.id, {
      name: params.valume_name,
      sub_category_id: params.sub_category_id,
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

    const { keyword, from_date, to_date, page, limit = 20 } = params;
    const offset = (page - 1) * limit;

    const query = knex
      .select(
        knex.raw([
          knex.raw('count(vt.id) over() as total'),
          'vt.id',
          'vt.name as valume_type_name',
          'sc.name as sub_category_name',
          'vt.created_at',
        ]),
      )
      .from(`${this.tableName} as vt`)
      .leftJoin('sub_category as sc', 'sc.id', 'vt.sub_category_id')
      .whereRaw('vt.is_deleted is not true')
      .limit(limit ? Number(limit) : 20)
      .offset(offset ? Number(offset) : 0);

      if (from_date) {
        query.where(`vt.created_at`, '>=', knex.raw('?', from_date));
      }
  
      if (to_date) {
        query.where(`vt.created_at`, '<=', knex.raw('?', `${to_date} 23:59:59`));
      }

    if (keyword) {
      query.whereRaw(`p.name ilike ?`, ['%' + keyword + '%']);
    }

    return query;
  }

  async getOne(params) {
    const knex = this.knex;

    const query = knex
      .select([
        knex.raw([
          'vt.id',
          'vt.name as valume_type_name',
          'vt.sub_category_id',
          'vt.created_at',
        ]),
      ])
      .from(`${this.tableName} as vt`)
      .leftJoin('sub_category as sc', 'sc.id', 'vt.sub_category_id')
      .leftJoin('category as c', 'c.id', 'sc.category_id')
      .where('vt.id', params.id)
      .whereRaw('vt.is_deleted is not true')
      .first();

    return query;
  }
}
