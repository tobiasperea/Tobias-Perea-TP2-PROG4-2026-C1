import { Injectable } from '@nestjs/common';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
    Comentario,
    ComentarioDocument
} from './schemas/comentario.schema';
@Injectable()
export class ComentariosService {
    constructor(
        @InjectModel(Comentario.name)
        private comentarioModel: Model<ComentarioDocument>
    ) { }

    async crear(
        createComentarioDto: CreateComentarioDto,
        usuarioId: string,
        username: string,
        publicacionId: string
    ) {

        const nuevoComentario = new this.comentarioModel({
            ...createComentarioDto,
            usuarioId,
            username,
            publicacionId
        });

        return nuevoComentario.save();
    }

    async listarPorPublicacion(
        publicacionId: string,
        limit = 10,
        offset = 0
    ) {

        return this.comentarioModel
            .find({
                publicacionId,
                activo: true
            })
            .sort({
                createdAt: -1
            })
            .skip(offset)
            .limit(limit);

    }

    async editar(
        id: string,
        contenido: string
    ) {

        return this.comentarioModel.findByIdAndUpdate(
            id,
            {
                contenido,
                modificado: true
            },
            {
                new: true
            }
        );

    }
}
