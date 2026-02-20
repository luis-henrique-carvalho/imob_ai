## ADDED Requirements

### Requirement: Tabela de imóvel do corretor
O sistema SHALL ter uma tabela `property` que armazena os imóveis cadastrados pelo corretor. Cada imóvel MUST pertencer a exatamente um `userId`. Os campos obrigatórios são: `title` (text), `description` (text) e `price` (integer). O campo `isActive` (boolean, default true) indica se o imóvel está disponível.

#### Scenario: Criar imóvel
- **WHEN** um registro é inserido na tabela `property` com `userId`, `title`, `description` e `price`
- **THEN** o registro é criado com `id` UUID gerado, `isActive` default `true`, e timestamps `createdAt`/`updatedAt` preenchidos automaticamente

#### Scenario: Desativar imóvel vendido/alugado
- **WHEN** o campo `isActive` de uma property é atualizado para `false`
- **THEN** a property continua existindo no banco mas não entra no contexto da IA para novas conversas

#### Scenario: Deletar corretor com imóveis
- **WHEN** um `user` que possui property é deletado
- **THEN** todas as suas property são deletadas em cascade

### Requirement: Isolamento de imóvel por corretor
Queries na tabela `property` MUST sempre filtrar por `userId` para garantir que um corretor nunca veja imóveis de outro.

#### Scenario: Consultar imóveis
- **WHEN** o sistema busca property para exibir na UI ou injetar no prompt da IA
- **THEN** a query MUST incluir `WHERE userId = :currentUserId`
