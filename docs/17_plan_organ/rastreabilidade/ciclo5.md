# Rastreabilidade e Evidências - Ciclo RAD 5

O **Ciclo RAD 5** implementou a visualização gráfica de metas em tempo real (gráficos de progresso) e a esteira operacional de Registro e Confirmação de Doações.

---

## 1. Mapeamento de Rastreabilidade

O desdobramento estratégico deste ciclo segue a cadeia de rastreabilidade de requisitos abaixo:

| Dimensão | Detalhamento |
| :--- | :--- |
| **Problema** | Descontrole logístico no recebimento de suprimentos por falta de acompanhamento dinâmico das metas físicas e financeiras de arrecadação das campanhas. |
| **Objetivos Específicos** | [OE1](../../02_solucao/produto.md#oe1) - Minimizar o esforço manual de controle.<br>[OE2](../../02_solucao/produto.md#oe2) - Melhorar a prestação de contas.<br>[OE3](../../02_solucao/produto.md#oe3) - Mais visibilidade de metas. |
| **Características do Produto** | [CP2](../../02_solucao/produto.md#cp2) - Vitrine de Necessidades<br>[CP3](../../02_solucao/produto.md#cp3) - Registro de Intenção de Doação<br>[CP4](../../02_solucao/produto.md#cp4) - Controle de Recebimento e Estoque |
| **Requisitos Funcionais** | [RF10](../../13_requisitos/requisitos.md#rf10) - Exibir progresso da meta<br>[RF11](../../13_requisitos/requisitos.md#rf11) - Registrar doação<br>[RF12](../../13_requisitos/requisitos.md#rf12) - Atualizar saldo<br>[RF13](../../13_requisitos/requisitos.md#rf13) - Confirmar recebimento de doação |
| **Histórias de Usuário** | [US10](../MVP/us10.md), [US11](../MVP/us11.md), [US12](../MVP/us12.md), [US13](../MVP/us13.md) |

---

## 2. Detalhamento das Evidências

As atividades de Engenharia de Software e Engenharia de Requisitos executadas neste ciclo produziram as seguintes evidências:

### A. Evidência de Design (Prototipagem)
Criação dos dashboards de progresso físico-financeiro integrados à página interna de cada campanha:

*   **Componentes Desenhados:** Gráfico circular para progresso percentual total, gráfico de pizza para detalhamento proporcional por item solicitado e formulário modal de promessa de doação.
*   *Mapeamento visual no Figma:* [Protótipos de Alta Fidelidade do Ciclo 5](../../16_ciclos_rad/ciclo5/RF10/fases_rad_RF10.md#design-do-usuario)

### B. Evidência de Construção (Código Fonte)
Lógica reativa conectando a biblioteca de gráficos às intenções cadastradas, incluindo as travas de desativação (RN-03) e atualização dinâmica (RNF06):

*   **Arquivos Criados/Modificados:** Componentes de dashboard de metas em `/campanhas/[id]` e backend de atualização de saldo.
*   *Código fonte do ciclo:* [Repositório da Construção - Ciclo 5](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-PortalEntreAmigos/tree/develop)

### C. Evidência de Validação (Cliente)
*   **Reunião Síncrona:** Homologação final contendo simulações de doações em tempo real com recálculo instantâneo dos gráficos, chancelado pelo cliente Carlos.
*   *Ata de homologação correspondente:* [Ata de Reunião 8 com Cliente](../../12_reunioes/atas/cliente/ata_cliente_08.md) (Seção 3 - Homologação do Ciclo 5).

---

## 3. Critérios de Qualidade (DoR e DoD)

A aceitação e a transição deste ciclo basearam-se no cumprimento das seguintes diretrizes de qualidade:

*   **Critérios de Aceitação:** Validação da reatividade de gráficos ([RNF06](../../13_requisitos/requisitos.md#rnf06)), travamento de eventos encerrados ([RN-03](../../13_requisitos/requisitos.md#regras-de-negocio)) e checagem de limites de valores. Detalhados em cada US (ex: [US10](../MVP/us10.md)).
*   **DoR (Definition of Ready) e DoD (Definition of Done):** Homologados no repositório individual de cada US (ex: [US10](../MVP/us10.md)).

---

## Histórico de Versão

| Versão |    Data    | Descrição  | Autor(es) | Revisor(es)|
| :----: | :--------: | :--------- | :-------: | :---------: |
|  1.0   | 01/07/2026 | População inicial do arquivo com detalhamento de rastreabilidade | [Artur Fernandes Galdino](https://github.com/ArturFGaldino) | Equipe |
