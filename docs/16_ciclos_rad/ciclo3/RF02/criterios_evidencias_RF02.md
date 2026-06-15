# Evidências dos Critérios de Aceitação - Ciclo RAD 3 (RF02)

Este documento reúne os testes e as evidências de conformidade dos **Critérios de Aceitação (CA)** definidos para o ciclo de desenvolvimento atual, garantindo a qualidade das entregas sistêmicas para a ONG Ação Entre Amigos BSB.

---

## Validação por História de Usuário

### [US02](../../../15_backlog/backlog.md#us02) - Login de usuário
*Como usuario, quero realizar o login, para acessar o meu perfil com segurança na plataforma.*

Abaixo encontra-se a matriz de validação dos critérios de aceite específicos estabelecidos no documento oficial de [Critérios de Aceite](../../../15_backlog/criterios_aceitacao.md#ca-us02-01):

| ID do Critério | Critério de Aceite Original | Método de Verificação | Situação no Ciclo |
| :--- | :--- | :--- | :---: |
| [CA-US02-01](../../../15_backlog/criterios_aceitacao.md#ca-us02-01) | O utilizador deve fornecer um e-mail válido e a senha correspondente para acessar o sistema. | **Teste de Submissão Incompleta:** Tentativa de login omitindo dados ou informando estruturas incorretas de e-mail. <br> *Resultado:* O sistema barrou o envio e disparou avisos nativos de preenchimento obrigatório. | **Aprovado** |
| [CA-US02-02](../../../15_backlog/criterios_aceitacao.md#ca-us02-02) | Caso as credenciais estejam incorretas, o sistema deve exibir uma mensagem de erro genérica (ex: "E-mail ou senha incorretos"). | **Simulação de Erro de Autenticação:** Mock de submissão de credenciais inválidas para checar o comportamento visual do componente de aviso. <br> *Resultado:* A interface renderizou a mensagem genérica configurada, impedindo a exposição de dados vulneráveis. | **Aprovado** |

---

## Matriz de Evidências Visuais

Para consolidar a aprovação dos critérios acima, o comportamento e a aderência das interfaces implementadas com o design planejado podem ser visualizados diretamente na documentação de engenharia do ciclo:

* **Evidências Visuais Completas (Desktop e Mobile):** Os componentes de formulários de autenticação e caixas de alerta codificados estão expostos na seção de construção em [Resultados do Login de Usuários](./fases_rad_RF02.md#construcao).
* **Conformidade Técnico-Metodológica:** A aderência estrita às regras de prontidão e finalização foi homologada no checklist de [Evidências de DoR e DoD](./dor_dod_evidencias_RF02.md).

---

## Considerações Finais

A entrega do **RF02** cumpre com êxito todos os limites de funcionalidade, regras de validação frontend e critérios de segurança estipulados para este ciclo de iteração. O incremento de software encontra-se estruturado e preparado para os testes de integração com o backend.

---

## Histórico de Versão

| Versão | Data | Descrição | Autor(es) | Revisor(es) |
| :---: | :---: | :--- | :---: | :---: |
| 1.0 | 15/06/2026 | Documentação inicial e consolidação das evidências de aceite do RF02 | [Edson Pereira](https://github.com/edso-n), <br>[Gustavo Gomes](https://github.com/GUGOFO), <br>[Leonardo de Aquino](https://github.com/surpesaiajin) | Equipe |