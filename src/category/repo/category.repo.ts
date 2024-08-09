import { BaseRepo } from '../../shared/providers/base-dao';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryRepo extends BaseRepo<any> {
  constructor() {
    super(`public.category`);
  }

  async create(params) {
    const data = await this.insert({
      id: this.generateRecordId(),
      name: params.category_name,
    });

    return data;
  }

  async updateOne(params) {
    const data = await this.updateById(params.id, {
      name: params.category_name,
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
      .select(['c.id', knex.raw('c.name as category_name'), 'c.created_at'])
      .from(`${this.tableName} as c`)
      .whereRaw('c.is_deleted is not true')
      .limit(limit ? Number(limit) : 20)
      .offset(offset ? Number(offset) : 0);

    if (from_date && to_date) {
      query.whereBetween('c.created_at', [from_date, to_date]);
    }

    if (keyword) {
      query.whereRaw(`c.name ilike ?`, ['%' + keyword + '%']);
    }

    return query;
  }

  async getOne(params) {
    const knex = this.knex;

    const query = knex
      .select(
        knex.raw([
          knex.raw('count(c.id) over() as total'),
          'c.id',
          'c.name as category_name',
          'array_agg(to_json(sc.*)) as sub_categories',
        ]),
      )
      .from(`${this.tableName} as c`)
      .leftJoin('sub_category as sc', 'sc.category_id', 'c.id')
      .where('c.id', params.id)
      .whereRaw('c.is_deleted is not true')
      .groupBy('c.id')
      .first();

    return query;
  }
}
