import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface AdminLayoutProps {
  children: ReactNode;
}

/**
 * Layout de las rutas `/admin*` (Figma v2, frame A1 · Admin · Login).
 *
 * En administración NO se renderiza el header ni el footer público del sitio
 * (`src/App.tsx`): este layout aporta la franja de marca oscura con el link
 * "Volver al sitio público" y el pie con la nota de acceso restringido.
 */
function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-fondo">
      <header className="bg-[#1f2328]">
        <div className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center justify-between gap-3 px-4 py-2.5 sm:px-8 lg:px-[120px]">
          <div className="flex items-center gap-3">
            <img
              src="/apple-touch-icon.png"
              alt="IFTS N.º 12"
              className="h-10 w-10 rounded bg-white object-contain p-0.5"
            />
            <div>
              <p className="text-base font-semibold leading-tight text-white">IFTS N.º 12</p>
              <p className="text-xs text-slate-300">Panel de administración</p>
            </div>
          </div>
          <Link
            to="/"
            className="text-sm font-semibold text-white underline underline-offset-2 transition-colors hover:text-slate-200"
          >
            Volver al sitio público
          </Link>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-borde-suave bg-fondo px-4 py-4 sm:px-8 lg:px-[120px]">
        <p className="text-xs text-texto-suave">
          IFTS N.º 12 · Panel de administración · acceso exclusivo para personal autorizado
        </p>
      </footer>
    </div>
  );
}

export default AdminLayout;
