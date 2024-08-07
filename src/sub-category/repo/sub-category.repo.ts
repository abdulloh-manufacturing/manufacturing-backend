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

  async list(params) {
  	const knex = this.knex;

    const {keyword, from_date, to_date, page, limit = 20 } = params;
    const offset = (page - 1) * limit;

    const query = knex
			.select(knex.raw(['sc.id', 'sc.name', 'c.name as category_name', 'sc.created_at']))
			.from(`${this.tableName} as sc`)
      .leftJoin('category as c', 'c.id', 'sc.category_id')
			.whereRaw('sc.is_deleted is not true')
      .limit(limit ? Number(limit) : 20)
      .offset(offset ? Number(offset) : 0);

      if (from_date && to_date) {
        query.whereBetween('sc.created_at', [from_date, to_date]);
      }

      if (keyword) {
        query.whereRaw(`sc.name ilike ?`, ['%' + keyword + '%']);
      }

      return query
  }

  async getOne(params) {
  	const knex = this.knex;

    console.log(params);

    const query = knex
			.select(knex.raw(['sc.id', 'sc.name as sub_category_name', 'array_agg(to_json(vt.*)) as valume_types']))
			.from(`${this.tableName} as sc`)
      .leftJoin('valume_types as vt', 'vt.sub_category_id', 'sc.id')
			.where('sc.id', params.id)
			.whereRaw('sc.is_deleted is not true')
      .groupBy('sc.id')
			.first();

		return query;
  }
}
