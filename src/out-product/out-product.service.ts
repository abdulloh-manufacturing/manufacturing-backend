import { Inject, Injectable } from '@nestjs/common';
import { OutProductRepo } from './repo/out-product.repo';
import { ProductsRepo } from 'src/products/repo/products.repo';
import { render } from '@shared/utils';

@Injectable()
export class OutProductService {
  @Inject() private readonly outProductRepo: OutProductRepo;
  @Inject() private readonly productsRepo: ProductsRepo;

  async out(params) {
    const knex = this.outProductRepo.knex;

    return await knex.transaction(async (trx) => {
      const {value} = await this.productsRepo.getByUniqueCodeWithTransaction(
        trx,
        params.id,
      );

      const data = await this.productsRepo.updateByUniqueCodeWithTransaction(
        trx,
        params.id,
        {
          value: Number(value) - params.out_value,
        },
      );

      await this.outProductRepo.insertWithTransaction(trx, {
        id: this.outProductRepo.generateRecordId(),
        product_id: params.id,
      });

      return { success: true };
    });
  }

  async list(params) {
    const data = await this.outProductRepo.list(params);

	return { total: data.length > 0 && data[0].total, data }
  }

  async generateExcel(params){
    const data = await this.outProductRepo.list(params);

    const columns = [
        { header: 'Kategoriya', key: 'category_name', width: 30 },
        { header: 'Subkategoriya', key: 'sub_category_name', width: 30},
        { header: 'Rangi', key: 'color', width: 30},
        { header: 'Kodi', key: 'code', width: 30},
        { header: 'Narxi', key: 'price', width: 30},
        { header: 'Valyuta turi', key: 'currency_type', width: 30},
        { header: 'Model', key: 'model_name', width: 30},
        { header: 'Kirgan vaqti', key: 'created_at', width: 30},
        { header: 'Chiqib ketish vaqti', key: 'out_date', width: 30},
      ];

    return render(data, columns, 'out-product')
  }	
}
