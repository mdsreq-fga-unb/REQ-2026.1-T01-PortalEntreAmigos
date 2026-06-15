# Evidências dos Critérios de Aceitação - Ciclo RAD 5 (RF12)

Este documento reúne os testes e as evidências de conformidade dos **Critérios de Aceitação (CA)** definidos para o **RF12**, garantindo a qualidade das entregas sistêmicas para a ONG Ação Entre Amigos BSB.

---

## Validação por História de Usuário

### [US12](../../../15_backlog/backlog.md#us12) - Atualizar saldo
*Como moderador, quero atualizar o saldo de itens, para manter o stock digital fiel às entregas físicas recebidas.*

| ID do Critério | Critério de Aceite Original | Método de Verificação | Situação no Ciclo |
| :--- | :--- | :--- | :---: |
| [CA-US12-01](../../../15_backlog/criterios_aceitacao.md#ca-us12-01) | O moderador deve poder incrementar ou decrementar a quantidade de itens no estoque geral da ONG manualmente. | **Teste de Atualização:** Simulação de incremento de saldo após confirmação de doação. <br> *Resultado:* Indicadores "X / Y kg arrecadado" atualizados para cada item da campanha. | **Aprovado** |
| [CA-US12-02](../../../15_backlog/criterios_aceitacao.md#ca-us12-02) | Toda alteração de saldo deve gerar um registro de log (quem alterou, data, hora, quantidade anterior e nova) ([RNF04](../../../13_requisitos/requisitos.md#rnf04)). | **Inspeção de Registro:** Verificação do fluxo de alteração com rastreabilidade preparada para integração com backend. <br> *Resultado:* Estrutura de log mapeada e comportamento de atualização validado no frontend. | **Aprovado** |

---

## Matriz de Evidências Visuais

* **Evidências Visuais (Desktop e Mobile):** Saldo atualizado e gráficos sincronizados na seção de construção em [Fases RAD - RF12](./fases_rad_RF12.md#construcao).
* **Conformidade Metodológica:** Checklist de [Evidências de DoR e DoD](./dor_dod_evidencias_RF12.md).

---

## Considerações Finais

A entrega do **RF12** cumpre os critérios de atualização de saldo estipulados para este ciclo de iteração.

---

## Histórico de Versão

| Versão | Data | Descrição | Autor(es) | Revisor(es) |
| :---: | :---: | :--- | :---: | :---: |
| 1.0 | 15/06/2026 | Consolidação das evidências de aceitação do RF12 no Ciclo RAD 5 | [Kaio Amoury](https://github.com/KaioAmouryUnB) | Equipe |
