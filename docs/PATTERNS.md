# Gestok - Project Patterns

## Stack

Next.js 16 App Router, TypeScript, Drizzle ORM (PostgreSQL), Better Auth, React Hook Form + Zod, next-safe-action, shadcn/ui. Import alias: `@/*` → `./src/*`. All user-facing text in **pt-BR**.

---

## 1. Route Groups

```
src/app/
├── (private)/       # Auth required → redirects to /login
├── (public)/        # No auth → redirects logged users to /dashboard
└── api/auth/        # Better Auth API routes
```

## 2. Feature Module Structure

```
src/app/(private)/<feature>/
├── page.tsx                        # Async Server Component entry point
├── _actions/
│   ├── index.ts                    # Re-exports all actions
│   ├── get-<entities>.ts           # Paginated query
│   ├── upsert-<entity>.ts          # Create/update
│   └── delete-<entity>.ts          # Delete
├── _components/
│   ├── <feature>-content.tsx       # Server Component (fetch + layout)
│   ├── add-<entity>-button.tsx     # Client Component (dialog trigger)
│   ├── upsert-<entity>-form.tsx    # Client Component (form)
│   └── table/
│       ├── table-columns.tsx       # Column definitions
│       └── table-actions.tsx       # Row actions (edit/delete dialogs)
├── _hooks/
│   └── use-<feature>.ts            # Custom hooks (e.g., useEntities)
└── _schemas/
    └── upsert-<entity>-schema.ts   # Zod schema + inferred type export
└── _types/
    └── <entity>.ts                  # Entity type
└── (pages)/
    └── <feature>/
        └── page.tsx                 # Async Server Component entry point

```

All files use **kebab-case**.

## 3. Page Pattern (`page.tsx`)

O `page.tsx` deve ser o esqueleto da página, carregando apenas os dados essenciais de autenticação e parâmetros. O carregamento de dados pesados deve ser delegado a um sub-componente envolto em `Suspense` para permitir **streaming**.

```tsx
const Page = async ({
  searchParams
}: {
  searchParams: Promise<{ query?: string; page?: string }>
}) => {
  await requireFullAuth();
  const { query, page } = await searchParams;

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Título</PageTitle>
          <PageDescription>Descrição da página.</PageDescription>
        </PageHeaderContent>
        <PageActions>
          <AddButton />
        </PageActions>
      </PageHeader>
      <PageContent>
        <div className="space-y-4">
          <SearchInput placeholder="Buscar..." />

          <Suspense
            key={(query || "") + (page || "1")}
            fallback={<TableSkeleton />}
          >
            <TableContainer query={query} page={page || "1"} />
          </Suspense>
        </div>
      </PageContent>
    </PageContainer>
  );
};
```

Flow: `requireFullAuth()` → `await searchParams` → `<Suspense>` with `<PagesLoading>` → delegate to Content.

## 4. Table Container Component (Server)

Este componente encapsula a lógica de busca de dados (`fetch`). Ao ser separado da `page.tsx`, ele permite que o Next.js renderize o cabeçalho e a busca instantaneamente.

```tsx
const TableContainer = async ({ query, page }: Props) => {
  const result = await getEntities({
    limit: "10",
    page: String(page),
    query
  });

  const data = result?.data;
  if (!data?.success) { /* render error UI */ }

  const { entities, totalPages, currentPage } = data.data;

  return (
    <div className="space-y-4">
      <DataTable columns={columns} data={entities} />
      <DynamicPagination
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
};
```

## 5. Loading & Suspense Strategy

Para garantir a melhor UX, seguimos dois níveis de carregamento:

### A. `loading.tsx` (Root/Module level)
- **Uso:** Carregamento inicial da rota (ex: ao clicar no menu lateral).
- **Fallback:** Skeleton completo da página (Header + Search + Table).
- **Objetivo:** Fornecer feedback instantâneo de navegação.

### B. `Suspense` Granular (Page level)
- **Uso:** Atualizações de dados por filtro, busca ou paginação.
- **Fallback:** Skeleton apenas da área de dados (ex: `TableSkeleton`).
- **Trigger:** Atribuir uma `key` ao `<Suspense>` contendo os parâmetros que disparam a busca (ex: `query + page`).
- **Por que:** Evita o reset do foco nos inputs de busca e mantém o contexto da página visível enquanto os dados novos carregam.

---

## 6. Server Actions

All use `"use server"`, `actionClient` from `next-safe-action`, and `auth.api.getSession()` for authentication.

**Return shape:** `{ success: boolean; data?: T; error?: { code: string; message: string } }`

### Mutation action

