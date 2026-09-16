export interface ItemNavegacion {
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

export const NAV_FOOTER: readonly ItemNavegacion[] = [
  { etiqueta: 'Preguntas frecuentes', href: '/faq' },
];
