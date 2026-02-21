## ADDED Requirements

### Requirement: Lead Details Visibility
O corretor SHALL ser capaz de visualizar os detalhes do lead associado a uma oportunidade sem precisar sair do Kanban.

#### Scenario: Corretor clica em um card do Kanban
- **WHEN** o corretor clica em um card de oportunidade no Kanban
- **THEN** um painel lateral (Sheet) se abre exibindo o nome, telefone e outros detalhes do lead correspondente

#### Scenario: Fechamento do painel
- **WHEN** o corretor clica fora do painel lateral ou no botão de fechar
- **THEN** o painel se fecha e a visualização do Kanban retorna ao normal sem recarregar a página
