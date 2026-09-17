import { describe, expect, it } from 'vitest';
import { buscarContenidoLocal } from '../utils/busqueda';

describe('buscarContenidoLocal', () => {
  it('devuelve vacío con consulta vacía', () => {
    expect(buscarContenidoLocal('')).toEqual([]);
    expect(buscarContenidoLocal('   ')).toEqual([]);
  });

  it('normaliza tildes y mayúsculas al buscar', () => {
    expect(buscarContenidoLocal('INSCRIPCION').length).toBeGreaterThan(0);
    expect(buscarContenidoLocal('genero').length).toBe(0);
  });

  it('encuentra carreras por su nombre', () => {
    const resultados = buscarContenidoLocal('parlamentaria');
    expect(resultados.some((r) => r.titulo === 'Gestión parlamentaria')).toBe(true);
  });

  it('incluye las secciones del menú principal', () => {
    const resultados = buscarContenidoLocal('novedades');
    expect(resultados.some((r) => r.categoria === 'Secciones' && r.href === '/noticias')).toBe(
      true,
    );
  });

  it('devuelve a lo sumo 8 resultados por consulta', () => {
    const resultados = buscarContenidoLocal('carrera');
    expect(resultados.length).toBeLessThanOrEqual(8);
  });
});
