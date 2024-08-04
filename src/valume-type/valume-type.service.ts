import { Inject, Injectable } from '@nestjs/common';
import { ValumeTypeRepo } from './repo/valume-type.repo';

@Injectable()
export class ValumeTypeService {
    @Inject() private readonly valumeTypeRepo: ValumeTypeRepo;

  async create(params) {
    return this.valumeTypeRepo.create(params);
  }

  async update(params) {
    return this.valumeTypeRepo.updateOne(params);
  }

  async delete(params) {
    return this.valumeTypeRepo.deleteOne(params);
  }

  async list(){
		return this.valumeTypeRepo.list()
	}

  async getOne(params) {
		return this.valumeTypeRepo.getOne(params);
	}
}
