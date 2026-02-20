# IA SDR Imobiliário - MVP Scope

## Visão do MVP
Um assistente que atende o WhatsApp, qualifica a intenção/budget do lead e organiza as oportunidades em um Kanban simples.

**Qual hipótese estamos testando?**
Corretores estão dispostos a pagar R$59/mês para parar de atender manualmente leads curiosos e sem perfil de compra.

---

## Escopo: O que ENTRA

### Must Have (P0) - Sem isso não lança

| Feature | Descrição | Critério de Done |
| --- | --- | --- |
| Auth Simples | Login via Google/Email | Usuário acessa o dashboard seguro |
| Conexão WhatsApp | Linkar o número do corretor ao sistema | Webhooks recebendo e enviando mensagens com sucesso |
| Cadastro de Contexto | Adicionar dados básicos de 1-3 imóveis principais | Bot consegue responder sobre o preço e localização destes imóveis |
| IA de Triagem | Bot que extrai (Orçamento, Tipo, Urgência) | Prompt configurado e retornando JSON estruturado |
| Kanban Board | Interface drag-and-drop para os leads | Leads aparecem automaticamente na primeira coluna |
| Botão "Pausar Bot" | Desliga a IA para aquele lead específico | IA não responde mais se o corretor clicar no botão |

### Should Have (P1) - Importante, mas pode esperar v1.1

| Feature | Descrição | Por que não é P0 |
| --- | --- | --- |
| Resumo da Conversa na UI | Exibir o histórico do chat dentro do card do Kanban | Corretor pode ler direto no próprio WhatsApp no celular |
| Sugestão de Respostas IA | Gerar respostas para o corretor enviar manualmente | O foco inicial é apenas a triagem automática |

---

## Escopo: O que NÃO ENTRA

### Explicitamente Fora do MVP

| Feature | Por que não entra |
| --- | --- |
| App Mobile Nativo | Next.js responsivo é suficiente. Muito esforço técnico. |
| Funil de Vendas Customizável | Colunas do Kanban serão fixas no MVP para simplificar a engenharia. |
| Múltiplos Corretores (Equipe) | Foco inicial na persona Autônoma. Hierarquia de usuários atrasa o MVP. |
| Disparos de mensagens em massa | Risco altíssimo de bloqueio do WhatsApp; fere o escopo de "receptivo". |
| Integração com Zap/VivaReal | Leads chegam pelo WhatsApp de qualquer forma. |

---

## Decisões de Simplificação

### Autenticação
- [x] Google OAuth (Better Auth).

### Billing
- [x] Trial manual (Sem automação de cobrança Stripe nos primeiros 10 usuários para validar a entrega de valor).

### UI/UX
- [x] Light mode only.
- [x] Desktop-first (Corretor vai gerenciar o Kanban no notebook/PC).
- [x] shadcn/ui default styling (sem invenções visuais).

### Features
- [x] Sem histórico complexo. Os leads são apagados se deletados.
- [x] Sem real-time complexo no front-end (um refresh na página atualiza o Kanban, ou polling a cada 30s).

---

## Stack do MVP Definida

- **Frontend:** Next.js 16 App Router, TypeScript, Tailwind CSS, shadcn/ui.
- **Backend:** Next.js Server Actions e API Routes (para os webhooks).
- **Database:** PostgreSQL via Drizzle ORM.
- **Deploy:** Vercel.

## Regra de Ouro
Se não ajudar o corretor a separar "quem tem dinheiro agora" de "quem só tá olhando", NÃO entra no MVP.
