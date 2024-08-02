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

  async list() {
  	const knex = this.knex;

    const query = knex
			.select(['m.*'])
			.from(`${this.tableName} as m`)
			.whereRaw('m.is_deleted is not true');

      return query
  }

  // async getOne(params) {
  // 	const knex = this.knex;
  // }
}
