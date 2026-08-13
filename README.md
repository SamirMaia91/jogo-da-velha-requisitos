<div align="center">

# 🎮 Jogo da Velha Web — UNIFOR

Uma experiência completa de Jogo da Velha, construída em HTML, CSS e JavaScript puro a partir de uma especificação formal de requisitos.


👥 Integrantes do projeto
Samir
Mario
Fabiellen
Ana Gabriella



[![Versão](https://img.shields.io/badge/versão-1.2-003366)](./docs/cdu_JogarJogodavelha.md)
[![Testes](https://img.shields.io/badge/testes-40%20verificações-15803d)](./tests/game.test.mjs)
[![Dependências](https://img.shields.io/badge/dependências-zero-d97706)](./src/index.html)
[![Acessibilidade](https://img.shields.io/badge/acessibilidade-aprimorada-0056b3)](./docs/EVIDENCIAS_TESTES.md)

[**Executar o jogo**](./src/index.html) · [**Ler o CDU**](./docs/cdu_JogarJogodavelha.md) · [**Ver evidências**](./docs/EVIDENCIAS_TESTES.md)

</div>
---

## Visão geral

O projeto implementa o caso de uso **Jogar Jogo da Velha** em uma aplicação web responsiva e autocontida. O modo clássico permanece como configuração inicial, garantindo compatibilidade integral com os requisitos originais, enquanto a versão 1.2 acrescenta desafios e opções de acessibilidade.

Toda a aplicação continua em um único arquivo: [`src/index.html`](./src/index.html). Não existe back-end, instalação obrigatória, biblioteca JavaScript, arquivo de áudio ou conexão com serviços externos.

## Destaques da versão 1.2

| Novidade | Comportamento |
| --- | --- |
| ⏱️ Cronômetro opcional | Dez segundos por jogada; ao esgotar, o jogador perde a vez. |
| 🧠 CPU com três níveis | Fácil aleatória, Médio estratégico e Difícil com Minimax. |
| 🔇 Controle de som | Todos os efeitos podem ser desativados sem reiniciar a partida. |
| 🪶 Movimento reduzido | Desativa confetes e reduz transições visuais. |
| ♿ Acessibilidade | Grid semântico, rótulos dinâmicos, foco visível e status anunciado. |
| 🧪 Regressão automática | Quarenta verificações executadas localmente e pelo GitHub Actions. |
| 🎨 Interface renovada | Layout institucional, responsivo e com feedback mais evidente. |

> O cronômetro começa **desativado**, a CPU começa no nível **Fácil**, os sons ficam **ligados** e as animações ficam **completas**. Assim, o fluxo clássico descrito originalmente pelo CDU continua sendo o padrão.

## Funcionalidades

### Modos e formatos

- Dois jogadores locais, alternando entre X e O.
- Partidas contra o computador, que joga como O após 400 ms.
- Partida única.
- Melhor de 3, vencida pelo primeiro participante que alcançar duas vitórias.
- Placar acumulado e indicador de rodada.
- Empates no MD3 repetem a rodada decisiva atual, inclusive em `3/3`.

### Efeitos e feedback

- Linha contínua sobre as três células vencedoras.
- Confetes em Canvas 2D.
- Sons de X, O, vitória, empate e cronômetro sintetizados com Web Audio API.
- Som descendente específico para empate.
- Mensagens diferenciadas para jogador, computador, campeão e tempo esgotado.

### Segurança do estado

- Células ocupadas não podem ser sobrescritas.
- O tabuleiro é bloqueado após vitória ou empate.
- Cliques são bloqueados durante a reflexão da CPU.
- Reiniciar ou alterar uma configuração cancela CPU, transição de rodada e cronômetro pendentes.
- Confetes são interrompidos em reinícios e novas rodadas.

## Cronômetro por jogada

O seletor oferece duas opções:

| Opção | Regra |
| --- | --- |
| Desativado — Clássico | Não existe limite de tempo e o fluxo original é preservado. |
| 10 segundos | O contador reinicia a cada turno humano; ao chegar a zero, o jogador perde a vez. |

Nos últimos três segundos, a interface muda de cor e emite alertas sonoros quando os sons estão ligados. No modo contra o computador, o cronômetro se aplica somente ao Jogador X; a CPU mantém o intervalo de reflexão de 400 ms.

## Níveis da CPU

O seletor de dificuldade aparece somente no modo `Contra o Computador`.

| Nível | Estratégia |
| --- | --- |
| Fácil | Escolhe aleatoriamente uma célula vazia. |
| Médio | Prioriza vitória, bloqueia ameaças do jogador, ocupa o centro quando possível e depois escolhe aleatoriamente. |
| Difícil | Usa o algoritmo Minimax para avaliar as jogadas e buscar o melhor resultado possível. |

Todos os níveis atendem ao fluxo A2 do CDU: a CPU aguarda, escolhe uma posição vazia e executa sua jogada como O.

## Conformidade com o CDU

| Requisito | Entrega | Situação |
| --- | --- | :---: |
| RF-01 | Seleção entre PVP e CPU | ✅ |
| RF-02 | Partida única e Melhor de 3 | ✅ |
| RF-03 | Marcação e proteção das células | ✅ |
| RF-04 | Áudio sintetizado | ✅ |
| RF-05 | Detecção de vitória e empate | ✅ |
| RF-06 | Linha vencedora e confetes | ✅ |
| RF-07 | Placar e transição de rodadas | ✅ |
| RF-08 | Reinício completo | ✅ |
| RF-09 | Cronômetro opcional de 10 segundos | ✅ |
| RF-10 | Níveis de dificuldade da CPU | ✅ |
| RF-11 | Preferências de acessibilidade | ✅ |

A matriz detalhada, os fluxos e os critérios CA-01 a CA-10 estão no [CDU v1.2](./docs/cdu_JogarJogodavelha.md).

## Como executar

### Para jogar

1. Baixe ou clone o repositório:

   ```bash
   git clone https://github.com/SamirMaia91/jogo-da-velha-requisitos.git
   ```

2. Abra [`src/index.html`](./src/index.html) em um navegador moderno.

Não é necessário iniciar servidor ou instalar pacotes.

### Para executar os testes

Os testes utilizam apenas o executor nativo do Node.js:

```bash
node --test tests/game.test.mjs
```

O mesmo comando é executado automaticamente pelo workflow de qualidade em cada alteração enviada à `main` ou em Pull Requests.

## Cobertura automatizada

A suíte realiza 40 verificações sobre o JavaScript real incorporado ao HTML, usando uma simulação controlada do navegador. Entre os cenários cobertos estão:

- estado inicial e alternância de turnos;
- células ocupadas e bloqueios;
- vitória, empate, linha e placar;
- CPU, espera de 400 ms e cancelamento de timers;
- MD3 até `3/3`;
- empate na terceira rodada decisiva;
- cronômetro e perda de turno;
- níveis Médio e Difícil;
- áudio ativado/desativado;
- movimento reduzido;
- atributos essenciais de acessibilidade.

O roteiro de validação manual para apresentação está em [`docs/EVIDENCIAS_TESTES.md`](./docs/EVIDENCIAS_TESTES.md).

## Estrutura do repositório

```text
.
├── .github/
│   └── workflows/
│       └── quality.yml                 # Regressão automática
├── docs/
│   ├── cdu_JogarJogodavelha.md         # CDU v1.2 e rastreabilidade
│   └── EVIDENCIAS_TESTES.md            # Evidências e roteiro manual
├── src/
│   └── index.html                      # Aplicação completa e autocontida
├── tests/
│   └── game.test.mjs                   # 40 verificações funcionais
├── README.md                            # Apresentação do projeto
└── RELATORIO_PROMPTS.md                 # Registro de interação com IA
```

## Identidade visual

A configuração clássica mantém a paleta institucional definida pelo CDU:

| Papel | Cor |
| --- | --- |
| Azul institucional | `#003366` |
| Azul de destaque | `#0056b3` |
| Laranja | `#d97706` |
| Fundo | `#f4f6f9` |

A interface também possui foco visível, mensagens com contraste reforçado, controles acessíveis e adaptação para telas pequenas.

## Histórico de versões

| Data | Versão | Principais entregas | Responsável |
| --- | --- | --- | --- |
| 08/08/2026 | 1.0 | CDU e implementação inicial do jogo. | Equipe LAPIS |
| 12/08/2026 | 1.1 | Conformidade com o CDU, correções de estado, acessibilidade, evidências e documentação. | Mário_DEV |
| 12/08/2026 | 1.2 | Cronômetro opcional, três níveis da CPU, controles de acessibilidade, interface renovada e 40 testes automáticos. | Mário_DEV |

## Documentação

- [Caso de Uso — Jogar Jogo da Velha v1.2](./docs/cdu_JogarJogodavelha.md)
- [Evidências e roteiro de testes](./docs/EVIDENCIAS_TESTES.md)
- [Relatório de prompts e interação com IA](./RELATORIO_PROMPTS.md)

---

<div align="center">

Projeto acadêmico desenvolvido para a **Universidade de Fortaleza — UNIFOR**.

Especificação inicial: **Equipe LAPIS** · Evolução v1.1–v1.2: **Mário_DEV** ([@mariomont30](https://github.com/mariomont30))

</div>
