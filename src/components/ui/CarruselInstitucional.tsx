import { useState } from 'react';
import Button from './Button';

export interface SlideCarrusel {
  id: string;
  titulo: string;
  resumen: string;
  fecha?: string;
  enlace?: string;
}

interface CarruselInstitucionalProps {
  titulo: string;
  subtitulo?: string;
  slides: SlideCarrusel[];
  etiquetaAccion?: string;
}

function CarruselInstitucional({
  titulo,
  subtitulo,
  slides,
  etiquetaAccion = 'Ver la nota',
}: CarruselInstitucionalProps) {
  const [indice, setIndice] = useState(0);

  if (slides.length === 0) {
    return null;
  }

  const indiceActual = (indice + slides.length) % slides.length;
  const slide = slides[indiceActual];
  const esAnterior = indiceActual === 0;
  const esSiguiente = indiceActual === slides.length - 1;

  return (
    <section
      aria-label="Novedades destacadas"
      className="bg-gradient-to-br from-slate-900 via-slate-800 to-acento-800"
    >
      <div className="mx-auto flex min-h-[75vh] max-w-6xl flex-col justify-center px-4 py-20">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{titulo}</h1>
          {subtitulo !== undefined && <p className="mt-3 text-lg text-slate-300">{subtitulo}</p>}
        </div>

        <section
          aria-label="Set de novedades"
          aria-roledescription="carrusel"
          className="mt-10 rounded-2xl border border-slate-600 bg-white/10 p-8 backdrop-blur sm:p-12"
        >
          <div aria-live="polite">
            <p className="text-sm font-medium uppercase tracking-wide text-acento-200">
              {slide.fecha !== undefined && slide.fecha !== '' ? slide.fecha : 'Novedad'}
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">{slide.titulo}</h2>
            <p className="mt-3 max-w-2xl text-base text-slate-200">{slide.resumen}</p>
            {slide.enlace !== undefined && (
              <div className="mt-6">
                <Button href={slide.enlace} variante="secundario" tamano="lg">
                  {etiquetaAccion}
                </Button>
              </div>
            )}
          </div>
        </section>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Novedad anterior"
              disabled={esAnterior}
              onClick={() => setIndice(indiceActual - 1)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-500 text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Novedad siguiente"
              disabled={esSiguiente}
              onClick={() => setIndice(indiceActual + 1)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-500 text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ›
            </button>
          </div>

          <fieldset className="flex flex-wrap items-center gap-2">
            <legend className="sr-only">Indicador de posición</legend>
            {slides.map((item, posicion) => {
              const activa = posicion === indiceActual;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-current={activa ? 'true' : undefined}
                  aria-label={`Ir a la novedad ${posicion + 1} de ${slides.length}`}
                  onClick={() => setIndice(posicion)}
                  className={`h-2.5 rounded-full transition-all ${
                    activa ? 'w-7 bg-white' : 'w-2.5 bg-slate-500 hover:bg-slate-400'
                  }`}
                />
              );
            })}
          </fieldset>

          <p className="text-sm text-slate-300" aria-hidden="true">
            {indiceActual + 1} / {slides.length}
          </p>
        </div>
      </div>
    </section>
  );
}

export default CarruselInstitucional;
