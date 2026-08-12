# RELATÓRIO DE PROMPTS E INTERAÇÃO COM IA

## Projeto: Jogo da Velha Web - UNIFOR

## 1. Objetivo

Este documento apresenta o registro da utilização de Inteligência Artificial como ferramenta de apoio no desenvolvimento do projeto **Jogo da Velha Web - UNIFOR**.

A IA foi utilizada como recurso auxiliar para compreender os requisitos, organizar as funcionalidades, desenvolver o código da aplicação, realizar verificações e preparar a documentação do projeto.

A definição do escopo e dos requisitos teve como base a especificação fornecida para o projeto.

---

## 2. Ferramentas utilizadas

As ferramentas de Inteligência Artificial utilizadas foram o **ChatGPT** e o **Codex**, da OpenAI.

A interação foi realizada por meio de conversas em linguagem natural, nas quais foram apresentados os requisitos do projeto e solicitadas orientações para o desenvolvimento da aplicação.

---

## 3. Contexto fornecido

Inicialmente, foi informado à IA que o projeto fazia parte de uma atividade da disciplina de **Requisitos e Modelagens de Sistemas** e que seria necessário desenvolver um sistema simples seguindo requisitos previamente definidos.

Em seguida, foi apresentada a especificação completa do caso de uso **"Jogar Jogo da Velha"**, contendo:

* objetivo;
* atores;
* pré-condições;
* fluxo principal;
* fluxos alternativos;
* fluxos de exceção;
* pós-condições;
* requisitos não funcionais;
* interface visual;
* matriz de rastreabilidade;
* dicionário de dados;
* critérios de aceite.

---

## 4. Registro dos Prompts

### Prompt 01 — Apresentação do projeto

**Prompt utilizado:**

> "eae chat tenho um projeto para fazer de requisitos e modelagens de sistemas, projeto simples mas com alguns requisitos. pode me ajudar?"

**Objetivo:**

Apresentar o contexto do projeto e solicitar auxílio durante o desenvolvimento.

**Resultado:**

A IA informou que poderia auxiliar na interpretação dos requisitos, modelagem, implementação e documentação do sistema.

---

### Prompt 02 — Apresentação da especificação

**Ação realizada:**

Foi enviada para a IA a especificação completa do caso de uso **Jogar Jogo da Velha**, incluindo os requisitos funcionais, não funcionais, interface visual, matriz de rastreabilidade, dicionário de dados e critérios de aceite.

**Objetivo:**

Fornecer o contexto necessário para que a IA compreendesse o escopo e as regras da aplicação.

**Resultado:**

A IA analisou a especificação e identificou as principais funcionalidades que deveriam estar presentes no sistema.

---

### Prompt 03 — Solicitação da implementação

**Prompt utilizado:**

> "é so fazer um jogo da velha seguindo todos os requisitos"

**Objetivo:**

Deixar claro que a principal tarefa era implementar uma aplicação funcional do Jogo da Velha seguindo a especificação apresentada.

**Resultado:**

Foram consideradas as seguintes funcionalidades para implementação:

* modo para dois jogadores;
* modo contra o computador;
* partida única;
* Melhor de 3;
* placar;
* contador de rodadas;
* detecção de vitória;
* detecção de empate;
* linha visual de vitória;
* confetes;
* efeitos sonoros;
* botão de reinício.

---

### Prompt 04 — Solicitação do código comentado

**Prompt utilizado:**

> "pode fazer o codigo com comentarios"

**Objetivo:**

Solicitar o desenvolvimento do código completo da aplicação, mantendo comentários para facilitar a compreensão do funcionamento do sistema.

**Resultado:**

Foi desenvolvido o arquivo `index.html` contendo HTML, CSS e JavaScript.

A implementação incluiu:

* interface do jogo;
* tabuleiro 3x3;
* seleção de modo;
* seleção de formato;
* controle de turnos;
* placar;
* controle das rodadas;
* lógica de vitória;
* lógica de empate;
* jogada automática da CPU;
* reinício da partida;
* linha de vitória;
* animação de confetes;
* efeitos sonoros utilizando Web Audio API.

---

### Prompt 05 — Teste da aplicação

Após a implementação, o código foi executado no navegador e testado.

Foi informado à IA:

> "testei o codigo e ta top"

**Objetivo:**

Registrar que a aplicação havia sido executada e estava funcionando conforme esperado durante os testes realizados.

**Resultado:**

Foram sugeridos testes adicionais para verificar:

* funcionamento do modo PVP;
* funcionamento do modo contra a CPU;
* vitória em linhas;
* vitória em colunas;
* vitória em diagonais;
* empate;
* funcionamento do Melhor de 3;
* funcionamento do placar;
* botão de reinício;
* efeitos sonoros;
* linha de vitória;
* confetes;
* bloqueio de células ocupadas.

---

### Prompt 06 — Organização do repositório

**Ação realizada:**

Foi apresentada à IA a estrutura obrigatória definida para a entrega no GitHub:

```text
jogo-da-velha-unifor/
├── docs/
│   └── cdu_JogarJogodavelha.md
├── src/
│   └── index.html
├── README.md
└── RELATORIO_PROMPTS.md
```

