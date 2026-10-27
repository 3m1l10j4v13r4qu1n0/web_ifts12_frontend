import { z } from 'zod';
import { zRespuestaPaginada } from './paginacion.schema';

/**
 * Esquemas Zod del contrato de carreras del apispec del 22/10/2026.
 *
 * El apispec no declara `required`, así que estas validaciones son deliberadamente más
 * estrictas que Swagger: el frontend necesita distinguir «siempre viene» de «puede faltar»
 * para no llenar la UI de `undefined`. Los campos que el spec marca `x-nullable` se aceptan
 * como `null`; el resto se exige.
 */
export const zCarreraPlanSummaryApi = z.object({
  id: z.number().int(),
  carrera_id: z.number().int(),
  nombre: z.string().nullable(),
  codigo: z.string().nullable(),
  resolucion: z.string().nullable(),
  duracion_anios: z.number().int().nonnegative().nullable(),
  // `format: date`: se valida como string para no reinterpretar la fecha con zona horaria.
  vigente_desde: z.string().nullable(),
  vigente_hasta: z.string().nullable(),
  activo: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const zCarreraApi = z.object({
  id: z.number().int(),
  // Un string vacío produciría un enlace sin texto y un slug vacío en la URL.
  nombre: z.string().min(1),
  descripcion: z.string().nullable(),
  titulo_otorgado: z.string().nullable(),
  activa: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
  planes: z.array(zCarreraPlanSummaryApi),
});

/** `PaginatedCarreras`: `{data, page, size, total, total_pages}`. */
export const zPaginaCarrerasApi = zRespuestaPaginada(zCarreraApi);
