import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MENU_PRINCIPAL } from '../../constants/navegacion';
import NavMenu from './NavMenu';

function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="text-lg font-semibold text-slate-900">
          IFTS N.º 12
        </Link>

        <nav aria-label="Navegación principal" className="hidden lg:block">
          <NavMenu items={MENU_PRINCIPAL} />
        </nav>

        <button
          type="button"
          aria-expanded={menuAbierto}
          aria-controls="menu-principal-mobile"
          onClick={() => setMenuAbierto((vista) => !vista)}
          className="rounded-md p-2 text-slate-700 hover:bg-slate-100 lg:hidden"
        >
          <span className="sr-only">{menuAbierto ? 'Cerrar menú' : 'Abrir menú'}</span>
          <svg
            aria-hidden="true"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              d={menuAbierto ? 'M6 18 18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
      </div>

      {menuAbierto && (
        <nav
          id="menu-principal-mobile"
          aria-label="Navegación principal"
          className="border-t border-slate-200 px-4 py-2 lg:hidden"
        >
          <NavMenu items={MENU_PRINCIPAL} onNavigate={() => setMenuAbierto(false)} />
        </nav>
      )}
    </header>
  );
}

export default Header;
