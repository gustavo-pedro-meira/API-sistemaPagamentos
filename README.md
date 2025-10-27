<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# API - Sistema de Pagamentos

Uma API RESTful construída com [NestJS](https://github.com/nestjs/nest) para gerenciar clientes e cobranças em um sistema de pagamentos. Utiliza Prisma como ORM para interagir com um banco de dados PostgreSQL e Docker para facilitar a configuração do ambiente de desenvolvimento.

## Funcionalidades

* **Gerenciamento de Clientes:**
    * Criar novos clientes (com validação de e-mail e CPF únicos e hash de senha)
    * Listar todos os clientes
    * Buscar um cliente específico por ID
    * Excluir um cliente por ID
* **Gerenciamento de Cobranças:**
    * Criar novas cobranças associadas a um cliente
    * Listar todas as cobranças
    * Buscar uma cobrança específica por ID
    * Atualizar informações de uma cobrança por ID
    * Excluir uma cobrança por ID
* **Validação de Dados:** Utiliza Zod para validação robusta dos dados de entrada nas requisições.
* **Banco de Dados:** Integração com PostgreSQL através do Prisma ORM.
* **Dockerização:** Configuração com Docker e Docker Compose para fácil execução do ambiente (API + Banco de Dados).

## Tecnologias Utilizadas

* **Framework:** NestJS
* **Linguagem:** TypeScript
* **Banco de Dados:** PostgreSQL
* **ORM:** Prisma
* **Validação:** Zod
* **Containerização:** Docker, Docker Compose
* **Hashing de Senha:** Bcrypt

## Configuração do Projeto

### Pré-requisitos

* Node.js (versão 20 ou superior recomendada)
* npm (ou yarn/pnpm)
* Docker e Docker Compose

### Instalação das Dependências

Clone o repositório e instale as dependências do projeto:

```bash
git clone <url-do-seu-repositorio>
cd API-sistemaPagamentos-master
npm install