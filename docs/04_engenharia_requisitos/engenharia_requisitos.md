# Engenharia de Requisitos

A Engenharia de Requisitos é responsável por identificar, analisar, documentar e gerenciar as necessidades do sistema ao longo do desenvolvimento do projeto. Nesta seção, são apresentadas as principais atividades e técnicas utilizadas pela equipe, com o objetivo de garantir o correto entendimento dos requisitos e o alinhamento contínuo com as expectativas do cliente.

## Atividades e Técnicas de ER

### Elicitação e Descoberta: 

- **Entrevistas Semiestruturadas**: Reuniões para extrair informações acerca das necessidades do cliente.

- **Análise de Documentos**: Examinar documentação existente sobre o domínio e o contexto do cliente, buscando possíveis requisitos funcionais e não funcionais, além de compreender regras de negócio pré-estabelecidas.

### Análise e Consenso:

- **MoSCoW**: Classificação dos requisitos em quatro grupos (obrigatórios, importantes, desejáveis e fora do escopo atual) em reunião com o cliente, para priorizar o essencial e garantir a transparência às decisões de escopo.

- **Matriz de Avaliação Técnica x Valor de Negócio**: Utilização de uma grade de posicionamento dos requisistos que cruza o valor percebido pelo cliente e a complexidade/esforço técnico estimado pela equipe de desenvolvimento. Fornecendo uma visão mais clara de possíveis entregas rápidas (alto valor e baixa complexidade).

### Declaração de Requisitos:

- **Declaração Orientada a valor**: Declaração associada ao benefício esperado e utilizando de narrativas curtas, Épicos e histórias de usuário. Visando melhor visualização de prioridades e facilitando a compreensão geral dos requisitos sempre alinhada ao propósito do projeto.

- **Critérios de aceite**: Cada história de usuário possuirá um conjunto de condições e regras de negócio claras e testáveis que o software deve satisfazer para ser considerado concluído.

### Representação de Requisitos:

- **Rich Picture**: Representação visual e menos formal dos requisitos, utilizando de metáforas e símbolos conhecidos, visando melhor compreensão dos stakeholders e da equipe em geral.

- **Diagrama de contexto**: Diagramas simples com foco em representar as interfaces e o fluxo de interação do sistema com elementos externos.

- **Protótipos de baixa fidelidade**: Representações simples e interativas que simulam a navegação e o comportamento básico do sistema. Garantindo que o cliente perceba de forma visual e clara as funcionalidades do sistema. 

### Verificação e Validação de Requisitos:

- **Feedback do Cliente**: Reunião focada na revisão de artefatos ou protótipos para confirmar se os requisitos capturados refletem a real necessidade do negócio, eliminando ambiguidades, erros de interpretação ou funcionalidades desnecessárias.

- **Revisão por pares (Peer Review)**: Consiste na análise dos artefatos de requisitos por uma pessoa além do autor, com o objetivo de detectar erros, omissões ou inconsistências antes que o documento seja finalizado.

- **DoR (Definition of Ready)**: Conjunto de critérios que um requisito deve satisfazer para que possa ser considerado "pronto" para iniciar o desenvolvimento, garantindo que a equipe tenha clareza e informações suficientes para trabalhar.

- **DoD (Definition of Done)**: Lista de verificação final que determina se um requisito foi completamente implementado e testado, assegurando que ele atenda aos padrões de qualidade e esteja pronto para ser entregue ao cliente.

### Organização e Atualização de Requisitos:

- **Revisões periódicas**: Sessões periódicas realizadas ao longo de cada iteração para revisar, detalhar e repriorizar itens do Backlog do Produto.

- **Backlog do Produto**: Funcionará como uma lista viva de requisitos, estruturada em épicos e histórias de usuário. O backlog será continuamente priorizado e refinado com base no valor entregue ao cliente. Para garantir o controle e o acompanhamento de cada item, desde a sua concepção até a validação, implementaremos uma cadeia de rastreabilidade que seguirá a ordem de objetivos específicos, desdobrando-se em características do produto e culminando, por fim, no requisito.

