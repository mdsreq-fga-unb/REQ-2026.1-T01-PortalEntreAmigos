# ATA DE REUNIÃO – PROJETO DE REQUISITOS DE SOFTWARE 

| Data | Horário | Local | Participantes |
| :--: | :-----: | :---: | :----------:  |
| 04/05/2026 | 20:00 - 21:30 | Online pelo Microsoft Teams | [Artur Fernandes Galdino](https://github.com/ArturFGaldino), [Edson Pereira Roldao Filho](https://github.com/edso-n), [Guilherme Oliveira](https://github.com/GuilhermeOliveira1327), [Gustavo Gomes Fornaciari](https://github.com/GUGOFO), [Kaio Amoury Sasaki Acacio](https://github.com/KaioAmouryUnB), [Leonardo de Aquino Silveira Braga](https://github.com/surpesaiajin) | 

---



## 1.⁠ ⁠Objetivo da reunião

Terminar os requisitos funcionais para criação da tabela esforço x valor, finalizar a atividade de estudo de caso e debate sobre as tecnologias a serem utilizadas no desenvolvimento de software

---

## 2.⁠ ⁠Ideias apresentadas

Apresentação e agrupamento dos Requisitos Funcionais elaborados no quadro virtual, categorizados nos seguintes módulos: Gestão de Usuários, Gestão de Eventos, Gestão Financeira e Doações, Participação em Eventos, e Transparência e Prestação de Contas.

Leitura e revisão conjunta das respostas para a Atividade de ER (Estudo de Caso da Universidade Alfa).

Propostas de stacks tecnológicas visando produtividade, facilidade de padronização do ambiente de desenvolvimento (conteinerização) e robustez.

---

## 3.⁠ ⁠Discussões realizadas

Requisitos Funcionais: O grupo revisou os cartões gerados, discutindo o impacto e a complexidade de funcionalidades como a geração de listas de participantes, controle de valores arrecadados, upload de notas fiscais e métricas de atingimento de metas. Esta revisão serviu como base fundamental para a estruturação da matriz de Esforço x Valor.

Estudo de Caso: Foi realizado um debate final sobre o diagnóstico dos requisitos sociotécnicos abordados no caso. O grupo revisou as seções de priorização de problemas (focando na disponibilidade do sistema e validação de regras de negócios) e validou a redação do "Acordo Viável", garantindo que a proposta de focar na resiliência do servidor e simplificação da interface mobile fosse bem justificada.  

Tecnologias de Desenvolvimento: Houve um debate técnico sobre as linguagens e frameworks mais adequados para o perfil da equipe e as necessidades do projeto. Argumentou-se que o React aliado ao TypeScript traria mais segurança e previsibilidade ao front-end. Para o back-end, o Django (Python) foi avaliado como a melhor opção para acelerar o desenvolvimento. Também discutiu-se a necessidade de isolar os ambientes para evitar conflitos locais, optando-se pelo uso do Docker para o banco de dados (PostgreSQL) e o back-end. A discussão sobre onde hospedar a aplicação foi iniciada, mas o grupo concordou que precisaria de mais tempo para analisar os custos e limites gratuitos das plataformas em nuvem.

---

## 4.⁠ ⁠Decisões tomadas

Requisitos Funcionais: Lista de requisitos funcionais aprovada e consolidada nas cinco categorias principais, habilitando a equipe a prosseguir com a elaboração da tabela Esforço x Valor.

Estudo de Caso: Revisão concluída. A versão final do documento "ATIVIDADE REQ revisada" foi aprovada por todos os membros para submissão.  

Stack Tecnológica Definida:

Front-end: React com TypeScript.

Back-end: Django (Python).

Banco de Dados: PostgreSQL.

Infraestrutura de Desenvolvimento: O Back-end e o Banco de Dados serão dockerizados para garantir a padronização entre as máquinas dos desenvolvedores.

Hospedagem: A decisão sobre a infraestrutura de deploy (hospedagem) foi adiada e será pauta de uma reunião futura.

---

## 5.⁠ ⁠Encerramento

Nada mais havendo a tratar, a reunião foi encerrada.

## Histórico de versão

| Versão |    Data    | Descrição  | Autor(es) | Revisor(es)|
| :----: | :--------: | :--------- | :-------: | :---------: |
|  1.0   | 13/05/2026 | Criação da página    |  [Guilherme](https://github.com/GuilhermeOliveira1327)  | Equipe|