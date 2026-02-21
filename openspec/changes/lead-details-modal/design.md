## Context

Atualmente, os corretores gerenciam suas oportunidades no Kanban, mas não têm um meio rápido e integrado de visualizar os detalhes completos do lead e o histórico da conversa (mensagens trocadas com o bot/IA). A necessidade atual exige uma visualização rápida contextual (sem trocar de página) para que o corretor possa analisar a negociação antes de interagir ou mudar a oportunidade de fase.

## Goals / Non-Goals

**Goals:**
- Fornecer uma visão unificada e em painel lateral (Sheet) dos detalhes do lead ao clicar no card no Kanban.
- Exibir o histórico cronológico de mensagens do lead de forma clara (formato chat).
- Garantir que as consultas de mensagens sejam seguras e isoladas por usuário (tenant).

**Non-Goals:**
- Permitir a edição dos dados do lead através desse painel (apenas leitura/visualização da oportunidade neste momento).
- Permitir o envio de mensagens ativas por parte do corretor neste painel (o foco nesta feature é visualização; chat ativo pode ser um módulo separado ou no Handover).

## Decisions

1. **Uso do Componente Sheet (shadcn/ui)**:
   A escolha do `Sheet` (Right Sidebar) sobre um simples `Dialog` (Modal central) ocorre pois o painel lateral acomoda perfeitamente históricos de chat longos (verticalidade) sem obstruir totalmente a visão das métricas no Kanban.

2. **Server Actions vs. Route Handlers para Data Fetching**:
   Usaremos Server Actions (ex: `getLeadMessagesAction`) em vez de Route Handlers para buscar o histórico de mensagens. É mais tipado, não exige configuração de endpoint HTTP separado e integra naturalmente com Server/Client Components no Next.js App Router, respeitando as conventions atuais do projeto.

3. **Gerenciamento de Estado Cliente**:
   O estado de visibilidade do Sheet (`isOpen`) e o item selecionado (`selectedOpportunityId` ou `selectedLead`) serão armazenados no componente Root Client do Kanban (`OpportunitiesKanban`). Isso permite injetar os dados selecionados no componente do painel lateral.

## Risks / Trade-offs

- [Risk] **Performance em Históricos Longos**: Carregar imediatamente todas as mensagens no momento em que abre o modal pode ser lento se o histórico for gigante.
  → **Mitigation**: Trazer apenas as últimas N mensagens, ou apenas buscar os dados do banco após o modal iniciar sua abertura real para não pesar o Client State. Como as conversas de IA de qualificação tendem a ser curtas a médias, o impacto inicial é baixo.
- [Risk] **Inchaço do Componente Kanban**: Colocar a marcação do Sheet no `OpportunitiesKanban` pode deixar o arquivo muito grande.
  → **Mitigation**: Criar o componente `LeadDetailsSheet` para encapsular toda essa complexidade e a chamada da Server Action, passsando apenas propriedades como `opportunityId` ou `leadId` vinda do Kanban pai.
