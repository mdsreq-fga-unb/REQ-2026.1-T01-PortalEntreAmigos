# Rastreabilidade e Evidências - Ciclo RAD 1

O **Ciclo RAD 1** focou no desenvolvimento da estrutura institucional inicial do Portal Entre Amigos, garantindo que novos visitantes e potenciais doadores tivessem acesso facilitado às informações de identidade e contatos da ONG.

---

## 1. Mapeamento de Rastreabilidade

O desdobramento estratégico deste ciclo segue a cadeia de rastreabilidade de requisitos abaixo:

| Dimensão | Detalhamento |
| :--- | :--- |
| **Problema** | Falta de um canal digital institucional centralizado dificulta o engajamento e a divulgação da ONG. |
| **Objetivos Específicos** | [OE3](../../02_solucao/produto.md#oe3) - Proporcionar maior visibilidade das campanhas e necessidades da ONG.<br>[OE4](../../02_solucao/produto.md#oe4) - Facilitar o engajamento de voluntários. |
| **Característica do Produto** | [CP8](../../02_solucao/produto.md#cp8) - Portal Institucional e Comunicação |
| **Requisito Funcional** | [RF16](../../13_requisitos/requisitos.md#rf16) - Exibir informações institucionais |
| **História de Usuário** | [US16](../MVP/us16.md) - Como visitante, quero acessar informações institucionais para conhecer a história e contatos da ONG. |

---

## 2. Detalhamento das Evidências

As atividades de Engenharia de Software e Engenharia de Requisitos executadas neste ciclo produziram as seguintes evidências:

### A. Evidência de Design (Prototipagem)
Foi desenhado o protótipo de alta fidelidade para as interfaces institucionais, contemplando versões responsivas para dispositivos móveis e desktops:

*   **Página Inicial (Home)**: Banner principal, resumo de impacto e contatos.
*   **Página Quem Somos**: História da organização, missão, visão e valores.
*   *Mapeamento visual no Figma:* [US16](../MVP/us16.md#prototipagem)
 
### B. Evidência de Construção (Código Fonte)
O código frontend foi implementado utilizando componentes reutilizáveis em React/Next.js e estilizado com CSS modular responsivo:

*   **Arquivos Criados/Modificados:** Componentes de navegação, cabeçalho, rodapé e as páginas `/index` e `/quem-somos`.
*   *Código fonte do ciclo:* [Repositório da Construção - Ciclo 1](https://github.com/GuilhermeOliveira1327)
*   *Branch de Transição:* [develop](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-PortalEntreAmigos/tree/develop)
 
### C. Evidência de Validação (Cliente)
*   **Reunião Síncrona:** Homologação visual conduzida com os representantes da ONG em chamada Teams.
*   *Ata de homologação correspondente:* [Ata de Reunião 6 com Cliente](../../12_reunioes/atas/cliente/ata_cliente_06.md) (Seção 3 - Validação dos Ciclos 1 e 2).
 
---
 
## 3. Critérios de Qualidade (DoR e DoD)
 
A aceitação e a transição deste ciclo basearam-se no cumprimento das seguintes diretrizes de qualidade:
 
*   **Critérios de Aceitação:** Verificação das informações institucionais, contatos e layout responsivo. Evidências disponíveis em [US16](../MVP/us16.md#criterios-de-aceitacao).
*   **DoR (Definition of Ready) e DoD (Definition of Done):** Totalmente revisados e marcados como concluídos. Evidências disponíveis em [US16](../MVP/us16.md#definicao-de-preparado-dor) e [US16](../MVP/us16.md#definicao-de-pronto-dod).
 
---
 
## Histórico de Versão
 
| Versão |    Data    | Descrição  | Autor(es) | Revisor(es)|
| :----: | :--------: | :--------- | :-------: | :---------: |
|  1.0   | 01/07/2026 | População inicial do arquivo com detalhamento de rastreabilidade | [Artur Fernandes Galdino](https://github.com/ArturFGaldino) | Equipe |
