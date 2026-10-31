export type RecursoAdmin =
  | 'carreras'
  | 'planes-estudio'
  | 'materias'
  | 'docentes'
  | 'planes-materias'
  | 'docentes-materias';
export interface RegistroAdmin {
  id?: number;
  docente_id?: number;
  materia_id?: number;
  [campo: string]: unknown;
}
export type ValoresAdmin = Record<string, string | number | boolean | null>;
export interface CampoAdmin {
  clave: string;
  etiqueta: string;
  tipo?: 'text' | 'textarea' | 'number' | 'date' | 'email' | 'url' | 'boolean';
  requerido?: boolean;
  referencia?: RecursoAdmin;
  maxLength?: number;
  max?: number;
}
export interface SeccionAdmin {
  id: RecursoAdmin;
  etiqueta: string;
  campos: CampoAdmin[];
  estado?: 'activa' | 'activo';
}
