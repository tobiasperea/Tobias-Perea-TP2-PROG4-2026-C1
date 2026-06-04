import { Component, Input } from '@angular/core';
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

  constructor(
    private publicacionesService: PublicacionesService
  ) {}

  darLike() {

    this.publicacionesService
      .darLike(this.publicacion._id)
      .subscribe(res => {

        console.log('LIKE OK', res);

      });

  }

  eliminar() {

    this.publicacionesService
      .eliminar(this.publicacion._id)
      .subscribe(res => {

        console.log('ELIMINADO', res);

      });

  }

}