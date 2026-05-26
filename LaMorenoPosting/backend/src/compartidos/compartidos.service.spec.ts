import { Test, TestingModule } from '@nestjs/testing';
import { CompartidosService } from './compartidos.service';

describe('CompartidosService', () => {
  let service: CompartidosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompartidosService],
    }).compile();

    service = module.get<CompartidosService>(CompartidosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
