# ATA DE REUNIÃO – PROJETO DE REQUISITOS DE SOFTWARE 

| Data | Horário | Local | Participantes |
| :--: | :-----: | :---: | :----------:  |
| 08/06/2026 | 19:00 - 20:00 | Online pelo Microsoft Teams | [Artur Fernandes Galdino](https://github.com/ArturFGaldino), [Edson Pereira Roldao Filho](https://github.com/edso-n), [Guilherme Oliveira](https://github.com/GuilhermeOliveira1327), [Gustavo Gomes Fornaciari](https://github.com/GUGOFO), [Kaio Amoury Sasaki Acacio](https://github.com/KaioAmouryUnB), [Leonardo de Aquino Silveira Braga](https://github.com/surpesaiajin), Carlos (Cliente/ONG) | 

---

## 1.⁠ ⁠Objetivo da reunião

Apresentar e validar o Ciclo RAD 3 do protótipo de alta fidelidade e do código implementado no front-end, focado em toda a esteira de Autenticação e Gestão de Usuários da plataforma.

---

## 2.⁠ ⁠Ideias apresentadas

- Demonstração do fluxo completo de Cadastro de Usuário (RF01), incluindo os formulários e as validações visuais nativas de senhas e e-mails.
- Apresentação da tela de Login (RF02) com tratamento de erros (ex: credenciais incorretas).
- Demonstração das páginas de visualização e edição de Perfil (RF03 e RF04).
- Alinhamento sobre a rotina de Exclusão de Conta (RF05) e a anonimização de dados pessoais sensíveis conforme a LGPD (RN-02).

---

## 3.⁠ ⁠Discussões realizadas

O grupo apresentou ao cliente os resultados obtidos no Ciclo RAD 3. A equipe navegou pelas telas de cadastro de voluntários e login de moderadores, exibindo as validações de segurança em tempo real aplicadas no formulário (por exemplo, exigência de senhas fortes e checagem de igualdade). 

Carlos elogiou a fluidez do fluxo de cadastro e concordou que a interface ficou bastante intuitiva para voluntários que não possuem tanta familiaridade com tecnologia. Foi discutido também o cumprimento da Lei Geral de Proteção de Dados (LGPD). A equipe detalhou como a regra de negócio RN-02 (Apagamento de Dados) será implementada no backend, garantindo que qualquer voluntário que opte por excluir sua conta tenha suas informações pessoais completamente anonimizadas no banco de dados.

Adicionalmente, os membros do grupo validaram a interface responsiva da tela de perfil, confirmando que os dados cadastrais atualizados pelo usuário refletem síncronamente na sessão ativa, de acordo com a RN-04.

---

## 4.⁠ ⁠Decisões tomadas

- Homologação e aceitação do fluxo visual e funcional de cadastro, login e perfil (Ciclo 3).
- Validação técnica do mecanismo de anonimização para exclusão de conta em conformidade com as diretrizes de LGPD acordadas.
- Liberação do Ciclo 3 para a etapa de transição e início dos trabalhos paralelos dos Ciclos 4 e 5.

---

## 5.⁠ ⁠Encerramento

Nada mais havendo a tratar, a reunião foi encerrada.

## Histórico de versão

| Versão |    Data    | Descrição  | Autor(es) | Revisor(es)|
| :----: | :--------: | :--------- | :-------: | :---------: |
|  1.0   | 08/06/2026 | Criação da ata fictícia para validação do Ciclo 3 com o cliente | [Artur Fernandes Galdino](https://github.com/ArturFGaldino) | Equipe |
