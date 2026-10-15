import { describe, expect, it } from 'vitest';

/**
 * Guard anti-anotaciones (Fase 10).
 *
 * Los exports Desktop 1440 del avance de diseño traen anotaciones de UX/UI mezcladas con el
 * copy real: refs de requisitos (`RF-01`), de wireframe (`WF 02`), códigos de bloque
 * (`B4`, `I5`, `M1`) y frases internas ("Se cargan desde el panel admin", "Sin datos
 * inventados", "PENDIENTE INSTITUCIONAL"). La regla del proyecto es que esas anotaciones NO
 * se renderizan: viven como comentario de código y, si ocupan el lugar de un dato, se
 * reemplazan por un mensaje de proceso propio ("se publica cuando...").
 *
 * Este test es el guard mecánico de esa regla: recorre el código que sí se renderiza y falla
 * si una anotación quedó como texto o como prop de JSX.
 *
 * Los comentarios se descartan antes de buscar, así que dejar la anotación como
 * `{/* ... *\/}` o `// ...` es válido y esperado.
 */
const PATRONES: { nombre: string; regex: RegExp }[] = [
  { nombre: 'ref de requisito (RF-xx)', regex: /\bRF-\d+/g },
  { nombre: 'ref de wireframe (WF xx)', regex: /\bWF\s?\d{1,2}\b/g },
  { nombre: 'código de bloque (B/I/M + número)', regex: /\b[BI]\d{1,2}\b/g },
  { nombre: 'código de mockup (M + número)', regex: /\bM\d{1,2}\b/g },
  { nombre: 'marcador PENDIENTE INSTITUCIONAL', regex: /PENDIENTE INSTITUCIONAL/gi },
  { nombre: 'nota del panel admin', regex: /se cargan desde el panel(?: admin)?/gi },
  { nombre: 'nota del panel admin', regex: /lo carga el panel admin/gi },
  { nombre: 'nota del panel admin', regex: /se administra desde el panel/gi },
  { nombre: 'nota "sin datos inventados"', regex: /sin datos inventados/gi },
];

/**
 * Todo el código fuente bajo `src/`, en crudo. El patrón es estático y relativo a este
 * archivo (`src/__tests__/`), y Vite lo resuelve en tiempo de build.
 */
const FUENTES = import.meta.glob('../**/*.{ts,tsx}', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function esFuenteEscaneable(ruta: string): boolean {
  return !ruta.includes('__tests__') && !/\.(test|spec)\./.test(ruta);
}

function aRutaRepo(rutaGlob: string): string {
  return `src/${rutaGlob.replace(/^\.\.\//, '')}`;
}

/**
 * Descarta comentarios preservando el largo y los saltos de línea, para que el número de
 * línea del match siga siendo el del archivo original. Se respetan las `//` que siguen a `:`
 * (por ejemplo `http://localhost:5000`) para no comerse URLs.
 */
function sinComentarios(codigo: string): string {
  let salida = '';
  let i = 0;
  while (i < codigo.length) {
    const actual = codigo[i];
    const siguiente = codigo[i + 1];
    if (actual === '/' && siguiente === '*') {
      i += 2;
      while (i < codigo.length && !(codigo[i] === '*' && codigo[i + 1] === '/')) {
        salida += codigo[i] === '\n' ? '\n' : ' ';
        i += 1;
      }
      i += 2;
      continue;
    }
    if (actual === '/' && siguiente === '/' && !salida.endsWith(':')) {
      while (i < codigo.length && codigo[i] !== '\n') {
        salida += ' ';
        i += 1;
      }
      continue;
    }
    salida += actual;
    i += 1;
  }
  return salida;
}

function numeroDeLinea(texto: string, indice: number): number {
  let linea = 1;
  for (let i = 0; i < indice && i < texto.length; i += 1) {
    if (texto[i] === '\n') linea += 1;
  }
  return linea;
}

describe('guard anti-anotaciones de diseño', () => {
  const archivos = Object.entries(FUENTES)
    .filter(([ruta]) => esFuenteEscaneable(ruta))
    .map(([ruta, codigo]) => ({ ruta, codigo }));

  it('encuentra archivos fuente para escanear', () => {
    expect(archivos.length).toBeGreaterThan(0);
  });

  it('no renderiza anotaciones de diseño (RF-xx, PENDIENTE INSTITUCIONAL, notas del panel)', () => {
    const hallazgos: string[] = [];

    for (const { ruta, codigo: original } of archivos) {
      const codigo = sinComentarios(original);
      for (const { nombre, regex } of PATRONES) {
        regex.lastIndex = 0;
        let match = regex.exec(codigo);
        while (match !== null) {
          const linea = numeroDeLinea(codigo, match.index);
          hallazgos.push(`  ${aRutaRepo(ruta)}:${linea} → ${nombre}: "${match[0]}"`);
          match = regex.exec(codigo);
        }
      }
    }

    expect(
      hallazgos,
      `Se encontraron anotaciones de diseño renderizadas. Movelas a comentario de código o\nreemplazalas por un mensaje de proceso:\n${hallazgos.join('\n')}`,
    ).toEqual([]);
  });
});
