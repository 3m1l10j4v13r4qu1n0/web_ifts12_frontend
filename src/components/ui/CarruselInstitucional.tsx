import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '../../utils/cn';
import Button from './Button';
import Skeleton from './Skeleton';

/** Proporciones de recorte admitidas por el carrusel. */
export type RecorteCarrusel = '16/9' | '4/3' | '1/1' | '21/9';

/** Puntos focales admitidos, equivalentes a `object-position`. */
export type PuntoFocalCarrusel = 'centro' | 'arriba' | 'abajo' | 'izquierda' | 'derecha';

/**
 * Contrato de imagen de un slide.
 *
 * `alt` es obligatorio para que quien carga el contenido decida si la imagen aporta
 * información (texto descriptivo) o es decorativa (`''`). `recorte` y `puntoFocal` aceptan
 * un valor por breakpoint: `base` (móvil), `tablet` (desde 768 px) y `escritorio` (desde
 * 1024 px). Sin valores, se usa 16/9 centrado.
 *
 * Los recortes y puntos focales definitivos dependen de los assets de UX/UI; este contrato
 * permite cargarlos sin volver a tocar el componente.
 */
export interface ImagenCarrusel {
  src: string;
  alt: string;
  recorte?: {
    base?: RecorteCarrusel;
    tablet?: RecorteCarrusel;
    escritorio?: RecorteCarrusel;
  };
  puntoFocal?: {
    base?: PuntoFocalCarrusel;
    tablet?: PuntoFocalCarrusel;
    escritorio?: PuntoFocalCarrusel;
  };
}

export interface SlideCarrusel {
  id: string;
  titulo: string;
  resumen: string;
  fecha?: string;
  enlace?: string;
  imagen?: ImagenCarrusel;
}

const CLASES_RECORTE: Record<RecorteCarrusel, string> = {
  '16/9': 'aspect-video',
  '4/3': 'aspect-[4/3]',
  '1/1': 'aspect-square',
  '21/9': 'aspect-[21/9]',
};

const CLASES_RECORTE_TABLET: Record<RecorteCarrusel, string> = {
  '16/9': 'sm:aspect-video',
  '4/3': 'sm:aspect-[4/3]',
  '1/1': 'sm:aspect-square',
  '21/9': 'sm:aspect-[21/9]',
};

const CLASES_RECORTE_ESCRITORIO: Record<RecorteCarrusel, string> = {
  '16/9': 'md:aspect-video',
  '4/3': 'md:aspect-[4/3]',
  '1/1': 'md:aspect-square',
  '21/9': 'md:aspect-[21/9]',
};

const CLASES_PUNTO_FOCAL: Record<PuntoFocalCarrusel, string> = {
  centro: 'object-center',
  arriba: 'object-top',
  abajo: 'object-bottom',
  izquierda: 'object-left',
  derecha: 'object-right',
};

const CLASES_PUNTO_FOCAL_TABLET: Record<PuntoFocalCarrusel, string> = {
  centro: 'sm:object-center',
  arriba: 'sm:object-top',
  abajo: 'sm:object-bottom',
  izquierda: 'sm:object-left',
  derecha: 'sm:object-right',
};

const CLASES_PUNTO_FOCAL_ESCRITORIO: Record<PuntoFocalCarrusel, string> = {
  centro: 'md:object-center',
  arriba: 'md:object-top',
  abajo: 'md:object-bottom',
  izquierda: 'md:object-left',
  derecha: 'md:object-right',
};

function clasesImagen(imagen: ImagenCarrusel): string {
  const recorteBase = imagen.recorte?.base ?? '16/9';
  const puntoFocalBase = imagen.puntoFocal?.base ?? 'centro';

  return cn(
    'w-full rounded-xl object-cover',
    CLASES_RECORTE[recorteBase],
    CLASES_PUNTO_FOCAL[puntoFocalBase],
    imagen.recorte?.tablet !== undefined && CLASES_RECORTE_TABLET[imagen.recorte.tablet],
    imagen.recorte?.escritorio !== undefined &&
      CLASES_RECORTE_ESCRITORIO[imagen.recorte.escritorio],
    imagen.puntoFocal?.tablet !== undefined && CLASES_PUNTO_FOCAL_TABLET[imagen.puntoFocal.tablet],
    imagen.puntoFocal?.escritorio !== undefined &&
      CLASES_PUNTO_FOCAL_ESCRITORIO[imagen.puntoFocal.escritorio],
  );
}

