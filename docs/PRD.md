## Overview

O projeto visa construir um "SDR como Serviço" para corretores de imóveis. Através de um bot de WhatsApp impulsionado por IA, qualificamos os leads que chegam de campanhas de marketing ou portais, classificando-os em um Kanban minimalista. O objetivo é poupar horas de triagem manual e garantir que o corretor gaste energia apenas com compradores/locatários reais.

---

## Problem

### O que está acontecendo?
Corretores recebem dezenas de mensagens por dia ("Tá disponível?", "Qual o valor?"). Muitos são curiosos. O corretor perde horas do dia sendo um "respondente de perguntas frequentes" e perde o timing de leads realmente quentes.

### Quem é afetado?
Corretores autônomos e corretores de pequenas imobiliárias.

### Qual o custo de não resolver?
Fadiga do corretor, leads esfriando pelo tempo de resposta lento (o corretor estava mostrando um imóvel e demorou 3 horas para responder o WhatsApp), perda de comissões (milhares de reais por venda).

### Como resolvem hoje?
Mensagens rápidas do WhatsApp Business ou ignorando leads que parecem frios (o que pode queimar boas oportunidades).

---

## Goals

- [ ] **Goal 1:** Reduzir o tempo de resposta inicial (SLA) do corretor para menos de 1 minuto (a IA atende na hora) → Métrica: Tempo médio de primeira resposta.
- [ ] **Goal 2:** Garantir que 100% dos leads no Kanban tenham as informações de qualificação preenchidas → Métrica: Taxa de completude de qualificação.
- [ ] **Goal 3:** Validar a disposição de pagamento (Willingness to Pay) → Métrica: Conversão de usuários beta gratuitos para o plano de R$59,90.

---

## Non-Goals

- ❌ Substituir o aplicativo do WhatsApp do corretor.
- ❌ Fazer automação de e-mail marketing.
- ❌ Construir um CRM complexo com gestão financeira de comissões.
- ❌ Funcionalidades de disparo em massa (risco de banimento de número).

---

## User Stories

### Persona 1: Corretor João

> Autônomo, atende 50 leads por semana, fecha 1 a 2 vendas/mês. Vive no trânsito mostrando imóveis.

- Como João, eu quero que o bot atenda meus clientes na hora para que eles não procurem outro corretor enquanto estou dirigindo.
- Como João, eu quero ver uma lista (Kanban) apenas de quem respondeu o orçamento e a urgência para que eu saiba com quem falar primeiro.
- Como João, eu quero poder pausar a IA facilmente em um contato para que eu possa assumir a conversa humanizada sem que o bot interfira.
- Como João, eu quero cadastrar informações básicas do imóvel (link, preço, quartos) para que a IA saiba o que responder.

---

## Solution

### Visão Geral

Um SaaS com frontend em Next.js focado em gestão simples de leads. O motor do SaaS se conecta a uma API de WhatsApp. Quando uma mensagem chega, o sistema envia para a OpenAI (com um prompt de sistema rigoroso de qualificação e contexto do imóvel). A IA conversa com o lead até obter o `job_to_be_done`, `budget` e `urgency`. Uma vez extraídos, o backend salva no PostgreSQL (via Drizzle ORM) e cria um card no Kanban do corretor.

### Features Principais

| Feature | Descrição | Prioridade |
| --- | --- | --- |
| Autenticação | Login rápido (Magic link ou Google) | Must have |
| Kanban Board | Colunas: Novos, Qualificados, Em Atendimento, Perdidos | Must have |
| Motor IA de Qualificação | Prompt que extrai informações e encerra a conversa | Must have |
| Cadastro de Imóveis (Base de Conhecimento) | Formulário simples para cadastrar os dados dos imóveis que o bot vai "saber" | Must have |
| Handover (Assumir conversa) | Botão no dashboard para desativar a IA para aquele número específico | Must have |
| Resumo do Chat | Mostrar no Kanban o resumo gerado pela IA (ex: "Quer comprar até 500k, 2 quartos, zona sul") | Should have |

### User Flow (Lead)

1. Lead manda mensagem via link de anúncio.
2. Sistema intercepta via webhook.
3. IA responde: "Olá! Sou o assistente do Corretor João. Para agilizarmos, você busca imóvel para compra ou locação?"
4. Lead responde. IA continua a qualificação de forma natural.
5. IA agradece e avisa que o João vai assumir.
6. Sistema cria card no Supabase e exibe no Kanban do Next.js.

---

## Technical Approach

### Stack

- **Frontend:** Next.js 16 (App Router), shadcn/ui, Tailwind CSS. Client-side state para o Kanban.
- **Backend/DB:** PostgreSQL (com Drizzle ORM) e Better Auth. Next.js API Routes para webhooks e chamadas LLM.
- **Integração WhatsApp:** API Cloud Oficial (Meta) ou Provedor de terceiros (ex: Z-API / Evolution API) para simplificar no MVP.
- **IA:** OpenAI API (gpt-4o-mini ou gpt-3.5-turbo para custo/benefício, usando *structured outputs* para extrair o JSON de qualificação).
- **Infra:** Vercel.

### Constraints

- Client-side first: O Kanban deve ser rápido e responsivo.
- Prompt injection: Garantir que o bot não mude de assunto (ex: o lead tentar usar o bot para resolver código Python).

---

## Design Guidelines

### Estilo Visual

- Clean, focado em produtividade (ferramenta de trabalho, não rede social).
- Referências: Linear (para o Kanban), Vercel (para o minimalismo).
- Base: shadcn/ui.

---

## Risks & Assumptions

### Assumptions

- Assumimos que a latência da API do WhatsApp + OpenAI será inferior a 5 segundos (aceitável para chat).
- Assumimos que corretores conseguirão escanear o QR Code/Conectar a API sem atrito severo.

### Risks

| Risco | Probabilidade | Impacto | Mitigação |
| --- | --- | --- | --- |
| Banimento do WhatsApp | Média | Alto | Usar API oficial da Meta (Cloud API) ou deixar claro os limites de uso. Não permitir disparos. |
| IA Alucinar preço/dados | Baixa | Alto | Usar *system prompts* estritos informando: "Se a informação não estiver no contexto, diga que o corretor irá confirmar". |
| Corretor achar difícil configurar | Média | Médio | Criar um onboarding com UX excelente (apenas 3 passos). |
