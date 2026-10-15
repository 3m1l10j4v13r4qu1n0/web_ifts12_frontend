import { describe, expect, it } from 'vitest';
import { formatearFechaCorta } from '../utils/fecha';

describe('formatearFechaCorta', () => {
  it('pasa una fecha ISO corta a dd/mm/aaaa', () => {
    expect(formatearFechaCorta('2026-09-28')).toBe('28/09/2026');
  });

  it('conserva el cero a la izquierda de día y mes', () => {
    expect(formatearFechaCorta('2026-01-05')).toBe('05/01/2026');
  });

  it('devuelve vacío cuando la fecha es vacía', () => {
    expect(formatearFechaCorta('')).toBe('');
  });

  it('devuelve vacío cuando la fecha no tiene el formato esperado', () => {
    expect(formatearFechaCorta('28/09/2026')).toBe('');
  });
});
