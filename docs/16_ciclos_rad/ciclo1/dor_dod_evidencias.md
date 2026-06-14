# Evidências de DoR e DoD - Ciclo RAD 1

Este documento apresenta a verificação e as evidências de conformidade do **RF16 (Exibir informações institucionais)** com as diretrizes de qualidade estabelecidas na [Definição de Preparado (DoR) e Definição de Pronto (DoD)](../../14_dor_dod/dor_dod.md).

---

## 1. Verificação do Definition of Ready (DoR)

Antes de iniciar o desenvolvimento do Ciclo 1, o **RF16** foi auditado para garantir que possuía o refinamento necessário. A tabela abaixo detalha o cumprimento dos critérios de prontidão:

| **Critério de DoR** | **Situação** | **Evidência / Link de Rastreabilidade** |
| :--- | :---: | :--- |
| O Requisito possui informação necessária para ser trabalhado? | **Concluído** | Dados institucionais, história e diretrizes (Missão, Visão e Valores) foram completamente levantados junto à ONG. |
| O Requisito está representado por uma história de usuário? | **Concluído** | Mapeado na [US16 no Backlog do Produto](../../15_backlog/backlog.md#us16). |
| O Requisito está coberto por critérios de aceite? | **Concluído** | Critérios estruturados e documentados na página de [Critérios de Aceitação](../../15_backlog/criterios_aceitacao.md). |
| O Requisito está mapeado para um protótipo? | **Concluído** | Modelado em alta fidelidade para as visões Desktop e Mobile na seção de Design do [Fases RAD](./fases_rad.md#design-do-usuario). |
| O protótipo foi validado pelo cliente? | **Concluído** | Interface avaliada e aprovada pela coordenação da ONG Ação Entre Amigos BSB antes da codificação. |
| O item está coerente com a prioridade definida? | **Concluído** | Classificado como essencial para a fundação da identidade digital da plataforma na Matriz do Backlog. |
| O Requisito cabe em uma Iteração? | **Concluído** | Escopo estático e focado em frontend perfeitamente compatível com o período de 26/05 a 01/06. |

---

## 2. Verificação do Definition of Done (DoD)

Após o encerramento do bloco de desenvolvimento, o incremento gerado foi confrontado com o checklist de finalização técnica para autorizar sua homologação:

| **Critério de DoD / Pergunta Fundamental** | **Status** | **Evidência de Implementação** |
| :--- | :---: | :--- |
| **Entrega um incremento do produto?** | **Sim** | Telas funcionais da *Home* e *Quem Somos* codificadas e integradas ao ecossistema do projeto. |
| **A entrega está coerente com o protótipo validado?** | **Sim** | Estrutura visual, componentes e disposição dos elementos batem 100% com o design proposto. |
| **Contempla os critérios de aceite estabelecidos?** | **Sim** | Validados e revisados sem inconformidades pendentes (detalhes no arquivo local [criterios_evidencias.md](./criterios_evidencias.md)). |
| **Todos os testes unitários e de integração foram aprovados?** | **Sim** | Cobertura estática e testes de renderização executados com sucesso pela equipe técnica. |
| **A entrega foi revisada e validada pela equipe?** | **Sim** | Homologada em ambiente local pelo trio de responsáveis (Artur, Guilherme e Kaio) e revisada pelo grupo. |
| **A documentação técnica foi revisada e atualizada?** | **Sim** | Esta documentação e o histórico de versão do ciclo foram devidamente consolidados no repositório. |

---

## Histórico de Versão

| Versão | Data | Descrição | Autor(es) | Revisor(es) |
| :---: | :---: | :--- | :---: | :---: |
| 1.0 | 13/06/2026 | Documentação inicial do planejamento, design e construção do Ciclo RAD 2 | <br>[Gustavo Gomes](https://github.com/GUGOFO) | Equipe |