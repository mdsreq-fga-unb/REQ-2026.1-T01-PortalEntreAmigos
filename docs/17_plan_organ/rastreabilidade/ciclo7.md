# Rastreabilidade e Evidências - Ciclo RAD 7

O **Ciclo RAD 7** encerrou as iterações de desenvolvimento focando na finalização/fechamento das campanhas (US09), compartilhamento em redes sociais/WhatsApp (US17), página de Dúvidas Frequentes/FAQ (US18) e no mural de marcas parceiras e apoiadores (US19).

---

## 1. Mapeamento de Rastreabilidade

O desdobramento estratégico deste ciclo segue a cadeia de rastreabilidade de requisitos abaixo:

| Dimensão | Detalhamento |
| :--- | :--- |
| **Problema** | Falta de meios automáticos para divulgar as campanhas fora da plataforma, ausência de uma área centralizada de esclarecimento de dúvidas e falta de reconhecimento público aos parceiros da ONG. |
| **Objetivos Específicos** | [OE1](../../02_solucao/produto.md#oe1) - Minimizar o esforço manual de controle.<br>[OE3](../../02_solucao/produto.md#oe3) - Mais visibilidade de metas.<br>[OE4](../../02_solucao/produto.md#oe4) - Fortalecer o engajamento com apoiadores. |
| **Características do Produto** | [CP1](../../02_solucao/produto.md#cp1) - Gestão de Eventos<br>[CP8](../../02_solucao/produto.md#cp8) - Divulgação e Integração |
| **Histórias de Usuário** | [US09](../MVP/us09.md), [US17](../MVP/us17.md), [US18](../MVP/us18.md), [US19](../MVP/us19.md) |

---

## 2. Detalhamento das Evidências

As atividades de Engenharia de Software e Engenharia de Requisitos executadas neste ciclo produziram as seguintes evidências:

### A. Evidência de Design (Prototipagem)
Criação de botões de compartilhamento social, painel administrativo para encerrar eventos, menus sanfonados de FAQ e carrosséis para apoiadores:

*   **Componentes Desenhados:** Botão "Compartilhar WhatsApp" nas campanhas; pop-up de confirmação de encerramento; caixas retráteis de FAQ; carrossel infinito de imagens para exibição de parceiros.
*   *Mapeamento visual no Figma:* [US09](../MVP/us09.md#prototipagem), [US17](../MVP/us17.md#prototipagem), [US18](../MVP/us18.md#prototipagem), [US19](../MVP/us19.md#prototipagem)

### B. Evidência de Construção (Código Fonte)
Implementação de APIs de compartilhamento e componentes dinâmicos no portal público:

*   **Arquivos Criados/Modificados:** Componentes `/campanhas/[id]`, página pública `/faq` e seção de patrocinadores na Home `/index` e `/quem-somos`.
*   *Código fonte do ciclo:* [Repositório da Construção - Ciclo 7](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-PortalEntreAmigos/tree/develop)

### C. Evidência de Validação (Cliente)
*   **Reunião Síncrona:** Homologação final contendo testes de links externos de compartilhamento no WhatsApp, checagem da sanfona de FAQ e verificação visual do mural de marcas de apoiadores da ONG com o cliente Carlos.
*   *Ata de homologação correspondente:* [Ata de Reunião 10 com Cliente](../../12_reunioes/atas/cliente/ata_cliente_10.md).

---

## 3. Critérios de Qualidade (DoR e DoD)

A aceitação e a transição deste ciclo basearam-se no cumprimento das seguintes diretrizes de qualidade:

*   **Critérios de Aceitação:** Validação da desativação de campanhas finalizadas, redirecionamento e preenchimento de mensagens sociais, responsividade do FAQ e exibição correta dos apoiadores. Detalhados em cada US: [US09](../MVP/us09.md#criterios-de-aceitacao), [US17](../MVP/us17.md#criterios-de-aceitacao), [US18](../MVP/us18.md#criterios-de-aceitacao), [US19](../MVP/us19.md#criterios-de-aceitacao).
*   **DoR (Definition of Ready):** Homologados no repositório individual de cada US: [US09](../MVP/us09.md#definicao-de-preparado-dor), [US17](../MVP/us17.md#definicao-de-preparado-dor), [US18](../MVP/us18.md#definicao-de-preparado-dor), [US19](../MVP/us19.md#definicao-de-preparado-dor).
*   **DoD (Definition of Done):** Totalmente revisados e marcados como concluídos: [US09](../MVP/us09.md#definicao-de-pronto-dod), [US17](../MVP/us17.md#definicao-de-pronto-dod), [US18](../MVP/us18.md#definicao-de-pronto-dod), [US19](../MVP/us19.md#definicao-de-pronto-dod).

---

## Histórico de Versão

| Versão |    Data    | Descrição  | Autor(es) | Revisor(es)|
| :----: | :--------: | :--------- | :-------: | :---------: |
|  1.0   | 01/07/2026 | População inicial do arquivo com detalhamento de rastreabilidade | [Artur Fernandes Galdino](https://github.com/ArturFGaldino) | Equipe |
