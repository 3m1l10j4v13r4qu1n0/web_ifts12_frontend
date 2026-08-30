import { createContext, type ReactNode, useContext, useMemo, useState } from 'react';

export interface UsuarioSesion {
  nombre: string;
  email: string;
}

interface AuthContextValue {
  user: UsuarioSesion | null;
  token: string | null;
  login: (usuario: UsuarioSesion, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UsuarioSesion | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      login: (usuario, nuevoToken) => {
        setUser(usuario);
        setToken(nuevoToken);
        localStorage.setItem('auth_token', nuevoToken);
      },
      logout: () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('auth_token');
      },
    }),
    [user, token],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
