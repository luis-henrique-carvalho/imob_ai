# IA SDR Imobiliário (Assistente WhatsApp + CRM)

> Resumo executivo de 1 página. Útil para alinhar rapidamente ou apresentar a ideia.

---

# [Nome do Projeto - ex: Corretor AI / ImobiLead]

**Data:** 20 de Fevereiro de 2026
**Autor:** [Seu Nome]
**Status:** Validating / Building

---

## 💡 Problema

**Em uma frase:**

> Corretores de imóveis perdem horas preciosas do seu dia respondendo curiosos e leads desqualificados no WhatsApp, dificultando o foco em quem realmente quer fechar negócio.

**Contexto:**
O mercado imobiliário brasileiro gera um alto volume de leads frios via portais (Zap, VivaReal) e tráfego pago. O corretor autônomo não tem tempo para qualificar todos manualmente. Sem triagem, o tempo de resposta cai, o follow-up se perde no meio das conversas pessoais e vendas de alto ticket são perdidas por desorganização.

---

## ✅ Solução

**Em uma frase:**

> Um SDR movido a IA que atende leads imobiliários via WhatsApp em tempo real, faz a qualificação (orçamento, intenção, urgência) e organiza apenas os leads quentes em um mini-CRM Kanban.

**Como funciona:**
O lead entra em contato via WhatsApp. O bot de IA assume instantaneamente, tira dúvidas básicas sobre o imóvel com base em um cadastro prévio e faz até 3 perguntas de qualificação. Ao finalizar, o bot encerra o atendimento automático, tagueia a conversa e envia os dados estruturados para um painel Kanban simples (SaaS), onde o corretor assume as negociações promissoras.

---

## 👤 Público-Alvo

**Persona principal:**

> O Corretor de Imóveis Autônomo (ou pequena imobiliária). Vive no celular, odeia CRMs complexos, paga ferramentas do próprio bolso se elas trouxerem comissões mais rápidas.

**Early adopters:**

> Corretores que já investem em tráfego pago (Instagram/Facebook Ads) e recebem um volume diário de mensagens no WhatsApp superior ao que conseguem gerenciar.

---

## 🎯 Proposta de Valor

**Por que escolher você?**

> Elimine os "curiosos" do seu WhatsApp e foque apenas em quem tem dinheiro e urgência para comprar.

**Alternativas atuais:**

- Fazer tudo na mão (demora e perde vendas).
- RD Station / CRMs parrudões (complexos demais, pouca adoção por corretores independentes).
- Chatbots de WhatsApp com "menus de opções" (experiência robótica e frustrante para o cliente).

**Seu diferencial:**

- Experiência fluida para o lead (conversa natural, sem apertar "1 para vendas").
- Zero atrito para o corretor (ele não precisa mudar de app para falar, só usa o Kanban para gerenciar quem é prioridade).

---

## 💰 Modelo de Negócio

**Monetização:**

> SaaS com recorrência mensal baseada em volume de contatos ou features.

**Pricing inicial:**
| Plano | Preço | Target |
|-------|-------|--------|
| Starter | R$ 59,90/mês | Corretor autônomo iniciante (limite de X leads qualificados/mês) |
| Pro | R$ 149,90/mês | Corretor estabelecido/Pequenas equipes (leads ilimitados, integrações) |

---

## 📊 Métricas de Sucesso

**North Star Metric:**

> Número de leads convertidos/movidos para a coluna "Em Negociação" no Kanban semanalmente.

**Metas iniciais (3 meses):**

- [ ] Alcançar 10 corretores pagantes (Validar a disposição de pagamento).
- [ ] Média de 50 leads triados por corretor via IA por semana.
- [ ] Retenção de 80% no segundo mês.

---

## 🚀 MVP Scope

**O que entra:**

- Autenticação e cadastro do corretor.
- Painel Kanban simples (Novo, Qualificado, Em Atendimento, Descartado).
- Integração básica de WhatsApp (webhook para receber/enviar).
- Motor de IA (prompt fixo no backend focando em Orçamento, Tipo e Urgência).
- Cadastro básico de imóveis (para a IA ter contexto e não alucinar).

**O que NÃO entra:**

- Clone completo do WhatsApp Web na interface.
- Disparos em massa ou automações de marketing.
- Múltiplos corretores dividindo a mesma conta (multi-tenancy complexo).

---

## 🛠 Stack

| Camada | Tecnologia |
| --- | --- |
| Frontend | Next.js 16 + shadcn/ui |
| Backend | PostgreSQL (Drizzle ORM) + Better Auth |
| Deploy | Vercel |

---

## ⏱ Timeline

| Marco | Data/Prazo |
| --- | --- |
| MVP pronto | 3 a 4 semanas |
| Primeiros usuários | Semana 5 |
| Primeira receita | Semana 6 |

---

## ❓ Hipóteses a Validar

1. [ ] Corretores confiam na IA para fazer o primeiro contato e não acham que "espanta" o cliente.
2. [ ] O preço de R$59 é um "no-brainer" comparado ao valor de uma comissão imobiliária.
3. [ ] A IA consegue extrair as 3 informações de qualificação sem precisar de mais de 5 interações.
