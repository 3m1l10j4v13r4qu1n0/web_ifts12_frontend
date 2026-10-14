import type { Carrera } from '../../types/domain/sitio.types';

interface CardCarreraProps {
  carrera: Carrera;
}

function CardCarrera({ carrera }: CardCarreraProps) {
  return (
    <article className="flex flex-col rounded-xl border border-borde-suave bg-white p-6 shadow-suave">
      <h3 className="text-lg font-semibold text-texto">{carrera.nombre}</h3>
      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-acento-700">
        {carrera.modalidad}
        {carrera.horarios ? ` · ${carrera.horarios}` : ''}
      </p>
      <p className="mt-2 text-sm text-texto-suave">{carrera.descripcionBreve}</p>
    </article>
  );
}

export default CardCarrera;
