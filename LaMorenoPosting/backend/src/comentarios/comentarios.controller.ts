import { Controller, Post, Get, Param, Body, Headers, Query, Put } from '@nestjs/common';

import { ComentariosService } from './comentarios.service';
import { CreateComentarioDto } from './dto/create-comentario.dto';

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

@Controller('comentarios')
export class ComentariosController {

  constructor(
    private readonly comentariosService: ComentariosService
  ) { }

  @Post(':publicacionId')
  crear(
    @Param('publicacionId') publicacionId: string,
    @Body() createComentarioDto: CreateComentarioDto,
    @Headers('authorization') authorization: string
  ) {

    const usuario = getUsuario(authorization);

    return this.comentariosService.crear(
      createComentarioDto,
      usuario.usuarioId,
      usuario.username,
      publicacionId
    );
  }

  @Get(':publicacionId')
  listar(
    @Param('publicacionId') publicacionId: string,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number
  ) {

    return this.comentariosService.listarPorPublicacion(
      publicacionId,
      limit,
      offset
    );
  }

  @Put(':id')
  editar(
    @Param('id') id: string,
    @Body() body: any
  ) {

    return this.comentariosService.editar(
      id,
      body.contenido
    );

  }
}