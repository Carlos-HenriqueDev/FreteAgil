import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-cadastrado',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastrado.component.html',
  styleUrls: ['./cadastrado.component.css']
})
export class CadastradoComponent {
  email = '';
  senha = '';
  perfil = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  entrar() {
    if (!this.email || !this.senha || !this.perfil) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    this.authService.login(this.email, this.senha, this.perfil).subscribe({
      next: (token) => {
        // Backend retorna apenas o token JWT
        localStorage.setItem('token', token);
        localStorage.setItem('usuarioTipo', this.perfil);

        if (this.perfil === 'usuario') {
          this.router.navigate(['/detalhes']);
        } else if (this.perfil === 'motorista') {
          this.router.navigate(['/inicial-motorista']);
        }
      },
      error: (err) => {
        console.error('Erro de login:', err);
        alert('Email, senha ou perfil incorretos');
      }
    });
  }
}
