# BACKLOG DO PRODUTO

Aqui, cabe destacar que todas as histórias de usuários relacionadas a seguir são derivadas da lista de requisitos funcionais apresentada anteriormente neste documento. Esta é uma lista preliminar e deverá sofrer ajustes sempre que necessário, durante o desenvolvimento do produto do **Portal Entre Amigos**.

## Backlog Geral

A tabela a seguir apresenta cada um dos requisitos funcionais (RFs) declarados utilizando a técnica de user story (US), assim como a rastreabilidade com os requisitos não funcionais (RNFs).

| RF | User Story derivada | Principal RNF relacionado |
| :--- | :--- | :--- |
| **RF01** Cadastrar Usuário | **US01** Como voluntário, quero cadastrar a minha conta, para conseguir realizar promessas de doação e registar o meu histórico. | **RNF03** - Criptografia de Senhas |
| **RF02** Login de usuário | **US02** Como utilizador, quero realizar o login, para aceder ao meu perfil com segurança na plataforma. | **RNF03** - Criptografia de Senhas |
| **RF03** Visualizar perfil | **US03** Como voluntário, quero visualizar o meu perfil, para acompanhar o meu histórico de doações e eventos participados. | **RNF01** - Responsividade |
| **RF04** Editar perfil | **US04** Como voluntário, quero editar o meu perfil, para manter as minhas informações de contacto atualizadas para a ONG. | **RNF07** - Persistência de Dados |
| **RF05** Excluir conta | **US05** Como voluntário, quero excluir a minha conta, para remover os meus dados pessoais do sistema caso não deseje mais participar. | **RNF03** - Criptografia de Senhas |
| **RF06** Criar eventos | **US06** Como moderador, quero criar novos eventos, para iniciar uma nova campanha de arrecadação da ONG. | **RNF04** - Controle de Acesso |
| **RF07** Editar eventos | **US07** Como moderador, quero editar eventos, para corrigir metas ou informações logísticas de campanhas em andamento. | **RNF04** - Controle de Acesso |
| **RF08** Excluir eventos | **US08** Como moderador, quero excluir eventos, para remover campanhas registadas indevidamente ou canceladas | **RNF04** - Controle de Acesso |
| **RF09** Encerrar eventos | **US09** Como moderador, quero encerrar eventos, para sinalizar ao público que a arrecadação daquela campanha foi finalizada. | **RNF04** - Controle de Acesso |
| **RF10** Exibir progresso da meta | **US10** Como voluntário, quero exibir o progresso da meta, para saber em tempo real quanto falta para atingir o objetivo de arrecadação da campanha. | **RNF06** - Atualização Dinâmica |
| **RF11** Registrar doações | **US11** Como voluntário, quero registar a minha intenção de doação, para informar antecipadamente à ONG o que irei entregar no ponto de recolha. | **RNF07** - Persistência de Dados |
| **RF12** Atualizar saldo | **US12** Como moderador, quero atualizar o saldo de itens, para manter o stock digital fiel às entregas físicas recebidas. | **RNF04** - Controle de Acesso |
| **RF13** Confirmar recebimento de doação | **US13** Como moderador, quero confirmar o recebimento de uma doação, para dar baixa na promessa feita pelo voluntário. | **RNF04** - Controle de Acesso |
| **RF14** Exibir eventos | **US14** Como voluntário, quero exibir a vitrine de eventos ativos, para escolher qual campanha da ONG desejo ajudar. | **RNF06** - Atualização Dinâmica |
| **RF15** Realizar inscrição em eventos | **US15** Como voluntário, quero realizar a inscrição nos eventos, para confirmar a minha atuação presencial no dia da ação | **RNF07** - Persistência de Dados |
| **RF16** Exibir informações institucionais | **US16** Como visitante, quero aceder às informações institucionais, para conhecer melhor a história, o impacto e os contactos da ONG. | **RNF01** - Responsividade |
| **RF17** Visualizar Comprovantes | **US17** Como moderador, quero visualizar os comprovantes enviados, para auditar e validar as doações financeiras. | **RNF04** - Controle de Acesso |
| **RF18** Enviar notas fiscais | **US18** Como moderador, quero anexar notas fiscais, para registar formalmente os custos logísticos e compras realizadas com o fundo da ONG. | **RNF04** - Controle de Acesso |
| **RF19** Gerar relatório de informações do evento | **US19** Como moderador, quero gerar relatórios de encerramento do evento, para agilizar a prestação de contas com os voluntários. | **RNF04** - Controle de Acesso |

- **Observação:** Os Requisitos Não Funcionais Globais **(RNF01 - Responsividade, RNF02 - Tempo de Resposta, RNF05 - Compatibilidade entre Navegadores e RNF07 - Persistência de Dados)** aplicam-se transversalmente a todas as características de produto, requisitos funcionais e user stories, por definirem a base tecnológica, o desempenho e a usabilidade de toda a solução. Assim, embora tenham sido apontados explicitamente em suas contribuições principais na matriz acima para fins de completude visual, eles regem o comportamento de todo o produto de forma integral.