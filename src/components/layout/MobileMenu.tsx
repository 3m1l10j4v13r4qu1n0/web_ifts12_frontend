import { X } from 'lucide-react';
import { useEffect } from 'react';
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
  useEffect(() => {
    if (!abierto) {
      return;
    }

    const alPresionar = (evento: KeyboardEvent) => {
      if (evento.key === 'Escape') {
        onCerrar();
      }
    };

    document.addEventListener('keydown', alPresionar);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', alPresionar);
      document.body.style.overflow = '';
    };
  }, [abierto, onCerrar]);

  if (!abierto) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        type="button"
        aria-label="Cerrar menú"
        onClick={onCerrar}
        className="absolute inset-0 bg-black/50"
      />
      <nav
        id="menu-principal-mobile"
        aria-label="Navegación principal"
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
    </div>
  );
}

export default MobileMenu;
