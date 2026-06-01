import { render, screen, fireEvent } from '@testing-library/react';
import { DonationSelector, DonationItem } from './DonationSelector';
import { describe, it, expect } from 'vitest';

// Dados fictícios controlados para passar como propriedade (props)
const mockItems: DonationItem[] = [
  { id: '1', name: 'Arroz', color: '#ff0000', collected: 10, goal: 100 },
  { id: '2', name: 'Feijão', color: '#00ff00', collected: 5, goal: 50 },
];

describe('Componente DonationSelector', () => {
  it('deve renderizar a lista de itens com o progresso correto', () => {
    render(<DonationSelector items={mockItems} />);

    expect(screen.getByText('Arroz')).toBeInTheDocument();
    expect(screen.getByText('10 / 100 kg arrecadado')).toBeInTheDocument();
  });

  it('deve desabilitar o botão de decrementar quando a quantidade selecionada for zero', () => {
    render(<DonationSelector items={mockItems} />);
    
    // Como os botões usam apenas ícones do react-icons, pegamos todos os botões da tela
    const buttons = screen.getAllByRole('button');
    const firstMinusButton = buttons[0]; // O primeiro botão gerado no map é o "-" do Arroz
    
    expect(firstMinusButton).toBeDisabled();
  });

  it('deve incrementar e atualizar o total selecionado ao clicar no botão de mais', () => {
    render(<DonationSelector items={mockItems} />);

    const buttons = screen.getAllByRole('button');
    const firstPlusButton = buttons[1]; // O segundo botão gerado no map é o "+" do Arroz

    // Clica para adicionar 1 item
    fireEvent.click(firstPlusButton);

    // O contador individual deve passar de 0 para 1
    expect(screen.getByText('1')).toBeInTheDocument();

    // O botão de envio lá embaixo deve atualizar o contador geral de itens selecionados
    expect(screen.getByText('DOAR ITENS SELECIONADOS (1)')).toBeInTheDocument();
  });
});