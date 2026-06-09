import {Controller,Post,Get,Param,Body,Headers,Query} from '@nestjs/common';

import { ComentariosService } from './comentarios.service';
import { CreateComentarioDto } from './dto/create-comentario.dto';

import { verify } from 'jsonwebtoken';

function getUsuarioId(authorization: string): string {

  const token = authorization?.replace('Bearer ', '') || '';

  const verificado = verify(
    token,
    process.env.JWT_SECRET!
  ) as any;

  return verificado.sub;
}

@Controller('comentarios')
export class ComentariosController {

  constructor(
    private readonly comentariosService: ComentariosService
  ) {}

  @Post(':publicacionId')
  crear(
    @Param('publicacionId') publicacionId: string,
    @Body() createComentarioDto: CreateComentarioDto,
    @Headers('authorization') authorization: string
  ) {

    const usuarioId = getUsuarioId(authorization);

    return this.comentariosService.crear(
      createComentarioDto,
      usuarioId,
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
}