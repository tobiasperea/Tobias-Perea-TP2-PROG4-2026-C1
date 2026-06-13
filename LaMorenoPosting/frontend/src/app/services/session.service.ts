import { Injectable } from '@angular/core';


import { AuthApiService } from './auth-api.service';
import { AuthService } from './auth';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class SessionService {

    private warningTimer: any;
    private logoutTimer: any;

    constructor(
        private authApi: AuthApiService,
        private router: Router
    ) { }

    iniciarSesion() {

        clearTimeout(this.warningTimer);
        clearTimeout(this.logoutTimer);

        this.warningTimer = setTimeout(() => {

            const extender = confirm(
                'Tu sesión vence en 5 minutos. ¿Deseás extenderla?'
            );

            if (extender) {

                const token = localStorage.getItem('token');

                if (!token) {
                    return;
                }

                this.authApi
                    .refrescar(token)
                    .subscribe((res: any) => {

                        localStorage.setItem(
                            'token',
                            res.token
                        );

                        console.log('TOKEN REFRESCADO');

                        this.iniciarSesion();

                    });

            }



        }, 10 * 60 * 1000); //5000

        this.logoutTimer = setTimeout(() => {

            localStorage.removeItem('token');
            localStorage.removeItem('usuario');

            this.router.navigate(['/login']);

        }, 15 * 60 * 1000); //10000

    }

}