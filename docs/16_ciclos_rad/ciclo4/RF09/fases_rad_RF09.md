# Ciclo RAD 4 - RF09

**Período:** 08/06 a 15/06  
**Responsáveis:** [Edson Pereira Roldao Filho](https://github.com/edso-n), [Gustavo Gomes Fornaciari](https://github.com/GUGOFO), [Leonardo de Aquino Silveira Braga](https://github.com/surpesaiajin)  
**Requisitos Alocados:** [RF09 - Encerrar eventos](../../../13_requisitos/requisitos.md#rf09)

---

## Planejamento dos Requisitos

Neste quarto ciclo de desenvolvimento utilizando a metodologia RAD (Rapid Application Development), a equipe planejou e executou o fluxo de finalização e encerramento de campanhas, cobrindo o **RF09** (vinculado à **US09** do Backlog). O principal objetivo foi implementar a inteligência de estados reativos na plataforma, garantindo que o encerramento trave interações públicas de forma dinâmica para apoiar a prestação de contas da ONG:

### 1. Fluxo de Mudança de Estado (Encerrar Evento)
Mecanismo administrativo que altera as permissões de engajamento do público com a campanha selecionada:

* **Alteração de Status:** Atualização imediata do rótulo da campanha de "Ativo" para "Encerrado", movendo-a automaticamente na vitrine principal para a seção de prestação de contas.
* **Bloqueio de Interações:** Inativação síncrona dos botões de inscrição de novos voluntários e impedimento definitivo do registro de novas intenções de doações para aquele bloco estático.

---

## Design do Usuário

O processo de design foi conduzido em estreita colaboração com o cliente, visando criar uma transição de estados limpa no frontend, evitando frustrações de voluntários que tentassem interagir com campanhas já finalizadas.

Abaixo estão reservados os espaços para as visões do protótipo de encerramento de eventos:

### Componente de Encerramento (Modal / Painel)

#### Versão Desktop
![Protótipo de Encerramento de Evento – Computador](../../../00_assets/imagens/prototipagem/encerrar_eventos/placeholder_desktop.png){ width="40%" style="display: block; margin: 0 auto;" }

#### Versão Mobile
![Protótipo de Encerramento de Evento – Celular](../../../00_assets/imagens/prototipagem/encerrar_eventos/placeholder_mobile.png){ width="100" style="display: block; margin: 0 auto;" }

---

## Construção

Nesta etapa de desenvolvimento, a equipe codificou as restrições estáticas e a lógica de renderização condicional no React/Next.js que desabilita os fluxos de inscrição e doação sob o status "Encerrado".

### Código Fonte
Os componentes desenvolvidos, as validações de barramento lógico e os tratamentos visuais encontram-se mapeados no repositório oficial do projeto:

**Link para o repositório/branch de desenvolvimento:** [Código Fonte da Construção - Ciclo 4](https://github.com/GUGOFO)

#### 1. Tela de Encerramento de Evento Implementada

##### Versão Desktop
![Site Real - Encerrar Evento Computador](../../../00_assets/imagens/pagina/eventos/encerrar_evento_desktop.png){ width="50%" style="display: block; margin: 0 auto;" }

##### Versão Mobile
![Site Real - Encerrar Evento Celular](../../../00_assets/imagens/pagina/eventos/encerrar_evento_mobile.png){ width="150" style="display: block; margin: 0 auto;" }

---

## Transição

A transição compreendeu a validação do desativamento dos gatilhos de submissão de payloads, o congelamento dos contadores de progresso e a correta reordenação cronológica na vitrine.

Caso queira analisar detalhadamente o comportamento estrutural do código implementado, acesse o link a seguir:

**Link para análise técnica:** [Repositório de Transição - Ciclo 4](https://github.com/GUGOFO)

---

## Histórico de Versão

| Versão | Data | Descrição | Autor(es) | Revisor(es) |
| :---: | :---: | :--- | :---: | :---: |
| 1.0 | 22/06/2026 | Documentação inicial do planejamento, design e construção do RF09 no Ciclo 4 | [Edson Pereira](https://github.com/edso-n), <br>[Gustavo Gomes](https://github.com/GUGOFO), <br>[Leonardo de Aquino](https://github.com/surpesaiajin) | Equipe |