import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/schemas/user.schema';
import { verify } from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {

    constructor(
        @InjectModel(User.name)
        private userModel: Model<UserDocument>
    ) { }

    verificarAdmin(authorization: string) {
        const token = authorization?.replace('Bearer ', '') || '';
        const verificado = verify(token, process.env.JWT_SECRET!) as any;
        if (verificado.perfil !== 'administrador') {
            throw new UnauthorizedException('No sos administrador');
        }
        return verificado;
    }

    async listarUsuarios() {
        return this.userModel.find().select('-password');
    }

    async crearUsuario(datos: any) {

        try {

            const hashedPassword = await bcrypt.hash(datos.password, 10);

            const nuevoUsuario = new this.userModel({
                ...datos,
                password: hashedPassword
            });

            return await nuevoUsuario.save();

        } catch (error: any) {

            if (error.code === 11000) {

                if (error.keyPattern?.email) {
                    throw new ConflictException('El email ya está registrado');
                }

                if (error.keyPattern?.username) {
                    throw new ConflictException('El usuario ya existe');
                }

                throw new ConflictException('Ya existe un usuario con esos datos');
            }

            throw error;
        }
    }


    async deshabilitarUsuario(id: string) {
        return this.userModel.findByIdAndUpdate(
            id,
            { activo: false },
            { new: true }
        ).select('-password');
    }

    async habilitarUsuario(id: string) {
        return this.userModel.findByIdAndUpdate(
            id,
            { activo: true },
            { new: true }
        ).select('-password');
    }
}