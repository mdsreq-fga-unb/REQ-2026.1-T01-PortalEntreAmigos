# Evidências dos Critérios de Aceitação - Ciclo RAD 2

Este documento reúne os testes e as evidências de conformidade dos **Critérios de Aceitação (CA)** definidos para o ciclo de desenvolvimento atual, garantindo a qualidade das entregas sistêmicas para a ONG Ação Entre Amigos BSB.

---

## Validação por História de Usuário

### [US14](backlog.md#us14) - Exibir eventos
*Como voluntário, quero exibir a vitrine de eventos ativos, para escolher qual campanha da ONG desejo ajudar.*

Abaixo encontra-se a matriz de validação dos critérios de aceite específicos estabelecidos no documento oficial de [Critérios de Aceite](../../15_backlog/criterios_aceitacao.md#ca-us14-01):

| ID do Critério | Critério de Aceite Original / Expandido | Método de Verificação | Situação no Ciclo |
| :--- | :--- | :--- | :---: |
| [CA-US14-01](../../15_backlog/criterios_aceitacao.md#ca-us14-01) | A Página de Campanhas deve listar a "Campanha Ativa" em destaque principal e segregar as "Últimas Campanhas Fechadas". | **Teste de Renderização de Vitrine:** Validação visual do grid da página geral para confirmar se a campanha corrente está em evidência e se o histórico de ações encerradas é exibido logo abaixo. <br> *Resultado:* Blocos estruturados com perfeita separação cronológica e de status. | **Aprovado** |
| [CA-US14-02](../../15_backlog/criterios_aceitacao.md#ca-us14-02) | O layout de ambas as páginas deve ser totalmente responsivo (mobile e desktop) ([RNF01](../../13_requisitos/requisitos.md#rnf01)). | **Inspeção via DevTools (F12):** Emulação das resoluções de tela em múltiplos dispositivos para checar o comportamento da barra de progresso, imagens e tabelas. <br> *Resultado:* Adaptação fluida dos componentes sem quebras de layout ou scrolls horizontais indesejados. | **Aprovado** |
| [CA-US14-03](../../15_backlog/criterios_aceitacao.md#ca-us14-03) | A Página da Campanha deve carregar dinamicamente todos os dados detalhados específicos da mobilização ativa selecionada. | **Validação de Rota e Conteúdo:** Acesso à página interna da campanha ativa para verificar a exibição da descrição longa, objetivos institucionais e instruções de doação. <br> *Resultado:* Renderização precisa de todos os dados consolidados da campanha em andamento. | **Aprovado** |
| [CA-US14-04](../../15_backlog/criterios_aceitacao.md#ca-us14-04) | A Página da Campanha deve exibir indicadores visuais claros sobre a meta de arrecadação. | **Inspeção de Componente Visual:** Verificação do gráfico de pizza de distribuição de doações e da barra de preenchimento de metas nas versões desktop e mobile. <br> *Resultado:* Indicadores visuais funcionando em conformidade com as regras de negócio acordadas. | **Aprovado** |

---

## Matriz de Evidências Visuais

Para consolidar a aprovação dos critérios acima, o comportamento e a aderência das interfaces implementadas com o design planejado podem ser visualizados diretamente na documentação de engenharia do ciclo:

* **Evidências Visuais Completas (Desktop e Mobile):** Os componentes codificados e validados (mural geral e gráficos de distribuição de doações) estão expostos na seção de construção em [Resultados do Design do Usuário](./fases_rad.md#design-do-usuario).
* **Conformidade Técnica Adicional:** A aderência estrita às regras de negócio e restrições de infraestrutura foi homologada no checklist de [Evidências de DoR e DoD](./dor_dod_evidencias.md).

---

## Considerações Finais

A entrega do **RF14** cumpre com êxito todos os limites de funcionalidade, regras de negócio e critérios de qualidade estipulados para este ciclo de iteração. O incremento de software encontra-se estável e validado para a incorporação oficial na plataforma.

---

## Histórico de Versão

| Versão | Data | Descrição | Autor(es) | Revisor(es) |
| :---: | :---: | :--- | :---: | :---: |
| 1.0 | 13/06/2026 | Documentação inicial do planejamento, design e construção do Ciclo RAD 2 | <br>[Gustavo Gomes](https://github.com/GUGOFO)| Equipe |