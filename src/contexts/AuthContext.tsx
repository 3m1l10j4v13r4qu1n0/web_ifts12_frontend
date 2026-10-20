import { createContext, type ReactNode, useContext, useMemo, useState } from 'react';
import { NOMBRE_TOKEN } from '../api/client';

/**
 * Usuario en sesión. Se deriva del `usuario` que devuelve el login
 * (`app.py:49-56`): `nombre` es "nombre apellido" compuesto en el formulario de
 * ingreso. No hay endpoint `/auth/me`, así que estos datos se reconstruyen desde
 * `localStorage` al refrescar la página.
 */
export interface UsuarioSesion {
  id: number;
  nombre: string;
  email: string;
  rol: string | null;
}

interface AuthContextValue {
  user: UsuarioSesion | null;
  token: string | null;
  login: (usuario: UsuarioSesion, token: string) => void;
  logout: () => void;
}

const CLAVE_USUARIO = 'auth_usuario';

const AuthContext = createContext<AuthContextValue | null>(null);

function leerToken(): string | null {
  return localStorage.getItem(NOMBRE_TOKEN);
}

/**
 * Reconstruye la sesión guardada. Si el storage está corrupto o le faltan campos,
 * se trata como "sin sesión" en vez de romper el render.
 */
function leerUsuario(): UsuarioSesion | null {
  const crudo = localStorage.getItem(CLAVE_USUARIO);

  if (crudo === null) {
    return null;
  }

  try {
    const datos = JSON.parse(crudo) as Partial<UsuarioSesion>;

    if (
      typeof datos.id !== 'number' ||
      typeof datos.nombre !== 'string' ||
      typeof datos.email !== 'string'
    ) {
      return null;
    }

    return {
      id: datos.id,
      nombre: datos.nombre,
      email: datos.email,
      rol: typeof datos.rol === 'string' ? datos.rol : null,
    };
  } catch {
    return null;
  }
}

function AuthProvider({ children }: { children: ReactNode }) {
  // Estado inicial síncrono desde localStorage: no hay pantalla en blanco al
  // refrescar y ProtectedRoute no necesita un estado "cargando".
  const [user, setUser] = useState<UsuarioSesion | null>(leerUsuario);
  const [token, setToken] = useState<string | null>(leerToken);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      login: (usuario, nuevoToken) => {
        setUser(usuario);
        setToken(nuevoToken);
        localStorage.setItem(NOMBRE_TOKEN, nuevoToken);
        localStorage.setItem(CLAVE_USUARIO, JSON.stringify(usuario));
      },
      // Cierre local: /api/auth/logout no existe en el backend, así que no hay
      // sesión remota que invalidar desde el frontend.
      logout: () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem(NOMBRE_TOKEN);
        localStorage.removeItem(CLAVE_USUARIO);
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
