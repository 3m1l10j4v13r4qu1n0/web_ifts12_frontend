import { Menu, UserRound } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ACCESOS_CUENTA,
  ACCESOS_EXTERNOS,
  MENU_PRINCIPAL,
  UBICACION_HEADER,
} from '../../constants/navegacion';
import BuscadorGlobal from './BuscadorGlobal';
import MobileMenu from './MobileMenu';
import NavMenu from './NavMenu';

/**
 * Header (B6/I12/RF-03/12/30). Top bar con la ubicación del instituto, los
 * accesos Campus Virtual Moodle + SIU · Autogestión + Inscripción GCBA (destinos
 * configurables) y el menú de cuenta (ícono de persona) que hoy lleva al login
 * del panel de administración (RF-23). Excepción a I12 (20/10/2026): el ícono
 * de persona volvió a la top bar como menú escalable; ver
 * docs/project_state.md. Logo → Inicio. Menú de 9 ítems, buscador visible y
 * hamburguesa de 44×44.
 */
function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [cuentaAbierta, setCuentaAbierta] = useState(false);
  const cuentaRef = useRef<HTMLDivElement>(null);

  // El menú de cuenta se cierra al clickear afuera o con Escape (patrón de
  // menú desplegable accesible; el foco no se roba mientras está abierto).
  useEffect(() => {
    if (!cuentaAbierta) {
      return;
    }
    const alClickearFuera = (evento: MouseEvent) => {
      if (!cuentaRef.current?.contains(evento.target as Node)) {
        setCuentaAbierta(false);
      }
    };
    const alPresionarTecla = (evento: KeyboardEvent) => {
      if (evento.key === 'Escape') {
        setCuentaAbierta(false);
      }
    };
    document.addEventListener('mousedown', alClickearFuera);
    document.addEventListener('keydown', alPresionarTecla);
    return () => {
      document.removeEventListener('mousedown', alClickearFuera);
      document.removeEventListener('keydown', alPresionarTecla);
    };
  }, [cuentaAbierta]);

  return (
    <header className="sticky top-0 z-40 border-b border-borde-suave bg-white/95 backdrop-blur">
      <div className="bg-slate-900">
        <div className="mx-auto flex max-w-contenido flex-wrap items-center gap-x-4 gap-y-1 px-4 py-1.5">
          <p className="text-xs text-slate-300">{UBICACION_HEADER}</p>
          <ul className="flex flex-wrap items-center gap-x-3 gap-y-1 sm:ml-auto">
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
            <li>
              <div ref={cuentaRef} className="relative">
                <button
                  type="button"
                  aria-label="Cuenta"
                  aria-haspopup="menu"
                  aria-expanded={cuentaAbierta}
                  aria-controls="menu-cuenta"
                  onClick={() => setCuentaAbierta((abierto) => !abierto)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-md text-slate-200 transition-colors hover:bg-slate-800 hover:text-white"
                >
                  <UserRound aria-hidden="true" className="h-5 w-5" />
                </button>
                {cuentaAbierta && (
                  <div
                    id="menu-cuenta"
                    role="menu"
                    aria-label="Cuenta"
                    className="absolute right-0 top-full z-50 mt-1 w-56 rounded-md border border-borde-suave bg-white py-1 shadow-lg"
                  >
                    {ACCESOS_CUENTA.map((item) => (
                      <Link
                        key={item.href}
                        role="menuitem"
                        to={item.href}
                        onClick={() => setCuentaAbierta(false)}
                        className="block px-4 py-2 text-sm text-texto transition-colors hover:bg-fondo"
                      >
                        {item.etiqueta}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto flex h-16 max-w-contenido items-center gap-4 px-4">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <img
            src="/logoCABA.png"
            alt="Gobierno de la Ciudad de Buenos Aires"
            className="h-10 w-auto"
          />
          <img src="/apple-touch-icon.png" alt="IFTS N.º 12" className="h-10 w-auto" />
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
