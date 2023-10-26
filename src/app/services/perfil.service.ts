import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private baseUrl = environment.backendUrl;

  constructor(private http: HttpClient) { }

  getPerfilData(token: string): Observable<any> {
    const headers = { Authorization: token };
    return this.http.get<any>(`${this.baseUrl}perfil`, { headers });
  }

  getTareasUsuario(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}tasks`);
  }


}
