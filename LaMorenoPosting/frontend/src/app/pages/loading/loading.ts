import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthApiService } from '../../services/auth-api.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  templateUrl: './loading.html',
  styleUrl: './loading.css'
})
export class Loading implements OnInit {

  constructor(
    private authApiService: AuthApiService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log('ENTRE A LOADING');

    const token = localStorage.getItem('token');
    console.log('TOKEN', token);

    if (!token) {

      this.router.navigate(['/login']);
      return;

    }

    this.authApiService
      .autorizar(token)
      .subscribe({

        next: () => {
          setTimeout(() => {

            this.router.navigate(['/publicaciones']);

          }, 1500);

         

        },

        error: () => {

          localStorage.removeItem('token');
          localStorage.removeItem('usuario');

          setTimeout(() => {

            this.router.navigate(['/login']);

          }, 1500);

          

        }

      });

  }

}