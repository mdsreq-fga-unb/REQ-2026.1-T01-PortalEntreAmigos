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

vi.mock('../../services/api', () => ({
  transparenciaService: {
    listar: vi.fn().mockResolvedValue([
      { id: 1, nome: 'Cesta Básica - Outubro/2025', arquivo_pdf: 'http://localhost/cesta.pdf' },
      { id: 2, nome: 'Agasalho Solidário - Junho/2025', arquivo_pdf: 'http://localhost/agasalho.pdf' },
      { id: 3, nome: 'Outro 1', arquivo_pdf: 'http://localhost/1.pdf' },
      { id: 4, nome: 'Outro 2', arquivo_pdf: 'http://localhost/2.pdf' }
    ])
  }
}));

describe('RF17/RF18 — Página Transparência', () => {
  it('exibe cabeçalho e comprovantes mockados', async () => {
    mockAuth.mockReturnValue({ isAdmin: false });
    render(
      <AuthProvider>
        <Transparencia />
      </AuthProvider>,
    );
    expect(await screen.findByRole('heading', { level: 1, name: /transparência/i })).toBeInTheDocument();
    expect(screen.getByText('Cesta Básica - Outubro/2025')).toBeInTheDocument();
    expect(screen.getByText('Agasalho Solidário - Junho/2025')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /visualizar/i }).length).toBeGreaterThanOrEqual(4);
  });

  it('admin vê opção de adicionar comprovante', async () => {
    mockAuth.mockReturnValue({ isAdmin: true });
    render(
      <AuthProvider>
        <Transparencia />
      </AuthProvider>,
    );
    expect((await screen.findAllByRole('button', { name: /adicionar/i })).length).toBeGreaterThanOrEqual(1);
  });
});
