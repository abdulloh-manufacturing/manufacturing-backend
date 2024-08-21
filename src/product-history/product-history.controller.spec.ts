import { Test, TestingModule } from '@nestjs/testing';
import { ProductHistoryController } from './product-history.controller';

describe('ProductHistoryController', () => {
  let controller: ProductHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductHistoryController],
    }).compile();

    controller = module.get<ProductHistoryController>(ProductHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
