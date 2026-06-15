# Evidências dos Critérios de Aceitação - Ciclo RAD 4 (RF08)

Este documento reúne os testes e as evidências de conformidade dos **Critérios de Aceitação (CA)** definidos para o ciclo de desenvolvimento atual, garantindo a qualidade das entregas sistêmicas para a ONG Ação Entre Amigos BSB.

---

## Validação por História de Usuário

### [US08](../../../15_backlog/backlog.md#us08) - Excluir eventos
*Como moderador, quero excluir eventos, para remover campanhas registadas indevidamente ou canceladas.*

Abaixo encontra-se a matriz de validação dos critérios de aceite específicos estabelecidos no documento oficial de [Critérios de Aceite](../../../15_backlog/criterios_aceitacao.md#ca-us08-01):

| ID do Critério | Critério de Aceite Original | Método de Verificação | Situação no Ciclo |
| :--- | :--- | :--- | :---: |
| [CA-US08-01](../../../15_backlog/criterios_aceitacao.md#ca-us08-01) | Apenas eventos que não possuam doações vinculadas ou inscrições ativas podem ser excluídos. | **Teste de Restrição de Exclusão Física:** Tentativa de acionamento do comando de apagar definitivo em um evento contendo mock de doações ou inscritos ativos. <br> *Resultado:* O sistema intercepta o comando, bloqueia o expurgo permanente e emite aviso explicativo sobre dependência de dados. | **Aprovado** |
| [CA-US08-02](../../../15_backlog/criterios_aceitacao.md#ca-us08-02) | Para eventos com histórico, o sistema deve permitir apenas a "Inativação/Cancelamento", preservando o histórico de dados. | **Simulação de Inativação Lógica:** Acionamento do botão de exclusão em uma campanha com histórico consolidado. <br> *Resultado:* O sistema altera dinamicamente o status da campanha para "Cancelado/Inativo" no frontend, mantendo todos os dados intactos para auditoria. | **Aprovado** |

---

## Matriz de Evidências Visuais

Para consolidar a aprovação dos critérios acima, o comportamento e a aderência das interfaces implementadas com o design planejado podem ser visualizados diretamente na documentação de engenharia do ciclo:

* **Evidências Visuais Completas (Desktop e Mobile):** Os componentes de modais destrutivos e travas de segurança administrativa encontram-se expostos na seção de construção em [Resultados da Tela de Exclusão de Evento](./fases_rad_RF08.md#construcao).
* **Conformidade Técnico-Metodológica:** A aderência às regras de prontidão e finalização foi devidamente homologada no checklist de [Evidências de DoR e DoD](./dor_dod_evidencias_RF08.md).

---

## Considerações Finais

A entrega do **RF08** cumpre com êxito os limites de funcionalidade, regras de validação visual e critérios de governança de dados estipulados para este ciclo de iteração. O painel administrativo encontra-se funcional e preparado para integração com a API de persistência do backend.

---

## Histórico de Versão

| Versão | Data | Descrição | Autor(es) | Revisor(es) |
| :---: | :---: | :--- | :---: | :---: |
| 1.0 | 22/06/2026 | Documentação inicial e consolidação das evidências de aceite do RF08 baseadas na US08 | [Edson Pereira](https://github.com/edso-n), <br>[Gustavo Gomes](https://github.com/GUGOFO), <br>[Leonardo de Aquino](https://github.com/surpesaiajin) | Equipe |