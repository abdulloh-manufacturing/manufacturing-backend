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
    });

    return data;
  }

  async updateOne(params) {
    const data = await this.updateById(params.id, {
      name: params.sub_category_name,
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
