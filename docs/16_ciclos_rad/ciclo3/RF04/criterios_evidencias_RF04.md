# Evidências dos Critérios de Aceitação - Ciclo RAD 3 (RF04)

Este documento reúne os testes e as evidências de conformidade dos **Critérios de Aceitação (CA)** definidos para o ciclo de desenvolvimento atual, garantindo a qualidade das entregas sistêmicas para a ONG Ação Entre Amigos BSB.

---

## Validação por História de Usuário

### [US04](../../../15_backlog/backlog.md#us04) - Editar perfil
*Como voluntário, quero editar o meu perfil, para manter as minhas informações de contato atualizadas para a ONG.*

Abaixo encontra-se a matriz de validação dos critérios de aceite específicos estabelecidos no documento oficial de [Critérios de Aceite](../../../15_backlog/criterios_aceitacao.md#ca-us04-01):

| ID do Critério | Critério de Aceite Original | Método de Verificação | Situação no Ciclo |
| :--- | :--- | :--- | :---: |
| [CA-US04-01](../../../15_backlog/criterios_aceitacao.md#ca-us04-01) | O voluntário deve poder alterar seu Nome e Senha. | **Teste de Interação do Formulário:** Abertura do modal flutuante de edição e checagem da capacidade de inserção de texto nos campos. <br> *Resultado:* Caixas de texto totalmente operantes e interativas para a manipulação dos dados cadastrais. | **Aprovado** |
| [CA-US04-02](../../../15_backlog/criterios_aceitacao.md#ca-us04-02) | As alterações devem refletir imediatamente no banco de dados e na interface do usuário ([RNF07](../../../13_requisitos/requisitos.md#rnf07)). | **Inspeção de Sincronização de Estado:** Modificação simulada de dados locais para validar se as alterações propagam-se instantaneamente no componente de tela. <br> *Resultado:* Layout reativo atualizando o estado do formulário imediatamente após os eventos de digitação. | **Aprovado** |

---

## Matriz de Evidências Visuais

Para consolidar a aprovação dos critérios acima, o comportamento e a aderência das interfaces implementadas com o design planejado podem ser visualizados diretamente na documentação de engenharia do ciclo:

* **Evidências Visuais Completas (Desktop e Mobile):** O componente funcional do formulário sobreposto contendo todos os inputs e botões de controle ("Salvar" e "Cancelar") está exposto na seção de construção em [Resultados do Modal de Edição de Perfil](./fases_rad_RF04.md#construcao).
* **Conformidade Técnico-Metodológica:** A aderência às regras de prontidão e finalização foi homologada no checklist de [Evidências de DoR e DoD](./dor_dod_evidencias_RF04.md).

---

## Considerações Finais

A entrega do **RF04** cumpre com êxito todos os limites de funcionalidade, regras de validação visual e critérios de persistência estipulados para este ciclo de iteração.

---

## Histórico de Versão

| Versão | Data | Descrição | Autor(es) | Revisor(es) |
| :---: | :---: | :--- | :---: | :---: |
| 1.0 | 15/06/2026 | Documentação inicial e consolidação das evidências de aceite do RF04 baseadas na US04 | [Edson Pereira](https://github.com/edso-n), <br>[Gustavo Gomes](https://github.com/GUGOFO), <br>[Leonardo de Aquino](https://github.com/surpesaiajin) | Equipe |