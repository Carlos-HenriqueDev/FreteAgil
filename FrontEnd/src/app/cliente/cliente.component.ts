import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent {
  nome = '';
  email = '';
  telefone = '';
  senha = '';

  constructor(
    private router: Router,
    private clienteService: ClienteService
  ) {}

  confirmarCadastro() {
    const dados = { 
      nome: this.nome, 
      email: this.email, 
      telefone: this.telefone,
      senha: this.senha 
    };
    
    this.clienteService.cadastrarCliente(dados).subscribe({
      next: (usuarioCriado: any) => {
        // Salva o ID do usuário retornado pelo backend
        localStorage.setItem('usuarioId', usuarioCriado.id.toString());
        
        this.router.navigate(['/detalhes']);
      },
      error: () => alert('Erro ao cadastrar cliente')
    });
  }
}