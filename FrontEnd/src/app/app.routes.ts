import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },

  { 
    path: 'motorista', loadComponent: () =>
      import('./motorista/motorista.component').then(m => m.MotoristaComponent)
  },

  { 
    path: 'cliente', loadComponent: () =>
      import('./cliente/cliente.component').then(m => m.ClienteComponent)
  },

  { 
    path: 'cadastro-veiculo', loadComponent: () =>
      import('./motorista/cadastro-veiculo.component').then(m => m.CadastroVeiculoComponent)
  },

  { 
    path: 'cadastrado', loadComponent: () =>
      import('./login/cadastrado.component').then(m => m.CadastradoComponent)
  },
  
  { 
    path: 'detalhes', loadComponent: () =>
      import('./tela-cliente/detalhes.component').then(m => m.DetalhesComponent)
  },

  { 
    path: 'resumo', loadComponent: () =>
      import('./tela-cliente/resumo.component').then(m => m.ResumoComponent)
  },
  
  { 
    path: 'propostas', loadComponent: () =>
      import('./tela-cliente/propostas.component').then(m => m.PropostasComponent)
  },

  { 
    path: 'contato', loadComponent: () =>
      import('./cliente-motorista/contato.component').then(m => m.ContatoComponent)
  },
  
  { 
    path: 'inicial-motorista', loadComponent: () =>
      import('./motorista/inicial-motorista.component').then(m => m.InicialMotoristaComponent)
  },

  {
    path: 'visualizar', loadComponent: () =>
      import('./motorista/visualizar.component').then(m => m.VisualizarComponent)
  },

  {
    path: 'historico', loadComponent: () =>
      import('./motorista/historico.component').then(m => m.HistoricoComponent)
  }
];