# Evidências dos Critérios de Aceitação - Ciclo RAD 5 (RF11)

Este documento reúne os testes e as evidências de conformidade dos **Critérios de Aceitação (CA)** definidos para o **RF11**, garantindo a qualidade das entregas sistêmicas para a ONG Ação Entre Amigos BSB.

---

## Validação por História de Usuário

### [US11](../../../15_backlog/backlog.md#us11) - Registrar doações
*Como voluntário, quero registar a minha intenção de doação, para informar antecipadamente à ONG o que irei entregar no ponto de recolha.*

| ID do Critério | Critério de Aceite Original | Método de Verificação | Situação no Ciclo |
| :--- | :--- | :--- | :---: |
| [CA-US11-01](../../../15_backlog/criterios_aceitacao.md#ca-us11-01) | O voluntário deve poder selecionar a campanha ativa e o tipo/quantidade de item que deseja doar. | **Teste de Seleção:** Acesso à campanha ativa, seleção de arroz, feijão e cobertor com controles +/−. <br> *Resultado:* Quantidades ajustadas corretamente e contador total exibido no botão "Doar Itens Selecionados (6)". | **Aprovado** |
| [CA-US11-02](../../../15_backlog/criterios_aceitacao.md#ca-us11-02) | O sistema deve gerar um código único ou comprovante digital da "Intenção de Doação" ([RNF07](../../../13_requisitos/requisitos.md#rnf07)). | **Teste de Confirmação:** Submissão da doação com itens selecionados. <br> *Resultado:* Sistema registrou a intenção e exibiu confirmação ao voluntário. | **Aprovado** |

---

## Matriz de Evidências Visuais

* **Evidências Visuais (Desktop e Mobile):** Fluxo de seleção implementado na seção de construção em [Fases RAD - RF11](./fases_rad_RF11.md#construcao).
* **Conformidade Metodológica:** Checklist de [Evidências de DoR e DoD](./dor_dod_evidencias_RF11.md).

---

## Considerações Finais

A entrega do **RF11** cumpre os critérios de registro de intenção de doação estipulados para este ciclo de iteração.

---

## Histórico de Versão

| Versão | Data | Descrição | Autor(es) | Revisor(es) |
| :---: | :---: | :--- | :---: | :---: |
| 1.0 | 15/06/2026 | Consolidação das evidências de aceitação do RF11 no Ciclo RAD 5 | [Artur Fernandes Galdino](https://github.com/ArturFGaldino), [Guilherme Oliveira](https://github.com/GuilhermeOliveira1327), [Kaio Amoury](https://github.com/KaioAmouryUnB), [Gustavo Gomes Fornaciari](https://github.com/GUGOFO) | Equipe |
