import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * Protege las rutas de administración: sin token (sesión guardada en
 * localStorage) redirige al login del panel. La ruta es /admin/login, no /login:
 * el login del sitio es exclusivamente el del panel (RF-23).
 */
function ProtectedRoute({ children }: { children: ReactNode }) {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
