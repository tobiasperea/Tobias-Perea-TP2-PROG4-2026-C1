import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {

  constructor(
    private http: HttpClient
  ) {}

  obtenerPublicaciones() {
    return this.http.get(
      `${environment.apiUrl}/publicaciones`
    );
  }

  darLike(id: string) {
    return this.http.post(
      `${environment.apiUrl}/publicaciones/${id}/like`,
      {}
    );
  }

  eliminar(id: string) {
    return this.http.delete(
      `${environment.apiUrl}/publicaciones/${id}`
    );
  }
}