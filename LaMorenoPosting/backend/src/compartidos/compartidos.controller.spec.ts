import { Test, TestingModule } from '@nestjs/testing';
import { CompartidosController } from './compartidos.controller';

describe('CompartidosController', () => {
  let controller: CompartidosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompartidosController],
    }).compile();

    controller = module.get<CompartidosController>(CompartidosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
