import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-propostas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './propostas.component.html',
  styleUrls: ['./propostas.component.css']
})
export class PropostasComponent {
  motoristas = [
    {
      nome: 'Jorge Matheus',
      nota: 4.98,
      veiculo: 'Caminhão de eixo simples com rodagem dupla',
      cargaMaxima: '10 toneladas'
    },
    {
      nome: 'Maria Souza',
      nota: 4.85,
      veiculo: 'Caminhão baú médio',
      cargaMaxima: '7 toneladas'
    }
  ];

  constructor(private router: Router) {}

  entrarEmContato(motorista: any) {
    console.log('Entrar em contato com:', motorista.nome);
    this.router.navigate(['/contato']);
  }
}
