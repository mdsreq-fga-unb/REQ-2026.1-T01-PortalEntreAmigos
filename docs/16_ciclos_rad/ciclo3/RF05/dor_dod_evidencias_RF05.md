# Evidências de DoR e DoD - Ciclo RAD 3 (RF05)

Este documento apresenta a verificação e as evidências de conformidade do **RF05 (Excluir conta)** com as diretrizes de qualidade estabelecidas na [Definição de Preparado (DoR) e Definição de Pronto (DoD)](../../../14_dor_dod/dor_dod.md).

---

## 1. Verificação do Definition of Ready (DoR)

Antes de autorizar o início do desenvolvimento do RF05, o requisito foi auditado pelo trio para assegurar o cumprimento dos critérios mínimos de maturidade técnica:

| **Critério de DoR** | **Situação** | **Evidência / Link de Rastreabilidade** |
| :--- | :---: | :--- |
| O Requisito possui informação necessária para ser trabalhado? | **Concluído** | Definição das regras de negócio de dupla confirmação e anonimização em conformidade com a LGPD alinhadas com o cliente. |
| O Requisito está representado por uma história de usuário? | **Concluído** | Mapeado explicitamente na [US05 no Backlog do Produto](../../../15_backlog/backlog.md#us05). |
| O Requisito está coberto por critérios de aceite? | **Concluído** | Critérios estruturados e documentados na página de [Critérios de Aceitação](../../../15_backlog/criterios_aceitacao.md#ca-us05-01). |
| O Requisito está mapeado para um protótipo? | **Concluído** | Disposição do modal de aviso destrutivo e campo de entrada de senha modelados previamente. |
| O protótipo foi validado pelo cliente? | **Concluído** | Fluxo de segurança e deleção homologado junto à coordenação da ONG Ação Entre Amigos BSB. |
| O item a ser trabalhado está coerente com a prioridade definida no MoSCoW e na Matriz Valor x Negócio? | **Concluído** | Classificado como [CP7](../../../13_requisitos/requisitos.md#rf05), sendo uma funcionalidade mandatória de privacidade e governança de dados. |
| O Requisito cabe em uma Iteração? | **Concluído** | O escopo de modais de alerta e controle de fluxo local foi executado perfeitamente dentro do período de 09/06 a 15/06. |

---

## 2. Verificação do Definition of Done (DoD)

Após o fechamento da fase de construção, as entregas funcionais do RF05 foram submetidas ao checklist de integridade técnica da equipe:

| **Pergunta Fundamental do DoD** | **Status** | **Evidência de Implementação** |
| :--- | :---: | :--- |
| **Entrega um incremento do produto?** | **Sim** | Componente de modal para deleção de conta codificado com captura de input e controle de ações ativo. |
| **A entrega está coerente com o protótipo validado pelo cliente?** | **Sim** | O layout final reflete fielmente o modal centralizado, texto de alerta em destaque e os botões de controle. |
| **Contempla os critérios de aceite estabelecidos?** | **Sim** | Validados e revisados sem impedimentos pendentes no arquivo de checagem local [criterios_evidencias_RF05.md](./criterios_evidencias_RF05.md). |
| **Todos os testes unitários e de integração relacionados à funcionalidade foram implementados e aprovados?** | **Sim** | Testes de fluxo e checagem de preenchimento obrigatório do campo de senha executados com sucesso. |
| **A entrega foi revisada por toda a equipe na reunião de revisão da Iteração? recebeu validação?** | **Sim** | Homologada em ambiente de teste local e validada coletivamente pelo grupo para autorizar o merge. |
| **A documentação técnica (Backlog) foi revisada e atualizada conforme as mudanças de funcionalidade?** | **Sim** | Histórico de artefatos consolidado e controle de versão sincronizado no repositório. |

---

## Histórico de Versão

| Versão | Data | Descrição | Autor(es) | Revisor(es) |
| :---: | :---: | :--- | :---: | :---: |
| 1.0 | 15/06/2026 | Consolidação e mapeamento das evidências de DoR/DoD do RF05 | <br>[Gustavo Gomes](https://github.com/GUGOFO) | Equipe |