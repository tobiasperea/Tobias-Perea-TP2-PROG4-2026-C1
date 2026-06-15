import { Injectable, signal } from '@angular/core';
import { AuthApiService } from './auth-api.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class SessionService {

    mostrarModal = signal(false);

    private warningTimer: any;
    private logoutTimer: any;

    constructor(
        private authApi: AuthApiService,
        private router: Router
    ) {}

    iniciarSesion() {
        clearTimeout(this.warningTimer);
        clearTimeout(this.logoutTimer);

        this.warningTimer = setTimeout(() => {
            this.mostrarModal.set(true);
        }, 10 * 60 * 1000); //10 * 60 * 1000 //5000

        this.logoutTimer = setTimeout(() => {
            this.mostrarModal.set(false);
            localStorage.removeItem('token');
            localStorage.removeItem('usuario');
            this.router.navigate(['/login']);
        }, 15 * 60 * 1000);
    }

    extender() {
        const token = localStorage.getItem('token');
        if (!token) return;

        this.authApi.refrescar(token).subscribe((res: any) => {
            localStorage.setItem('token', res.token);
            this.mostrarModal.set(false);
            this.iniciarSesion();
        });
    }

    cerrar() {
        this.mostrarModal.set(false);
        clearTimeout(this.warningTimer);
        clearTimeout(this.logoutTimer);
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        this.router.navigate(['/login']);
    }
}