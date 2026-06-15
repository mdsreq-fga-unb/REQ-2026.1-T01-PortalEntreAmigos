# Evidências dos Critérios de Aceitação - Ciclo RAD 4 (RF07)

Este documento reúne os testes e as evidências de conformidade dos **Critérios de Aceitação (CA)** definidos para o ciclo de desenvolvimento atual, garantindo a qualidade das entregas sistêmicas para a ONG Ação Entre Amigos BSB.

---

## Validação por História de Usuário

### [US07](../../../15_backlog/backlog.md#us07) - Editar eventos
*Como moderador, quero editar eventos, para corrigir metas ou informações logísticas de campanhas em andamento.*

Abaixo encontra-se a matriz de validação dos critérios de aceite específicos estabelecidos no documento oficial de [Critérios de Aceite](../../../15_backlog/criterios_aceitacao.md#ca-us07-01):

| ID do Critério | Critério de Aceite Original | Método de Verificação | Situação no Ciclo |
| :--- | :--- | :--- | :---: |
| [CA-US07-01](../../../15_backlog/criterios_aceitacao.md#ca-us07-01) | Apenas moderadores autenticados podem editar os detalhes de um evento ([RNF04](../../../13_requisitos/requisitos.md#rnf04)). | **Teste de Violação de Rota:** Tentativa de acesso direto à rota de edição simulando uma conta com nível de permissão comum (Voluntário). <br> *Resultado:* O sistema bloqueia a visualização do formulário e redireciona o usuário sem autorização. | **Aprovado** |
| [CA-US07-02](../../../15_backlog/criterios_aceitacao.md#ca-us07-02) | Se a meta for alterada, a barra de progresso do evento ([US10](../../../15_backlog/backlog.md#us10)) deve ser recalculada imediatamente. | **Simulação de Atualização Reativa:** Modificação artificial do valor de meta em um campo de entrada para checar o comportamento matemático do componente de progresso. <br> *Resultado:* A porcentagem e a barra visual de preenchimento atualizam o estado de forma síncrona na tela. | **Aprovado** |

---

## Matriz de Evidências Visuais

Para consolidar a aprovação dos critérios acima, o comportamento e a aderência das interfaces implementadas com o design planejado podem ser visualizados diretamente na documentação de engenharia do ciclo:

* **Evidências Visuais Completas (Desktop e Mobile):** Os componentes de formulários administrativos e travas de segurança mapeados encontram-se expostos na seção de construção em [Resultados da Tela de Edição de Evento](./fases_rad_RF07.md#construcao).
* **Conformidade Técnico-Metodológica:** A aderência às regras de prontidão e finalização foi devidamente homologada no checklist de [Evidências de DoR e DoD](./dor_dod_evidencias_RF07.md).

---

## Considerações Finais

A entrega do **RF07** cumpre com êxito os limites de funcionalidade, regras de validação visual e restrições de controle de acesso estipulados para este ciclo de iteração. O painel administrativo encontra-se funcional e preparado para integração com a API estável de persistência do backend.

---

## Histórico de Versão

| Versão | Data | Descrição | Autor(es) | Revisor(es) |
| :---: | :---: | :--- | :---: | :---: |
| 1.0 | 22/06/2026 | Documentação inicial e consolidação das evidências de aceite do RF07 baseadas na US07 | [Edson Pereira](https://github.com/edso-n), <br>[Gustavo Gomes](https://github.com/GUGOFO), <br>[Leonardo de Aquino](https://github.com/surpesaiajin) | Equipe |