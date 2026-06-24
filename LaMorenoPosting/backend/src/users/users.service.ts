import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Publicacion, PublicacionDocument } from '../publicaciones/schemas/publicacion.schema';
import { Comentario, ComentarioDocument } from '../comentarios/schemas/comentario.schema';

import {
    User,
    UserDocument
} from './schemas/user.schema';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Publicacion.name) private publicacionModel: Model<PublicacionDocument>,
        @InjectModel(Comentario.name) private comentarioModel: Model<ComentarioDocument>) { }

    async buscarPorId(id: string) {
        return this.userModel
            .findById(id)
            .select('-password');
    }

    async actualizarPerfil(id: string, datos: any) {
        const usuarioAnterior = await this.userModel.findById(id);
        const usernameAnterior = usuarioAnterior?.username;

        const usuarioActualizado = await this.userModel.findByIdAndUpdate(
            id,
            {
                nombre: datos.nombre,
                apellido: datos.apellido,
                descripcion: datos.descripcion,
                username: datos.username,
                imagenPerfil: datos.imagenPerfil
            },
            { new: true }
        ).select('-password');

        if (datos.username && datos.username !== usernameAnterior) {
            await this.publicacionModel.updateMany(
                { usuarioId: id },
                { username: datos.username }
            );
            await this.comentarioModel.updateMany(
                { usuarioId: id },
                { username: datos.username }
            );
        }

        return {
            id: usuarioActualizado!._id,
            nombre: usuarioActualizado!.nombre,
            apellido: usuarioActualizado!.apellido,
            email: usuarioActualizado!.email,
            username: usuarioActualizado!.username,
            perfil: usuarioActualizado!.perfil,
            imagenPerfil: usuarioActualizado!.imagenPerfil,
            descripcion: usuarioActualizado!.descripcion
        };
    }
    async buscarPorUsername(username: string) {
        return this.userModel.findOne({ username }).select('-password');
    }
}