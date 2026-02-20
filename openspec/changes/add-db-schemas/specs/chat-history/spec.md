## ADDED Requirements

### Requirement: Tabela de mensagem por oportunidade
O sistema SHALL ter uma tabela `message` que armazena o histórico completo de mensagens trocadas em cada oportunidade. Campos: `opportunityId` (FK obrigatória), `role` (pgEnum: user/assistant/system), `content` (text), `createdAt` (timestamp).

#### Scenario: Mensagem do lead chega via WhatsApp
- **WHEN** o webhook recebe uma mensagem de um lead vinculada a uma opportunity
- **THEN** um registro é inserido com `role = user` e `content` = texto da mensagem

#### Scenario: IA responde ao lead
- **WHEN** o motor de IA gera uma resposta para enviar via WhatsApp
- **THEN** um registro é inserido com `role = assistant` e `content` = texto gerado pela IA

#### Scenario: System prompt registrado
- **WHEN** o motor de IA inicia uma conversa de qualificação
- **THEN** um registro com `role = system` pode ser inserido para registrar o contexto enviado

### Requirement: Mensagem serve como contexto da IA
O sistema SHALL consultar as mensagens de uma opportunity ordenadas por `createdAt ASC` para compor o array de mensagens enviado à API da OpenAI.

#### Scenario: Continuar conversa existente
- **WHEN** o lead envia uma nova mensagem em uma conversa com 5 mensagens anteriores
- **THEN** o sistema busca todas as message da opportunity, monta o array de contexto e envia à OpenAI junto com a nova mensagem

### Requirement: Cascade delete com opportunity
Deletar uma `opportunity` MUST deletar todas as suas `message` em cascade.

#### Scenario: Opportunity é deletada
- **WHEN** uma opportunity é removida do sistema
- **THEN** todas as message vinculadas são deletadas automaticamente

### Requirement: Índice para performance
O sistema SHALL ter índice composto em `(opportunityId, createdAt)` na tabela `message` para otimizar queries de contexto da IA.

#### Scenario: Query de contexto performática
- **WHEN** o sistema busca `SELECT * FROM message WHERE opportunityId = :id ORDER BY createdAt ASC`
- **THEN** a query utiliza o índice composto e retorna em tempo constante independente do volume total de mensagens no banco
