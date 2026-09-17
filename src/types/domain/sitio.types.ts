export type FaqCategoria = 'ingresantes' | 'estudiantes' | 'docentes' | 'institucional';

export interface Carrera {
  id: string;
  nombre: string;
  descripcionBreve: string;
  modalidad: string;
  horarios?: string;
}

export interface Noticia {
  id: string;
  titulo: string;
  resumen: string;
  fecha: string;
  imagenUrl?: string;
  enlace?: string;
}

export interface FaqItem {
  id: string;
  categoria: FaqCategoria;
  pregunta: string;
  respuesta: string;
}

export interface AccesoRapido {
  id: string;
  titulo: string;
  descripcion: string;
  href: string;
}

export interface Comunidad {
  id: string;
  titulo: string;
  descripcion: string;
  href: string;
}
