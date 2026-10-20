import { z } from 'zod';

/**
 * Esquema Zod de la respuesta del login, espejo de `app.py:34-58` y `models.py:6-23`.
 *
 * `nombre`, `apellido` y `email` son `nullable=False`; `rol` es nullable (tiene
 * default pero la columna admite null). El token es un string no vacío: el backend
 * lo genera con Flask-JWT-Extended (`create_access_token`).
 */
export const zUsuarioApi = z.object({
  id: z.number().int(),
  nombre: z.string().min(1),
  apellido: z.string().min(1),
  email: z.string().min(1),
  rol: z.string().nullable(),
});

export const zLoginRespuesta = z.object({
  token: z.string().min(1),
  usuario: zUsuarioApi,
});
