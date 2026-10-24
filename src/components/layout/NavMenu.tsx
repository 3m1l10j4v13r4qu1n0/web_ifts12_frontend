import { NavLink } from 'react-router-dom';
import type { ItemNavegacion } from '../../constants/navegacion';
import { cn } from '../../utils/cn';

interface NavMenuProps {
  items: readonly ItemNavegacion[];
  onNavigate?: () => void;
}

/**
 * Ítem de menú. Activo: borde inferior de 3px + color + peso 600 (NavLink ya
 * marca aria-current="page"). En móvil/tablet el ítem es vertical, de 52px.
 */
function NavMenu({ items, onNavigate }: NavMenuProps) {
  return (
    <ul className="flex flex-col gap-1 md:flex-row md:items-center md:gap-2">
      {items.map((item) => (
        <li key={item.href}>
          <NavLink
            to={item.href}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                'flex min-h-[52px] items-center border-b-[3px] px-3 text-sm font-medium transition-colors md:min-h-11',
                isActive
                  ? 'border-acento-600 font-semibold text-acento-700'
                  : 'border-transparent text-texto-suave hover:text-texto',
              )
            }
          >
            {item.etiqueta}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default NavMenu;
