import { useState } from 'react';
import type { Noticia } from '../../types/domain/sitio.types';
import { cn } from '../../utils/cn';

interface SliderNoticiasProps {
  noticias: Noticia[];
  titulo?: string;
}

function SliderNoticias({ noticias, titulo = 'Novedades' }: SliderNoticiasProps) {
  const [indice, setIndice] = useState(0);

  if (noticias.length === 0) {
    return null;
  }

  const total = noticias.length;
  const noticiaActual = noticias[indice];

  function irAnterior() {
    setIndice((actual) => (actual === 0 ? total - 1 : actual - 1));
  }

  function irSiguiente() {
    setIndice((actual) => (actual === total - 1 ? 0 : actual + 1));
  }

  return (
    <section
      aria-roledescription="carrusel"
      aria-label={titulo}
      className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={irAnterior}
            aria-label="Noticia anterior"
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-700 hover:border-acento-600 hover:text-acento-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acento-700"
          >
            ←
          </button>
          <span aria-live="polite" className="text-sm font-medium text-slate-500">
            {indice + 1} / {total}
          </span>
          <button
            type="button"
            onClick={irSiguiente}
            aria-label="Noticia siguiente"
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-700 hover:border-acento-600 hover:text-acento-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acento-700"
          >
            →
          </button>
        </div>
      </div>

      <article aria-live="polite" className="mt-6">
        {noticiaActual.imagenUrl && (
          <img
            src={noticiaActual.imagenUrl}
            alt=""
            className="mb-4 h-48 w-full rounded-lg object-cover"
          />
        )}
        {noticiaActual.fecha !== '' && (
          <p className="text-xs font-medium uppercase tracking-wide text-acento-700">
            {noticiaActual.fecha}
          </p>
        )}
        <h3 className="mt-2 text-xl font-semibold text-slate-900">{noticiaActual.titulo}</h3>
        <p className="mt-2 text-slate-600">{noticiaActual.resumen}</p>
      </article>

      <div className="mt-6 flex justify-center gap-2" aria-hidden="true">
        {noticias.map((noticia, i) => (
          <span
            key={noticia.id}
            className={cn(
              'h-2 w-2 rounded-full transition-colors',
              i === indice ? 'bg-acento-600' : 'bg-slate-300',
            )}
          />
        ))}
      </div>
    </section>
  );
}

export default SliderNoticias;
