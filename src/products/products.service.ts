import { Inject, Injectable } from '@nestjs/common';
import { ProductsRepo } from './repo/products.repo';
import { render } from '@shared/utils';
import { isEmpty } from 'lodash';
import { ProductHistoryService } from 'src/product-history/product-history.service';

@Injectable()
export class ProductsService {
  @Inject() private readonly productsRepo: ProductsRepo;
  @Inject() private readonly productHistoryService: ProductHistoryService;

  async create(params) {
    await this.productHistoryService.create(params);

    return await this.productsRepo.knex.transaction(async (trx) => {
      const product = await this.productsRepo.getByUniqueCodeWithTransaction(
        trx,
        params.unique_code,
      );

      if (!isEmpty(product)) {
        console.log(Number(params.value) + Number(product.value));
        const data = await this.productsRepo.updateByUniqueCodeWithTransaction(
          trx,
          params.unique_code,
          {
            value: Number(params.value) + Number(product.value),
          },
        );

        return data;
      } else {
        const data = await this.productsRepo.insertWithTransaction(trx, {
          id: this.productsRepo.generateRecordId(),
          category_id: params.category_id,
          sub_category_id: params.sub_category_id,
          valume_type_id: params.valume_type_id,
          value: params.value,
          color: params.color,
          code: params.code,
          price: params.price,
          currency_type: params.currency_type,
          unique_code: params.unique_code,
        });

        return data;
      }
    });
  }

  async update(params) {
    return this.productsRepo.updateOne(params);
  }

  async delete(params) {
    return this.productsRepo.deleteOne(params);
  }

  async list(params) {
    const data = await this.productsRepo.list(params);

    return { total: data.length > 0 && data[0].total, data };
  }

  async getOne(params) {
    return this.productsRepo.getOne(params);
  }

  async getByUniqueCode(params) {
    return this.productsRepo.getByUniqueCode(params);
  }

  async generateExcel(params) {
    const data = await this.productsRepo.list(params);

    const columns = [
      { header: 'Kategoriya', key: 'category_name', width: 30 },
      { header: 'Subkategoriya', key: 'sub_category_name', width: 30 },
      { header: 'Rangi', key: 'color', width: 30 },
      { header: 'Kodi', key: 'code', width: 30 },
      { header: 'Narxi', key: 'price', width: 30 },
      { header: 'Valyuta turi', key: 'currency_type', width: 30 },
      { header: 'Soni', key: 'value', width: 30 },
      { header: 'Model', key: 'model_name', width: 30 },
      { header: 'Kirgan vaqti', key: 'created_at', width: 30 },
      { header: 'Unique Code', key: 'unique_code', width: 30 },
    ];

    return render(data, columns, 'products');
  }
}
