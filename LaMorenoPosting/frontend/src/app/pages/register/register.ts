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

  constructor(private http: HttpClient, private router: Router) { }

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
    const fecha = new Date(this.fechaNacimiento);
    const hoy = new Date();

    let edad = hoy.getFullYear() - fecha.getFullYear();

    const mesActual = hoy.getMonth();
    const mesNacimiento = fecha.getMonth();

    if (
      mesActual < mesNacimiento ||
      (mesActual === mesNacimiento && hoy.getDate() < fecha.getDate())
    ) {
      edad--;
    }

    if (edad < 15) {
      this.errorMsg = 'Debés tener al menos 15 años';
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

    const formData = new FormData();
    formData.append('nombre', this.nombre);
    formData.append('apellido', this.apellido);
    formData.append('email', this.email);
    formData.append('username', this.username);
    formData.append('password', this.password);
    formData.append('fechaNacimiento', this.fechaNacimiento);
    formData.append('descripcion', this.descripcion);
    formData.append('perfil', this.perfil);
    if (this.imagenPerfil) {
      formData.append('imagenPerfil', this.imagenPerfil);
    }

    this.http.post<any>(`${environment.apiUrl}/auth/register`, formData)
      .subscribe({
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