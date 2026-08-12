<div align="center">

# 🎮 Jogo da Velha Web — UNIFOR

Uma implementação completa, responsiva e sem dependências externas, construída a partir de uma especificação formal de caso de uso.

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=111)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[![CDU](https://img.shields.io/badge/CDU-v1.1-003366)](./docs/cdu_JogarJogodavelha.md)
[![Status](https://img.shields.io/badge/status-pronto%20para%20avaliação-16a34a)](./docs/EVIDENCIAS_TESTES.md)

[**Jogar agora**](https://samirmaia91.github.io/jogo-da-velha-requisitos/) · [**Ler o CDU**](./docs/cdu_JogarJogodavelha.md) · [**Ver evidências**](./docs/EVIDENCIAS_TESTES.md)

</div>

---

## Sobre o projeto

O projeto materializa o caso de uso **Jogar Jogo da Velha** em uma aplicação web de arquivo único. Ele oferece partidas locais ou contra o computador, formato de partida única ou Melhor de 3, placar, transições de rodada, linha de vitória, confetes e áudio sintetizado no navegador.

Todo o funcionamento está contido em [`src/index.html`](./src/index.html): basta abrir o arquivo em um navegador moderno. Não há back-end, instalação de pacotes, arquivos de áudio ou bibliotecas JavaScript externas.

> A publicação automática está preparada para o GitHub Pages. Depois que esta alteração for incorporada à branch `main`, o responsável pelo repositório precisa selecionar **GitHub Actions** em **Settings → Pages → Source** apenas na primeira configuração.

## Funcionalidades

| Recurso | Comportamento |
| --- | --- |
| 👥 Dois jogadores | Alternância local entre os símbolos X e O. |
| 🤖 Contra o computador | A CPU joga como O após uma pausa de 400 ms e bloqueia cliques durante a escolha. |
| 🏁 Partida única | A rodada termina por vitória ou empate e aguarda reinício manual. |
| 🏆 Melhor de 3 | Vence quem alcançar duas vitórias; empates repetem a rodada decisiva atual. |
| 📊 Placar e rodadas | Pontuação acumulada e indicador de rodada sempre visíveis. |
| ✨ Celebração | Linha contínua sobre a combinação vencedora e animação de confetes. |
| 🔊 Áudio nativo | Sons de X, O, vitória e empate gerados exclusivamente com Web Audio API. |
| ♿ Interface acessível | Botões rotulados, status anunciado e foco visível para navegação por teclado. |

## Conformidade com o CDU

| Requisito | Entrega | Situação |
| --- | --- | :---: |
| RF-01 | Seleção entre PVP e CPU | ✅ |
| RF-02 | Partida única e Melhor de 3 | ✅ |
| RF-03 | Marcação sem sobrescrever células | ✅ |
| RF-04 | Áudio sintetizado, inclusive som descendente de empate | ✅ |
| RF-05 | Detecção das 8 combinações de vitória e de empate | ✅ |
| RF-06 | Linha de vitória e confetes | ✅ |
| RF-07 | Placar e transição segura entre rodadas | ✅ |
| RF-08 | Reinício completo e alteração de parâmetros | ✅ |

A rastreabilidade detalhada está no [CDU v1.1](./docs/cdu_JogarJogodavelha.md), e os procedimentos reproduzíveis de validação estão em [Evidências e testes](./docs/EVIDENCIAS_TESTES.md).

## Regras essenciais

- X sempre inicia uma partida ou rodada.
- Uma célula ocupada não aceita uma segunda jogada.
- Ao terminar uma rodada, o tabuleiro permanece bloqueado durante a mensagem ou transição.
- No MD3, uma vitória avança o contador de rodada e preserva o placar.
- No MD3, um empate limpa o tabuleiro após dois segundos e repete o mesmo número de rodada.
- A série acaba assim que X ou O/CPU chega a duas vitórias.
- Reiniciar ou alterar modo/formato cancela jogadas e transições pendentes e restaura o estado inicial.

## Como executar

### Opção 1 — GitHub Pages

Acesse [samirmaia91.github.io/jogo-da-velha-requisitos](https://samirmaia91.github.io/jogo-da-velha-requisitos/).

### Opção 2 — Localmente

1. Clone o repositório:

   ```bash
   git clone https://github.com/SamirMaia91/jogo-da-velha-requisitos.git
   ```

2. Abra [`src/index.html`](./src/index.html) em um navegador compatível com JavaScript e Web Audio API.

Não é necessário executar servidor ou instalar dependências.

## Estrutura do repositório

```text
.
├── .github/workflows/pages.yml       # Publicação automática no GitHub Pages
├── docs/
│   ├── cdu_JogarJogodavelha.md       # Especificação e rastreabilidade
│   └── EVIDENCIAS_TESTES.md           # Critérios de aceite e roteiro de testes
├── src/index.html                     # Aplicação completa: HTML, CSS e JavaScript
├── README.md                          # Visão geral e instruções do projeto
└── RELATORIO_PROMPTS.md               # Registro acadêmico do processo de desenvolvimento
```

## Identidade visual e tecnologia

A interface adota a paleta definida no CDU:

| Papel | Cor |
| --- | --- |
| Azul institucional | `#003366` |
| Azul de destaque | `#0056b3` |
| Laranja | `#d97706` |
| Fundo | `#f4f6f9` |

Tecnologias utilizadas: HTML5 semântico, CSS3 responsivo, JavaScript e Web Audio API nativos, além de Canvas 2D para os confetes.

## Histórico de versões

| Data | Versão | Principais entregas | Responsável |
| --- | --- | --- | --- |
| 08/08/2026 | 1.0 | Criação do CDU e implementação inicial do jogo. | Equipe LAPIS |
| 12/08/2026 | 1.1 | Conformidade integral com o CDU, correções de consistência, áudio descendente de empate, acessibilidade, evidências, README e GitHub Pages. | Mário_DEV |

## Documentação

- [Caso de Uso — Jogar Jogo da Velha](./docs/cdu_JogarJogodavelha.md)
- [Evidências e roteiro de testes](./docs/EVIDENCIAS_TESTES.md)
- [Relatório de prompts](./RELATORIO_PROMPTS.md)

---

<div align="center">

Projeto acadêmico desenvolvido para a **Universidade de Fortaleza — UNIFOR**.

Especificação inicial: **Equipe LAPIS** · Revisão técnica v1.1: **Mário_DEV** ([@mariomont30](https://github.com/mariomont30))

</div>
