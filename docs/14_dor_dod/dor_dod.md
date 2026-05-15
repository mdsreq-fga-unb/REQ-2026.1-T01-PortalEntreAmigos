# DoR e DoD

Nesta seção são apresentados os conceitos de Definition of Ready (DoR) e Definition of Done (DoD), mecanismos que asseguram o detalhamento necessário antes de iniciar uma iteração e a validação completa antes de oficializar uma entrega.

## Definition of Ready (DoR)

No contexto do ciclo iterativo, o Definition of Ready (DoR) atua como um mecanismo de controle pré-desenvolvimento. Ele define as condições que um item do backlog deve cumprir para ser considerado apto a entrar em uma nova iteração. A adoção desse padrão evita incertezas durante a prototipagem do RAD e assegura que o grupo possua a base de conhecimento necessária para uma implementação eficiente. Os critérios de DoR incluem:

| **Critério**  | **Descrição** |
| :--- | :--- |
| O Requisito possui informação necessária para ser trabalhado?    | O requisito deve possuir contexto suficiente sobre o problema a ser resolvido e as regras de negócio envolvidas. Essas informações devem estar claras para a equipe de desenvolvimento e para os demais stakeholders  |
| O Requisito está representado por uma história de usuário?    | Deve ser descrito no formato padrão de histórias de usuário ("Como [usuário], quero [ação], para [benefício]").       |
| O Requisito está coberto por critérios de aceite?| O requisito deve conter as condições claras que comprovam que a funcionalidade atende ao negócio (Critérios de Aceite). |
| O Requisito está mapeado para um protótipo?    | O requisito deve possuir uma representação visual correspondente no protótipo. Todos os elementos de tela, fluxos de navegação e dados que serão exibidos ou capturados pela funcionalidade devem estar previamente modelados. |
| O protótipo foi validado pelo cliente?    | A solução visual e interativa proposta (protótipo de baixa ou alta fidelidade) deve ter passado por um ciclo de revisão e aceite junto ao cliente.|
| O item a ser trabalhado está coerente com a prioridade definida no MoSCoW e na Matriz Valor x Negócio?    | O requisito deve ter sua prioridade explicitamente classificada e estar posicionado no topo do backlog de acordo com a matriz de Valor x Negócio. Isso justifica e autoriza sua inclusão imediata na iteração atual.|
| O Requisito cabe em uma Iteração?| O esforço estimado para implementar a funcionalidade deve ser compatível com a duração da iteração. |

Somente após cumprir esses pontos, o item pode ser considerado pronto para desenvolvimento em uma Iteração.

## Definition of Done (DoD)

O Definition of Done (DoD) é o checklist que define o que a equipe técnica entende por 'estar pronto'. O DoD garante qualidade, transparência e consistência no processo de desenvolvimento. Para que o requisito seja considerado pronto deve responder as seguintes perguntas:

- Entrega um incremento do produto?
- A entrega está coerente com o protótipo validado pelo cliente?
- Contempla os critérios de aceite estabelecidos?
- Todos os testes unitários e de integração relacionados à funcionalidade foram implementados e aprovados?
- A entrega deve foi revisada por toda a equipe na reunião de revisão da Iteração? recebeu validação?
- A documentação técnica (Backlog) foi revisada e atualizada conforme as mudanças de funcionalidade?


Somente após cumprir todos os critérios listados, a funcionalidade será considerada "Done" e estará pronta para ser incorporada à versão do produto entregue ao cliente.

## Histórico de versão

| Versão |    Data    | Descrição  | Autor(es) | Revisor(es)|
| :----: | :--------: | :--------- | :-------: | :---------: |
|  1.0   | 14/05/2026 | Criação da página    |  [Edson](https://github.com/edso-n)  | |

