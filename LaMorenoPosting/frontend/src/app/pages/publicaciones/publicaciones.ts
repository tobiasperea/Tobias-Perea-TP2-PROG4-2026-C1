import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { PublicacionesService } from '../../services/publicaciones.service';
import { Publicacion } from '../../components/publicacion/publicacion';

@Component({
  selector: 'app-publicaciones',
  standalone: true,
  imports: [CommonModule, FormsModule, Navbar, Publicacion],
  templateUrl: './publicaciones.html',
  styleUrl: './publicaciones.css'
})
export class Publicaciones implements OnInit {

  publicaciones: any[] = [];
  orden = 'fecha';
  limit = 5;
  offset = 0;
  hayMas = true;

  constructor(
    private publicacionesService: PublicacionesService,
    private cdr: ChangeDetectorRef
  ) {}

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
}