# Evidências de DoR e DoD - Ciclo RAD 2

Este documento apresenta a verificação e as evidências de conformidade do **RF14 (Exibir eventos)** com as diretrizes de qualidade estabelecidas na [Definição de Preparado (DoR) e Definição de Pronto (DoD)](../../14_dor_dod/dor_dod.md).

---

## 1. Verificação do Definition of Ready (DoR)

Antes de autorizar o início do desenvolvimento do Ciclo 2, o **RF14** foi auditado pelo trio para garantir que possuía o refinamento necessário pré-iteração:

| **Critério de DoR** | **Situação** | **Evidência / Link de Rastreabilidade** |
| :--- | :---: | :--- |
| O Requisito possui informação necessária para ser trabalhado? | **Concluído** | As regras para segmentação de campanhas ativas e últimas campanhas fechadas foram alinhadas com a ONG. |
| O Requisito está representado por uma história de usuário? | **Concluído** | Mapeado explicitamente na [US14 no Backlog do Produto](../../15_backlog/backlog.md#us14). |
| O Requisito está coberto por critérios de aceite? | **Concluído** | Critérios estruturados e documentados na página de [Critérios de Aceitação](../../15_backlog/criterios_aceitacao.md#ca-us14-01). |
| O Requisito está mapeado para um protótipo? | **Concluído** | Modelado em alta fidelidade com visões completas de listagem geral e página ativa interna no [Fases RAD](./fases_rad.md#design-do-usuario). |
| O protótipo foi validado pelo cliente? | **Concluído** | Interface com gráficos e barra de progresso apresentada e homologada pela coordenação da ONG Ação Entre Amigos BSB. |
| O item a ser trabalhado está coerente com a prioridade definida no MoSCoW e na Matriz Valor x Negócio? | **Concluído** | Classificado como [CP2](../../13_requisitos/requisitos.md#rf14), possuindo alto valor de engajamento público imediato. |
| O Requisito cabe em uma Iteração? | **Concluído** | O escopo do frontend estático foi planejado e perfeitamente executado dentro do período de 26/05 a 01/06. |

---

## 2. Verificação do Definition of Done (DoD)

Após o fechamento da fase de construção, as entregas funcionais foram submetidas ao checklist de integridade para confirmar o encerramento do bloco:

| **Pergunta Fundamental do DoD** | **Status** | **Evidência de Implementação** |
| :--- | :---: | :--- |
| **Entrega um incremento do produto?** | **Sim** | Componentes e telas da página geral de Campanhas e página interna da Campanha Ativa codificados. |
| **A entrega está coerente com o protótipo validado pelo cliente?** | **Sim** | O layout real reflete fielmente as seções de "Ativa", "Encerradas", o gráfico de pizza de doações e o progresso global. |
| **Contempla os critérios de aceite estabelecidos?** | **Sim** | Validados e revisados sem impedimentos pendentes no arquivo de checagem local [criterios_evidencias.md](./criterios_evidencias.md). |
| **Todos os testes unitários e de integração relacionados à funcionalidade foram implementados e aprovados?** | **Sim** | Testes de renderização de componentes e lógica de exibição estática validados na suite de testes do ciclo. |
| **A entrega foi revisada por toda a equipe na reunião de revisão da Iteração? recebeu validação?** | **Sim** | Homologada em ambiente local e revisada coletivamente pela equipe de desenvolvimento para autorizar o merge. |
| **A documentação técnica (Backlog) foi revisada e atualizada conforme as mudanças de funcionalidade?** | **Sim** | Mapeamento de artefatos consolidado e histórico de versão atualizado no repositório. |

---

## Histórico de Versão

| Versão | Data | Descrição | Autor(es) | Revisor(es) |
| :---: | :---: | :--- | :---: | :---: |
| 1.0 | 13/06/2026 | Consolidação e mapeamento das evidências de DoR/DoD do Ciclo 2 | [Edson Pereira](https://github.com/edso-n), <br>[Gustavo Gomes](https://github.com/GUGOFO), <br>[Leonardo de Aquino](https://github.com/surpesaiajin) | Equipe |