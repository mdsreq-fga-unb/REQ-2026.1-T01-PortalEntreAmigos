# Evidências de DoR e DoD - Ciclo RAD 3 (RF03)

Este documento apresenta a verificação e as evidências de conformidade do **RF03 (Visualizar perfil)** com as diretrizes de qualidade estabelecidas na [Definição de Preparado (DoR) e Definição de Pronto (DoD)](../../../14_dor_dod/dor_dod.md).

---

## 1. Verificação do Definition of Ready (DoR)

Antes de autorizar o início do desenvolvimento do RF03, o requisito foi auditado pelo trio para garantir o alinhamento com os critérios de prontidão:

| **Critério de DoR** | **Situação** | **Evidência / Link de Rastreabilidade** |
| :--- | :---: | :--- |
| O Requisito possui informação necessária para ser trabalhado? | **Concluído** | As informações mínimas de exibição (Nome e E-mail) foram mapeadas com a organização. |
| O Requisito está representado por uma história de usuário? | **Concluído** | Mapeado explicitamente na [US03 no Backlog do Produto](../../../15_backlog/backlog.md#us03). |
| O Requisito está coberto por critérios de aceite? | **Concluído** | Critérios estruturados e documentados na página de [Critérios de Aceitação](../../../15_backlog/criterios_aceitacao.md#ca-us03-01). |
| O Requisito está mapeado para um protótipo? | **Concluído** | Disposição do modal flutuante e fechamento mapeados adequadamente. |
| O protótipo foi validado pelo cliente? | **Concluído** | Fluxo de visualização rápida validado junto à coordenação da ONG Ação Entre Amigos BSB. |
| O item a ser trabalhado está coerente com a prioridade definida no MoSCoW e na Matriz Valor x Negócio? | **Concluído** | Classificado como [CP6](../../../13_requisitos/requisitos.md#rf03), possuindo alta relevância para a ambientação do voluntário. |
| O Requisito cabe em uma Iteração? | **Concluído** | O escopo de exibição e estilização frontend foi planejado e executado dentro do período de 09/06 a 15/06. |

---

## 2. Verificação do Definition of Done (DoD)

Após o fechamento da fase de construção, as entregas funcionais do RF03 foram submetidas ao checklist de integridade técnica:

| **Pergunta Fundamental do DoD** | **Status** | **Evidência de Implementação** |
| :--- | :---: | :--- |
| **Entrega um incremento do produto?** | **Sim** | Componente do modal de perfil implementado com exibição correta das variáveis locais. |
| **A entrega está coerente com o protótipo validado pelo cliente?** | **Sim** | O layout reflete fielmente o posicionamento do modal centralizado e os rótivos textuais. |
| **Contempla os critérios de aceite estabelecidos?** | **Sim** | Validados e revisados sem impedimentos pendentes no arquivo de checagem local [criterios_evidencias_RF03.md](./criterios_evidencias_RF03.md). |
| **Todos os testes unitários e de integração relacionados à funcionalidade foram implementados e aprovados?** | **Sim** | Testes de gatilho (abrir/fechar) e renderização das caixas textuais validados. |
| **A entrega foi revisada por toda a equipe na reunião de revisão da Iteração? recebeu validação?** | **Sim** | Homologada em ambiente local e revisada pelo grupo para autorizar o merge unificado. |
| **A documentação técnica (Backlog) foi revisada e atualizada conforme as mudanças de funcionalidade?** | **Sim** | Histórico de artefatos consolidado e controle de versão sincronizado no repositório. |

---

## Histórico de Versão

| Versão | Data | Descrição | Autor(es) | Revisor(es) |
| :---: | :---: | :--- | :---: | :---: |
| 1.0 | 15/06/2026 | Consolidação e mapeamento das evidências de DoR/DoD do RF03 | [Edson Pereira](https://github.com/edso-n), <br>[Gustavo Gomes](https://github.com/GUGOFO), <br>[Leonardo de Aquino](https://github.com/surpesaiajin) | Equipe |