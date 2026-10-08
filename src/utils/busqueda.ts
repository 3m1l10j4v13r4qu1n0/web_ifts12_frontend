import { slugDesdeNovedad } from '../api/mappers/novedad.mapper';
import { mockFaqs } from '../constants/mock-data';
import { MENU_PRINCIPAL } from '../constants/navegacion';
import type { NovedadApi } from '../types/api/novedad.types';
import type { Carrera } from '../types/domain/sitio.types';

export interface ResultadoBusqueda {
  id: string;
  titulo: string;
  descripcion: string;
  categoria: string;
  href: string;
}

/**
 * Colecciones de contenido buscable.
 *
 * Carreras y novedades llegan del backend; las FAQs siguen en mocks. Antes de que las
 * páginas consumieran la API, esto usaba `mockCarreras` y `mockNoticias`: el buscador
 * devolvía "Gestión parlamentaria" con un enlace que las páginas ya no mostraban, porque el
 * backend publica otros nombres. Se pasa el contenido real como argumento para que el
 * buscador no vuelva a quedar desfasado del resto del sitio.
 */
export interface ContenidoBuscable {
  carreras: Carrera[];
  novedades: NovedadApi[];
}

function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

export function buscarContenidoLocal(
  consulta: string,
  { carreras, novedades }: ContenidoBuscable,
): ResultadoBusqueda[] {
  const termino = normalizar(consulta);

  if (termino === '') {
    return [];
  }

  const coincideTexto = (valor: string) => normalizar(valor).includes(termino);
  const resultados: ResultadoBusqueda[] = [];

  for (const item of MENU_PRINCIPAL) {
    if (coincideTexto(item.etiqueta)) {
      resultados.push({
        id: `seccion-${item.href}`,
        titulo: item.etiqueta,
        descripcion: 'Sección del sitio',
        categoria: 'Secciones',
        href: item.href,
      });
    }
  }

  for (const carrera of carreras) {
    if (coincideTexto(carrera.nombre) || coincideTexto(carrera.descripcionBreve)) {
      resultados.push({
        id: `carrera-${carrera.id}`,
        titulo: carrera.nombre,
        descripcion: carrera.descripcionBreve,
        categoria: 'Carreras',
        // Enlace directo a la ficha, no al listado: el slug ya viene resuelto en `carrera.id`.
        href: `/carreras/${carrera.id}`,
      });
    }
  }

  for (const novedad of novedades) {
    if (coincideTexto(novedad.titulo) || coincideNullable(novedad.copete, coincideTexto)) {
      resultados.push({
        id: `novedad-${novedad.id}`,
        titulo: novedad.titulo,
        descripcion: novedad.copete ?? '',
        categoria: 'Novedades',
        href: `/noticias/${slugDesdeNovedad(novedad)}`,
      });
    }
  }

  for (const faq of mockFaqs) {
    if (coincideTexto(faq.pregunta) || coincideTexto(faq.respuesta)) {
      resultados.push({
        id: `faq-${faq.id}`,
        titulo: faq.pregunta,
        descripcion: 'Pregunta frecuente',
        categoria: 'Preguntas frecuentes',
        href: '/faq',
      });
    }
  }

  return resultados.slice(0, 8);
}

/** `copete` es nullable (`models.py:57`), así que hay que tolerar `null` sin romper. */
function coincideNullable(
  valor: string | null,
  coincideTexto: (texto: string) => boolean,
): boolean {
  return valor !== null && coincideTexto(valor);
}
