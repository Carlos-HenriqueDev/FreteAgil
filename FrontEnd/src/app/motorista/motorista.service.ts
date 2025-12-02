import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MotoristaService {

  
  private apiUrl = 'http://localhost:8080/api/motoristas';


  constructor(private http: HttpClient) {}

  // Buscar fretes por ID do motorista
  listarPorMotorista(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/motorista/${id}`);
  }

  // Cadastrar motorista
 cadastrarMotorista(dados: any) {
  return this.http.post(this.apiUrl, dados);
}


  // Cadastrar veículo
  cadastrarVeiculo(dados: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/veiculo`, dados);
  }

  // Listar veículos
  listarVeiculos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/veiculo`);
  }
  atualizarVeiculo(motoristaId: number, dadosVeiculo: any) {
  return this.http.put(`${this.apiUrl}/${motoristaId}/veiculo`, dadosVeiculo);
}


}
