import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { PublicacionesService } from '../../services/publicaciones.service';
import { Publicacion } from '../../components/publicacion/publicacion';
import { ClickFueraDirective } from '../../directives/click-fuera.directive';
import { AutoFocusDirective } from '../../directives/auto-focus.directive';

@Component({
  selector: 'app-publicaciones',
  standalone: true,
  imports: [CommonModule, FormsModule, Navbar, Publicacion, ClickFueraDirective, AutoFocusDirective],
  templateUrl: './publicaciones.html',
  styleUrl: './publicaciones.css'
})
export class Publicaciones implements OnInit {

  publicaciones: any[] = [];
  orden = 'fecha';
  limit = 5;
  offset = 0;
  hayMas = false;

  mostrarFormulario = false;
  nuevoTitulo = '';
  nuevaDescripcion = '';
  nuevaImagenUrl = '';
  imagenFile: File | null = null;

  constructor(
    private publicacionesService: PublicacionesService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.publicacionesService
      .obtenerPublicaciones(this.orden, this.limit, this.offset)
      .subscribe((res: any) => {
        this.publicaciones = res;
        this.hayMas = res.length === this.limit;
        this.cdr.detectChanges();
      });
  }

  cambiarOrden(nuevoOrden: string) {
    this.orden = nuevoOrden;
    this.offset = 0;
    this.cargar();
  }

  paginaAnterior() {
    if (this.offset > 0) {
      this.offset -= this.limit;
      this.cargar();
    }
  }

  paginaSiguiente() {
    this.offset += this.limit;
    this.cargar();
  }
  onImagenSeleccionada(event: any) {
    this.imagenFile = event.target.files[0];
  }

  crearPublicacion() {
    if (!this.nuevoTitulo || !this.nuevaDescripcion) return;

    const formData = new FormData();
    formData.append('titulo', this.nuevoTitulo);
    formData.append('descripcion', this.nuevaDescripcion);
    if (this.imagenFile) {
      formData.append('imagen', this.imagenFile);
    } else if (this.nuevaImagenUrl) {
      formData.append('imagenUrl', this.nuevaImagenUrl);
    }

    this.publicacionesService.crearPublicacion(formData).subscribe(() => {
      this.nuevoTitulo = '';
      this.nuevaDescripcion = '';
      this.nuevaImagenUrl = '';
      this.imagenFile = null;
      this.mostrarFormulario = false;
      this.cargar();
    });
  }

}