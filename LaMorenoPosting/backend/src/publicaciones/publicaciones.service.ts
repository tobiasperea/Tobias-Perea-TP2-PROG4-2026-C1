import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
    Publicacion,
    PublicacionDocument
} from './schemas/publicacion.schema';

import { CreatePublicacionDto } from './dto/create-publicacion.dto';

@Injectable()
export class PublicacionesService {

    constructor(
        @InjectModel(Publicacion.name)
        private publicacionModel: Model<PublicacionDocument>
    ) { }

    async crear(
        createPublicacionDto: CreatePublicacionDto,
        usuarioId: string
    ) {

        const nuevaPublicacion = new this.publicacionModel({
            ...createPublicacionDto,
            usuarioId
        });

        return nuevaPublicacion.save();
    }

    async listar(
        orden = 'fecha',
        limit = 10,
        offset = 0,
        usuarioId?: string
    ) {

        const filtro: any = {
            activo: true
        };

        if (usuarioId) {
            filtro.usuarioId = usuarioId;
        }

        let query = this.publicacionModel.find(filtro);

        if (orden === 'likes') {

            query = query.sort({
                likes: -1
            });

        } else {

            query = query.sort({
                createdAt: -1
            });

        }

        return query
            .skip(Number(offset))
            .limit(Number(limit));
    }

    async eliminar(id: string) {

        return this.publicacionModel.findByIdAndUpdate(
            id,
            { activo: false },
            { new: true }
        );
    }

    async darLike(id: string, usuarioId: string) {

        return this.publicacionModel.findByIdAndUpdate(
            id,
            {
                $addToSet: {
                    likes: usuarioId
                }
            },
            { new: true }
        );
    }
    async quitarLike(id: string, usuarioId: string) {

        return this.publicacionModel.findByIdAndUpdate(
            id,
            {
                $pull: {
                    likes: usuarioId
                }
            },
            { new: true }
        );
    }
}