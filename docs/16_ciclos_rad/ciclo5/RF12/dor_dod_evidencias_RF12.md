# Evidências de DoR e DoD - Ciclo RAD 5 (RF12)

Este documento apresenta a verificação e as evidências de conformidade do **RF12 (Atualizar saldo)** com as diretrizes de qualidade estabelecidas na [Definição de Preparado (DoR) e Definição de Pronto (DoD)](../../../14_dor_dod/dor_dod.md).

---

## 1. Verificação do Definition of Ready (DoR)

Antes de autorizar o início do desenvolvimento do Ciclo 5, o **RF12** foi auditado para garantir que possuía o refinamento necessário pré-iteração:

| **Critério de DoR** | **Situação** | **Evidência / Link de Rastreabilidade** |
| :--- | :---: | :--- |
| O Requisito possui informação necessária para ser trabalhado? | **Concluído** | Regras de incremento/decremento de saldo e reflexo nos gráficos foram definidas. |
| O Requisito está representado por uma história de usuário? | **Concluído** | Mapeado explicitamente na [US12 no Backlog do Produto](../../../15_backlog/backlog.md#us12). |
| O Requisito está coberto por critérios de aceite? | **Concluído** | Critérios estruturados em [Critérios de Aceitação](../../../15_backlog/criterios_aceitacao.md#ca-us12-01). |
| O Requisito está mapeado para um protótipo? | **Concluído** | Indicadores de saldo por item modelados na seção de Design do [Fases RAD](./fases_rad_RF12.md#design-do-usuario). |
| O protótipo foi validado pelo cliente? | **Concluído** | Atualização de saldo validada junto à ONG Ação Entre Amigos BSB. |
| O item está coerente com a prioridade definida? | **Concluído** | Classificado como Must Have na [Priorização do Backlog](../../../15_backlog/priorizacao.md). |
| O Requisito cabe em uma Iteração? | **Concluído** | Escopo de atualização de saldo executado no período de 08/06 a 15/06. |

---

## 2. Verificação do Definition of Done (DoD)

Após o fechamento da fase de construção, as entregas funcionais foram submetidas ao checklist de integridade:

| **Pergunta Fundamental do DoD** | **Status** | **Evidência de Implementação** |
| :--- | :---: | :--- |
| **Entrega um incremento do produto?** | **Sim** | Saldo por item e recálculo dos gráficos implementados na campanha ativa. |
| **A entrega está coerente com o protótipo validado?** | **Sim** | Indicadores "X / Y arrecadado" e gráficos refletem o design aprovado. |
| **Contempla os critérios de aceite estabelecidos?** | **Sim** | Validados no arquivo [criterios_evidencias_RF12.md](./criterios_evidencias_RF12.md). |
| **Todos os testes unitários e de integração foram aprovados?** | **Sim** | Testes de recálculo de saldo e progresso executados com sucesso. |
| **A entrega foi revisada e validada pela equipe?** | **Sim** | Homologada em ambiente local pelos responsáveis do ciclo. |
| **A documentação técnica foi revisada e atualizada?** | **Sim** | Artefatos do Ciclo RAD 5 consolidados no repositório. |

---

## Histórico de Versão

| Versão | Data | Descrição | Autor(es) | Revisor(es) |
| :---: | :---: | :--- | :---: | :---: |
| 1.0 | 15/06/2026 | Consolidação das evidências de DoR/DoD do RF12 no Ciclo RAD 5 | [Kaio Amoury](https://github.com/KaioAmouryUnB) | Equipe |
