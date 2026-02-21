## Why

O objetivo desta change é apresentar a interface principal de gestão de oportunidades (Kanban) para os corretores, integrando dados reais do banco de dados (oportunidades e leads). Isso resolve a necessidade do corretor de visualizar, de forma organizada e eficiente, o status de cada lead no pipeline de vendas, além de permitir interações essenciais como atualizar o status de uma oportunidade via drag-and-drop e controlar a atuação da IA de forma direta.

## What Changes

- **Integração de Dados:** Substituição de dados estáticos (mocks) no Kanban por dados reais do banco de dados, utilizando JOIN entre as tabelas `opportunity` e `lead`.
- **Novas Server Actions:** Implementação de actions específicas para: buscar oportunidades do usuário logado (`get-opportunities.ts`), atualizar status após movimentação (`update-opportunity-status.ts`) e alternar o estado da IA (`toggle-ai-pause.ts`).
- **UI do Kanban:** Atualização das colunas do Kanban para refletirem exatamente os status mapeados no banco (`NEW` -> Novos, `QUALIFIED` -> Qualificados, `IN_PROGRESS` -> Em Atendimento, `WON` -> Ganhos, `LOST` -> Perdidos).
- **Opportunity Card Customizado:** Enriquecimento do card para exibir Nome, WhatsApp, badges de qualificação (Orçamento e Urgência) fornecidos pela IA, e inclusão de um switch/botão para "Pausar IA".
- **Melhorias de UX:** Integração da funcionalidade de drag and drop com a server action de atualização e implementação de "optimistic updates" para resposta visual imediata.
- **Tipos de Dados:** Criação de uma tipagem TypeScript `OpportunityWithLead` na pasta de `types` do módulo para ser consumida no Client Side e Server Side.

## Capabilities

### New Capabilities
- `opportunities-kanban`: Apresentação visual das oportunidades em colunas de pipeline interativas, permitindo transições de status através de drag-and-drop com atualizações instantâneas.
- `ai-interaction-control`: Capacidade fornecida ao usuário final (corretor) de pausar e retomar a intervenção automática da IA sobre um lead diretamente através da interface (card).

### Modified Capabilities


## Impact

- **UI/Components:** Refatoração significativa no arquivo `OpportunitiesKanban.tsx` e `OpportunityCard` na rota `/app/(private)/opportunities`.
- **Server Side:** Adição de novo diretório de `actions` no escopo de oportunidades.
- **Dados:** Operações sensíveis ao escopo do `userId` em todas as queries. Otimizado para alta interatividade (optimistic updates).
