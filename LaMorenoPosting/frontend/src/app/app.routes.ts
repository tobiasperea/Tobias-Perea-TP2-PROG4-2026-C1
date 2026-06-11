import { Routes } from '@angular/router';


export const routes: Routes = [
  { path: '', redirectTo: 'loading', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then(m => m.Login)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register').then(m => m.Register)
  },
  {
    path: 'loading',
    loadComponent: () =>
      import('./pages/loading/loading')
        .then(m => m.Loading)
  },
  {
    path: 'publicaciones',
    loadComponent: () => import('./pages/publicaciones/publicaciones').then(m => m.Publicaciones)
  },
  {
    path: 'publicacion/:id',
    loadComponent: () =>
      import('./pages/publicacion/publicacion')
        .then(m => m.Publicacion)
  },

  {
    path: 'perfil',
    loadComponent: () => import('./pages/perfil/perfil').then(m => m.Perfil)
  },
  {
    path: '**',
    loadComponent: () => import('./pages/error/error').then(m => m.Error)
  }
];