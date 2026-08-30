// Datos PROVISORIOS para construir la Home navegable mientras Análisis/Backend
// validan los contenidos oficiales. No usar estos textos como contenido
// institucional definitivo: las descripciones y respuestas son marcadas como
// pendientes de validacion hasta recibir la minuta V2 y el Drive del IFTS.

import type {
  AccesoRapido,
  Carrera,
  Comunidad,
  FaqItem,
  Noticia,
} from '../types/domain/sitio.types';
import { ENLACES } from './enlaces';

// Carreras mencionadas en la minuta de relevamiento del 27/08/2026. El listado
// completo queda pendiente de validacion por Análisis/UX.
export const mockCarreras: Carrera[] = [
  {
    id: 'gestion-parlamentaria',
    nombre: 'Gestión parlamentaria',
    descripcionBreve: 'Descripción oficial pendiente de validación.',
  },
  {
    id: 'politicas-culturales',
    nombre: 'Administración y gestión de políticas culturales',
    descripcionBreve: 'Descripción oficial pendiente de validación.',
  },
  {
    id: 'administracion-publica',
    nombre: 'Administración pública',
    descripcionBreve: 'Descripción oficial pendiente de validación.',
  },
];

// Novedades con contenido marcado como provisorio hasta recibir textos y fotos
// oficiales del instituto.
export const mockNoticias: Noticia[] = [
  {
    id: 'novedad-1',
    titulo: 'Novedad pendiente de validación',
    resumen: 'El contenido oficial de esta novedad se publicará cuando el instituto lo confirme.',
    fecha: '',
  },
  {
    id: 'novedad-2',
    titulo: 'Novedad pendiente de validación',
    resumen: 'El contenido oficial de esta novedad se publicará cuando el instituto lo confirme.',
    fecha: '',
  },
  {
    id: 'novedad-3',
    titulo: 'Novedad pendiente de validación',
    resumen: 'El contenido oficial de esta novedad se publicará cuando el instituto lo confirme.',
    fecha: '',
  },
];

export const mockFaqs: FaqItem[] = [
  {
    id: 'faq-ingresantes',
    categoria: 'ingresantes',
    pregunta: 'Pregunta para ingresantes pendiente de validación',
    respuesta: 'La respuesta oficial se completará cuando Análisis valide los contenidos.',
  },
  {
    id: 'faq-estudiantes',
    categoria: 'estudiantes',
    pregunta: 'Pregunta para estudiantes pendiente de validación',
    respuesta: 'La respuesta oficial se completará cuando Análisis valide los contenidos.',
  },
  {
    id: 'faq-docentes',
    categoria: 'docentes',
    pregunta: 'Pregunta para docentes pendiente de validación',
    respuesta: 'La respuesta oficial se completará cuando Análisis valide los contenidos.',
  },
];

// Accesos rapidos solicitados en la minuta. Campus virtual toma la URL oficial
// de Moodle cuando este disponible (ENLACES.moodle). Las rutas internas siguen
// el mapa del sitio del AppRouter; las pendientes quedan vacias.
export const mockAccesosRapidos: AccesoRapido[] = [
  {
    id: 'preguntas-frecuentes',
    titulo: 'Preguntas frecuentes',
    descripcion: 'Respuestas sobre ingreso, cursada y trámites.',
    href: '/faq',
  },
  {
    id: 'campus-virtual',
    titulo: 'Campus virtual',
    descripcion: 'Acceso al aula virtual del instituto.',
    href: ENLACES.moodle,
  },
  {
    id: 'tutorias',
    titulo: 'Tutorías',
    descripcion: 'Acompañamiento y orientación para estudiantes.',
    href: '/tutorias',
  },
  {
    id: 'becas',
    titulo: 'Becas',
    descripcion: 'Información sobre requisitos y solicitud de becas.',
    href: '',
  },
  {
    id: 'carreras',
    titulo: 'Carreras',
    descripcion: 'Ofertas académicas del instituto.',
    href: '/carreras',
  },
  {
    id: 'contacto',
    titulo: 'Contacto',
    descripcion: 'Vías de contacto con el instituto.',
    href: '/contacto',
  },
];

// Bloques comunidad visibles en la Home segun la minuta.
export const mockComunidades: Comunidad[] = [
  {
    id: 'tutoria',
    titulo: 'Comunidad de tutoría',
    descripcion: 'Espacio de acompañamiento para estudiantes.',
    href: '/tutorias',
  },
  {
    id: 'alumnos',
    titulo: 'Comunidad de alumnos',
    descripcion: 'Servicios y novedades para estudiantes cursantes.',
    href: '/estudiantes',
  },
  {
    id: 'docentes',
    titulo: 'Comunidad docente',
    descripcion: 'Recursos y novedades para el equipo docente.',
    href: '/docentes',
  },
];
