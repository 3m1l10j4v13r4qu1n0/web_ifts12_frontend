import { zPaginaCarrerasApi } from '../../types/api/carrera.schema';
import type { CarreraApi } from '../../types/api/carrera.types';
import type { PaginaApi } from '../../types/api/paginacion.types';
import apiClient from '../client';
import { endpoints } from '../endpoints';

/** Tamaño de página con el que el frontend pide carreras mientras no haya paginación de UI. */
const TAMANO_PAGINA = 100;

export interface OpcionesListarCarreras {
  page?: number;
  size?: number;
}

/**
 * Servicio de carreras. Única capa que conoce el endpoint.
 *
 * Contrato vigente: apispec del 22/10/2026 (`inbox/apispec_1.json`).
 * - Ruta: `GET /api/carreras`.
 * - Query: `page` (1-based, default 1) y `size` (default 10).
 * - Respuesta: `{data, page, size, total, total_pages}`.
 *
 * La respuesta se valida con Zod en el borde y se traduce a `PaginaApi`, con `items` y
 * `totalPages` en camelCase, para que los consumidores no conozcan el `snake_case`.
 */
export async function listarCarreras({
  page = 1,
  size = TAMANO_PAGINA,
}: OpcionesListarCarreras = {}): Promise<PaginaApi<CarreraApi>> {
  const respuesta = await apiClient.get<unknown>(endpoints.carreras.listar, {
    params: { page, size },
  });
  const pagina = zPaginaCarrerasApi.parse(respuesta.data);

  return {
    items: pagina.data,
    page: pagina.page,
    size: pagina.size,
    total: pagina.total,
    totalPages: pagina.total_pages,
  };
}

/**
 * Trae todas las carreras recorriendo las páginas que indique `total`.
 *
 * Hoy el sitio no tiene paginación de UI y necesita la lista completa para los contadores,
 * la búsqueda local y el detalle por slug. Pedir `size=100` evita la truncación silenciosa
 * de BE-N07; si el total supera esa página, se piden las restantes.
 */
export async function listarTodasLasCarreras(): Promise<PaginaApi<CarreraApi>> {
  const primera = await listarCarreras({ page: 1, size: TAMANO_PAGINA });
  const tamano = primera.size > 0 ? primera.size : TAMANO_PAGINA;
  const paginasRestantes = Math.max(0, Math.ceil(primera.total / tamano) - 1);

  if (paginasRestantes === 0) return primera;

  const restantes = await Promise.all(
    Array.from({ length: paginasRestantes }, (_, indice) =>
      listarCarreras({ page: indice + 2, size: tamano }),
    ),
  );

  return {
    ...primera,
    items: [...primera.items, ...restantes.flatMap((pagina) => pagina.items)],
  };
}
