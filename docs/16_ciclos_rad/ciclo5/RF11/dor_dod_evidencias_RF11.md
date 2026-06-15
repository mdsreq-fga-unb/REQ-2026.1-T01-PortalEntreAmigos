# Evidências de DoR e DoD - Ciclo RAD 5 (RF11)

Este documento apresenta a verificação e as evidências de conformidade do **RF11 (Registrar doação)** com as diretrizes de qualidade estabelecidas na [Definição de Preparado (DoR) e Definição de Pronto (DoD)](../../../14_dor_dod/dor_dod.md).

---

## 1. Verificação do Definition of Ready (DoR)

Antes de autorizar o início do desenvolvimento do Ciclo 5, o **RF11** foi auditado para garantir que possuía o refinamento necessário pré-iteração:

| **Critério de DoR** | **Situação** | **Evidência / Link de Rastreabilidade** |
| :--- | :---: | :--- |
| O Requisito possui informação necessária para ser trabalhado? | **Concluído** | Fluxo de seleção de itens, quantidades e confirmação de doação foram especificados. |
| O Requisito está representado por uma história de usuário? | **Concluído** | Mapeado explicitamente na [US11 no Backlog do Produto](../../../15_backlog/backlog.md#us11). |
| O Requisito está coberto por critérios de aceite? | **Concluído** | Critérios estruturados em [Critérios de Aceitação](../../../15_backlog/criterios_aceitacao.md#ca-us11-01). |
| O Requisito está mapeado para um protótipo? | **Concluído** | Interface de seleção e botão de confirmação modelados na seção de Design do [Fases RAD](./fases_rad_RF11.md#design-do-usuario). |
| O protótipo foi validado pelo cliente? | **Concluído** | Fluxo de intenção de doação validado junto à ONG Ação Entre Amigos BSB. |
| O item está coerente com a prioridade definida? | **Concluído** | Classificado como Must Have na [Priorização do Backlog](../../../15_backlog/priorizacao.md). |
| O Requisito cabe em uma Iteração? | **Concluído** | Escopo de registro de doação executado no período de 08/06 a 15/06. |

---

## 2. Verificação do Definition of Done (DoD)

Após o fechamento da fase de construção, as entregas funcionais foram submetidas ao checklist de integridade:

| **Pergunta Fundamental do DoD** | **Status** | **Evidência de Implementação** |
| :--- | :---: | :--- |
| **Entrega um incremento do produto?** | **Sim** | Seleção de itens, controles de quantidade e botão de confirmação implementados. |
| **A entrega está coerente com o protótipo validado?** | **Sim** | Fluxo de doação reflete o design aprovado na campanha ativa. |
| **Contempla os critérios de aceite estabelecidos?** | **Sim** | Validados no arquivo [criterios_evidencias_RF11.md](./criterios_evidencias_RF11.md). |
| **Todos os testes unitários e de integração foram aprovados?** | **Sim** | Testes de interação com seletores de quantidade executados com sucesso. |
| **A entrega foi revisada e validada pela equipe?** | **Sim** | Homologada em ambiente local pelos responsáveis do ciclo. |
| **A documentação técnica foi revisada e atualizada?** | **Sim** | Artefatos do Ciclo RAD 5 consolidados no repositório. |

---

## Histórico de Versão

| Versão | Data | Descrição | Autor(es) | Revisor(es) |
| :---: | :---: | :--- | :---: | :---: |
| 1.0 | 15/06/2026 | Consolidação das evidências de DoR/DoD do RF11 no Ciclo RAD 5 | [Kaio Amoury](https://github.com/KaioAmouryUnB), [Gustavo Gomes Fornaciari](https://github.com/GUGOFO) | Equipe |
