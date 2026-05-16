# Elicitação de Requisitos

## Introdução

A elicitação de requisitos consiste no processo de identificação, análise e documentação das necessidades dos stakeholders para o desenvolvimento da solução proposta.

Os requisitos apresentados nesta página foram levantados a partir das reuniões realizadas com o cliente, análise do contexto operacional da ONG Ação Entre Amigos BSB e discussões conduzidas pela equipe ao longo do projeto.

Os requisitos foram divididos em duas categorias principais:

- Requisitos Funcionais (RF);
- Requisitos Não Funcionais (RNF).

Os requisitos funcionais descrevem os serviços e funcionalidades que o sistema deverá oferecer aos usuários. Já os requisitos não funcionais representam restrições, características de qualidade e critérios relacionados ao funcionamento da aplicação.

---

## Requisitos Funcionais

Os requisitos funcionais representam as funcionalidades que deverão ser implementadas na plataforma.

---

### Gestão de Usuários

| ID | Requisito Funcional | Característica do Produto |
| :---: | :--- | :---: |
| <a id="rf01"></a>RF01 | Cadastrar usuário | [CP7](../02_solucao/produto.md#cp7) |
| <a id="rf02"></a>RF02 | Login de usuário | [CP7](../02_solucao/produto.md#cp7) |
| <a id="rf03"></a>RF03 | Visualizar perfil | [CP6](../02_solucao/produto.md#cp6) |
| <a id="rf04"></a>RF04 | Editar perfil | [CP6](../02_solucao/produto.md#cp6) |
| <a id="rf05"></a>RF05 | Excluir conta | [CP7](../02_solucao/produto.md#cp7) |

---

### Gestão de Eventos

| ID | Requisito Funcional | Característica do Produto |
| :---: | :--- | :---: |
| <a id="rf06"></a>RF06 | Criar eventos | [CP1](../02_solucao/produto.md#cp1) |
| <a id="rf07"></a>RF07 | Editar eventos | [CP1](../02_solucao/produto.md#cp1) |
| <a id="rf08"></a>RF08 | Excluir eventos | [CP1](../02_solucao/produto.md#cp1) |
| <a id="rf09"></a>RF09 | Encerrar eventos | [CP1](../02_solucao/produto.md#cp1) |
| <a id="rf10"></a>RF10 | Exibir progresso da meta | [CP2](../02_solucao/produto.md#cp2) |

---

### Gestão Financeira e Doações

| ID | Requisito Funcional | Característica do Produto |
| :---: | :--- | :---: |
| <a id="rf11"></a>RF11 | Registrar doação | [CP3](../02_solucao/produto.md#cp3) |
| <a id="rf12"></a>RF12 | Atualizar saldo | [CP4](../02_solucao/produto.md#cp4) |
| <a id="rf13"></a>RF13 | Confirmar recebimento de doação | [CP4](../02_solucao/produto.md#cp4) |

---

### Participação em Eventos

| ID | Requisito Funcional | Característica do Produto |
| :---: | :--- | :---: |
| <a id="rf14"></a>RF14 | Exibir eventos | [CP2](../02_solucao/produto.md#cp2) |
| <a id="rf15"></a>RF15 | Realizar inscrição em eventos | [CP3](../02_solucao/produto.md#cp3) |
| <a id="rf16"></a>RF16 | Exibir informações institucionais | [CP5](../02_solucao/produto.md#cp5) |

---

### Transparência e Prestação de Contas

| ID | Requisito Funcional | Característica do Produto |
| :---: | :--- | :---: |
| <a id="rf17"></a>RF17 | Visualizar comprovantes | [CP5](../02_solucao/produto.md#cp5) |
| <a id="rf18"></a>RF18 | Enviar notas fiscais | [CP4](../02_solucao/produto.md#cp4) |
| <a id="rf19"></a>RF19 | Gerar relatório de informações do evento | [CP5](../02_solucao/produto.md#cp5) |

---

## Rastreabilidade dos Requisitos

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://embed.figma.com/board/kMxEVxPcaLlDG02xoxBjUd/Tabela-completa-OE--CP--RF?node-id=0-1&embed-host=share" allowfullscreen></iframe>


## Requisitos Não Funcionais

Os requisitos não funcionais descrevem restrições e características de qualidade esperadas para o sistema.

| ID | Requisito Não Funcional | Sobre | Classificação |
| :---: | :---: | :---: | :-----: |
| RNF01 | Responsividade | O sistema deve manter todos os elementos da interface visíveis, operáveis e sem sobreposição em computadores, tablets e smartphones, garantindo adaptação da interface em diferentes tamanhos de tela. | Usabilidade (URPS+) |
| RNF02 | Tempo de Resposta | O sistema deve responder às ações do usuário em até 3 segundos em operações comuns, como login, cadastro e carregamento de eventos. | Desempenho (URPS+) |
| RNF03 | Criptografia de Senhas | O sistema deve armazenar as credenciais de senha dos usuários exclusivamente na forma de hash criptográfico, utilizando o algoritmo PBKDF2 com a função de dispersão (HASH) SHA-256, garantindo maior segurança das informações.| Segurança (Sommerville) |
| RNF04 | Controle de Acesso | O sistema deve restringir funcionalidades marcadas como administrativas apenas a usuários com perfil de administrador. | Segurança (Sommerville) |
| RNF05 | Compatibilidade entre Navegadores | O sistema deve funcionar corretamente nos principais navegadores modernos, como Google Chrome, Mozilla Firefox, Microsoft Edge e Safari. | Compatibilidade (URPS+) |
| RNF06 | Atualização Dinâmica | O sistema deve atualizar o progresso das campanhas toda vez que a página do usuário recarregar. | Desempenho (URPS+) |
| RNF07 | Persistência de Dados | O sistema deve garantir que informações cadastradas permaneçam armazenadas após reinicializações ou atualizações do sistema. | Confiabilidade (URPS+) |

---

## Considerações

Os requisitos apresentados representam uma visão inicial das funcionalidades e características esperadas para a solução proposta.

Esses requisitos poderão sofrer refinamentos ao longo do desenvolvimento do projeto, conforme novas validações forem realizadas junto ao cliente e aos usuários envolvidos.

---

## Histórico de Versão

| Versão | Data | Descrição | Autor(es) | Revisor(es) |
| :---: | :---: | :--- | :---: | :---: |
| 1.0 | 13/05/2026 | Criação da página de elicitação de requisitos | [Guilherme](https://github.com/GuilhermeOliveira1327) | Equipe |
| 1.1 | 16/05/2026 | adição do RF 13 | [Guilherme](https://github.com/GuilhermeOliveira1327) | Equipe |