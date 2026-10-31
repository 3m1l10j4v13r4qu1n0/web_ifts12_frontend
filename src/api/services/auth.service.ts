import type { LoginRequest, LoginResponse } from '../../types/api/auth.types';
import { zLoginDto } from '../../types/api/despliegue.schema';
import apiClient from '../client';
import { endpoints } from '../endpoints';

/** Adapta el login /api/v1/auth/login al modelo de sesión existente. */
export async function iniciarSesion(datos: LoginRequest): Promise<LoginResponse> {
  const respuesta = await apiClient.post<unknown>(endpoints.autenticacion.login, datos);
  const { data } = zLoginDto.parse(respuesta.data);
  return { token: data.access_token, usuario: data.usuario };
}
