import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ConfirmacaoEmail } from './ConfirmacaoEmail';

describe('Confirmação de e-mail', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  it('exibe erro quando link está incompleto', async () => {
    render(
      <MemoryRouter initialEntries={['/confirmar-email']}>
        <Routes>
          <Route path="/confirmar-email" element={<ConfirmacaoEmail />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(await screen.findByText(/link de confirmação inválido/i)).toBeInTheDocument();
  });

  it('confirma conta com uid e token válidos', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ ok: true, json: async () => ({}) });
    render(
      <MemoryRouter initialEntries={['/confirmar-email?uid=abc&token=xyz']}>
        <Routes>
          <Route path="/confirmar-email" element={<ConfirmacaoEmail />} />
        </Routes>
      </MemoryRouter>,
    );
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:8000/api/ativar-conta/',
        expect.objectContaining({ method: 'POST' }),
      );
    });
    expect(await screen.findByText(/e-mail confirmado/i)).toBeInTheDocument();
  });
});
