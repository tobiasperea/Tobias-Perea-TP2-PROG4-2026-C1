import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from '../users/schemas/user.schema';

import * as bcrypt from 'bcrypt';

import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name)
        private userModel: Model<UserDocument>
    ) { }

    async register(registerDto: RegisterDto) {

        const hashedPassword = await bcrypt.hash(registerDto.password, 10);

        const nuevoUsuario = new this.userModel({
            ...registerDto,
            password: hashedPassword,
            perfil: 'usuario'
        });

        return nuevoUsuario.save();
    }
}