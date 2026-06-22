import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth';
import { PublicacionesService } from '../../services/publicaciones.service';
import { Publicacion } from '../../components/publicacion/publicacion';
import { environment } from '../../../environments/environment';
import { Navbar } from '../../components/navbar/navbar';
import { ActivatedRoute } from '@angular/router';

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
  esMiPerfil = false;
  usuarioVisto: any = null;
  imagenPerfil: File | null = null;

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
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const usernameParam = this.route.snapshot.paramMap.get('username');
    const usuarioLogueado = this.auth.usuario();

    if (!usernameParam || usernameParam === usuarioLogueado?.username) {
      this.esMiPerfil = true;
      this.usuarioVisto = usuarioLogueado;
      this.usuario = usuarioLogueado;
      this.datosEdicion = {
        nombre: usuarioLogueado.nombre,
        apellido: usuarioLogueado.apellido,
        username: usuarioLogueado.username,
        descripcion: usuarioLogueado.descripcion || ''
      };
      this.cargarPublicaciones(usuarioLogueado.id);
      this.cdr.detectChanges();
    } else {
      this.esMiPerfil = false;
      this.http.get<any>(
        `${environment.apiUrl}/users/username/${usernameParam}`,
        { headers: this.headers() }
      ).subscribe((res: any) => {
        this.usuarioVisto = res;
        this.cargarPublicaciones(res._id);
        this.cdr.detectChanges();
      });
    }
  }

  cargarPublicaciones(id: string) {
    this.publicacionesService
      .obtenerPublicaciones('fecha', 3, 0, id)
      .subscribe((res: any) => {
        this.ultimasPublicaciones = res;
        this.cdr.detectChanges();
      });
  }

  private headers() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  guardarPerfil() {
    const formData = new FormData();
    formData.append('nombre', this.datosEdicion.nombre);
    formData.append('apellido', this.datosEdicion.apellido);
    formData.append('username', this.datosEdicion.username);
    formData.append('descripcion', this.datosEdicion.descripcion);
    if (this.imagenPerfil) {
      formData.append('imagenPerfil', this.imagenPerfil);
    }

    this.http.put<any>(
      `${environment.apiUrl}/users/perfil`,
      formData,
      { headers: this.headers() }
    ).subscribe((res: any) => {
      this.auth.setUsuario(res, localStorage.getItem('token')!);
      this.usuarioVisto = res;
      this.usuario = res;
      this.editando = false;
      this.cdr.detectChanges();
    });
  }
  onImagenSeleccionada(event: any) {
    this.imagenPerfil = event.target.files[0];
  }
}