## Engenharia de Requisitos e Processo RAD Híbrido

|Fases do Processo| Atividades ER | Prática | Técnica | Resultado Esperado| 
| :---: | :---: | :---: | :---: | :---: | 
| Planeamento de Requisitos| Elicitação e Descoberta | Levantamento do fluxo atual e necessidades | Entrevistas com o Carlos Vaz, Análise de documentação | Escopo macro do projeto definido, dores mapeadas e objetivos de negócio alinhados |
| Planeamento de Requisitos | Análise e Consenso | Definição de Prioridades | MoSCoW, Matriz de Avaliação Técnica x Valor  | Funcionalidades essenciais acordadas | 
| Planeamento de Requisitos | Declaração | Registo Inicial | Criação de lista de Requisitos de Alto Nível (Épicos). | Documentação clara do que precisa ser resolvido antes de iniciar os protótipos. | 
| Planejamento de Requisitos| Organização e Atualização | Reuniões semanas da equipe de desenvolvimento buscando a priorização e atualização contínua do Product Backlog | Revisão do Product Backlog | Manter os requisitos relevantes para o projeto, estimando corretamente o tempo necessário e a necessidade dos requisitos. | 
| Planejamento de Requisitos| Verificação e Validação | Revisão e Aprovação do Escopo Inicial | Reunião de validação de requisitos com o cliente e Análise de Viabilidade Técnica preliminar. | Confirmação de que os requisitos definidos resolvem o problema correto, mitigação de riscos iniciais e consenso formal para avançar para a fase de Design (Prototipagem).| 
| Design do Usuário | Representação | Modelagem Visual e Prototipagem | Wireframes, Criação de Protótipos Interativos  | Representação visual clara das interfaces, permitindo ao cliente visualizar a solução.| 
|Design do Usuário | Organização e Atualização | Refinamento Iterativo | Atualização contínua dos requisitos baseada no feedback do protótipo. | Requisitos funcionais ajustados à realidade validada pelo cliente, prontos para construção. | 
| Design do Usuário| Verificação e Validação | Feedback com o cliente, DoR, DoD e Revisão por pares | Teste de Aceitação do Utilizador com simulação de evento real, antecedido por um conjunto de critérios de qualidade. | Garantir que a equipe de desenvolvimento está entregando o produto certo e que ele foi construido de maneira correta. | 
| Construção | Análise e Consenso | Resolução de Detalhes Técnicos | Discussões diárias da equipa de desenvolvimento. | Entendimento claro de como integrar o frontend com o backend/base de dados. | 
| Transição| Verificação e Validação | Testes Contínuos | Testes cruzados com os Critérios de Aceitação. | Código validado funcionalmente, garantindo que o que foi codificado corresponde ao protótipo aprovado | 
| Transição | Verificação e Validação | Aceitação Final (UAT) | Teste de Aceitação do Utilizador com simulação de evento real. | Plataforma validada no contexto real da ONG, garantindo a substituição das planilhas. |


## Histórico de versão

| Versão |    Data    | Descrição  | Autor(es) | Revisor(es)|
| :----: | :--------: | :--------- | :-------: | :---------: |
|  1.0   | 12/04/2026 | Criação da página    |  [Guilherme](https://github.com/GuilhermeOliveira1327)  | [Gustavo](https://github.com/GUGOFO) |
|  2.0   | 09/05/2026 | Atualização de tópicos   |  [Edson](https://github.com/edso-n)  |  |
|  2.1   | 16/05/2026 | Atualização de tópicos   |  [Edson](https://github.com/edso-n)  |  |
|  2.2   | 16/05/2026 | Atualização de tópicos   |  [Edson](https://github.com/edso-n)  |  |
