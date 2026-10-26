import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';
import Skeleton from './Skeleton';

/** Formas de esqueleto según el contenido real que va a reemplazar. */
export type VarianteAvisoCarga =
  | 'grilla'
  | 'noticias'
  | 'carrusel'
  | 'nota'
  | 'tabla'
  | 'ficha'
  | 'docentes'
  | 'lista';

interface AvisoCargaProps {
  /** Qué se está cargando, para que el mensaje sea útil y no genérico. */
  que: string;
  /** Forma del contenido. Default: `grilla` (tarjetas de carreras). */
  variante?: VarianteAvisoCarga;
  /** Cantidad de tarjetas, filas o ítems. Default: 6. */
  cantidad?: number;
  className?: string;
}

/** Clases del contenedor por variante, incluido el ritmo vertical de cada sección. */
const CONTENEDORES: Record<VarianteAvisoCarga, string> = {
  grilla: 'mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3',
  noticias: 'mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3',
  docentes: 'mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3',
  carrusel: 'mt-10',
  nota: 'mt-6 mx-auto max-w-3xl',
  tabla: 'mt-6 overflow-x-auto rounded-lg border border-borde-suave bg-white',
  ficha: 'mt-6 grid grid-cols-1 gap-10 lg:grid-cols-3',
  lista: 'mt-6 space-y-3',
};

/** Claves estables para los bloques derivados de `cantidad` (sin usar el índice como key). */
function claves(cantidad: number): string[] {
  return Array.from({ length: Math.max(0, cantidad) }, (_, posicion) => `bloque-${posicion}`);
}

/** Tarjeta de grilla: se parece a `CardCarrera` (título, modalidad y descripción). */
function TarjetaGrilla() {
  return (
    <div className="rounded-xl border border-borde-suave bg-white p-6 shadow-suave">
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="mt-2 h-3 w-1/3" />
      <Skeleton className="mt-4 h-3 w-full" />
      <Skeleton className="mt-2 h-3 w-5/6" />
      <Skeleton className="mt-2 h-3 w-2/3" />
    </div>
  );
}

/** Tarjeta de novedad: imagen 16:9, chips, título y copete de tres líneas. */
function TarjetaNoticia() {
  return (
    <div className="rounded-xl border border-borde-suave bg-white p-6 shadow-suave">
      <Skeleton className="aspect-video w-full rounded-lg" />
      <div className="mt-4 flex flex-wrap gap-2">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>
      <Skeleton className="mt-3 h-5 w-11/12" />
      <Skeleton className="mt-2 h-3 w-full" />
      <Skeleton className="mt-2 h-3 w-11/12" />
      <Skeleton className="mt-2 h-3 w-3/4" />
      <Skeleton className="mt-4 h-3 w-28" />
    </div>
  );
}

/** Tarjeta de docentes: nombre de carrera y dos líneas de mensaje de proceso. */
function TarjetaDocente() {
  return (
    <div className="rounded-xl border border-borde-suave bg-white p-5 shadow-suave">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="mt-3 h-3 w-full" />
      <Skeleton className="mt-2 h-3 w-2/3" />
    </div>
  );
}

/** Panel del carrusel: fecha, título, bajada y CTA sobre fondo oscuro. */
function PanelCarrusel() {
  return (
    <div className="rounded-2xl border border-slate-600 bg-white/10 p-8 backdrop-blur sm:p-12">
      <Skeleton tono="oscuro" className="h-3 w-24" />
      <Skeleton tono="oscuro" className="mt-4 h-6 w-11/12" />
      <Skeleton tono="oscuro" className="mt-3 h-4 w-full" />
      <Skeleton tono="oscuro" className="mt-2 h-4 w-3/4" />
      <Skeleton tono="oscuro" className="mt-6 h-10 w-40 rounded-lg" />
    </div>
  );
}

/** Nota completa: título, bajada y cuerpo de párrafos. */
function CuerpoNota() {
  return (
    <div className="rounded-xl border border-borde-suave bg-white p-6 shadow-suave sm:p-8">
      <Skeleton className="h-4 w-28" />
      <Skeleton className="mt-4 h-8 w-3/4" />
      <div className="mt-6 space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-11/12" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
      </div>
      <Skeleton className="mt-8 aspect-video w-full rounded-lg" />
      <div className="mt-6 space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-11/12" />
        <Skeleton className="h-3 w-3/4" />
      </div>
    </div>
  );
}

/** Tabla de resumen: encabezado y filas de cinco celdas. */
function TablaResumen({ cantidad }: { cantidad: number }) {
  return (
    <div className="min-w-[640px]">
      <div className="grid grid-cols-5 gap-4 bg-fondo px-4 py-3">
        {claves(5).map((clave) => (
          <Skeleton key={clave} className="h-3 w-4/5" />
        ))}
      </div>
      {claves(cantidad).map((fila) => (
        <div key={fila} className="grid grid-cols-5 gap-4 border-t border-borde-suave px-4 py-3">
          {claves(5).map((celda) => (
            <Skeleton key={`${fila}-${celda}`} className="h-3 w-11/12" />
          ))}
        </div>
      ))}
    </div>
  );
}

/** Ficha de carrera: dos columnas, secciones a la izquierda y resumen a la derecha. */
function FichaDetalle() {
  return (
    <>
      <div className="space-y-8 lg:col-span-2">
        {claves(3).map((seccion) => (
          <div
            key={seccion}
            className="rounded-xl border border-borde-suave bg-white p-6 shadow-suave"
          >
            <Skeleton className="h-5 w-1/3" />
            <div className="mt-4 space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-11/12" />
              <Skeleton className="h-3 w-4/5" />
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-4">
        <div className="rounded-xl border border-borde-suave bg-white p-5 shadow-suave">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="mt-3 h-3 w-full" />
          <Skeleton className="mt-2 h-3 w-2/3" />
        </div>
      </div>
    </>
  );
}

/** Resultado de búsqueda: fila con título y contexto. */
function FilaResultado() {
  return (
    <div className="rounded-lg border border-borde-suave bg-white p-4">
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="mt-2 h-3 w-1/3" />
    </div>
  );
}

/** Contenido del esqueleto según la variante. */
function contenido(variante: VarianteAvisoCarga, cantidad: number): ReactNode {
  switch (variante) {
    case 'grilla':
      return claves(cantidad).map((clave) => <TarjetaGrilla key={clave} />);
    case 'noticias':
      return claves(cantidad).map((clave) => <TarjetaNoticia key={clave} />);
    case 'docentes':
      return claves(cantidad).map((clave) => <TarjetaDocente key={clave} />);
    case 'carrusel':
      return <PanelCarrusel />;
    case 'nota':
      return <CuerpoNota />;
    case 'tabla':
      return <TablaResumen cantidad={cantidad} />;
    case 'ficha':
      return <FichaDetalle />;
    case 'lista':
      return claves(cantidad).map((clave) => <FilaResultado key={clave} />);
  }
}

/**
 * Estado de carga de una sección.
 *
 * `role="status"` con `aria-live="polite"` para que un lector de pantalla anuncie la carga
 * en lugar de devolver silencio. Cada variante reproduce la forma y la altura aproximada del
 * contenido real para que la página no salte cuando llega la respuesta (CLS).
 */
function AvisoCarga({ que, variante = 'grilla', cantidad = 6, className }: AvisoCargaProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={cn(CONTENEDORES[variante], className)}
    >
      <span className="sr-only">Cargando {que}…</span>
      {contenido(variante, cantidad)}
    </div>
  );
}

export default AvisoCarga;
