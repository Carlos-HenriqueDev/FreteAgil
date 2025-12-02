import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { MotoristaService } from "./motorista.service";

@Component({
  selector: 'app-cadastro-veiculo',
  standalone: true,
  templateUrl: './cadastro-veiculo.component.html',
  styleUrls: ['./motorista.component.css'],
  imports: [CommonModule, FormsModule]
})
export class CadastroVeiculoComponent implements OnInit {

  nome = '';
  tipoSelecionado = '';
  modelo = '';
  placa = '';

  constructor(
    private router: Router,
    private motoristaService: MotoristaService
  ) {}

  ngOnInit() {
    // Recupera o nome do state (passado do motorista.component)
    const state = history.state;
    if (state && state.nome) {
      this.nome = state.nome;
      // Salva no localStorage para usar depois
      localStorage.setItem('nomeMotorista', this.nome);
    }
  }

  confirmarTipoVeiculo() {
    const motoristaId = localStorage.getItem("motoristaId");

    if (!motoristaId) {
      alert("Nenhum cadastro de motorista encontrado!");
      return;
    }

    const dadosVeiculo = {
      tipoCaminhao: this.tipoSelecionado,
      modeloVeiculo: this.modelo,
      placaVeiculo: this.placa
    };

    this.motoristaService.atualizarVeiculo(Number(motoristaId), dadosVeiculo)
      .subscribe({
        next: () => {
          alert("Veículo cadastrado com sucesso");
          // Passa o nome via state para a tela inicial
          this.router.navigate(["/inicial-motorista"], { 
            state: { nome: this.nome } 
          });
        },
        error: () => alert("Erro ao cadastrar veículo")
      });
  }
}
