## ADDED Requirements

### Requirement: Listagem Paginada de Imóveis
O sistema DEVE listar os imóveis vinculados ao corretor autenticado em uma tabela paginada.

#### Scenario: Visualização da lista de imóveis
- **WHEN** o corretor acessa a rota `/properties`
- **THEN** o sistema SHALL buscar os imóveis onde `userId` corresponde ao ID da sessão
- **AND** exibir os campos `title`, `price` e `isActive` na tabela

#### Scenario: Busca por título
- **WHEN** o corretor digita um termo no campo de busca
- **THEN** o sistema SHALL filtrar a listagem de imóveis cujo `title` contenha o termo digitado (case-insensitive)

### Requirement: Criação de Imóvel
O sistema DEVE permitir que o corretor cadastre novos imóveis informando título, descrição e preço.

#### Scenario: Cadastro com sucesso
- **WHEN** o corretor preenche o formulário com dados válidos e submete
- **THEN** o sistema SHALL criar um novo registro na tabela `property` vinculando o `userId` do corretor
- **AND** redirecionar ou atualizar a lista exibindo uma mensagem de sucesso em **pt-BR**

### Requirement: Edição de Imóvel
O sistema DEVE permitir que o corretor altere os dados de seus imóveis cadastrados.

#### Scenario: Atualização de dados
- **WHEN** o corretor altera os campos no formulário de edição e submete
- **THEN** o sistema SHALL validar se o imóvel pertence ao corretor (userId match)
- **AND** atualizar os campos `title`, `description` e `price` no banco de dados

### Requirement: Exclusão de Imóvel
O sistema DEVE permitir a remoção definitiva de um imóvel da base do corretor.

#### Scenario: Exclusão com confirmação
- **WHEN** o corretor clica em excluir e confirma a ação no dialog
- **THEN** o sistema SHALL validar se o imóvel pertence ao corretor
- **AND** remover o registro da tabela `property`
- **AND** atualizar a listagem removendo o item
