## 1. Fundação do Módulo

- [x] 1.1 Criar estrutura de pastas em `src/app/(private)/properties/` (_actions, _components, _schemas, _types, _hooks)
- [x] 1.2 Criar schema de validação em `src/app/(private)/properties/_schemas/upsert-property-schema.ts`
- [x] 1.3 Criar definição de tipos em `src/app/(private)/properties/_types/property.ts`

## 2. Server Actions (Data Layer)

- [x] 2.1 Implementar action de listagem `get-properties.ts` com paginação e busca
- [x] 2.2 Implementar action de criação/edição `upsert-property.ts` com isolamento por `userId`
- [x] 2.3 Implementar action de exclusão `delete-property.ts`

## 3. Componentes de Interface

- [x] 3.1 Implementar `upsert-property-form.tsx` utilizando React Hook Form e shadcn/ui
- [x] 3.2 Implementar colunas da tabela em `_components/table/table-columns.tsx`
- [x] 3.3 Implementar ações da linha (`TableActions`) para Editar/Excluir
- [x] 3.4 Implementar `properties-content.tsx` (Server Component principal)
- [x] 3.5 Implementar `add-property-button.tsx` (Trigger do Dialog)

## 4. Integração e Rota

- [x] 4.1 Criar `src/app/(private)/properties/page.tsx` com Suspense e requireFullAuth
- [x] 4.2 Adicionar link "Imóveis" no `src/components/layout/app-sidebar.tsx`
- [ ] 4.3 Testar fluxo completo de CRUD manualmente
