# Priorização de Requisitos

## Introdução

A priorização de requisitos foi realizada com o objetivo de identificar quais funcionalidades possuem maior importância para o desenvolvimento inicial da solução proposta para a ONG Ação Entre Amigos BSB.

O processo de priorização ocorreu em conjunto com o cliente Carlos Vaz e seu vice, permitindo alinhar as necessidades reais da instituição com as limitações de tempo e escopo do projeto acadêmico.

A definição das prioridades auxilia a equipe no planejamento das entregas, garantindo foco nas funcionalidades mais relevantes para o funcionamento da plataforma e para os objetivos da ONG.

---

## Técnicas de Priorização Utilizadas

Para apoiar o processo de análise e tomada de decisão, foram utilizadas duas técnicas complementares de priorização.

### Técnica MoSCoW

A técnica MoSCoW foi utilizada para classificar os requisitos de acordo com seu nível de importância para o sistema.

As categorias utilizadas foram:

- **Must Have:** requisitos essenciais para o funcionamento da solução;
- **Should Have:** requisitos importantes, mas não críticos para a primeira versão;
- **Could Have:** requisitos desejáveis, porém opcionais dentro do escopo atual;
- **Won’t Have:** requisitos que não serão implementados neste momento.

Essa técnica permitiu identificar as funcionalidades prioritárias para o desenvolvimento do MVP do sistema.

---

### Técnica Valor x Esforço

A matriz Valor x Esforço foi utilizada para analisar o custo-benefício de implementação dos requisitos identificados.

A técnica considera dois fatores principais:

- **Valor:** impacto e importância da funcionalidade para os usuários e para a ONG;
- **Esforço:** complexidade técnica e quantidade de trabalho necessária para implementação.

Com isso, foi possível identificar funcionalidades que entregam maior valor com menor esforço de desenvolvimento, auxiliando na definição das prioridades do projeto.

---

## Resultado da Priorização

A Figura 1 apresenta o material produzido pela equipe durante o processo de priorização dos requisitos, contendo tanto a classificação MoSCoW quanto a análise Valor x Esforço realizadas em conjunto com o cliente.

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://embed.figma.com/board/FjIqMCcO6D4429RdGtVT8x/PRIORIZACAO?node-id=0-1&embed-host=share" allowfullscreen></iframe>

---

## Considerações

A aplicação das técnicas de priorização permitiu organizar melhor o escopo do projeto e orientar as decisões da equipe durante o planejamento do desenvolvimento.

Além disso, o envolvimento direto do cliente no processo contribuiu para garantir que as funcionalidades priorizadas estejam alinhadas às reais necessidades operacionais da ONG.

---

## Tabela MoSCoW

| Categoria                              | Requisitos                                                                                                                                                                                                                                                                                                          |
| :------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Must Have (Deve ter)**               | [RF06](requisitos.md#rf06) – Criar eventos<br>[RF08](requisitos.md#rf07) – Excluir eventos<br>[RF09](requisitos.md#rf09) – Encerrar eventos<br>[RF11](requisitos.md#rf11) – Registrar doação<br>[RF13](requisitos.md#rf12) – Confirmar recebimento de doação<br>[RF12](requisitos.md#rf13) – Atualizar saldo<br>[RF15](requisitos.md#rf15) – Realizar inscrição em eventos<br>[RF17](requisitos.md#rf17) – Visualizar comprovantes<br>[RF18](requisitos.md#rf18) – Enviar notas fiscais<br>[RF14](requisitos.md#rf14) – Exibir eventos<br>
| **Should Have (Deveria ter)**          | [RF16](requisitos.md#rf16) – Exibir informações institucionais<br>[RF07](requisitos.md#rf07) – Editar eventos<br>[RF08](requisitos.md#rf08) – Gerar relatório de informações do evento<br>|                                                                                                                                                                                              
| **Could Have (Poderia ter)**           | [RF01](requisitos.md#rf01) – Cadastrar usuário<br>[RF02](requisitos.md#rf02) – Login de usuário<br>[RF03](requisitos.md#rf03) – Visualizar perfil<br>[RF04](requisitos.md#rf04) – Editar perfil<br>[RF05](requisitos.md#rf05) – Excluir conta<br>[RF10](requisitos.md#rf10) – Exibir progresso da meta  |                                                                                                                        |
| **Won’t Have (Não terá por enquanto)** | Nenhum requisito foi classificado nesta categoria durante a priorização inicial.                                                                                                                                                                                                                                    |

---

## Tabela Matriz Valor x Esforço

| Quadrante                           | Requisitos                                                                                                                                                                                                                                                                                                                                                                                        |
| :---------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Grande Valor / Pequeno Esforço**  | [RF11](requisitos.md#rf11) – Registrar doação<br>[RF12](requisitos.md#rf12) – Atualizar saldo<br>[RF16](requisitos.md#rf16)– Exibir informações institucionais                                                                                                                                                                                                                                                                                                     |
| **Grande Valor / Grande Esforço**   | [RF01](requisitos.md#rf01) – Cadastrar usuário<br>[RF02](requisitos.md#rf02)– Login de usuário<br>[RF03](requisitos.md#rf03) – Visualizar perfil<br>[RF04](requisitos.md#rf04)– Editar perfil<br>[RF05](requisitos.md#rf05) – Excluir conta<br> [RF06](requisitos.md#rf06) – Criar eventos<br>[RF07](requisitos.md#rf07)– Editar eventos<br>[RF08](requisitos.md#rf08)– Excluir eventos<br>[RF09](requisitos.md#rf09)– Confirmar recebimento de doação <br>[RF13](requisitos.md#rf13) – Excluir conta – Encerrar eventos<br>[RF14](requisitos.md#rf14)– Realizar inscrição em eventos<br>[RF16](requisitos.md#rf16) – Visualizar comprovantes<br>[RF17](requisitos.md#rf17) – Enviar notas fiscais<br>[RF18](requisitos.md#rf18) – Gerar relatório de informações do evento<br>|
| **Pequeno Valor / Pequeno Esforço** | [RF10](requisitos.md#rf10) – Exibir progresso da meta<br>[RF13](requisitos.md#rf13)– Exibir eventos                                                                                                                                                                                                                                                                                                                                          |
| **Pequeno Valor / Grande Esforço**  | Nenhum requisito foi classificado neste quadrante.                                                                                                                                                                                                                                                                                                                                                |


## Histórico de Versão

| Versão | Data | Descrição | Autor(es) | Revisor(es) |
| :---: | :---: | :--- | :---: | :---: |
| 1.0 | 13/05/2026 | Criação da página de priorização de requisitos | [Guilherme](https://github.com/GuilhermeOliveira1327) | Equipe |
|  2.0   | 17/05/2026 | Atualização de tópicos da tabela MoSCow  |  [Edson](https://github.com/edso-n), [Leonardo](https://github.com/surpesaiajin)  | Equipe |