# FreteAgil 🚚

##Equipe:
Lara Thaylanne
Carlos Henrique
Allana Gadelha



# 🚚 FreteÁgil — Aplicativo de Gestão de Fretes e Solicitações

### Tecnologias utilizadas: Java 17 com Spring Boot (backEnd) e Angular para FrontEnd

## 🎯 Objetivo
Sua aplicação é uma plataforma web voltada para conectar clientes que precisam de transporte (mudança ou entrega) com motoristas disponíveis para realizar os serviços. Ela permite o cadastro de veículos, visualização de solicitações, histórico de serviços e gerenciamento de propostas.

## 👥 Perfis de Usuário
Cliente: pode solicitar fretes, visualizar propostas, acompanhar o resumo da solicitação e entrar em contato.
Motorista: cadastra veículo, visualiza solicitações disponíveis, acessa histórico de serviços realizados.

## 🧩 Principais Funcionalidades
### 🔐 Login
Tela inicial com login para acesso ao sistema.
### 🚗 Cadastro de Veículo
Motorista informa placa, modelo e capacidade.
Após cadastro, é redirecionado para a tela inicial do motorista.
### 📋 Tela Inicial do Motorista
Saudação personalizada ("Bem vinda, Maria").
Dois botões:
Visualizar solicitações → leva à tela com lista de fretes disponíveis.
Histórico de solicitações → mostra os fretes já realizados.
### 📦 Visualizar Solicitações
Lista de fretes com origem, destino e tipo (mudança ou entrega).
Cada item tem link para visualizar detalhes.
### 🕓 Histórico de Solicitações
Lista semelhante à de solicitações, mas com serviços já concluídos.
### 📍 Cliente
Acesso à tela de frete, propostas, resumo e contato.

## 🛠️ Tecnologias Usadas
Angular com componentes standalone (loadComponent)
Router para navegação entre páginas
StackBlitz como ambiente inicial de desenvolvimento
GitHub para versionamento e hospedagem do código

## 📁 Estrutura de Componentes Criados
login.component.ts
motorista.component.ts
cadastro-veiculo.component.ts
inicial-motorista.component.ts
visualizar.component.ts
historico.component.ts
cliente.component.ts
frete.component.ts
resumo.component.ts
propostas.component.ts
contato.component.ts

## 🔄 Fluxo de Navegação (Motorista)
Login
Cadastro de veículo
Redirecionamento para tela inicial
Escolha entre visualizar solicitações ou histórico

# Documentação do Back-End - FreteÁgil

## Visão Geral

Sistema de gerenciamento de fretes desenvolvido com Spring Boot, utilizando arquitetura em camadas (Controller, Service, Repository) e autenticação JWT.


## Arquitetura

Camadas da Aplicação
Controller → Service → Repository → Database
     ↓
   JWT Filter (Segurança)



Estrutura de Pacotes

## 📁 config/

Configurações gerais da aplicação.

SecurityConfig.java

Configura autenticação e autorização

