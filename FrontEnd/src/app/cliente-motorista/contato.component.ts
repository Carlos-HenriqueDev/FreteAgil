import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent {
  mensagens = [
    { texto: 'Olá, consigo fazer sua entrega no dia desejado as 14:00!', enviado: false }
  ];

  novaMensagem = '';

  enviarMensagem() {
    if (this.novaMensagem.trim()) {
      this.mensagens.push({ texto: this.novaMensagem, enviado: true });
      this.novaMensagem = '';
    }
  }
}
