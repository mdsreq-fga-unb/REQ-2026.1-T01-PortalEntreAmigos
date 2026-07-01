# ATA DE REUNIÃO – PROJETO DE REQUISITOS DE SOFTWARE 

| Data | Horário | Local | Participantes |
| :--: | :-----: | :---: | :----------:  |
| 29/06/2026 | 19:00 - 20:30 | Online pelo Microsoft Teams | [Artur Fernandes Galdino](https://github.com/ArturFGaldino), [Edson Pereira Roldao Filho](https://github.com/edso-n), [Guilherme Oliveira](https://github.com/GuilhermeOliveira1327), [Gustavo Gomes Fornaciari](https://github.com/GUGOFO), [Kaio Amoury Sasaki Acacio](https://github.com/KaioAmouryUnB), [Leonardo de Aquino Silveira Braga](https://github.com/surpesaiajin), Carlos (Cliente/ONG) | 

---

## 1. Objetivo da reunião

Apresentar, demonstrar e homologar as entregas finais do Ciclo RAD 7, contemplando as ferramentas administrativas e contábeis finais: encerramento definitivo de eventos (US09), visualização e auditoria de comprovantes de doações financeiras (US17), upload de notas fiscais de despesas logísticas (US18) e geração consolidada de relatórios de fechamento de eventos (US19).

---

## 2. Ideias apresentadas

- Apresentação do botão administrativo de encerramento rápido e modal de confirmação crítica para congelar as interações em campanhas concluídas (US09).
- Demonstração do painel administrativo para visualizar e validar anexos de comprovantes de PIX enviados pelos doadores (US17).
- Apresentação da tela de upload de notas fiscais com travamento de segurança contra arquivos maliciosos e limite de tamanho de até 5MB (US18).
- Demonstração da geração automatizada de relatórios contábeis consolidados contendo o resumo financeiro, logístico e de voluntários do evento (US19).

---

## 3. Discussões realizadas

A reunião de homologação iniciou com os testes de auditoria de doações financeiras. Carlos, atuando como moderador, acessou a listagem de intenções financeiras e abriu um comprovante de PIX enviado (US17), validando a aprovação do documento e consequente atualização do saldo financeiro. A seguir, ele testou o fluxo de despesas, anexando uma nota fiscal fictícia de custos de transporte (US18). A equipe demonstrou o funcionamento da regra RNF10, tentando enviar um arquivo executável malicioso, o qual foi devidamente bloqueado pelo backend com notificação visual.

Por fim, Carlos testou a geração do relatório contábil (US19). Ao clicar em "Gerar Relatório de Encerramento", um arquivo PDF consolidado compilou todas as receitas, despesas e voluntários associados. Ele encerrou a campanha teste no painel de moderação (US09) e confirmou que os links públicos de doação física e financeira, além de inscrições de voluntários, foram congelados no portal. Carlos deu um retorno excelente e elogiou a robustez das travas contábeis.

---

## 4. Decisões tomadas

- Homologação do fluxo de encerramento de campanhas e travas lógicas (US09).
- Aceitação da auditoria visual de comprovantes financeiros (US17) e upload de notas fiscais (US18).
- Homologação da geração de relatórios de encerramento em formato PDF (US19).
- Validação final de todas as regras de segurança e negócio associadas (RN-01, RN-03, RNF10).

---

## 5. Feedback do Cliente

Carlos elogiou imensamente a entrega das ferramentas contábeis e de encerramento. Ele pontuou que a capacidade de visualizar comprovantes na própria tela e fazer o upload de notas fiscais de despesas amarra o processo financeiro da ONG de forma íntegra, e a geração do PDF consolidado torna a prestação de contas com apoiadores e comunidade extremamente ágil e transparente.

---

## 6. Encerramento

Nada mais havendo a tratar, a reunião foi encerrada.

## Histórico de versão

| Versão |    Data    | Descrição  | Autor(es) | Revisor(es)|
| :----: | :--------: | :--------- | :-------: | :---------: |
|  1.0   | 29/06/2026 | Criação da ata fictícia para validação do Ciclo 7 | [Artur Fernandes Galdino](https://github.com/ArturFGaldino) | Equipe |
