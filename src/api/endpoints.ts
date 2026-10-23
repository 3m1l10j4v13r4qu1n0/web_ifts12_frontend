// Constantes de la capa API. Es la única capa que conoce las URLs del backend.
//
// @TODO: definir la URL base real junto con Backend/Infra para el build. Hoy sale de
// VITE_API_BASE_URL con fallback a localhost:5000.

const urlBaseCruda = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000';

/**
 * Prefijo de rutas del backend. El apispec del 22/10/2026 (`inbox/apispec_1.json`, Swagger
 * 2.0) declara las rutas con prefijo `/api` y también una familia `/api/v1`; ninguna de las
 * dos está marcada como canónica (BE-N05). El frontend usa `/api`.
 */
export const API_BASE_URL = `${urlBaseCruda.replace(/\/+$/, '')}/api`;

/**
 * Endpoints de la capa API.
 *
 * **Fuente de verdad:** `inbox/apispec_1.json` (22/10/2026). Solo los recursos que figuran
 * ahí son contractuales y se pueden consumir:
 *
 * | Método | Path                | Estado |
 * | :--- | :--- | :--- |
 * | GET  | `/api/carreras`      | Contractual (paginado; el frontend todavía usa el contrato viejo) |
 * | GET  | `/api/docentes`      | Contractual (sin consumo todavía) |
 * | GET  | `/api/materias`      | Contractual (sin consumo todavía) |
 * | GET  | `/api/planes-estudio`| Contractual (sin consumo todavía) |
 *
 * **No contractuales** (existen en el backend viejo pero NO en el apispec, ver BE-N03 y
 * BE-N04). Se conservan porque el código queda detrás de una bandera
 * (`src/constants/contrato.ts`) y se reutiliza cuando Backend publique el recurso:
 *
 * | Método | Path               | Bandera |
 * | :--- | :--- | :--- |
 * | POST | `/api/auth/login`   | `authHabilitada()` |
 * | GET  | `/api/novedades`    | `novedadesHabilitadas()` |
 * | POST | `/api/contacto`     | `contactoHabilitado()` |
 *
 * Nota: `/api/noticias` no es lo mismo que `/api/novedades`. El apispec no define ninguna de
 * las dos; `/novedades` es el nombre que usaba el backend viejo.
 */
export const endpoints = {
  /** No contractual: `POST /api/auth/login` no figura en el apispec. */
  autenticacion: {
    login: '/auth/login',
  },
  carreras: {
    listar: '/carreras',
  },
  /**
   * No contractual: `GET /api/novedades` no figura en el apispec.
   * Solo se consume si `novedadesHabilitadas()` es `true`.
   */
  novedades: {
    listar: '/novedades',
  },
  /** No contractual: `POST /api/contacto` no figura en el apispec. */
  contacto: {
    crear: '/contacto',
  },
} as const;
