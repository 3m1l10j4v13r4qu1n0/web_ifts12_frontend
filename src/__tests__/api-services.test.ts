import { AxiosError, AxiosHeaders } from 'axios';
import { afterEach, describe, expect, it, vi } from 'vitest';
import apiClient, { normalizarErrorApi } from '../api/client';
import { iniciarSesion } from '../api/services/auth.service';
import { listarCarreras } from '../api/services/carrera.service';
import { listarNovedades } from '../api/services/novedad.service';

/**
 * Los servicios se prueban con `vi.spyOn` sobre el `get` del cliente, sin `axios-mock-adapter`
 * ni servidor: la capa que importa `apiClient` y la URL que pide ya están verificadas por
 * aserción (`mockSpy` comprueba el `url` en cada caso), y lo que interesa probar acá es el
 * `parse` de Zod y la propagación de errores.
 */

/** Las mismas filas que la DB sembrada, con los nombres de campo que devuelve el endpoint. */
const CARRERAS_PAGINADAS = {
  data: [
    {
      id: 1,
      nombre: 'Tecnicatura Superior en Análisis de Sistemas',
      descripcion: 'Formación profesional orientada al desarrollo de software.',
      titulo_otorgado: 'Técnico Superior en Análisis de Sistemas',
      activa: true,
      created_at: '2026-01-01T00:00:00',
      updated_at: '2026-01-01T00:00:00',
      planes: [
        {
          id: 1,
          carrera_id: 1,
          nombre: 'Plan 2023',
          codigo: 'AS-2023',
          resolucion: 'RS-2023-6336-GCABA-MEDGC',
          duracion_anios: 3,
          vigente_desde: '2023-03-01',
          vigente_hasta: null,
          activo: true,
          created_at: '2026-01-01T00:00:00',
          updated_at: '2026-01-01T00:00:00',
        },
      ],
    },
  ],
  page: 1,
  size: 100,
  total: 1,
  total_pages: 1,
};

const NOVEDADES = [
  {
    id: 1,
    titulo: 'Inscripciones abiertas para el ciclo lectivo 2026',
    copete: 'Inicia el proceso de preingreso.',
    contenido: 'Te invitamos a inscribirte en nuestras tecnicaturas superiores oficiales.',
    categoria: 'Ingresantes',
    imagen_url: null,
    destacado: true,
    fecha_publicacion: '2026-09-28T19:54:25.920870',
  },
];

