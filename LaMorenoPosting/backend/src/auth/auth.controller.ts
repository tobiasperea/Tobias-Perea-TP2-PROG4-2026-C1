import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Headers } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('register')
    register(@Body() registerDto: RegisterDto) {
        console.log(registerDto);
        return this.authService.register(registerDto);
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