import { z } from 'zod';

/**
 * Esquema de las respuestas paginadas del apispec (22/10/2026).
 *
 * Forma común: `{data, page, size, total, total_pages}`. Es reutilizable para carreras,
 * docentes, materias y planes de estudio.
 */
export function zRespuestaPaginada<T extends z.ZodType>(esquema: T) {
  return z.object({
    data: z.array(esquema),
    page: z.number().int().nonnegative(),
    size: z.number().int().nonnegative(),
    total: z.number().int().nonnegative(),
    total_pages: z.number().int().nonnegative(),
  });
}
