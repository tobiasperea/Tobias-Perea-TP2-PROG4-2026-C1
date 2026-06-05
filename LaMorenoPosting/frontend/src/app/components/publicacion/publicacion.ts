import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicacionesService } from '../../services/publicaciones.service';

@Component({
  selector: 'app-publicacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './publicacion.html',
  styleUrl: './publicacion.css',
})
export class Publicacion {

  @Input()
  publicacion: any;

  @Output()
  eliminada = new EventEmitter<void>();

  usuarioActual = '123456';

  constructor(
    private publicacionesService: PublicacionesService,
    private cdr: ChangeDetectorRef
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

  eliminar() {
    this.publicacionesService
      .eliminar(this.publicacion._id)
      .subscribe(() => {
        this.eliminada.emit();
      });
  }

}