// Datos PROVISORIOS para construir la Home navegable mientras Análisis/Backend
// validan los contenidos oficiales. No usar estos textos como contenido
// institucional definitivo: las descripciones y respuestas son marcadas como
// pendientes de validacion hasta recibir la minuta V2 y el Drive del IFTS.

import type { AccesoRapido, Carrera, FaqItem, Noticia } from '../types/domain/sitio.types';
import { ENLACES } from './enlaces';

// Carreras mencionadas en la minuta de relevamiento del 27/08/2026. El listado
// completo queda pendiente de validacion por Análisis/UX.
export const mockCarreras: Carrera[] = [
  {
    id: 'gestion-parlamentaria',
    nombre: 'Gestión parlamentaria',
    descripcionBreve: 'Formación en procedimientos legislativos y gestión parlamentaria.',
  },
  {
    id: 'politicas-culturales',
    nombre: 'Administración y gestión de políticas culturales',
    descripcionBreve: 'Gestión cultural, gestión de proyectos y políticas públicas en cultura.',
  },
  {
    id: 'administracion-publica',
    nombre: 'Administración pública',
    descripcionBreve:
      'Gestión de organismos públicos, políticas públicas y administración estatal.',
  },
  {
    id: 'desarrollo-comunitario',
    nombre: 'Desarrollo comunitario',
    descripcionBreve: 'Intervención social, gestión comunitaria y desarrollo local.',
  },
  {
    id: 'salud-mental',
    nombre: 'Intervención en salud mental comunitaria',
    descripcionBreve: 'Abordaje interdisciplinario de la salud mental en contextos comunitarios.',
  },
  {
    id: 'educacion-popular',
    nombre: 'Educación popular y comunitaria',
    descripcionBreve: 'Metodologías de educación popular, inclusión y mediación cultural.',
  },
];

// Novedades con fechas provisorias para validar ordenamiento reciente→antigua
// y visualización del último mes. Contenido pendiente de confirmación institucional.
export const mockNoticias: Noticia[] = [
  {
    id: 'novedad-1',
    titulo: 'Inicio del ciclo lectivo 2026',
    resumen:
      'El instituto informa las fechas de inicio y los requisitos para el ciclo lectivo 2026.',
    fecha: '2026-09-01',
  },
  {
    id: 'novedad-2',
    titulo: 'Inscripción a mesas de examen',
    resumen: 'Se habilita la inscripción a las mesas de examen del segundo semestre.',
    fecha: '2026-08-15',
  },
  {
    id: 'novedad-3',
    titulo: 'Jornada de puertas abiertas',
    resumen: 'El instituto realiza una jornada de puertas abiertas para futuros ingresantes.',
    fecha: '2026-07-20',
  },
];

// Preguntas del export `10 · Preguntas frecuentes (segmentada)`, segmento Ingresantes, más las
// 4 de estudiantes del export `04 · Estudiantes`. Las respuestas oficiales están PENDIENTES (las
// carga Análisis Funcional; no inventar): se reemplazan por el mensaje de proceso
// `RESPUESTA_PENDIENTE`. Las FAQ institucionales no tienen tab en el diseño (quedan accesibles
// solo desde el buscador global del header).
const RESPUESTA_PENDIENTE = 'Respuesta oficial pendiente de validación institucional.';

