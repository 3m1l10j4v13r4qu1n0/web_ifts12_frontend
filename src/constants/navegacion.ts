export interface ItemNavegacion {
  etiqueta: string;
  href: string;
}

// Menu principal: maximo 5 items segun reglas de navegacion. El logo enlaza a la
// home, por eso no se incluye el item "Inicio".
export const MENU_PRINCIPAL: readonly ItemNavegacion[] = [
  { etiqueta: 'Carreras', href: '/carreras' },
  { etiqueta: 'Ingresantes', href: '/ingresantes' },
  { etiqueta: 'Estudiantes', href: '/estudiantes' },
  { etiqueta: 'Docentes', href: '/docentes' },
  { etiqueta: 'Noticias', href: '/noticias' },
];

// Enlaces complementarios del pie de pagina.
export const NAV_FOOTER: readonly ItemNavegacion[] = [
  { etiqueta: 'Institucional', href: '/institucional' },
  { etiqueta: 'Tutorías', href: '/tutorias' },
  { etiqueta: 'Preguntas frecuentes', href: '/faq' },
  { etiqueta: 'Contacto', href: '/contacto' },
];
