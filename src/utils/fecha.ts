/**
 * Formatea una fecha ISO corta (`YYYY-MM-DD`, la que produce `fechaNovedadAIso`) al formato
 * `dd/mm/aaaa` que usan el diseño y las tarjetas de novedades.
 *
 * No usa `Date` a propósito: la fecha de dominio ya viene normalizada a UTC por el mapper y
 * volver a parsearla acá reabriría el problema de corrimiento de día. Se parte del string.
 *
 * @returns `''` si la fecha viene vacía, para que la UI decida el fallback.
 */
export function formatearFechaCorta(iso: string): string {
  const partes = iso.split('-');
  if (partes.length !== 3) {
    return '';
  }

  const [anio, mes, dia] = partes;
  if (anio === '' || mes === '' || dia === '') {
    return '';
  }

  return `${dia}/${mes}/${anio}`;
}
