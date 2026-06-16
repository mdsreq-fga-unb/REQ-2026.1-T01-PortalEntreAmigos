# Critérios de Aceite

## Introdução

Este documento tem como objetivo detalhar os Critérios de Aceite (CA) referentes às Histórias de Usuário (US) previamente mapeadas no backlog do produto.

Para garantir que o software seja entregue com qualidade e atenda plenamente às expectativas da ONG, cada história descrita a seguir é acompanhada de validações sistêmicas obrigatórias, limites de funcionalidade e regras de negócio essenciais para a execução da fase de testes.

Os critérios de aceite foram organizados de forma rastreável, permitindo sua associação direta com requisitos funcionais, requisitos não funcionais, casos de teste e validações futuras do sistema.

---

# Critérios de Aceitação por História de Usuário

## [US01](backlog.md#us01) - Cadastrar Usuário

*Como voluntário, quero cadastrar a minha conta, para conseguir realizar promessas de doação e registrar o meu histórico.*

| ID | Critério de Aceite |
| :--- | :--- |
| <a id="ca-us01-01"></a>CA-US01-01 | O sistema deve solicitar os seguintes campos obrigatórios: Nome Completo, E-mail, Senha e Confirmação de Senha. |
| <a id="ca-us01-02"></a>CA-US01-02 | O sistema não deve permitir o cadastro de um e-mail já existente na base de dados. |
| <a id="ca-us01-03"></a>CA-US01-03 | A senha deve ter no mínimo 8 caracteres, contendo pelo menos uma letra maiúscula, um número e um caractere especial. |
| <a id="ca-us01-04"></a>CA-US01-04 | A senha deve ser criptografada antes de ser salva no banco de dados ([RNF03](../13_requisitos/requisitos.md#rnf03)). |

---

## [US02](backlog.md#us02) - Login de usuário

*Como usuario, quero realizar o login, para acessar o meu perfil com segurança na plataforma.*

| ID | Critério de Aceite |
| :--- | :--- |
| <a id="ca-us02-01"></a>CA-US02-01 | O utilizador deve fornecer um e-mail válido e a senha correspondente para acessar o sistema. |
| <a id="ca-us02-02"></a>CA-US02-02 | Caso as credenciais estejam incorretas, o sistema deve exibir uma mensagem de erro genérica (ex: "E-mail ou senha incorretos"). |

---

## [US03](backlog.md#us03) - Visualizar perfil

*Como voluntário, quero visualizar o meu perfil, para que eu possa ver meus dados cadastrados*

| ID | Critério de Aceite |
| :--- | :--- |
| <a id="ca-us03-01"></a>CA-US03-01 | A página de perfil deve exibir os dados pessoais do usuário |
| <a id="ca-us03-02"></a>CA-US03-02 | A visualização deve se adaptar perfeitamente a telas de dispositivos móveis (smartphones e tablets) e desktops ([RNF01](../13_requisitos/requisitos.md#rnf01)). |

---

## [US04](backlog.md#us04) - Editar perfil

*Como voluntário, quero editar o meu perfil, para manter as minhas informações de contato atualizadas para a ONG.*

| ID | Critério de Aceite |
| :--- | :--- |
| <a id="ca-us04-01"></a>CA-US04-01 | O voluntário deve poder alterar seu Nome e Senha. |
| <a id="ca-us04-02"></a>CA-US04-02 | As alterações devem refletir imediatamente no banco de dados e na interface do usuário ([RNF07](../13_requisitos/requisitos.md#rnf07)). |

---

## [US05](backlog.md#us05) - Excluir conta

*Como voluntário, quero excluir a minha conta, para remover os meus dados pessoais do sistema caso não deseje mais participar.*

| ID | Critério de Aceite |
| :--- | :--- |
| <a id="ca-us05-01"></a>CA-US05-01 | O sistema deve solicitar a senha atual do usuário como confirmação antes de prosseguir com a exclusão. |
| <a id="ca-us05-02"></a>CA-US05-02 | Os dados sensíveis do usuário devem ser anonimizados ou removidos permanentemente do banco de dados para cumprir normas de privacidade (ex: LGPD). |

---

## [US06](backlog.md#us06) - Criar eventos

*Como moderador, quero criar novos eventos, para iniciar uma nova campanha de arrecadação da ONG.*

| ID | Critério de Aceite |
| :--- | :--- |
| <a id="ca-us06-01"></a>CA-US06-01 | O sistema deve verificar se o usuário possui permissão de "Moderador" antes de liberar a tela de criação ([RNF04](../13_requisitos/requisitos.md#rnf04)). |
| <a id="ca-us06-02"></a>CA-US06-02 | Devem ser exigidos os campos: Título da Campanha, Descrição, Data de Início/Término, Local e Metas de Arrecadação (itens ou valor). |

---

## [US07](backlog.md#us07) - Editar eventos

*Como moderador, quero editar eventos, para corrigir metas ou informações logísticas de campanhas em andamento.*

| ID | Critério de Aceite |
| :--- | :--- |
| <a id="ca-us07-01"></a>CA-US07-01 | Apenas moderadores autenticados podem editar os detalhes de um evento ([RNF04](../13_requisitos/requisitos.md#rnf04)). |
| <a id="ca-us07-02"></a>CA-US07-02 | Se a meta for alterada, a barra de progresso do evento ([US10](backlog.md#us10)) deve ser recalculada imediatamente. |

---

## [US08](backlog.md#us08) - Excluir eventos

*Como moderador, quero excluir eventos, para remover campanhas registadas indevidamente ou canceladas.*

| ID | Critério de Aceite |
| :--- | :--- |
| <a id="ca-us08-01"></a>CA-US08-01 | Apenas eventos que não possuam doações vinculadas ou inscrições ativas podem ser excluídos. |
| <a id="ca-us08-02"></a>CA-US08-02 | Para eventos com histórico, o sistema deve permitir apenas a "Inativação/Cancelamento", preservando o histórico de dados. |

---

## [US09](backlog.md#us09) - Encerrar eventos

*Como moderador, quero encerrar eventos, para sinalizar ao público que a arrecadação daquela campanha foi finalizada.*

| ID | Critério de Aceite |
| :--- | :--- |
| <a id="ca-us09-01"></a>CA-US09-01 | Após o encerramento, o status do evento deve mudar para "Encerrado". |
| <a id="ca-us09-02"></a>CA-US09-02 | O sistema não deve permitir novas inscrições de voluntários ou registro de novas intenções de doação para eventos encerrados. |

---

## [US10](backlog.md#us10) - Exibir progresso da meta

*Como voluntário, quero exibir o progresso da meta, para saber em tempo real quanto falta para atingir o objetivo de arrecadação da campanha.*

| ID | Critério de Aceite |
| :--- | :--- |
| <a id="ca-us10-01"></a>CA-US10-01 | O progresso deve ser exibido de forma visual (ex: barra de progresso, gráfico circular) com a porcentagem concluída. |

---

## [US11](backlog.md#us11) - Registrar doações

*Como voluntário, quero registrar a minha intenção de doação, para informar antecipadamente à ONG o que irei entregar no ponto de entrega.*

| ID | Critério de Aceite |
| :--- | :--- |
| <a id="ca-us11-01"></a>CA-US11-01 | O voluntário deve poder selecionar a campanha ativa e o tipo/quantidade de item que deseja doar. |
| <a id="ca-us11-02"></a>CA-US11-02 | O sistema deve gerar um código único ou comprovante digital da "Intenção de Doação" ([RNF07](../13_requisitos/requisitos.md#rnf07)). |

---

## [US12](backlog.md#us12) - Atualizar saldo

*Como moderador, quero atualizar o saldo de itens, para manter o estoque digital fiel às entregas físicas recebidas.*

| ID | Critério de Aceite |
| :--- | :--- |
| <a id="ca-us12-01"></a>CA-US12-01 | O moderador deve poder incrementar ou decrementar a quantidade de itens no estoque geral da ONG manualmente. |
| <a id="ca-us12-02"></a>CA-US12-02 | Toda alteração de saldo deve gerar um registro de log (quem alterou, data, hora, quantidade anterior e nova) ([RNF04](../13_requisitos/requisitos.md#rnf04)). |

---

## [US13](backlog.md#us13) - Confirmar recebimento de doação

*Como moderador, quero confirmar o recebimento de uma doação, para dar baixa na promessa feita pelo voluntário.*

| ID | Critério de Aceite |
| :--- | :--- |
| <a id="ca-us13-01"></a>CA-US13-01 | O moderador deve poder buscar a intenção de doação pelo código gerado ([US11](backlog.md#us11)) ou pelo nome do voluntário. |
| <a id="ca-us13-02"></a>CA-US13-02 | Ao confirmar o recebimento, o status da doação muda de "Pendente" para "Recebida", o saldo de itens ([US12](backlog.md#us12)) é atualizado, e a meta do evento ([US10](backlog.md#us10)) avança. |

---

## [US14](backlog.md#us14) - Exibir eventos

*Como voluntário, quero exibir a vitrine de eventos ativos, para escolher qual campanha da ONG desejo ajudar.*

| ID | Critério de Aceite |
| :--- | :--- |
| <a id="ca-us14-01"></a>CA-US14-01 | A Página de Campanhas deve listar a "Campanha Ativa" em destaque principal e segregar as "Últimas Campanhas Fechadas". |
| <a id="ca-us14-02"></a>CA-US14-02 | O layout de ambas as páginas deve ser totalmente responsivo (mobile e desktop) ([RNF01](../13_requisitos/requisitos.md#rnf01)). |
| <a id="ca-us14-03"></a>CA-US14-03 | A Página da Campanha deve carregar todos os dados detalhados específicos, descrição longa e objetivos da mobilização ativa selecionada. |
| <a id="ca-us14-04"></a>CA-US14-04 | A Página da Campanha deve exibir indicadores visuais claros sobre a meta de arrecadação. |

---

## [US15](backlog.md#us15) - Realizar inscrição em eventos

*Como voluntário, quero realizar a inscrição nos eventos, para confirmar a minha atuação presencial no dia da ação.*

| ID | Critério de Aceite |
| :--- | :--- |
| <a id="ca-us15-01"></a>CA-US15-01 | A página do evento deve conter um botão visível de "Inscrever-se" caso haja vagas para voluntários. |
| <a id="ca-us15-02"></a>CA-US15-02 | O sistema não deve permitir que o mesmo usuário se inscreva mais de uma vez no mesmo evento. Após a confirmação, o botão de "Inscrever-se" deve mudar para o status "Inscrito". |
| <a id="ca-us15-03"></a>CA-US15-03 | O voluntário deve ter a opção de "Cancelar Inscrição" em seu perfil ou na página do evento, liberando a vaga imediatamente no sistema de forma dinâmica. |

---

## [US16](backlog.md#us16) - Exibir informações institucionais

*Como visitante, quero acessar às informações institucionais, para conhecer melhor a história, o impacto e os contato da ONG.*

| ID | Critério de Aceite |
| :--- | :--- |
| <a id="ca-us16-01"></a>CA-US16-01 | A página "Sobre Nós" deve estar acessível sem necessidade de login. |
| <a id="ca-us16-02"></a>CA-US16-02 | O layout da página institucional deve ser totalmente responsivo (mobile, tablet e desktop) ([RNF01](../13_requisitos/requisitos.md#rnf01)). |

---

## [US17](backlog.md#us17) - Visualizar Comprovantes

*Como moderador, quero visualizar os comprovantes enviados, para auditar e validar as doações financeiras.*

| ID | Critério de Aceite |
| :--- | :--- |
| <a id="ca-us17-01"></a>CA-US17-01 | O moderador deve ter acesso a uma lista com todos os comprovantes de doação (ex: imagens ou PDFs de transferências/PIX). |
| <a id="ca-us17-02"></a>CA-US17-02 | O sistema deve permitir que o moderador aprove (contabilizando na meta) ou rejeite o comprovante, alterando o status da doação ([RNF04](../13_requisitos/requisitos.md#rnf04)). |

---

## [US18](backlog.md#us18) - Enviar notas fiscais

*Como moderador, quero anexar notas fiscais, para registrar formalmente os custos logísticos e compras realizadas com o fundo da ONG.*

| ID | Critério de Aceite |
| :--- | :--- |
| <a id="ca-us18-01"></a>CA-US18-01 | O sistema deve aceitar upload de arquivos nos formatos `.pdf`, `.jpg` e `.png`. |
| <a id="ca-us18-02"></a>CA-US18-02 | O moderador deve obrigatoriamente associar a nota fiscal a um evento específico e informar o valor total do gasto ([RNF04](../13_requisitos/requisitos.md#rnf04)). |

---

## [US19](backlog.md#us19) - Gerar relatório de informações do evento

*Como moderador, quero gerar relatórios de encerramento do evento, para agilizar a prestação de contas com os voluntários.*

| ID | Critério de Aceite |
| :--- | :--- |
| <a id="ca-us19-01"></a>CA-US19-01 | O relatório deve compilar, no mínimo: Total arrecadado (por item e financeiro), número de voluntários inscritos e notas fiscais anexadas. |
| <a id="ca-us19-02"></a>CA-US19-02 | O sistema deve permitir a exportação do relatório consolidado nos formatos `.pdf` ou `.csv` ([RNF04](../13_requisitos/requisitos.md#rnf04)). |

---

## Considerações Finais

Os critérios de aceite apresentados neste documento definem as condições mínimas necessárias para validação funcional das histórias de usuário priorizadas no backlog do produto.

A estrutura adotada permite maior rastreabilidade entre requisitos funcionais, requisitos não funcionais, histórias de usuário e futuros casos de teste, facilitando o processo de desenvolvimento, validação e manutenção da solução proposta para a ONG Ação Entre Amigos BSB.

## Histórico de Versão

| Versão | Data | Descrição | Autor(es) | Revisor(es) |
| :---: | :---: | :--- | :---: | :---: |
| 1.0 | 18/05/2026 | Criação da página | [Edson](https://github.com/edso-n) | [Guilherme](https://github.com/GuilhermeOliveira1327)|