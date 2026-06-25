import { screen, render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { GerenciarCampanhas } from './GerenciarCampanhas';

const mockAuth = vi.fn();

vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => mockAuth(),
}));

vi.mock('../../services/api', () => ({
  eventoService: {
    listar: vi.fn().mockResolvedValue([
      { id: 5, nome: 'Campanha Admin', status: 'EM_ANDAMENTO' },
    ]),
  },
}));

vi.mock('react-hot-toast', () => ({ default: { error: vi.fn() } }));

function renderGerenciar() {
  return render(
    <MemoryRouter>
      <GerenciarCampanhas />
    </MemoryRouter>,
  );
}

describe('RF06 — Gerenciar Campanhas (painel admin)', () => {
  beforeEach(() => {
    mockAuth.mockReset();
  });

  it('bloqueia acesso para usuário não administrador', () => {
    mockAuth.mockReturnValue({ user: { nome: 'User' }, isAdmin: false });
    renderGerenciar();
    expect(screen.getByText(/acesso restrito/i)).toBeInTheDocument();
  });

  it('exibe painel para administrador', async () => {
    mockAuth.mockReturnValue({
      user: { nome: 'Admin', email: 'admin@teste.com', role: 'ADMIN' },
      isAdmin: true,
    });
    renderGerenciar();
    expect(await screen.findByText(/painel administrativo/i)).toBeInTheDocument();
    expect(screen.getByText(/gerenciar campanha ativa/i)).toBeInTheDocument();
  });
});
