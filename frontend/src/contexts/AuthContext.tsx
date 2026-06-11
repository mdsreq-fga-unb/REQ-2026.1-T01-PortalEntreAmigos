import { createContext, useContext, useState, ReactNode } from 'react';

type Role = 'USER' | 'ADMIN';

interface User {
  nome: string;
  email: string;
  role: Role;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

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

    setUser({
      nome: responseData.nome,
      email: responseData.email,
      role: isAdminFromBackend ? 'ADMIN' : 'USER',
    });
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (data: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...data });
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
