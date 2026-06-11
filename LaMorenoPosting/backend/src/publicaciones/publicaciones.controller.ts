import { Body, Controller, Post, Get, Delete, Param, Query, Headers } from '@nestjs/common';

import { PublicacionesService } from './publicaciones.service';

import { CreatePublicacionDto } from './dto/create-publicacion.dto';
import { verify } from 'jsonwebtoken';

function getUsuario(authorization: string) {

    const token = authorization?.replace('Bearer ', '') || '';

    const verificado = verify(
        token,
        process.env.JWT_SECRET || 'algoclavemuysecreta123'
    ) as any;

    return {
        usuarioId: verificado.sub,
        username: verificado.username
    };

}

@Controller('publicaciones')
export class PublicacionesController {

    constructor(
        private readonly publicacionesService: PublicacionesService
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
    crear(
        @Body() createPublicacionDto: CreatePublicacionDto,
        @Headers('authorization') authorization: string
    ) {
        const usuario = getUsuario(authorization);
        return this.publicacionesService.crear(createPublicacionDto, usuario.usuarioId,usuario.username);
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