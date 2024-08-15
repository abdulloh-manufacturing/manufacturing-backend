import { Inject, Injectable } from '@nestjs/common';
import { ProductsRepo } from './repo/products.repo';
import { render } from '@shared/utils';

@Injectable()
export class ProductsService {
  @Inject() private readonly productsRepo: ProductsRepo;

  async create(params) {
    return this.productsRepo.create(params);
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

  async generateExcel(params){
    const data = await this.productsRepo.list(params);

    const columns = [
        { header: 'Kategoriya', key: 'category_name', width: 30 },
        { header: 'Subkategoriya', key: 'sub_category_name', width: 30},
        { header: 'Rangi', key: 'color', width: 30},
        { header: 'Kodi', key: 'code', width: 30},
        { header: 'Narxi', key: 'price', width: 30},
        { header: 'Valyuta turi', key: 'currency_type', width: 30},
        { header: 'Soni', key: 'value', width: 30},
        { header: 'Model', key: 'model_name', width: 30},
        { header: 'Kirgan vaqti', key: 'created_at', width: 30},
      ];

    return render(data, columns, 'products')
  }	
}
