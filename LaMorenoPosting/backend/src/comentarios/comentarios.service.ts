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
        publicacionId: string
    ) {

        const nuevoComentario = new this.comentarioModel({
            ...createComentarioDto,
            usuarioId,
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
}
