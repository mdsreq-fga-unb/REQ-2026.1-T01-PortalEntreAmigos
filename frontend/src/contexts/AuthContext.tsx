import { createContext, useContext, useState, ReactNode } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
type Role = 'USER' | 'ADMIN';

interface User {
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  role: Role;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<User> & { password: string; nova_senha?: string }) => Promise<{ email_alterado: boolean }>;
  esqueciSenha: (email: string) => Promise<string>;
  redefinirSenha: (email: string, codigo: string, nova_senha: string, confirmar_senha: string) => Promise<string>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('portal_user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const login = async (email: string, senha: string) => {
    const response = await fetch(`${API_URL}/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password: senha,
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      const message = typeof responseData === 'string'
        ? responseData
        : responseData.detail || responseData.error || responseData.message || 'E-mail ou senha incorretos.';
      throw new Error(message);
    }

    const isAdminFromBackend = responseData.is_admin ?? (responseData.role === 'ADMIN');

    const loggedUser: User = {
      nome: responseData.nome,
      email: responseData.email,
      cpf: responseData.cpf || '',
      telefone: responseData.telefone || '',
      role: isAdminFromBackend ? 'ADMIN' : 'USER',
    };

    // Armazena no localStorage
    localStorage.setItem('portal_user', JSON.stringify(loggedUser));
    if (responseData.access) {
      localStorage.setItem('portal_access_token', responseData.access);
    }
    if (responseData.refresh) {
      localStorage.setItem('portal_refresh_token', responseData.refresh);
    }

    setUser(loggedUser);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('portal_user');
    localStorage.removeItem('portal_access_token');
    localStorage.removeItem('portal_refresh_token');
  };

  const updateUser = async (data: Partial<User> & { password: string; nova_senha?: string }): Promise<{ email_alterado: boolean }> => {
    const token = localStorage.getItem('portal_access_token');
    if (!token) throw new Error("Usuário não autenticado.");

    const response = await fetch(`${API_URL}/perfil/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
      const message = typeof responseData === 'string'
        ? responseData
        : responseData.detail || responseData.error || responseData.message || responseData.password || responseData.nova_senha || Object.values(responseData).flat()[0] || 'Erro ao atualizar perfil.';
      throw new Error(message as string);
    }

    // Se o e-mail foi alterado, a conta foi inativada no backend.
    // O componente que chamou esta função deve lidar com o logout.
    if (!responseData.email_alterado && user) {
      const updatedUser: User = {
        nome: responseData.nome,
        email: responseData.email,
        cpf: responseData.cpf || '',
        telefone: responseData.telefone || '',
        role: user.role
      };
      setUser(updatedUser);
      localStorage.setItem('portal_user', JSON.stringify(updatedUser));
    }

    return { email_alterado: responseData.email_alterado ?? false };
  };

  const esqueciSenha = async (email: string): Promise<string> => {
    const response = await fetch(`${API_URL}/esqueci-senha/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.erro || 'Erro ao solicitar recuperação.');
    return data.mensagem;
  };

  const redefinirSenha = async (email: string, codigo: string, nova_senha: string, confirmar_senha: string): Promise<string> => {
    const response = await fetch(`${API_URL}/redefinir-senha/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, codigo, nova_senha, confirmar_senha }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.erro || 'Erro ao redefinir senha.');
    return data.mensagem;
  };

  const isAdmin = user?.role === 'ADMIN';

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, esqueciSenha, redefinirSenha, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}

