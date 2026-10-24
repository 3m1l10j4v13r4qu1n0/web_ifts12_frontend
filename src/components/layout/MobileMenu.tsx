import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { MENU_PRINCIPAL } from '../../constants/navegacion';
import BuscadorGlobal from './BuscadorGlobal';
import NavMenu from './NavMenu';

interface MobileMenuProps {
  abierto: boolean;
  onCerrar: () => void;
}

/**
 * Menú móvil (B6). Overlay con buscador + los 9 ítems. Cierra al elegir una
 * opción, con la X o con Esc. Bloquea el scroll del cuerpo mientras está abierto.
 */
function MobileMenu({ abierto, onCerrar }: MobileMenuProps) {
  const panelRef = useRef<HTMLElement>(null);
  const ultimoFocoRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!abierto) {
      return;
    }

    ultimoFocoRef.current = document.activeElement as HTMLElement | null;

    const alPresionar = (evento: KeyboardEvent) => {
      if (evento.key === 'Escape') {
        evento.preventDefault();
        onCerrar();
        return;
      }

      if (evento.key !== 'Tab') {
        return;
      }

      const panel = panelRef.current;
      if (panel === null) {
        return;
      }

      const focusables = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((elemento) => elemento.offsetWidth > 0 || elemento.offsetHeight > 0);

      if (focusables.length === 0) {
        evento.preventDefault();
        return;
      }

      const primero = focusables[0];
      const ultimo = focusables[focusables.length - 1];
      const activo = document.activeElement as HTMLElement | null;

      if (evento.shiftKey) {
        if (activo === primero || !panel.contains(activo)) {
          evento.preventDefault();
          ultimo.focus();
        }
        return;
      }

      if (activo === ultimo || !panel.contains(activo)) {
        evento.preventDefault();
        primero.focus();
      }
    };

    document.addEventListener('keydown', alPresionar);
    document.body.style.overflow = 'hidden';

    // Enfocar el primer control al abrir.
    window.requestAnimationFrame(() => {
      const panel = panelRef.current;
      if (panel === null) {
        return;
      }
      const focusable = panel.querySelector<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled])',
      );
      focusable?.focus();
    });

    return () => {
      document.removeEventListener('keydown', alPresionar);
      document.body.style.overflow = '';
      ultimoFocoRef.current?.focus();
    };
  }, [abierto, onCerrar]);

  if (!abierto) {
    return null;
  }

  // Se renderiza en un portal a document.body: el header tiene backdrop-blur
  // (backdrop-filter), que convierte al header en containing block de los
  // fixed/absolute y encerraba al overlay dentro del header (solo se veía ahí).
  // Con el portal, `fixed inset-0` se resuelve contra el viewport.
  return createPortal(
    <div className="fixed inset-0 z-50 md:hidden">
      <button
        type="button"
        aria-label="Cerrar menú"
        onClick={onCerrar}
        className="absolute inset-0 bg-black/50"
      />
      <nav
        ref={panelRef}
        id="menu-principal-mobile"
        aria-label="Navegación principal"
        aria-modal="true"
        role="dialog"
        className="absolute inset-y-0 right-0 flex w-80 max-w-[85%] flex-col gap-4 overflow-y-auto bg-white p-4 shadow-elevada"
      >
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold uppercase tracking-wide text-texto-suave">Menú</p>
          <button
            type="button"
            onClick={onCerrar}
            aria-label="Cerrar menú"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-texto transition-colors hover:bg-fondo"
          >
            <X aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <BuscadorGlobal />
        <NavMenu items={MENU_PRINCIPAL} onNavigate={onCerrar} />
      </nav>
    </div>,
    document.body,
  );
}

export default MobileMenu;
