import { describe, expect, it } from 'vitest';
import {
  buscarCarreraPorSlug,
  mapCarrerasApiACarreras,
  slugDesdeCarrera,
} from '../api/mappers/carrera.mapper';
import type { CarreraApi } from '../types/api/carrera.types';

/**
 * Las tres filas reales de la tabla `carreras` de `instance/ifts12.db`, con los mismos
 * nombres de campo que devuelve `GET /api/carreras` (`inbox/apispec_1.json`).
 */
const CARRERAS: CarreraApi[] = [
  {
    id: 1,
    nombre: 'Tecnicatura Superior en Análisis de Sistemas',
    descripcion:
      'Formación profesional orientada al desarrollo de software, análisis funcional, bases de datos e infraestructura tecnológica.',
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
  {
    id: 2,
    nombre: 'Tecnicatura Superior en Administración Pública',
    descripcion:
      'Formación especializada en la gestión estatal, políticas públicas, modernización administrativa y normativas del sector público.',
    titulo_otorgado: 'Técnico Superior en Administración Pública',
    activa: true,
    created_at: '2026-01-01T00:00:00',
    updated_at: '2026-01-01T00:00:00',
    planes: [
      {
        id: 2,
        carrera_id: 2,
        nombre: 'Plan 2025',
        codigo: 'AP-2025',
        resolucion: 'Resolución Ministerial 2025',
        duracion_anios: 3,
        vigente_desde: '2025-03-01',
        vigente_hasta: null,
        activo: true,
        created_at: '2026-01-01T00:00:00',
        updated_at: '2026-01-01T00:00:00',
      },
    ],
  },
  {
    id: 3,
    nombre: 'Tecnicatura Superior en Administración y Gestión de Políticas Culturales',
    descripcion:
      'Gestión de proyectos culturales, desarrollo comunitario, industrias creativas y administración de instituciones culturales.',
    titulo_otorgado: 'Técnico Superior en Gestión Cultural',
    activa: true,
    created_at: '2026-01-01T00:00:00',
    updated_at: '2026-01-01T00:00:00',
    planes: [
      {
        id: 3,
        carrera_id: 3,
        nombre: 'Plan 2023',
        codigo: 'AGPC-2023',
        resolucion: 'Resolución Plan Cultural',
        duracion_anios: 3,
        vigente_desde: '2023-03-01',
        vigente_hasta: null,
        activo: true,
        created_at: '2026-01-01T00:00:00',
        updated_at: '2026-01-01T00:00:00',
      },
    ],
  },
];

/** La segunda carrera con todos los opcionales en `null`, como los devuelve el backend. */
const CARRERA_SIN_OPCIONALES: CarreraApi = {
  ...CARRERAS[1],
  descripcion: null,
  titulo_otorgado: null,
  planes: [
    {
      ...CARRERAS[1].planes[0],
      nombre: null,
      codigo: null,
      resolucion: null,
      duracion_anios: null,
      vigente_desde: null,
      vigente_hasta: null,
    },
  ],
};

describe('slugDesdeCarrera', () => {
  it('quita el prefijo genérico del título', () => {
    expect(slugDesdeCarrera(CARRERAS[0])).toBe('analisis-de-sistemas');
  });

  it('conserva las palabras que distinguen una carrera de otra', () => {
    expect(slugDesdeCarrera(CARRERAS[2])).toBe('administracion-y-gestion-de-politicas-culturales');
  });

  it('deca los acentos y baja a minúsculas', () => {
    expect(slugDesdeCarrera(CARRERAS[0])).not.toContain('í');
    expect(slugDesdeCarrera(CARRERAS[0])).toBe(slugDesdeCarrera(CARRERAS[0]).toLowerCase());
  });

  it('deja el nombre intacto si no matchea el prefijo genérico', () => {
    // Si someday el backend manda un nombre corto, el slug debe degradar a kebab-case y no
    // quedar vacío ni cortar palabras.
    expect(slugDesdeCarrera({ nombre: 'Analista en Sistemas' })).toBe('analista-en-sistemas');
  });
});

describe('mapCarrerasApiACarreras', () => {
  it('mapea los campos que consume la tarjeta y los oficiales de la ficha', () => {
    const [primera] = mapCarrerasApiACarreras(CARRERAS);

    expect(primera).toEqual({
      id: 'analisis-de-sistemas',
      nombre: 'Tecnicatura Superior en Análisis de Sistemas',
      descripcionBreve:
        'Formación profesional orientada al desarrollo de software, análisis funcional, bases de datos e infraestructura tecnológica.',
      tituloOtorgado: 'Técnico Superior en Análisis de Sistemas',
      duracionAnios: 3,
      resolucion: 'RS-2023-6336-GCABA-MEDGC',
      planNombre: 'Plan 2023',
      planCodigo: 'AS-2023',
    });
  });

  it('deja la descripción vacía cuando el backend no la trae', () => {
    const [primera] = mapCarrerasApiACarreras([CARRERA_SIN_OPCIONALES]);

    // No se inventa texto institucional: la descripción vacía la resuelve la tarjeta, que
    // ya sabe mostrar el nombre de la carrera como fallback.
    expect(primera.descripcionBreve).toBe('');
  });

  it('no agrega modalidad ni horarios (ya no existen en el contrato)', () => {
    const [primera] = mapCarrerasApiACarreras([CARRERA_SIN_OPCIONALES]);

    expect((primera as Record<string, unknown>).modalidad).toBeUndefined();
    expect((primera as Record<string, unknown>).horarios).toBeUndefined();
  });

  it('deja los campos oficiales en undefined cuando el backend los trae en null', () => {
    const [primera] = mapCarrerasApiACarreras([CARRERA_SIN_OPCIONALES]);

    // `undefined` (y no `''`) para que la ficha distinga "el backend no lo tiene" de un
    // valor vacío y muestre PENDIENTE sin inventar título, duración ni resolución.
    expect(primera.tituloOtorgado).toBeUndefined();
    expect(primera.duracionAnios).toBeUndefined();
    expect(primera.resolucion).toBeUndefined();
    expect(primera.planNombre).toBeUndefined();
    expect(primera.planCodigo).toBeUndefined();
  });

  it('genera slugs únicos para las tres carreras reales', () => {
    const ids = mapCarrerasApiACarreras(CARRERAS).map((carrera) => carrera.id);

    // Si dos carreras colisionaran en el mismo slug, una enlazaría a la ficha de la otra.
    expect(new Set(ids).size).toBe(CARRERAS.length);
  });

  it('devuelve un array vacío cuando el backend no tiene carreras', () => {
    expect(mapCarrerasApiACarreras([])).toEqual([]);
  });
});

describe('buscarCarreraPorSlug', () => {
  const carreras = mapCarrerasApiACarreras(CARRERAS);

  it('encuentra la carrera por su slug', () => {
    expect(buscarCarreraPorSlug(carreras, 'analisis-de-sistemas')?.nombre).toBe(
      'Tecnicatura Superior en Análisis de Sistemas',
    );
  });

  it('tolera mayúsculas y espacios en la URL', () => {
    expect(buscarCarreraPorSlug(carreras, '  Analisis-De-Sistemas ')?.id).toBe(
      'analisis-de-sistemas',
    );
  });

  it('devuelve undefined si no existe', () => {
    expect(buscarCarreraPorSlug(carreras, 'inexistente')).toBeUndefined();
  });

  it('no encuentra nada cuando la lista todavía está vacía', () => {
    expect(buscarCarreraPorSlug([], 'analisis-de-sistemas')).toBeUndefined();
  });
});
