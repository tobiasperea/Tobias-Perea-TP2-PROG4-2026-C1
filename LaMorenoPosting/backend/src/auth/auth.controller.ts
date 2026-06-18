import { Body, Controller, Post,UseInterceptors, UploadedFile } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Headers } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService, private readonly cloudinaryService: CloudinaryService) { }

    @Post('register')
    @UseInterceptors(FileInterceptor('imagenPerfil'))
    async register(
        @Body() registerDto: RegisterDto,
        @UploadedFile() file?: Express.Multer.File
    ) {
        let imagenPerfilUrl = '';

        if (file) {
            imagenPerfilUrl = await this.cloudinaryService.subirImagen(file);
        }

        return this.authService.register({
            ...registerDto,
            imagenPerfil: imagenPerfilUrl
        });
    }

    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Post('autorizar')
    autorizar(@Headers('authorization') authorization: string) {
        const token = authorization?.replace('Bearer ', '') || '';
        return this.authService.autorizar(token);
    }

    @Post('refrescar')
    refrescar(@Headers('authorization') authorization: string) {
        const token = authorization?.replace('Bearer ', '') || '';
        return this.authService.refrescar(token);
    }
}