import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { DonationSelector, DonationItem } from './DonationSelector';
import { describe, it, expect, vi } from 'vitest';

// Mock do AuthContext para simular um usuário logado
vi.mock('../../../../contexts/AuthContext', () => ({
  useAuth: () => ({ user: { nome: 'Teste', email: 'teste@teste.com' } }),
}));

const mockItems: DonationItem[] = [
  { id: '1', name: 'Arroz', color: '#ff0000', collected: 10, goal: 100 },
  { id: '2', name: 'Feijão', color: '#00ff00', collected: 5, goal: 50 },
];

describe('Componente DonationSelector', () => {
  it('deve renderizar a lista de itens com o progresso correto', () => {
    render(
      <MemoryRouter>
        <DonationSelector items={mockItems} />
      </MemoryRouter>
    );

    expect(screen.getByText('Arroz')).toBeInTheDocument();
    expect(screen.getByText('10 / 100 prometidos')).toBeInTheDocument();
  });

  it('deve desabilitar o botão de decrementar quando a quantidade for zero', () => {
    render(
      <MemoryRouter>
        <DonationSelector items={mockItems} />
      </MemoryRouter>
    );

    const botaoMenosArroz = screen.getByRole('button', { name: /diminuir quantidade de arroz/i });
    expect(botaoMenosArroz).toBeDisabled();
  });

  it('deve incrementar e atualizar os totais ao clicar em adicionar', () => {
    render(
      <MemoryRouter>
        <DonationSelector items={mockItems} />
      </MemoryRouter>
    );

    const botaoMaisArroz = screen.getByRole('button', { name: /incrementar quantidade de arroz/i });

    fireEvent.click(botaoMaisArroz);
    fireEvent.click(botaoMaisArroz);

    // O contador individual do Arroz deve marcar 2
    expect(screen.getByText('2')).toBeInTheDocument();

    // O botão de promessa geral deve refletir as 2 unidades selecionadas
    expect(screen.getByText('PROMETER DOAR ITENS SELECIONADOS (2)')).toBeInTheDocument();

    // O botão de menos do Arroz agora deve estar ativo
    const botaoMenosArroz = screen.getByRole('button', { name: /diminuir quantidade de arroz/i });
    expect(botaoMenosArroz).not.toBeDisabled();
  });
});