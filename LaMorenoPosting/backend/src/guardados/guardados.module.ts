import { Module } from '@nestjs/common';
import { GuardadosController } from './guardados.controller';
import { GuardadosService } from './guardados.service';

@Module({
  controllers: [GuardadosController],
  providers: [GuardadosService]
})
export class GuardadosModule {}
