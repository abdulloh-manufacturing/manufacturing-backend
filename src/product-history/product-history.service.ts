import { Inject, Injectable } from '@nestjs/common';
import { ProductHistoryRepo } from './repo/product-history.dto';

@Injectable()
export class ProductHistoryService {
    @Inject() private readonly productHistoryRepo: ProductHistoryRepo;

  async create(trx, params) {
    const data = await this.productHistoryRepo.insertWithTransaction(trx, {
        id: this.productHistoryRepo.generateRecordId(),
        category_id: params.category_id,
        sub_category_id: params.sub_category_id,
        valume_type_id: params.valume_type_id,
        value: params.value,
        color: params.color,
        code: params.code,
        price: params.price,
        currency_type: params.currency_type,
        unique_code: params.unique_code
      });

      return data;
  }

  async list(params) {
    const data = await this.productHistoryRepo.list(params);

    return { total: data.length > 0 && data[0].total, data };
  }

  async update(params) {
    return this.productHistoryRepo.updateOne(params);
  }

  async delete(params) {
    return this.productHistoryRepo.deleteOne(params);
  }
}
