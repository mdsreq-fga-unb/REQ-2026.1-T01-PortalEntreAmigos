# ATA DE REUNIÃO – PROJETO DE REQUISITOS DE SOFTWARE 

| Data | Horário | Local | Participantes |
| :--: | :-----: | :---: | :----------:  |
| 15/06/2026 | 19:00 - 20:30 | Online pelo Microsoft Teams | [Artur Fernandes Galdino](https://github.com/ArturFGaldino), [Edson Pereira Roldao Filho](https://github.com/edso-n), [Guilherme Oliveira](https://github.com/GuilhermeOliveira1327), [Gustavo Gomes Fornaciari](https://github.com/GUGOFO), [Kaio Amoury Sasaki Acacio](https://github.com/KaioAmouryUnB), [Leonardo de Aquino Silveira Braga](https://github.com/surpesaiajin), Carlos (Cliente/ONG) | 

---

## 1.⁠ ⁠Objetivo da reunião

Apresentar, demonstrar e homologar os Ciclos RAD 4 e 5, cobrindo a gestão de eventos (criação, edição e exclusão de campanhas de doação) e a exibição de metas (gráficos de progresso em tempo real e o fluxo de registro de doações).

---

## 2.⁠ ⁠Ideias apresentadas

- Demonstração do Painel Administrativo de Criação de Campanhas (RF06, RF07, RF08), evidenciando a trava de segurança que restringe o acesso apenas a "Moderadores" autenticados (RN-01).
- Apresentação da interface pública com os gráficos dinâmicos de metas (pizza para distribuição de itens e circular para progresso geral) de cada campanha (RF10).
- Simulação do fluxo de registro de uma intenção de doação (RF11), demonstrando o recálculo imediato dos gráficos de progresso ao atualizar a página (RNF06).
- Demonstração prática do bloqueio de novas inscrições ou doações para campanhas que já foram definidas como "Encerradas" pela moderação (RN-03).

---

## 3.⁠ ⁠Discussões realizadas

Nesta reunião final de homologação técnica com o cliente Carlos, a equipe apresentou os dois ciclos restantes que rodam em paralelo. Iniciou-se pela demonstração do painel administrativo, no qual Carlos pôde testar a criação de uma campanha de doação fictícia. Foi confirmada a correta validação da regra de negócio RN-01 (apenas moderadores têm acesso aos formulários de cadastro e edição de eventos).

Em seguida, o foco mudou para a experiência do doador. Carlos visualizou como os gráficos em tempo real da página da campanha se comportam. Para demonstrar a atualização dinâmica (RNF06), a equipe registrou uma intenção de doação de mantimentos em uma aba do navegador e, na aba do cliente, atualizou a página para exibir o progresso atualizado no gráfico de pizza de forma instantânea. 

A restrição sistêmica RN-03 também foi testada: a equipe encerrou uma campanha piloto no painel do administrador e demonstrou que, imediatamente, os botões de doação e inscrição de voluntários foram desabilitados na interface pública, prevenindo confusão ou cadastros fora do prazo de atendimento da ONG. Carlos deu um retorno extremamente positivo, destacando que os gráficos de meta trazem um apelo visual forte e aumentam a transparência nas arrecadações do Portal Entre Amigos BSB.

---

## 4.⁠ ⁠Decisões tomadas

- Aceitação integral dos componentes de gráficos de progresso e visualização de metas (Ciclo 5).
- Homologação do fluxo administrativo de criação e moderação de campanhas (Ciclo 4).
- Confirmação do funcionamento das travas de regras de negócio (RN-01 e RN-03).
- Validação final de todo o escopo do protótipo e front-end com o cliente, habilitando a equipe a consolidar a documentação final do projeto.

---

## Feedback do Cliente

O cliente adorou a visualização do progresso por meio dos gráficos de pizza e circular na página de campanhas ativas. Ele elogiou o recálculo em tempo real e a desativação imediata das opções de doação após o encerramento do evento.

---

## 5.⁠ ⁠Encerramento

Nada mais havendo a tratar, a reunião foi encerrada.

## Histórico de versão

| Versão |    Data    | Descrição  | Autor(es) | Revisor(es)|
| :----: | :--------: | :--------- | :-------: | :---------: |
|  1.0   | 15/06/2026 | Criação da ata fictícia para validação final dos Ciclos 4 e 5 | [Artur Fernandes Galdino](https://github.com/ArturFGaldino) | Equipe |
