import { Body, Controller, Get, Param, Put, Headers } from '@nestjs/common';
import { verify } from 'jsonwebtoken';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(
        private readonly usersService: UsersService
    ) { }

    @Get(':id')
    buscarPorId(
        @Param('id') id: string
    ) {
        return this.usersService.buscarPorId(id);
    }
    @Put('perfil')
    actualizarPerfil(
        @Headers('authorization') authorization: string,
        @Body() datos: any
    ) {
        const token = authorization?.replace('Bearer ', '') || '';
        const verificado = verify(token, process.env.JWT_SECRET!) as any;
        return this.usersService.actualizarPerfil(verificado.sub, datos);
    }
}