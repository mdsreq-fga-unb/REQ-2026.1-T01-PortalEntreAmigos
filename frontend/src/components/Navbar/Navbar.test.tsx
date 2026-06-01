import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Navbar } from './Navbar';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

describe('Componente Navbar', () => {
  it('deve renderizar os links de navegação principais', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // Verifica se os links estáticos principais aparecem na tela
    expect(screen.getByText('INÍCIO')).toBeInTheDocument();
    expect(screen.getByText('QUEM SOMOS')).toBeInTheDocument();
    expect(screen.getByText('CAMPANHA')).toBeInTheDocument();
    expect(screen.getByText('TRANSPARÊNCIA')).toBeInTheDocument();
  });

  it('deve alternar o menu ao clicar no botão hambúrguer', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // Encontra o botão do menu mobile pelo aria-label
    const toggleButton = screen.getByLabelText('Toggle menu');
    
    // Simula o clique para abrir o menu responsivo
    fireEvent.click(toggleButton);
    
    // Simula o clique em um link para fechar o menu
    const homeLink = screen.getAllByText('INÍCIO')[0];
    fireEvent.click(homeLink);
  });
});