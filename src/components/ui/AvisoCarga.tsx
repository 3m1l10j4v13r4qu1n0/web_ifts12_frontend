/**
 * Claves fijas del esqueleto.
 *
 * No se genera con `Array.from` a propósito: el índice de un array derivado no es una clave
 * estable, y la regla `react/no-array-index-key` de ESLint lo marca. Con una lista de
 * constantes el lint queda limpio y React puede reconciliar sin volver a remontar los nodos.
 */
const CLAVES_ESQUELETO = ['a', 'b', 'c', 'd', 'e', 'f'] as const;

interface AvisoCargaProps {
  /** Qué se está cargando, para que el mensaje sea útil y no genérico. */
  que: string;
}

/**
 * Estado de carga de una sección.
 *
 * `role="status"` con `aria-live="polite"` para que un lector de pantalla anuncie la carga
 * en lugar de devolver silencio. El esqueleto tiene la misma altura que la grilla real
 * para que la página no salte cuando llega el contenido.
 */
function AvisoCarga({ que }: AvisoCargaProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      <span className="sr-only">Cargando {que}…</span>
      {CLAVES_ESQUELETO.map((clave) => (
        <div
          key={clave}
          aria-hidden="true"
          className="h-40 animate-pulse rounded-xl border border-slate-200 bg-slate-100"
        />
      ))}
    </div>
  );
}

export default AvisoCarga;
