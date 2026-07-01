# ATA DE REUNIÃO – PROJETO DE REQUISITOS DE SOFTWARE 

| Data | Horário | Local | Participantes |
| :--: | :-----: | :---: | :----------:  |
| 22/06/2026 | 19:00 - 20:30 | Online pelo Microsoft Teams | [Artur Fernandes Galdino](https://github.com/ArturFGaldino), [Edson Pereira Roldao Filho](https://github.com/edso-n), [Guilherme Oliveira](https://github.com/GuilhermeOliveira1327), [Gustavo Gomes Fornaciari](https://github.com/GUGOFO), [Kaio Amoury Sasaki Acacio](https://github.com/KaioAmouryUnB), [Leonardo de Aquino Silveira Braga](https://github.com/surpesaiajin), Carlos (Cliente/ONG) | 

---

## 1. Objetivo da reunião

Apresentar, demonstrar e homologar as entregas do Ciclo RAD 6, compreendendo as rotinas de gerenciamento de estoque (atualização manual de saldos na US12 e confirmação automática de recebimento de doações físicas na US13) e o fluxo para voluntários realizarem inscrições presenciais em eventos da ONG (US15).

---

## 2. Ideias apresentadas

- Demonstração da tela administrativa para o moderador atualizar manualmente o saldo de mantimentos em estoque, prevenindo quantidades negativas (US12).
- Apresentação da rotina de validação e recebimento de doações físicas no balcão da ONG, disparando o gatilho automático de incremento do saldo no estoque geral (US13).
- Demonstração do botão "Inscrever-se" na página de detalhes da campanha para os voluntários logados confirmarem a sua participação física nas ações (US15).

---

## 3. Discussões realizadas

A reunião iniciou com o teste do fluxo de inscrição de voluntários presenciais. Carlos acessou uma conta de voluntário fictícia e confirmou sua participação em uma campanha ativa de inverno (US15). Foi demonstrado e validado o funcionamento das regras de negócio associadas: o sistema bloqueou tentativas de dupla inscrição do mesmo voluntário no mesmo evento (RN-05) e desativou as opções de inscrição nos eventos marcados com status de encerrado (RN-03).

A seguir, a equipe acessou a conta de moderador para apresentar as funcionalidades logísticas. Carlos acompanhou a atualização do saldo manual (US12) e participou da simulação da entrega física de uma doação (US13). Ao validar a entrega física no sistema administrativo, ele observou o recálculo automático do saldo de estoque geral e a atualização em tempo real dos gráficos no painel público. Carlos considerou o fluxo muito intuitivo e eficiente para reduzir erros humanos no almoxarifado da ONG.

---

## 4. Decisões tomadas

- Homologação do fluxo de inscrição de voluntários em campanhas (US15).
- Aceitação das ferramentas logísticas de atualização de saldo manual e confirmação automática de doações (US12 e US13).
- Validação das regras de negócio associadas (RN-03, RN-05).

---

## 5. Feedback do Cliente

Carlos considerou as ferramentas de estoque e voluntariado muito maduras e fáceis de operar. Ele destacou que a automatização do saldo com a confirmação de recebimento poupará horas de reconciliação manual e trará enorme segurança para as prestações de contas da ONG Ação Entre Amigos BSB.

---

## 6. Encerramento

Nada mais havendo a tratar, a reunião foi encerrada.

## Histórico de versão

| Versão |    Data    | Descrição  | Autor(es) | Revisor(es)|
| :----: | :--------: | :--------- | :-------: | :---------: |
|  1.0   | 22/06/2026 | Criação da ata fictícia para validação do Ciclo 6 | [Artur Fernandes Galdino](https://github.com/ArturFGaldino) | Equipe |
