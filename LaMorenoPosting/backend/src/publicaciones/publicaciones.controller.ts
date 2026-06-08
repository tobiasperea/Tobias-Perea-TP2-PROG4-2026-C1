import { Body, Controller, Post, Get, Delete, Param, Query, Headers } from '@nestjs/common';

import { PublicacionesService } from './publicaciones.service';

import { CreatePublicacionDto } from './dto/create-publicacion.dto';
import { verify } from 'jsonwebtoken';

function getUsuarioId(authorization: string): string {
    const token = authorization?.replace('Bearer ', '') || '';

    const verificado = verify(
        token,
        process.env.JWT_SECRET || 'algoclavemuysecreta123'
    ) as any;

    return verificado.sub;
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
        const usuarioId = getUsuarioId(authorization);
        return this.publicacionesService.eliminar(id);
    }

    @Post()
    crear(
        @Body() createPublicacionDto: CreatePublicacionDto,
        @Headers('authorization') authorization: string
    ) {
        const usuarioId = getUsuarioId(authorization);
        return this.publicacionesService.crear(createPublicacionDto, usuarioId);
    }

    @Post(':id/like')
    darLike(
        @Param('id') id: string,
        @Headers('authorization') authorization: string
    ) {
        const usuarioId = getUsuarioId(authorization);
        return this.publicacionesService.darLike(id, usuarioId);
    }

    @Delete(':id/like')
    quitarLike(
        @Param('id') id: string,
        @Headers('authorization') authorization: string
    ) {
        const usuarioId = getUsuarioId(authorization);
        return this.publicacionesService.quitarLike(id, usuarioId);
    }


}