**Objetivo:**

Organizar o projeto de acordo com as regras de entrega estabelecidas.

**Resultado:**

A IA orientou sobre a finalidade de cada arquivo e sobre a necessidade de manter `docs` e `src` diretamente na raiz do repositório.

---

### Prompt 07 — Criação do README

**Solicitação:**

Foi solicitado auxílio para definir o conteúdo do arquivo `README.md` do projeto.

**Objetivo:**

Criar uma documentação clara contendo informações sobre o projeto, funcionalidades, tecnologias, estrutura do repositório, requisitos implementados e instruções de execução.

**Resultado:**

Foi elaborado um README contendo:

* descrição do projeto;
* funcionalidades;
* tecnologias utilizadas;
* identidade visual;
* estrutura do repositório;
* instruções para execução;
* requisitos funcionais implementados;
* critérios de aceite;
* informações sobre o GitHub Pages;
* links para a documentação.

---

### Prompt 08 — Auditoria de conformidade e preparação da versão 1.1

**Solicitação:**

Foi solicitada uma análise minuciosa do repositório em comparação com a totalidade do CDU, seguida da correção dos pontos necessários e da preparação da entrega no GitHub.

**Objetivo:**

Garantir consistência entre especificação, implementação, critérios de aceite e documentação, com foco na avaliação acadêmica.

**Resultado:**

Foram realizados:

* correção da extensão do arquivo do CDU;
* revisão da regra de empate e transição de rodadas no MD3;
* fortalecimento do controle de temporizadores da CPU e das rodadas;
* cancelamento seguro dos confetes em reinícios e transições;
* melhoria de acessibilidade da interface;
* revisão do efeito sonoro descendente de empate;
* atualização da matriz de dados e dos critérios de aceite;
* criação de evidências e roteiros reproduzíveis de testes;
* reformulação do README com histórico de versões;
* configuração de publicação pelo GitHub Pages.

---

## 5. Utilização da IA no desenvolvimento

A Inteligência Artificial foi utilizada como ferramenta de apoio durante diferentes etapas do projeto.

As principais contribuições foram:

1. interpretação dos requisitos;
2. organização das funcionalidades;
3. desenvolvimento do código-fonte;
4. inclusão de comentários no código;
5. sugestão de testes;
6. auxílio na documentação;
7. organização do repositório;
8. elaboração do README;
9. elaboração deste relatório de interação;
10. auditoria de conformidade entre CDU, código e critérios de aceite.

A IA foi utilizada como apoio ao desenvolvimento e não como substituta da validação do sistema.

O código desenvolvido foi executado no navegador e testado para verificar se as funcionalidades principais estavam funcionando corretamente.

---

## 6. Relação entre os requisitos e a implementação

A implementação foi realizada considerando os requisitos apresentados na especificação do caso de uso.

| Requisito | Implementação                                   |
| --------- | ----------------------------------------------- |
| RF-01     | Seleção entre 2 Jogadores e Contra o Computador |
| RF-02     | Seleção entre Partida Única e Melhor de 3       |
| RF-03     | Marcação das células do tabuleiro               |
| RF-04     | Efeitos sonoros utilizando Web Audio API        |
| RF-05     | Detecção de vitória e empate                    |
| RF-06     | Linha de vitória e animação de confetes         |
| RF-07     | Placar e controle das rodadas                   |
| RF-08     | Reinício geral da partida                       |

---

## 7. Tecnologias utilizadas

O projeto foi desenvolvido utilizando:

* **HTML5** para a estrutura da página;
* **CSS3** para a interface visual;
* **JavaScript** para a lógica do jogo;
* **Web Audio API** para os efeitos sonoros;
* **Canvas API** para a animação dos confetes.

O sistema foi desenvolvido sem necessidade de back-end e com o código completo da aplicação concentrado no arquivo `src/index.html`.

---

## 8. Validação

Após o desenvolvimento, a aplicação foi executada e testada no navegador.

Foram considerados testes relacionados às seguintes funcionalidades:

* realização de jogadas;
* alternância dos jogadores;
* bloqueio de células ocupadas;
* identificação de vitórias;
* identificação de empates;
* funcionamento da CPU;
* funcionamento do Melhor de 3;
* atualização do placar;
* reinício da partida;
* efeitos visuais;
* efeitos sonoros.

Os testes realizados indicaram que as funcionalidades principais estavam funcionando conforme os requisitos definidos. A versão 1.1 também passou a contar com uma matriz de evidências e um roteiro reproduzível em `docs/EVIDENCIAS_TESTES.md`.

---

## 9. Considerações finais

A utilização da Inteligência Artificial contribuiu para o desenvolvimento do projeto principalmente como ferramenta de apoio técnico e documental.

A interação permitiu transformar a especificação de requisitos em uma aplicação web funcional, mantendo como referência os requisitos funcionais, não funcionais e critérios de aceite definidos para o projeto.

O processo também possibilitou relacionar os conceitos estudados na disciplina de **Requisitos e Modelagens de Sistemas** com a implementação prática de um sistema web.

A validação final foi realizada por meio da execução da aplicação no navegador, verificando o funcionamento das principais funcionalidades antes da preparação da entrega no GitHub.
