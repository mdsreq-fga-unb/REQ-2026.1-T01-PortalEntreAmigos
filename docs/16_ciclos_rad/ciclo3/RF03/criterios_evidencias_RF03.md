# Evidências dos Critérios de Aceitação - Ciclo RAD 3 (RF03)

Este documento reúne os testes e as evidências de conformidade dos **Critérios de Aceitação (CA)** definidos para o ciclo de desenvolvimento atual, garantindo a qualidade das entregas sistêmicas para a ONG Ação Entre Amigos BSB.

---

## Validação por História de Usuário

### [US03](../../../15_backlog/backlog.md#us03) - Visualizar perfil
*Como voluntário, quero visualizar o meu perfil, para que eu possa ver meus dados cadastrados*

Abaixo encontra-se a matriz de validação dos critérios de aceite específicos estabelecidos no documento oficial de [Critérios de Aceite](../../../15_backlog/criterios_aceitacao.md#ca-us03-01):

| ID do Critério | Critério de Aceite Original | Método de Verificação | Situação no Ciclo |
| :--- | :--- | :--- | :---: |
| [CA-US03-01](../../../15_backlog/criterios_aceitacao.md#ca-us03-01) | A página de perfil deve exibir os dados pessoais do usuário | **Inspeção de Elementos de Tela:** Abertura do modal logado para checar a presença dos rótulos de Nome e E-mail. <br> *Resultado:* O modal renderizou com precisão os dados cadastrais do usuário de teste ("teste" / "teste@gmail.com"). | **Aprovado** |
| [CA-US03-02](../../../15_backlog/criterios_aceitacao.md#ca-us03-02) | A visualização deve se adaptar perfeitamente a telas de dispositivos móveis (smartphones e tablets) e desktops ([RNF01](../../../13_requisitos/requisitos.md#rnf01)). | **Inspeção via DevTools (F12):** Emulação de visualização responsiva para checar o comportamento de centralização do modal. <br> *Resultado:* Adaptação perfeita do componente sobreposto tanto no monitor desktop quanto no smartphone. | **Aprovado** |

---

## Matriz de Evidências Visuais

Para consolidar a aprovação dos critérios acima, o comportamento e a aderência das interfaces implementadas com o design planejado podem ser visualizados diretamente na documentação de engenharia do ciclo:

* **Evidências Visuais Completas (Desktop e Mobile):** Os componentes de janelas modais integrados estão expostos na seção de construção em [Resultados do Modal de Perfil](./fases_rad_RF03.md#construcao).
* **Conformidade Técnico-Metodológica:** A aderência às regras de prontidão e finalização foi homologada no checklist de [Evidências de DoR e DoD](./dor_dod_evidencias_RF03.md).

---

## Considerações Finais

A entrega do **RF03** cumpre com êxito os limites de funcionalidade, regras de validação visual e critérios de responsividade estipulados para este ciclo de iteração. 

---

## Histórico de Versão

| Versão | Data | Descrição | Autor(es) | Revisor(es) |
| :---: | :---: | :--- | :---: | :---: |
| 1.0 | 15/06/2026 | Documentação inicial e consolidação das evidências de aceite do RF03 | [Edson Pereira](https://github.com/edso-n), <br>[Gustavo Gomes](https://github.com/GUGOFO), <br>[Leonardo de Aquino](https://github.com/surpesaiajin) | Equipe |