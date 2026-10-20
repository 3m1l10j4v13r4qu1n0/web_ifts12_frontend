import { zLoginRespuesta } from '../../types/api/auth.schema';
import type { LoginRequest, LoginResponse } from '../../types/api/auth.types';
import apiClient from '../client';
import { endpoints } from '../endpoints';

/**
 * Servicio de autenticación. Única capa que conoce el endpoint de login.
 *
 * Contrato verificado contra el código del backend el 20/10/2026:
 * - Ruta: `POST /api/auth/login` (`app.py:34-58`).
 * - Body: `{ email, password }`. Si falta alguno → 400 "Email y contraseña requeridos";
 *   credenciales mal → 401 "Credenciales inválidas". Ambos textos ya llegan
 *   normalizados por el interceptor de `src/api/client.ts`.
 * - Respuesta 200: `{ token, usuario: { id, nombre, apellido, email, rol } }`.
 *
 * Ojo: `/api/auth/logout` y `/api/auth/me` NO existen en el backend, así que el
 * cierre de sesión es local (borra el storage) y la sesión se reconstruye desde
 * `localStorage`. Ninguna ruta del backend verifica `jwt_required` todavía
 * (BE-E04, Grupo 4); esto no lo puede compensar el frontend.
 */
export async function iniciarSesion(datos: LoginRequest): Promise<LoginResponse> {
  const respuesta = await apiClient.post<LoginResponse>(endpoints.autenticacion.login, datos);
  return zLoginRespuesta.parse(respuesta.data);
}
