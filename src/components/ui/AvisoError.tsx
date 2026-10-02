interface AvisoErrorProps {
  /** Qué se intentó cargar, para que el mensaje sea útil. */
  que: string;
  /** Mensaje ya listo para mostrar, que viene del interceptor global de la capa API. */
  mensaje: string;
  /** Vuelve a pedir los datos. */
  alReintentar: () => void;
}

/**
 * Estado de error de una sección.
 *
 * El mensaje lo produce el interceptor global de Axios (`src/api/client.ts`), no el
 * componente: acá solo se muestra y se ofrece reintentar. `role="alert"` para que el
 * error se anuncie de inmediato, que es lo que corresponde a un fallo.
 */
function AvisoError({ que, mensaje, alReintentar }: AvisoErrorProps) {
  return (
    <div role="alert" className="mt-6 rounded-xl border border-red-200 bg-red-50 p-6">
      <p className="text-sm font-medium text-red-900">No pudimos cargar {que}.</p>
      <p className="mt-2 text-sm text-red-800">{mensaje}</p>
      <button
        type="button"
        onClick={alReintentar}
        className="mt-4 rounded-lg border border-red-300 bg-white px-3 py-1.5 text-sm font-medium text-red-900 transition-colors hover:border-red-400"
      >
        Reintentar
      </button>
    </div>
  );
}

export default AvisoError;
