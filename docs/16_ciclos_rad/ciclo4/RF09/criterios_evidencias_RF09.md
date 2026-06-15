# Evidências dos Critérios de Aceitação - Ciclo RAD 4 (RF09)

Este documento reúne os testes e as evidências de conformidade dos **Critérios de Aceitação (CA)** definidos para o ciclo de desenvolvimento atual, garantindo a qualidade das entregas sistêmicas para a ONG Ação Entre Amigos BSB.

---

## Validação por História de Usuário

### [US09](../../../15_backlog/backlog.md#us09) - Encerrar eventos
*Como moderador, quero encerrar eventos, para sinalizar ao público que a arrecadação daquela campanha foi finalizada.*

Abaixo encontra-se a matriz de validação dos critérios de aceite específicos estabelecidos no documento oficial de [Critérios de Aceite](../../../15_backlog/criterios_aceitacao.md#ca-us09-01):

| ID do Critério | Critério de Aceite Original | Método de Verificação | Situação no Ciclo |
| :--- | :--- | :--- | :---: |
| [CA-US09-01](../../../15_backlog/criterios_aceitacao.md#ca-us09-01) | Após o encerramento, o status do evento deve mudar para "Encerrado". | **Teste de Transição de Estado:** Acionamento do comando administrativo de encerramento em um evento ativo. <br> *Resultado:* O sistema modifica instantaneamente a flag de estado no frontend para "Encerrado", atualizando os rótulos de identificação. | **Aprovado** |
| [CA-US09-02](../../../15_backlog/criterios_aceitacao.md#ca-us09-02) | O sistema não deve permitir novas inscrições de voluntários ou registro de novas intenções de doação para eventos encerrados. | **Inspeção de Bloqueio de Entrada:** Acesso à interface de detalhes de um evento que possui o status "Encerrado". <br> *Resultado:* O sistema oculta ou desabilita estaticamente os botões de "Inscrever-se" e "Doar Itens", impedindo novos payloads de dados. | **Aprovado** |

---

## Matriz de Evidências Visuais

Para consolidar a aprovação dos critérios acima, o comportamento e a aderência das interfaces implementadas com o design planejado podem ser visualizados diretamente na documentação de engenharia do ciclo:

* **Evidências Visuais Completas (Desktop e Mobile):** Os componentes de controle de status e travas lógicas reativas encontram-se expostos na seção de construção em [Resultados da Tela de Encerramento de Evento](./fases_rad_RF09.md#construcao).
* **Conformidade Técnico-Metodológica:** A aderência às regras de prontidão e finalização foi devidamente homologada no checklist de [Evidências de DoR e DoD](./dor_dod_evidencias_RF09.md).

---

## Considerações Finais

A entrega do **RF09** cumpre com êxito todos os limites de funcionalidade, regras de transição de estado e critérios de bloqueio de segurança estipulados para este ciclo de iteração. O painel administrativo encontra-se funcional e validado para a incorporação oficial ao produto.

---

## Histórico de Versão

| Versão | Data | Descrição | Autor(es) | Revisor(es) |
| :---: | :---: | :--- | :---: | :---: |
| 1.0 | 22/06/2026 | Documentação inicial e consolidação das evidências de aceite do RF09 baseadas na US09 | [Edson Pereira](https://github.com/edso-n), <br>[Gustavo Gomes](https://github.com/GUGOFO), <br>[Leonardo de Aquino](https://github.com/surpesaiajin) | Equipe |