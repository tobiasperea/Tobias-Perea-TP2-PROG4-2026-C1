import { Body, Controller, Post, Get, Delete, Param, Query, Headers, UseInterceptors, UploadedFile } from '@nestjs/common';

import { PublicacionesService } from './publicaciones.service';

import { CreatePublicacionDto } from './dto/create-publicacion.dto';
import { verify } from 'jsonwebtoken';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

function getUsuario(authorization: string) {
    const token = authorization?.replace('Bearer ', '') || '';
    const verificado = verify(
        token,
        process.env.JWT_SECRET || 'algoclavemuysecreta123'
    ) as any;

    return {
        usuarioId: verificado.sub,
        username: verificado.username,
        imagenPerfil: verificado.imagenPerfil
    };
}

@Controller('publicaciones')
export class PublicacionesController {

    constructor(
        private readonly publicacionesService: PublicacionesService,
        private readonly cloudinaryService: CloudinaryService
    ) { }

    @Get()
    listar(
        @Query('orden') orden?: string,
        @Query('limit') limit?: number,
        @Query('offset') offset?: number,
        @Query('usuarioId') usuarioId?: string
    ) {
        return this.publicacionesService.listar(
            orden,
            limit,
            offset,
            usuarioId
        );
    }

    @Delete(':id')
    eliminar(
        @Param('id') id: string,
        @Headers('authorization') authorization: string
    ) {
        const usuarioId = getUsuario(authorization);
        return this.publicacionesService.eliminar(id);
    }

    @Post()
    @UseInterceptors(FileInterceptor('imagen'))
    async crear(
        @Body() createPublicacionDto: CreatePublicacionDto,
        @Headers('authorization') authorization: string,
        @UploadedFile() file?: Express.Multer.File
    ) {
        const verificado = getUsuario(authorization);

        let imagenUrl = createPublicacionDto.imagenUrl || '';
        if (file) {
            imagenUrl = await this.cloudinaryService.subirImagen(file);
        }

        return this.publicacionesService.crear(
            { ...createPublicacionDto, imagenUrl },
            verificado.usuarioId,
            verificado.username,
            verificado.imagenPerfil
        );
    }

    @Post(':id/like')
    darLike(
        @Param('id') id: string,
        @Headers('authorization') authorization: string
    ) {
        const usuario = getUsuario(authorization);
        return this.publicacionesService.darLike(id, usuario.usuarioId);
    }

    @Delete(':id/like')
    quitarLike(
        @Param('id') id: string,
        @Headers('authorization') authorization: string
    ) {
        const usuario = getUsuario(authorization);
        return this.publicacionesService.quitarLike(id, usuario.usuarioId);
    }

    @Get(':id')
    obtenerPorId(
        @Param('id') id: string
    ) {

        return this.publicacionesService.obtenerPorId(id);

    }


}