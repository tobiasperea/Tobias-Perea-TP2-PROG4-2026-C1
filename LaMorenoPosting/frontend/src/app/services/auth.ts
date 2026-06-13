import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuario = signal<any>(null);

  constructor(
    private router: Router,
    private sessionService: SessionService
  ) {
    const data = localStorage.getItem('usuario');

    if (data) {
      this.usuario.set(JSON.parse(data));
    }
  }

  setUsuario(usuario: any, token: string) {

    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario.set(usuario);

    this.sessionService.iniciarSesion();

  }

  logout() {

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.usuario.set(null);

    this.router.navigate(['/login']);

  }

  getToken() {
    return localStorage.getItem('token');
  }

  estaLogueado() {
    return this.usuario() !== null;
  }

}