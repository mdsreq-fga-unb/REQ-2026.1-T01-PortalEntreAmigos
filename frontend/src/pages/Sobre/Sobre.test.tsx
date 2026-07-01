import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Sobre } from './Sobre';
import { renderWithProviders } from '../../test/utils/renderWithProviders';

describe('RF16 — Página Sobre (informações institucionais)', () => {
  it('exibe missão, visão e valores da ONG', () => {
    renderWithProviders(<Sobre />);
    expect(screen.getByText('Missão')).toBeInTheDocument();
    expect(screen.getByText('Visão')).toBeInTheDocument();
    expect(screen.getByText('Valores')).toBeInTheDocument();
    expect(screen.getByText(/nasceu em 2013/i)).toBeInTheDocument();
  });

  it('apresenta linha do tempo institucional', () => {
    renderWithProviders(<Sobre />);
    expect(screen.getByText('2013')).toBeInTheDocument();
    expect(screen.getByText('Criação da ONG')).toBeInTheDocument();
  });
});
