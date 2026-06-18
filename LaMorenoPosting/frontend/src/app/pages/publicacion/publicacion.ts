import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';

import { PublicacionesService } from '../../services/publicaciones.service';
import { ComentariosService } from '../../services/comentarios.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-publicacion-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './publicacion.html',
  styleUrl: './publicacion.css'
})
export class Publicacion implements OnInit {

  publicacion: any;
  comentarios: any[] = [];
  nuevoComentario = '';

  comentarioEditando: string | null = null;
  textoEditado = '';

  limit = 5;
  offset = 0;
  hayMas = true;
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

          this.cargarComentarios();

        });

    }

  }

  crearComentario() {

    if (!this.nuevoComentario.trim()) {
      return;
    }

    this.comentariosService
      .crearComentario(
        this.publicacion._id,
        this.nuevoComentario
      )
      .subscribe((res: any) => {

        console.log('COMENTARIO OK', res);

        this.comentarios.unshift(res);

        this.nuevoComentario = '';
        this.cdr.detectChanges();

      });

  }
  get usuarioActual() {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario).id : '';
  }

  editarComentario(comentario: any) {

    this.comentarioEditando = comentario._id;
    this.textoEditado = comentario.contenido;

  }
  guardarComentario(comentario: any) {

    this.comentariosService
      .editarComentario(
        comentario._id,
        this.textoEditado
      )
      .subscribe((res: any) => {

        comentario.contenido = res.contenido;
        comentario.modificado = res.modificado;

        this.comentarioEditando = null;

        this.cdr.detectChanges();

      });

  }

  cargarComentarios() {

    this.comentariosService
      .obtenerComentarios(
        this.publicacion._id,
        this.limit,
        this.offset
      )
      .subscribe((res: any) => {

        this.comentarios.push(...res);

        this.hayMas = res.length === this.limit;

        this.offset += this.limit;

        this.cdr.detectChanges();

      });

  }

}