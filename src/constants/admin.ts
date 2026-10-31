import type { SeccionAdmin } from '../types/api/admin.types';

// Campos verificados contra CARRERA_FIELDS y los *_FIELDS de apps/academic/routes.py.
export const SECCIONES_ADMIN: SeccionAdmin[] = [
  {
    id: 'carreras',
    etiqueta: 'Carreras',
    estado: 'activa',
    campos: [
      { clave: 'nombre', etiqueta: 'Nombre', requerido: true, maxLength: 150 },
      { clave: 'titulo_otorgado', etiqueta: 'Título otorgado', maxLength: 200 },
      { clave: 'descripcion', etiqueta: 'Descripción', tipo: 'textarea' },
    ],
  },
  {
    id: 'planes-estudio',
    etiqueta: 'Planes de estudio',
    estado: 'activo',
    campos: [
      { clave: 'carrera_id', etiqueta: 'Carrera', referencia: 'carreras', requerido: true },
      { clave: 'nombre', etiqueta: 'Nombre del plan', maxLength: 150 },
      { clave: 'codigo', etiqueta: 'Código', maxLength: 80 },
      { clave: 'resolucion', etiqueta: 'Resolución', maxLength: 150 },
      { clave: 'duracion_anios', etiqueta: 'Duración en años', tipo: 'number', max: 32767 },
      { clave: 'vigente_desde', etiqueta: 'Vigente desde', tipo: 'date' },
      { clave: 'vigente_hasta', etiqueta: 'Vigente hasta', tipo: 'date' },
    ],
  },
  {
    id: 'materias',
    etiqueta: 'Materias',
    estado: 'activa',
    campos: [
      { clave: 'nombre', etiqueta: 'Nombre', requerido: true, maxLength: 180 },
      { clave: 'descripcion', etiqueta: 'Descripción', tipo: 'textarea' },
      { clave: 'programa_url', etiqueta: 'Enlace al programa' },
    ],
  },
  {
    id: 'docentes',
    etiqueta: 'Docentes',
    estado: 'activo',
    campos: [
      { clave: 'nombre', etiqueta: 'Nombre', requerido: true, maxLength: 120 },
      { clave: 'apellido', etiqueta: 'Apellido', requerido: true, maxLength: 120 },
      { clave: 'email', etiqueta: 'Correo electrónico', tipo: 'email', maxLength: 254 },
      { clave: 'foto_url', etiqueta: 'Enlace a la foto' },
      { clave: 'descripcion', etiqueta: 'Descripción', tipo: 'textarea' },
    ],
  },
  {
    id: 'planes-materias',
    etiqueta: 'Materias por plan',
    campos: [
      {
        clave: 'plan_estudio_id',
        etiqueta: 'Plan de estudio',
        referencia: 'planes-estudio',
        requerido: true,
      },
      { clave: 'materia_id', etiqueta: 'Materia', referencia: 'materias', requerido: true },
      { clave: 'anio', etiqueta: 'Año de cursada', tipo: 'number', requerido: true, max: 32767 },
      { clave: 'cuatrimestre', etiqueta: 'Cuatrimestre', tipo: 'number', max: 4 },
      { clave: 'orden', etiqueta: 'Orden', tipo: 'number', max: 32767 },
    ],
  },
  {
    id: 'docentes-materias',
    etiqueta: 'Docentes por materia',
    campos: [
      { clave: 'docente_id', etiqueta: 'Docente', referencia: 'docentes', requerido: true },
      { clave: 'materia_id', etiqueta: 'Materia', referencia: 'materias', requerido: true },
    ],
  },
];
