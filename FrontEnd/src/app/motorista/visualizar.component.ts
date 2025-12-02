import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-visualizar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './visualizar.component.html',
  styleUrls: ['./visualizar.component.css']
})
export class VisualizarComponent implements OnInit {
  nomeMotorista = '';
  
  solicitacoes = [
    { origem: 'Boa Viagem', destino: 'Casa Forte', tipo: 'mudança' },
    { origem: 'Santo Amaro', destino: 'Madalena', tipo: 'entrega' },
    { origem: 'Jardim Jordão', destino: 'Prazeres', tipo: 'mudança' },
    { origem: 'Bomba do Hemetério', destino: 'Boa Vista', tipo: 'entrega' }
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