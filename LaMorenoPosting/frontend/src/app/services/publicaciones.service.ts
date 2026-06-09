import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {

  constructor(private http: HttpClient) { }

  private headers() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  obtenerPublicaciones(orden = 'fecha', limit = 5, offset = 0, usuarioId?: string) {
    let url = `${environment.apiUrl}/publicaciones?orden=${orden}&limit=${limit}&offset=${offset}`;
    if (usuarioId) url += `&usuarioId=${usuarioId}`;
    return this.http.get(url);
  }

  crearPublicacion(datos: any) {
    return this.http.post(
      `${environment.apiUrl}/publicaciones`,
      datos,
      { headers: this.headers() }
    );
  }

  darLike(id: string) {
    return this.http.post(
      `${environment.apiUrl}/publicaciones/${id}/like`,
      {},
      { headers: this.headers() }
    );
  }

  quitarLike(id: string) {
    return this.http.delete(
      `${environment.apiUrl}/publicaciones/${id}/like`,
      { headers: this.headers() }
    );
  }

  eliminar(id: string) {
    return this.http.delete(
      `${environment.apiUrl}/publicaciones/${id}`,
      { headers: this.headers() }
    );
  }

  obtenerPublicacionPorId(id: string) {
    return this.http.get(
      `${environment.apiUrl}/publicaciones/${id}`
    );
  }
}