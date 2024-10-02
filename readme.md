# Funcionalidades do Sistema

## Funcionalidades Exigidas

- [ ] **Controle de Estoque**
  - [X] Cadastro de produtos no sistema.
  - [X] Atualização e controle das quantidades de produtos no estoque.
  - [X] Entrada (INPUT) e saída (OUTPUT) de produtos no estoque.
  - [ ] Notificação automática quando a quantidade de um produto no estoque atinge zero ou está indisponível.
  - [X] Histórico de movimentações de estoque, com registro de qual usuário realizou cada operação.

- [ ] **Cadastro de Usuários**
  - [X] Cadastro de novos usuários com CPF, nome, e-mail, data de nascimento e senha.
  - [X] Diferentes perfis de usuários com permissões diferenciadas (administrador e funcionário).
  - [X] Login no sistema com autenticação e controle de permissões.

- [ ] **Cadastro de Fornecedores**
  - [X] Cadastro de fornecedores no sistema, incluindo informações relevantes para o fornecimento de produtos.

- [ ] **Auditoria de Atividades**
  - [ ] Registro de logs de ações realizadas pelos usuários no sistema.
  - [ ] Visualização e auditoria das ações feitas pelos usuários.

- [ ] **Notificações de Estoque**
  - [ ] Geração automática de notificações quando um produto está fora de estoque ou abaixo de um limite pré-definido.

- [ ] **Relatório de Inventário**
  - [ ] Geração de um relatório simplificado de inventário contendo uma tabela com todos os produtos cadastrados.

- [ ] **Histórico de Movimentações**
  - [ ] Histórico de movimentações de estoque com data, quantidade e o usuário responsável.

---

## Tabelas do Banco de Dados

- [ ] **Tabela de Produtos (`product`)**
  - [X] `id`: Identificador único (UUID).
  - [X] `name`: Nome do produto.
  - [X] `price`: Preço do produto.
  - [X] `description`: Preço do produto.
  - [X] `quantity`: Quantidade disponível no estoque.
  - [X] `createdAt`: Data de criação do produto.
  - [X] `updatedAt`: Data de atualização do produto.

- [ ] **Tabela de Fornecedores (`supplier`)**
  - [X] `id`: Identificador único (UUID).
  - [X] `name`: Nome do fornecedor.
  - [X] `contactInfo`: Informações de contato do fornecedor.
  - [X] `createdAt`: Data de criação do fornecedor.
  - [X] `updatedAt`: Data de atualização do fornecedor.

- [ ] **Tabela de Usuários (`user`)**
  - [X] `id`: Identificador único (UUID).
  - [X] `cpf`: CPF do usuário.
  - [X] `name`: Nome do usuário.
  - [X] `email`: E-mail do usuário.
  - [X] `birthdate`: Data de nascimento.
  - [X] `password`: Senha do usuário (criptografada).
  - [X] `role`: Função do usuário (administrador ou funcionário).
  - [X] `createdAt`: Data de criação do usuário.
  - [X] `updatedAt`: Data de atualização do usuário.

- [ ] **Tabela de Estoque (`stock`)**
  - [X] `id`: Identificador único (UUID).
  - [X] `productId`: Referência ao produto (relacionamento com a tabela `product`).
  - [X] `quantity`: Quantidade movimentada (positiva para entradas, negativa para saídas).
  - [X] `origin`: Tipo de operação (INPUT ou OUTPUT).
  - [X] `userId`: Referência ao usuário que realizou a movimentação (relacionamento com a tabela `user`).
  - [X] `createdAt`: Data da movimentação.

- [ ] **Tabela de Auditoria (`audit`)**
  - [X] `id`: Identificador único (UUID).
  - [X] `userId`: Referência ao usuário que realizou a ação (relacionamento com a tabela `user`).
  - [X] `action`: Descrição da ação realizada.
  - [X] `createdAt`: Data da ação.

- [ ] **Tabela de Notificações (`notification`)**
  - [X] `id`: Identificador único (UUID).
  - [X] `message`: Mensagem da notificação (por exemplo, "Produto X fora de estoque").
  - [X] `read`: Mensagem da notificação (por exemplo, "Produto X fora de estoque").
  - [X] `productId`: Referência ao produto (relacionamento com a tabela `product`).
  - [X] `createdAt`: Data de criação da notificação.
