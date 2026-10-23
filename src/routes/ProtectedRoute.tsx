import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import AdminLayout from '../components/layout/AdminLayout';
import ModuloNoDisponible from '../components/ui/ModuloNoDisponible';
import { authHabilitada } from '../constants/contrato';
import { useAuth } from '../contexts/AuthContext';

/**
 * Protege las rutas de administración: sin token (sesión guardada en
 * localStorage) redirige al login del panel. La ruta es /admin/login, no /login:
 * el login del sitio es exclusivamente el del panel (RF-23).
 */
function ProtectedRoute({ children }: { children: ReactNode }) {
  const { token } = useAuth();

  // Sin contrato de auth no tiene sentido pedir sesión: se explica el estado del módulo
  // en vez de rebotar al login (que también muestra el aviso).
  if (!authHabilitada()) {
    return (
      <AdminLayout>
        <div className="px-4 py-10 sm:px-8 lg:px-[120px]">
          <div className="mx-auto w-full max-w-[480px]">
            <ModuloNoDisponible
              que="el panel de administración"
              mensaje="El acceso se habilita cuando el inicio de sesión esté incluido en el contrato de API."
            />
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
