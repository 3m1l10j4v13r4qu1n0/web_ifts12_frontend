import { z } from 'zod';

/**
 * Esquema Zod de `CarreraApi`, espejo de `models.py:25-36`.
 *
 * Role en el borde: si el backend cambia un campo o un tipo, el error aparece acá con un
 * mensaje claro en vez de propagarse como `undefined` en un componente. Es el control que
 * compensa que el backend no tenga tests de contrato (hallazgo BE-E13).
 */
export const zCarreraApi = z.object({
  id: z.number().int(),
  // `nombre` es `nullable=False` y es lo que se muestra como título de la carrera: un string
  // vacío produciría un enlace sin texto y un slug vacío en la URL.
  nombre: z.string().min(1),
  codigo: z.string().min(1),
  resolucion: z.string().nullable(),
  descripcion: z.string().nullable(),
  // La columna es `db.Integer` (`models.py:33`): un decimal o un negativo no viene del
  // modelo, y aceptarlo escondería un desajuste de contrato.
  duracion_anios: z.number().int().nonnegative().nullable(),
  titulo_otorgado: z.string().nullable(),
  modalidad: z.string().nullable(),
});

export const zCarreraApiLista = z.array(zCarreraApi);
