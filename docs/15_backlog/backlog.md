# BACKLOG DO PRODUTO

Aqui, cabe destacar que todas as histórias de usuários relacionadas a seguir são derivadas da lista de requisitos funcionais apresentada anteriormente neste documento. Esta é uma lista preliminar e deverá sofrer ajustes sempre que necessário, durante o desenvolvimento do produto do **Portal Entre Amigos**.

## Backlog Geral

A tabela a seguir apresenta cada um dos requisitos funcionais (RFs) declarados utilizando a técnica de user story (US), assim como a rastreabilidade com os requisitos não funcionais (RNFs).

| RF | US | User Story derivada | Principal RNF relacionado |
| :--- | :--- | :--- | :---- |
| [RF01](../13_requisitos/requisitos.md#rf01) Cadastrar usuário | <a id="us01"></a>US01 | Como voluntário, quero cadastrar a minha conta, para conseguir realizar promessas de doação e registrar o meu histórico. | [RNF03](../13_requisitos/requisitos.md#rnf03) - Criptografia de Senhas |
| [RF02](../13_requisitos/requisitos.md#rf02) Login de usuário | <a id="us02"></a>US02 | Como voluntario, quero realizar o login, para acessar o meu perfil com segurança na plataforma. | [RNF03](../13_requisitos/requisitos.md#rnf03) - Criptografia de Senhas |
| [RF03](../13_requisitos/requisitos.md#rf03) Visualizar perfil | <a id="us03"></a>US03 | Como voluntário, quero visualizar o meu perfil, para que eu possa ver meus dados cadastrados | [RNF01](../13_requisitos/requisitos.md#rnf01) - Responsividade |
| [RF04](../13_requisitos/requisitos.md#rf04) Editar perfil | <a id="us04"></a>US04 | Como voluntário, quero editar o meu perfil, para manter as minhas informações de contato atualizadas para a ONG. | [RNF07](../13_requisitos/requisitos.md#rnf07) - Persistência de Dados |
| [RF05](../13_requisitos/requisitos.md#rf05) Excluir conta | <a id="us05"></a>US05 | Como voluntário, quero excluir a minha conta, para remover os meus dados pessoais do sistema caso não deseje mais participar. | [RNF08](../13_requisitos/requisitos.md#rnf08) - Privacidade e Conformidade (LGPD) |
| [RF06](../13_requisitos/requisitos.md#rf06) Criar eventos | <a id="us06"></a>US06 | Como moderador, quero criar novos eventos, para iniciar uma nova campanha de arrecadação da ONG. | [RNF04](../13_requisitos/requisitos.md#rnf04) - Validação de Tokens |
| [RF07](../13_requisitos/requisitos.md#rf07) Editar eventos | <a id="us07"></a>US07 | Como moderador, quero editar eventos, para corrigir metas ou informações logísticas de campanhas em andamento. | [RNF04](../13_requisitos/requisitos.md#rnf04) - Validação de Tokens |
| [RF08](../13_requisitos/requisitos.md#rf08) Excluir eventos | <a id="us08"></a>US08 | Como moderador, quero excluir eventos, para remover campanhas registadas indevidamente ou canceladas | [RNF04](../13_requisitos/requisitos.md#rnf04) - Validação de Tokens |
| [RF09](../13_requisitos/requisitos.md#rf09) Encerrar eventos | <a id="us09"></a>US09 | Como moderador, quero encerrar eventos, para sinalizar ao público que a arrecadação daquela campanha foi finalizada. | [RNF04](../13_requisitos/requisitos.md#rnf04) - Validação de Tokens |
| [RF10](../13_requisitos/requisitos.md#rf10) Exibir progresso da meta | <a id="us10"></a>US10 | Como voluntário, quero exibir o progresso da meta, para saber em tempo real quanto falta para atingir o objetivo de arrecadação da campanha. | [RNF06](../13_requisitos/requisitos.md#rnf06) - Atualização Dinâmica |
| [RF11](../13_requisitos/requisitos.md#rf11) Registrar doação | <a id="us11"></a>US11 | Como voluntário, quero registrar a minha intenção de doação, para informar antecipadamente à ONG o que irei entregar no ponto de entrega. | [RNF07](../13_requisitos/requisitos.md#rnf07) - Persistência de Dados |
| [RF12](../13_requisitos/requisitos.md#rf12) Atualizar saldo | <a id="us12"></a>US12 | Como moderador, quero atualizar o saldo de itens, para manter o estoque digital fiel às entregas físicas recebidas. | [RNF04](../13_requisitos/requisitos.md#rnf04) - Validação de Tokens |
| [RF13](../13_requisitos/requisitos.md#rf13) Confirmar recebimento de doação | <a id="us13"></a>US13 | Como moderador, quero confirmar o recebimento de uma doação, para dar baixa na promessa feita pelo voluntário. | [RNF04](../13_requisitos/requisitos.md#rnf04) - Validação de Tokens |
| [RF14](../13_requisitos/requisitos.md#rf14) Exibir eventos | <a id="us14"></a>US14 | Como voluntário, quero exibir a vitrine de eventos ativos, para escolher qual campanha da ONG desejo ajudar. | [RNF06](../13_requisitos/requisitos.md#rnf06) - Atualização Dinâmica |
| [RF15](../13_requisitos/requisitos.md#rf15) Realizar inscrição em eventos | <a id="us15"></a>US15 | Como voluntário, quero realizar a inscrição nos eventos, para confirmar a minha atuação presencial no dia da ação | [RNF07](../13_requisitos/requisitos.md#rnf07) - Persistência de Dados |
| [RF16](../13_requisitos/requisitos.md#rf16) Exibir informações institucionais | <a id="us16"></a>US16 | Como visitante, quero acessar às informações institucionais, para conhecer melhor a história, o impacto e os contatos da ONG. | [RNF01](../13_requisitos/requisitos.md#rnf01) - Responsividade |
| [RF17](../13_requisitos/requisitos.md#rf17) Visualizar comprovantes | <a id="us17"></a>US17 | Como voluntario, quero visualizar os comprovantes enviados. | [RNF04](../13_requisitos/requisitos.md#rnf04) - Validação de Tokens |
| [RF18](../13_requisitos/requisitos.md#rf18) Enviar notas fiscais | <a id="us18"></a>US18 | Como moderador, quero anexar notas fiscais, para registrar formalmente os custos logísticos e compras realizadas com o fundo da ONG. | [RNF10](../13_requisitos/requisitos.md#rnf10) - Segurança e Validação de Uploads |
| [RF19](../13_requisitos/requisitos.md#rf19) Gerar relatório de informações do evento | <a id="us19"></a>US19 | Como moderador, quero gerar relatórios de encerramento do evento, para agilizar a prestação de contas com os voluntários. | [RNF04](../13_requisitos/requisitos.md#rnf04) - Validação de Tokens |

- **Observação:** Os Requisitos Não Funcionais Globais ([RNF01](../13_requisitos/requisitos.md#rnf01) - Responsividade, [RNF02](../13_requisitos/requisitos.md#rnf02) - Tempo de Resposta, [RNF05](../13_requisitos/requisitos.md#rnf05) - Compatibilidade entre Navegadores, [RNF07](../13_requisitos/requisitos.md#rnf07) - Persistência de Dados, [RNF09](../13_requisitos/requisitos.md#rnf09) - Acessibilidade Mínima ) aplicam-se transversalmente a todas as características de produto, requisitos funcionais e user stories, por definirem a base tecnológica, o desempenho, a segurança e a usabilidade de toda a solução. Assim, embora tenham sido apontados explicitamente em suas contribuições principais na matriz acima para fins de completude visual, eles regem o comportamento de todo o produto de forma integral.


| Versão |    Data    | Descrição  | Autor(es) | Revisor(es)|
| :----: | :--------: | :--------- | :-------: | :---------: |
|  1.0   | 17/05/2026 | Criação da página    |  [Edson](https://github.com/edso-n), [Leonardo](https://github.com/surpesaiajin), [Gustavo](https://github.com/GUGOFO)  |Equipe |
| 2.0 | 18/05/2026 | Divisão do backlog e sua priorização| [Guilherme](https://github.com/GuilhermeOliveira1327) | Equipe |
| 3.0 | 27/06/2026 | Adicionar RNFs | [Gustavo Gomes](https://github.com/GUGOFO) | Equipe |