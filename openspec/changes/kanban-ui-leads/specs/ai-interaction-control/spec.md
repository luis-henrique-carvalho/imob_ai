## ADDED Requirements

### Requirement: Interruptor (Switch) de Handover (Pausa IA)
O sistema DEVE prover um componente acessível dentro do Card de Oportunidades ou detalhe do Lead para alterar temporariamente (ligar/desligar) o controle da Inteligência Artificial sobre as mensagens do cliente via WhatsApp.

#### Scenario: Corretor pausando a IA para conversar diretamente
- **WHEN** O corretor verifica no Card que um Lead (Oportunidade) está quente e decide assumir o contato no bot de WhatsApp
- **THEN** O corretor clica em um botão no respectivo Card que alterna instantaneamente e de forma visual o estado (badge/toggle aceso) no cliente, acionando a Server Action para atualizar o booleano de bloqueio e desengajando a inteligência natural do lead para conversão futura manual.

### Requirement: Atualização Otimista no Switch de Handover
O componente responsável por ligar/desligar a intervenção da IA (Handover - Pausar IA) DEVE utilizar "optimistic responses" para não travar a aplicação baseada na latência da internet e atualizar seu estado visual logo após a interação. Caso a Server Action correspondente retorne falha, a UI (como o toggle switch) DEVE ser revertida a seu estado original automaticamente.

#### Scenario: Fallback em caso de erro no servidor
- **WHEN** O usuário logado (corretor) altera o Toggle AI, mas o servidor está indisponivel ou a Query não concluiu
- **THEN** A página mostra visualmente alterado o Toggle contudo reverte ao estado antigo imediatamente provendo uma clara informação para ele tentar novamente, validando as informações e prevenindo erro oculto no comportamento pretendido ao bot (onde continuou não silenciado).
