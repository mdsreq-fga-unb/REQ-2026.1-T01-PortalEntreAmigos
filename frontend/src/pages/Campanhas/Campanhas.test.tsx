import { screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Campanhas } from './Campanhas';
import { renderWithProviders } from '../../test/utils/renderWithProviders';

vi.mock('../../services/api', () => ({
  eventoService: {
    listar: vi.fn().mockResolvedValue([
      { id: 1, nome: 'Ativa 1', descricao: 'Desc', status: 'EM_ANDAMENTO', progresso_geral: 10, data_fim: '2026-12-31' },
      { id: 2, nome: 'Encerrada', descricao: 'Desc', status: 'CONCLUIDO', progresso_geral: 100, data_fim: '2025-12-31' },
    ]),
  },
}));

vi.mock('react-hot-toast', () => ({ default: { error: vi.fn() } }));

describe('RF14 — Página Campanhas', () => {
  it('lista campanhas ativas e encerradas', async () => {
    renderWithProviders(<Campanhas />);
    expect(await screen.findByText('Ativa 1')).toBeInTheDocument();
    expect(screen.getByText('Encerrada')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /campanhas/i })).toBeInTheDocument();
  });
});
