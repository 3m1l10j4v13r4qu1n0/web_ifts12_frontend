import axios from 'axios';
import type { ApiError } from '../types/api/error.types';
import { API_BASE_URL } from './endpoints';

export const NOMBRE_TOKEN = 'auth_token';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(NOMBRE_TOKEN);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/**
 * Lee el texto del error del backend.
 *
 * Soporta `{"error": "..."}`, `{"mensaje": "..."}` y `{"message": "..."}` para
 * compatibilizar con distintos formatos del backend y con los tests.
 *
 * Cuando el cuerpo no tiene esa forma (un 502 de proxy, un error de red, HTML en vez de
 * JSON), devuelve `null` y el llamador usa el fallback por código de estado.
 */
function mensajeDelBackend(datos: unknown): string | null {
  if (typeof datos !== 'object' || datos === null) {
    return null;
  }

  const objeto = datos as Record<string, unknown>;

  for (const clave of ['error', 'mensaje', 'message']) {
    const valor = objeto[clave];
    if (typeof valor === 'string' && valor.trim() !== '') {
      return valor;
    }
  }

  return null;
}

/**
 * Fallbacks por código de estado.
 *
 * El backend solo devuelve 400 y 401 hoy. El resto son por si una ruta futura devuelve 404
 * (el detalle de carrera o de novedad, cuando exista) o 500.
 */
function mensajePorEstado(status: number): string {
  switch (status) {
    case 400:
      return 'Revisá los datos enviados.';
    case 401:
      return 'Necesitás iniciar sesión para ver esta información.';
    case 403:
      return 'No tenés permisos para ver esta información.';
    case 404:
      return 'No encontramos esta información.';
    case 409:
      return 'Hay un conflicto con los datos enviados.';
    default:
      return 'Ocurrió un error inesperado. Intentá de nuevo más tarde.';
  }
}

/**
 * Normaliza cualquier error de la capa API a `ApiError`.
 *
 * Concentrado acá y no con `try/catch` en los componentes, como pide RN-13. Los
 * componentes nunca ven el `AxiosError`: ven `{status, mensaje}`, y `mensaje` ya es un
 * texto que se puede mostrar en pantalla.
 */
export function normalizarErrorApi(error: unknown): ApiError {
  if (typeof error === 'object' && error !== null && 'mensaje' in error) {
    const errorComoObjeto = error as Partial<ApiError>;
    if (typeof errorComoObjeto.status === 'number' && typeof errorComoObjeto.mensaje === 'string') {
      return error as ApiError;
    }
  }

  if (axios.isAxiosError(error)) {
    const status = error.response?.status ?? 0;
    return {
      status,
      mensaje: mensajeDelBackend(error.response?.data) ?? mensajePorEstado(status),
    };
  }

  return { status: 0, mensaje: mensajePorEstado(0) };
}

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => Promise.reject(normalizarErrorApi(error)),
);

export default apiClient;
