import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  private apiUrl = 'http://localhost:3000/auth';

  constructor(
    private http: HttpClient
  ) { }

  autorizar(token: string) {

    return this.http.post(
      `${this.apiUrl}/autorizar`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

  }

  refrescar(token: string) {

    return this.http.post(
      `${this.apiUrl}/refrescar`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

  }

}