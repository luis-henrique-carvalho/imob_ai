## Why

O sistema atualmente possui apenas as tabelas de autenticação (Better Auth). Para viabilizar o MVP do SDR Imobiliário, precisamos de toda a camada de dados de negócio: imóveis cadastrados (base de conhecimento da IA), leads (contatos do WhatsApp), oportunidades (cards do Kanban com qualificação) e histórico de mensagens (contexto para a IA e exibição na UI). Sem essas tabelas, nenhuma feature core (Kanban, bot de IA, cadastro de imóveis) pode funcionar.

## What Changes

- **Novo schema `property`**: Tabela de imóvel do corretor. Serve como base de conhecimento injetada no prompt da IA.
- **Novo schema `lead`**: Tabela de contato (pessoa física) identificado pelo número de WhatsApp, com escopo por `userId`.
- **Novo schema `opportunity`**: Tabela central do Kanban. Liga um Lead a uma Property (nullable), armazena dados de qualificação extraídos pela IA (`budget`, `urgency`, `propertyType`), status do Kanban, posição (LexoRank para drag-and-drop) e flag `isAiPaused`.
- **Novo schema `message`**: Histórico de mensagens por oportunidade. Serve como contexto enviado à OpenAI e para exibição futura na UI.
- **Relações Drizzle**: Relations entre todas as novas entidades e a tabela `user` existente.
- **Enums Postgres**: `opportunity_status` e `message_role` como pgEnums.

- **padrão utilizado**: utilize o pardão de nome de arquivos e tabelas do src/db/schema/auth-schema.ts


## Capabilities

### New Capabilities
- `properties-management`: CRUD de imóveis do corretor (base de conhecimento da IA)
- `leads-tracking`: Gestão de contatos/leads do WhatsApp com unicidade por telefone+corretor
- `opportunities-kanban`: Cards do Kanban com qualificação de IA, LexoRank e handover
- `chat-history`: Histórico de mensagens por oportunidade para contexto da IA e UI

### Modified Capabilities
_(nenhuma — não existem specs anteriores)_

## Impact

- **`src/db/schema/`**: 4 novos arquivos de schema + atualização do `index.ts`
- **`src/db/schema/auth-schema.ts`**: Adição de relations do `user` para as novas entidades
- **Migrações Drizzle**: Nova migration gerada via `drizzle-kit generate`
- **Dependências**: Nenhuma nova (Drizzle ORM + pg-core já instalados)
- **Route group**: Schemas pertencem à camada `(private)` — todas as queries filtram por `userId`
