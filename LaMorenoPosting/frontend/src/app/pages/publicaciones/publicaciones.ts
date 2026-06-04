import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { PublicacionesService } from '../../services/publicaciones.service';
import { Publicacion } from '../../components/publicacion/publicacion';

@Component({
  selector: 'app-publicaciones',
  standalone: true,
  imports: [CommonModule, Navbar, Publicacion],
  templateUrl: './publicaciones.html',
  styleUrl: './publicaciones.css'
})
export class Publicaciones implements OnInit {

  publicaciones: any[] = [];

  constructor(
    private publicacionesService: PublicacionesService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {

    console.log('ENTRE A PUBLICACIONES');

    this.publicacionesService
      .obtenerPublicaciones()
      .subscribe((res: any) => {

        console.log('RESPUESTA', res);

        this.publicaciones = res;
        this.cdr.detectChanges();

      });
  }


}