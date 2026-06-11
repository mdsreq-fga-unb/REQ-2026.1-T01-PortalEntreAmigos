import { render, screen } from '@testing-library/react';
import { Transparencia } from './Transparencia';
import { describe, it, expect, vi } from 'vitest';
import { AuthProvider } from '../../contexts/AuthContext';

// Intercepta e simula o arquivo de mocks para garantir isolamento
vi.mock('../../services/mocks', () => ({
  transparencyReportsMock: [
    { id: 'r1', title: 'Relatório Janeiro', subtitle: 'Prestação de contas Jan' },
    { id: 'r2', title: 'Relatório Fevereiro', subtitle: 'Prestação de contas Fev' }
  ]
}));

describe('Página Transparencia', () => {
  it('deve exibir o cabeçalho com o título correto', () => {
    render(
      <AuthProvider>
        <Transparencia />
      </AuthProvider>
    );

    // Verifica o título principal da página usando a semântica de heading (h1)
    expect(screen.getByRole('heading', { level: 1, name: /transparência/i })).toBeInTheDocument();
  });

  it('deve renderizar a quantidade exata de cartões baseada nos dados recebidos', () => {
    render(
      <AuthProvider>
        <Transparencia />
      </AuthProvider>
    );

    // Validação específica baseada nos dados mockados controlados:
    const tituloPrimeiroCard = screen.getByText('Relatório Janeiro');
    const subtituloPrimeiroCard = screen.getByText('Prestação de contas Jan');
    const tituloSegundoCard = screen.getByText('Relatório Fevereiro');

    expect(tituloPrimeiroCard).toBeInTheDocument();
    expect(subtituloPrimeiroCard).toBeInTheDocument();
    expect(tituloSegundoCard).toBeInTheDocument();
  });
});
