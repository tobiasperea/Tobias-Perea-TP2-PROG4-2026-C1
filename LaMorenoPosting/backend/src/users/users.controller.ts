import { Body, Controller, Get, Param, Put, Headers, UploadedFile, UseInterceptors } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(
        private readonly usersService: UsersService,
        private readonly cloudinaryService: CloudinaryService
    ) { }

    @Get(':id')
    buscarPorId(@Param('id') id: string) {
        return this.usersService.buscarPorId(id);
    }

    @Put('perfil')
    @UseInterceptors(FileInterceptor('imagenPerfil'))
    async actualizarPerfil(
        @Headers('authorization') authorization: string,
        @Body() datos: any,
        @UploadedFile() file?: Express.Multer.File
    ) {
        const token = authorization?.replace('Bearer ', '') || '';
        const verificado = verify(token, process.env.JWT_SECRET!) as any;

        let imagenPerfilUrl = datos.imagenPerfil;

        if (file) {
            imagenPerfilUrl = await this.cloudinaryService.subirImagen(file);
        }

        return this.usersService.actualizarPerfil(verificado.sub, {
            ...datos,
            imagenPerfil: imagenPerfilUrl
        });
    }

    @Get('username/:username')
    buscarPorUsername(@Param('username') username: string) {
        return this.usersService.buscarPorUsername(username);
    }

}