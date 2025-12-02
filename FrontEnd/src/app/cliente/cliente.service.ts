import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private apiUrl = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient) {}

  cadastrarCliente(dados: any): Observable<any> {
    return this.http.post(this.apiUrl, dados);
  }

  listarClientes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
