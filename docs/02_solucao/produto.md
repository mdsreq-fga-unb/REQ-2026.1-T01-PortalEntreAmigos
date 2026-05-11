# Características do Produto

## Introdução

As características do produto descritas a seguir representam **capacidades de alto nível** previstas para a solução. Cada característica está associada a um valor de negócio e à contribuição para os objetivos específicos (OE). **Fluxos detalhados de interação, regras de negócio pontuais e decisões de interface** (por exemplo, como o progresso de metas será exibido, ou como a baixa será registrada na prática) serão tratados em **histórias de usuário, requisitos funcionais e não funcionais**, sem misturar esse nível de detalhe com a declaração das CPs.

## Tabela Características do Produto

| ID | Característica de Produto (CP) | Descrição | Valor de negócio principal | Contribuição principal | Contribuição secundária |
| :--: | :--: | :---: | :---: | :---: | :--: |
| CP1 {#cp01} | Gestão de Eventos e Campanhas | Capacidade para a ONG **planejar e administrar** eventos e campanhas (datas, pontos de coleta, necessidades e **metas de arrecadação** por tipo de contribuição). | Centralizar a definição do que precisa ser arrecadado e onde, em substituição a anúncios longos e dispersos em grupos de mensagens. | [OE1](objetivo.md#oe01) | [OE3](objetivo.md#oe03) |
| CP2 {#cp02} | Vitrine de Necessidades das Campanhas | Capacidade de **divulgar** campanhas ativas e de **acompanhar o andamento** das arrecadações em relação às metas definidas pela ONG, de forma compreensível para voluntários e equipe. | Reduzir dependência de atualizações manuais repetidas (“o que falta”) e dar clareza sobre o estado de cada campanha. | [OE3](objetivo.md#oe03) | [OE4](objetivo.md#oe04) |
| CP3 {#cp03} | Registro Formal de Intenção de Doação | Capacidade de **registrar de forma estruturada** a intenção de contribuição (itens físicos e/ou valores), permitindo **antecipar** o que se espera receber antes da entrega nos pontos de coleta. | Melhorar previsibilidade para logística e estoque, formalizando o compromisso fora do fluxo exclusivo de mensagens soltas. | [OE4](objetivo.md#oe04) | [OE1](objetivo.md#oe01) |
| CP4 {#cp04} | Painel de Recebimento e Baixa | Capacidade, para perfis autorizados, de **conferir** intenções registradas e **registrar o recebimento físico** vinculado aos pontos de coleta, mantendo o registro alinhado à realidade das entregas. | Reduzir planilhas paralelas e retrabalho na conferência entre o prometido e o recebido. | [OE1](objetivo.md#oe01) | [OE5](objetivo.md#oe05) |
| CP5 {#cp05} | Consolidação e Relatórios de Campanhas | Capacidade de **compilar** informações de campanhas encerradas (previsto x entregue, contribuições relevantes) para apoio à **prestação de contas** e à gestão. | Reduzir esforço manual de consolidação e apoiar transparência com voluntários e partes interessadas. | [OE2](objetivo.md#oe02) | [OE5](objetivo.md#oe05) |
| CP6 {#cp06} | Perfil e Histórico do Voluntário | Capacidade de manter, para usuários autenticados, **visão do histórico** de participação e do **status** das intenções de doação em andamento. | Fortalecer confiança e continuidade do engajamento, com registro centralizado em vez de disperso em conversas. | [OE5](objetivo.md#oe05) | [OE4](objetivo.md#oe04) |
| CP7 {#cp07} | Gestão de Acessos e Perfis | Capacidade de **controlar permissões** (por exemplo, voluntário **versus** equipe/moderador), protegendo dados e operações sensíveis da gestão de campanhas e recebimentos. | Assegurar que cada perfil acesse apenas o que lhe compete, em linha com boas práticas de segurança e governança de dados. | [OE1](objetivo.md#oe01) | [OE6](objetivo.md#oe06) |

**Nota (requisitos não funcionais / viabilidade):** decisões de **arquitetura, hospedagem, provedores e limites de custo** (incluindo a meta de **ausência de custo recorrente** para a ONG) complementam o OE6 e serão documentadas como **RNFs / restrições de projeto**, e não como texto desta tabela de características de produto.

## Histórico de versão

| Versão |    Data    | Descrição  | Autor(es) | Revisor(es)|
| :----: | :--------: | :--------- | :-------: | :---------: |
|  1.0   | 12/04/2026 | Criação da página    |  [Guilherme](https://github.com/GuilhermeOliveira1327)  | [Gustavo](https://github.com/GUGOFO) |
|  1.1   | 11/05/2026 | Revisão das CP: nível de abstração alinhado a CP (remoção de detalhes de UI/RN/arquitetura); CP7 focada em acessos; nota sobre RNFs e OE6. | [Kaio Amoury](https://github.com/KaioAmouryUnB) | Equipe |
