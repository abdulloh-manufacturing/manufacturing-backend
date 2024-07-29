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
      name: params.category_name,
      category_id: params.category_id
    });

    return data;
  }

  async updateOne(params) {
    const data = await this.updateById(params.id, {
      name: params.category_name,
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

  // async list(params) {
  // 	const knex = this.knex;
  // }

  // async getOne(params) {
  // 	const knex = this.knex;
  // }
}
