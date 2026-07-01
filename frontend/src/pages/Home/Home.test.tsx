import { screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Home } from './Home';
import { renderWithProviders } from '../../test/utils/renderWithProviders';

vi.mock('../../services/api', () => ({
  eventoService: {
    listar: vi.fn().mockResolvedValue([
      {
        id: 1,
        nome: 'Campanha Teste',
        descricao: 'Descrição da campanha',
        status: 'EM_ANDAMENTO',
        progresso_geral: 50,
      },
    ]),
  },
}));

describe('RF16 — Página Home', () => {
  it('exibe dados da campanha ativa quando disponível', async () => {
    renderWithProviders(<Home />);
    expect(await screen.findByText('Campanha Teste')).toBeInTheDocument();
    expect(screen.getByText(/Descrição da campanha/i)).toBeInTheDocument();
  });

  it('mostra botão de doação na home', async () => {
    renderWithProviders(<Home />);
    expect(await screen.findByRole('button', { name: /quero doar agora/i })).toBeInTheDocument();
  });
});
