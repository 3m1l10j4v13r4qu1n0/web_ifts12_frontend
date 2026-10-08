/**
 * Forma de las respuestas de error del backend.
 *
 * Verificado el 02/10/2026 contra el código fuente (`~/Descargas/backend_ifts12/`). El
 * backend devuelve `{"error": "texto plano"}`: un **string**, no un objeto.
 *
 * - `app.py:41` → 400 "Email y contraseña requeridos"
 * - `app.py:46` → 401 "Credenciales inválidas"
 * - `app.py:100` → 400 "Campos obligatorios incompletos"
 *
 * ⚠️ PROVISORIO. El contrato del 15/09/2026 (BE-A5) confirmaba
 * `{"error": {"code", "message", "details"}}`, pero **no está implementado**. Hay dos
 * caminos y los dos son de Backend, no nuestro:
 *
 * 1. Backend implementa BE-A5 → este tipo vuelve a ser `ApiErrorBody` y hay que mappings
 *    de `code` a mensaje amigable.
 * 2. Backend se queda con el string → este tipo es el definitivo, y lo que corresponde es
 *    que la UI muestre el texto tal cual, que ya es en español y legible.
 *
 * No se inventa un `code` que el backend no manda: `ApiErrorBody` quedó sin usar a
 * propósito, documentada acá como referencia del contrato pendiente.
 */

/** Cuerpo de error tal como lo devuelve el backend hoy: un string. */
export type ApiErrorMessage = string;

/** Respuesta de error real del backend: `{"error": "..."}`. */
export interface ApiErrorResponse {
  error: ApiErrorMessage;
}

/**
 * Forma del contrato BE-A5 (15/09/2026), **no implementada por el backend**.
 *
 * Se conserva documentada para el día en que Backend decida cumplirlo. Mientras tanto no
 * debe usarse para leer respuestas: el backend nunca devuelve `code` ni `details`.
 */
export interface ApiErrorBody {
  code: string;
  message: string;
  details: unknown[];
}

/**
 * Tipo del error normalizado que produce el interceptor global de Axios.
 *
 * `mensaje` es el texto del backend cuando existe, y un fallback en español cuando la
 * respuesta no trae `error` (por ejemplo un 500 de nginx o un fallo de red, donde el cuerpo
 * no es JSON del backend). `status` siempre está: es el código HTTP de la respuesta.
 */
export interface ApiError {
  status: number;
  mensaje: string;
}
