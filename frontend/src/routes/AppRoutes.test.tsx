import { screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AppRoutes } from './AppRoutes';
import { renderWithProviders } from '../test/utils/renderWithProviders';

vi.mock('../services/api', () => ({
  eventoService: { listar: vi.fn().mockResolvedValue([]) },
  doacaoService: { listarMinhas: vi.fn().mockResolvedValue([]) },
}));

vi.mock('react-hot-toast', () => ({ default: { success: vi.fn(), error: vi.fn() } }));

describe('Rotas da aplicação', () => {
  it('RF16 — carrega página Sobre em /sobre', async () => {
    renderWithProviders(<AppRoutes />, { route: '/sobre' });
    expect(await screen.findByText('Missão')).toBeInTheDocument();
  });

  it('RF14 — carrega página Campanhas em /campanhas', async () => {
    renderWithProviders(<AppRoutes />, { route: '/campanhas' });
    expect(await screen.findByRole('heading', { name: /campanhas/i })).toBeInTheDocument();
  });

  it('RF17/RF18 — carrega Transparência em /transparencia', async () => {
    renderWithProviders(<AppRoutes />, { route: '/transparencia' });
    expect(await screen.findByRole('heading', { name: /transparência/i })).toBeInTheDocument();
  });

  it('RF01 — carrega Cadastro em /cadastro', () => {
    renderWithProviders(<AppRoutes />, { route: '/cadastro' });
    expect(screen.getByRole('heading', { name: /criar conta/i })).toBeInTheDocument();
  });

  it('RF02 — carrega Login em /login', () => {
    renderWithProviders(<AppRoutes />, { route: '/login' });
    expect(screen.getByRole('heading', { name: /acessar conta/i })).toBeInTheDocument();
  });
});
