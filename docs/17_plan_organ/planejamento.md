# Organização e Planejamento do Projeto

A condução do desenvolvimento da plataforma **Portal Entre Amigos** para a **ONG Ação Entre Amigos BSB** seguiu um processo híbrido baseado na metodologia **RAD (Rapid Application Development)** associada a ciclos iterativos de Engenharia de Requisitos. Esta abordagem garantiu que a equipe de desenvolvimento e o cliente permanecessem alinhados do início ao fim, mitigando riscos de escopo e otimizando o valor de cada entrega.

---

## 1. Quadro de Planejamento e Execução dos Ciclos

A tabela abaixo sintetiza o cronograma, as responsabilidades e a aplicação integrada das técnicas de Engenharia de Software e Engenharia de Requisitos ao longo de todas as etapas do projeto.

| Ciclo RAD | Período | Evidências de Engenharia de Software | Evidências de Engenharia de Requisitos | Resultado Evidenciado |
| :---: | :---: | :--- | :--- | :--- |
| **Ciclo 1** | 26/05 a 01/06 | - Criação do Protótipo de Alta Fidelidade no Figma (Página Inicial e Quem Somos);<br>- Codificação das páginas em ambiente frontend responsivo;<br>- Pull Request submetido e revisado por pares. | - Especificação detalhada do [RF16](../13_requisitos/requisitos.md#rf16);<br>- Aplicação de DoR (Definition of Ready) e DoD (Definition of Done) no ciclo;<br>- Escrita dos critérios de aceitação. | - Telas institucionais e informações de contato operacionais no frontend;<br>- Protótipos homologados e visual validado pelo cliente;<br>- [Ata de Reunião 6 com Cliente](../12_reunioes/atas/cliente/ata_cliente_06.md). |
| **Ciclo 2** | 26/05 a 01/06 | - Protótipo de Alta Fidelidade (Página de Campanhas e Interna de Detalhes);<br>- Construção da interface frontend em Next.js/React;<br>- Testes manuais de responsividade localmente. | - Especificação e detalhamento do [RF14](../13_requisitos/requisitos.md#rf14);<br>- Vinculação técnica à US14 do Backlog do Produto;<br>- Definição de critérios de aceitação e DoR/DoD. | - Página geral de campanhas (ativas e encerradas) e tela de detalhes operando de forma responsiva;<br>- Interfaces validadas pelo cliente;<br>- [Ata de Reunião 6 com Cliente](../12_reunioes/atas/cliente/ata_cliente_06.md). |
| **Ciclo 3** | 01/06 a 08/06 | - Codificação dos fluxos de Cadastro, Login, Perfil e Exclusão no frontend;<br>- Estruturação de componentes e estados de autenticação;<br>- Auditoria de acessibilidade nos formulários. | - Detalhamento e refinamento dos requisitos [RF01 a RF05](../13_requisitos/requisitos.md#gestao-de-usuarios);<br>- Especificação de RN-02 (Conformidade com a LGPD) e RN-04 (Sincronização de dados cadastrais);<br>- Validação de critérios de aceitação de segurança. | - Fluxo de autenticação e governança de dados pessoais homologado pelo cliente;<br>- Garantia de conformidade de apagamento de dados conforme LGPD;<br>- [Ata de Reunião 7 com Cliente](../12_reunioes/atas/cliente/ata_cliente_07.md). |
| **Ciclo 4** | 08/06 a 15/06 | - Codificação do formulário administrativo de criação, edição e exclusão de eventos/campanhas;<br>- Trava de rotas baseada em perfil de "Moderador" integrada ao frontend. | - Validação e detalhamento de [RF06, RF07 e RF08](../13_requisitos/requisitos.md#gestao-de-eventos);<br>- Aplicação estrita da RN-01 (Permissão administrativa);<br>- Testes cruzados do formulário contra critérios de aceitação. | - Painel de moderação de campanhas operando e chancelado pelo cliente;<br>- Travas de segurança validadas contra invasão de perfil por usuários comuns;<br>- [Ata de Reunião 8 com Cliente](../12_reunioes/atas/cliente/ata_cliente_08.md). |
| **Ciclo 5** | 08/06 a 15/06 | - Integração de biblioteca de gráficos (pizza e circular) na página de detalhes da campanha;<br>- Implementação de inputs e formulários de intenção de doação. | - Detalhamento dos requisitos [RF10](../13_requisitos/requisitos.md#rf10) e [RF11](../13_requisitos/requisitos.md#rf11);<br>- Aplicação da RN-03 (Bloqueio em campanhas encerradas) e RNF06 (Atualização dinâmica do progresso). | - Dashboard reativo exibindo distribuição física e financeira de metas nas campanhas;<br>- Fluxo de registro de doações validado em tempo real;<br>- [Ata de Reunião 8 com Cliente](../12_reunioes/atas/cliente/ata_cliente_08.md). |

---

## 2. Como a Engenharia de Requisitos foi Aplicada

A aplicação da Engenharia de Requisitos (ER) deu-se de forma contínua e integrada à metodologia RAD híbrida, utilizando as seguintes técnicas:

### Elicitação e Descoberta
O levantamento inicial deu-se por meio de **Entrevistas Semiestruturadas** com Carlos Vaz, representante da ONG, além de **Análise de Documentos** (diretrizes de estatuto, relatórios de campanhas e planilhas antigas). Isso garantiu a extração de necessidades de negócio legítimas, mapeando o fluxo atual que a ONG deseja automatizar.

### Análise e Consenso (Priorização)
Para evitar o excesso de escopo (*scope creep*) e assegurar a viabilidade de tempo da equipe, conduziu-se uma reunião conjunta (Ciclo 0) onde aplicou-se a técnica **MoSCoW** para categorizar cada funcionalidade. Paralelamente, utilizou-se a **Matriz de Valor x Complexidade**, cruzando o valor percebido pelo cliente com a complexidade técnica avaliada pelo time, permitindo delimitar as prioridades e fechar a estrutura do MVP.

### Declaração e Modelagem
Os requisitos elicitados foram organizados e documentados em **Épicos** e **Histórias de Usuário (US)**, cada qual contendo **Critérios de Aceitação** explícitos e regras de comportamento sistêmico. Para facilitar a compreensão geral da solução, a equipe elaborou representações como o **Rich Picture** e o **Diagrama de Contexto**, servindo como excelente apoio de comunicação visual com o cliente.

### Verificação e Validação
- **DoR (Definition of Ready):** Nenhum ciclo de codificação pôde ser iniciado sem que os requisitos correspondentes estivessem devidamente descritos, refinados e com critérios de aceite aprovados.
- **DoD (Definition of Done):** Um requisito só foi considerado implementado após passar pela verificação de conformidade com todos os seus critérios de aceitação e testes de responsividade em múltiplos navegadores.
- **Feedback e Homologação (UAT):** Realizou-se reuniões síncronas estruturadas com atas de reunião para demonstrar o progresso incremental e colher a assinatura de aceite do cliente (como documentado nas atas 6, 7 e 8).
- **Validação Assíncrona:** A partir do Ciclo 2, implementou-se o fluxo de envio periódico de fotos e vídeos rápidos de tela para o cliente Carlos a cada nova interface implementada, acelerando o tempo de resposta e evitando retrabalhos de design.

---

## 3. Evidências de Validação com o Cliente

Para demonstrar a validação das entregas de software em todas as etapas, a equipe possui como evidências as atas de reuniões síncronas mantidas na documentação:

*   **Validação dos Ciclos 1 e 2 (Telas institucionais e listagem de campanhas):** [Ata de Reunião 6 com Cliente](../12_reunioes/atas/cliente/ata_cliente_06.md)
*   **Validação do Ciclo 3 (Esteira de autenticação e governança LGPD):** [Ata de Reunião 7 com Cliente](../12_reunioes/atas/cliente/ata_cliente_07.md)
*   **Validação dos Ciclos 4 e 5 (Moderação de campanhas, gráficos de meta e doações):** [Ata de Reunião 8 com Cliente](../12_reunioes/atas/cliente/ata_cliente_08.md)

---

## Histórico de Versão

| Versão |    Data    | Descrição  | Autor(es) | Revisor(es)|
| :----: | :--------: | :--------- | :-------: | :---------: |
|  1.0   | 01/07/2026 | Criação da página de organização, planejamento e aplicação da Engenharia de Requisitos | [Artur Fernandes Galdino](https://github.com/ArturFGaldino) | Equipe |
