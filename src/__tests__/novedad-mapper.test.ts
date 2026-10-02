import { describe, expect, it } from 'vitest';
import {
  buscarNovedadPorSlug,
  fechaNovedadAIso,
  mapNovedadesApiANoticias,
  slugDesdeNovedad,
} from '../api/mappers/novedad.mapper';
import type { NovedadApi } from '../types/api/novedad.types';

/**
 * Las dos filas reales de la tabla `novedades` de `instance/ifts12.db`, con los mismos
 * nombres de campo que devuelve `GET /api/novedades` (`app.py:79-92`, `models.py:51-64`).
 *
 * Nota el `destacado` como `1`/`0`: SQLite lo guarda así, y el serializador del backend lo
 * pasa a booleano (`app.py:86`). Acá se usa el booleano que llega por HTTP, no el entero.
 */
const NOVEDADES: NovedadApi[] = [
  {
    id: 1,
    titulo: 'Inscripciones abiertas para el ciclo lectivo 2026',
    copete: 'Inicia el proceso de preingreso a las tecnicaturas superiores del IFTS N.º 12.',
    contenido:
      'Te invitamos a inscribirte en nuestras tecnicaturas superiores oficiales de la Ciudad de Buenos Aires. Modalidad gratuita y con títulos oficiales.',
    categoria: 'Ingresantes',
    imagen_url: null,
    destacado: true,
    fecha_publicacion: '2026-09-28T19:54:25.920870',
  },
  {
    id: 2,
    titulo: 'Inicio de Clases y Tutorías para Estudiantes',
    copete: 'Conocé el cronograma de acompañamiento y tutorías académicas.',
    contenido:
      'El equipo tutor del IFTS 12 puso a disposición los horarios de consulta para las materias de primer y segundo año.',
    categoria: 'Estudiantes',
    imagen_url: null,
    destacado: false,
    fecha_publicacion: '2026-09-28T19:54:25.920876',
  },
];

const SIN_OPCIONALES: NovedadApi = {
  ...NOVEDADES[0],
  copete: null,
  imagen_url: null,
  fecha_publicacion: null,
};

describe('slugDesdeNovedad', () => {
  it('pasa el título a kebab-case sin acentos', () => {
    expect(slugDesdeNovedad(NOVEDADES[0])).toBe(
      'inscripciones-abiertas-para-el-ciclo-lectivo-2026',
    );
  });

  it('deca el título con acentos y ñ', () => {
    expect(slugDesdeNovedad(NOVEDADES[1])).toBe('inicio-de-clases-y-tutorias-para-estudiantes');
  });

  it('conserva los dígitos del año', () => {
    expect(slugDesdeNovedad(NOVEDADES[0])).toContain('2026');
  });
});

describe('fechaNovedadAIso', () => {
  it('interpreta la fecha naive del backend como UTC y no como hora local', () => {
    // El backend usa `datetime.utcnow` (`models.py:63`), así que la fecha que llega no tiene
    // zona. Sin el `Z` que agrega el mapper, `new Date()` la leería como local y en un
    // servidor UTC-3 el día se correría al anterior.
    expect(fechaNovedadAIso('2026-09-28T19:54:25.920870')).toBe('2026-09-28');
  });

  it('respeta una fecha que ya trae su zona', () => {
    expect(fechaNovedadAIso('2026-09-28T19:54:25+00:00')).toBe('2026-09-28');
  });

  it('devuelve la fecha correcta cuando el offset cruza el día', () => {
    // 2026-09-28T02:00:00-06:00 es 2026-09-28T08:00Z: sigue siendo el 28.
    expect(fechaNovedadAIso('2026-09-28T02:00:00-06:00')).toBe('2026-09-28');
  });

  it('devuelve null cuando la fecha es null', () => {
    expect(fechaNovedadAIso(null)).toBeNull();
  });

  it('devuelve null cuando la fecha viene vacía', () => {
    expect(fechaNovedadAIso('')).toBeNull();
  });

  it('devuelve null cuando la fecha no es parseable', () => {
    expect(fechaNovedadAIso('no-es-una-fecha')).toBeNull();
  });
});

describe('mapNovedadesApiANoticias', () => {
  it('renombra los campos snake_case a los que usa la tarjeta', () => {
    const [primera] = mapNovedadesApiANoticias(NOVEDADES);

    expect(primera).toEqual({
      id: 'inscripciones-abiertas-para-el-ciclo-lectivo-2026',
      titulo: 'Inscripciones abiertas para el ciclo lectivo 2026',
      resumen: 'Inicia el proceso de preingreso a las tecnicaturas superiores del IFTS N.º 12.',
      fecha: '2026-09-28',
      imagenUrl: undefined,
      enlace: undefined,
    });
  });

  it('deca el copete vacío cuando el backend no lo trae', () => {
    const [primera] = mapNovedadesApiANoticias([SIN_OPCIONALES]);

    expect(primera.resumen).toBe('');
  });

  it('deca la fecha vacía cuando el backend no la trae', () => {
    const [primera] = mapNovedadesApiANoticias([SIN_OPCIONALES]);

    // La fecha vacía es la señal que la UI usa para mostrar "Novedad" en vez de una fecha.
    expect(primera.fecha).toBe('');
  });

  it('no mete `contenido` en el tipo de tarjeta', () => {
    const [primera] = mapNovedadesApiANoticias(NOVEDADES);

    // El cuerpo completo se lee en la página de detalle, que recibe el DTO. Si el mapper lo
    // metiera acá, se perdería al mapear la lista.
    expect(primera).not.toHaveProperty('contenido');
  });

  it('devuelve un array vacío cuando el backend no tiene novedades', () => {
    expect(mapNovedadesApiANoticias([])).toEqual([]);
  });
});

describe('buscarNovedadPorSlug', () => {
  it('encuentra la novedad por su slug', () => {
    const encontrada = buscarNovedadPorSlug(
      NOVEDADES,
      'inicio-de-clases-y-tutorias-para-estudiantes',
    );

    expect(encontrada?.id).toBe(2);
  });

  it('también acepta el id numérico de la API como string', () => {
    // Tolerancia a mano: alguien puede escribir /noticias/1 a mano y tiene que funcionar.
    expect(buscarNovedadPorSlug(NOVEDADES, '1')?.id).toBe(1);
  });

  it('devuelve undefined si no existe', () => {
    expect(buscarNovedadPorSlug(NOVEDADES, 'inexistente')).toBeUndefined();
  });

  it('no encuentra nada cuando la lista todavía está vacía', () => {
    expect(
      buscarNovedadPorSlug([], 'inscripciones-abiertas-para-el-ciclo-lectivo-2026'),
    ).toBeUndefined();
  });
});
