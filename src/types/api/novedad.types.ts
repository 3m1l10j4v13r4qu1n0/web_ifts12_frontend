/**
 * DTO de `Novedad`, espejo exacto de `GET /api/novedades`.
 *
 * Verificado el 02/10/2026 contra el código del backend: el modelo (`models.py:50-60`) y
 * la base real (`instance/ifts12.db`, 2 novedades). La serialización es manual, con un dict
 * literal en `app.py:82-91`.
 *
 * ⚠️ El endpoint se llama `novedades` en el backend, no `noticias`. El nombre `noticias`
 * venía de la respuesta del 15/09/2026 y no coincide con el código.
 *
 * ⚠️ Provisional: el backend no tiene tests de contrato (hallazgo BE-E13).
 */

export interface NovedadApi {
  /** `db.Integer` primary key (`models.py:53`). Es number, nunca string. */
  id: number;
  /** `db.String(200)`, obligatorio (`models.py:54`). */
  titulo: string;
  /** `db.String(300)`, nullable (`models.py:55`). Es el resumen corto. */
  copete: string | null;
  /** `db.Text`, obligatorio (`models.py:56`). */
  contenido: string;
  /** `db.String(50)`, nullable, default 'Institucional' (`models.py:57`). */
  categoria: string | null;
  /** `db.String(255)`, nullable (`models.py:58`). URL absoluta o relativa. */
  imagen_url: string | null;
  /** `db.Boolean`, nullable, default false (`models.py:59`). Llega como true/false JSON. */
  destacado: boolean;
  /**
   * `db.DateTime`, nullable (`models.py:60`), serializado con `.isoformat()`
   * (`app.py:90`).
   *
   * ⚠️ **Naive UTC**: no lleva sufijo `Z` ni offset, porque el backend usa
   * `datetime.utcnow`. Hay que parsearlo asumiendo UTC, no hora local.
   */
  fecha_publicacion: string | null;
}
