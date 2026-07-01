# Declaração de Requisitos

## Introdução

A declaração de requisitos consiste no processo de identificação, análise e documentação das necessidades dos stakeholders para o desenvolvimento da solução proposta.

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
| <a id="rf16"></a>RF16 | Exibir informações institucionais | [CP8](../02_solucao/produto.md#cp8) |

---

### Transparência e Prestação de Contas

| ID | Requisito Funcional | Característica do Produto |
| :---: | :--- | :---: |
| <a id="rf17"></a>RF17 | Visualizar comprovantes | [CP5](../02_solucao/produto.md#cp5) |
| <a id="rf18"></a>RF18 | Enviar notas fiscais | [CP4](../02_solucao/produto.md#cp4) |
| <a id="rf19"></a>RF19 | Gerar relatório de informações do evento | [CP5](../02_solucao/produto.md#cp5) |

---

## Requisitos Não Funcionais

Os requisitos não funcionais descrevem restrições e características de qualidade esperadas para o sistema.

| ID | Requisito Não Funcional | Sobre | Método de Validação | Classificação |
| :---: | :--- | :--- | :--- | :-----: |
| <a id="rnf01"></a>RNF01 | Responsividade | O sistema deve manter todos os elementos da interface visíveis, operáveis e sem sobreposição em computadores, tablets e smartphones, garantindo adaptação da interface em diferentes tamanhos de tela. | **Uso do DevTools (F12):** Abrir o sistema no Google Chrome, pressionar F12, ativar a "Device Toolbar" (botão de celular/tablet) e selecionar telas como "iPhone 12" e "iPad". **Critério de sucesso:** Não deve existir barra de rolagem horizontal (scroll lateral) e nenhum botão deve ficar sobreposto ou cortado. | Usabilidade (URPS+) |
| <a id="rnf02"></a>RNF02 | Tempo de Resposta | O sistema deve responder às ações do usuário em até 3 segundos em operações comuns, como login, cadastro e carregamento de eventos. | **Aba Network (F12):** Abrir o painel de desenvolvedor do navegador, ir na aba "Network" (Rede) e realizar o login ou abrir a tela de eventos. **Critério de sucesso:** O tempo de carregamento das requisições principais na coluna "Time" deve registrar um valor inferior a 3.000 milissegundos (3 segundos). | Desempenho (URPS+) |
| <a id="rnf03"></a>RNF03 | Criptografia de Senhas | O sistema deve armazenar as credenciais de senha dos usuários exclusivamente na forma de hash criptográfico, utilizando o algoritmo PBKDF2 com a função de dispersão (HASH) SHA-256, garantindo maior segurança das informações. | **Inspeção de Banco de Dados:** Criar um usuário de teste na aplicação com a senha "123456". Em seguida, abrir o gerenciador do banco de dados. **Critério de sucesso:** O campo de senha salvo na tabela/coleção deve estar como uma string ilegível (hash) e não como o texto limpo "123456". | Segurança (Sommerville) |
| <a id="rnf04"></a>RNF04 | Validação de Tokens | O sistema deve implementar uma arquitetura de Controle de Acesso, validando via tokens de autenticação todas as requisições enviadas para rotas restritas no backend. | **Teste de Violação de Rota:** Criar duas contas (um Admin e um Voluntário). Logar com a conta de Voluntário e tentar acessar diretamente pela barra de endereços a URL de criar eventos. **Critério de sucesso:** O sistema deve bloquear o acesso e redirecionar o usuário ou exibir uma mensagem de acesso negado. | Segurança (Sommerville) |
| <a id="rnf05"></a>RNF05 | Compatibilidade entre Navegadores | O sistema deve funcionar corretamente nos principais navegadores modernos, como Google Chrome, Mozilla Firefox, Microsoft Edge e Safari. | **Teste de Renderização Manual:** Subir a aplicação localmente (localhost) e abrir a mesma tela principal nos navegadores descritos no RNF. **Critério de sucesso:** O layout, as cores e o funcionamento dos botões devem ser idênticos e funcionais nos três ambientes. | Compatibilidade (URPS+) |
| <a id="rnf06"></a>RNF06 | Atualização Dinâmica | O sistema deve atualizar o progresso das campanhas toda vez que a página do usuário recarregar. | **Teste de Abas Simultâneas:** Abrir o sistema em duas abas do navegador. Na Aba 1 (Admin), registrar o recebimento de uma doação. Na Aba 2 (Voluntário), pressionar F5 (Recarregar). **Critério de sucesso:** A barra de progresso da meta na Aba 2 deve refletir imediatamente o novo valor atualizado pela Aba 1. | Desempenho (URPS+) |
| <a id="rnf07"></a>RNF07 | Persistência de Dados | O sistema deve garantir que informações cadastradas permaneçam armazenadas após reinicializações ou atualizações do sistema. | **Teste de Reinicialização de Servidor:** Cadastrar um novo evento na plataforma. No terminal do VS Code, derrubar o servidor backend/banco de dados (Ctrl + C). Iniciar o servidor novamente e recarregar a página. **Critério de sucesso:** O evento recém-criado deve continuar visível e intacto na listagem. | Confiabilidade (URPS+) |
| <a id="rnf08"></a>RNF08 | Privacidade e Conformidade (LGPD) | O sistema deve garantir a privacidade dos dados coletados nas etapas de cadastro e transações, exigindo aceitação explícita de termos e assegurando a exclusão definitiva ou anonimização irreversível de dados sensíveis na remoção de contas. | **Inspeção de Contratos e Banco:** Verificar a presença de termo de consentimento na interface de cadastro e inspecionar os registros do banco após o fluxo de exclusão. **Critério de sucesso:** Nenhum dado pessoal identificável do usuário excluído deve persistir legível na base. | Segurança (Sommerville) |
| <a id="rnf09"></a>RNF09 | Acessibilidade Mínima | A interface do usuário deve possuir suporte inicial para acessibilidade digital, incluindo o uso correto de tags HTML semânticas, atributos `aria-label` para botões e constraste cromático adequado entre texto e planos de fundo. | **Auditoria Automatizada via Lighthouse:** Abrir a aplicação em homologação, acessar as ferramentas de desenvolvedor (F12) e rodar o relatório do Google Lighthouse na seção "Accessibility". **Critério de sucesso:** A nota obtida para acessibilidade na página inicial e nas de eventos deve ser igual ou superior a 85 pontos. | Usabilidade (URPS+) |
| <a id="rnf10"></a>RNF10 | Segurança e Validação de Uploads | O backend da aplicação deve validar estritamente todos os arquivos enviados (comprovantes e notas fiscais), aplicando limite de tamanho de até 5MB, restringindo extensões para formatos permitidos (.pdf, .png, .jpg) e barrando scripts/executáveis. | **Injeção de Arquivo Inválido:** Submeter um arquivo com extensão simulada maliciosa (ex: `.exe` ou `.js`) ou um PDF acima do tamanho limite na rota de envio de notas fiscais (RF18). **Critério de sucesso:** A requisição deve ser bloqueada na API com retorno HTTP 400 ou 415, emitindo mensagem de erro amigável na interface. | Segurança (Sommerville) |

---

## Regras de Negócio

A tabela abaixo estabelece as restrições operacionais, limites de funcionalidade e regras de governança sistêmica que regem o comportamento das regras de negócio aplicadas à plataforma.

| ID | Nome da Regra | Descrição / Restrição Sistêmica | Justificativa de Negócio | Fonte | Impacto Esperado no Código | RFs Relacionados |
| :---: | :--- | :--- | :--- | :---: | :--- | :--- |
| **RN-01** | Permissão para Gestão Administrativa | Apenas usuários autenticados com nível de permissão "Moderador" podem criar, editar, excluir ou encerrar eventos, gerenciar saldos de estoque e auditar comprovantes ou notas fiscais. | Garantir a segurança operacional da ONG, evitando fraudes ou modificações indevidas por usuários comuns. | Alinhamento com o Cliente | O sistema validará a flag de administrador antes de renderizar componentes ou processar requisições dessas rotas. | [RF06](#rf06), [RF07](#rf07), [RF08](#rf08), [RF09](#rf09), [RF12](#rf12), [RF13](#rf13), [RF17](#rf17), [RF18](#rf18), [RF19](#rf19) |
| **RN-02** | Apagamento de Dados | No momento da exclusão de uma conta de usuário, todos os seus dados pessoais sensíveis e identificáveis devem ser permanentemente removidos ou anonimizados. | Cumprimento estrito das obrigações legais de privacidade e autodeterminação informativa impostas pela LGPD. | Lei Geral de Proteção de Dados | A rotina de exclusão apagará ou descaracterizará irreversivelmente campos nominais e e-mails associados no banco de dados. | [RF05](#rf05) |
| **RN-03** | Bloqueio de Ações em Eventos Encerrados | Impedir novas inscrições de voluntários ou registros de intenções de doações para campanhas cujo status atual seja igual a "Encerrado". | Evitar gargalos logísticos e frustrações de voluntários que tentem apoiar mobilizações já finalizadas pela ONG. | Alinhamento com o Cliente / Critérios de Aceite | Desativação estática de botões de ação nas interfaces públicas e rejeição de payloads de submissão no backend. | [RF09](#rf09), [RF11](#rf11), [RF15](#rf15) |
| **RN-04** | Sincronização de Atualizações Cadastrais | Alterações efetuadas pelo usuário em seu Nome ou Senha devem propagar-se e refletir de forma síncrona na interface e na sessão ativa. | Garantir consistência de dados e cumprir com os critérios de persistência estável em tempo real. | Critérios de Aceite | Atualização reativa do estado global de autenticação no frontend imediatamente após o retorno positivo da API. | [RF04](#rf04) |
| **RN-05** | Unicidade de Inscrição por Campanha | Impedir estritamente que um mesmo usuário voluntário realize mais de uma inscrição ativa para atuar presencialmente no mesmo evento social. | Evitar distorções na contagem de vagas e falhas no planejamento logístico de equipes de campo presenciais. | Alinhamento com o Cliente / Critérios de Aceite | O sistema travará o botão de envio e modificará o rótulo para o status fixo "Inscrito" caso detecte registro existente. | [RF15](#rf15) |

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
| 1.2 | 27/06/2026 | Adicionar RNFs | [Gustavo Gomes](https://github.com/GUGOFO) | Equipe |