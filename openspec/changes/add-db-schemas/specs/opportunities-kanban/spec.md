## ADDED Requirements

### Requirement: Tabela de oportunidade (cards do Kanban)
O sistema SHALL ter uma tabela `opportunity` que representa um ticket de negociação. Cada opportunity MUST pertencer a um `userId` e a um `leadId`. O campo `propertyId` é nullable (FK opcional para `property`) — preenchido quando o lead chegou por anúncio específico, null quando chegou "frio".

#### Scenario: Criar opportunity de anúncio específico
- **WHEN** um lead entra em contato por um anúncio de um imóvel com ID 123
- **THEN** a opportunity é criada com `propertyId = 123`, `status = NEW`, `isAiPaused = false`

#### Scenario: Criar opportunity de lead frio
- **WHEN** um lead entra em contato sem referência a imóvel específico
- **THEN** a opportunity é criada com `propertyId = NULL`, `status = NEW`, `isAiPaused = false`

#### Scenario: Mesmo lead, nova oportunidade
- **WHEN** um lead já existente (status LOST na oportunidade antiga) entra em contato novamente
- **THEN** uma nova opportunity é criada vinculada ao mesmo `leadId`, sem afetar a oportunidade anterior

### Requirement: Status do Kanban via pgEnum
O sistema SHALL usar um `pgEnum('opportunity_status')` com os valores: `NEW`, `QUALIFIED`, `IN_PROGRESS`, `WON`, `LOST`. Esses valores correspondem às colunas do Kanban Board.

#### Scenario: Mover card no Kanban
- **WHEN** o corretor arrasta um card de uma coluna para outra
- **THEN** o campo `status` da opportunity é atualizado para o enum correspondente

### Requirement: Ordenação via LexoRank
O sistema SHALL usar um campo `position` (text) para ordenar os cards dentro de cada coluna do Kanban. A ordenação usa strings alfanuméricas comparáveis (padrão LexoRank).

#### Scenario: Inserir card no topo de uma coluna
- **WHEN** um novo card é criado na coluna NEW
- **THEN** o campo `position` recebe um valor que ordena antes de todos os cards existentes naquela coluna

#### Scenario: Mover card entre dois outros
- **WHEN** o corretor arrasta um card para entre os cards com posição "b" e "d"
- **THEN** o campo `position` do card movido recebe "c" (valor intermediário calculado)

### Requirement: Dados de qualificação extraídos pela IA
O sistema SHALL armazenar os dados de qualificação extraídos pelo motor de IA: `extractedBudget` (text, nullable), `extractedUrgency` (text, nullable), `extractedPropertyType` (text, nullable). Todos começam null e são preenchidos quando a IA finaliza a qualificação.

#### Scenario: IA completa qualificação
- **WHEN** a IA extrai budget, urgency e propertyType de uma conversa
- **THEN** os campos `extracted*` são atualizados na opportunity correspondente e o `status` muda para `QUALIFIED`

### Requirement: Handover (Pausar IA)
O sistema SHALL ter um campo `isAiPaused` (boolean, default false). Quando `true`, o motor de IA não processa novas mensagens daquela oportunidade.

#### Scenario: Corretor assume conversa
- **WHEN** o corretor clica em "Pausar Bot" no card da opportunity
- **THEN** `isAiPaused` é atualizado para `true` e o webhook do WhatsApp para aquele lead ignora o processamento de IA

#### Scenario: Corretor reativa IA
- **WHEN** o corretor clica em "Ativar Bot" no card da opportunity
- **THEN** `isAiPaused` é atualizado para `false` e o motor de IA volta a processar mensagens

### Requirement: Cascade deletes
Deletar um `user` MUST deletar todas as suas opportunity. Deletar um `lead` MUST deletar todas as opportunity vinculadas a ele.

#### Scenario: Deletar lead com opportunity
- **WHEN** um lead é deletado
- **THEN** todas as opportunity vinculadas àquele lead são deletadas em cascade, incluindo suas message
