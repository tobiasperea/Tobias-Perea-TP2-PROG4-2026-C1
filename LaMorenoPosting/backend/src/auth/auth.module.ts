import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { User, UserSchema } from '../users/schemas/user.schema';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      }
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'algoclavemuysecreta123',
      signOptions: { expiresIn: '15m' }
    }),
    CloudinaryModule
  ],

  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}