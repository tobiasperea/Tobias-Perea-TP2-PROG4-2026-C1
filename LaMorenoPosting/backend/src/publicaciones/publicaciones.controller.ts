import { Body, Controller, Post, Get, Delete, Param, Query } from '@nestjs/common';

import { PublicacionesService } from './publicaciones.service';

import { CreatePublicacionDto } from './dto/create-publicacion.dto';

@Controller('publicaciones')
export class PublicacionesController {

    constructor(
        private readonly publicacionesService: PublicacionesService
    ) { }

    @Post()
    crear(
        @Body() createPublicacionDto: CreatePublicacionDto
    ) {

        return this.publicacionesService.crear(
            createPublicacionDto,
            '123456'
        );
    }

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
    eliminar(@Param('id') id: string) {
        return this.publicacionesService.eliminar(id);
    }

    @Post(':id/like')
    darLike(
        @Param('id') id: string
    ) {

        return this.publicacionesService.darLike(
            id,
            '123456'
        );
    }

    @Delete(':id/like')
    quitarLike(
        @Param('id') id: string
    ) {

        return this.publicacionesService.quitarLike(
            id,
            '123456'
        );
    }
}