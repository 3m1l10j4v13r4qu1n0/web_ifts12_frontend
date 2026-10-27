import type { CarreraApi, CarreraPlanSummaryApi } from '../../types/api/carrera.types';
import type { Carrera } from '../../types/domain/sitio.types';

/**
 * Traduce los DTO de la API a los tipos de dominio que consume la UI.
 *
 * Son dos identificadores con propósitos distintos y **no se deben confundir**:
 *
 * - **`id` de la API:** `number` (`int64`). Es la primary key de `carreras`.
 * - **`id` de dominio:** `string`. Es el **slug de navegación**, el que aparece en la URL
 *   (`/carreras/administracion-y-gestion-de-politicas-culturales`). Lo deriva este mapper
 *   del `nombre`, porque el backend no expone slug.
 *
 * La razón para mantener el slug es que las URLs del sitio ya son legibles y están
 * linkeadas; cambiar `/carreras/gestion-parlamentaria` por `/carreras/1` sería una
 * regresión de usabilidad. El detalle se resuelve contra la lista completa (todas las
 * páginas), no contra el endpoint de detalle, para no depender de la página cargada.
 */

const GENERICOS_INICIO = /^tecnicatura (superior )?(en|de) /;

const fechaOrdenable = (fecha: string | null): number => {
  if (fecha === null) return 0;
  const tiempo = Date.parse(`${fecha}T12:00:00`);
  return Number.isNaN(tiempo) ? 0 : tiempo;
};

/**
 * Deriva el slug de navegación a partir del nombre de la carrera.
 *
 * "Tecnicatura Superior en Administración y Gestión de Políticas Culturales" se vuelve
 * `administracion-y-gestion-de-politicas-culturales`: se quitan los términos genéricos
 * ("Tecnicatura Superior en") que no aportan a distinguir una carrera de otra.
 */
export function slugDesdeCarrera(carrera: Pick<CarreraApi, 'nombre'>): string {
  return carrera.nombre
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(GENERICOS_INICIO, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Elige el plan vigente de una carrera.
 *
 * Regla provisoria hasta que Análisis/Backend la confirmen (BE-N08):
 * 1. Planes `activo` y sin `vigente_hasta` (o con fecha de fin futura).
 * 2. Si no hay, planes `activo` aunque tengan fecha de fin.
 * 3. Entre los candidatos, el `vigente_desde` más reciente y, como desempate, el `id` más alto.
 *
 * Un plan con `vigente_hasta` vencido no se considera vigente. Si no hay ningún plan
 * activo, devuelve `undefined` y la ficha muestra PENDIENTE sin inventar datos.
 */
export function planVigente(
  planes: CarreraPlanSummaryApi[],
  hoy: string = new Date().toISOString().slice(0, 10),
): CarreraPlanSummaryApi | undefined {
  const abiertos = planes.filter(
    (plan) => plan.activo && (plan.vigente_hasta === null || plan.vigente_hasta >= hoy),
  );
  const candidatos = abiertos.length > 0 ? abiertos : planes.filter((plan) => plan.activo);

  return [...candidatos].sort((a, b) => {
    const diferencia = fechaOrdenable(b.vigente_desde) - fechaOrdenable(a.vigente_desde);
    return diferencia !== 0 ? diferencia : b.id - a.id;
  })[0];
}

/**
 * Traduce un `CarreraApi` al tipo de dominio de la UI.
 *
 * `modalidad` y `horarios` ya no existen en el contrato: el apispec no tiene esos campos
 * (BE-N02). La UI los muestra como PENDIENTE con mensaje de proceso, no se inventan.
 *
 * `duracionAnios` y `resolucion` se leen del **plan vigente**, no de la raíz. Si no hay
 * plan o el campo viene en `null`, quedan `undefined` y la ficha degrada a PENDIENTE.
 *
 * `descripcionBreve` recibe el `descripcion` del backend, que es un `Text` completo.
 */
export function mapCarreraApiACarrera(carrera: CarreraApi): Carrera {
  const plan = planVigente(carrera.planes);

  return {
    id: slugDesdeCarrera(carrera),
    nombre: carrera.nombre,
    descripcionBreve: carrera.descripcion ?? '',
    tituloOtorgado: carrera.titulo_otorgado ?? undefined,
    duracionAnios: plan?.duracion_anios ?? undefined,
    resolucion: plan?.resolucion ?? undefined,
    planNombre: plan?.nombre ?? undefined,
    planCodigo: plan?.codigo ?? undefined,
  };
}

/** Traduce la lista completa del endpoint. */
export function mapCarrerasApiACarreras(carreras: CarreraApi[]): Carrera[] {
  return carreras.map(mapCarreraApiACarrera);
}

/**
 * Resuelve el `:id` de la URL contra la lista completa.
 *
 * Acepta el slug que generan los enlaces del sitio y es tolerante a diferencias de
 * mayúsculas y espacios, porque el `:id` puede venir escrito a mano.
 */
export function buscarCarreraPorSlug(carreras: Carrera[], slug: string): Carrera | undefined {
  const buscado = slug.trim().toLowerCase();
  return carreras.find((carrera) => carrera.id.toLowerCase() === buscado);
}
