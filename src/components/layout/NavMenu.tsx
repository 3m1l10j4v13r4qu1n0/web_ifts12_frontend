import { NavLink } from 'react-router-dom';
import type { ItemNavegacion } from '../../constants/navegacion';
import { cn } from '../../utils/cn';

interface NavMenuProps {
  items: readonly ItemNavegacion[];
  onNavigate?: () => void;
}

function NavMenu({ items, onNavigate }: NavMenuProps) {
  return (
    <ul className="flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-2">
      {items.map((item) => (
        <li key={item.href}>
          <NavLink
            to={item.href}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                'block rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-acento-100 text-acento-800'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900',
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
