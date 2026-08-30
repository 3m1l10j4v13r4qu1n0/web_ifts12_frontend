import type { Noticia } from '../../types/domain/sitio.types';

interface CardNoticiaProps {
  noticia: Noticia;
}

function CardNoticia({ noticia }: CardNoticiaProps) {
  return (
    <article className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      {noticia.fecha !== '' && (
        <p className="text-xs font-medium uppercase tracking-wide text-acento-700">
          {noticia.fecha}
        </p>
      )}
      <h3 className="mt-2 text-lg font-semibold text-slate-900">{noticia.titulo}</h3>
      <p className="mt-2 text-sm text-slate-600">{noticia.resumen}</p>
    </article>
  );
}

export default CardNoticia;
