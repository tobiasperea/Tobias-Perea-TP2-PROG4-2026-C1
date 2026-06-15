import { Body, Controller, Delete, Get, Headers, Param, Post } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {

    constructor(private readonly adminService: AdminService) {}

    @Get('usuarios')
    listar(@Headers('authorization') authorization: string) {
        this.adminService.verificarAdmin(authorization);
        return this.adminService.listarUsuarios();
    }

    @Post('usuarios')
    crear(
        @Headers('authorization') authorization: string,
        @Body() datos: any
    ) {
        this.adminService.verificarAdmin(authorization);
        return this.adminService.crearUsuario(datos);
    }

    @Delete('usuarios/:id')
    deshabilitar(
        @Headers('authorization') authorization: string,
        @Param('id') id: string
    ) {
        this.adminService.verificarAdmin(authorization);
        return this.adminService.deshabilitarUsuario(id);
    }

    @Post('usuarios/:id/habilitar')
    habilitar(
        @Headers('authorization') authorization: string,
        @Param('id') id: string
    ) {
        this.adminService.verificarAdmin(authorization);
        return this.adminService.habilitarUsuario(id);
    }
}