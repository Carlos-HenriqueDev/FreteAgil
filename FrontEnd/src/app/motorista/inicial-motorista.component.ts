import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-inicial-motorista',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './inicial-motorista.component.html',
  styleUrls: ['./inicial-motorista.component.css']
})
export class InicialMotoristaComponent implements OnInit {
  nomeMotorista = '';

  ngOnInit() {
    // Tenta pegar do state primeiro
    const state = history.state;
    if (state && state.nome) {
      this.nomeMotorista = state.nome;
    } else {
      // Fallback: pega do localStorage
      this.nomeMotorista = localStorage.getItem('nomeMotorista') || 'Motorista';
    }
  }
}