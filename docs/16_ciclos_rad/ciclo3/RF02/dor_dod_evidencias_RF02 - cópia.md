# Evidências de DoR e DoD - Ciclo RAD 3 (RF02)

Este documento apresenta a verificação e as evaporadas evidências de conformidade do **RF02 (Login de usuário)** com as diretrizes de qualidade estabelecidas na [Definição de Preparado (DoR) e Definição de Pronto (DoD)](../../../14_dor_dod/dor_dod.md).

---

## 1. Verificação do Definition of Ready (DoR)

Antes de autorizar o início do desenvolvimento do RF02, o requisito foi auditado pelo trio para garantir que possuía o refinamento necessário pré-iteração:

| **Critério de DoR** | **Situação** | **Evidência / Link de Rastreabilidade** |
| :--- | :---: | :--- |
| O Requisito possui informação necessária para ser trabalhado? | **Concluído** | As regras de validação de formato e o escopo de mensagens de erro genéricas foram alinhados. |
| O Requisito está representado por uma história de usuário? | **Concluído** | Mapeado explicitamente na [US02 no Backlog do Produto](../../../15_backlog/backlog.md#us02). |
| O Requisito está coberto por critérios de aceite? | **Concluído** | Critérios estruturados e documentados na página de [Critérios de Aceitação](../../../15_backlog/criterios_aceitacao.md#ca-us02-01). |
| O Requisito está mapeado para um protótipo? | **Concluído** | Estrutura de caixas de login e botões de ação mapeada na interface global. |
| O protótipo foi validado pelo cliente? | **Concluído** | Fluxo de autenticação de voluntários e moderadores validado com a coordenação da ONG. |
| O item a ser trabalhado está coerente com a prioridade definida no MoSCoW e na Matriz Valor x Negócio? | **Concluído** | Classificado como [CP7](../../../13_requisitos/requisitos.md#rf02), sendo um requisito básico essencial para as permissões de acesso. |
| O Requisito cabe em uma Iteração? | **Concluído** | O escopo do frontend estático foi planejado e executado dentro do período de 09/06 a 15/06. |

---

## 2. Verificação do Definition of Done (DoD)

Após o fechamento da fase de construção, as entregas funcionais do RF02 foram submetidas ao checklist de integridade para confirmar o encerramento do bloco:

| **Pergunta Fundamental do DoD** | **Status** | **Evidência de Implementação** |
| :--- | :---: | :--- |
| **Entrega um incremento do produto?** | **Sim** | Componentes da página "Acessar Conta" codificados com controle de login e feedbacks visuais funcionais. |
| **A entrega está coerente com o protótipo validado pelo cliente?** | **Sim** | O layout real reflete com fidelidade a disposição dos inputs de login, botões e redirecionamentos. |
| **Contempla os critérios de aceite estabelecidos?** | **Sim** | Validados e revisados sem impedimentos pendentes no arquivo de checagem local [criterios_evidencias_RF02.md](./criterios_evidencias_RF02.md). |
| **Todos os testes unitários e de integração relacionados à funcionalidade foram implementados e aprovados?** | **Sim** | Testes de controle de formulário e checagem de obrigatoriedade de campos aprovados. |
| **A entrega foi revisada por toda a equipe na reunião de revisão da Iteração? recebeu validação?** | **Sim** | Homologada em ambiente local e revisada pelo grupo para autorizar a unificação das branches. |
| **A documentação técnica (Backlog) foi revisada e atualizada conforme as mudanças de funcionalidade?** | **Sim** | Mapeamento de artefatos de login atualizado e histórico de versão sincronizado no repositório. |

---

## Histórico de Versão

| Versão | Data | Descrição | Autor(es) | Revisor(es) |
| :---: | :---: | :--- | :---: | :---: |
| 1.0 | 15/06/2026 | Consolidação e mapeamento das evidências de DoR/DoD do RF02 | [Edson Pereira](https://github.com/edso-n), <br>[Gustavo Gomes](https://github.com/GUGOFO), <br>[Leonardo de Aquino](https://github.com/surpesaiajin) | Equipe |