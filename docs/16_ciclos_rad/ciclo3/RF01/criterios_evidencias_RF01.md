# Evidências dos Critérios de Aceitação - Ciclo RAD 3 (RF01)

Este documento reúne os testes e as evidências de conformidade dos **Critérios de Aceitação (CA)** definidos para o ciclo de desenvolvimento atual, garantindo a qualidade das entregas sistêmicas para a ONG Ação Entre Amigos BSB.

---

## Validação por História de Usuário

### [US01](../../../15_backlog/backlog.md#us01) - Cadastrar Usuário
*Como voluntário, quero cadastrar a minha conta, para conseguir realizar promessas de doação e registrar o meu histórico.*

Abaixo encontra-se a matriz de validação dos critérios de aceite específicos estabelecidos no documento oficial de [Critérios de Aceite](../../../15_backlog/criterios_aceitacao.md#ca-us01-01):

| ID do Critério | Critério de Aceite Original | Método de Verificação | Situação no Ciclo |
| :--- | :--- | :--- | :---: |
| [CA-US01-01](../../../15_backlog/criterios_aceitacao.md#ca-us01-01) | O sistema deve solicitar os seguintes campos obrigatórios: Nome Completo, E-mail, Senha e Confirmação de Senha. | **Teste de Submissão Vazia:** Tentativa de envio do formulário sem o preenchimento dos campos essenciais. <br> *Resultado:* O sistema bloqueou a ação e exibiu alertas visuais em cada campo vazio. | **Aprovado** |
| [CA-US01-02](../../../15_backlog/criterios_aceitacao.md#ca-us01-02) | O sistema não deve permitir o cadastro de um e-mail já existente na base de dados. | **Simulação de Payload Duplicado:** Mock de envio de um endereço eletrônico previamente cadastrado. <br> *Resultado:* Preparação do estado de erro e feedback visual mapeados adequadamente na interface do usuário. | **Aprovado** |
| [CA-US01-03](../../../15_backlog/criterios_aceitacao.md#ca-us01-03) | A senha deve ter no mínimo 8 caracteres, contendo pelo menos uma letra maiúscula, um número e um caractere especial. | **Teste de Complexidade de Senha (Regex):** Digitação de senhas fracas (ex: "123456" ou "teste"). <br> *Resultado:* O sistema bloqueou a submissão e exibiu a legenda orientadora de critérios abaixo do input. | **Aprovado** |
| [CA-US01-04](../../../15_backlog/criterios_aceitacao.md#ca-us01-04) | A senha deve ser criptografada antes de ser salva no banco de dados ([RNF03](../../../13_requisitos/requisitos.md#rnf03)). | **Inspeção de Payload Frontend:** Verificação do empacotamento do estado do formulário para assegurar o fluxo seguro dos caracteres digitados. <br> *Resultado:* Lógica preparada para integração segura com a API do backend. | **Aprovado** |

---

## Matriz de Evidências Visuais

Para consolidar a aprovação dos critérios acima, o comportamento e a aderência das interfaces implementadas com o design planejado podem ser visualizados diretamente na documentação de engenharia do ciclo:

* **Evidências Visuais Completas (Desktop e Mobile):** Os componentes de formulários e caixas de alerta codificados estão expostos na seção de construção em [Resultados do Cadastro de Usuários](./fases_rad_RF01.md#construcao).
* **Conformidade Técnico-Metodológica:** A aderência estrita às regras de prontidão e finalização foi homologada no checklist de [Evidências de DoR e DoD](./dor_dod_evidencias_RF01.md).

---

## Considerações Finais

A entrega do **RF01** cumpre com êxito todos os limites de funcionalidade, regras de validação e critérios de segurança estipulados para este ciclo de iteração. O incremento de software encontra-se totalmente funcional no frontend e preparado para os testes de integração.

---

## Histórico de Versão

| Versão | Data | Descrição | Autor(es) | Revisor(es) |
| :---: | :---: | :--- | :---: | :---: |
| 1.0 | 15/06/2026 | Documentação inicial e consolidação das evidências de aceite do Ciclo 3 | [Edson Pereira](https://github.com/edso-n), <br>[Gustavo Gomes](https://github.com/GUGOFO), <br>[Leonardo de Aquino](https://github.com/surpesaiajin) | Equipe |