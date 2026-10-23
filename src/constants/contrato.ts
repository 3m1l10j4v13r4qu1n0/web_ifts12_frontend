/**
 * Banderas de módulos cuya API todavía no está en el contrato.
 *
 * Fuente de verdad de endpoints: `inbox/apispec_1.json` (Swagger 2.0). Mientras un recurso
 * no figure ahí, el frontend no lo consume: muestra un aviso de proceso en lugar de llamar
 * a un endpoint inexistente. Ver `docs/06_audits/audit_2026-10-22-backend.md` (BE-N03 y
 * BE-N04) y `inbox/plan_aislamiento_apispec_2026-10-22.md` §2.1.
 *
 * Defaults:
 * - **Desarrollo y test:** habilitados (`true`).
 * - **Producción:** deshabilitados (`false`), para no exponer superficies sin contrato.
 *
 * Se pueden forzar por entorno con las variables de `.env`:
 * `VITE_NOVEDADES_HABILITADAS`, `VITE_ADMIN_HABILITADO` y `VITE_CONTACTO_HABILITADO`.
 * Un valor explícito siempre gana sobre el default.
 */

const VALORES_VERDADEROS = new Set(['1', 'true', 'on', 'si', 'sí', 'yes']);
const VALORES_FALSOS = new Set(['0', 'false', 'off', 'no']);

/**
 * Interpreta una variable de entorno como bandera.
 *
 * Vite expone las variables como texto. Un valor vacío o irreconocible cae al default en
 * lugar de habilitar el módulo por accidente: ante la duda, se aísla.
 */
export function resolverBandera(valor: string | undefined, porDefecto: boolean): boolean {
  if (valor === undefined) {
    return porDefecto;
  }

  const normalizado = valor.trim().toLowerCase();

  if (normalizado === '') {
    return porDefecto;
  }

  if (VALORES_VERDADEROS.has(normalizado)) {
    return true;
  }

  if (VALORES_FALSOS.has(normalizado)) {
    return false;
  }

  return porDefecto;
}

/**
 * Default por entorno. `import.meta.env.PROD` es `true` solo en el build de producción;
 * en desarrollo y en Vitest es `false`.
 */
export const MODULOS_HABILITADOS_POR_DEFECTO = !import.meta.env.PROD;

/**
 * Novedades (`GET /api/novedades`). No está en el apispec (BE-N03).
 */
export function novedadesHabilitadas(): boolean {
  return resolverBandera(
    import.meta.env.VITE_NOVEDADES_HABILITADAS,
    MODULOS_HABILITADOS_POR_DEFECTO,
  );
}

/**
 * Autenticación de administración (`POST /api/auth/login`). No está en el apispec y el
 * apispec no define ningún esquema de seguridad (BE-N04, BE-N09).
 */
export function authHabilitada(): boolean {
  return resolverBandera(import.meta.env.VITE_ADMIN_HABILITADO, MODULOS_HABILITADOS_POR_DEFECTO);
}

/**
 * Envío de consultas (`POST /api/contacto`). No está en el apispec (BE-N04).
 */
export function contactoHabilitado(): boolean {
  return resolverBandera(import.meta.env.VITE_CONTACTO_HABILITADO, MODULOS_HABILITADOS_POR_DEFECTO);
}
