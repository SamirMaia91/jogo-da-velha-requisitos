# Evidências e Roteiro de Testes

## 1. Identificação

| Campo | Valor |
| --- | --- |
| Projeto | Jogo da Velha Web — UNIFOR |
| Caso de uso | Jogar Jogo da Velha |
| Versão avaliada | 1.1 |
| Data da revisão | 12/08/2026 |
| Responsável pela revisão | Mário_DEV (`@mariomont30`) |
| Artefato executável | [`src/index.html`](../src/index.html) |

## 2. Objetivo

Este documento relaciona os critérios de aceite do CDU à implementação e fornece passos reproduzíveis para a apresentação ou avaliação. A situação **Coberto** indica que o comportamento está implementado e rastreado no código-fonte; os roteiros abaixo permitem reconfirmá-lo no navegador.

## 3. Matriz de evidências dos critérios de aceite

| Critério | Evidência verificável na aplicação | Referência na implementação | Situação |
| --- | --- | --- | :---: |
| CA-01 — Fidelidade visual | Cabeçalho `UNIVERSIDADE DE FORTALEZA`, título e paleta institucional. | Regras CSS em `:root`, `.institucional`, `h1` e componentes visuais. | ✅ Coberto |
| CA-02 — Regra de ocupação | Uma célula já marcada permanece inalterada após novo clique. | Guarda de `playMove`: rejeita `options[index] !== ''`. | ✅ Coberto |
| CA-03 — Bloqueio pós-fim | Vitória/empate define o jogo como inativo até transição ou reinício. | Guardas `running` e `roundFinished`; `finishRoundWithWinner` e `finishRoundWithDraw`. | ✅ Coberto |
| CA-04 — Modo CPU | O joga automaticamente após 400 ms e o usuário não joga durante a espera. | `computerMove`, `cpuTimer` e bloqueio por `running`. | ✅ Coberto |
| CA-05 — Melhor de 3 | Placar é preservado; vitória avança a rodada; empate repete a rodada atual; duas vitórias encerram a série. | `finishRoundWithWinner`, `finishRoundWithDraw` e `prepareNextRound`. | ✅ Coberto |
| CA-06 — Efeitos de vitória | Linha cobre os centros das três células vencedoras e confetes são animados. | `drawWinningLine`, `launchConfetti` e Canvas 2D. | ✅ Coberto |
| CA-07 — Autonomia de áudio | Todos os sons são sintetizados, inclusive a varredura descendente do empate. | `playMoveSound`, `playWinSound`, `playDrawSound` e Web Audio API. | ✅ Coberto |

## 4. Casos de teste funcionais

### CT-01 — Estado inicial e identidade visual

**Passos**

1. Abra `src/index.html` em um navegador moderno.
2. Observe o cabeçalho, seletores, placar, rodada, status, tabuleiro e botão de reinício.

**Resultado esperado**

- São exibidos `UNIVERSIDADE DE FORTALEZA` e `JOGO DA VELHA`.
- O modo inicial é `2 Jogadores (PVP)` e o formato é `Partida Única`.
- O placar começa em 0 × 0, a rodada mostra `1/1`, as nove células estão vazias e o status informa `Vez do Jogador X`.

### CT-02 — Marcação, alternância e proteção da célula

**Passos**

1. Clique na primeira célula.
2. Clique novamente na mesma célula.
3. Clique em outra célula vazia.

**Resultado esperado**

- O primeiro clique marca X e muda a vez para O.
- O segundo clique não altera a célula nem o turno.
- O clique seguinte marca O e devolve a vez para X.
- Cada símbolo produz seu próprio efeito sonoro.

### CT-03 — Vitória e bloqueio pós-fim

**Passos**

1. Em PVP, jogue a sequência de células `1, 4, 2, 5, 3`.
2. Após a vitória de X, tente clicar em uma célula ainda vazia.

**Resultado esperado**

- X vence pela primeira linha.
- O placar de X é incrementado.
- Uma linha contínua cobre as células 1–2–3, os confetes aparecem e o acorde de vitória é tocado.
- Nenhuma jogada adicional é aceita.

