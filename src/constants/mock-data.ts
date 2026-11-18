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

// Preguntas del export `10 · Preguntas frecuentes (segmentada)` y de la devolución de Edith §5 y
// §6 (Mapa del Sitio V3). Se publican solo las respuestas con contenido validado; lo que el
// instituto todavía no confirmó queda con el mensaje de proceso `RESPUESTA_PENDIENTE` y no se
// redacta por cuenta propia. Las FAQ institucionales no tienen tab en el diseño (quedan
// accesibles solo desde el buscador global del header).
export const RESPUESTA_PENDIENTE = 'Respuesta oficial pendiente de validación institucional.';

/** Escala de turnos validada por el instituto (devolución de Edith §4 y §6). */
const TURNOS_CURSADA =
  'Los turnos son vespertino, de 18:30 a 22:30, y matutino, de 9:00 a 13:00; el turno de cada carrera se indica en su ficha.';

export const mockFaqs: FaqItem[] = [
  // Ingresantes (V3 §5). Los requisitos y la preinscripción se explican en la propia sección:
  // acá quedan las preguntas que dependen de contenido institucional pendiente.
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
    id: 'faq-ing-titulos',
    categoria: 'ingresantes',
    pregunta: '¿Los títulos tienen validez nacional?',
    respuesta: RESPUESTA_PENDIENTE,
  },
  // Alumnos (V3 §6): las diez preguntas de la devolución de Edith, en su orden, más el acceso al
  // campus y las equivalencias (que Edith ubica en Alumnos sin respuesta oficial nueva).
  {
    id: 'faq-est-inscripcion-materias',
    categoria: 'estudiantes',
    pregunta: '¿Cómo me inscribo a las materias?',
    respuesta: RESPUESTA_PENDIENTE,
  },
  {
    id: 'faq-est-correlativas',
    categoria: 'estudiantes',
    pregunta: '¿Qué son las correlativas y dónde las consulto?',
    respuesta:
      'El plan de estudios de cada carrera detalla el régimen de correlatividades de sus asignaturas. Podés consultarlo en la ficha de la carrera, en la sección Plan de estudios.',
  },
  {
    id: 'faq-est-inscripcion-finales',
    categoria: 'estudiantes',
    pregunta: '¿Cómo me inscribo a los finales?',
    respuesta:
      'Las inscripciones se gestionan exclusivamente por SIU-Guaraní, dentro de los períodos establecidos por el calendario académico. Conservá tu constancia de inscripción. Las materias de las tecnicaturas del instituto no se pueden rendir en condición de libre.',
  },
  {
    id: 'faq-est-constancia-examen',
    categoria: 'estudiantes',
    pregunta: '¿Cómo solicito la constancia de examen?',
    respuesta: RESPUESTA_PENDIENTE,
  },
  {
    id: 'faq-est-constancia-regular',
    categoria: 'estudiantes',
    pregunta: '¿Cómo obtengo la constancia de alumno regular?',
    respuesta: RESPUESTA_PENDIENTE,
  },
  {
    id: 'faq-est-pase',
    categoria: 'estudiantes',
    pregunta: '¿Cómo hago un pase a otro IFTS?',
    respuesta: RESPUESTA_PENDIENTE,
  },
  {
    id: 'faq-est-bedelia',
    categoria: 'estudiantes',
    pregunta: '¿A qué correo escribo para contactar a Bedelía?',
    respuesta: RESPUESTA_PENDIENTE,
  },
  {
    id: 'faq-est-regularidad',
    categoria: 'estudiantes',
    pregunta: '¿Cómo mantengo la condición de regularidad?',
    respuesta:
      'Se exige un mínimo del 75% de asistencia a las clases presenciales y sincrónicas, y la aprobación de los trabajos integradores o parciales con nota 4 o superior para regularizar, o 7 o superior para promocionar, según la materia.',
  },
  {
    id: 'faq-est-horarios',
    categoria: 'estudiantes',
    pregunta: '¿Cuáles son los horarios y la modalidad de cursada?',
    respuesta: `${TURNOS_CURSADA} La modalidad es híbrida: clases presenciales y virtuales, sincrónicas o asincrónicas en el campus.`,
  },
  {
    id: 'faq-est-docentes',
    categoria: 'estudiantes',
    pregunta: '¿Cómo contacto a los docentes?',
    respuesta:
      'Podés comunicarte con tus docentes por la mensajería y los foros del Campus Virtual.',
  },
  {
    id: 'faq-est-campus',
    categoria: 'estudiantes',
    pregunta: '¿Cómo accedo al Campus Virtual?',
    respuesta:
      'Para acceder al contenido de las asignaturas en las que te inscribiste, ingresá al Moodle del instituto: https://ifts12online.com.ar/login/index.php',
  },
  {
    id: 'faq-est-equivalencias',
    categoria: 'estudiantes',
    pregunta: '¿Puedo presentar equivalencias?',
    respuesta:
      'Debés contar con el programa de la materia aprobada y la constancia de materias aprobadas de la institución de origen. Para iniciar el trámite, escribí a equivalencias.ifts12@gmail.com.',
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
    respuesta:
      'SIU Guaraní es el sistema de autogestión académica. Permite inscribirte a las cursadas y a las mesas de exámenes, consultar tu historia académica y revisar el avance del plan de estudios. Acceso: https://guarani-autogestionagencia.bue.edu.ar/.',
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
    descripcion: 'Aula virtual del instituto',
    href: ENLACES.moodle,
  },
  {
    id: 'siu',
    titulo: 'SIU · Autogestión',
    descripcion: 'Sistema de autogestión académica',
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
