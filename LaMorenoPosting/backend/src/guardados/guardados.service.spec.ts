import { Test, TestingModule } from '@nestjs/testing';
import { GuardadosService } from './guardados.service';

describe('GuardadosService', () => {
  let service: GuardadosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GuardadosService],
    }).compile();

    service = module.get<GuardadosService>(GuardadosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
