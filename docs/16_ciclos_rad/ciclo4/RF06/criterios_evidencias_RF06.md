# Evidências dos Critérios de Aceitação - Ciclo RAD 4 (RF06)

Este documento reúne os testes e as evidências de conformidade dos **Critérios de Aceitação (CA)** definidos para o ciclo de desenvolvimento atual, garantindo a qualidade das entregas sistêmicas para a ONG Ação Entre Amigos BSB.

---

## Validação por História de Usuário

### [US06](../../../15_backlog/backlog.md#us06) - Criar eventos
*Como moderador, quero criar novos eventos, para iniciar uma nova campanha de arrecadação da ONG.*

Abaixo encontra-se a matriz de validação dos critérios de aceite específicos estabelecidos no documento oficial de [Critérios de Aceite](../../../15_backlog/criterios_aceitacao.md#ca-us06-01):

| ID do Critério | Critério de Aceite Original | Método de Verificação | Situação no Ciclo |
| :--- | :--- | :--- | :---: |
| [CA-US06-01](../../../15_backlog/criterios_aceitacao.md#ca-us06-01) | O sistema deve verificar se o usuário possui permissão de "Moderador" antes de liberar a tela de criação ([RNF04](../../../13_requisitos/requisitos.md#rnf04)). | **Teste de Violação de Rota:** Tentativa de acesso direto à URL do formulário administrativo simulando uma conta sem privilégios (Voluntário comum). <br> *Resultado:* O sistema interceptou a requisição local, barrou a exibição da tela e aplicou o redirecionamento protetivo. | **Aprovado** |
| [CA-US06-02](../../../15_backlog/criterios_aceitacao.md#ca-us06-02) | Devem ser exigidos os campos: Título da Campanha, Descrição, Data de Início/Término, Local e Metas de Arrecadação (itens ou valor). | **Teste de Submissão Incompleta:** Tentativa de envio do formulário de novo evento deixando um ou mais campos obrigatórios vazios. <br> *Resultado:* O motor do frontend barrou a submissão, impediu o envio do payload e disparou alertas visuais de preenchimento obrigatório em cada campo pendente. | **Aprovado** |

---

## Matriz de Evidências Visuais

Para consolidar a aprovação dos critérios acima, o comportamento e a aderência das interfaces implementadas com o design planejado podem ser visualizados diretamente na documentação de engenharia do ciclo:

* **Evidências Visuais Completas (Desktop e Mobile):** Os componentes de formulários administrativos e travas de segurança mapeados encontram-se expostos na seção de construção em [Resultados da Tela de Criação de Evento](./fases_rad_RF06.md#construcao).
* **Conformidade Técnico-Metodológica:** A aderência às regras de prontidão e finalização foi devidamente homologada no checklist de [Evidências de DoR e DoD](./dor_dod_evidencias_RF06.md).

---

## Considerações Finais

A entrega do **RF06** cumpre com êxito os limites de funcionalidade, regras de validação visual e restrições de controle de acesso estipulados para este ciclo de iteração. O painel administrativo encontra-se funcional e preparado para integração com a API estável de persistência do backend.

---

## Histórico de Versão

| Versão | Data | Descrição | Autor(es) | Revisor(es) |
| :---: | :---: | :--- | :---: | :---: |
| 1.0 | 22/06/2026 | Documentação inicial e consolidação das evidências de aceite do RF06 baseadas na US06 | [Edson Pereira](https://github.com/edso-n), <br>[Gustavo Gomes](https://github.com/GUGOFO), <br>[Leonardo de Aquino](https://github.com/surpesaiajin) | Equipe |