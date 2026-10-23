import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  authHabilitada,
  contactoHabilitado,
  MODULOS_HABILITADOS_POR_DEFECTO,
  novedadesHabilitadas,
  resolverBandera,
} from '../constants/contrato';

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('resolverBandera', () => {
  it('usa el default cuando la variable no está definida', () => {
    expect(resolverBandera(undefined, true)).toBe(true);
    expect(resolverBandera(undefined, false)).toBe(false);
  });

  it('usa el default cuando la variable está vacía o es irreconocible', () => {
    expect(resolverBandera('', false)).toBe(false);
    expect(resolverBandera('   ', true)).toBe(true);
    expect(resolverBandera('quizás', false)).toBe(false);
  });

  it('acepta los valores afirmativos, sin importar mayúsculas ni espacios', () => {
    for (const valor of ['1', 'true', 'TRUE', 'on', 'si', 'Sí', 'yes', ' true ']) {
      expect(resolverBandera(valor, false)).toBe(true);
    }
  });

  it('acepta los valores negativos, sin importar mayúsculas ni espacios', () => {
    for (const valor of ['0', 'false', 'FALSE', 'off', 'no', ' 0 ']) {
      expect(resolverBandera(valor, true)).toBe(false);
    }
  });

  it('en producción el default apaga el módulo', () => {
    expect(resolverBandera(undefined, false)).toBe(false);
  });
});

describe('banderas de contrato', () => {
  it('en test el default es habilitado', () => {
    expect(import.meta.env.PROD).toBe(false);
    expect(MODULOS_HABILITADOS_POR_DEFECTO).toBe(true);
    expect(novedadesHabilitadas()).toBe(true);
    expect(authHabilitada()).toBe(true);
    expect(contactoHabilitado()).toBe(true);
  });

  it('una variable explícita apaga cada módulo', () => {
    vi.stubEnv('VITE_NOVEDADES_HABILITADAS', 'false');
    vi.stubEnv('VITE_ADMIN_HABILITADO', 'off');
    vi.stubEnv('VITE_CONTACTO_HABILITADO', '0');

    expect(novedadesHabilitadas()).toBe(false);
    expect(authHabilitada()).toBe(false);
    expect(contactoHabilitado()).toBe(false);
  });

  it('una variable explícita vuelve a habilitar cada módulo', () => {
    vi.stubEnv('VITE_NOVEDADES_HABILITADAS', 'true');
    vi.stubEnv('VITE_ADMIN_HABILITADO', 'on');
    vi.stubEnv('VITE_CONTACTO_HABILITADO', '1');

    expect(novedadesHabilitadas()).toBe(true);
    expect(authHabilitada()).toBe(true);
    expect(contactoHabilitado()).toBe(true);
  });

  it('cada módulo lee su propia variable', () => {
    vi.stubEnv('VITE_NOVEDADES_HABILITADAS', 'false');
    vi.stubEnv('VITE_ADMIN_HABILITADO', 'true');
    vi.stubEnv('VITE_CONTACTO_HABILITADO', 'true');

    expect(novedadesHabilitadas()).toBe(false);
    expect(authHabilitada()).toBe(true);
    expect(contactoHabilitado()).toBe(true);
  });
});
