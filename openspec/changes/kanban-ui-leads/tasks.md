## 1. Tipagem (Data Layer)

- [x] 1.1 Criar o arquivo `src/app/(private)/opportunities/types/index.ts`
- [x] 1.2 Definir e exportar o tipo `OpportunityWithLead` mesclando dados da tabela de oportunidade e lead, de forma suportar atributos extraídos via Drizzle ORM.

## 2. Server Actions de Oportunidades

- [x] 2.1 Criar a Action `src/app/(private)/opportunities/actions/get-opportunities.ts` efetuando o JOIN real entre `opportunity` e `lead`. E incluir filtro obrigatório pelo `userId` de sessão.
- [x] 2.2 Criar a Action `src/app/(private)/opportunities/actions/update-opportunity-status.ts` com proteção do `userId`, e input validation via `zod` para processar transições via drag-and-drop.
- [x] 2.3 Criar a Action `src/app/(private)/opportunities/actions/toggle-ai-pause.ts` para inverter a atual flag bool e retornar a mudança se sucesso.

## 3. UI: Kanban Component

- [x] 3.1 Atualizar `src/app/(private)/opportunities/components/OpportunitiesKanban.tsx` para não usar mocks e receber instâncias customizadas de `OpportunityWithLead`.
- [x] 3.2 Implementar a transição com server actions suportadas pelo react (hook `useOptimistic` aliada à transição de estado da coluna do lead arrastado).
- [x] 3.3 Garantir mapeamento fiel de colunas do Kanban com os enumeradores originários do Banco de dados (New, Qualified, In Progress, Won, Lost), alterando os títulos visuais e o comportamento drop zone atrelado aos identificadores literais (`enum`).

## 4. UI: Opportunity Card Componet

- [x] 4.1 Modificar o arquivo do componente em `src/app/(private)/opportunities/components/OpportunityCard.tsx` (ou extraí-lo caso o mesmo estivesse incorporado na listagem de Opportunity) tipando suas prop como dependentes de `OpportunityWithLead`.
- [x] 4.2 Ligar propriedades informativas contidas relacionalmente do lead: `leadName` e `leadPhone` gerando os renders textuais na placa.
- [x] 4.3 Incorporar mini-badges para exibição imediata caso colunas não vazias (JSON parsed se for object meta) contenham "Intenção/Budget/Urgência".
- [x] 4.4 Adicionar o Toggle de handover (Switch de Interação de IA), fazendo dispatch otimista que se ligue a action `toggle-ai-pause.ts`.
