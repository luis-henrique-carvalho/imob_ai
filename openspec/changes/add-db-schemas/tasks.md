## 1. Enums e Tipos Base

- [ ] 1.1 Criar `src/db/schema/enums.ts` com `pgEnum('opportunity_status', ['NEW', 'QUALIFIED', 'IN_PROGRESS', 'WON', 'LOST'])` e `pgEnum('message_role', ['user', 'assistant', 'system'])`
- [ ] 1.2 Exportar os enums no `src/db/schema/index.ts`

## 2. Schema de Property

- [ ] 2.1 Criar `src/db/schema/property-schema.ts` com a tabela `property` (id, userId FK cascade, title, description, price, isActive, createdAt, updatedAt)
- [ ] 2.2 Adicionar índice em `userId` para queries filtradas por corretor
- [ ] 2.3 Definir relations: `property → user` (many-to-one)

## 3. Schema de Lead

- [ ] 3.1 Criar `src/db/schema/lead-schema.ts` com a tabela `lead` (id, userId FK cascade, name nullable, phone, createdAt, updatedAt)
- [ ] 3.2 Adicionar unique constraint composta em `(phone, userId)`
- [ ] 3.3 Adicionar índice em `userId`
- [ ] 3.4 Definir relations: `lead → user` (many-to-one), `lead → opportunity` (one-to-many)

## 4. Schema de Opportunity

- [ ] 4.1 Criar `src/db/schema/opportunity-schema.ts` com a tabela `opportunity` (id, userId FK cascade, leadId FK cascade, propertyId FK nullable, status pgEnum, position text, isAiPaused boolean default false, extractedBudget nullable, extractedUrgency nullable, extractedPropertyType nullable, createdAt, updatedAt)
- [ ] 4.2 Adicionar índice composto em `(userId, status)` para filtrar cards por coluna do Kanban
- [ ] 4.3 Definir relations: `opportunity → user`, `opportunity → lead`, `opportunity → property` (nullable), `opportunity → message` (one-to-many)

## 5. Schema de Message

- [ ] 5.1 Criar `src/db/schema/message-schema.ts` com a tabela `message` (id, opportunityId FK cascade, role pgEnum, content text, createdAt)
- [ ] 5.2 Adicionar índice composto em `(opportunityId, createdAt)` para queries de contexto da IA
- [ ] 5.3 Definir relations: `message → opportunity` (many-to-one)

## 6. Integração e Relations do User

- [ ] 6.1 Atualizar `src/db/schema/auth-schema.ts` adicionando relations do `user` para `property`, `lead` e `opportunity`
- [ ] 6.2 Atualizar `src/db/schema/index.ts` para exportar todos os novos schemas

## 7. Migration

- [ ] 7.1 Executar `npx drizzle-kit generate` para gerar a migration SQL
- [ ] 7.2 Revisar o SQL gerado para conferir enums, FKs, índices e constraints
- [ ] 7.3 Executar `npx drizzle-kit push` ou `npx drizzle-kit migrate` para aplicar no banco