> Repita com combinações verticais e diagonais para validar as oito matrizes vitoriosas.

### CT-04 — Empate e som descendente

**Passos**

1. Reinicie e, em PVP, jogue a sequência `1, 2, 3, 5, 4, 7, 8, 9, 6`.
2. Tente jogar novamente após a nona marcação.

**Resultado esperado**

- O status mostra `Rodada Empatada!`.
- O placar não é alterado e o tabuleiro fica bloqueado.
- É perceptível um som que desce de aproximadamente 330 Hz para 165 Hz.

### CT-05 — Jogada da CPU

**Passos**

1. Selecione `Contra o Computador`.
2. Faça uma jogada como X.
3. Durante a pausa, tente clicar rapidamente em outra célula.

**Resultado esperado**

- O rótulo do segundo participante muda para `Computador`.
- O clique adicional do usuário é ignorado no turno de O.
- Após aproximadamente 400 ms, a CPU escolhe uma célula vazia, marca O e devolve o turno a X.

### CT-06 — MD3 com duas vitórias

**Passos**

1. Selecione `Melhor de 3 (MD3)`.
2. Faça X vencer a primeira rodada com a sequência do CT-03.
3. Aguarde dois segundos e faça X vencer novamente.

**Resultado esperado**

- A primeira vitória atualiza o placar para 1 × 0 e, após a transição, a rodada para `2/3`.
- O tabuleiro é limpo, X inicia a nova rodada e o placar é preservado.
- Na segunda vitória, o status declara `Jogador X é o campeão!` e a série permanece encerrada.

### CT-07 — Empate durante o MD3

**Passos**

1. Selecione MD3 e produza o empate descrito no CT-04.
2. Aguarde dois segundos.

**Resultado esperado**

- O tabuleiro é limpo e X volta a jogar.
- O placar e o indicador `1/3` são preservados, pois o empate repete a rodada decisiva atual.

### CT-08 — Reinício e alteração de parâmetros

**Passos**

1. Inicie uma partida, marque células e gere uma transição de rodada ou uma espera da CPU.
2. Clique em `REINICIAR JOGO`.
3. Repita o cenário, mas altere o modo ou o formato.

**Resultado esperado**

- Temporizadores e confetes pendentes são cancelados.
- Placar é zerado, rodada volta a `1/1` ou `1/3`, linha de vitória desaparece, tabuleiro é limpo e X inicia.

### CT-09 — Responsividade e teclado

**Passos**

1. Redimensione a janela para largura de celular.
2. Navegue pelos seletores, células e reinício usando `Tab`, `Enter` e `Espaço`.

**Resultado esperado**

- O conteúdo permanece legível, sem perda de controles.
- O foco é visível, as células têm rótulos acessíveis e o status dinâmico pode ser anunciado por tecnologia assistiva.

### CT-10 — Ausência de dependências externas

**Passos**

1. Desconecte o acesso à internet.
2. Abra `src/index.html` e execute jogadas, vitória e empate.

**Resultado esperado**

- Interface, regras, confetes e sons continuam funcionando integralmente.

## 5. Checklist para a apresentação

- [x] CDU com extensão Markdown correta e histórico de versões atualizado.
- [x] Requisitos RF-01 a RF-08 rastreados até a implementação.
- [x] Critérios CA-01 a CA-07 cobertos por procedimentos reproduzíveis.
- [x] Regras de empate e MD3 sem contradições.
- [x] Áudio gerado sem arquivos externos.
- [x] Aplicação executável em um único arquivo HTML/CSS/JS.
- [x] README com instruções, estrutura e histórico de versões.
- [x] Workflow de publicação no GitHub Pages incluído.

## 6. Parecer de conformidade

A versão 1.1 cobre todos os requisitos funcionais RF-01 a RF-08, os requisitos não funcionais aplicáveis e os critérios de aceite CA-01 a CA-07 descritos no CDU. Antes da apresentação, recomenda-se apenas executar este roteiro no navegador e registrar capturas de tela do ambiente utilizado, caso o professor exija evidência visual externa ao repositório.
