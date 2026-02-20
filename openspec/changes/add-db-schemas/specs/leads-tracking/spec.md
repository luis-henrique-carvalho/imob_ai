## ADDED Requirements

### Requirement: Tabela de lead (contatos do WhatsApp)
O sistema SHALL ter uma tabela `lead` que representa pessoas físicas que entraram em contato via WhatsApp. Campos: `name` (text, nullable — preenchido pela IA ou pelo corretor), `phone` (text, obrigatório — número do WhatsApp no formato internacional).

#### Scenario: Lead entra em contato pela primeira vez
- **WHEN** uma mensagem de um número desconhecido chega via webhook do WhatsApp
- **THEN** o sistema cria um registro em `lead` com `phone`, `userId` do corretor dono do webhook, e `name` como `null`

#### Scenario: Lead já existe para aquele corretor
- **WHEN** uma mensagem chega de um número que já existe na tabela `lead` para aquele `userId`
- **THEN** o sistema reutiliza o lead existente (não cria duplicado)

### Requirement: Unicidade de telefone por corretor
O sistema MUST ter uma unique constraint composta em `(phone, userId)`. O mesmo número de telefone pode existir como lead de corretores diferentes, mas não pode duplicar dentro do mesmo corretor.

#### Scenario: Mesmo telefone, corretores diferentes
- **WHEN** o telefone +5511999999999 é lead do Corretor A e o Corretor B também recebe contato do mesmo número
- **THEN** ambos os registros existem no banco, cada um com seu respectivo `userId`

#### Scenario: Tentativa de duplicar lead no mesmo corretor
- **WHEN** uma inserção tenta criar um lead com `phone` e `userId` que já existem
- **THEN** o banco rejeita com violação de unique constraint

### Requirement: Isolamento de lead por corretor
Queries na tabela `lead` MUST sempre filtrar por `userId`.

#### Scenario: Consultar lead
- **WHEN** o sistema busca lead para exibir na UI ou para lookup no webhook
- **THEN** a query MUST incluir `WHERE userId = :currentUserId`
