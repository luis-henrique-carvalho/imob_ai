## Why

O schema da tabela `property` já existe (`src/db/schema/property-schema.ts`) mas não há nenhuma interface para o corretor gerenciar seus imóveis. O cadastro de imóveis é uma feature core do MVP — a base de conhecimento que a IA utiliza para qualificar leads e responder perguntas sobre os imóveis disponíveis. Sem o CRUD, o corretor não consegue alimentar o sistema.

## What Changes

- Criar o feature module `src/app/(private)/properties/` com o padrão completo (page, actions, components, schemas, types, hooks)
- Implementar **listagem paginada** com busca por texto (título) e DataTable
- Implementar **criação/edição** via dialog com formulário (upsert pattern)
- Implementar **exclusão** com confirmação via dialog
- Todas as operações filtradas por `userId` (isolamento de dados)
- Textos da UI em **pt-BR**

## Capabilities

### New Capabilities
- `crud-property`: CRUD completo de imóveis — listagem paginada com busca, criação, edição e exclusão de propriedades vinculadas ao corretor autenticado

### Modified Capabilities
_Nenhuma capability existente é modificada._

## Impact

- **Novos arquivos**: ~10 arquivos no feature module `src/app/(private)/properties/`
- **Schema DB**: Nenhuma alteração — `property-schema.ts` já existe
- **Dependências**: Nenhuma nova dependência — usa `next-safe-action`, `react-hook-form`, `zod`, `shadcn/ui` já instalados
- **Rotas**: Nova rota `/properties` protegida por `requireFullAuth()`
- **Sidebar**: Necessário adicionar link "Imóveis" no `AppSidebar`
