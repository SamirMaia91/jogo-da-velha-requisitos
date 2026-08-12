# Evidências e Roteiro de Testes

## 1. Identificação

| Campo | Valor |
| --- | --- |
| Projeto | Jogo da Velha Web — UNIFOR |
| Caso de uso | Jogar Jogo da Velha |
| Versão avaliada | 1.2 |
| Data da revisão | 12/08/2026 |
| Responsável | Mário_DEV (`@mariomont30`) |
| Aplicação | [`src/index.html`](../src/index.html) |
| Testes automáticos | [`tests/game.test.mjs`](../tests/game.test.mjs) |
| Resultado automatizado | 40/40 verificações aprovadas |

## 2. Objetivo

Este documento relaciona os critérios de aceite do CDU à implementação e fornece procedimentos reproduzíveis para avaliação. A situação **Coberto** significa que o comportamento possui rastreabilidade no código e verificação automática ou manual especificada.

O modo clássico permanece como configuração inicial. Os recursos da versão 1.2 são opcionais e não removem nenhum requisito RF-01 a RF-08 ou critério CA-01 a CA-07.

## 3. Matriz de evidências

| Critério | Evidência verificável | Referência principal | Situação |
| --- | --- | --- | :---: |
| CA-01 — Fidelidade visual | Identificação da UNIFOR, paleta institucional e layout responsivo. | CSS em `:root`, `.institucional` e componentes. | ✅ Coberto |
| CA-02 — Regra de ocupação | Uma célula marcada permanece inalterada após novo acionamento. | Guarda de `playMove` e `syncCellAvailability`. | ✅ Coberto |
| CA-03 — Bloqueio pós-fim | Vitória e empate desabilitam todas as células. | `finishRoundWithWinner` e `finishRoundWithDraw`. | ✅ Coberto |
| CA-04 — Modo CPU | O joga automaticamente após 400 ms e bloqueia o tabuleiro durante a espera. | `computerMove` e `cpuTimer`. | ✅ Coberto |
| CA-05 — Melhor de 3 | Placar é preservado, vitória avança e empate repete a rodada decisiva, inclusive em 3/3. | `handleRoundEnd`, `handleDrawEnd` e `scheduleRoundTransition`. | ✅ Coberto |
| CA-06 — Efeitos de vitória | Linha cobre a combinação e confetes aparecem no modo visual padrão. | `drawWinningLine` e `launchConfetti`. | ✅ Coberto |
| CA-07 — Autonomia de áudio | Todos os sons são sintetizados com Web Audio API. | `playTone`, `playMoveSound`, `playWinSound` e `playDrawSound`. | ✅ Coberto |
| CA-08 — Cronômetro | Configuração padrão desativada; modo opcional conta 10 segundos e passa a vez no zero. | `startTurnTimer`, `scheduleTimerTick` e `handleTurnTimeout`. | ✅ Coberto |
| CA-09 — Dificuldade da CPU | Fácil aleatória, Médio tático e Difícil com Minimax. | `chooseComputerPosition` e `minimax`. | ✅ Coberto |
| CA-10 — Acessibilidade | Som e movimento podem ser ajustados; grid e mensagens são semânticos. | `soundToggle`, `motionToggle` e atributos ARIA. | ✅ Coberto |

## 4. Resultado da regressão automática

Execute:

```bash
node --test tests/game.test.mjs
```

A suíte carrega o JavaScript real incorporado a `src/index.html` e simula DOM, timers, Web Audio API e Canvas de forma determinística.

| Grupo | Verificações |
| --- | ---: |
| Estado inicial e modo clássico | 5 |
| Ocupação, vitória, linha e bloqueio | 5 |
| Empate e bloqueio | 2 |
| CPU e cancelamento de temporizador | 6 |
| MD3, placar e empate em 3/3 | 4 |
| Cronômetro e perda de turno | 7 |
| CPU Médio e Difícil | 4 |
| Som e movimento reduzido | 4 |
| Acessibilidade e áudio descendente | 3 |
| **Total** | **40** |

