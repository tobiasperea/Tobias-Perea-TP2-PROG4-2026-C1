import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../components/navbar/navbar';
import { AuthService } from '../../services/auth';
import { PublicacionesService } from '../../services/publicaciones.service';
import { Publicacion } from '../../components/publicacion/publicacion';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, Navbar, Publicacion],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css'
})
export class Perfil implements OnInit {

  usuario: any = null;
  ultimasPublicaciones: any[] = [];

  constructor(
    public auth: AuthService,
    private publicacionesService: PublicacionesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.usuario = this.auth.usuario();

    if (this.usuario) {
      this.publicacionesService
        .obtenerPublicaciones('fecha', 3, 0, this.usuario.id)
        .subscribe((res: any) => {
          this.ultimasPublicaciones = res;
          this.cdr.detectChanges();
        });
    }
  }
}