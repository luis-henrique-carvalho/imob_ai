## Why

Corretores precisam visualizar os detalhes completos de um lead e seu histórico de mensagens diretamente na tela do Kanban (Opportunities). Isso permite entender o contexto da negociação antes de tomar uma ação, sem precisar trocar de tela.

## What Changes

- Adição de um painel lateral (Sheet) que se abre ao clicar em um card de oportunidade no Kanban.
- Exibição de informações detalhadas do lead vinculado à oportunidade (nome, telefone, valor, etc.).
- Exibição do histórico de mensagens trocadas com o lead, buscando os dados da tabela `message` no banco de dados.
- Criação de uma Server Action para buscar o histórico de mensagens de uma oportunidade/lead específico de forma isolada (filtrando por `userId`).

## Capabilities

### New Capabilities
- `lead-details-view`: Visualização dos detalhes do lead e integração do painel lateral (Sheet) interativo no Kanban de oportunidades.
- `lead-message-history`: Busca e exibição em formato de chat do histórico de mensagens (tabela `message`) para o lead selecionado.

### Modified Capabilities


## Impact

- Modificação no componente cliente `OpportunitiesKanban` (`src/app/(private)/opportunities/components/opportunities-kanban.tsx`) para adicionar os eventos de clique.
- Criação de novos componentes de UI (`LeadDetailsSheet`, `MessageHistory`) dentro do módulo de opportunities.
- Adição de novas Server Actions para buscar os dados de mensagens de forma segura com base no `leadId` e no `userId` logado.
