## ADDED Requirements

### Requirement: Lead Message History Display
O painel lateral de detalhes da oportunidade SHALL exibir o histórico de mensagens trocadas entre o bot de IA e o lead.

#### Scenario: Visualização do histórico no painel
- **WHEN** o painel lateral de uma oportunidade é aberto
- **THEN** o histórico cronológico de mensagens referentes a esse lead é carregado e exibido em formato de chat (balões de mensagem)

#### Scenario: Isolamento de dados por usuário
- **WHEN** o sistema busca as mensagens do lead
- **THEN** a consulta SHALL garantir que apenas mensagens pertencentes ao `userId` do corretor autenticado sejam retornadas

#### Scenario: Histórico vazio
- **WHEN** o painel lateral é aberto para um lead que ainda não possui mensagens
- **THEN** o sistema SHALL exibir uma indicação visual de que não há histórico de conversa para este lead