export const mockFaqs: FaqItem[] = [
  {
    id: 'faq-ing-carreras',
    categoria: 'ingresantes',
    pregunta: '¿Qué carreras ofrece el instituto?',
    respuesta: RESPUESTA_PENDIENTE,
  },
  {
    id: 'faq-ing-inscripcion',
    categoria: 'ingresantes',
    pregunta: '¿Cuándo es el período de inscripción?',
    respuesta: RESPUESTA_PENDIENTE,
  },
  {
    id: 'faq-ing-equivalencias',
    categoria: 'ingresantes',
    pregunta: '¿Puedo presentar equivalencias?',
    respuesta: RESPUESTA_PENDIENTE,
  },
  {
    id: 'faq-ing-pase',
    categoria: 'ingresantes',
    pregunta: '¿Cómo hago un pase o cambio de carrera?',
    respuesta: RESPUESTA_PENDIENTE,
  },
  {
    id: 'faq-ing-modalidad',
    categoria: 'ingresantes',
    pregunta: '¿Cuál es la modalidad y el horario de las carreras?',
    respuesta: RESPUESTA_PENDIENTE,
  },
  {
    id: 'faq-est-regularidad',
    categoria: 'estudiantes',
    pregunta: '¿Cómo mantengo la condición de regularidad?',
    respuesta: RESPUESTA_PENDIENTE,
  },
  {
    id: 'faq-est-constancia',
    categoria: 'estudiantes',
    pregunta: '¿Dónde solicito una constancia?',
    respuesta: RESPUESTA_PENDIENTE,
  },
  {
    id: 'faq-est-mesa',
    categoria: 'estudiantes',
    pregunta: '¿Cómo me presento a una mesa de examen?',
    respuesta: RESPUESTA_PENDIENTE,
  },
  {
    id: 'faq-est-campus',
    categoria: 'estudiantes',
    pregunta: '¿Cómo accedo al Campus Virtual?',
    respuesta: RESPUESTA_PENDIENTE,
  },
  {
    id: 'faq-inst-bedeles',
    categoria: 'institucional',
    pregunta: '¿Quiénes son los bedeles y cómo los contacto?',
    respuesta: RESPUESTA_PENDIENTE,
  },
  {
    id: 'faq-inst-siu',
    categoria: 'institucional',
    pregunta: '¿Qué es el SIU?',
    respuesta: RESPUESTA_PENDIENTE,
  },
  {
    id: 'faq-inst-titulos',
    categoria: 'institucional',
    pregunta: '¿Cómo solicito mi título?',
    respuesta: RESPUESTA_PENDIENTE,
  },
  {
    id: 'faq-inst-traspasos',
    categoria: 'institucional',
    pregunta: '¿Se pueden hacer traspasos desde otros institutos?',
    respuesta: RESPUESTA_PENDIENTE,
  },
];

// Accesos destacados de la Home segun el Mapa del Sitio V2 (UX/UI): Campus
// Virtual Moodle, Inscripcion oficial y Carreras. Las dos primeras usan la URL
// oficial cuando exista; quedan deshabilitadas mientras sea placeholder.
export const mockAccesosDestacados: AccesoRapido[] = [
  {
    id: 'campus-virtual',
    titulo: 'Campus virtual',
    descripcion: 'Acceso al aula virtual y a la cursada.',
    href: ENLACES.moodle,
  },
  {
    id: 'inscripcion',
    titulo: 'Inscripción oficial',
    descripcion: 'Inscripción a carreras a través del GCBA.',
    href: ENLACES.inscripcion,
  },
  {
    id: 'carreras',
    titulo: 'Carreras',
    descripcion: 'Oferta académica del instituto.',
    href: '/carreras',
  },
];

// Accesos rapidos de la Home segun el diseno Desktop 1440 (7 accesos confirmados
// por Analisis Funcional): Moodle, SIU, Inscripcion GCBA, Becas, Constancias,
// Mesas de examen y Calendario academico. Las descripciones son las del diseno;
// las rutas pendientes de URL oficial quedan vacias.
export const mockAccesosRapidos: AccesoRapido[] = [
  {
    id: 'campus-virtual',
    titulo: 'Campus Virtual Moodle',
    descripcion: 'Externo · URL PENDIENTE',
    href: ENLACES.moodle,
  },
  {
    id: 'siu',
    titulo: 'SIU · Autogestión',
    descripcion: 'Externo · nombre y URL a confirmar',
    href: ENLACES.siu,
  },
  {
    id: 'inscripcion',
    titulo: 'Inscripción GCBA',
    descripcion: 'Externo · URL PENDIENTE',
    href: ENLACES.inscripcion,
  },
  {
    id: 'becas',
    titulo: 'Becas',
    descripcion: 'Estudiantes › Becas',
    href: '',
  },
  {
    id: 'constancias',
    titulo: 'Constancias',
    descripcion: 'Estudiantes › Constancias',
    href: ENLACES.constancias,
  },
  {
    id: 'mesas-examen',
    titulo: 'Mesas de examen',
    descripcion: 'Estudiantes › Mesas',
    href: ENLACES.mesasExamen,
  },
  {
    id: 'calendario',
    titulo: 'Calendario académico',
    descripcion: 'Estudiantes › Calendario',
    href: ENLACES.calendario,
  },
];
