import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resumo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resumo.component.html',
  styleUrls: ['./resumo.component.css']
})
export class ResumoComponent implements OnInit {
  coleta = '';
  destino = '';
  tipoTransporte = '';
  itensGrandes = '';
  dataTransporte = '';

  constructor(private router: Router) {}

  ngOnInit() {
    // Tenta pegar do state primeiro
    const state = history.state;
    if (state && state.coleta) {
      this.coleta = state.coleta;
      this.destino = state.destino;
      this.tipoTransporte = state.tipoTransporte;
      this.itensGrandes = state.itensGrandes;
      this.dataTransporte = state.dataTransporte;
    } else {
      // Fallback: pega do localStorage
      const dadosFrete = localStorage.getItem('dadosFrete');
      if (dadosFrete) {
        const dados = JSON.parse(dadosFrete);
        this.coleta = dados.coleta;
        this.destino = dados.destino;
        this.tipoTransporte = dados.tipoTransporte;
        this.itensGrandes = dados.itensGrandes;
        this.dataTransporte = dados.dataTransporte;
      } else {
        // Se não houver dados, redireciona para detalhes
        alert('Preencha os dados do frete primeiro');
        this.router.navigate(['/detalhes']);
      }
    }
  }

  confirmarResumo() {
    console.log('Resumo confirmado');
    this.router.navigate(['/propostas']);
  }
}