# Priorização do Backlog do Produto

## Introdução

A priorização do backlog do produto foi realizada com o objetivo de identificar quais funcionalidades possuem maior importância para o desenvolvimento inicial da solução proposta para a ONG Ação Entre Amigos BSB.

O processo de priorização ocorreu em conjunto com o cliente Carlos Vaz e seu vice, permitindo alinhar as necessidades reais da instituição com las limitações de tempo e escopo do projeto acadêmico.

A definição das prioridades auxilia a equipe no planejamento das entregas, garantindo foco nas funcionalidades mais relevantes para o funcionamento da plataforma e para os objetivos da ONG.

---

## Técnicas de Priorização Utilizadas

Para apoiar o processo de análise e tomada de decisão, foram utilizadas técnicas complementares de priorização.

### Técnica MoSCoW

A técnica MoSCoW foi utilizada para classificar os requisitos de acordo com seu nível de importância para o sistema.

As categorias utilizadas foram:

* **Must Have:** requisitos essenciais para o funcionamento da solução;
* **Should Have:** requisitos importantes, mas não críticos para a primeira versão;
* **Could Have:** requisitos desejáveis, porém opcionais dentro do escopo atual;
* **Won’t Have:** requisitos que não serão implementados neste momento.

Essa técnica permitiu identificar as funcionalidades prioritárias para o desenvolvimento do MVP do sistema.

---

### Técnica Valor x Esforço

A matriz Valor x Esforço foi utilizada para analisar o custo-benefício de implementação dos requisitos identificados.

A técnica considera dois fatores principais:

* **Valor:** impacto e importância da funcionalidade para os usuários e para a ONG;
* **Esforço:** complexidade técnica e quantidade de trabalho necessária para implementação.

Com isso, foi possível identificar funcionalidades que entregam maior valor com menor esforço de desenvolvimento, auxiliando na definição das prioridades do projeto.

---

### Índice de Prioridade (IP)

Para a priorização do backlog foram utilizados os seguintes critérios:

* **VN** = valor de negócio (1 a 5)
* **EP** = esforço da equipe (1 a 5)

Para comparar valor versus esforço da equipe, utiliza-se a fórmula:

**IP = VN / EP**

Quanto maior o IP, maior a prioridade.

#### Interpretação

* **IP alto** = muito valor de negócio para baixo/médio custo técnico
* **IP médio** = equilíbrio razoável
* **IP baixo** = pouco valor de negócio para alto custo técnico

#### Faixas de decisão

* **IP ≥ 1,50** → Alta prioridade
* **IP entre 1,00 e 1,49** → Média prioridade
* **IP < 1,00** → Baixa prioridade

---

## Resultado da Priorização

A Figura 1 apresenta o material produzido pela equipe durante o processo de priorização dos requisitos, contendo tanto a classificação MoSCoW quanto a análise Valor x Esforço realizadas em conjunto com o cliente.

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://embed.figma.com/board/FjIqMCcO6D4429RdGtVT8x/PRIORIZACAO?node-id=0-1&embed-host=share" allowfullscreen></iframe>

---

## Tabela MoSCoW