## 5. Casos de teste manuais

### CT-01 — Estado inicial clássico

**Passos**

1. Abra `src/index.html`.
2. Observe as configurações e o tabuleiro sem alterar seletores.

**Resultado esperado**

- Modo `2 Jogadores (PVP)`.
- Formato `Partida Única`.
- Cronômetro `Desativado (Clássico)`.
- Dificuldade da CPU oculta.
- Sons ligados e movimento reduzido desligado.
- Placar 0 × 0, rodada `1/1`, nove células vazias e status `Vez do Jogador X`.

### CT-02 — Ocupação e alternância

**Passos**

1. Clique na célula 1.
2. Clique novamente na célula 1.
3. Clique na célula 2.

**Resultado esperado**

- A célula 1 recebe X.
- O segundo clique não altera célula nem turno.
- A célula 2 recebe O.
- O status alterna corretamente e cada símbolo produz seu som.

### CT-03 — Vitória, linha e bloqueio

**Passos**

1. Reinicie.
2. Em PVP, jogue `1, 4, 2, 5, 3`.
3. Tente selecionar uma célula vazia.

**Resultado esperado**

- X vence pela primeira linha.
- Placar de X é incrementado.
- Linha contínua cobre 1–2–3.
- Confetes e acorde de vitória são executados.
- Nenhuma nova jogada é aceita.

> Repita com uma coluna e uma diagonal antes da apresentação.

### CT-04 — Empate e áudio descendente

**Passos**

1. Reinicie.
2. Jogue `1, 2, 3, 5, 4, 7, 8, 9, 6`.

**Resultado esperado**

- Status `Rodada Empatada!`.
- Placar inalterado e tabuleiro bloqueado.
- Som perceptivelmente descendente.

### CT-05 — CPU Fácil

**Passos**

1. Selecione `Contra o Computador`.
2. Mantenha dificuldade `Fácil`.
3. Faça uma jogada como X e tente clicar novamente durante a espera.

**Resultado esperado**

- Seletor de dificuldade aparece.
- Status informa que o computador está pensando no nível Fácil.
- Clique adicional é ignorado.
- Após aproximadamente 400 ms, O ocupa uma célula vazia.

### CT-06 — CPU Médio

**Passos**

1. Selecione dificuldade `Médio`.
2. Crie oportunidades de vitória ou ameaça de duas marcas alinhadas.

**Resultado esperado**

- A CPU conclui uma vitória imediata quando disponível.
- Caso X possa vencer na jogada seguinte, a CPU bloqueia.
- Sem ameaça, a CPU prioriza o centro vazio e depois escolhe outra célula.

### CT-07 — CPU Difícil

**Passos**

1. Selecione dificuldade `Difícil`.
2. Jogue várias partidas tentando criar armadilhas.

**Resultado esperado**

- A CPU usa Minimax e escolhe movimentos que maximizam seu resultado.
- O intervalo visual permanece em 400 ms.
- Apenas células vazias são utilizadas.

### CT-08 — MD3 com campeão

**Passos**

1. Selecione `Melhor de 3 (MD3)`.
2. Faça X vencer duas rodadas.

**Resultado esperado**

- Primeira vitória exibe 1 × 0.
- Após dois segundos, rodada muda para `2/3` e preserva o placar.
- A segunda vitória declara `Jogador X é o campeão da partida!`.
- Tabuleiro permanece encerrado.

### CT-09 — Empate na terceira rodada do MD3

**Passos**

1. Faça X vencer a primeira rodada.
2. Faça O vencer a segunda.
3. Na rodada `3/3`, produza o empate do CT-04.
4. Aguarde dois segundos.

**Resultado esperado**

- Placar permanece 1 × 1.
- Indicador continua em `3/3`.
- Tabuleiro é limpo e X inicia novamente.
- A terceira rodada decisiva é repetida, pois empate não consome rodada.

