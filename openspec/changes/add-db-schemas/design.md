## Context

O banco de dados atualmente contém apenas tabelas de autenticação do Better Auth (`user`, `session`, `account`, `verification`) em `src/db/schema/auth-schema.ts`. Precisamos adicionar as entidades de negócio: **Property**, **Lead**, **Opportunity** e **Message**.

Stack: PostgreSQL + Drizzle ORM. Deploy na Vercel. Todas as entidades são scoped por `userId` (isolamento por corretor).

## Goals / Non-Goals

**Goals:**
- Modelar as 4 entidades core com relacionamentos bem definidos
- Garantir isolamento de dados por `userId` em todas as tabelas
- Suportar drag-and-drop no Kanban com ordenação persistente (LexoRank)
- Manter histórico de mensagens por oportunidade para contexto da IA
- Seguir as convenções existentes do Drizzle no projeto (UUIDs como text, timestamps, cascade deletes)

**Non-Goals:**
- Multi-tenancy com workspaces/organizações (fora do MVP)
- Tabela de configurações de WhatsApp/Bot (será uma change separada)
- Real-time subscriptions (polling é suficiente no MVP)
- Soft deletes (leads deletados são apagados de vez, conforme MVP-SCOPE)

## Decisions

### 1. Entidades separadas para Lead e Opportunity
**Decisão:** Criar `lead` e `opportunity` como tabelas distintas.
**Alternativa descartada:** Tabela única com tudo junto (mais simples, mas impede reuso do lead).
**Rationale:** Um mesmo contato (Lead) pode gerar múltiplas oportunidades ao longo do tempo. Ex: Lead busca apartamento em janeiro (Opportunity 1, LOST), volta em novembro buscando casa (Opportunity 2, NEW).

### 2. Opportunity → Property é Nullable
**Decisão:** `propertyId` na tabela `opportunity` é nullable (FK opcional).
**Alternativa descartada:** Obrigar FK (quebraria leads "frios" que chegam sem imóvel específico).
**Rationale:** Leads vindos de anúncio específico terão `propertyId` preenchido. Leads vindos de indicação/bio do Instagram chegam sem imóvel definido — a IA qualifica e o corretor linka manualmente depois.

### 3. LexoRank para ordenação do Kanban
**Decisão:** Campo `position` (text) usando strings alfanuméricas ordenáveis (LexoRank pattern).
**Alternativa descartada:** `ORDER BY updated_at` (simples, mas cards saltam de posição ao atualizar).
**Rationale:** Controle total do corretor sobre a ordem dos cards. Para mover um card entre posições "b" e "d", calcula-se "c". Updates pontuais sem reordenar a coluna inteira.

### 4. Mensagens salvas no nosso banco (não na OpenAI)
**Decisão:** Tabela `message` com `role` (user/assistant/system) e `content`, vinculada a `opportunityId`.
**Alternativa descartada:** Usar OpenAI Threads/Assistants API para guardar o histórico.
**Rationale:** Controle total sobre o contexto da IA, facilita pausar/retomar via handover, permite exibir chat na UI futuramente, e evita vendor lock-in com storage da OpenAI.

### 5. pgEnum para status e roles
**Decisão:** Usar `pgEnum` para `opportunity_status` e `message_role`.
**Alternativa descartada:** Strings livres.
**Rationale:** Validação no nível do banco + type-safety no Drizzle. Enums são mais performáticos que check constraints em Postgres.

### 6. Unicidade de Lead por telefone + userId
**Decisão:** Unique constraint composto em `(phone, userId)` na tabela `lead`.
**Rationale:** O mesmo número de telefone pode ser lead de corretores diferentes, mas não deve duplicar dentro do mesmo corretor.

## Risks / Trade-offs

| Risco | Mitigação |
|-------|-----------|
| LexoRank strings podem colidir em edge cases extremos (milhares de reordenações) | Implementar rebalanceamento periódico; no MVP é improvável ocorrer |
| Tabela `message` pode crescer rápido com muitas conversas ativas | Índice em `opportunityId` + `createdAt`; no futuro, archiving de oportunidades old |
| Cascade delete no `userId` pode ser perigoso (deletar user = deletar tudo) | Intencional no MVP — não existe conceito de "conta desativada" ainda |
| `extractedBudget` como integer pode não cobrir todos os formatos ("entre 300k e 500k") | Usar campo text para flexibilidade; parsing numérico fica na camada de aplicação |
