import { describe, expect, it } from 'vitest';
import { zCarreraApi, zCarreraApiLista } from '../types/api/carrera.schema';
import { zNovedadApi, zNovedadApiLista } from '../types/api/novedad.schema';

/** Copia exacta de una fila de `carreras` en `instance/ifts12.db`, como la devuelve la API. */
const CARRERA_VALIDA = {
  id: 1,
  nombre: 'Tecnicatura Superior en Análisis de Sistemas',
  codigo: 'AS-2023',
  resolucion: 'RS-2023-6336-GCABA-MEDGC',
  descripcion: 'Formación profesional orientada al desarrollo de software.',
  duracion_anios: 3,
  titulo_otorgado: 'Técnico Superior en Análisis de Sistemas',
  modalidad: 'Híbrida / Presencial',
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
      resolucion: null,
      descripcion: null,
      duracion_anios: null,
    };

    expect(zCarreraApi.parse(carrera)).toEqual(carrera);
  });

  it('rechaza un id string', () => {
    // El `id` de la API es `db.Integer` (`models.py:28`): si llega string, el backend cambió
    // el contrato y hay que enterarse en el borde, no en un componente.
    expect(() => zCarreraApi.parse({ ...CARRERA_VALIDA, id: '1' })).toThrow();
  });

  it('rechaza una duración negativa', () => {
    expect(() => zCarreraApi.parse({ ...CARRERA_VALIDA, duracion_anios: -1 })).toThrow();
  });

  it('rechaza un nombre vacío', () => {
    expect(() => zCarreraApi.parse({ ...CARRERA_VALIDA, nombre: '' })).toThrow();
  });

  it('rechaza una duración decimal', () => {
    expect(() => zCarreraApi.parse({ ...CARRERA_VALIDA, duracion_anios: 2.5 })).toThrow();
  });
});

describe('zCarreraApiLista', () => {
  it('acepta la lista del endpoint', () => {
    expect(zCarreraApiLista.parse([CARRERA_VALIDA])).toHaveLength(1);
  });

  it('acepta una lista vacía', () => {
    // El backend devuelve `[]` cuando no hay carreras (`app.py:75`), no `null`: es un caso
    // válido que la UI tiene que poder mostrar.
    expect(zCarreraApiLista.parse([])).toEqual([]);
  });

  it('rechaza null', () => {
    expect(() => zCarreraApiLista.parse(null)).toThrow();
  });

  it('rechaza un objeto envuelto en data', () => {
    // La respuesta es un array plano. Si algún día llega `{data, meta}`, el esquema frena
    // acá en vez de dejar que la UI itere sobre `undefined`.
    expect(() => zCarreraApiLista.parse({ data: [CARRERA_VALIDA], meta: {} })).toThrow();
  });
});

describe('zNovedadApi', () => {
  it('acepta una novedad completa', () => {
    expect(zNovedadApi.parse(NOVEDAD_VALIDA)).toEqual(NOVEDAD_VALIDA);
  });

  it('acepta los opcionales en null', () => {
    const novedad = {
      ...NOVEDAD_VALIDA,
      copete: null,
      categoria: null,
      imagen_url: null,
      fecha_publicacion: null,
    };

    expect(zNovedadApi.parse(novedad)).toEqual(novedad);
  });

  it('exige el contenido completo', () => {
    // `contenido` es `nullable=False` (`models.py:59`): es el cuerpo de la nota, y sin él la
    // página de detalle no tiene nada que mostrar.
    expect(() => zNovedadApi.parse({ ...NOVEDAD_VALIDA, contenido: null })).toThrow();
  });

  it('rechaza un destacado que no es booleano', () => {
    // SQLite guarda `1`/`0`, pero el serializador lo convierte a bool (`app.py:86`). Si llega
    // `1`, el contrato cambió y hay que enterarse.
    expect(() => zNovedadApi.parse({ ...NOVEDAD_VALIDA, destacado: 1 })).toThrow();
  });

  it('rechaza un id string', () => {
    expect(() => zNovedadApi.parse({ ...NOVEDAD_VALIDA, id: '1' })).toThrow();
  });
});

describe('zNovedadApiLista', () => {
  it('acepta la lista del endpoint', () => {
    expect(zNovedadApiLista.parse([NOVEDAD_VALIDA, NOVEDAD_VALIDA])).toHaveLength(2);
  });

  it('acepta una lista vacía', () => {
    expect(zNovedadApiLista.parse([])).toEqual([]);
  });

  it('rechaza un objeto envuelto en data', () => {
    expect(() => zNovedadApiLista.parse({ data: [NOVEDAD_VALIDA] })).toThrow();
  });
});
