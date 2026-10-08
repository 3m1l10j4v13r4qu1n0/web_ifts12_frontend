import { describe, expect, it } from 'vitest';
import {
  buscarCarreraPorSlug,
  mapCarrerasApiACarreras,
  slugDesdeCarrera,
} from '../api/mappers/carrera.mapper';
import type { CarreraApi } from '../types/api/carrera.types';

/**
 * Las tres filas reales de la tabla `carreras` de `instance/ifts12.db`, con los mismos
 * nombres de campo que devuelve `GET /api/carreras` (`app.py:62-75`, `models.py:26-38`).
 *
 * Se usan los nombres reales, no inventados, porque el slug de navegación se deriva de ahí:
 * un test con "Técnico Superior en ..." pasaría con un regex que no matchea la realidad
 * ("Tecnicatura Superior en ...") y dejaría el bug escondido.
 */
const CARRERAS: CarreraApi[] = [
  {
    id: 1,
    nombre: 'Tecnicatura Superior en Análisis de Sistemas',
    codigo: 'AS-2023',
    resolucion: 'RS-2023-6336-GCABA-MEDGC',
    descripcion:
      'Formación profesional orientada al desarrollo de software, análisis funcional, bases de datos e infraestructura tecnológica.',
    duracion_anios: 3,
    titulo_otorgado: 'Técnico Superior en Análisis de Sistemas',
    modalidad: 'Híbrida / Presencial',
  },
  {
    id: 2,
    nombre: 'Tecnicatura Superior en Administración Pública',
    codigo: 'AP-2025',
    resolucion: 'Resolución Ministerial 2025',
    descripcion:
      'Formación especializada en la gestión estatal, políticas públicas, modernización administrativa y normativas del sector público.',
    duracion_anios: 3,
    titulo_otorgado: 'Técnico Superior en Administración Pública',
    modalidad: 'A Distancia / Híbrida',
  },
  {
    id: 3,
    nombre: 'Tecnicatura Superior en Administración y Gestión de Políticas Culturales',
    codigo: 'AGPC-2023',
    resolucion: 'Resolución Plan Cultural',
    descripcion:
      'Gestión de proyectos culturales, desarrollo comunitario, industrias creativas y administración de instituciones culturales.',
    duracion_anios: 3,
    titulo_otorgado: 'Técnico Superior en Gestión Cultural',
    modalidad: 'Híbrida',
  },
];

/** La segunda carrera con todos los opcionales en `null`, como los devuelve el backend. */
const CARRERA_SIN_OPCIONALES: CarreraApi = {
  ...CARRERAS[1],
  resolucion: null,
  descripcion: null,
  duracion_anios: null,
  titulo_otorgado: null,
  modalidad: null,
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
  it('mapea los campos que consume la tarjeta', () => {
    const [primera] = mapCarrerasApiACarreras(CARRERAS);

    expect(primera).toEqual({
      id: 'analisis-de-sistemas',
      nombre: 'Tecnicatura Superior en Análisis de Sistemas',
      descripcionBreve:
        'Formación profesional orientada al desarrollo de software, análisis funcional, bases de datos e infraestructura tecnológica.',
      modalidad: 'Híbrida / Presencial',
      horarios: undefined,
    });
  });

  it('deja la descripción vacía cuando el backend no la trae', () => {
    const [primera] = mapCarrerasApiACarreras([CARRERA_SIN_OPCIONALES]);

    // No se inventa texto institucional: la descripción vacía la resuelve la tarjeta, que
    // ya sabe mostrar el nombre de la carrera como fallback.
    expect(primera.descripcionBreve).toBe('');
  });

  it('deja la modalidad vacía cuando el backend no la trae', () => {
    const [primera] = mapCarrerasApiACarreras([CARRERA_SIN_OPCIONALES]);

    expect(primera.modalidad).toBe('');
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
