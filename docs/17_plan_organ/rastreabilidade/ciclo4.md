# Rastreabilidade e Evidências - Ciclo RAD 4

O **Ciclo RAD 4** focou no desenvolvimento do painel e formulários administrativos de Gestão de Eventos e Campanhas de Arrecadação, integrando regras de autorização de acessos.

---

## 1. Mapeamento de Rastreabilidade

O desdobramento estratégico deste ciclo segue a cadeia de rastreabilidade de requisitos abaixo:

| Dimensão | Detalhamento |
| :--- | :--- |
| **Problema** | Impossibilidade de moderadores criarem ou encerrarem campanhas dinamicamente, gerando gargalo logístico por dependência de alteração manual em banco/código. |
| **Objetivos Específicos** | [OE1](../../02_solucao/produto.md#oe1) - Minimizar o esforço manual necessário para gerenciar campanhas.<br>[OE3](../../02_solucao/produto.md#oe3) - Proporcionar maior visibilidade das campanhas e metas da ONG. |
| **Característica do Produto** | [CP1](../../02_solucao/produto.md#cp1) - Gestão de Eventos e Campanhas |
| **Requisitos Funcionais** | [RF06](../../13_requisitos/requisitos.md#rf06) - Criar eventos<br>[RF07](../../13_requisitos/requisitos.md#rf07) - Editar eventos<br>[RF08](../../13_requisitos/requisitos.md#rf08) - Excluir eventos<br>[RF09](../../13_requisitos/requisitos.md#rf09) - Encerrar eventos |
| **Histórias de Usuário** | [US06](../MVP/us06.md), [US07](../MVP/us07.md), [US08](../MVP/us08.md), [US09](../MVP/us09.md) |

---

## 2. Detalhamento das Evidências

As atividades de Engenharia de Software e Engenharia de Requisitos executadas neste ciclo produziram as seguintes evidências:

### A. Evidência de Design (Prototipagem)
Protótipos elaborados com foco na usabilidade do administrador da ONG, facilitando a inclusão de metas físicas (arroz, óleo, cobertores) e financeiras:

*   **Páginas Desenhadas:** Formulário de criação de evento, tela de edição de metas de doações e botões administrativos de encerramento de campanhas.
*   *Mapeamento visual no Figma:* [US06](../MVP/us06.md#prototipagem), [US07](../MVP/us07.md#prototipagem), [US08](../MVP/us08.md#prototipagem)
 
### B. Evidência de Construção (Código Fonte)
Estruturação de travas de autorização de moderadores e consistência lógica de formulários (ex: bloqueio de datas de término anteriores ao início):

*   **Arquivos Criados/Modificados:** Componentes `/admin/campanhas/criar` e `/admin/campanhas/[id]/editar`.
*   *Código fonte do ciclo:* [Repositório da Construção - Ciclo 4](https://github.com/GUGOFO)
*   *Branch de Transição:* [develop](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-PortalEntreAmigos/tree/develop)

### C. Evidência de Validação (Cliente)
*   **Reunião Síncrona:** Homologação do fluxo de moderação de campanhas e teste prático da trava de rota administrativa com o cliente Carlos.
*   *Ata de homologação correspondente:* [Ata de Reunião 8 com Cliente](../../12_reunioes/atas/cliente/ata_cliente_08.md) (Seção 3 - Homologação do Ciclo 4).

---

## 3. Critérios de Qualidade (DoR e DoD)

A aceitação e a transição deste ciclo basearam-se no cumprimento das seguintes diretrizes de qualidade:

*   **Critérios de Aceitação:** Validação da trava de perfil "Moderador" ([RN-01](../../13_requisitos/requisitos.md#regras-de-negocio)), verificação de campos obrigatórios e conformidade de layout. Detalhados em cada US: [US06](../MVP/us06.md#criterios-de-aceitacao), [US07](../MVP/us07.md#criterios-de-aceitacao), [US08](../MVP/us08.md#criterios-de-aceitacao).
*   **DoR (Definition of Ready):** Mapeados e chancelados na documentação de cada US: [US06](../MVP/us06.md#definicao-de-preparado-dor), [US07](../MVP/us07.md#definicao-de-preparado-dor), [US08](../MVP/us08.md#definicao-de-preparado-dor).
*   **DoD (Definition of Done):** Totalmente verificados e aprovados para cada US associada: [US06](../MVP/us06.md#definicao-de-pronto-dod), [US07](../MVP/us07.md#definicao-de-pronto-dod), [US08](../MVP/us08.md#definicao-de-pronto-dod).

---

## Histórico de Versão
 
| Versão |    Data    | Descrição  | Autor(es) | Revisor(es)|
| :----: | :--------: | :--------- | :-------: | :---------: |
|  1.0   | 01/07/2026 | População inicial do arquivo com detalhamento de rastreabilidade | [Artur Fernandes Galdino](https://github.com/ArturFGaldino) | Equipe |
