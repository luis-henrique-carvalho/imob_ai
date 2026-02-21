## 1. Server Actions

- [x] 1.1 Criar a action `get-lead-messages.ts` em `src/app/(private)/opportunities/actions/` para buscar mensagens da tabela `message` filtrando por `leadId` e `userId`.

## 2. Componentes de UI (Painel Lateral)

- [x] 2.1 Criar o componente `LeadDetailsSheet` em `src/app/(private)/opportunities/components/` responsável pela estrutura do Sheet (shadcn/ui).
- [x] 2.2 Criar o componente `MessageHistory` em `src/app/(private)/opportunities/components/` para exibir as mensagens formatadas como chat.
- [x] 2.3 Integrar o `MessageHistory` dentro do `LeadDetailsSheet`, buscando as mensagens através da action `get-lead-messages.ts` quando o Sheet for aberto.

## 3. Integração com o Kanban

- [x] 3.1 Atualizar `src/app/(private)/opportunities/components/opportunities-kanban.tsx` para gerenciar o estado do painel lateral (`isSheetOpen`, `selectedOpportunity`/`selectedLead`).
- [x] 3.2 Adicionar evento de `onClick` nos cards do Kanban (no componente `KanbanCard` se for separado, ou diretamente na renderização do card no `opportunities-kanban.tsx`) para abrir o `LeadDetailsSheet` com os dados do lead da oportunidade clicada.
- [x] 3.3 Inserir o componente `LeadDetailsSheet` na renderização do `OpportunitiesKanban`.
