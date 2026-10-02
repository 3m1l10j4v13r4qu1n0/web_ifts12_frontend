import { zCarreraApiLista } from '../../types/api/carrera.schema';
import type { CarreraApi } from '../../types/api/carrera.types';
import apiClient from '../client';
import { endpoints } from '../endpoints';

/**
 * Servicio de carreras. Única capa que conoce el endpoint.
 *
 * Contrato verificado contra el código del backend el 02/10/2026:
 * - Ruta: `GET /api/carreras` (`app.py:62-75`).
 * - Sin parámetros de query, sin paginación, sin filtros.
 * - Responde un **array plano** (no `{data, meta}`) con 200.
 * - No hay manejo de errores documentado: no devuelve 400 ni 404 en esta ruta.
 *
 * La respuesta se valida con Zod en el borde. Si el backend cambia un campo o un tipo, el
 * error aparece acá con un mensaje claro en vez de propagarse como `undefined` a un
 * componente. Compensa que el backend no tenga tests de contrato (hallazgo BE-E13).
 */
export async function listarCarreras(): Promise<CarreraApi[]> {
  const respuesta = await apiClient.get<CarreraApi[]>(endpoints.carreras.listar);
  return zCarreraApiLista.parse(respuesta.data);
}
