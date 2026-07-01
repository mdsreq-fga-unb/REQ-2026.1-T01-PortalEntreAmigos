import { screen, fireEvent, render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { MinhaConta } from './MinhaConta';

const mockLogout = vi.fn();
const mockUpdateUser = vi.fn();

const mockUser = {
  nome: 'João Silva',
  email: 'joao@teste.com',
  cpf: '94806608815',
  telefone: '61999999999',
  role: 'USER' as const,
};

vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    user: mockUser,
    isAdmin: false,
    logout: mockLogout,
    updateUser: mockUpdateUser,
  }),
}));

vi.mock('../../services/api', () => ({
  doacaoService: { listarMinhas: vi.fn().mockResolvedValue([]) },
}));

vi.mock('react-hot-toast', () => ({ default: { success: vi.fn(), error: vi.fn() } }));

function renderMinhaConta() {
  return render(
    <MemoryRouter>
      <MinhaConta />
    </MemoryRouter>,
  );
}

describe('RF03/RF04/RF05 — Minha Conta', () => {
  it('exibe dados do usuário logado', async () => {
    renderMinhaConta();
    expect(screen.getByRole('heading', { name: /minha conta/i })).toBeInTheDocument();
    expect(screen.getByText(/olá,\s*joão silva/i)).toBeInTheDocument();
  });

  it('abre modal de visualização do perfil', () => {
    renderMinhaConta();
    fireEvent.click(screen.getByText(/visualizar perfil/i));
    expect(screen.getAllByText('Visualizar Perfil').length).toBeGreaterThan(0);
    expect(screen.getByText('joao@teste.com')).toBeInTheDocument();
  });

  it('abre modal de exclusão de conta (RF05)', () => {
    renderMinhaConta();
    fireEvent.click(screen.getByText(/excluir perfil/i));
    expect(screen.getByText(/excluir conta/i)).toBeInTheDocument();
    expect(screen.getByText(/não pode ser desfeita/i)).toBeInTheDocument();
  });
});
