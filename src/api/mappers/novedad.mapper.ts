import type { NovedadApi } from '../../types/api/novedad.types';
import type { Noticia } from '../../types/domain/sitio.types';

/**
 * Traduce los DTO de novedades a los tipos de dominio que consume la UI.
 *
 * De nuevo, dos identificadores distintos:
 *
 * - **`id` de la API:** `number` (`models.py:53`). La base real tiene novedades con `id` 1 y 2.
 * - **`id` de dominio:** `string`. Es el slug que aparece en `/noticias/inscripciones-abiertas-para-el-ciclo-lectivo-2026`.
 *   El backend no expone slug, así que se deriva del `titulo`, igual que con las carreras.
 *
 * ⚠️ `GET /api/noticias/:id` **no existe en el backend**. El único endpoint de novedades es
 * el listado (`app.py:79-92`), que además viene ordenado por `fecha_publicacion DESC` de
 * forma fija. Por eso el detalle de una nota se resuelve con la lista completa, no con un
 * endpoint de detalle. Ver DB-14.
 */

/** Deriva el slug de navegación a partir del título de la novedad. */
export function slugDesdeNovedad(novedad: Pick<NovedadApi, 'titulo'>): string {
  return novedad.titulo
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Convierte la fecha del backend a ISO corto (`YYYY-MM-DD`) para el tipo de dominio.
 *
 * El backend serializa con `.isoformat()` (`app.py:90`) y **no lleva sufijo `Z` ni offset**
 * porque usa `datetime.utcnow`, o sea naive UTC. Agregar la `Z` antes de parsear es lo que
 * evita que `new Date()` lo interprete como hora local y corra el día para algunos usuarios.
 *
 * @returns `null` si el backend mandó `null` (la columna es nullable, `models.py:60`).
 */
export function fechaNovedadAIso(fecha: string | null): string | null {
  if (fecha === null || fecha.trim() === '') {
    return null;
  }

  const normalizada = fecha.trim();
  const conZona = /(?:Z|[+-]\d{2}:?\d{2})$/.test(normalizada) ? normalizada : `${normalizada}Z`;

  const instante = new Date(conZona);
  if (Number.isNaN(instante.getTime())) {
    return null;
  }

  return instante.toISOString().slice(0, 10);
}

/**
 * Traduce un `NovedadApi` al tipo de dominio de la UI.
 *
 * Mapeo de nombres, porque el backend usa `snake_case` y nunca camelCase:
 * `copete` → `resumen`, `fecha_publicacion` → `fecha`, `imagen_url` → `imagenUrl`.
 * `categoria` se copia tal cual y queda `undefined` cuando el backend la manda en `null`.
 *
 * `contenido` **no tiene lugar en `Noticia`**: ese tipo es el de las tarjetas y el listado,
 * que muestran `resumen`. El cuerpo completo se lee en la página de detalle, que por eso
 * recibe el `NovedadApi` y no el `Noticia`. Así no se tira contenido.
 */
export function mapNovedadApiANoticia(novedad: NovedadApi): Noticia {
  return {
    id: slugDesdeNovedad(novedad),
    titulo: novedad.titulo,
    resumen: novedad.copete ?? '',
    fecha: fechaNovedadAIso(novedad.fecha_publicacion) ?? '',
    categoria: novedad.categoria ?? undefined,
    imagenUrl: novedad.imagen_url ?? undefined,
    enlace: undefined,
  };
}

/** Traduce la lista completa del endpoint. */
export function mapNovedadesApiANoticias(novedades: NovedadApi[]): Noticia[] {
  return novedades.map(mapNovedadApiANoticia);
}

/**
 * Resuelve el `:id` de la URL contra la lista completa.
 *
 * Acepta el slug que generan los enlaces del sitio y, por tolerancia, también el `id`
 * numérico de la API como string.
 */
export function buscarNovedadPorSlug(
  novedades: NovedadApi[],
  slug: string,
): NovedadApi | undefined {
  const buscado = slug.trim().toLowerCase();
  return novedades.find((novedad) => {
    if (slugDesdeNovedad(novedad).toLowerCase() === buscado) {
      return true;
    }
    return String(novedad.id) === buscado;
  });
}
