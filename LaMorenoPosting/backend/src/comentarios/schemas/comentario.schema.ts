import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ComentarioDocument = Comentario & Document;

@Schema({ timestamps: true })
export class Comentario {

    @Prop({ required: true })
    contenido!: string;

    @Prop({ required: true })
    usuarioId!: string;

    @Prop({ required: true })
    publicacionId!: string;

    @Prop({ default: true })
    activo!: boolean;
}

export const ComentarioSchema =
    SchemaFactory.createForClass(Comentario);