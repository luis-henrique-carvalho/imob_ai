## Context

Atualmente, o Kanban de Oportunidades exibe apenas dados estáticos (mocks). Precisamos conectar este componente vital ao banco de dados (`opportunity` e `lead` tables) para refletir o estado real do pipeline de vendas do corretor. Além da visualização, o usuário precisa interagir com esses cartões (atualizando o status por meio de drag-and-drop e controlando a interação automatizada da IA através de um switch). Este Kanban é parte central do CRM, onde os dados devem ser filtrados e geridos com o escopo no escopo do usuário autenticado (userId).

## Goals / Non-Goals

**Goals:**
- Conectar a interface do Kanban aos dados reais do BD via Server Actions.
- Implementar drag-and-drop utilizando atualizações otimistas (optimistic updates) no front-end para garantir uma experiência visual fluida.
- Assegurar regras rígidas de acesso aos dados isolando consultas ou edições por `userId`.
- Apresentar as colunas estáticas mapeadas com os status: NEW, QUALIFIED, IN_PROGRESS, WON e LOST.
- Embutir informações contextuais (Orçamento e Urgência) geradas pela IA e status da IA no card.

**Non-Goals:**
- Configuração ou alteração na engine da IA que processa leads (o Kanban apenas consome os badges e interage com a flag de controle).
- Criação de novas tabelas de banco (os esquemas `opportunity` e `lead` já devem existir/estão mapeados noutra demanda).
- Implementação de um sistema dinâmico de colunas criadas pelo usuário (as colunas do MVP são baseadas num enum fixo).

## Decisions

- **Join vs Relacionamento Duplo**: Foi decidido utilizar uma Query JOIN padrão via Drizzle ORM (`db.select().from(opportunity).innerJoin(...)`) no Server Action `get-opportunities.ts` no invés de 2 request distintos, devolvendo o tipo customizado `OpportunityWithLead` de uma só vez, visando eficiência.
- **Optimistic Updates para Drag-and-Drop**: O React vai utilizar features como o Hook `useOptimistic` e server actions para que quando o corretor mova um Lead (Card) de uma coluna à outra, a interface se atualize imediatamente sem aguardar a volta completa do DB. Se a Action `update-opportunity-status.ts` falhar, a UI reverte. Isto permite melhor UX que é crucial num Kanban vivo.
- **Tipagem Integrada Centralizada**: Adicionar um `types/index.ts` único no módulo client-side onde criaremos a type `OpportunityWithLead`, ajudando a partilha entre os Server Components que leem do banco e os Client Components do Kanban.
- **Controle de IA (`toggle_ai_pause`)**: O botão "Pausa IA" aciona uma action `toggle-ai-pause.ts` que manipula o campo booleano `is_ai_paused`. Optou-se por ter Server Actions granulares (`toggle-ai` e `update-status`) em vez de um único "update-op" genérico, para manter a clareza e auditoria nas alterações ativadas pelo cliente.

## Risks / Trade-offs

- **[Risco] Otimismo Fallback (Reversão de Estado)**: Problemas com optimistic updates se a server action devolver erro. -> *Mitigação*: Lidar com `catch` na função de transição React, refetchando automaticamente a base em caso de falha de conexão do server que gere desincronização.
- **[Risco] Segurança do userId em Updates**: Manipulação no client do event drag passando um ID arbitrários, movendo as vendas de outro corretor. -> *Mitigação*: Nenhuma action irá apenas confiar no Opportunity ID. As clauses WHERE exigirão sempre `and(eq(opportunity.id, ID), eq(opportunity.userId, SessionUserID))`.
