import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from '../users/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name)
        private userModel: Model<UserDocument>,
        private jwtService: JwtService
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

    async login(loginDto: LoginDto) {
        
        const usuario = await this.userModel.findOne({
            $or: [
                { email: loginDto.identificador },
                { username: loginDto.identificador }
            ]
        });

        if (!usuario) {
            throw new UnauthorizedException('Usuario no encontrado');
        }

        const passwordValido = await bcrypt.compare(loginDto.password, usuario.password);

        if (!passwordValido) {
            throw new UnauthorizedException('Contraseña incorrecta');
        }

        const payload = {
            sub: usuario._id,
            username: usuario.username,
            perfil: usuario.perfil
        };

        const token = this.jwtService.sign(payload);

        return {
            token,
            usuario: {
                id: usuario._id,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                email: usuario.email,
                username: usuario.username,
                perfil: usuario.perfil,
                imagenPerfil: usuario.imagenPerfil,
                descripcion: usuario.descripcion
            }
        };
    }
}