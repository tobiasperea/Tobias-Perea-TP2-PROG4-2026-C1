import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {

  constructor(
    private http: HttpClient
  ) { }

  

  darLike(id: string) {
    return this.http.post(
      `${environment.apiUrl}/publicaciones/${id}/like`,
      {}
    );
  }

  quitarLike(id: string) {
    return this.http.delete(
      `${environment.apiUrl}/publicaciones/${id}/like`
    );
  }

  eliminar(id: string) {
    return this.http.delete(
      `${environment.apiUrl}/publicaciones/${id}`
    );
  }

  obtenerPublicaciones(orden = 'fecha', limit = 5, offset = 0) {
    return this.http.get(
      `${environment.apiUrl}/publicaciones?orden=${orden}&limit=${limit}&offset=${offset}`
    );
  }
}