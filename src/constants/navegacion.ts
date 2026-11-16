import { ENLACES } from './enlaces';

export interface ItemNavegacion {
  etiqueta: string;
  href: string;
}

export interface AccesoExterno {
  id: string;
  etiqueta: string;
  href: string;
}

// Menú principal del Mapa del Sitio V3 (RN-14): 7 pestañas en este orden.
// Docentes, Novedades y Contacto no son pestañas (V3 §9): Novedades y Contacto
// siguen accesibles desde el pie y Docentes conserva su ruta sin enlace en el
// menú hasta que responda el ticket 0000099. Las rutas no migran (V3 §15):
// /institucional, /estudiantes y /tutorias siguen respondiendo.
export const MENU_PRINCIPAL: readonly ItemNavegacion[] = [
  { etiqueta: 'Inicio', href: '/' },
  { etiqueta: 'Instituto', href: '/institucional' },
  { etiqueta: 'Carreras', href: '/carreras' },
  { etiqueta: 'Ingresantes', href: '/ingresantes' },
  { etiqueta: 'Alumnos', href: '/estudiantes' },
  { etiqueta: 'Tutoría', href: '/tutorias' },
  { etiqueta: 'FAQ', href: '/faq' },
];

// Datos institucionales validados por el instituto (devolución de Edith §11; RN-07):
// domicilio y dos franjas de atención. Reemplazan "Atención exclusivamente nocturna".
export const DIRECCION_INSTITUTO = 'Misiones 26, C1083 ABB, CABA';
export const HORARIO_ATENCION = 'lunes a viernes de 9:00 a 13:00 y de 18:30 a 22:30';

// Dirección y horario institucional que muestra la barra superior del header.
export const UBICACION_HEADER = `${DIRECCION_INSTITUTO} · ${HORARIO_ATENCION}`;

// Accesos directos a plataformas externas en la barra superior del header
// (Mapa del Sitio V3 §1: el buscador y los 3 accesos se mantienen). Las URLs
// oficiales son placeholders hasta recibirlas de IFTS/Direccion; las rutas
// vacías se renderizan atenuadas.
export const ACCESOS_EXTERNOS: readonly AccesoExterno[] = [
  { id: 'campus-virtual', etiqueta: 'Campus Virtual Moodle', href: ENLACES.moodle },
  { id: 'siu', etiqueta: 'SIU · Autogestión', href: ENLACES.siu },
  { id: 'inscripcion', etiqueta: 'Inscripción GCBA', href: ENLACES.inscripcion },
];

// Secciones que el buscador global indexa. No es el menú: incluye las páginas que
// siguen publicadas aunque no sean pestaña (Docentes, Novedades y Contacto), para
// que se puedan encontrar por búsqueda mientras se define su ubicación (V3 §9).
export const SECCIONES_BUSCABLES: readonly ItemNavegacion[] = [
  ...MENU_PRINCIPAL,
  { etiqueta: 'Docentes', href: '/docentes' },
  { etiqueta: 'Novedades', href: '/noticias' },
  { etiqueta: 'Contacto', href: '/contacto' },
];

// Columnas del pie de página según el Mapa del Sitio V3 §10. El pie conserva a mano
// Novedades y Contacto (sus páginas siguen publicadas hasta que responda el ticket
// 0000099) y suma Tutoría, que deja de estar en Servicios.
export const NAV_FOOTER_MAPA: readonly ItemNavegacion[] = [
  { etiqueta: 'Instituto', href: '/institucional' },
  { etiqueta: 'Carreras', href: '/carreras' },
  { etiqueta: 'Ingresantes', href: '/ingresantes' },
  { etiqueta: 'Alumnos', href: '/estudiantes' },
  { etiqueta: 'Tutoría', href: '/tutorias' },
  { etiqueta: 'Preguntas frecuentes', href: '/faq' },
  { etiqueta: 'Novedades', href: '/noticias' },
  { etiqueta: 'Contacto', href: '/contacto' },
];

// Servicios del pie: los que tienen href vacío esperan URL oficial o contenido.
// Becas y Mesas de examen dejan de ser secciones propias (V3 §10); Becas, Boleto y
// el Trámite de títulos quedan en ⏳ (V3 §6).
export const NAV_FOOTER_SERVICIOS: readonly ItemNavegacion[] = [
  { etiqueta: 'Constancias', href: '' },
  { etiqueta: 'Calendario académico', href: '' },
];

export const NAV_FOOTER_PLATAFORMAS: readonly AccesoExterno[] = [
  { id: 'campus', etiqueta: 'Campus Virtual Moodle', href: ENLACES.moodle },
  { id: 'siu', etiqueta: 'SIU · Autogestión', href: ENLACES.siu },
  { id: 'inscripcion-gcba', etiqueta: 'Inscripciones GCBA', href: ENLACES.inscripcion },
];