```tsx
"use server";
export const createHabitAction = actionClient
  .inputSchema(createHabitSchema)
  .action(async ({ parsedInput }): Promise<ActionResult<typeof habit.$inferSelect>> => {
    try {
      const session = await auth.api.getSession({ headers: await headers() });
      if (!session?.user?.id) {
        return { success: false, error: { code: "UNAUTHORIZED", message: "You must be authenticated" } };
      }

      // Business logic (e.g., tier limits, validations)
      const activeHabits = await db.select({ id: habit.id }).from(habit)
        .where(and(eq(habit.userId, session.user.id), isNull(habit.isActive)));
      if (activeHabits.length >= 3) {
        return { success: false, error: { code: "TIER_LIMIT_EXCEEDED", message: "Limit exceeded" } };
      }

      // Create entity
      const newHabit = { id: crypto.randomUUID(), userId: session.user.id, ...parsedInput };
      await db.insert(habit).values(newHabit);

      await revalidatePath("/habits");
      return { success: true, data: newHabit };
    } catch (error: unknown) {
      const drizzleError = error as DrizzleErrorWithCause;
      const constraintName = drizzleError?.cause?.constraint_name;
      const constraintMapping: Record<string, { field: string; message: string }> = {
        habit_userId_name_active_unique: { field: "name", message: "Name already in use" },
      };
      const mapped = constraintMapping[constraintName];
      if (mapped) return { success: false, error: { code: "ALREADY_EXISTS", message: mapped.message } };
      return { success: false, error: { code: "DATABASE_ERROR", message: "Unexpected error" } };
    }
  });
```

Always `revalidatePath()` after mutations.

## 7. Auth

Use Better Auth

## 8. Zod Schemas

File: `schemas/upsert-<entity>-schema.ts`. Always export both schema and type. Validation messages in **pt-BR**.

```tsx
export const upsertEntitySchema = z.object({ id: z.number().optional(), name: z.string().min(1, "Nome é obrigatório") });
export type UpsertEntityFormData = z.infer<typeof upsertEntitySchema>;
```

Naming: `upsert<Entity>Schema` + `Upsert<Entity>FormData`. Used in both Server Action (`.inputSchema()`) and form (`zodResolver()`).

## 9. Form Pattern

```tsx
"use client";
const Form = ({ entity, onSuccess, isOpen }: Props) => {
  const form = useForm<FormData>({ shouldUnregister: true, resolver: zodResolver(schema), defaultValues: { ... } });
  useEffect(() => { if (isOpen) form.reset({ ... }); }, [isOpen]);

  const action = useAction(serverAction, {
    onSuccess: ({ data }) => {
      if (!data.success) {
        if (data.fieldErrors) {
          Object.entries(data.fieldErrors).forEach(([f, m]) =>
            form.setError(f as keyof FormData, { type: "manual", message: m as string }));
          return;
        }
        if (data.serverError) { toast.error(data.serverError); return; }
        return;
      }
      toast.success("pt-BR success msg");
      onSuccess?.();
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((v) => action.execute(v))}>
        <FormField control={form.control} name="field" render={({ field }) => (
          <FormItem><FormLabel>Label</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <Button type="submit" disabled={action.status === "executing"}>Submit</Button>
      </form>
    </Form>
  );
};
```

## 10. Table Columns

```tsx
"use client";
type Entity = typeof entityTable.$inferSelect & { relation?: { id: number; name: string } | null };

export const columns: ColumnDef<Entity>[] = [
  { id: "name", header: "Nome", accessorKey: "name" },
  { id: "price", header: "Preço", accessorKey: "price",
    cell: (p) => Number(p.row.original.price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) },
  { id: "actions", header: "Ações", cell: (p) => <TableActions entity={p.row.original} /> },
];
```

`TableActions` uses `useState` for edit/delete `Dialog` state.

## 11. Database (Drizzle ORM)

Schema file: `src/drizzle/schema.ts`. Commands: `npm run db:generate`, `npm run db:migrate`, `npm run db:studio`.

### Table rules

- Table name: English plural (`products`). Variable: `<singular>Table` (`productTable`)
- PK: `id: serial("id").primaryKey()`
- User-owned entities: `userId` FK with `onDelete: "cascade"`
- Timestamps: `createdAt` + `updatedAt` with `.$defaultFn(() => new Date()).notNull()`
- Composite unique indexes per user: `uniqueIndex("table_field_user_id_index").on(table.field, table.userId)`
- FK `onDelete`: `cascade` (user-owned) | `set null` (optional) | `restrict` (prevent)
- Enums: `pgEnum("name", ["val1", "val2"])`
- Relations: `relations()` for query joins
- Type inference: `typeof entityTable.$inferSelect`
