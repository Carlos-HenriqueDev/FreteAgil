import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-historico',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoComponent implements OnInit {
  nomeMotorista = '';
  
  historico = [
    { origem: 'Boa Viagem', destino: 'Casa Forte', tipo: 'mudança' },
    { origem: 'Santo Amaro', destino: 'Madalena', tipo: 'entrega' },
    { origem: 'Jardim Jordão', destino: 'Prazeres', tipo: 'mudança' }
  ];

  ngOnInit() {
    // Busca o nome do motorista
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      this.nomeMotorista = user.nome;
    } else {
      this.nomeMotorista = localStorage.getItem('nomeMotorista') || 'Motorista';
    }
  }
}