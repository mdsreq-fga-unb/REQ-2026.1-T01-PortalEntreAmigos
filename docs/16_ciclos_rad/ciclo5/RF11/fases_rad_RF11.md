# Ciclo RAD 5 - RF11

**Período:** 08/06 a 15/06  
**Responsáveis:** [Artur Fernandes Galdino](https://github.com/ArturFGaldino), [Guilherme Oliveira](https://github.com/GuilhermeOliveira1327) e [Kaio Amoury](https://github.com/KaioAmouryUnB)
**Requisitos Alocados:** [RF11 - Registrar doação](../../../13_requisitos/requisitos.md#rf11)

---

## Planejamento dos Requisitos

Neste quinto ciclo de desenvolvimento utilizando a metodologia RAD (Rapid Application Development), a equipe estruturou o fluxo de registro de intenção de doação na campanha ativa, cobrindo o **RF11** (vinculado à **US11** do Backlog). O principal objetivo foi permitir que voluntários informem antecipadamente quais itens e quantidades pretendem entregar:

### 1. Seleção de Itens para Doação
Interface intuitiva para escolha dos suprimentos desejados:

* **Lista de Itens da Campanha:** Exibição dos produtos solicitados com meta e quantidade já arrecadada (ex.: arroz, feijão, cobertores).
* **Controles de Quantidade:** Botões de incremento e decremento (+/−) para definir a quantidade de cada item.

### 2. Confirmação da Intenção de Doação
Ação final que consolida a promessa de doação do voluntário:

* **Botão de Envio:** Ação "Doar Itens Selecionados" com contador dinâmico do total de itens escolhidos.
* **Feedback ao Usuário:** Confirmação visual de que a intenção foi registrada ([RNF07](../../../13_requisitos/requisitos.md#rnf07)).

---

## Design do Usuário

O processo de design priorizou simplicidade e clareza, garantindo que o voluntário compreenda rapidamente como selecionar e confirmar sua doação.

Abaixo estão os protótipos elaborados para este ciclo:

### Página da Campanha Ativa — Registro de Doação

#### Versão Desktop
![Protótipo do Registro de Doação – Computador](../../../00_assets/imagens/prototipagem/ciclo5/computador.png){ width="60%" style="display: block; margin: 0 auto;" }

#### Versão Mobile
![Protótipo do Registro de Doação – Celular](../../../00_assets/imagens/prototipagem/ciclo5/celular.png){ width="200" style="display: block; margin: 0 auto;" }

---

## Construção

Nesta etapa, a equipe implementou a lógica de seleção de itens, controle de quantidades e submissão da intenção de doação na página da campanha ativa.

### Código Fonte
Os componentes de seleção, estados de formulário e integração com a campanha encontram-se mapeados no repositório oficial do projeto:

**Link para o repositório/branch de desenvolvimento:** [Código Fonte da Construção - Ciclo 5](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-PortalEntreAmigos/tree/develop)

#### 1. Fluxo de Registro de Doação Implementado

##### Versão Desktop
![Site Real - Seleção de Itens e Confirmação – Computador](../../../00_assets/imagens/pagina/ciclo5/RF11/computador_selecao_itens.png){ width="100%" style="display: block; margin: 0 auto;" }

##### Versão Mobile
![Site Real - Seleção de Itens e Confirmação – Celular](../../../00_assets/imagens/pagina/ciclo5/RF11/celular_selecao_itens.png){ width="200" style="display: block; margin: 0 auto;" }

---

## Transição

Esta fase compreendeu testes de usabilidade do fluxo de seleção, validação do contador dinâmico de itens e verificação da persistência dos dados registrados.

Caso queira analisar detalhadamente o comportamento estrutural do código implementado, acesse o link a seguir:

**Link para análise técnica:** [Repositório de Transição - Ciclo 5](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-PortalEntreAmigos/tree/develop)

---

## Histórico de Versão

| Versão | Data | Descrição | Autor(es) | Revisor(es) |
| :---: | :---: | :--- | :---: | :---: |
| 1.0 | 15/06/2026 | Documentação do planejamento, design e construção do RF11 no Ciclo RAD 5 | [Kaio Amoury](https://github.com/KaioAmouryUnB) | Equipe |
