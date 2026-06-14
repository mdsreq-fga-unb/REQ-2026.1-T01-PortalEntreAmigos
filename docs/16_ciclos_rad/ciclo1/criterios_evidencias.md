# Evidências dos Critérios de Aceitação - Ciclo RAD 1

Este documento reúne os testes e as evidências de conformidade dos **Critérios de Aceitação (CA)** definidos para o ciclo de desenvolvimento atual, garantindo a qualidade das entregas sistêmicas para a ONG Ação Entre Amigos BSB.

---

## Validação por História de Usuário

### [US16](backlog.md#us16) - Exibir informações institucionais
*Como visitante, quero acessar às informações institucionais, para conhecer melhor a história, o impacto e os contatos da ONG.*

Abaixo encontra-se a matriz de validação dos critérios de aceite específicos estabelecidos no documento oficial de [Critérios de Aceite](../../15_backlog/criterios_aceitacao.md#ca-us16-01):

| ID do Critério | Critério de Aceite Original | Método de Verificação | Situação no Ciclo |
| :--- | :--- | :--- | :---: |
| [CA-US16-01](../../15_backlog/criterios_aceitacao.md#ca-us16-01) | A página "Sobre Nós" deve estar acessível sem necessidade de login. | **Teste de Rota Pública:** Acesso direto às interfaces da *Home* e *Quem Somos* simulando um usuário visitante (não autenticado). <br> *Resultado:* As informações foram renderizadas corretamente sem barreiras de autenticação. | **Aprovado** |
| [CA-US16-02](../../15_backlog/criterios_aceitacao.md#ca-us16-02) | O layout da página institucional deve ser totalmente responsivo (mobile, tablet e desktop) ([RNF01](../../13_requisitos/requisitos.md#rnf01)). | **Inspeção via DevTools (F12):** Emulação de resoluções de tela em múltiplos dispositivos móveis e desktops. <br> *Resultado:* Ausência de rolagem horizontal (scroll lateral), elementos visuais sem quebras e texto legível em todas as resoluções. | **Aprovado** |

---

## Matriz de Evidências Visuais

Para consolidar a aprovação dos critérios acima, o comportamento e a aderência das interfaces implementadas com o design planejado podem ser visualizados diretamente na documentação de engenharia do ciclo:

* **Evidências Visuais Completas (Desktop e Mobile):** Os componentes codificados e validados estão expostos na seção de construção em [Resultados do Design do Usuário](./fases_rad.md#design-do-usuario).
* **Conformidade Técnica Adicional:** A aderência estrita às regras de negócio e restrições de infraestrutura foi homologada no checklist de [Evidências de DoR e DoD](./dor_dod_evidencias.md).

---

## Considerações Finais

A entrega do **RF16** cumpre com êxito todos os limites de funcionalidade, regras de negócio e critérios de qualidade estipulados para este ciclo de iteração. O incremento de software encontra-se estável e validado para a incorporação oficial na plataforma.

---

## Histórico de Versão

| Versão | Data | Descrição | Autor(es) | Revisor(es) |
| :---: | :---: | :--- | :---: | :---: |
| 1.0 | 13/06/2026 | Documentação inicial do planejamento, design e construção do Ciclo RAD 2 | <br>[Gustavo Gomes](https://github.com/GUGOFO) | Equipe |