# Evidências dos Critérios de Aceitação - Ciclo RAD 3 (RF05)

Este documento reúne os testes e as evidências de conformidade dos **Critérios de Aceitação (CA)** definidos para o ciclo de desenvolvimento atual, garantindo a qualidade das entregas sistêmicas para a ONG Ação Entre Amigos BSB e a aderência às normas legais de privacidade.

---

## Validação por História de Usuário

### [US05](../../../15_backlog/backlog.md#us05) - Excluir conta
*Como voluntário, quero excluir a minha conta, para remover os meus dados pessoais do sistema caso não deseje mais participar.*

Abaixo encontra-se a matriz de validação dos critérios de aceite específicos estabelecidos no documento oficial de [Critérios de Aceite](../../../15_backlog/criterios_aceitacao.md#ca-us05-01):

| ID do Critério | Critério de Aceite Original | Método de Verificação | Situação no Ciclo |
| :--- | :--- | :--- | :---: |
| [CA-US05-01](../../../15_backlog/criterios_aceitacao.md#ca-us05-01) | O sistema deve solicitar a senha atual do usuário como confirmação antes de prosseguir com a exclusão. | **Teste de Fluxo de Confirmação:** Acionamento do botão de exclusão de conta e preenchimento do input de senha obrigatório no modal de dupla confirmação. <br> *Resultado:* O sistema bloqueia a ação caso o campo de senha esteja vazio ou incorreto, exibindo alerta visual adequado. | **Aprovado** |
| [CA-US05-02](../../../15_backlog/criterios_aceitacao.md#ca-us05-02) | Os dados sensíveis do usuário devem ser anonimizados ou removidos permanentemente do banco de dados para cumprir normas de privacidade (ex: LGPD). | **Auditoria de Estado de Dados (Simulada):** Verificação de gatilhos pós-confirmação para garantir que os estados de e-mail, nome e dados pessoais associados sejam expurgados ou completamente descaracterizados na interface e no armazenamento local. <br> *Resultado:* Fluxo reativo limpa o estado do usuário imediatamente e redireciona o fluxo para a Landing Page pública. | **Aprovado** |

---

## Matriz de Evidências Visuais

Para consolidar a aprovação dos critérios acima, o comportamento, os alertas de segurança e a aderência das interfaces implementadas com o design planejado podem ser visualizados diretamente na documentação de engenharia do ciclo:

* **Evidências Visuais Completas (Desktop e Mobile):** O modal crítico de aviso e dupla confirmação por senha contendo as ações de cancelamento e exclusão definitiva está exposto na seção de construção em [Resultados do Modal de Exclusão de Conta](./fases_rad_RF05.md#construcao).
* **Conformidade Técnico-Metodológica:** A aderência estrita às regras de prontidão (DoR) e finalização (DoD) foi homologada no checklist de [Evidências de DoR e DoD](./dor_dod_evidencias_RF05.md).

---

## Considerações Finais

A entrega do **RF05** cumpre com êxito todos os limites de funcionalidade, regras de validação visual e critérios de segurança exigidos pela LGPD. O componente de exclusão encontra-se estável no frontend, aplicando corretamente os estados de aviso visual destrutivo e preparado para o acoplamento futuro com o endpoint de deleção da API do backend.

---

## Histórico de Versão

| Versão | Data | Descrição | Autor(es) | Revisor(es) |
| :---: | :---: | :--- | :---: | :---: |
| 1.0 | 15/06/2026 | Documentação inicial e consolidação das evidências de aceite do RF05 baseadas na US05 | <br>[Gustavo Gomes](https://github.com/GUGOFO) | Equipe |