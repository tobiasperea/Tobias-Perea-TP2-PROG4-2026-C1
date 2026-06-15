import { Controller, Get, Headers, Query, UnauthorizedException } from '@nestjs/common';
import { EstadisticasService } from './estadisticas.service';
import { verify } from 'jsonwebtoken';

@Controller('estadisticas')
export class EstadisticasController {

    constructor(private readonly estadisticasService: EstadisticasService) {}

    private verificarAdmin(authorization: string) {
        const token = authorization?.replace('Bearer ', '') || '';
        const verificado = verify(token, process.env.JWT_SECRET!) as any;
        if (verificado.perfil !== 'administrador') {
            throw new UnauthorizedException('No sos administrador');
        }
        return verificado;
    }

    @Get('publicaciones-por-usuario')
    publicacionesPorUsuario(
        @Headers('authorization') authorization: string,
        @Query('desde') desde?: string,
        @Query('hasta') hasta?: string
    ) {
        this.verificarAdmin(authorization);
        return this.estadisticasService.publicacionesPorUsuario(desde, hasta);
    }

    @Get('comentarios-por-dia')
    comentariosPorDia(
        @Headers('authorization') authorization: string,
        @Query('desde') desde?: string,
        @Query('hasta') hasta?: string
    ) {
        this.verificarAdmin(authorization);
        return this.estadisticasService.comentariosPorDia(desde, hasta);
    }

    @Get('comentarios-por-publicacion')
    comentariosPorPublicacion(
        @Headers('authorization') authorization: string,
        @Query('desde') desde?: string,
        @Query('hasta') hasta?: string
    ) {
        this.verificarAdmin(authorization);
        return this.estadisticasService.comentariosPorPublicacion(desde, hasta);
    }
}