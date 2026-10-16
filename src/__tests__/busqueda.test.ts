import { describe, expect, it } from 'vitest';
import { mapCarrerasApiACarreras } from '../api/mappers/carrera.mapper';
import { CARRERAS_API_FIJA, NOVEDADES_API_FIJA } from '../test-utils';
import type { CarreraApi } from '../types/api/carrera.types';
import type { NovedadApi } from '../types/api/novedad.types';
import { buscarContenidoLocal } from '../utils/busqueda';

/**
 * El buscador indexa lo mismo que las páginas: las carreras ya mapeadas y las novedades en
 * DTO crudo, tal como las devuelve el backend.
 */
const CONTENIDO = {
  carreras: mapCarrerasApiACarreras(CARRERAS_API_FIJA as CarreraApi[]),
  novedades: NOVEDADES_API_FIJA as NovedadApi[],
};

const VACIO = { carreras: [], novedades: [] };

describe('buscarContenidoLocal', () => {
  it('devuelve vacío con consulta vacía', () => {
    expect(buscarContenidoLocal('', CONTENIDO)).toEqual([]);
    expect(buscarContenidoLocal('   ', CONTENIDO)).toEqual([]);
  });

  it('normaliza tildes y mayúsculas al buscar', () => {
    // "Administración Pública" tiene que aparecer tanto con tilde como sin ella, y en
    // mayúsculas: la comparación se hace sobre el texto normalizado.
    const conTilde = buscarContenidoLocal('Administración', CONTENIDO);
    const sinTilde = buscarContenidoLocal('ADMINISTRACION', CONTENIDO);

    expect(conTilde.some((r) => r.seccion === 'Carreras')).toBe(true);
    expect(sinTilde.some((r) => r.seccion === 'Carreras')).toBe(true);
  });

  it('no encuentra nada para un término ausente', () => {
    expect(buscarContenidoLocal('genero', CONTENIDO).length).toBe(0);
  });

  it('encuentra carreras por su nombre', () => {
    const resultados = buscarContenidoLocal('sistemas', CONTENIDO);

    expect(resultados.some((r) => r.seccion === 'Carreras')).toBe(true);
  });

  it('enlaza la carrera directo a su ficha, no al listado', () => {
    const resultados = buscarContenidoLocal('sistemas', CONTENIDO);
    const carrera = resultados.find((r) => r.seccion === 'Carreras');

    // Con mocks el buscador llevaba a `/carreras`, que ya no muestra esa carrera.
    expect(carrera?.href).toBe('/carreras/analisis-de-sistemas');
  });

  it('arma la ruta de migas del resultado', () => {
    const resultados = buscarContenidoLocal('sistemas', CONTENIDO);
    const carrera = resultados.find((r) => r.seccion === 'Carreras');

    expect(carrera?.contexto).toEqual(['Carreras', 'Tecnicatura Superior en Análisis de Sistemas']);
  });

  it('encuentra una novedad por su copete', () => {
    const resultados = buscarContenidoLocal('tutorías', CONTENIDO);
    const novedad = resultados.find((r) => r.seccion === 'Novedades');

    expect(novedad?.titulo).toBe('Inicio de Clases y Tutorías para Estudiantes');
  });

  it('enlaza la novedad a su detalle con el slug derivado', () => {
    const resultados = buscarContenidoLocal('tutorías', CONTENIDO);
    const novedad = resultados.find((r) => r.seccion === 'Novedades');

    expect(novedad?.href).toBe('/noticias/inicio-de-clases-y-tutorias-para-estudiantes');
  });

  it('incluye las secciones del menú principal', () => {
    const resultados = buscarContenidoLocal('novedades', CONTENIDO);

    expect(resultados.some((r) => r.seccion === 'Novedades' && r.href === '/noticias')).toBe(true);
  });

  it('no rompe cuando una novedad viene sin copete', () => {
    const sinCopete: NovedadApi = { ...NOVEDADES_API_FIJA[0], copete: null };

    expect(() =>
      buscarContenidoLocal('inscripciones', {
        carreras: CONTENIDO.carreras,
        novedades: [sinCopete],
      }),
    ).not.toThrow();
  });

  it('devuelve todos los resultados que coinciden (la página paginación los maneja)', () => {
    // El desplegable del header es el que recorta las sugerencias; la utilidad no limita.
    expect(buscarContenidoLocal('a', CONTENIDO).length).toBeGreaterThan(8);
  });

  it('busca solo sobre secciones y FAQs cuando la API no devolvió nada', () => {
    // El buscador vive en el header, que se renderiza en toda página: no debe romperse si
    // la consulta todavía no llegó o falló.
    const resultados = buscarContenidoLocal('inscripción', VACIO);

    expect(resultados.some((r) => r.seccion === 'Carreras')).toBe(false);
    expect(resultados.some((r) => r.seccion === 'Novedades')).toBe(false);
  });
});
