import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext';

describe('RF02 — AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.stubGlobal('fetch', vi.fn());
  });

  it('inicia sem usuário logado', () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });
    expect(result.current.user).toBeNull();
    expect(result.current.isAdmin).toBe(false);
  });

  it('realiza login e persiste dados no localStorage', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        nome: 'João',
        email: 'joao@teste.com',
        cpf: '94806608815',
        telefone: '61999999999',
        role: 'USER',
        is_admin: false,
        access: 'token-access',
        refresh: 'token-refresh',
      }),
    });

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });
    await act(async () => {
      await result.current.login('joao@teste.com', 'Senha@123');
    });

    expect(result.current.user?.email).toBe('joao@teste.com');
    expect(localStorage.getItem('portal_access_token')).toBe('token-access');
  });

  it('logout remove sessão', async () => {
    localStorage.setItem('portal_user', JSON.stringify({ nome: 'João', email: 'a@b.com', role: 'USER' }));
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });
    act(() => result.current.logout());
    expect(result.current.user).toBeNull();
    expect(localStorage.getItem('portal_user')).toBeNull();
  });
});
