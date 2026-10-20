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

export const MENU_PRINCIPAL: readonly ItemNavegacion[] = [
  { etiqueta: 'Inicio', href: '/' },
  { etiqueta: 'Carreras', href: '/carreras' },
  { etiqueta: 'Ingresantes', href: '/ingresantes' },
  { etiqueta: 'Estudiantes', href: '/estudiantes' },
  { etiqueta: 'Tutorías', href: '/tutorias' },
  { etiqueta: 'Docentes', href: '/docentes' },
  { etiqueta: 'Institucional', href: '/institucional' },
  { etiqueta: 'Novedades', href: '/noticias' },
  { etiqueta: 'Contacto', href: '/contacto' },
];

// Direccion y horario institucional que muestra la barra superior del header
// (diseno Desktop 1440, export "Avance del diseno del sitio IFTS N.º 12").
export const UBICACION_HEADER = 'Misiones 26, C1083 ABB, CABA · Atención exclusivamente nocturna';

// Accesos directos a plataformas externas en la barra superior del header
// (Mapa del Sitio V2 · RF-03/12/30). Las URLs oficiales son placeholders hasta
// recibirlas de IFTS/Direccion; las rutas vacias se renderizan atenuadas.
export const ACCESOS_EXTERNOS: readonly AccesoExterno[] = [
  { id: 'campus-virtual', etiqueta: 'Campus Virtual Moodle', href: ENLACES.moodle },
  { id: 'siu', etiqueta: 'SIU · Autogestión', href: ENLACES.siu },
  { id: 'inscripcion', etiqueta: 'Inscripción GCBA', href: ENLACES.inscripcion },
];

// Acceso de administracion al panel (RF-23, RN-05): link de texto en la barra
// superior, junto a los accesos externos. Es una ruta interna, no un servicio
// externo, por eso vive aparte de ACCESOS_EXTERNOS (decision 20/10/2026: link
// discreto en la top bar; sigue sin haber icono de persona, regla I12).
export const ACCESO_ADMIN: ItemNavegacion = {
  etiqueta: 'Administración',
  href: '/admin/login',
};

// Columnas del pie de pagina segun el Mapa del Sitio V2 y los wireframes.
export const NAV_FOOTER_MAPA: readonly ItemNavegacion[] = [
  { etiqueta: 'Carreras', href: '/carreras' },
  { etiqueta: 'Ingresantes', href: '/ingresantes' },
  { etiqueta: 'Estudiantes', href: '/estudiantes' },
  { etiqueta: 'Institucional', href: '/institucional' },
  { etiqueta: 'Novedades', href: '/noticias' },
  { etiqueta: 'Contacto', href: '/contacto' },
];

// Servicios del pie: los que tienen href vacio esperan URL oficial o contenido.
export const NAV_FOOTER_SERVICIOS: readonly ItemNavegacion[] = [
  { etiqueta: 'Tutorías', href: '/tutorias' },
  { etiqueta: 'Becas', href: '' },
  { etiqueta: 'Constancias', href: '' },
  { etiqueta: 'Mesas de examen', href: '' },
  { etiqueta: 'Calendario académico', href: '' },
];

export const NAV_FOOTER_PLATAFORMAS: readonly AccesoExterno[] = [
  { id: 'campus', etiqueta: 'Campus Virtual Moodle', href: ENLACES.moodle },
  { id: 'siu', etiqueta: 'SIU · Autogestión', href: ENLACES.siu },
  { id: 'inscripcion-gcba', etiqueta: 'Inscripciones GCBA', href: ENLACES.inscripcion },
];
