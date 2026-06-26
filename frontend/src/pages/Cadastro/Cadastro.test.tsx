import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Cadastro } from './Cadastro';

vi.mock('react-hot-toast', () => ({ default: { success: vi.fn(), error: vi.fn() } }));

describe('RF01 — Página Cadastro', () => {
  it('renderiza campos obrigatórios do formulário', () => {
    render(
      <MemoryRouter>
        <Cadastro />
      </MemoryRouter>,
    );
    expect(screen.getByRole('heading', { name: /criar conta/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/nome completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^cpf$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/telefone/i)).toBeInTheDocument();
  });

  it('valida senha fraca antes de enviar', () => {
    render(
      <MemoryRouter>
        <Cadastro />
      </MemoryRouter>,
    );
    fireEvent.change(screen.getByLabelText(/nome completo/i), { target: { value: 'João Silva', name: 'nome' } });
    fireEvent.change(screen.getByLabelText(/e-mail/i), { target: { value: 'joao@teste.com', name: 'email' } });
    fireEvent.change(screen.getByLabelText(/^cpf$/i), { target: { value: '94806608815', name: 'cpf' } });
    fireEvent.change(screen.getByLabelText(/telefone/i), { target: { value: '61999999999', name: 'telefone' } });
    fireEvent.change(screen.getByLabelText(/^senha$/i), { target: { value: 'fraca', name: 'senha' } });
    fireEvent.change(screen.getByLabelText(/confirme sua senha/i), { target: { value: 'fraca', name: 'confirmarSenha' } });
    fireEvent.click(screen.getByRole('button', { name: /finalizar cadastro/i }));

    expect(screen.getAllByText(/senha deve ter no mínimo 8 caracteres/i).length).toBeGreaterThan(0);
  });
});
