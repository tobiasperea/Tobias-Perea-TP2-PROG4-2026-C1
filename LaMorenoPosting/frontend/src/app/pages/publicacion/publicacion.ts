import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { PublicacionesService } from '../../services/publicaciones.service';
import { ComentariosService } from '../../services/comentarios.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-publicacion-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './publicacion.html',
  styleUrl: './publicacion.css'
})
export class Publicacion implements OnInit {

  publicacion: any;
  comentarios: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private publicacionesService: PublicacionesService,
    private comentariosService: ComentariosService,
    private cdr: ChangeDetectorRef

  ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {

      this.publicacionesService
        .obtenerPublicacionPorId(id)
        .subscribe((res: any) => {

          console.log('PUBLICACION', res);

          this.publicacion = res;

          this.comentariosService
            .obtenerComentarios(id)
            .subscribe((res: any) => {

              console.log('COMENTARIOS', res);

              this.comentarios = res;
              this.cdr.detectChanges();

            });

        });

    }

  }

}