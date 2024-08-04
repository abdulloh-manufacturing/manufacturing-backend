import { BaseRepo } from '../../shared/providers/base-dao';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SubCategoryRepo extends BaseRepo<any> {
  constructor() {
    super(`public.sub_category`);
  }

  async create(params) {
    const data = await this.insert({
      id: this.generateRecordId(),
      name: params.sub_category_name,
      category_id: params.category_id
    });

    return data;
  }

  async updateOne(params) {
    const data = await this.updateById(params.id, {
      name: params.sub_category_name,
      category_id: params.category_id
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
			.select(['sc.*'])
			.from(`${this.tableName} as sc`)
			.whereRaw('sc.is_deleted is not true');

      return query
  }

  async getOne(params) {
  	const knex = this.knex;

    const query = knex
			.select([knex.raw('sc.*')])
			.from(`${this.tableName} as sc`)
			.where('sc.id', params.id)
			.whereRaw('sc.is_deleted is not true')
			.first();

		return query;
  }
}
