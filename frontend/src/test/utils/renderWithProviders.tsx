import { ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';

interface Options extends Omit<RenderOptions, 'wrapper'> {
  route?: string;
}

export function renderWithProviders(ui: ReactNode, { route = '/', ...options }: Options = {}) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <AuthProvider>{ui}</AuthProvider>
    </MemoryRouter>,
    options,
  );
}
