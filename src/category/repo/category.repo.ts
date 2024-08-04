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

  async list() {
  	const knex = this.knex;

    const query = knex
			.select(['c.*'])
			.from(`${this.tableName} as c`)
			.whereRaw('c.is_deleted is not true');

      return query
  }

  async getOne(params) {
  	const knex = this.knex;

    const query = knex
			.select([knex.raw('c.*')])
			.from(`${this.tableName} as c`)
			.where('c.id', params.id)
			.whereRaw('c.is_deleted is not true')
			.first();

		return query;
  }
}
