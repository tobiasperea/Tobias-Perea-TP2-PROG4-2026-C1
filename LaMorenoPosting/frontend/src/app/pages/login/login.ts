import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  identificador = '';
  password = '';
  errorMsg = '';
  cargando = false;
  usuariosPrueba = [
    { label: 'Admin', identificador: 'tobias', password: 'Hola1234' },
    { label: 'Usuario', identificador: 'accesorapido', password: 'A12345678' }
  ];

  constructor(private http: HttpClient, private router: Router, public auth: AuthService, private cdr: ChangeDetectorRef) { }

  login() {
    this.errorMsg = '';

    if (!this.identificador || !this.password) {
      this.errorMsg = 'Completá todos los campos';
      return;
    }

    if (this.password.length < 8) {
      this.errorMsg = 'La contraseña debe tener al menos 8 caracteres';
      return;
    }

    this.cargando = true;

    this.http.post<any>(`${environment.apiUrl}/auth/login`, {
      identificador: this.identificador,
      password: this.password
    }).subscribe({
      next: (res) => {
        this.auth.setUsuario(res.usuario, res.token);
        this.router.navigate(['/loading']);
      },
      error: (err) => {
        if (err.status === 401) {
          const msg = err.error?.message || '';
          if (msg.includes('deshabilitad')) {
            this.errorMsg = 'Tu cuenta está deshabilitada';
          } else {
            this.errorMsg = 'Usuario o contraseña incorrectos';
          }
        } else {
          this.errorMsg = 'Error al iniciar sesión';
        }
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }
  loginRapido(usuario: any) {
    this.identificador = usuario.identificador;
    this.password = usuario.password;
  }
}