## ADDED Requirements

### Requirement: Exibição das Colunas do Kanban
O sistema DEVE exibir as oportunidades do corretor autenticado organizadas em colunas que refletem exatamente os status mapeados na tabela do banco de dados (NEW, QUALIFIED, IN_PROGRESS, WON, LOST). Cada coluna DEVE conter referências visuais adequadas (título traduzido) e quantificar o número de leads em cada estágio.

#### Scenario: Visualização do funil de vendas com dados reais
- **WHEN** O corretor entra na página de oportunidades (`/app/(private)/opportunities`)
- **THEN** O sistema busca na base de dados (com o contexto do `userId` autenticado) e monta a tela com os cards distribuídos nas categorias "Novos", "Qualificados", "Em Atendimento", "Ganhos" e "Perdidos".

### Requirement: Oportunity Card Personalizado (Lead Infos)
O card representativo (Lead/Opportunity) na coluna DEVE apresentar informações primárias como o Nome e WhatsApp provenientes da referência relacional com a tabela de leads além dos dados da própria oportunidade, apresentando de maneira condensada tags (badges) se a IA extraiu orçamento e urgência (features de qualificação).

#### Scenario: Leitura rápida dos dados principais pelo corretor
- **WHEN** O Kanban é carregado
- **THEN** Um card é exibido para cada lead ativo contendo: Título com o nome do Lead, Subtítulo com número do WhatsApp e Badges de urgência ou estimativa de negócio, ajudando na prioridade.

### Requirement: Atualização de Status via Drag and Drop
O sistema DEVE permitir que o usuário (corretor) arraste e solte o "Opportunity Card" de uma coluna para outra. Essa ação DEVE invocar a server action correspondente e, através de "optimistic UI update", apresentar a alteração visualmente de imediato e, em plano de fundo, atualizar com sucesso o campo `status` do registro do BD (isolado pelo seu `userId`). Em caso de falha de conexão ou no backend, reverter o card à coluna antiga.

#### Scenario: Movimentação bem-sucedida de um card (Lead)
- **WHEN** O corretor clica, arrasta o lead "João da Silva" da coluna "Novos" e solta na coluna "Qualificados"
- **THEN** O componente muda instantaneamente para "Qualificados" do lado do cliente e a Server Action reporta a alteração de sucesso para o BD em background. Se a action der erro a UI reverte automaticamente a ordem.
