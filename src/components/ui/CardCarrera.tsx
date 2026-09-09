import type { Carrera } from '../../types/domain/sitio.types';

interface CardCarreraProps {
  carrera: Carrera;
}

function CardCarrera({ carrera }: CardCarreraProps) {
  return (
    <article className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">{carrera.nombre}</h3>
      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-acento-700">
        {carrera.modalidad}
        {carrera.horarios ? ` · ${carrera.horarios}` : ''}
      </p>
      <p className="mt-2 text-sm text-slate-600">{carrera.descripcionBreve}</p>
    </article>
  );
}

export default CardCarrera;
