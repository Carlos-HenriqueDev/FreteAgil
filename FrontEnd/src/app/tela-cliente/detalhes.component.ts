import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FreteService } from '../tela-cliente/frete.service';

@Component({
  selector: 'app-detalhes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css']
})
export class DetalhesComponent implements OnInit {
  coleta = '';
  destino = '';
  tipoTransporte = '';
  itensGrandes = ''; // String
  dataTransporte = '';
  frete: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private freteService: FreteService
  ) {}

  confirmarDetalhes() {
    // Pega o ID do usuário logado
    const usuarioId = localStorage.getItem('usuarioId');

    if (!usuarioId) {
      alert('Você precisa estar logado para criar um frete');
      this.router.navigate(['/cadastrado']);
      return;
    }

    // Prepara os dados do frete conforme o modelo do backend
    const dadosFrete = {
      usuario: {
        id: Number(usuarioId)
      },
      origem: this.coleta,
      destino: this.destino,
      tipoTransporte: this.tipoTransporte,
      itensGrandes: this.itensGrandes,
      dataTransporte: this.dataTransporte, // Formato: YYYY-MM-DD
      status: 'SOLICITADO' // Status inicial
    };

    console.log('Enviando dados do frete:', dadosFrete);

    // Envia para o backend
    this.freteService.criarFrete(dadosFrete).subscribe({
      next: (freteCriado) => {
        console.log('Frete criado com sucesso:', freteCriado);
        
        // Salva o ID do frete criado
        localStorage.setItem('freteId', freteCriado.id.toString());
        
        // Salva os dados no localStorage (para exibir no resumo)
        localStorage.setItem('dadosFrete', JSON.stringify({
          coleta: this.coleta,
          destino: this.destino,
          tipoTransporte: this.tipoTransporte,
          itensGrandes: this.itensGrandes,
          dataTransporte: this.dataTransporte
        }));

        // Navega para o resumo
        this.router.navigate(['/resumo'], { 
          state: {
            coleta: this.coleta,
            destino: this.destino,
            tipoTransporte: this.tipoTransporte,
            itensGrandes: this.itensGrandes,
            dataTransporte: this.dataTransporte,
            freteId: freteCriado.id
          }
        });
      },
      error: (err) => {
        console.error('Erro ao criar frete:', err);
        alert('Erro ao criar frete. Verifique os dados e tente novamente.');
      }
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.freteService.buscarFretePorId(id).subscribe({
        next: (frete) => {
          this.frete = frete;
          // Preenche os campos com os dados do frete
          this.coleta = frete.origem;
          this.destino = frete.destino;
          this.tipoTransporte = frete.tipoTransporte;
          this.itensGrandes = frete.itensGrandes;
          this.dataTransporte = frete.dataTransporte;
        },
        error: () => alert('Erro ao carregar detalhes do frete')
      });
    }
  }
}