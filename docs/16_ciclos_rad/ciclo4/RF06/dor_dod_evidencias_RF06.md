# Evidências de DoR e DoD - Ciclo RAD 4 (RF06)

Este documento apresenta a verificação e as evidências de conformidade do **RF06 (Criar eventos)** com as diretrizes de qualidade estabelecidas na [Definição de Preparado (DoR) e Definição de Pronto (DoD)](../../../14_dor_dod/dor_dod.md).

---

## 1. Verificação do Definition of Ready (DoR)

Antes de autorizar o início do desenvolvimento do RF06, o requisito foi auditado pelo trio para garantir o cumprimento dos critérios mínimos de prontidão:

| **Critério de DoR** | **Situação** | **Evidência / Link de Rastreabilidade** |
| :--- | :---: | :--- |
| O Requisito possui informação necessária para ser trabalhado? | **Concluído** | Listagem de campos obrigatórios e níveis de permissão administrativa totalmente acordados com a ONG. |
| O Requisito está representado por uma história de usuário? | **Concluído** | Mapeado explicitamente na [US06 no Backlog do Produto](../../../15_backlog/backlog.md#us06). |
| O Requisito está coberto por critérios de aceite? | **Concluído** | Critérios estruturados e documentados na página de [Critérios de Aceitação](../../../15_backlog/criterios_aceitacao.md#ca-us06-01). |
| O Requisito está mapeado para um protótipo? | **Concluído** | Modelagem visual do formulário de inserção e mapeamento de inputs concluída. |
| O protótipo foi validado pelo cliente? | **Concluído** | Interface do painel de cadastro homologada junto à coordenação da ONG Ação Entre Amigos BSB. |
| O item a ser trabalhado está coerente com a prioridade definida no MoSCoW e na Matriz Valor x Negócio? | **Concluído** | Classificado como [CP1](../../../13_requisitos/requisitos.md#rf06), sendo o requisito gerador do fluxo de gestão de eventos. |
| O Requisito cabe em uma Iteração? | **Concluído** | O escopo de componentes de entrada de dados e validações locais foi executado no período de 16/06 a 22/06. |

---

## 2. Verificação do Definition of Done (DoD)

Após o fechamento da fase de construção, as entregas funcionais do RF06 foram submetidas ao checklist de integridade técnica da equipe:

| **Pergunta Fundamental do DoD** | **Status** | **Evidência de Implementação** |
| :--- | :---: | :--- |
| **Entrega um incremento do produto?** | **Sim** | Formulário de criação de novas campanhas codificado com captura de inputs ativa no frontend. |
| **A entrega está coerente com o protótipo validado pelo cliente?** | **Sim** | O layout final reflete fielmente as caixas de texto, seletores de metas e botões de controle projetados. |
| **Contempla os critérios de aceite estabelecidos?** | **Sim** | Validados e revisados sem impedimentos pendentes no arquivo de checagem local [criterios_evidencias_RF06.md](./criterios_evidencias_RF06.md). |
| **Todos os testes unitários e de integração relacionados à funcionalidade foram implementados e aprovados?** | **Sim** | Testes de obrigatoriedade de campos e barramento de segurança frontend aprovados na suíte local. |
| **A entrega foi revisada por toda a equipe na reunião de revisão da Iteração? recebeu validação?** | **Sim** | Homologada em ambiente de testes local e validada pela equipe para autorizar o merge unificado. |
| **A documentação técnica (Backlog) foi revisada e atualizada conforme as mudanças de funcionalidade?** | **Sim** | Mapeamento de artefatos administrativos consolidado e controle de versão sincronizado no repositório. |

---

## Histórico de Versão

| Versão | Data | Descrição | Autor(es) | Revisor(es) |
| :---: | :---: | :--- | :---: | :---: |
| 1.0 | 22/06/2026 | Consolidação e mapeamento das evidências de DoR/DoD do RF06 | [Edson Pereira](https://github.com/edso-n), <br>[Gustavo Gomes](https://github.com/GUGOFO), <br>[Leonardo de Aquino](https://github.com/surpesaiajin) | Equipe |