import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { FechaRelativaPipe } from '../../pipes/fecha-relativa.pipe';
import { TruncarPipe } from '../../pipes/truncar.pipe';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { ResaltarDirective } from '../../directives/resaltar.directive';

import { PublicacionesService } from '../../services/publicaciones.service';

@Component({
  selector: 'app-publicacion',
  standalone: true,
  imports: [CommonModule, FechaRelativaPipe, TruncarPipe, CapitalizePipe, ResaltarDirective, RouterLink],
  templateUrl: './publicacion.html',
  styleUrl: './publicacion.css',
})
export class Publicacion {

  @Input()
  publicacion: any;

  @Output()
  eliminada = new EventEmitter<void>();
  mostrarConfirmacion = false;


  get usuarioActual() {
    const usuario = localStorage.getItem('usuario');
    const id = usuario ? JSON.parse(usuario).id : '';
    //console.log('usuarioActual:', id, 'publicacion.usuarioId:', this.publicacion?.usuarioId);
    return id;
  }

  constructor(
    private publicacionesService: PublicacionesService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private auth: AuthService
  ) { }

  darLike() {

    this.publicacionesService
      .darLike(this.publicacion._id)
      .subscribe(res => {

        console.log('LIKE OK', res);
        this.publicacion = res;
        this.cdr.detectChanges();

      });

  }

  tieneLike() {

    return this.publicacion.likes.includes(
      this.usuarioActual
    );

  }

  quitarLike() {

    this.publicacionesService
      .quitarLike(this.publicacion._id)
      .subscribe((res: any) => {

        this.publicacion = res;
        this.cdr.detectChanges();

      });

  }
  mostrarModalEliminar() {
    this.mostrarConfirmacion = true;
  }

  confirmarEliminar() {
    this.publicacionesService
      .eliminar(this.publicacion._id)
      .subscribe(() => {
        this.mostrarConfirmacion = false;
        this.eliminada.emit();
      });
  }

  eliminar() {
    this.publicacionesService
      .eliminar(this.publicacion._id)
      .subscribe(() => {
        this.mostrarConfirmacion = false;
        this.eliminada.emit();
      });
  }
  verPublicacion() {

    this.router.navigate([
      '/publicacion',
      this.publicacion._id
    ]);

  }

  get esAdmin() {
    return this.auth.esAdmin();
  }

  irAPublicacion() {
    this.router.navigate(['/publicacion', this.publicacion._id]);
  }

}