### CT-10 — Cronômetro em PVP

**Passos**

1. Selecione `10 segundos`.
2. Não realize jogada até a contagem chegar a zero.

**Resultado esperado**

- Contador e barra iniciam em 10.
- Últimos três segundos recebem destaque e alerta sonoro.
- No zero, X perde a vez sem preencher célula.
- Status informa o tempo esgotado e passa para O.
- Nova contagem começa em 10.

### CT-11 — Cronômetro contra CPU

**Passos**

1. Mantenha cronômetro de 10 segundos.
2. Selecione `Contra o Computador`.
3. Deixe o tempo de X terminar.

**Resultado esperado**

- Cronômetro se aplica somente a X.
- Ao chegar a zero, X perde a vez.
- CPU joga após seus 400 ms.
- O cronômetro reinicia quando a vez retorna a X.

### CT-12 — Cancelamento seguro

**Passos**

1. Inicie a espera da CPU, uma transição de rodada ou uma contagem regressiva.
2. Clique em `REINICIAR JOGO`.
3. Repita alterando modo, formato, cronômetro e dificuldade.

**Resultado esperado**

- Nenhuma ação antiga ocorre após o reinício.
- Placar e rodada voltam ao início.
- Tabuleiro fica vazio, linha e confetes desaparecem e X inicia.

### CT-13 — Controle de sons

**Passos**

1. Desative `Sons`.
2. Execute jogada, vitória, empate e cronômetro.
3. Reative `Sons`.

**Resultado esperado**

- Nenhum som é emitido enquanto o controle estiver desligado.
- Reativar o controle produz feedback e os sons voltam sem reiniciar a partida.

### CT-14 — Movimento reduzido

**Passos**

1. Ative `Reduzir animações`.
2. Produza uma vitória.

**Resultado esperado**

- Linha de vitória e resultado continuam visíveis.
- Confetes não são disparados.
- Transições são reduzidas.
- Regras, placar e áudio não são alterados.

### CT-15 — Responsividade e teclado

**Passos**

1. Redimensione a janela para largura de celular.
2. Use `Tab` para navegar.
3. Acione células com `Enter` e `Espaço`.

**Resultado esperado**

- Controles permanecem legíveis e acessíveis.
- Foco é claramente visível.
- Células possuem rótulos como `Célula 1, vazia` ou `marcada com X`.
- Status dinâmico pode ser anunciado por tecnologia assistiva.

### CT-16 — Operação sem internet

**Passos**

1. Desconecte a internet.
2. Abra `src/index.html`.
3. Teste PVP, CPU, cronômetro, sons e vitória.

**Resultado esperado**

- Aplicação funciona integralmente sem rede.
- Nenhum arquivo externo é solicitado.

## 6. Checklist de entrega

- [x] CDU v1.2 com histórico, fluxos e rastreabilidade atualizados.
- [x] RF-01 a RF-11 implementados.
- [x] CA-01 a CA-10 cobertos.
- [x] Configuração clássica preservada como padrão.
- [x] Aplicação completa em um único HTML/CSS/JS.
- [x] README atualizado com regras e histórico 1.0–1.2.
- [x] Quarenta verificações automatizadas incluídas.
- [x] Workflow de qualidade incluído.
- [x] Workflow de publicação removido por decisão do responsável.
- [x] Roteiro manual pronto para apresentação.

## 7. Parecer de conformidade

A versão 1.2 mantém todos os requisitos originais e adiciona RF-09 a RF-11 de forma rastreável. A configuração inicial reproduz o modo clássico; recursos avançados somente alteram o comportamento mediante escolha explícita do usuário.

Os 40 testes automatizados verificam a lógica e o estado. Antes da apresentação, recomenda-se executar CT-03, CT-04, CT-13 e CT-15 em um navegador real para confirmar percepção visual, áudio e adaptação do dispositivo utilizado.
