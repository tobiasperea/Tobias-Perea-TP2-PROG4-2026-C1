import { Module } from '@nestjs/common';
import { EstadisticasController } from './estadisticas.controller';
import { EstadisticasService } from './estadisticas.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Publicacion, PublicacionSchema } from '../publicaciones/schemas/publicacion.schema';
import { Comentario, ComentarioSchema } from '../comentarios/schemas/comentario.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Publicacion.name, schema: PublicacionSchema },
      { name: Comentario.name, schema: ComentarioSchema }
    ])
  ],
  controllers: [EstadisticasController],
  providers: [EstadisticasService]
})
export class EstadisticasModule {}