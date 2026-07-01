# Rastreabilidade e Evidências - Ciclo RAD 6

O **Ciclo RAD 6** focou no desenvolvimento da gestão de voluntários (cadastro de preferências de atuação, triagem e alocação dinâmica por parte dos administradores) e no painel público de Transparência Financeira (balanço de receitas e despesas).

---

## 1. Mapeamento de Rastreabilidade

O desdobramento estratégico deste ciclo segue a cadeia de rastreabilidade de requisitos abaixo:

| Dimensão | Detalhamento |
| :--- | :--- |
| **Problema** | Dificuldade da coordenação da ONG em recrutar e direcionar voluntários para as tarefas adequadas, bem como a falta de canal público e claro de prestação de contas financeiras. |
| **Objetivos Específicos** | [OE1](../../02_solucao/produto.md#oe1) - Minimizar o esforço manual de controle.<br>[OE2](../../02_solucao/produto.md#oe2) - Melhorar a prestação de contas.<br>[OE4](../../02_solucao/produto.md#oe4) - Fortalecer o engajamento com apoiadores. |
| **Características do Produto** | [CP4](../../02_solucao/produto.md#cp4) - Controle de Recebimento e Estoque<br>[CP5](../../02_solucao/produto.md#cp5) - Transparência Financeira |
| **Histórias de Usuário** | [US12](../MVP/us12.md), [US13](../MVP/us13.md), [US15](../MVP/us15.md) |

---

## 2. Detalhamento das Evidências

As atividades de Engenharia de Software e Engenharia de Requisitos executadas neste ciclo produziram as seguintes evidências:

### A. Evidência de Design (Prototipagem)
Construção das interfaces de perfil de voluntário para seleção de preferências de atuação, filtros de triagem da administração e gráficos do portal de transparência:

*   **Componentes Desenhados:** Campos de checkbox e multiselect para preferências de atuação e disponibilidade horária; painel administrativo com filtros dinâmicos; tabelas de demonstrativo financeiro e gráficos simples de receitas vs despesas.
*   *Mapeamento visual no Figma:* [US12](../MVP/us12.md#prototipagem), [US13](../MVP/us13.md#prototipagem), [US15](../MVP/us15.md#prototipagem)

### B. Evidência de Construção (Código Fonte)
Codificação dos componentes frontend e conexões lógicas de filtragem em Next.js e React:

*   **Arquivos Criados/Modificados:** Componentes na área do voluntário (`/perfil`), página administrativa `/admin/voluntarios` e página de transparência `/transparencia`.
*   *Código fonte do ciclo:* [Repositório da Construção - Ciclo 6](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-PortalEntreAmigos/tree/develop)

### C. Evidência de Validação (Cliente)
*   **Reunião Síncrona:** Homologação do fluxo completo de triagem e alocação de voluntários por competência, e aprovação do balanço de transparência financeira pelo cliente Carlos.
*   *Ata de homologação correspondente:* [Ata de Reunião 9 com Cliente](../../12_reunioes/atas/cliente/ata_cliente_09.md).

---

## 3. Critérios de Qualidade (DoR e DoD)

A aceitação e a transição deste ciclo basearam-se no cumprimento das seguintes diretrizes de qualidade:

*   **Critérios de Aceitação:** Verificação das preferências do voluntário, correto funcionamento dos filtros administrativos e visualização precisa das receitas/despesas. Detalhados em cada US: [US12](../MVP/us12.md#criterios-de-aceitacao), [US13](../MVP/us13.md#criterios-de-aceitacao), [US15](../MVP/us15.md#criterios-de-aceitacao).
*   **DoR (Definition of Ready):** Homologados no repositório individual de cada US: [US12](../MVP/us12.md#definicao-de-preparado-dor), [US13](../MVP/us13.md#definicao-de-preparado-dor), [US15](../MVP/us15.md#definicao-de-preparado-dor).
*   **DoD (Definition of Done):** Totalmente revisados e marcados como concluídos: [US12](../MVP/us12.md#definicao-de-pronto-dod), [US13](../MVP/us13.md#definicao-de-pronto-dod), [US15](../MVP/us15.md#definicao-de-pronto-dod).

---

## Histórico de Versão

| Versão |    Data    | Descrição  | Autor(es) | Revisor(es)|
| :----: | :--------: | :--------- | :-------: | :---------: |
|  1.0   | 01/07/2026 | População inicial do arquivo com detalhamento de rastreabilidade | [Artur Fernandes Galdino](https://github.com/ArturFGaldino) | Equipe |
