import { Test, TestingModule } from '@nestjs/testing';
import { GuardadosController } from './guardados.controller';

describe('GuardadosController', () => {
  let controller: GuardadosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GuardadosController],
    }).compile();

    controller = module.get<GuardadosController>(GuardadosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
