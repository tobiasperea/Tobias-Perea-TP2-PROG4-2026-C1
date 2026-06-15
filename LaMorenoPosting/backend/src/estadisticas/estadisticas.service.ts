import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Publicacion, PublicacionDocument } from '../publicaciones/schemas/publicacion.schema';
import { Comentario, ComentarioDocument } from '../comentarios/schemas/comentario.schema';

@Injectable()
export class EstadisticasService {

    constructor(
        @InjectModel(Publicacion.name)
        private publicacionModel: Model<PublicacionDocument>,
        @InjectModel(Comentario.name)
        private comentarioModel: Model<ComentarioDocument>
    ) { }

    async publicacionesPorUsuario(desde?: string, hasta?: string) {
        const filtro: any = { activo: true };
        if (desde || hasta) {
            filtro.createdAt = {};
            if (desde) filtro.createdAt.$gte = new Date(desde);
            if (hasta) filtro.createdAt.$lte = new Date(hasta);
        }
        return this.publicacionModel.aggregate([
            { $match: filtro },
            { $group: { _id: '$usuarioId', total: { $sum: 1 } } },
            { $sort: { total: -1 } }
        ]);
    }

    async comentariosPorDia(desde?: string, hasta?: string) {
        const filtro: any = { activo: true };
        if (desde || hasta) {
            filtro.createdAt = {};
            if (desde) filtro.createdAt.$gte = new Date(desde);
            if (hasta) filtro.createdAt.$lte = new Date(hasta);
        }
        return this.comentarioModel.aggregate([
            { $match: filtro },
            {
                $group: {
                    _id: {
                        $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
                    },
                    total: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);
    }

    async comentariosPorPublicacion(desde?: string, hasta?: string) {
        const filtro: any = { activo: true };
        if (desde || hasta) {
            filtro.createdAt = {};
            if (desde) filtro.createdAt.$gte = new Date(desde);
            if (hasta) filtro.createdAt.$lte = new Date(hasta);
        }
        return this.comentarioModel.aggregate([
            { $match: filtro },
            { $group: { _id: '$publicacionId', total: { $sum: 1 } } },
            { $sort: { total: -1 } },
            { $limit: 10 }
        ]);
    }
}