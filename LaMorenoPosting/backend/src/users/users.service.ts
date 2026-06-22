import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
    User,
    UserDocument
} from './schemas/user.schema';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User.name)
        private userModel: Model<UserDocument>
    ) { }

    async buscarPorId(id: string) {
        return this.userModel
            .findById(id)
            .select('-password');
    }

    async actualizarPerfil(id: string, datos: any) {
        return this.userModel.findByIdAndUpdate(
            id,
            {
                nombre: datos.nombre,
                apellido: datos.apellido,
                descripcion: datos.descripcion,
                username: datos.username
            },
            { new: true }
        ).select('-password');
    }
    async buscarPorUsername(username: string) {
        return this.userModel.findOne({ username }).select('-password');
    }
}