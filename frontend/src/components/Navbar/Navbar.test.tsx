import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Navbar } from './Navbar';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom'
import { AuthProvider } from '../../contexts/AuthContext';

describe('Componente Navbar', () => {
  it('deve renderizar os links de navegação principais', () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthProvider>
    );

    expect(screen.getByText('INÍCIO')).toBeInTheDocument();
    expect(screen.getByText('QUEM SOMOS')).toBeInTheDocument();
    expect(screen.getByText('CAMPANHA')).toBeInTheDocument();
    expect(screen.getByText('TRANSPARÊNCIA')).toBeInTheDocument();
  });

  it('deve alternar as propriedades do menu ao abrir e fechar', () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthProvider>
    );

    // 1. O menu começa fechado, então procuramos pelo rótulo "Abrir menu"
    const botaoMenu = screen.getByRole('button', { name: /abrir menu/i });
    expect(botaoMenu).toBeInTheDocument();

    // 2. Clicamos para abrir o menu
    fireEvent.click(botaoMenu);

    // 3. O rótulo deve mudar dinamicamente para "Fechar menu"
    const botaoMenuAberto = screen.getByRole('button', { name: /fechar menu/i });
    expect(botaoMenuAberto).toBeInTheDocument();
  });
});