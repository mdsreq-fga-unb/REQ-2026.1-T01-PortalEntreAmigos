import { createContext, useContext, useState, ReactNode } from 'react';

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
  updateUser: (data: Partial<User>) => Promise<void>;
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
    const response = await fetch('http://localhost:8000/api/login/', {
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

  const updateUser = async (data: Partial<User>) => {
    const token = localStorage.getItem('portal_access_token');
    if (!token) throw new Error("Usuário não autenticado.");

    const response = await fetch('http://localhost:8000/api/perfil/', {
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
        : responseData.detail || responseData.error || responseData.message || Object.values(responseData).flat()[0] || 'Erro ao atualizar perfil.';
      throw new Error(message);
    }

    if (user) {
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
  };

  const isAdmin = user?.role === 'ADMIN';

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, isAdmin }}>
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

