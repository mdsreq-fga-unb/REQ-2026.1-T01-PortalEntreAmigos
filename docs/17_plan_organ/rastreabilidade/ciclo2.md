# Rastreabilidade e Evidências - Ciclo RAD 2

O **Ciclo RAD 2** concentrou-se na criação da vitrine de campanhas e eventos ativos da ONG, permitindo que doadores e voluntários visualizassem onde e com o que poderiam contribuir de forma direta.

---

## 1. Mapeamento de Rastreabilidade

O desdobramento estratégico deste ciclo segue a cadeia de rastreabilidade de requisitos abaixo:

| Dimensão | Detalhamento |
| :--- | :--- |
| **Problema** | Dificuldade de voluntários e doadores em saber quais campanhas de arrecadação estão ativas e quais as metas e necessidades logísticas atuais. |
| **Objetivos Específicos** | [OE3](../../02_solucao/produto.md#oe3) - Proporcionar maior visibilidade das campanhas, metas e necessidades da ONG.<br>[OE4](../../02_solucao/produto.md#oe4) - Facilitar o engajamento dos voluntários. |
| **Característica do Produto** | [CP2](../../02_solucao/produto.md#cp2) - Vitrine de Necessidades das Campanhas |
| **Requisito Funcional** | [RF14](../../13_requisitos/requisitos.md#rf14) - Exibir eventos |
| **História de Usuário** | [US14](../MVP/us14.md) - Como voluntário, quero exibir a vitrine de eventos ativos para escolher qual campanha da ONG desejo ajudar. |

---

## 2. Detalhamento das Evidências

As atividades de Engenharia de Software e Engenharia de Requisitos executadas neste ciclo produziram as seguintes evidências:

### A. Evidência de Design (Prototipagem)
Protótipos de alta fidelidade responsivos foram criados para a vitrine e detalhes de campanhas:

*   **Vitrine Geral de Campanhas**: Listagem contendo card destacado da campanha ativa e histórico de campanhas encerradas.
*   **Interna de Campanha (Detalhes)**: Descrições, dados logísticos de pontos de entrega e necessidades.
*   *Mapeamento visual no Figma:* [US14](../MVP/us14.md#prototipagem)

### B. Evidência de Construção (Código Fonte)
Implementação de componentes em React/Next.js conectados à navegação responsiva:

*   **Arquivos Criados/Modificados:** Páginas `/campanhas` e `/campanhas/[id]` (detalhes da campanha ativa).
*   *Código fonte do ciclo:* [Repositório da Construção - Ciclo 2](https://github.com/GUGOFO)
*   *Branch de Transição:* [develop](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-PortalEntreAmigos/tree/develop)

### C. Evidência de Validação (Cliente)
*   **Reunião Síncrona:** Realizada de forma integrada ao Ciclo 1 para validação das interfaces públicas iniciais.
*   *Ata de homologação correspondente:* [Ata de Reunião 6 com Cliente](../../12_reunioes/atas/cliente/ata_cliente_06.md) (Seção 3 - Validação dos Ciclos 1 e 2).

---

## 3. Critérios de Qualidade (DoR e DoD)

A aceitação e a transição deste ciclo basearam-se no cumprimento das seguintes diretrizes de qualidade:

*   **Critérios de Aceitação:** Validação da listagem dinâmica e exibição dos detalhes básicos da campanha. Evidências disponíveis em [US14](../MVP/us14.md#criterios-de-aceitacao).
*   **DoR (Definition of Ready) e DoD (Definition of Done):** Mapeados e checados no repositório. Evidências disponíveis em [US14](../MVP/us14.md#definicao-de-preparado-dor) e [US14](../MVP/us14.md#definicao-de-pronto-dod).

---

## Histórico de Versão

| Versão |    Data    | Descrição  | Autor(es) | Revisor(es)|
| :----: | :--------: | :--------- | :-------: | :---------: |
|  1.0   | 01/07/2026 | População inicial do arquivo com detalhamento de rastreabilidade | [Artur Fernandes Galdino](https://github.com/ArturFGaldino) | Equipe |
