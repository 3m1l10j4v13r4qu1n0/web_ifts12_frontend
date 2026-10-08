import type { ApiError } from '../types/api/error.types';

/**
 * Convierte el error de una consulta a un mensaje mostrable.
 *
 * Hay dos orígenes distintos y por eso no alcanza con leer `mensaje` a secas:
 *
 * 1. **Error de HTTP.** El interceptor global de `src/api/client.ts` lo normaliza a
 *    `ApiError` (`{status, mensaje}`), con el texto del backend si vino y un fallback por
 *    código de estado si no.
 * 2. **Error de validación en el borde.** Si el backend cambia un campo del DTO, el
 *    `parse` de Zod del servicio lanza un `ZodError`, que no pasa por el interceptor. Es
 *    señal de un desajuste de contrato, no de un problema del visitante, así que el
 *    mensaje es deliberadamente genérico: el detalle va a la consola, no a la pantalla.
 *
 * @param error el error que Tiró TanStack Query.
 * @param contexto qué se estaba cargando, para que el mensaje sea útil.
 */
export function mensajeDeConsulta(error: Error, contexto: string): string {
  const apiError = error as Partial<ApiError>;

  if (typeof apiError.mensaje === 'string' && apiError.mensaje !== '') {
    return apiError.mensaje;
  }

  if (error.name === 'ZodError') {
    console.error(`El backend devolvió un ${contexto} con un esquema distinto al esperado.`, error);
    return 'La información del servidor cambió de formato. Probá de nuevo más tarde.';
  }

  return `No pudimos cargar ${contexto}.`;
}
