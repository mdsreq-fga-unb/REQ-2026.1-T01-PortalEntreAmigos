# Evidências de DoR e DoD - Ciclo RAD 4 (RF07)

Este documento apresenta a verificação e as evidências de conformidade do **RF07 (Editar eventos)** com as diretrizes de qualidade estabelecidas na [Definição de Preparado (DoR) e Definição de Pronto (DoD)](../../../14_dor_dod/dor_dod.md).

---

## 1. Verificação do Definition of Ready (DoR)

Antes de autorizar o início do desenvolvimento do RF07, o requisito foi auditado pelo trio para garantir o cumprimento dos critérios mínimos de maturidade:

| **Critério de DoR** | **Situação** | **Evidência / Link de Rastreabilidade** |
| :--- | :---: | :--- |
| O Requisito possui informação necessária para ser trabalhado? | **Concluído** | Mapeamento das regras de recálculo de metas e campos obrigatórios de eventos validado com o cliente. |
| O Requisito está representado por uma história de usuário? | **Concluído** | Mapeado explicitamente na [US07 no Backlog do Produto](../../../15_backlog/backlog.md#us07). |
| O Requisito está coberto por critérios de aceite? | **Concluído** | Critérios estruturados e documentados na página de [Critérios de Aceitação](../../../15_backlog/criterios_aceitacao.md#ca-us07-01). |
| O Requisito está mapeado para um protótipo? | **Concluído** | Modelagem visual do formulário de atualização de metas e datas de campanhas concluída. |
| O protótipo foi validado pelo cliente? | **Concluído** | Fluxo de gerenciamento administrativo validado junto à coordenação da ONG Ação Entre Amigos BSB. |
| O item a ser trabalhado está coerente com a prioridade definida no MoSCoW e na Matriz Valor x Negócio? | **Concluído** | Classificado como [CP1](../../../13_requisitos/requisitos.md#rf07), sendo essencial para o controle logístico de arrecadação. |
| O Requisito cabe em uma Iteração? | **Concluído** | O escopo do frontend reativo foi planejado e perfeitamente executado dentro do período de 16/06 a 22/06. |

---

## 2. Verificação do Definition of Done (DoD)

Após o fechamento da fase de construção, as entregas funcionais do RF07 foram submetidas ao checklist de integridade técnica da equipe:

| **Pergunta Fundamental do DoD** | **Status** | **Evidência de Implementação** |
| :--- | :---: | :--- |
| **Entrega um incremento do produto?** | **Sim** | Telas e modais funcionais para a edição e atualização de dados de eventos codificados no frontend. |
| **A entrega está coerente com o protótipo validado pelo cliente?** | **Sim** | O layout real reflete com fidelidade a disposição dos inputs de texto, seletores de data e botões de salvamento. |
| **Contempla os critérios de aceite estabelecidos?** | **Sim** | Validados e revisados sem impedimentos pendentes no arquivo de checagem local [criterios_evidencias_RF07.md](./criterios_evidencias_RF07.md). |
| **Todos os testes unitários e de integração relacionados à funcionalidade foram implementados e aprovados?** | **Sim** | Testes de controle de estado e propagação dinâmica do progresso de metas executados com sucesso. |
| **A entrega foi revisada por toda a equipe na reunião de revisão da Iteração? recebeu validação?** | **Sim** | Homologada em ambiente de testes local e validada coletivamente para autorizar o merge unificado. |
| **A documentação técnica (Backlog) foi revisada e atualizada conforme as mudanças de funcionalidade?** | **Sim** | Histórico de artefatos administrativos consolidado e controle de versão sincronizado no repositório. |

---

## Histórico de Versão

| Versão | Data | Descrição | Autor(es) | Revisor(es) |
| :---: | :---: | :--- | :---: | :---: |
| 1.0 | 22/06/2026 | Consolidação e mapeamento das evidências de DoR/DoD do RF07 | [Edson Pereira](https://github.com/edso-n), <br>[Gustavo Gomes](https://github.com/GUGOFO), <br>[Leonardo de Aquino](https://github.com/surpesaiajin) | Equipe |