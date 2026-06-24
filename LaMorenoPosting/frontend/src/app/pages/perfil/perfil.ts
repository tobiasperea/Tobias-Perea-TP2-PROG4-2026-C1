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
  errorMsg = '';
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
    console.log('USUARIO LOGUEADO', usuarioLogueado);
    console.log('ID', usuarioLogueado?.id);
    console.log('_ID', usuarioLogueado?._id);

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
    this.errorMsg = '';

    if (!this.datosEdicion.nombre.trim()) {
      this.errorMsg = 'El nombre no puede estar vacío';
      return;
    }
    if (!this.datosEdicion.apellido.trim()) {
      this.errorMsg = 'El apellido no puede estar vacío';
      return;
    }
    if (!this.datosEdicion.username.trim()) {
      this.errorMsg = 'El username no puede estar vacío';
      return;
    }

    const formData = new FormData();
    formData.append('nombre', this.datosEdicion.nombre);
    formData.append('apellido', this.datosEdicion.apellido);
    formData.append('username', this.datosEdicion.username);
    formData.append('descripcion', this.datosEdicion.descripcion);

    this.http.put<any>(
      `${environment.apiUrl}/users/perfil`,
      formData,
      { headers: this.headers() }
    ).subscribe({
      next: (res: any) => {
        this.http.post<any>(
          `${environment.apiUrl}/auth/refrescar`,
          {},
          { headers: this.headers() }
        ).subscribe((tokenRes: any) => {
          this.auth.setUsuario(res, tokenRes.token);
          this.usuarioVisto = res;
          this.usuario = res;
          this.cargarPublicaciones(res.id || res._id);
          this.editando = false;
          this.cdr.detectChanges();
        });
      },
      error: (err) => {
        if (err.status === 400) {
          this.errorMsg = err.error?.message || 'El username ya está en uso';
        } else {
          this.errorMsg = 'Error al guardar el perfil';
        }
        this.cdr.detectChanges();
      }
    });
  }
  recargarPerfil() {
    this.cargarPublicaciones(
      this.usuarioVisto.id || this.usuarioVisto._id
    );
  }
}