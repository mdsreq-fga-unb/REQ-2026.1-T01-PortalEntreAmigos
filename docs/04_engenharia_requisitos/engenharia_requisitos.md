# Engenharia de Requisitos

A Engenharia de Requisitos é responsável por identificar, analisar, documentar e gerenciar as necessidades do sistema ao longo do desenvolvimento do projeto. Nesta seção, são apresentadas as principais atividades e técnicas utilizadas pela equipe, com o objetivo de garantir o correto entendimento dos requisitos e o alinhamento contínuo com as expectativas do cliente.

## Atividades e Técnicas de ER

### Elicitação e Descoberta: 

- **Entrevistas Semiestruturadas**: Reuniões para extrair informações acerca das necessidades do cliente, baseada em um roteiro guia.

- **User Story Mapping**: Organização de requisitos com base no ponto de vista da jornada do usuário, criando um esqueleto das atividades a serem realizadas facilitando a organização de cada iteração.

### Análise e Consenso:

- **MoSCoW**: Classificação dos requisitos em quatro grupos (obrigatórios, importantes, desejáveis e fora do escopo atual) em reunião com o cliente, para priorizar o essencial e garantir a transparência às decisões de escopo.

### Declaração de Requisitos:

- **Declaração Orientada a valor**: Declaração associada ao benefício esperado e utilizando de narrativas curtas, Épicos e histórias de usuário. Visando melhor visualização de prioridades e facilitando a compreensão geral dos requisitos sempre alinhada ao propósito do projeto.

- **Catálogos e artefatos técnicos**: Apoiado na declaração orientada a valor, aqui entra o Product Backlog que consolida as histórias de usuário em uma estrutura formal, sendo um catálogo vivo dos requisitos.

### Representação de Requisitos:

- **Rich Picture**: Representação visual e menos formal dos requisitos, utilizando de metáforas e símbolos conhecidos, visando melhor compreensão dos stakeholders e da equipe em geral.

- **Diagrama de contexto**: Diagramas simples com foco em representar as interfaces e o fluxo de interação do sistema com elementos externos.

### Verificação e Validação de Requisitos:

- **Protótipos de baixa fidelidade**: Representações simples e interativas que simulam a navegação e o comportamento básico do sistema. Garantindo que o cliente perceba de forma visual e clara as funcionalidades do sistema. 

- **Critérios de aceite**: Cada história de usuário possuirá um conjunto de condições e regras de negócio claras e testáveis que o software deve satisfazer para ser considerado “Pronto”.

### Organização e Atualização de Requisitos:

- **Backlog do Produto**: Atuará como uma lista de requisitos viva, estruturada no formato de épicos e histórias de usuário. Será continuamente priorizada e atualizada com base no valor entregue ao cliente.

- **Revisões periódicas**: Sessões periódicas realizadas ao longo de cada iteração para revisar, detalhar e repriorizar itens do Backlog do Produto.

- **Gestão visual via Kanban**: Utilização de quadros ágeis para mapear o fluxo de vida útil dos requisitos.

## Engenharia de Requisitos e Processo RAD

|Fases do Processo| Atividades ER | Prática | Técnica | Resultado Esperado| 
| :---: | :---: | :---: | :---: | :---: | 
| Planeamento de Requisitos| Elicitação e Descoberta | Levantamento do fluxo atual e necessidades | Entrevistas com o Carlos Vaz, Análise do fluxo manual | Escopo macro do projeto definido, dores mapeadas e objetivos de negócio alinhados |
| Planeamento de Requisitos | Análise e Consenso | Definição de Prioridades | MoSCoW, Análise de Viabilidade | Funcionalidades essenciais acordadas | 
| Planeamento de Requisitos | Declaração | Registo Inicial | Criação de lista de Requisitos de Alto Nível (Épicos). | Documentação clara do que precisa ser resolvido antes de iniciar os protótipos. | 
| Design do Utilizador (Prototipagem) | Representação | Modelagem Visual e Prototipagem | Wireframes, Criação de Protótipos Interativos  | Representação visual clara das interfaces, permitindo ao cliente visualizar a solução.| 
|Design do Utilizador (Prototipagem) | Verificação e Validação | Validação Visual com o Cliente | Workshops interativos de design e demonstrações ao cliente. | Feedback imediato sobre a usabilidade e fluxo de doações; aprovação do design. | 
|Design do Utilizador (Prototipagem) | Organização e Atualização | Refinamento Iterativo | Atualização contínua dos requisitos baseada no feedback do protótipo. | Requisitos funcionais ajustados à realidade validada pelo cliente, prontos para construção. | 
| Construção | Análise e Consenso | Resolução de Detalhes Técnicos | Discussões diárias da equipa de desenvolvimento. | Entendimento claro de como integrar o frontend com o backend/base de dados. | 
| Construção | Verificação e Validação | Testes Contínuos | Testes cruzados com os Critérios de Aceitação. | Código validado funcionalmente, garantindo que o que foi codificado corresponde ao protótipo aprovado | 
| Transição | Verificação e Validação | Aceitação Final (UAT) | Teste de Aceitação do Utilizador com simulação de evento real. | Plataforma validada no contexto real da ONG, garantindo a substituição das planilhas. | 


## Histórico de versão

| Versão |    Data    | Descrição  | Autor(es) | Revisor(es)|
| :----: | :--------: | :--------- | :-------: | :---------: |
|  1.0   | 12/04/2026 | Criação da página    |  [Guilherme](https://github.com/GuilhermeOliveira1327)  | [Gustavo](https://github.com/GUGOFO) |
