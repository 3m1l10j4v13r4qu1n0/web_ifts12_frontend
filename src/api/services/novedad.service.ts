import { zNovedadApiLista } from '../../types/api/novedad.schema';
import type { NovedadApi } from '../../types/api/novedad.types';
import apiClient from '../client';
import { endpoints } from '../endpoints';

/**
 * Servicio de novedades. Única capa que conoce el endpoint.
 *
 * Contrato verificado contra el código del backend el 02/10/2026:
 * - Ruta: `GET /api/novedades` (`app.py:79-92`). **Ojo con el nombre:** es `novedades`, no
 *   `noticias`. El nombre `noticias` venía de la respuesta del 15/09/2026 y no coincide con
 *   el código.
 * - Sin parámetros de query. El orden es fijo `fecha_publicacion DESC` (`app.py:81`), sin
 *   paginación ni filtro por categoría.
 * - Responde un **array plano** (no `{data, meta}`) con 200.
 *
 * La respuesta se valida con Zod en el borde, por la misma razón que en carreras.
 */
export async function listarNovedades(): Promise<NovedadApi[]> {
  const respuesta = await apiClient.get<NovedadApi[]>(endpoints.novedades.listar);
  return zNovedadApiLista.parse(respuesta.data);
}
