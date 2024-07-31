import { Inject, Injectable } from '@nestjs/common';
import { ProductsRepo } from './repo/products.repo';

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
}
