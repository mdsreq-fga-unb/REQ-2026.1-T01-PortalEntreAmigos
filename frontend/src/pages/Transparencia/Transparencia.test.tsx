import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Transparencia } from './Transparencia';
import { AuthProvider } from '../../contexts/AuthContext';

const mockAuth = vi.fn();

vi.mock('../../contexts/AuthContext', async () => {
  const actual = await vi.importActual('../../contexts/AuthContext');
  return {
    ...actual,
    useAuth: () => mockAuth(),
  };
});

describe('RF17/RF18 — Página Transparência', () => {
  it('exibe cabeçalho e comprovantes mockados', () => {
    mockAuth.mockReturnValue({ isAdmin: false });
    render(
      <AuthProvider>
        <Transparencia />
      </AuthProvider>,
    );
    expect(screen.getByRole('heading', { level: 1, name: /transparência/i })).toBeInTheDocument();
    expect(screen.getByText('Cesta Básica - Outubro/2025')).toBeInTheDocument();
    expect(screen.getByText('Agasalho Solidário - Junho/2025')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /visualizar/i }).length).toBeGreaterThanOrEqual(4);
  });

  it('admin vê opção de adicionar comprovante', () => {
    mockAuth.mockReturnValue({ isAdmin: true });
    render(
      <AuthProvider>
        <Transparencia />
      </AuthProvider>,
    );
    expect(screen.getAllByRole('button', { name: /adicionar/i }).length).toBeGreaterThanOrEqual(1);
  });
});
