# Evidências de DoR e DoD - Ciclo RAD 3 (RF01)

Este documento apresenta a verificação e as evidências de conformidade do **RF01 (Cadastrar usuário)** com as diretrizes de qualidade estabelecidas na [Definição de Preparado (DoR) e Definição de Pronto (DoD)](../../../14_dor_dod/dor_dod.md).

---

## 1. Verificação do Definition of Ready (DoR)

Antes de autorizar o início do desenvolvimento do Ciclo 3, o **RF01** foi auditado pelo trio para garantir que possuía o refinamento necessário pré-iteração:

| **Critério de DoR** | **Situação** | **Evidência / Link de Rastreabilidade** |
| :--- | :---: | :--- |
| O Requisito possui informação necessária para ser trabalhado? | **Concluído** | Os critérios de complexidade de senha e os campos obrigatórios do formulário foram definidos. |
| O Requisito está representado por uma história de usuário? | **Concluído** | Mapeado explicitamente na [US01 no Backlog do Produto](../../../15_backlog/backlog.md#us01). |
| O Requisito está coberto por critérios de aceite? | **Concluído** | Critérios estruturados e documentados na página de [Critérios de Aceitação](../../../15_backlog/criterios_aceitacao.md#ca-us01-01). |
| O Requisito está mapeado para um protótipo? | **Concluído** | Estrutura de inputs e feedbacks visuais planejada e alinhada com a identidade do projeto. |
| O protótipo foi validado pelo cliente? | **Concluído** | Fluxo de captura de dados de voluntários validado junto à coordenação da ONG Ação Entre Amigos BSB. |
| O item a ser trabalhado está coerente com a prioridade definida no MoSCoW e na Matriz Valor x Negócio? | **Concluído** | Classificado como [CP7](../../../13_requisitos/requisitos.md#rf01), sendo um requisito estrutural básico para a gestão de usuários. |
| O Requisito cabe em uma Iteração? | **Concluído** | O escopo das validações de frontend foi perfeitamente executado dentro do período de 09/06 a 15/06. |

---

## 2. Verificação do Definition of Done (DoD)

Após o fechamento da fase de construção, as entregas funcionais foram submetidas ao checklist de integridade para confirmar o encerramento do bloco:

| **Pergunta Fundamental do DoD** | **Status** | **Evidência de Implementation** |
| :--- | :---: | :--- |
| **Entrega um incremento do produto?** | **Sim** | Componentes da página "Criar Conta" codificados com tratamento de estados e mensagens de erro ativos. |
| **A entrega está coerente com o protótipo validado pelo cliente?** | **Sim** | O layout final reflete estritamente a disposição dos campos de texto, botão de finalização e links de alternância. |
| **Contempla os critérios de aceite estabelecidos?** | **Sim** | Validados e revisados sem impedimentos pendentes no arquivo de checagem local [criterios_evidencias_RF01.md](./criterios_evidencias_RF01.md). |
| **Todos os testes unitários e de integração relacionados à funcionalidade foram implementados e aprovados?** | **Sim** | Testes de validação de string (Regex de senha forte e checagem de igualdade) executados com sucesso. |
| **A entrega foi revisada por toda a equipe na reunião de revisão da Iteração? recebeu validação?** | **Sim** | Homologada em ambiente de teste local e validada pela equipe para autorizar a consolidação na branch principal. |
| **A documentação técnica (Backlog) foi revisada e updated conforme as mudanças de funcionalidade?** | **Sim** | Mapeamento de artefatos de cadastro atualizado e histórico de versão sincronizado no repositório. |

---

## Histórico de Versão

| Versão | Data | Descrição | Autor(es) | Revisor(es) |
| :---: | :---: | :--- | :---: | :---: |
| 1.0 | 15/06/2026 | Consolidação e mapeamento das evidências de DoR/DoD do Ciclo 3 | <br>[Gustavo Gomes](https://github.com/GUGOFO) | Equipe |