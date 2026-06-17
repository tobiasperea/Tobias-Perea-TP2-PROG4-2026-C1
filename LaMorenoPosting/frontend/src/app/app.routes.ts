import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

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
    loadComponent: () => import('./pages/loading/loading').then(m => m.Loading)
  },
  {
    path: 'publicaciones',
    loadComponent: () => import('./pages/publicaciones/publicaciones').then(m => m.Publicaciones),
    canActivate: [authGuard]
  },
  {
    path: 'publicacion/:id',
    loadComponent: () => import('./pages/publicacion/publicacion').then(m => m.Publicacion),
    canActivate: [authGuard]
  },
  {
    path: 'perfil',
    loadComponent: () => import('./pages/perfil/perfil').then(m => m.Perfil),
    canActivate: [authGuard]
  },
  {
    path: 'dashboard-usuarios',
    loadComponent: () => import('./pages/dashboard-usuarios/dashboard-usuarios').then(m => m.DashboardUsuarios),
    canActivate: [authGuard]
  },
  {
    path: 'dashboard-estadisticas',
    loadComponent: () => import('./pages/dashboard-estadisticas/dashboard-estadisticas').then(m => m.DashboardEstadisticas),
    canActivate: [authGuard]
  },
  {
    path: '**',
    loadComponent: () => import('./pages/error/error').then(m => m.Error)
  }
];