import { mockCarreras, mockFaqs, mockNoticias } from '../constants/mock-data';
import { MENU_PRINCIPAL } from '../constants/navegacion';

export interface ResultadoBusqueda {
  id: string;
  titulo: string;
  descripcion: string;
  categoria: string;
  href: string;
}

function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

export function buscarContenidoLocal(consulta: string): ResultadoBusqueda[] {
  const termino = normalizar(consulta);

  if (termino === '') {
    return [];
  }

  const coinciden = (valor: string) => normalizar(valor).includes(termino);
  const resultados: ResultadoBusqueda[] = [];

  for (const item of MENU_PRINCIPAL) {
    if (coinciden(item.etiqueta)) {
      resultados.push({
        id: `seccion-${item.href}`,
        titulo: item.etiqueta,
        descripcion: 'Sección del sitio',
        categoria: 'Secciones',
        href: item.href,
      });
    }
  }

  for (const carrera of mockCarreras) {
    if (coinciden(carrera.nombre) || coinciden(carrera.descripcionBreve)) {
      resultados.push({
        id: `carrera-${carrera.id}`,
        titulo: carrera.nombre,
        descripcion: carrera.descripcionBreve,
        categoria: 'Carreras',
        href: '/carreras',
      });
    }
  }

  for (const noticia of mockNoticias) {
    if (coinciden(noticia.titulo) || coinciden(noticia.resumen)) {
      resultados.push({
        id: `noticia-${noticia.id}`,
        titulo: noticia.titulo,
        descripcion: noticia.resumen,
        categoria: 'Novedades',
        href: '/noticias',
      });
    }
  }

  for (const faq of mockFaqs) {
    if (coinciden(faq.pregunta) || coinciden(faq.respuesta)) {
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
