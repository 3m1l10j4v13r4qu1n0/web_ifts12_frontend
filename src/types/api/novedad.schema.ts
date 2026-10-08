import { z } from 'zod';

/**
 * Esquema Zod de `NovedadApi`, espejo de `models.py:50-60`.
 *
 * `fecha_publicacion` se valida como string ISO 8601 **no vacío cuando viene presente**.
 * El backend la serializa con `.isoformat()` (`app.py:90`) y la puede mandar en `null`,
 * porque la columna es nullable. El valor es naive UTC: no lleva `Z` ni offset, y por eso
 * la conversión a `Date` se hace en el mapper, asumiendo UTC explícitamente.
 */
export const zNovedadApi = z.object({
  id: z.number().int(),
  // `titulo` y `contenido` son `nullable=False` (`models.py:56,59`). El título es además la
  // fuente del slug de navegación, así que vacío rompería la URL.
  titulo: z.string().min(1),
  copete: z.string().nullable(),
  contenido: z.string().min(1),
  categoria: z.string().nullable(),
  imagen_url: z.string().nullable(),
  // SQLite guarda `1`/`0`, pero el serializador lo pasa a bool (`app.py:86`). Aceptar `1`
  // escondería un cambio de contrato.
  destacado: z.boolean(),
  fecha_publicacion: z.string().min(1).nullable(),
});

export const zNovedadApiLista = z.array(zNovedadApi);
