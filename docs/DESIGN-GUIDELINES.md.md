# Diretrizes Visuais e UI

A interface deve ser vista como uma ferramenta de trabalho diária. Sem distrações.

## Paleta de Cores
Foco em transmitir tecnologia, confiança e limpeza.

- **Background:** `#FAFAFA` (Cinza super claro, quase branco) para a aplicação. `#FFFFFF` para os cards do Kanban.
- **Primary:** `#0F172A` (Slate 900) - Usado para botões principais e títulos H1/H2. É um tom quase preto que passa modernidade.
- **Primary Accent (Botões/Destaques):** `#2563EB` (Blue 600) - Um azul vibrante para CTAs e links, clássico em B2B SaaS.
- **Text (Body):** `#475569` (Slate 600) - Menos contraste agressivo que o preto puro, melhor para leitura.
- **Borders:** `#E2E8F0` (Slate 200) - Bordas sutis para separar colunas do Kanban e painéis.

## Tipografia
- **Font Family Principal:** `Inter` (Google Fonts) ou `Geist` (padrão Vercel).
- **Hierarchy:** - Títulos robustos (Semibold ou Bold) e com tracking (espaçamento de letras) levemente negativo (`tracking-tight` no Tailwind).
  - Corpo legível (Regular, tamanho 14px ou 16px).

## Espaçamento e Formas
- **Escala:** Sistema padrão do Tailwind (base 4px). Ex: `p-4` (16px), `mb-8` (32px).
- **Border Radius:** `rounded-lg` ou `rounded-xl` (8px a 12px) para botões, cards e modais. Evitar bordas 100% arredondadas (pills), exceto em badges de status.
- **Sombras:** Muito sutis. `shadow-sm` para cards gerais. `shadow-md` apenas em modais ou dropdowns. Nenhuma sombra agressiva.

## Diretrizes de Componentes (shadcn/ui)
- **Cards:** Usar para os leads no Kanban. O fundo do card deve ser branco sólido com borda 1px cinza claro.
- **Badges:** Usar intensamente para os status de qualificação (ex: "Compra", "Locação", "Alto Padrão"). Badges devem ter cores neutras ou tons pasteis (fundo azul claro, texto azul escuro).
- **Buttons:** Manter no máximo um botão "Primary" (fundo preenchido) por tela. O resto deve ser `variant="outline"` ou `variant="ghost"`.
- **Inputs:** Clean, bordas cinzas que ficam com o anel primário (azul) no foco (`ring-blue-500`).

## Referência Visual Base
Pense no painel do *Vercel Dashboard* aplicado à gestão imobiliária. A interface "desaparece" e a informação (o nome do lead, o budget e a urgência) salta aos olhos.