/** Construye un `AxiosError` con respuesta, como el que produce el backend ante un 4xx/5xx. */
function axiosErrorCon(status: number, data: unknown): AxiosError {
  const error = new AxiosError('Request failed');
  error.response = {
    status,
    data,
    statusText: '',
    headers: new AxiosHeaders(),
    config: { headers: new AxiosHeaders() },
  };
  return error;
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe('listarCarreras', () => {
  it('pide el listado al endpoint correcto', async () => {
    const spy = vi
      .spyOn(apiClient, 'get')
      .mockResolvedValue({ data: CARRERAS_PAGINADAS } as unknown as ReturnType<
        typeof apiClient.get
      >);

    await listarCarreras();

    expect(spy).toHaveBeenCalledWith('/carreras', { params: { page: 1, size: 100 } });
  });

  it('devuelve la respuesta paginada traducida', async () => {
    vi.spyOn(apiClient, 'get').mockResolvedValue({
      data: CARRERAS_PAGINADAS,
    } as unknown as ReturnType<typeof apiClient.get>);

    const resultado = await listarCarreras();
    expect(resultado.items).toHaveLength(1);
    expect(resultado.total).toBe(1);
    expect(resultado.totalPages).toBe(1);
  });

  it('acepta una lista vacía', async () => {
    vi.spyOn(apiClient, 'get').mockResolvedValue({
      data: { data: [], page: 1, size: 10, total: 0, total_pages: 0 },
    } as unknown as ReturnType<typeof apiClient.get>);

    const resultado = await listarCarreras({ size: 10 });
    expect(resultado.items).toEqual([]);
  });

  it('rechaza un id que llega como string', async () => {
    vi.spyOn(apiClient, 'get').mockResolvedValue({
      data: {
        ...CARRERAS_PAGINADAS,
        data: [{ ...CARRERAS_PAGINADAS.data[0], id: '1' }],
      },
    } as unknown as ReturnType<typeof apiClient.get>);

    await expect(listarCarreras()).rejects.toThrow();
  });

  it('rechaza una respuesta sin paginación', async () => {
    vi.spyOn(apiClient, 'get').mockResolvedValue({
      data: CARRERAS_PAGINADAS.data,
    } as unknown as ReturnType<typeof apiClient.get>);

    await expect(listarCarreras()).rejects.toThrow();
  });

  it('propaga el error ya normalizado por el interceptor', async () => {
    vi.spyOn(apiClient, 'get').mockRejectedValue({
      status: 500,
      mensaje: 'Error interno del servidor',
    });

    await expect(listarCarreras()).rejects.toEqual({
      status: 500,
      mensaje: 'Error interno del servidor',
    });
  });
});

describe('listarNovedades', () => {
  it('pide el listado al endpoint correcto', async () => {
    const spy = vi
      .spyOn(apiClient, 'get')
      .mockResolvedValue({ data: NOVEDADES } as unknown as ReturnType<typeof apiClient.get>);

    await listarNovedades();

    // Ojo con el nombre: el endpoint es `novedades`, no `noticias`.
    expect(spy).toHaveBeenCalledWith('/novedades');
  });

  it('devuelve la lista sin transformarla', async () => {
    vi.spyOn(apiClient, 'get').mockResolvedValue({
      data: NOVEDADES,
    } as unknown as ReturnType<typeof apiClient.get>);

    // El mapeo a `Noticia` lo hace el hook, no el servicio: acá sale el DTO crudo.
    expect(await listarNovedades()).toEqual(NOVEDADES);
  });

  it('acepta una lista vacía', async () => {
    vi.spyOn(apiClient, 'get').mockResolvedValue({
      data: [],
    } as unknown as ReturnType<typeof apiClient.get>);

    expect(await listarNovedades()).toEqual([]);
  });

  it('rechaza un destacado numérico en vez de booleano', async () => {
    vi.spyOn(apiClient, 'get').mockResolvedValue({
      data: [{ ...NOVEDADES[0], destacado: 1 }],
    } as unknown as ReturnType<typeof apiClient.get>);

    await expect(listarNovedades()).rejects.toThrow();
  });

  it('rechaza una respuesta envuelta en {data, meta}', async () => {
    vi.spyOn(apiClient, 'get').mockResolvedValue({
      data: { data: NOVEDADES },
    } as unknown as ReturnType<typeof apiClient.get>);

    await expect(listarNovedades()).rejects.toThrow();
  });

  it('propaga el error ya normalizado por el interceptor', async () => {
    vi.spyOn(apiClient, 'get').mockRejectedValue({
      status: 0,
      mensaje: 'Ocurrió un error inesperado. Intentá de nuevo más tarde.',
    });

    await expect(listarNovedades()).rejects.toEqual({
      status: 0,
      mensaje: 'Ocurrió un error inesperado. Intentá de nuevo más tarde.',
    });
  });
});

describe('iniciarSesion', () => {
  const LOGIN_OK = {
    token: 'jwt-de-prueba',
    usuario: {
      id: 1,
      nombre: 'Demo',
      apellido: 'Usuario',
      email: 'demo@ifts12.edu.ar',
      rol: 'admin',
    },
  };

  it('envía las credenciales al endpoint correcto', async () => {
    const spy = vi
      .spyOn(apiClient, 'post')
      .mockResolvedValue({ data: LOGIN_OK } as unknown as ReturnType<typeof apiClient.post>);

    await iniciarSesion({ email: 'demo@ifts12.edu.ar', password: 'secreto' });

    expect(spy).toHaveBeenCalledWith('/auth/login', {
      email: 'demo@ifts12.edu.ar',
      password: 'secreto',
    });
  });

  it('devuelve los datos parseados', async () => {
    vi.spyOn(apiClient, 'post').mockResolvedValue({
      data: LOGIN_OK,
    } as unknown as ReturnType<typeof apiClient.post>);

    expect(await iniciarSesion({ email: 'demo@ifts12.edu.ar', password: 'secreto' })).toEqual(
      LOGIN_OK,
    );
  });

  it('propaga el error normalizado', async () => {
    vi.spyOn(apiClient, 'post').mockRejectedValue({
      status: 401,
      mensaje: 'Credenciales inválidas',
    });

    await expect(iniciarSesion({ email: 'demo@ifts12.edu.ar', password: 'mala' })).rejects.toEqual({
      status: 401,
      mensaje: 'Credenciales inválidas',
    });
  });
});

describe('normalizarErrorApi', () => {
  it('devuelve el error normalizado tal como viene', () => {
    const error = { status: 403, mensaje: 'Sin permisos' };
    expect(normalizarErrorApi(error)).toEqual(error);
  });

  it('extrae mensaje desde response.data.mensaje', () => {
    const error = axiosErrorCon(400, { mensaje: 'Datos inválidos' });
    expect(normalizarErrorApi(error)).toEqual({ status: 400, mensaje: 'Datos inválidos' });
  });

  it('extrae mensaje desde response.data.message', () => {
    const error = axiosErrorCon(400, { message: 'Bad request' });
    expect(normalizarErrorApi(error)).toEqual({ status: 400, mensaje: 'Bad request' });
  });

  it('usa mensaje por defecto para error de red', () => {
    const error = new AxiosError('Network Error');
    expect(normalizarErrorApi(error)).toEqual({
      status: 0,
      mensaje: 'Ocurrió un error inesperado. Intentá de nuevo más tarde.',
    });
  });

  it('usa mensaje por defecto para status 500 sin body', () => {
    const error = axiosErrorCon(500, {});
    expect(normalizarErrorApi(error)).toEqual({
      status: 500,
      mensaje: 'Ocurrió un error inesperado. Intentá de nuevo más tarde.',
    });
  });
});
