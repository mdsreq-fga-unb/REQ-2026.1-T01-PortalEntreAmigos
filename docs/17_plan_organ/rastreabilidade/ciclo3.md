# Rastreabilidade e Evidências - Ciclo RAD 3

O **Ciclo RAD 3** implementou a esteira completa de autenticação, login, perfil e governança de dados pessoais (exclusão de conta sob conformidade da LGPD).

---

## 1. Mapeamento de Rastreabilidade

O desdobramento estratégico deste ciclo segue a cadeia de rastreabilidade de requisitos abaixo:

| Dimensão | Detalhamento |
| :--- | :--- |
| **Problema** | Falta de controle de perfis de voluntários, inviabilidade de auditoria de quem realiza doações e descumprimento de obrigações legais da LGPD na coleta de dados. |
| **Objetivos Específicos** | [OE1](../../02_solucao/produto.md#oe1) - Minimizar o esforço manual para gerenciar doações.<br>[OE4](../../02_solucao/produto.md#oe4) - Facilitar o engajamento dos voluntários.<br>[OE5](../../02_solucao/produto.md#oe5) - Centralizar o histórico e fluxo em único ambiente. |
| **Características do Produto** | [CP6](../../02_solucao/produto.md#cp6) - Perfil e Histórico do Voluntário<br>[CP7](../../02_solucao/produto.md#cp7) - Gestão de Acessos e Permissões |
| **Requisitos Funcionais** | [RF01](../../13_requisitos/requisitos.md#rf01) - Cadastrar usuário<br>[RF02](../../13_requisitos/requisitos.md#rf02) - Login de usuário<br>[RF03](../../13_requisitos/requisitos.md#rf03) - Visualizar perfil<br>[RF04](../../13_requisitos/requisitos.md#rf04) - Editar perfil<br>[RF05](../../13_requisitos/requisitos.md#rf05) - Excluir conta |
| **Histórias de Usuário** | [US01](../MVP/us01.md), [US02](../MVP/us02.md), [US03](../MVP/us03.md), [US04](../MVP/us04.md), [US05](../MVP/us05.md) |

---

## 2. Detalhamento das Evidências

As atividades de Engenharia de Software e Engenharia de Requisitos executadas neste ciclo produziram as seguintes evidências:

### A. Evidência de Design (Prototipagem)
Estruturação visual de fluxos de login e formulários de cadastro com padrões de feedback dinâmico para validações de regras de segurança:

*   **Páginas Desenhadas:** Login, Cadastro de Conta, Tela de Perfil do Usuário e modal de confirmação de exclusão.
*   *Mapeamento visual no Figma:* [US01](../MVP/us01.md#prototipagem), [US02](../MVP/us02.md#prototipagem), [US03](../MVP/us03.md#prototipagem), [US04](../MVP/us04.md#prototipagem), [US05](../MVP/us05.md#prototipagem)

### B. Evidência de Construção (Código Fonte)
O frontend em Next.js/React foi codificado contendo validações contra injeção de caracteres inválidos, testes de regex de senha forte e tratamento de sessões:

*   **Arquivos Criados/Modificados:** `/cadastro`, `/login`, `/perfil`.
*   *Código fonte do ciclo:* [Repositório da Construção - Ciclo 3](https://github.com/GUGOFO)
*   *Branch de Transição:* [develop](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-PortalEntreAmigos/tree/develop)

### C. Evidência de Validação (Cliente)
*   **Reunião Síncrona:** Realizada para demonstração do formulário e validação das regras de negócio de apagamento irreversível de dados no banco (RN-02).
*   *Ata de homologação correspondente:* [Ata de Reunião 7 com Cliente](../../12_reunioes/atas/cliente/ata_cliente_07.md).

---

## 3. Critérios de Qualidade (DoR e DoD)

A aceitação e a transição deste ciclo basearam-se no cumprimento das seguintes diretrizes de qualidade:

*   **Critérios de Aceitação:** Validação da criptografia de senhas ([RNF03](../../13_requisitos/requisitos.md#rnf03)), restrição de unicidade de e-mail e regras de senhas fortes. Detalhados em cada US individual: [US01](../MVP/us01.md#criterios-de-aceitacao), [US02](../MVP/us02.md#criterios-de-aceitacao), [US03](../MVP/us03.md#criterios-de-aceitacao), [US04](../MVP/us04.md#criterios-de-aceitacao), [US05](../MVP/us05.md#criterios-de-aceitacao).
*   **DoR (Definition of Ready):** Mapeados e chancelados na documentação de cada US: [US01](../MVP/us01.md#definicao-de-preparado-dor), [US02](../MVP/us02.md#definicao-de-preparado-dor), [US03](../MVP/us03.md#definicao-de-preparado-dor), [US04](../MVP/us04.md#definicao-de-preparado-dor), [US05](../MVP/us05.md#definicao-de-preparado-dor).
*   **DoD (Definition of Done):** Totalmente revisados e marcados como concluídos: [US01](../MVP/us01.md#definicao-de-pronto-dod), [US02](../MVP/us02.md#definicao-de-pronto-dod), [US03](../MVP/us03.md#definicao-de-pronto-dod), [US04](../MVP/us04.md#definicao-de-pronto-dod), [US05](../MVP/us05.md#definicao-de-pronto-dod).

---

## Histórico de Versão

| Versão |    Data    | Descrição  | Autor(es) | Revisor(es)|
| :----: | :--------: | :--------- | :-------: | :---------: |
|  1.0   | 01/07/2026 | População inicial do arquivo com detalhamento de rastreabilidade | [Artur Fernandes Galdino](https://github.com/ArturFGaldino) | Equipe |
