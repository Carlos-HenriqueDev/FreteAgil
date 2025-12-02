import { Component } from '@angular/core';
import { MotoristaService } from './motorista.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-motorista',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './motorista.component.html',
  styleUrls: ['./motorista.component.css'],
})
export class MotoristaComponent {
  nome = '';
  telefone = '';
  email = '';
  senha = '';

  constructor(
    private router: Router,
    private motoristaService: MotoristaService
  ) {}
  
 confirmarCadastro() {
  const dados = {
    nome: this.nome,
    telefone: this.telefone,
    email: this.email,
    senha: this.senha 
  };

  this.motoristaService.cadastrarMotorista(dados).subscribe({
    next: (motoristaCriado: any) => {
      // Salva o ID retornado pelo backend
      localStorage.setItem('motoristaId', motoristaCriado.id.toString());

      this.router.navigateByUrl('/cadastro-veiculo', { state: { nome: this.nome } });
    },
    error: () => alert('Erro ao cadastrar motorista')
  });
}

}
