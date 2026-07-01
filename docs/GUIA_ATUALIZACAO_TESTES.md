# Atualização — Testes Automatizados (Grupo 01)

**Responsável:** Kaio Amoury  
**Branch:** `feature/testes-rf-completos`  
**Base:** `develop`  
**Commit:** `9e05ee3`  
**Data:** 18/05/2026  

> A branch `main` **não foi alterada**. Todo o trabalho está isolado nesta feature branch.

---

## O que mudou

Foi adicionada uma suíte de **testes automatizados** cobrindo os requisitos funcionais **RF01 a RF19** (com RF15 parcial — ver observação abaixo).

### Backend (`backend/app/tests/`)

| Arquivo | Conteúdo |
|---------|----------|
| `conftest.py` | Fixtures compartilhadas (usuário, admin, evento, item de doação) |
| `test_rf01_rf05_usuarios.py` | Cadastro, login, perfil, exclusão |
| `test_rf06_rf09_eventos.py` | CRUD de campanhas + listagem pública |
| `test_rf10_rf13_doacoes.py` | Progresso, doações, confirmação admin |
| `test_rf19_relatorio.py` | PDF de relatório + ativação de conta |
| `tests.py` | Esvaziado — testes migrados para a pasta `tests/` |

### Frontend (`frontend/src/`)

| Arquivo | Conteúdo |
|---------|----------|
| `pages/Login/Login.test.tsx` | RF02 |
| `pages/Cadastro/Cadastro.test.tsx` | RF01 |
| `pages/MinhaConta/MinhaConta.test.tsx` | RF03, RF04, RF05 |
| `pages/GerenciarCampanhas/GerenciarCampanhas.test.tsx` | RF06 |
| `pages/Home/Home.test.tsx` + `pages/Sobre/Sobre.test.tsx` | RF16 |
| `pages/Campanhas/Campanhas.test.tsx` | RF14 |
| `pages/Transparencia/Transparencia.test.tsx` | RF17, RF18 (atualizado) |
| `pages/Doar/components/DonationProgress/DonationProgress.test.tsx` | RF10 |
| `pages/Doar/components/DonationSelector/DonationSelector.test.tsx` | RF11 (já existia) |
| `pages/ConfirmacaoEmail/ConfirmacaoEmail.test.tsx` | Ativação de e-mail |
| `routes/AppRoutes.test.tsx` | Rotas principais |
| `contexts/AuthContext.test.tsx` | Sessão / login |
| `components/Navbar/Navbar.test.tsx` | Navegação (já existia) |
| `test/utils/renderWithProviders.tsx` | Helper para testes com Router + Auth |
| `setupTests.js` | Mock de `ResizeObserver` (Recharts) |

### Outros

| Arquivo | Mudança |
|---------|---------|
| `frontend/package.json` | Scripts `test:run` e `test:coverage` |
| `docs/TESTES_RF.md` | Matriz RF → arquivo de teste |

---

## Como atualizar o repositório local

```bash
git fetch origin
git checkout feature/testes-rf-completos
git pull origin feature/testes-rf-completos
```

Para voltar ao código principal da aplicação depois:

```bash
git checkout develop
git pull origin develop
```

---

## Como rodar os testes

### Frontend (confirmado ✅ — 33 testes passando)

```bash
cd frontend
npm install
npm run test:run
```

### Backend (~33 testes — requer Python 3.12 ou Docker)

**Opção 1 — Docker (recomendado pelo projeto):**

```bash
docker compose up -d
docker exec portal_backend pytest -v
```

**Opção 2 — Local (Python 3.12+):**

```bash
cd backend
pip install -r requirements.txt
pytest -v
```

> O projeto usa Django 6, que exige Python 3.12+. Em máquinas com Python 3.11, use o Docker.

---

## Status da verificação (18/05/2026)

| Camada | Status | Detalhe |
|--------|--------|---------|
| Frontend | ✅ OK | `14` arquivos, `33` testes, todos passando |
| Backend | ⏳ Aguardando Docker | Não foi possível rodar localmente sem Docker Desktop ligado |
| CI GitHub | ⏳ Após PR | Workflows rodam em PR para `develop` ou `main` |

---

## Observação — RF15

**Inscrição de voluntários em eventos (RF15)** ainda não tem endpoint na API. O teste backend está marcado como `skip`. O campo `capacidade_voluntarios` já é validado na listagem de eventos.

---

## Próximo passo sugerido

Abrir Pull Request de `feature/testes-rf-completos` → `develop`:

https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-PortalEntreAmigos/pull/new/feature/testes-rf-completos
