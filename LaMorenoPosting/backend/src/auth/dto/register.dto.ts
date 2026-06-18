import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  Matches,
  IsOptional, IsString
} from 'class-validator';

export class RegisterDto {

  @IsNotEmpty()
  nombre!: string;

  @IsNotEmpty()
  apellido!: string;

  @IsEmail()
  email!: string;

  @IsNotEmpty()
  username!: string;

  @MinLength(8)
  @Matches(/[A-Z]/, {
    message: 'La contraseña debe tener una mayúscula'
  })
  @Matches(/[0-9]/, {
    message: 'La contraseña debe tener un número'
  })
  password!: string;

  @IsNotEmpty()
  fechaNacimiento!: string;

  descripcion!: string;
  @IsOptional()
  @IsString()
  perfil?: string;
  @IsOptional()
  @IsString()
  imagenPerfil?: string;
}