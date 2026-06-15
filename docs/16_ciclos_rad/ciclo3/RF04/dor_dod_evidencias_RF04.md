# Evidências de DoR e DoD - Ciclo RAD 3 (RF04)

Este documento apresenta a verificação e as evidências de conformidade do **RF04 (Editar perfil)** com as diretrizes de qualidade estabelecidas na [Definição de Preparado (DoR) e Definição de Pronto (DoD)](../../../14_dor_dod/dor_dod.md).

---

## 1. Verificação do Definition of Ready (DoR)

Antes de autorizar o início do desenvolvimento do RF04, o requisito foi auditado para assegurar o alinhamento com os critérios mínimos de maturidade técnica:

| **Critério de DoR** | **Situação** | **Evidência / Link de Rastreabilidade** |
| :--- | :---: | :--- |
| O Requisito possui informação necessária para ser trabalhado? | **Concluído** | Mapeamento dos campos editáveis (Nome, E-mail, Senhas) validado em conjunto com a organização. |
| O Requisito está representado por uma história de usuário? | **Concluído** | Mapeado explicitamente na [US04 no Backlog do Produto](../../../15_backlog/backlog.md#us04). |
| O Requisito está coberto por critérios de aceite? | **Concluído** | Critérios estruturados e documentados na página de [Critérios de Aceitação](../../../15_backlog/criterios_aceitacao.md#ca-us04-01). |
| O Requisito está mapeado para um protótipo? | **Concluído** | Disposição dos inputs e botões de ação ("Salvar" e "Cancelar") modelados previamente. |
| O protótipo foi validado pelo cliente? | **Concluído** | Fluxo de edição rápida em modal validado junto à coordenação da ONG Ação Entre Amigos BSB. |
| O item a ser trabalhado está coerente com a prioridade definida no MoSCoW e na Matriz Valor x Negócio? | **Concluído** | Classificado como [CP6](../../../13_requisitos/requisitos.md#rf04), possuindo alta relevância para a autonomia cadastral do voluntário. |
| O Requisito cabe em uma Iteração? | **Concluído** | O escopo de manipulação de formulário e controle de estados frontend foi executado de forma enxuta entre 09/06 a 15/06. |

---

## 2. Verificação do Definition of Done (DoD)

Após o fechamento da fase de construção, as entregas funcionais do RF04 foram submetidas ao checklist de integridade técnica:

| **Pergunta Fundamental do DoD** | **Status** | **Evidência de Implementação** |
| :--- | :---: | :--- |
| **Entrega um incremento do produto?** | **Sim** | Componente do formulário de edição implementado com controle de estado ativo nos inputs. |
| **A entrega está coerente com o protótipo validado pelo cliente?** | **Sim** | O layout reflete fielmente o posicionamento centralizado do modal e as caixas de inserção de texto. |
| **Contempla os critérios de aceite estabelecidos?** | **Sim** | Validados e revisados sem impedimentos pendentes no arquivo de checagem local [criterios_evidencias_RF04.md](./criterios_evidencias_RF04.md). |
| **Todos os testes unitários e de integração relacionados à funcionalidade foram implementados e aprovados?** | **Sim** | Testes de integridade (regex de senha, checagem de igualdade de senhas e bloqueio de envio em branco) aprovados. |
| **A entrega foi revisada por toda a equipe na reunião de revisão da Iteração? recebeu validação?** | **Sim** | Homologada em ambiente local e revisada pelo grupo para autorizar o merge unificado. |
| **A documentação técnica (Backlog) foi revisada e atualizada conforme as mudanças de funcionalidade?** | **Sim** | Histórico de artefatos consolidado e controle de versão sincronizado no repositório. |

---

## Histórico de Versão

| Versão | Data | Descrição | Autor(es) | Revisor(es) |
| :---: | :---: | :--- | :---: | :---: |
| 1.0 | 15/06/2026 | Consolidação e mapeamento das evidências de DoR/DoD do RF04 | [Edson Pereira](https://github.com/edso-n), <br>[Gustavo Gomes](https://github.com/GUGOFO), <br>[Leonardo de Aquino](https://github.com/surpesaiajin) | Equipe |