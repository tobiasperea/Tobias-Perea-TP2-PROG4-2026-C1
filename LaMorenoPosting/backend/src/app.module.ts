import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PublicacionesModule } from './publicaciones/publicaciones.module';
import { ComentariosModule } from './comentarios/comentarios.module';
import { GuardadosModule } from './guardados/guardados.module';
import { AdminModule } from './admin/admin.module';
import { CompartidosModule } from './compartidos/compartidos.module';

import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRoot(process.env.MONGO_URI!),

    AuthModule,
    UsersModule,
    PublicacionesModule,
    ComentariosModule,
    GuardadosModule,
    AdminModule,
    CompartidosModule
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }