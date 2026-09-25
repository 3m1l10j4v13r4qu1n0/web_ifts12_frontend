import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ACCESOS_EXTERNOS, MENU_PRINCIPAL } from '../../constants/navegacion';
import BuscadorGlobal from './BuscadorGlobal';
import NavMenu from './NavMenu';

function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="border-b border-slate-800 bg-slate-900">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-1.5">
          <p className="text-xs uppercase tracking-wide text-slate-400">Accesos directos</p>
          <ul className="ml-auto flex items-center gap-3">
            {ACCESOS_EXTERNOS.map((acceso) =>
              acceso.href === '' ? (
                <li
                  key={acceso.id}
                  aria-disabled="true"
                  className="cursor-default text-xs font-medium text-slate-500"
                >
                  {acceso.etiqueta}
                </li>
              ) : (
                <li key={acceso.id}>
                  <a
                    href={acceso.href}
                    className="text-xs font-medium text-slate-200 transition-colors hover:text-white"
                    rel="noopener noreferrer"
                  >
                    {acceso.etiqueta}
                  </a>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>

      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <img src="/IFTS12.jpg" alt="IFTS N.º 12" className="h-10 w-auto" />
          <img
            src="/logoCABA.png"
            alt="Gobierno de la Ciudad de Buenos Aires"
            className="h-8 w-auto"
          />
        </Link>

        <div className="ml-auto w-full max-w-xs sm:max-w-sm lg:w-72">
          <BuscadorGlobal />
        </div>

        <button
          type="button"
          aria-expanded={menuAbierto}
          aria-controls="menu-principal-mobile"
          onClick={() => setMenuAbierto((vista) => !vista)}
          className="shrink-0 rounded-md p-2 text-slate-700 hover:bg-slate-100 lg:hidden"
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

      <nav aria-label="Navegación principal" className="hidden border-t border-slate-100 lg:block">
        <div className="mx-auto max-w-6xl px-4">
          <NavMenu items={MENU_PRINCIPAL} />
        </div>
      </nav>

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
