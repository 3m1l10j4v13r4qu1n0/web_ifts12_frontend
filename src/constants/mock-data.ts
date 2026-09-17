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
    descripcionBreve: 'Formación en procedimientos legislativos y gestión parlamentaria.',
    modalidad: 'Presencial',
    horarios: 'Turno nocturno',
  },
  {
    id: 'politicas-culturales',
    nombre: 'Administración y gestión de políticas culturales',
    descripcionBreve: 'Gestión cultural, gestión de proyectos y políticas públicas en cultura.',
    modalidad: 'Presencial',
    horarios: 'Turno nocturno',
  },
  {
    id: 'administracion-publica',
    nombre: 'Administración pública',
    descripcionBreve:
      'Gestión de organismos públicos, políticas públicas y administración estatal.',
    modalidad: 'Presencial',
    horarios: 'Turno nocturno',
  },
  {
    id: 'desarrollo-comunitario',
    nombre: 'Desarrollo comunitario',
    descripcionBreve: 'Intervención social, gestión comunitaria y desarrollo local.',
    modalidad: 'Presencial',
    horarios: 'Turno nocturno',
  },
  {
    id: 'salud-mental',
    nombre: 'Intervención en salud mental comunitaria',
    descripcionBreve: 'Abordaje interdisciplinario de la salud mental en contextos comunitarios.',
    modalidad: 'Presencial',
    horarios: 'Turno nocturno',
  },
  {
    id: 'educacion-popular',
    nombre: 'Educación popular y comunitaria',
    descripcionBreve: 'Metodologías de educación popular, inclusión y mediación cultural.',
    modalidad: 'Presencial',
    horarios: 'Turno nocturno',
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

export const mockFaqs: FaqItem[] = [
  {
    id: 'faq-ing-inscripcion',
    categoria: 'ingresantes',
    pregunta: '¿Cómo me inscribo en una carrera?',
    respuesta:
      'La inscripción se realiza a través del GCBA. Próximamente se publicará el enlace oficial con las fechas y requisitos del proceso de admisión.',
  },
  {
    id: 'faq-ing-equivalencias',
    categoria: 'ingresantes',
    pregunta: '¿Se pueden reconocer estudios previos o equivalencias?',
    respuesta:
      'El instituto evalúa equivalencias y pases desde otros institutos. Consultá en la secretaría académica para conocer el procedimiento vigente.',
  },
  {
    id: 'faq-ing-requisitos',
    categoria: 'ingresantes',
    pregunta: '¿Qué requisitos necesito para anotarme?',
    respuesta:
      'Los requisitos varían según la carrera. Como regla general se requiere título secundario completo. Las condiciones específicas se publicarán al abrirse la inscripción.',
  },
  {
    id: 'faq-est-regularidad',
    categoria: 'estudiantes',
    pregunta: '¿Cómo mantengo mi regularidad?',
    respuesta:
      'La regularidad se mantiene cumpliendo con los requisitos de asistencia y promoción de las materias de cada año. Consultá el reglamento vigente para los porcentajes específicos.',
  },
  {
    id: 'faq-est-constancias',
    categoria: 'estudiantes',
    pregunta: '¿Cómo solicito constancias de cursada o título?',
    respuesta:
      'Las constancias se solicitan en la secretaría del instituto. Próximamente se habilitará el trámite en línea a través del SIU.',
  },
  {
    id: 'faq-est-mesas',
    categoria: 'estudiantes',
    pregunta: '¿Cuándo son las mesas de examen?',
    respuesta:
      'Las mesas de examen se convocan según el calendario académico del instituto. Las fechas se publican en el campus virtual y en la sección de novedades.',
  },
  {
    id: 'faq-doc-concursos',
    categoria: 'docentes',
    pregunta: '¿Cómo accedo a los concursos docentes?',
    respuesta:
      'Los concursos docentes se publican en el sitio oficial del instituto y en los medios que determine la dirección. Los requisitos y plazos se indican en cada convocatoria.',
  },
  {
    id: 'faq-doc-acceso',
    categoria: 'docentes',
    pregunta: '¿Qué accesos tengo como docente del instituto?',
    respuesta:
      'Los docentes cuentan con acceso al campus virtual (Moodle), al SIU para carga de notas y a los recursos de la comunidad docente.',
  },
  {
    id: 'faq-inst-bedeles',
    categoria: 'institucional',
    pregunta: '¿Quiénes son los bedeles y cómo los contacto?',
    respuesta:
      'Los bedeles son el personal de apoyo administrativo del instituto. Podés contactarlos en la sede durante el horario de atención o por correo electrónico (próximamente se publicará el contacto).',
  },
  {
    id: 'faq-inst-siu',
    categoria: 'institucional',
    pregunta: '¿Qué es el SIU?',
    respuesta:
      'El SIU es el Sistema de Gestión Académica utilizado por el instituto para trámites de inscripción, consulta de notas y constancias. El acceso se habilita al iniciar la cursada.',
  },
  {
    id: 'faq-inst-titulos',
    categoria: 'institucional',
    pregunta: '¿Cómo solicito mi título?',
    respuesta:
      'El procedimiento de solicitud de título se realiza una vez aprobadas todas las materias y reunidos los requisitos académicos. La información específica se publicará en esta sección.',
  },
  {
    id: 'faq-inst-traspasos',
    categoria: 'institucional',
    pregunta: '¿Se pueden hacer traspasos desde otros institutos?',
    respuesta:
      'El IFTS N.º 12 recibe traspasos desde otros institutos de formación técnica superior. El procedimiento y los requisitos se detallan en la normativa vigente del instituto.',
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

// Accesos rapidos de la Home segun el Mapa del Sitio V2 (UX/UI): las rutas
// internas siguen el AppRouter; las pendientes de URL oficial quedan vacias.
export const mockAccesosRapidos: AccesoRapido[] = [
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
    id: 'constancias',
    titulo: 'Constancias',
    descripcion: 'Solicitud de constancias de cursada y título.',
    href: ENLACES.constancias,
  },
  {
    id: 'mesas-examen',
    titulo: 'Mesas de examen',
    descripcion: 'Fechas y convocatorias de mesas de examen.',
    href: ENLACES.mesasExamen,
  },
  {
    id: 'calendario',
    titulo: 'Calendario académico',
    descripcion: 'Fechas del ciclo lectivo, vacaciones y eventos.',
    href: ENLACES.calendario,
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
