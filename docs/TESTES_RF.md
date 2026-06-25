# Matriz de Testes Automatizados — Requisitos Funcionais

Este documento mapeia cada RF (RF01–RF19) aos testes automatizados do Portal Entre Amigos.

## Ferramentas

| Camada | Framework | Comando |
|--------|-----------|---------|
| Backend | **pytest** + **Django REST Framework** `APIClient` | `cd backend && pytest -v` |
| Frontend | **Vitest** + **React Testing Library** + **jsdom** | `cd frontend && npm run test:run` |

## Backend (`backend/app/tests/`)

| RF | Descrição | Arquivo de teste |
|----|-----------|------------------|
| RF01 | Cadastro de usuário | `test_rf01_rf05_usuarios.py` |
| RF02 | Login / JWT | `test_rf01_rf05_usuarios.py` |
| RF03 | Visualizar perfil | `test_rf01_rf05_usuarios.py` |
| RF04 | Editar perfil | `test_rf01_rf05_usuarios.py` |
| RF05 | Exclusão de conta (modelo) | `test_rf01_rf05_usuarios.py` |
| RF06 | Criar evento/campanha | `test_rf06_rf09_eventos.py` |
| RF07 | Editar evento | `test_rf06_rf09_eventos.py` |
| RF08 | Excluir evento | `test_rf06_rf09_eventos.py` |
| RF09 | Encerrar evento | `test_rf06_rf09_eventos.py` |
| RF10 | Progresso da meta | `test_rf10_rf13_doacoes.py` |
| RF11 | Registrar doação | `test_rf10_rf13_doacoes.py` |
| RF12 | Atualizar saldo ao confirmar | `test_rf10_rf13_doacoes.py` |
| RF13 | Confirmar recebimento (admin) | `test_rf10_rf13_doacoes.py` |
| RF14 | Listar eventos públicos | `test_rf06_rf09_eventos.py` |
| RF15 | Inscrição voluntários | *skip* — não implementado na API |
| RF19 | Relatório PDF | `test_rf19_relatorio.py` |
| — | Ativação de conta por e-mail | `test_rf19_relatorio.py` |

## Frontend (`frontend/src/`)

| RF | Descrição | Arquivo de teste |
|----|-----------|------------------|
| RF01 | Formulário de cadastro | `pages/Cadastro/Cadastro.test.tsx` |
| RF02 | Login + AuthContext | `pages/Login/Login.test.tsx`, `contexts/AuthContext.test.tsx` |
| RF03–RF05 | Minha Conta | `pages/MinhaConta/MinhaConta.test.tsx` |
| RF06 | Painel admin campanhas | `pages/GerenciarCampanhas/GerenciarCampanhas.test.tsx` |
| RF10 | Gráfico de progresso | `pages/Doar/components/DonationProgress/DonationProgress.test.tsx` |
| RF11 | Seletor de doação | `pages/Doar/components/DonationSelector/DonationSelector.test.tsx` |
| RF14 | Página Campanhas | `pages/Campanhas/Campanhas.test.tsx` |
| RF15 | Inscrição | *coberto indiretamente* — campo `capacidade_voluntarios` no backend |
| RF16 | Home + Sobre | `pages/Home/Home.test.tsx`, `pages/Sobre/Sobre.test.tsx` |
| RF17–RF18 | Transparência | `pages/Transparencia/Transparencia.test.tsx` |
| — | Rotas da aplicação | `routes/AppRoutes.test.tsx` |
| — | Navbar | `components/Navbar/Navbar.test.tsx` |
| — | Confirmação de e-mail | `pages/ConfirmacaoEmail/ConfirmacaoEmail.test.tsx` |

## CI

Os workflows `.github/workflows/teste-backend.yml` e `teste-frontend.yml` executam os testes em push/PR nas branches `main` e `develop`.
