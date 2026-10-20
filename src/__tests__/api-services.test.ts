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
const CARRERAS = [
  {
    id: 1,
    nombre: 'Tecnicatura Superior en Análisis de Sistemas',
    codigo: 'AS-2023',
    resolucion: 'RS-2023-6336-GCABA-MEDGC',
    descripcion: 'Formación profesional orientada al desarrollo de software.',
    duracion_anios: 3,
    titulo_otorgado: 'Técnico Superior en Análisis de Sistemas',
    modalidad: 'Híbrida / Presencial',
  },
];

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
      .mockResolvedValue({ data: CARRERAS } as unknown as ReturnType<typeof apiClient.get>);

    await listarCarreras();

    expect(spy).toHaveBeenCalledWith('/carreras');
  });

  it('devuelve la lista sin paginar ni envolver', async () => {
    vi.spyOn(apiClient, 'get').mockResolvedValue({
      data: CARRERAS,
    } as unknown as ReturnType<typeof apiClient.get>);

    expect(await listarCarreras()).toEqual(CARRERAS);
  });

  it('acepta una lista vacía', async () => {
    vi.spyOn(apiClient, 'get').mockResolvedValue({
      data: [],
    } as unknown as ReturnType<typeof apiClient.get>);

    // El backend devuelve `[]` y no `null` cuando no hay carreras (`app.py:75`).
    expect(await listarCarreras()).toEqual([]);
  });

  it('rechaza un id que llega como string', async () => {
    vi.spyOn(apiClient, 'get').mockResolvedValue({
      data: [{ ...CARRERAS[0], id: '1' }],
    } as unknown as ReturnType<typeof apiClient.get>);

    // El `id` de la API es `db.Integer` (`models.py:28`): si llega string, el `parse` frena acá
    // en lugar de dejar que un componente itere sobre un id numérico que no es.
    await expect(listarCarreras()).rejects.toThrow();
  });

  it('rechaza una respuesta envuelta en {data, meta}', async () => {
    vi.spyOn(apiClient, 'get').mockResolvedValue({
      data: { data: CARRERAS, meta: {} },
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
      nombre: 'Edith',
      apellido: 'Gómez',
      email: 'edith@ifts12',
      rol: 'admin',
    },
  };

  it('pide el login al endpoint correcto con email y password', async () => {
    const spy = vi
      .spyOn(apiClient, 'post')
      .mockResolvedValue({ data: LOGIN_OK } as unknown as ReturnType<typeof apiClient.post>);

    await iniciarSesion({ email: 'edith@ifts12', password: 'secreta' });

    // El body usa `email`/`password`, como pide `app.py:34-36`.
    expect(spy).toHaveBeenCalledWith('/auth/login', {
      email: 'edith@ifts12',
      password: 'secreta',
    });
  });

  it('devuelve el token y el usuario sin transformarlos', async () => {
    vi.spyOn(apiClient, 'post').mockResolvedValue({
      data: LOGIN_OK,
    } as unknown as ReturnType<typeof apiClient.post>);

    expect(await iniciarSesion({ email: 'edith@ifts12', password: 'secreta' })).toEqual(LOGIN_OK);
  });

  it('rechaza una respuesta sin token', async () => {
    vi.spyOn(apiClient, 'post').mockResolvedValue({
      data: { ...LOGIN_OK, token: '' },
    } as unknown as ReturnType<typeof apiClient.post>);

    await expect(iniciarSesion({ email: 'a@b', password: 'x' })).rejects.toThrow();
  });

  it('propaga el error ya normalizado por el interceptor (401)', async () => {
    vi.spyOn(apiClient, 'post').mockRejectedValue({
      status: 401,
      mensaje: 'Credenciales inválidas',
    });

    await expect(iniciarSesion({ email: 'a@b', password: 'mala' })).rejects.toEqual({
      status: 401,
      mensaje: 'Credenciales inválidas',
    });
  });
});

describe('normalizarErrorApi', () => {
  it('usa el texto del backend cuando viene en {error}', () => {
    expect(normalizarErrorApi(axiosErrorCon(400, { error: 'Faltan campos obligatorios' }))).toEqual(
      { status: 400, mensaje: 'Faltan campos obligatorios' },
    );
  });

  it('cae al fallback por código cuando el body no tiene {error}', () => {
    // Un 502 de proxy devuelve HTML, no JSON con `error`.
    expect(normalizarErrorApi(axiosErrorCon(502, '<html>Bad Gateway</html>'))).toEqual({
      status: 502,
      mensaje: 'Ocurrió un error inesperado. Intentá de nuevo más tarde.',
    });
  });

  it('cae al fallback cuando el campo error viene vacío', () => {
    expect(normalizarErrorApi(axiosErrorCon(400, { error: '   ' }))).toEqual({
      status: 400,
      mensaje: 'Revisá los datos enviados.',
    });
  });

  it('usa status 0 cuando no hubo respuesta', () => {
    expect(normalizarErrorApi(new AxiosError('Network Error'))).toEqual({
      status: 0,
      mensaje: 'Ocurrió un error inesperado. Intentá de nuevo más tarde.',
    });
  });

  it('mapea el 401 al mensaje de sesión iniciada', () => {
    expect(normalizarErrorApi(axiosErrorCon(401, {}))).toEqual({
      status: 401,
      mensaje: 'Necesitás iniciar sesión para ver esta información.',
    });
  });

  it('ignora un error que no es de Axios', () => {
    expect(normalizarErrorApi(new Error('boom'))).toEqual({
      status: 0,
      mensaje: 'Ocurrió un error inesperado. Intentá de nuevo más tarde.',
    });
  });
});
