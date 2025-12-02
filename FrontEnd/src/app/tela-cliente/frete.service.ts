import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FreteService {
  private apiUrl = 'http://localhost:8080/api/fretes';

  constructor(private http: HttpClient) {}

  // Criar novo frete
  criarFrete(dadosFrete: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, dadosFrete);
  }

  // Buscar frete por ID
  buscarFretePorId(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Listar todos os fretes
  listarFretes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Listar fretes por usuário
  listarFretesPorUsuario(usuarioId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuario/${usuarioId}`);
  }
}