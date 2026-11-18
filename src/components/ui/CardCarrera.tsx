import { Link } from 'react-router-dom';
import { cursadaDeCarrera } from '../../constants/cursadaCarreras';
import type { Carrera } from '../../types/domain/sitio.types';

interface CardCarreraProps {
  carrera: Carrera;
}

function CardCarrera({ carrera }: CardCarreraProps) {
  const cursada = cursadaDeCarrera(carrera.id);

  return (
    <article className="flex flex-col rounded-xl border border-borde-suave bg-white p-6 shadow-suave">
      <h3 className="text-lg font-semibold text-texto">{carrera.nombre}</h3>
      {cursada !== undefined && (
        <p className="mt-1 text-xs font-medium uppercase tracking-wide text-acento-700">
          Turno {cursada.turno.toLowerCase()}
        </p>
      )}
      <p className="mt-2 text-sm text-texto-suave">{carrera.descripcionBreve}</p>
      <Link
        to={`/carreras/${carrera.id}`}
        className="mt-4 inline-flex min-h-11 items-center font-medium text-acento-700 underline underline-offset-2"
        aria-label={`Ver carrera: ${carrera.nombre}`}
      >
        Ver carrera →
      </Link>
    </article>
  );
}

export default CardCarrera;
