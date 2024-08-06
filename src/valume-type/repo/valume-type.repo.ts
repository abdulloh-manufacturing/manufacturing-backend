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
      sub_category_id: params.sub_category_id
    });

    return data;
  }

  async updateOne(params) {
    const data = await this.updateById(params.id, {
      name: params.valume_name,
      sub_category_id: params.sub_category_id
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
			.select(knex.raw(['vt.id', 'vt.name', 'sc.name as sub_category_name']))
			.from(`${this.tableName} as vt`)
      .leftJoin('sub_category as sc', 'sc.id', 'vt.sub_category_id')
			.whereRaw('vt.is_deleted is not true');

      return query;
  }

  async getOne(params) {
  	const knex = this.knex;

    const query = knex
			.select([knex.raw(['vt.id', 'vt.name as valume_type_name', 'vt.sub_category_id', 'vt.created_at'])])
			.from(`${this.tableName} as vt`)
			.where('vt.id', params.id)
			.whereRaw('vt.is_deleted is not true')
			.first();

		return query;
  }
}