function prefiereReducirMovimiento(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

interface CarruselInstitucionalProps {
  titulo: string;
  subtitulo?: string;
  slides: SlideCarrusel[];
  etiquetaAccion?: string;
  /** `true` mientras se consultan las novedades: muestra un esqueleto en vez de dejar vacío. */
  cargando?: boolean;
  /**
   * Aviso de proceso para cuando el módulo está apagado por no figurar en el contrato de
   * API. Se muestra en el lugar del set de novedades, conservando el título y la bajada.
   */
  mensajeVacio?: string;
  /**
   * Rotación automática opt-in. Sin valor (default) el carrusel no avanza solo: la decisión
   * vigente es mantenerlo sin autoplay. Cuando se define, aparece el control Pausar/Reanudar
   * y el avance se detiene si la persona prefiere movimiento reducido.
   */
  autoAvanceMs?: number;
}

/**
 * Portada institucional (Figma: Home · portada/hero).
 *
 * La portada (título + subtítulo) se muestra SIEMPRE, así la Home no queda sin encabezado
 * cuando el backend no entrega novedades (backend caído o sin datos). El set de novedades y
 * sus controles solo se renderizan cuando hay slides; mientras cargan se muestra un skeleton.
 */
function CarruselInstitucional({
  titulo,
  subtitulo,
  slides,
  etiquetaAccion = 'Ver la nota',
  cargando = false,
  mensajeVacio,
  autoAvanceMs,
}: CarruselInstitucionalProps) {
  const [indice, setIndice] = useState(0);
  const [pausado, setPausado] = useState(prefiereReducirMovimiento);

  const haySlides = slides.length > 0;
  const indiceActual = haySlides ? (indice + slides.length) % slides.length : 0;
  const slide = haySlides ? slides[indiceActual] : undefined;
  const esAnterior = !haySlides || indiceActual === 0;
  const esSiguiente = !haySlides || indiceActual === slides.length - 1;
  const autoAvanceActivo = autoAvanceMs !== undefined && autoAvanceMs > 0 && slides.length > 1;

  useEffect(() => {
    if (autoAvanceMs === undefined || autoAvanceMs <= 0 || pausado || slides.length <= 1) {
      return;
    }

    const intervalo = window.setInterval(() => {
      setIndice((actual) => (actual + 1) % slides.length);
    }, autoAvanceMs);

    return () => window.clearInterval(intervalo);
  }, [autoAvanceMs, pausado, slides.length]);

  return (
    <section
      aria-label="Novedades destacadas"
      className="bg-gradient-to-br from-slate-900 via-slate-800 to-acento-800"
    >
      <div className="mx-auto flex min-h-[75vh] max-w-contenido flex-col justify-center px-4 py-20">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
            {titulo}
          </h1>
          {subtitulo !== undefined && <p className="mt-3 text-lg text-slate-300">{subtitulo}</p>}
        </div>

        {slide !== undefined ? (
          <>
            <section
              aria-label="Set de novedades"
              aria-roledescription="carrusel"
              className="mt-10 rounded-2xl border border-slate-600 bg-white/10 p-8 backdrop-blur sm:p-12"
            >
              <div aria-live="polite">
                {slide.imagen !== undefined && (
                  <img
                    src={slide.imagen.src}
                    alt={slide.imagen.alt}
                    className={cn('mb-6', clasesImagen(slide.imagen))}
                  />
                )}
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
              <div className="flex flex-wrap items-center gap-2">
                {autoAvanceActivo && (
                  <button
                    type="button"
                    aria-label={
                      pausado ? 'Reanudar rotación automática' : 'Pausar rotación automática'
                    }
                    aria-pressed={pausado}
                    onClick={() => setPausado((actual) => !actual)}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-slate-500 px-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
                  >
                    {pausado ? (
                      <Play aria-hidden="true" className="h-4 w-4" />
                    ) : (
                      <Pause aria-hidden="true" className="h-4 w-4" />
                    )}
                    {pausado ? 'Reanudar' : 'Pausar'}
                  </button>
                )}
                <button
                  type="button"
                  aria-label="Novedad anterior"
                  disabled={esAnterior}
                  onClick={() => setIndice(indiceActual - 1)}
                  className="inline-flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-slate-500 text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft aria-hidden="true" className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  aria-label="Novedad siguiente"
                  disabled={esSiguiente}
                  onClick={() => setIndice(indiceActual + 1)}
                  className="inline-flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-slate-500 text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronRight aria-hidden="true" className="h-5 w-5" />
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
                      className={`h-11 w-11 min-h-[44px] min-w-[44px] flex items-center justify-center ${
                        activa ? '' : ''
                      }`}
                    />
                  );
                })}
              </fieldset>

              <p className="text-sm text-slate-300">
                Slide {indiceActual + 1} de {slides.length}
              </p>
            </div>
          </>
        ) : cargando ? (
          <section
            aria-busy="true"
            role="status"
            className="mt-10 rounded-2xl border border-slate-600 bg-white/10 p-8 backdrop-blur sm:p-12"
          >
            <span className="sr-only">Cargando novedades destacadas</span>
            <Skeleton tono="oscuro" className="h-3 w-24" />
            <Skeleton tono="oscuro" className="mt-4 h-6 w-11/12" />
            <Skeleton tono="oscuro" className="mt-3 h-4 w-full" />
            <Skeleton tono="oscuro" className="mt-2 h-4 w-3/4" />
            <Skeleton tono="oscuro" className="mt-6 h-10 w-40 rounded-lg" />
          </section>
        ) : mensajeVacio !== undefined ? (
          <p className="mt-10 rounded-2xl border border-slate-600 bg-white/10 p-8 text-base text-slate-200 backdrop-blur sm:p-12">
            {mensajeVacio}
          </p>
        ) : null}
      </div>
    </section>
  );
}

export default CarruselInstitucional;
