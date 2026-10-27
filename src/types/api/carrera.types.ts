/**
 * DTO de `Carrera`, espejo exacto de `GET /api/carreras` del apispec del 22/10/2026
 * (`inbox/apispec_1.json`, definiciones `Carrera` y `CarreraPlanSummary`).
 *
 * Diferencias con el contrato viejo:
 * - El listado es paginado: la respuesta es `PaginatedCarreras`, no un array plano.
 * - `codigo`, `modalidad`, `resolucion` y `duracion_anios` ya no están en la raíz.
 *   Los tres campos oficiales que quedan (`codigo`, `resolucion`, `duracion_anios`) viven
 *   en cada plan; `modalidad` no existe en ningún definition.
 * - Se suman `activa`, `created_at`, `updated_at` y `planes[]`.
 *
 * No confundir con el tipo de dominio `Carrera` de `types/domain/sitio.types.ts`: ese es
 * el tipo que la UI consume y lo arma `src/api/mappers/carrera.mapper.ts`.
 */

export interface CarreraPlanSummaryApi {
  id: number;
  carrera_id: number;
  /** `x-nullable`: un plan puede venir sin nombre. La UI necesita fallback. */
  nombre: string | null;
  /** `x-nullable`: código oficial del plan, distinto del nombre de la carrera. */
  codigo: string | null;
  /** `x-nullable`: número de resolución del plan, no un archivo PDF. */
  resolucion: string | null;
  /** `x-nullable`: duración del plan en años. */
  duracion_anios: number | null;
  /** `format: date` (`YYYY-MM-DD`), no `date-time`. */
  vigente_desde: string | null;
  /** `null` significa que el plan sigue vigente. */
  vigente_hasta: string | null;
  /** Ojo: `activo` (plan, masculino) no es lo mismo que `Carrera.activa` (femenino). */
  activo: boolean;
  created_at: string;
  updated_at: string;
}

export interface CarreraApi {
  /** `int64`: es number, nunca string. */
  id: number;
  /** Obligatorio y es el título de la carrera y la fuente del slug de navegación. */
  nombre: string;
  /** `Text`, nullable. Es el texto largo, no un resumen. */
  descripcion: string | null;
  /** `x-nullable`: título oficial que otorga la carrera. */
  titulo_otorgado: string | null;
  activa: boolean;
  created_at: string;
  updated_at: string;
  planes: CarreraPlanSummaryApi[];
}
