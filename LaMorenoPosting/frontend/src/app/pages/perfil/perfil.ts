import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth';
import { PublicacionesService } from '../../services/publicaciones.service';
import { Publicacion } from '../../components/publicacion/publicacion';
import { environment } from '../../../environments/environment';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule, Publicacion, Navbar],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css'
})
export class Perfil implements OnInit {

  usuario: any = null;
  ultimasPublicaciones: any[] = [];
  editando = false;

  datosEdicion = {
    nombre: '',
    apellido: '',
    username: '',
    descripcion: ''
  };

  constructor(
    public auth: AuthService,
    private publicacionesService: PublicacionesService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.usuario = this.auth.usuario();

    if (this.usuario) {
      this.datosEdicion = {
        nombre: this.usuario.nombre,
        apellido: this.usuario.apellido,
        username: this.usuario.username,
        descripcion: this.usuario.descripcion || ''
      };

      this.publicacionesService
        .obtenerPublicaciones('fecha', 3, 0, this.usuario.id)
        .subscribe((res: any) => {
          this.ultimasPublicaciones = res;
          this.cdr.detectChanges();
        });
    }
  }

  private headers() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  guardarPerfil() {
    this.http.put<any>(
      `${environment.apiUrl}/users/perfil`,
      this.datosEdicion,
      { headers: this.headers() }
    ).subscribe((res: any) => {
      this.auth.setUsuario(res, localStorage.getItem('token')!);
      this.usuario = res;
      this.editando = false;
      this.cdr.detectChanges();
    });
  }
}