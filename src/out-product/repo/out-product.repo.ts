import { BaseRepo } from '../../shared/providers/base-dao';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OutProductRepo extends BaseRepo<any> {
  constructor() {
    super(`public.out_product`);
  }
}
