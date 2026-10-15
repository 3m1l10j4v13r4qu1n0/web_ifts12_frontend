import type { Noticia } from '../../types/domain/sitio.types';
import { formatearFechaCorta } from '../../utils/fecha';
import Badge from './Badge';

interface CardNoticiaProps {
  noticia: Noticia;
}

/**
 * Tarjeta de novedad (diseño "08 · Novedades" / "01 · Inicio"): imagen 16:9 opcional,
 * chips de fecha (`dd/mm/aaaa`) y categoría, título, copete recortado a 3 líneas y el
 * llamado "Leer nota completa".
 *
 * El llamado es texto, no un enlace: las dos páginas que la usan (`NoticiasPage` y la
 * sección de novedades de la Home) envuelven la tarjeta entera en un `Link`, así que un
 * ancla acá adentro sería un `<a>` dentro de otro `<a>`.
 */
function CardNoticia({ noticia }: CardNoticiaProps) {
  const fecha = formatearFechaCorta(noticia.fecha);
  const tieneEncabezado = fecha !== '' || noticia.categoria !== undefined;

  return (
    <article className="flex h-full flex-col rounded-xl border border-borde-suave bg-white p-6 shadow-suave">
      {noticia.imagenUrl !== undefined && (
        <img
          src={noticia.imagenUrl}
          alt=""
          className="mb-4 aspect-video w-full rounded-lg object-cover"
        />
      )}

      {tieneEncabezado && (
        <div className="flex flex-wrap items-center gap-2">
          {fecha !== '' && <Badge tono="neutro">{fecha}</Badge>}
          {noticia.categoria !== undefined && <Badge tono="acento">{noticia.categoria}</Badge>}
        </div>
      )}

      <h3 className="mt-3 text-lg font-semibold text-texto">{noticia.titulo}</h3>

      {noticia.resumen !== '' && (
        <p className="mt-2 line-clamp-3 text-sm text-texto-suave">{noticia.resumen}</p>
      )}

      <span className="mt-4 text-sm font-medium text-acento-700">Leer nota completa</span>
    </article>
  );
}

export default CardNoticia;
