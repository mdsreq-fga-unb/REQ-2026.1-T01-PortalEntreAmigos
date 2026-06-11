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
    // Simulação temporária de requisição ao backend
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Mock: Verificando se é o email mestre (admin)
        if (email === 'admin@admin.com' && senha === 'admin123') {
          setUser({
            nome: 'Administrador',
            email,
            role: 'ADMIN',
          });
          resolve();
        } 
        // Mock: Login de usuário comum para testes futuros
        else if (email === 'user@user.com' && senha === 'user123') {
          setUser({
            nome: 'Voluntário',
            email,
            role: 'USER',
          });
          resolve();
        } 
        else {
          reject(new Error('E-mail ou senha incorretos.'));
        }
      }, 500); // Simulando delay de rede
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
