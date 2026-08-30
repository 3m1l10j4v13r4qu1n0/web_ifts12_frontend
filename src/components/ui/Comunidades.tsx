import { Link } from 'react-router-dom';
import type { Comunidad } from '../../types/domain/sitio.types';

interface ComunidadesProps {
  items: Comunidad[];
}

function Comunidades({ items }: ComunidadesProps) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li key={item.id}>
          <Link
            to={item.href}
            className="group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-colors hover:border-acento-600"
          >
            <h3 className="text-lg font-semibold text-slate-900">{item.titulo}</h3>
            <p className="mt-2 text-sm text-slate-600">{item.descripcion}</p>
            <span aria-hidden="true" className="mt-3 text-sm font-medium text-acento-700">
              Conocer más →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Comunidades;