Define endpoints públicos: /auth/**, /usuarios/**, /motoristas/**
Endpoints protegidos: /fretes/**
Adiciona JwtFilter na cadeia de filtros

Desabilita CSRF (adequado para APIs REST)

CorsConfig.java

Permite requisições de diferentes origens (Cross-Origin)
Configurado para aceitar requisições do frontend


## 📁 model/

Entidades JPA que representam as tabelas do banco de dados.

### Usuario.java

- id (Long, PK, auto-increment)
- nome (String)
- email (String, único, obrigatório)
- senha (String, criptografada)
- telefone (String)

### Motorista.java

- id (Long, PK, auto-increment)
- nome (String)
- email (String, único, obrigatório)
- senha (String, criptografada)
- telefone (String)
- placaVeiculo (String)
- modeloVeiculo (String)
- tipoCaminhao (String) - ex: bau, aberto, carreta

### Frete.java

- id 
- origem (String)
- destino (String)
- descricao (String)
- preco (Double)
- status (String) - PENDENTE, ACEITO, CONCLUIDO
- usuarioId (Long, FK)
- motoristaId (Long, FK, opcional)
- dataCriacao (LocalDateTime)
- dataAceite (LocalDateTime, opcional)

Anotações Lombok: @Data, @Builder, @NoArgsConstructor, @AllArgsConstructor - geram getters, setters, construtores automaticamente.


## 📁 repository/

Interfaces que estendem JpaRepository para acesso ao banco de dados.

UsuarioRepository.java

findByEmail(String email) - busca usuário por email
Herda métodos: save(), findById(), findAll(), delete(), etc.

MotoristaRepository.java

findByEmail(String email) - busca motorista por email
Métodos CRUD herdados

FreteRepository.java

findByUsuarioId(Long usuarioId) - lista fretes de um usuário

findByMotoristaId(Long motoristaId) - lista fretes de um motorista

findByStatus(String status) - busca fretes por status
Métodos CRUD herdados


## 📁 service/

Lógica de negócio da aplicação.

UsuarioService.java

cadastrar(Usuario): registra novo usuário, criptografa senha com BCrypt
login(email, senha): valida credenciais e gera token JWT
listarTodos(): retorna todos os usuários
buscarPorId(id): busca usuário específico

MotoristaService.java

cadastrar(Motorista): registra novo motorista, criptografa senha
login(email, senha): valida credenciais e gera token JWT
listarTodos(): retorna todos os motoristas
buscarPorId(id): busca motorista específico

FreteService.java

solicitarFrete(Frete): cria nova solicitação de frete (status: PENDENTE)
listarTodos(): lista todos os fretes
listarPorUsuario(usuarioId): fretes de um usuário específico
listarPorMotorista(motoristaId): fretes de um motorista específico
aceitarFrete(freteId, motoristaId): motorista aceita frete (status: ACEITO)
concluirFrete(freteId): marca frete como concluído
listarDisponiveis(): fretes com status PENDENTE


## 📁 controller/

Endpoints da API REST.

AuthController.java

Base: /auth
POST /login - Login geral (verifica usuário e motorista)
Retorna token JWT em caso de sucesso

UsuarioController.java

Base: /usuarios
POST / - Cadastrar novo usuário
GET / - Listar todos os usuários
GET /{id} - Buscar usuário por ID
POST /login - Login de usuário

MotoristaController.java

Base: /motoristas
POST / - Cadastrar novo motorista
GET / - Listar todos os motoristas
GET /{id} - Buscar motorista por ID
POST /login - Login de motorista

FreteController.java

Base: /fretes (requer autenticação)
POST / - Solicitar novo frete
GET / - Listar todos os fretes
GET /usuario/{id} - Fretes de um usuário
GET /motorista/{id} - Fretes de um motorista
PUT /{id}/aceitar - Aceitar frete (body: {"motoristaId": 1})
PUT /{id}/concluir - Concluir frete
GET /disponiveis - Listar fretes disponíveis (PENDENTE)



## 📁 security/

Autenticação e autorização.

JwtUtil.java
generateToken(email): gera token JWT válido por 5 horas
extractEmail(token): extrai email do token
isTokenValid(token, email): valida token
Usa chave secreta: freteagil_super_seguro_123456789_mais_segura

JwtFilter.java

Intercepta requisições HTTP
Extrai token do header Authorization: Bearer <token>
Valida token e autentica usuário no Spring Security
Libera requisições para endpoints públicos


## 📁 dto/

Objetos de transferência de dados.
LoginRequest.java
{
  "email": "string",
  "senha": "string"
}


Fluxo de Autenticação

Cadastro: Usuario/Motorista → senha criptografada com BCrypt
Login: Validação de credenciais → geração de token JWT
Requisições protegidas: Frontend envia token no header
JwtFilter: Valida token e autentica usuário
Acesso liberado: Controller processa a requisição


Banco de Dados

foi utilizado o banco h2, um banco de dados em memória.


Tipo: Banco em memória (mem:)
Nome do banco: freteagil
Usuário: sa (padrão)
Senha: (vazia)
Dialeto: H2Dialect
DDL: update - cria/atualiza tabelas automaticamente

Após iniciar a aplicação, acesse o console para visualizar e manipular dados:

URL: http://localhost:8080/h2-console

Credenciais de acesso:

JDBC URL: jdbc:h2:mem:freteagil

User Name: sa
Password: (deixe em branco)
Tabelas Criadas Automaticamente

O Hibernate cria as seguintes tabelas baseado nas entidades JPA:

usuario - dados dos usuários
motorista - dados dos motoristas
frete - solicitações de frete


## Segurança

Senhas: Criptografadas com BCrypt
Tokens: JWT com validade de 5 horas
CORS: Habilitado para comunicação com frontend
Endpoints públicos: Cadastro e login
Endpoints protegidos: Gerenciamento de fretes
<hr></hr>

Status de Frete

PENDENTE: Aguardando motorista
ACEITO: Motorista aceitou
CONCLUIDO: Entrega finalizada
<hr></hr>

Dependências Principais

Spring Boot Web
Spring Security
Spring Data JPA
JWT (io.jsonwebtoken)
Lombok
MySQL Driver/H2
<hr></hr>

Compilação e Execução

./mvnw clean install
./mvnw spring-boot:run

Porta padrão: 8080
