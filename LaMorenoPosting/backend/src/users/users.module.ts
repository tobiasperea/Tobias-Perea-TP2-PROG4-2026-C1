import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { Publicacion, PublicacionSchema } from '../publicaciones/schemas/publicacion.schema';
import { Comentario, ComentarioSchema } from '../comentarios/schemas/comentario.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Publicacion.name, schema: PublicacionSchema },
      { name: Comentario.name, schema: ComentarioSchema }
    ]),
    CloudinaryModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [MongooseModule]
})
export class UsersModule {}