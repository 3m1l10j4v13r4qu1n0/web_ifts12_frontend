import { Menu } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ACCESOS_EXTERNOS, MENU_PRINCIPAL } from '../../constants/navegacion';
import BuscadorGlobal from './BuscadorGlobal';
import MobileMenu from './MobileMenu';
import NavMenu from './NavMenu';

/**
 * Header (B6/I12/RF-03/12/30). Top bar con Campus Virtual Moodle + SIU +
 * Inscripción GCBA (destinos configurables). Logo → Inicio. Menú de 9 ítems,
 * buscador visible y hamburguesa de 44×44. SIN ícono de persona.
 */
function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-borde-suave bg-white/95 backdrop-blur">
      <div className="bg-slate-900">
        <div className="mx-auto flex max-w-contenido items-center gap-4 px-4 py-1.5">
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

      <div className="mx-auto flex h-16 max-w-contenido items-center gap-4 px-4">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <img src="/IFTS12.jpg" alt="IFTS N.º 12" className="h-10 w-auto" />
          <img
            src="/logoCABA.png"
            alt="Gobierno de la Ciudad de Buenos Aires"
            className="h-8 w-auto"
          />
        </Link>

        <div className="ml-auto hidden w-full max-w-xs sm:block lg:w-72">
          <BuscadorGlobal />
        </div>

        <button
          type="button"
          aria-expanded={menuAbierto}
          aria-controls="menu-principal-mobile"
          onClick={() => setMenuAbierto(true)}
          className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-md text-texto transition-colors hover:bg-fondo lg:hidden"
        >
          <span className="sr-only">Abrir menú</span>
          <Menu aria-hidden="true" className="h-6 w-6" />
        </button>
      </div>

      <nav
        aria-label="Navegación principal"
        className="hidden border-t border-borde-suave lg:block"
      >
        <div className="mx-auto max-w-contenido px-4">
          <NavMenu items={MENU_PRINCIPAL} />
        </div>
      </nav>

      <MobileMenu abierto={menuAbierto} onCerrar={() => setMenuAbierto(false)} />
    </header>
  );
}

export default Header;
