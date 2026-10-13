import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface ItemBreadcrumb {
  etiqueta: string;
  href?: string;
}

interface BreadcrumbProps {
  items: readonly ItemBreadcrumb[];
}

/** Breadcrumb. El último nivel es la página actual (aria-current), sin enlace. */
function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Ruta de navegación">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-texto-suave">
        {items.map((item, indice) => {
          const esActual = indice === items.length - 1;
          return (
            <li key={item.href ?? item.etiqueta} className="flex items-center gap-1">
              {indice > 0 && (
                <ChevronRight aria-hidden="true" className="h-4 w-4 shrink-0 text-borde" />
              )}
              {esActual || item.href === undefined ? (
                <span
                  className="font-medium text-texto"
                  aria-current={esActual ? 'page' : undefined}
                >
                  {item.etiqueta}
                </span>
              ) : (
                <Link to={item.href} className="transition-colors hover:text-acento-700">
                  {item.etiqueta}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
