import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FreteService } from '../tela-cliente/frete.service'

@Component({
  selector: 'app-frete',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './frete.component.html',
  styleUrls: ['./frete.component.css']
})
export class FreteComponent implements OnInit {
  coleta = '';
  destino = '';
  tipoTransporte = '';
  dataTransporte = '';
  frete: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private freteService: FreteService
  ) {}

  confirmarFrete() {
    const dados = {
      coleta: this.coleta,
      destino: this.destino,
      tipo: this.tipoTransporte,
      data: this.dataTransporte
    };

    this.freteService.criarFrete(dados).subscribe({
      next: () => this.router.navigate(['/resumo']),
      error: () => alert('Erro ao criar frete')
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.freteService.buscarFretePorId(id).subscribe({
        next: (frete) => this.frete = frete,
        error: () => alert('Erro ao carregar detalhes do frete')
      });
    }
  }
}
