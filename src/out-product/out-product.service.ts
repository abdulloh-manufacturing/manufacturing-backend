import { Inject, Injectable } from '@nestjs/common';
import { OutProductRepo } from './repo/out-product.repo';
import { ProductsRepo } from 'src/products/repo/products.repo';

@Injectable()
export class OutProductService {
  @Inject() private readonly outProductRepo: OutProductRepo;
  @Inject() private readonly productsRepo: ProductsRepo;

  async out(params) {
    const knex = this.outProductRepo.knex;

    return await knex.transaction(async (trx) => {
      const oldValue = await this.productsRepo.getByIdWithTransaction(
        trx,
        params.id,
      );

      const data = await this.productsRepo.updateByIdWithTransaction(
        trx,
        params.id,
        {
          value: oldValue.value - 1,
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
}
