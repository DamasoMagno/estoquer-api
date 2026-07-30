# Estoquer API

API REST para controle de estoque com autenticação, perfis de acesso, movimentação de produtos, auditoria e notificações.

## Tecnologias

- Node.js + TypeScript
- Express
- Prisma ORM
- PostgreSQL
- Zod
- JWT (`jsonwebtoken`)
- Bcrypt (`bcryptjs`)

## Funcionalidades

- Cadastro e autenticação de usuários
- Perfis de acesso (`ADMINISTRATOR` e `EMPLOYEE`)
- CRUD de produtos
- CRUD de fornecedores
- Entrada e saída de estoque
- Histórico de movimentações
- Geração de notificações de indisponibilidade
- Registro de auditoria das ações

## Pré-requisitos

- Node.js 18+
- PostgreSQL
- npm

## Configuração do ambiente

1. Instale as dependências:

```bash
npm install
```

2. Crie um arquivo `.env` na raiz com a conexão do banco:

```env
DATABASE_URL="******HOST:5432/DB_NAME?schema=public"
```

3. Rode as migrations:

```bash
npx prisma migrate dev
```

> A chave JWT está fixa no código como `estoquer`.

## Executando o projeto

```bash
npm run dev
```

A API sobe em `http://localhost:3333`.

## Autenticação

Após login em `POST /user/auth`, envie o token no header:

```http
Authorization: ******
```

## Rotas principais

### Usuários

- `POST /user` — cria usuário
- `POST /user/auth` — autentica usuário
- `GET /user/users` — lista usuários (apenas administrador)

### Produtos

- `GET /product`
- `POST /product`
- `PATCH /product/:productId`
- `DELETE /product/:productId`

### Fornecedores

- `GET /supplier`
- `POST /supplier`
- `PATCH /supplier/:supplierId`
- `DELETE /supplier/:supplierId`

### Estoque

- `GET /stock` — histórico de movimentações
- `POST /stock` — movimentação de entrada/saída

### Auditoria

- `GET /audit` — lista registros de auditoria (apenas administrador)

### Notificações

- `GET /notification`
- `POST /notification/read`

## Estrutura de dados (Prisma)

Tabelas principais:

- `user`
- `product`
- `supplier`
- `stock`
- `audit`
- `notification`
