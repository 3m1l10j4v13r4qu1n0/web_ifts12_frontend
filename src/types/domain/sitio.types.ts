export type FaqCategoria = 'ingresantes' | 'estudiantes' | 'docentes' | 'institucional';

export interface Carrera {
  id: string;
  nombre: string;
  descripcionBreve: string;
  /**
   * Datos oficiales del plan vigente (`CarreraPlanSummary` del apispec). Quedan
   * `undefined` cuando no hay plan activo o el campo viene en `null`: la UI los muestra
   * en "Datos oficiales" de la ficha y degrada a PENDIENTE sin inventar.
   */
  tituloOtorgado?: string;
  duracionAnios?: number;
  resolucion?: string;
  planNombre?: string;
  planCodigo?: string;
}

export interface Noticia {
  id: string;
  titulo: string;
  resumen: string;
  fecha: string;
  /** Categoría del backend (`novedad.categoria`). `undefined` si viene `null`. */
  categoria?: string;
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
