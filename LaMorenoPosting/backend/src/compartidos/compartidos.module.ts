import { Module } from '@nestjs/common';
import { CompartidosController } from './compartidos.controller';
import { CompartidosService } from './compartidos.service';

@Module({
  controllers: [CompartidosController],
  providers: [CompartidosService]
})
export class CompartidosModule {}
