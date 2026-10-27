import { describe, expect, it } from 'vitest';
import { zCarreraApi, zPaginaCarrerasApi } from '../types/api/carrera.schema';
import { zNovedadApi, zNovedadApiLista } from '../types/api/novedad.schema';

/** Copia exacta de una fila de `carreras` en `instance/ifts12.db`, como la devuelve la API. */
const CARRERA_VALIDA = {
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
};

/** Copia exacta de una fila de `novedades`. */
const NOVEDAD_VALIDA = {
  id: 1,
  titulo: 'Inscripciones abiertas para el ciclo lectivo 2026',
  copete: 'Inicia el proceso de preingreso.',
  contenido: 'Te invitamos a inscribirte en nuestras tecnicaturas superiores oficiales.',
  categoria: 'Ingresantes',
  imagen_url: null,
  destacado: true,
  fecha_publicacion: '2026-09-28T19:54:25.920870',
};

describe('zCarreraApi', () => {
  it('acepta una carrera completa', () => {
    expect(zCarreraApi.parse(CARRERA_VALIDA)).toEqual(CARRERA_VALIDA);
  });

  it('acepta los opcionales en null', () => {
    const carrera = {
      ...CARRERA_VALIDA,
      descripcion: null,
      titulo_otorgado: null,
    };

    expect(zCarreraApi.parse(carrera)).toEqual(carrera);
  });

  it('rechaza un id string', () => {
    // El `id` de la API es `db.Integer` (`models.py:28`): si llega string, el backend cambió
    // el contrato y hay que enterarse en el borde, no en un componente.
    expect(() => zCarreraApi.parse({ ...CARRERA_VALIDA, id: '1' })).toThrow();
  });

  it('rechaza una duración negativa en el plan', () => {
    const carrera = {
      ...CARRERA_VALIDA,
      planes: [
        {
          ...CARRERA_VALIDA.planes[0],
          duracion_anios: -1,
        },
      ],
    };
    expect(() => zCarreraApi.parse(carrera)).toThrow();
  });

  it('rechaza un nombre vacío', () => {
    expect(() => zCarreraApi.parse({ ...CARRERA_VALIDA, nombre: '' })).toThrow();
  });
});

describe('zPaginaCarrerasApi', () => {
  it('acepta la respuesta paginada del endpoint', () => {
    const pagina = {
      data: [CARRERA_VALIDA],
      page: 1,
      size: 10,
      total: 1,
      total_pages: 1,
    };

    expect(zPaginaCarrerasApi.parse(pagina)).toEqual(pagina);
  });

  it('acepta una lista vacía', () => {
    // El backend devuelve `[]` cuando no hay carreras (`app.py:75`), no `null`: es un caso
    // válido que la UI tiene que poder mostrar.
    const pagina = {
      data: [],
      page: 1,
      size: 10,
      total: 0,
      total_pages: 0,
    };

    expect(zPaginaCarrerasApi.parse(pagina).data).toEqual([]);
  });

  it('rechaza null', () => {
    expect(() => zPaginaCarrerasApi.parse(null)).toThrow();
  });

  it('rechaza un array plano', () => {
    // La respuesta es paginada. Si algún día llega un array plano, el esquema frena
    // acá en vez de dejar que la UI itere sobre `undefined`.
    expect(() => zPaginaCarrerasApi.parse([CARRERA_VALIDA])).toThrow();
  });
});

describe('zNovedadApi', () => {
  it('acepta una novedad completa', () => {
    expect(zNovedadApi.parse(NOVEDAD_VALIDA)).toEqual(NOVEDAD_VALIDA);
  });

  it('acepta imagen_url en null', () => {
    expect(zNovedadApi.parse({ ...NOVEDAD_VALIDA, imagen_url: null })).toEqual({
      ...NOVEDAD_VALIDA,
      imagen_url: null,
    });
  });

  it('rechaza un destacado numérico', () => {
    expect(() => zNovedadApi.parse({ ...NOVEDAD_VALIDA, destacado: 1 })).toThrow();
  });

  it('rechaza un id string', () => {
    expect(() => zNovedadApi.parse({ ...NOVEDAD_VALIDA, id: '1' })).toThrow();
  });
});

describe('zNovedadApiLista', () => {
  it('acepta la lista del endpoint', () => {
    expect(zNovedadApiLista.parse([NOVEDAD_VALIDA])).toHaveLength(1);
  });

  it('acepta una lista vacía', () => {
    expect(zNovedadApiLista.parse([])).toEqual([]);
  });

  it('rechaza null', () => {
    expect(() => zNovedadApiLista.parse(null)).toThrow();
  });
});
