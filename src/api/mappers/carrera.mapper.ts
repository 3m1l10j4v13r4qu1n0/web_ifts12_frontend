import type { CarreraApi } from '../../types/api/carrera.types';
import type { Carrera } from '../../types/domain/sitio.types';

/**
 * Traduce los DTO de la API a los tipos de dominio que consume la UI.
 *
 * Son dos identificadores con propósitos distintos y **no se deben confundir**:
 *
 * - **`id` de la API:** `number`. Es `db.Integer` primary key (`models.py:28`). Verificado:
 *   la base real tiene 3 carreras con `id` 1, 2, 3. Nunca es string.
 * - **`id` de dominio:** `string`. Es el **slug de navegación**, el que aparece en la URL
 *   (`/carreras/administracion-y-gestion-de-politicas-culturales`). Lo deriva este mapper
 *   del `nombre`, porque el backend no expone ningún slug.
 *
 * La razón para mantener el slug es que las URLs del sitio ya son legibles y están
 * linkeadas; cambiar `/carreras/gestion-parlamentaria` por `/carreras/1` sería una
 * regresión de usabilidad. El detalle de carrera se resuelve con la lista completa, no
 * con un endpoint de detalle, porque **`GET /api/carreras/:id` no existe en el backend**
 * (solo figura en el archivo muerto `routes.py:61`, con `<int:carrera_id>`). Ver DB-14.
 */

const GENERICOS_INICIO = /^tecnicatura (superior )?(en|de) /;

/**
 * Deriva el slug de navegación a partir del nombre de la carrera.
 *
 * "Tecnicatura Superior en Administración y Gestión de Políticas Culturales" se vuelve
 * `administracion-y-gestion-de-politicas-culturales`: se quitan los términos genéricos
 * ("Tecnicatura Superior en") que no aportan a distinguir una carrera de otra, porque el
 * `nombre` del backend es siempre un título completo y los slugs anteriores del sitio eran
 * nombres cortos.
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
 * Traduce un `CarreraApi` al tipo de dominio de la UI.
 *
 * `horarios` queda `undefined` a propósito: **el backend no lo expone**. Existe una tabla
 * `horario` en su Postgres de diseño, sin modelo Flask ni ruta, así que no hay de dónde
 * sacarlo y rellenarlo sería inventar (regla anti-alucinación). La UI ya trata el campo
 * como opcional en `CardCarrera`.
 *
 * `descripcionBreve` recibe el `descripcion` del backend, que es un `Text` completo
 * (`models.py:32`). Es el mejor texto disponible; el nombre "breve" es histórico.
 */
export function mapCarreraApiACarrera(carrera: CarreraApi): Carrera {
  return {
    id: slugDesdeCarrera(carrera),
    nombre: carrera.nombre,
    descripcionBreve: carrera.descripcion ?? '',
    modalidad: carrera.modalidad ?? '',
    horarios: undefined,
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
