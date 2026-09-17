import { Link } from 'react-router-dom';
import type { AccesoRapido } from '../../types/domain/sitio.types';

interface AccesosDestacadosProps {
  items: AccesoRapido[];
}

function AccesosDestacados({ items }: AccesosDestacadosProps) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {items.map((item) => {
        if (item.href === '') {
          return (
            <li
              key={item.id}
              aria-disabled="true"
              className="flex flex-col rounded-xl border border-slate-200 bg-slate-50 p-6 opacity-60"
            >
              <h3 className="text-base font-semibold text-slate-900">{item.titulo}</h3>
              <p className="mt-1 text-sm text-slate-600">{item.descripcion}</p>
            </li>
          );
        }

        const contenido = (
          <>
            <h3 className="text-base font-semibold text-white">{item.titulo}</h3>
            <p className="mt-1 text-sm text-acento-100">{item.descripcion}</p>
            <span aria-hidden="true" className="mt-3 text-sm font-medium text-acento-100">
              Ver más →
            </span>
          </>
        );

        const clasesEnlace =
          'group flex flex-col rounded-xl bg-acento-600 p-6 shadow-sm transition-colors hover:bg-acento-700';

        return item.href.startsWith('/') ? (
          <li key={item.id}>
            <Link to={item.href} className={clasesEnlace}>
              {contenido}
            </Link>
          </li>
        ) : (
          <li key={item.id}>
            <a href={item.href} className={clasesEnlace} rel="noopener noreferrer">
              {contenido}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export default AccesosDestacados;
