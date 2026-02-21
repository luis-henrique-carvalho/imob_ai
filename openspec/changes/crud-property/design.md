## Context

O sistema necessita de uma interface para o gerenciamento de imóveis pelos corretores. A tabela `property` já está definida no banco de dados via Drizzle, mas não há lógica de aplicação (Actions, UI, Schemas) implementada. Este design segue o **Feature Module Pattern** documentado em `docs/PATTERNS.md`.

## Goals / Non-Goals

**Goals:**
- Implementar o CRUD completo de imóveis em `src/app/(private)/properties/`.
- Garantir isolamento de dados por `userId` em todas as operações.
- Utilizar `next-safe-action` para Server Actions seguras.
- Seguir o padrão visual do shadcn/ui.
- Adicionar link de navegação no `AppSidebar`.

**Non-Goals:**
- Alterar o schema do banco de dados (exceto se houver erro crítico encontrado).
- Implementar filtros avançados (além de busca por título) nesta fase.
- Implementar upload de imagens (fora do escopo do CRUD básico de texto/preço).

## Decisions

### 1. Estrutura de Arquivos (Feature Module)
Seguiremos estritamente o padrão definido no projeto:
- `page.tsx`: Server Component para carregar `searchParams`.
- `_components/properties-content.tsx`: Componente principal que faz o fetch e layout.
- `_actions/`: Lógica de banco separada por propósito.

### 2. Validação com Zod e pt-BR
O schema de validação (`_schemas/upsert-property-schema.ts`) conterá mensagens amigáveis em português, utilizando `z.coerce.number()` para o campo de preço (que no DB é `integer`, representando centavos ou valor inteiro dependendo da convenção do projeto - assumiremos valor inteiro para simplificar conforme o schema atual).

### 3. Server Actions e Revalidação
Utilizaremos `revalidatePath("/properties")` em todas as mutações para garantir que a UI reflita os dados atualizados sem necessidade de refresh manual.

### 4. Navegação
Adição do item "Imóveis" no componente `AppSidebar` dentro do grupo principal de navegação.

## Risks / Trade-offs

- **[Risco] Corretor editar imóvel de outro usuário** → **[Mitigação]** Todas as queries e mutations terão `where(and(eq(property.id, id), eq(property.userId, session.user.id)))`.
- **[Trade-off] Uso de centavos vs Inteiro no Preço** → Como o schema usa `integer("price")`, trataremos como o valor final por enquanto (ex: 500000 para 500k). Se for necessário centavos, a lógica de exibição no DataTable usará `Intl.NumberFormat`.
- **[Risco] Sidebar poluído** → **[Mitigação]** Manteremos apenas os links essenciais do MVP.
