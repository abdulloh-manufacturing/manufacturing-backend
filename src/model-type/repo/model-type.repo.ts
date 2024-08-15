import { BaseRepo } from '../../shared/providers/base-dao';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ModelTypeRepo extends BaseRepo<any> {
  constructor() {
    super(`public.model`);
  }

  async create(params) {
    const data = await this.insert({
      id: this.generateRecordId(),
      name: params.model_name,
    });

    return data;
  }

  async updateOne(params) {
    const data = await this.updateById(params.id, {
      name: params.model_name,
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
      .select([
        knex.raw('count(m.id) over() as total'),
        'm.id',
        knex.raw('m.name as model_name'),
        'm.created_at',
      ])
      .from(`${this.tableName} as m`)
      .whereRaw('m.is_deleted is not true')
      .orderBy('m.created_at', 'desc')
      .limit(limit ? Number(limit) : 20)
      .offset(offset ? Number(offset) : 0);

    if (from_date) {
      query.where(`m.created_at`, '>=', knex.raw('?', from_date));
    }

    if (to_date) {
      query.where(`m.created_at`, '<=', knex.raw('?', `${to_date} 23:59:59`));
    }

    if (keyword) {
      query.whereRaw(`m.name ilike ?`, ['%' + keyword + '%']);
    }

    return query;
  }

  async getOne(params) {
    const knex = this.knex;

    const query = knex
      .select([knex.raw(['m.id', 'm.name as model_name', 'm.created_at'])])
      .from(`${this.tableName} as m`)
      .where('m.id', params.id)
      .whereRaw('m.is_deleted is not true')
      .first();

    return query;
  }

  //coment
}
