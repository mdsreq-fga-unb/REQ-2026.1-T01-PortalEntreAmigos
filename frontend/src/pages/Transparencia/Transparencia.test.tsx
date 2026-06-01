import { render, screen } from '@testing-library/react';
import { Transparencia } from './Transparencia';
import { describe, it, expect, vi } from 'vitest';

// Intercepta e simula o arquivo de mocks para que o teste não dependa de dados externos instáveis
vi.mock('../../services/mocks', () => ({
  transparencyReportsMock: [
    { id: 'r1', title: 'Relatório Janeiro', subtitle: 'Prestação de contas Jan' },
    { id: 'r2', title: 'Relatório Fevereiro', subtitle: 'Prestação de contas Fev' }
  ]
}));

describe('Página Transparencia', () => {
  it('deve exibir o título da página e a lista simulada de relatórios', () => {
    render(<Transparencia />);

    // Verifica elementos textuais fixos do cabeçalho
    expect(screen.getByText('TRANSPARÊNCIA')).toBeInTheDocument();
    
    // Verifica se os TransparencyCards foram renderizados com base no nosso mock acima
    expect(screen.getByText('Relatório Janeiro')).toBeInTheDocument();
    expect(screen.getByText('Relatório Fevereiro')).toBeInTheDocument();
  });
});