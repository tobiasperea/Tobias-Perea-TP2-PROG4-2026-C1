import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {}

  private headers() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  listarUsuarios() {
    return this.http.get(
      `${environment.apiUrl}/admin/usuarios`,
      { headers: this.headers() }
    );
  }

  crearUsuario(datos: any) {
    return this.http.post(
      `${environment.apiUrl}/admin/usuarios`,
      datos,
      { headers: this.headers() }
    );
  }

  deshabilitarUsuario(id: string) {
    return this.http.delete(
      `${environment.apiUrl}/admin/usuarios/${id}`,
      { headers: this.headers() }
    );
  }

  habilitarUsuario(id: string) {
    return this.http.post(
      `${environment.apiUrl}/admin/usuarios/${id}/habilitar`,
      {},
      { headers: this.headers() }
    );
  }
}