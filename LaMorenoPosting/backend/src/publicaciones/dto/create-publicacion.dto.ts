import { IsString, IsOptional } from 'class-validator';

export class CreatePublicacionDto {

    @IsString()
    titulo!: string;

    @IsString()
    descripcion!: string;

    @IsOptional()
    @IsString()
    imagenUrl?: string;
}