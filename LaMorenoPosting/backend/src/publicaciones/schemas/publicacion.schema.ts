import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PublicacionDocument = Publicacion & Document;

@Schema({ timestamps: true })
export class Publicacion {

    @Prop({ required: true })
    titulo!: string;

    @Prop({ required: true })
    descripcion!: string;

    @Prop()
    imagenUrl!: string;

    @Prop({ required: true })
    usuarioId!: string;

    @Prop({ default: [] })
    likes!: string[];

    @Prop({ default: true })
    activo!: boolean;
}

export const PublicacionSchema =
    SchemaFactory.createForClass(Publicacion);