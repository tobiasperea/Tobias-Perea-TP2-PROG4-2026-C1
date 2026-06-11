import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  constructor(
    private http: HttpClient
  ) { }

  obtenerComentarios(
    publicacionId: string,
    limit = 5,
    offset = 0
  ) {

    return this.http.get(
      `${environment.apiUrl}/comentarios/${publicacionId}?limit=${limit}&offset=${offset}`
    );

  }

  crearComentario(
    publicacionId: string,
    contenido: string
  ) {

    const token = localStorage.getItem('token');

    return this.http.post(
      `${environment.apiUrl}/comentarios/${publicacionId}`,
      {
        contenido
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

  }

  editarComentario(
    id: string,
    contenido: string
  ) {

    return this.http.put(
      `${environment.apiUrl}/comentarios/${id}`,
      {
        contenido
      }
    );

  }

}