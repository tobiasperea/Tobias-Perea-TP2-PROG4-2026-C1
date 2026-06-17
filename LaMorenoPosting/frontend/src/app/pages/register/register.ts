import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  nombre = '';
  apellido = '';
  email = '';
  username = '';
  password = '';
  repetirPassword = '';
  fechaNacimiento = '';
  descripcion = '';
  imagenPerfil: File | null = null;
  errorMsg = '';
  cargando = false;
  perfil = 'usuario';

  constructor(private http: HttpClient, private router: Router) {}

  onImagenSeleccionada(event: any) {
    this.imagenPerfil = event.target.files[0];
  }

  registrar() {
    this.errorMsg = '';

    if (!this.nombre || !this.apellido || !this.email || !this.username || 
        !this.password || !this.repetirPassword || !this.fechaNacimiento) {
      this.errorMsg = 'Completá todos los campos obligatorios';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.errorMsg = 'El correo no tiene un formato válido';
      return;
    }

    if (this.password.length < 8) {
      this.errorMsg = 'La contraseña debe tener al menos 8 caracteres';
      return;
    }

    const mayuscula = /[A-Z]/.test(this.password);
    const numero = /[0-9]/.test(this.password);
    if (!mayuscula || !numero) {
      this.errorMsg = 'La contraseña debe tener al menos una mayúscula y un número';
      return;
    }

    if (this.password !== this.repetirPassword) {
      this.errorMsg = 'Las contraseñas no coinciden';
      return;
    }

    this.cargando = true;

    this.http.post<any>(`${environment.apiUrl}/auth/register`, {
      nombre: this.nombre,
      apellido: this.apellido,
      email: this.email,
      username: this.username,
      password: this.password,
      fechaNacimiento: this.fechaNacimiento,
      descripcion: this.descripcion,
      perfil: this.perfil
    }).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMsg = err.status === 400
          ? 'El correo o usuario ya están registrados'
          : 'Error al registrarse';
        this.cargando = false;
      }
    });
  }
}