/**
 * DTO de `Carrera`, espejo exacto de `GET /api/carreras`.
 *
 * Verificado el 02/10/2026 contra el código del backend: el modelo (`models.py:25-36`) y
 * la base real (`instance/ifts12.db`, 3 carreras). La serialización es manual, con un dict
 * literal en `app.py:65-74`.
 *
 * No confundir con el tipo de dominio `Carrera` de `types/domain/sitio.types.ts`: ese es
 * el tipo que la UI consume, con `descripcionBreve` y `horarios`. La traducción entre ambos
 * vive en `src/api/mappers/carrera.mapper.ts`.
 *
 * ⚠️ Provisional: el backend no tiene tests de contrato, así que estos campos pueden
 * cambiar sin aviso (ver `documentacion/driveFrontend/04_backend/deudas_codigo_backend_2026-10-02.md`,
 * hallazgo BE-E13).
 */

export interface CarreraApi {
  /** `db.Integer` primary key (`models.py:28`). Es number, nunca string. */
  id: number;
  /** `db.String(150)`, obligatorio (`models.py:29`). */
  nombre: string;
  /** `db.String(50)`, obligatorio y UNIQUE (`models.py:30`). Ej: `AS-2023`. */
  codigo: string;
  /** `db.String(100)`, nullable (`models.py:31`). */
  resolucion: string | null;
  /** `db.Text`, nullable (`models.py:32`). Es el texto largo, no un resumen. */
  descripcion: string | null;
  /** `db.Integer`, nullable, default 3 (`models.py:33`). */
  duracion_anios: number | null;
  /** `db.String(150)`, nullable (`models.py:34`). */
  titulo_otorgado: string | null;
  /** `db.String(50)`, nullable, default 'A distancia / Híbrida' (`models.py:35`). */
  modalidad: string | null;
}
