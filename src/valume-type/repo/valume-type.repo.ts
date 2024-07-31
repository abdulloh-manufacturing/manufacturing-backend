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
    });

    return data;
  }

  async updateOne(params) {
    const data = await this.updateById(params.id, {
      name: params.valume_name,
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
			.select(['vt.*'])
			.from(`${this.tableName} as vt`)
			.whereRaw('vt.is_deleted is not true');

      return query
  }

  // async getOne(params) {
  // 	const knex = this.knex;
  // }
}
