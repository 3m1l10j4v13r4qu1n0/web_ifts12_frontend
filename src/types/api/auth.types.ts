/**
 * DTOs de autenticación. Espejo de `POST /api/auth/login` (`app.py:34-58`),
 * verificado contra el código fuente del backend el 20/10/2026.
 *
 * El backend recibe `email` y `password` (no `usuario`) y devuelve el token en el
 * campo `token` junto al usuario completo. El frontend guarda el token bajo la key
 * local `auth_token` (definida en `src/api/client.ts`): el nombre de la key es
 * decisión del cliente, no del contrato.
 */

/** Body enviado al login. */
export interface LoginRequest {
  email: string;
  password: string;
}

/** Usuario tal como lo devuelve el backend en la respuesta del login. */
export interface UsuarioApi {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  /** Columna nullable con default 'estudiante' (`models.py:14`). */
  rol: string | null;
}

/** Respuesta 200 del login. */
export interface LoginResponse {
  token: string;
  usuario: UsuarioApi;
}