| Categoria | Requisitos |
| :--- | :--- |
| **Must Have (Deve ter)** | [RF01](../13_requisitos/requisitos.md#rf01) – Cadastrar usuário<br>[RF02](../13_requisitos/requisitos.md#rf02) – Login de usuário<br>[RF03](../13_requisitos/requisitos.md#rf03) – Visualizar perfil<br>[RF04](../13_requisitos/requisitos.md#rf04) – Editar perfil<br>[RF05](../13_requisitos/requisitos.md#rf05) – Excluir conta<br>[RF06](../13_requisitos/requisitos.md#rf06) – Criar eventos<br>[RF08](../13_requisitos/requisitos.md#rf08) – Excluir eventos<br>[RF09](../13_requisitos/requisitos.md#rf09) – Encerrar eventos<br>[RF11](../13_requisitos/requisitos.md#rf11) – Registrar doação<br>[RF12](../13_requisitos/requisitos.md#rf12) – Atualizar saldo<br>[RF13](../13_requisitos/requisitos.md#rf13) – Confirmar recebimento de doação<br>[RF14](../13_requisitos/requisitos.md#rf14) – Exibir eventos<br>[RF15](../13_requisitos/requisitos.md#rf15) – Realizar inscrição em eventos<br>[RF17](../13_requisitos/requisitos.md#rf17) – Visualizar comprovantes<br>[RF18](../13_requisitos/requisitos.md#rf18) – Enviar notas fiscais |
| **Should Have (Deveria ter)** | [RF07](../13_requisitos/requisitos.md#rf07) – Editar eventos<br>[RF10](../13_requisitos/requisitos.md#rf10) – Exibir progresso da meta<br>[RF16](../13_requisitos/requisitos.md#rf16) – Exibir informações institucionais<br>[RF19](../13_requisitos/requisitos.md#rf19) – Gerar relatório de informações do evento |
| **Could Have (Poderia ter)** | Nenhum requisito foi mantido nesta categoria. |
| **Won’t Have (Não terá por enquanto)** | Nenhum requisito foi classificado nesta categoria durante a priorização inicial. |

---

## Tabela Matriz Valor x Esforço

| Quadrante | Requisitos |
| :--- | :--- |
| **Grande Valor / Pequeno Esforço** | [RF03](../13_requisitos/requisitos.md#rf03) – Visualizar perfil<br>[RF05](../13_requisitos/requisitos.md#rf05) – Excluir conta<br>[RF10](../13_requisitos/requisitos.md#rf10) – Exibir progresso da meta<br>[RF11](../13_requisitos/requisitos.md#rf11) – Registrar doação<br>[RF12](../13_requisitos/requisitos.md#rf12) – Atualizar saldo<br>[RF14](../13_requisitos/requisitos.md#rf14) – Exibir eventos<br>[RF16](../13_requisitos/requisitos.md#rf16) – Exibir informações institucionais |
| **Grande Valor / Grande Esforço** | [RF01](../13_requisitos/requisitos.md#rf01) – Cadastrar usuário<br>[RF02](../13_requisitos/requisitos.md#rf02) – Login de usuário<br>[RF04](../13_requisitos/requisitos.md#rf04) – Editar perfil<br>[RF06](../13_requisitos/requisitos.md#rf06) – Criar eventos<br>[RF07](../13_requisitos/requisitos.md#rf07) – Editar eventos<br>[RF08](../13_requisitos/requisitos.md#rf08) – Excluir eventos<br>[RF09](../13_requisitos/requisitos.md#rf09) – Encerrar eventos<br>[RF13](../13_requisitos/requisitos.md#rf13) – Confirmar recebimento de doação<br>[RF15](../13_requisitos/requisitos.md#rf15) – Realizar inscrição em eventos<br>[RF17](../13_requisitos/requisitos.md#rf17) – Visualizar comprovantes<br>[RF18](../13_requisitos/requisitos.md#rf18) – Enviar notas fiscais<br>[RF19](../13_requisitos/requisitos.md#rf19) – Gerar relatório de informações do evento |
| **Pequeno Valor / Pequeno Esforço** | Nenhum requisito. |
| **Pequeno Valor / Grande Esforço** | Nenhum requisito. |

---

## Priorização do Backlog

A partir das técnicas aplicadas, foi gerada a seguinte priorização do backlog do produto:

| US | Descrição | VN | EP | IP | Quadrante | Prioridade sugerida |
| :--- | :--- | :---: | :---: | :---: | :--- | :--- |
| [US11](backlog.md#us11) | Registrar Doação | 5 | 2 | 2,50 | Q1 Alto valor / Baixa carga técnica | Prioridade 1 |
| [US12](backlog.md#us12) | Atualizar Saldo | 5 | 2 | 2,50 | Q1 Alto valor / Baixa carga técnica | Prioridade 1 |
| [US14](backlog.md#us14) | Exibir Eventos | 5 | 2 | 2,50 | Q1 Alto valor / Baixa carga técnica | Prioridade 1 |
| [US16](backlog.md#us16) | Exibir informações Institucionais | 5 | 2 | 2,50 | Q1 Alto valor / Baixa carga técnica | Prioridade 1 |
| [US03](backlog.md#us03) | Visualizar Perfil | 4 | 2 | 2,00 | Q1 Alto valor / Baixa carga técnica | Prioridade 1 |
| [US05](backlog.md#us05) | Excluir Conta | 4 | 2 | 2,00 | Q1 Alto valor / Baixa carga técnica | Prioridade 1 |
| [US10](backlog.md#us10) | Exibir Progresso da Meta | 4 | 2 | 2,00 | Q1 Alto valor / Baixa carga técnica | Prioridade 1 |
| [US06](backlog.md#us06) | Criar Eventos | 4 | 3 | 1,33 | Q2 Alto valor / Alta carga técnica | Prioridade 2 |
| [US07](backlog.md#us07) | Editar Eventos | 4 | 3 | 1,33 | Q2 Alto valor / Alta carga técnica | Prioridade 2 |
| [US08](backlog.md#us08) | Excluir Eventos | 4 | 3 | 1,33 | Q2 Alto valor / Alta carga técnica | Prioridade 2 |
| [US09](backlog.md#us09) | Encerrar Eventos | 4 | 3 | 1,33 | Q2 Alto valor / Alta carga técnica | Prioridade 2 |
| [US13](backlog.md#us13) | Confirmar recebimento de Doação | 4 | 3 | 1,33 | Q2 Alto valor / Alta carga técnica | Prioridade 2 |
| [US15](backlog.md#us15) | Realizar Inscrição em eventos | 4 | 3 | 1,33 | Q2 Alto valor / Alta carga técnica | Prioridade 2 |
| [US17](backlog.md#us17) | Visualizar Comprovantes | 4 | 3 | 1,33 | Q2 Alto valor / Alta carga técnica | Prioridade 2 |
| [US18](backlog.md#us18) | Enviar Notas Fiscais | 4 | 3 | 1,33 | Q2 Alto valor / Alta carga técnica | Prioridade 2 |
| [US19](backlog.md#us19) | Gerar relatório de informação de eventos | 4 | 3 | 1,33 | Q2 Alto valor / Alta carga técnica | Prioridade 2 |
| [US01](backlog.md#us01) | Cadastro de Usuário | 4 | 4 | 1,00 | Q2 Alto valor / Alta carga técnica | Prioridade 2 |
| [US02](backlog.md#us02) | Login de Usuário | 4 | 4 | 1,00 | Q2 Alto valor / Alta carga técnica | Prioridade 2 |
| [US04](backlog.md#us04) | Editar Perfil | 4 | 4 | 1,00 | Q2 Alto valor / Alta carga técnica | Prioridade 2 |

---

## MVP do Produto

Com base na priorização realizada em conjunto com o cliente Carlos Vaz, determinou-se que o MVP será composto por todas as funcionalidades classificadas como **Prioridade 1** e **Prioridade 2**.

Isso significa que todo o gerenciamento de acesso do usuário (cadastro, login e controle de perfil) e o feedback visual de progresso de meta das campanhas foram integrados ao MVP. Essa decisão garante a robustez operacional básica de identificação de usuários e a confiabilidade de prestação de contas das metas públicas arrecadadas de forma imediata na primeira versão de entrega da plataforma.

### Rastreabilidade do MVP

| Requisito Funcional | User Story Relacionada | Funcionalidade do MVP |
| :--- | :--- | :--- |
| [RF01](../13_requisitos/requisitos.md#rf01) – Cadastrar usuário | [US01](backlog.md#us01) | Permitir que novos usuários se cadastrem no sistema |
| [RF02](../13_requisitos/requisitos.md#rf02) – Login de usuário | [US02](backlog.md#us02) | Permitir autenticação via e-mail e senha |
| [RF03](../13_requisitos/requisitos.md#rf03) – Visualizar perfil | [US03](backlog.md#us03) | Permitir visualização dos dados cadastrados |
| [RF04](../13_requisitos/requisitos.md#rf04) – Editar perfil | [US04](backlog.md#us04) | Permitir atualização dos dados do usuário |
| [RF05](../13_requisitos/requisitos.md#rf05) – Excluir conta | [US05](backlog.md#us05) | Permitir exclusão lógica ou física da conta |
| [RF06](../13_requisitos/requisitos.md#rf06) – Criar eventos | [US06](backlog.md#us06) | Permitir criação de eventos com nome, descrição, meta, data e local |
| [RF07](../13_requisitos/requisitos.md#rf07) – Editar eventos | [US07](backlog.md#us07) | Permitir alteração de eventos existentes |
| [RF08](../13_requisitos/requisitos.md#rf08) – Excluir eventos | [US08](backlog.md#us08) | Permitir remoção de eventos |
| [RF09](../13_requisitos/requisitos.md#rf09) – Encerrar eventos | [US09](backlog.md#us09) | Permitir finalização manual de eventos |
| [RF10](../13_requisitos/requisitos.md#rf10) – Exibir progresso da meta | [US10](backlog.md#us10) | Exibir percentual de atingimento da meta |
| [RF11](../13_requisitos/requisitos.md#rf11) – Registrar doação | [US11](backlog.md#us11) | Permitir registro de itens e quantidades |
| [RF12](../13_requisitos/requisitos.md#rf12) – Atualizar saldo | [US12](backlog.md#us12) | Permitir controle de valores arrecadados |
| [RF13](../13_requisitos/requisitos.md#rf13) – Confirmar recebimento de doação | [US13](backlog.md#us13) | Permitir que o usuário administrador confirme a doação |
| [RF14](../13_requisitos/requisitos.md#rf14) – Exibir eventos | [US14](backlog.md#us14) | Permitir visualização de eventos disponíveis |
| [RF15](../13_requisitos/requisitos.md#rf15) – Realizar inscrição em eventos | [US15](backlog.md#us15) | Permitir participação de usuários |
| [RF16](../13_requisitos/requisitos.md#rf16) – Exibir informações institucionais | [US16](backlog.md#us16) | Exibir dados da ONG na página inicial |
| [RF17](../13_requisitos/requisitos.md#rf17) – Visualizar comprovantes | [US17](backlog.md#us17) | Permitir acesso às prestações de contas |
| [RF18](../13_requisitos/requisitos.md#rf18) – Enviar notas fiscais | [US18](backlog.md#us18) | Permitir envio de comprovantes |
| [RF19](../13_requisitos/requisitos.md#rf19) – Gerar relatório de informações do evento | [US19](backlog.md#us19) | Gerar relatório com as informações do evento encerrado |

---

## Considerações

A aplicação das técnicas de priorização permitiu organizar melhor o escopo do projeto e orientar as decisões da equipe durante o planejamento do desenvolvimento.

Além disso, o envolvimento direto do cliente no processo contribuiu para garantir que as funcionalidades priorizadas estejam alinhadas às reais necessidades operacionais da ONG.

---

## Histórico de Versão

| Versão | Data | Descrição | Autor(es) | Revisor(es) |
| :---: | :---: | :--- | :---: | :---: |
| 1.0 | 18/05/2026 | Criação da página de priorização do Backlog | [Guilherme](https://github.com/GuilhermeOliveira1327) | Equipe |
| 1.1 | 27/06/2026 | Atualização do MoSCoW e inclusão de autenticação e metas no MVP | Equipe | Equipe |