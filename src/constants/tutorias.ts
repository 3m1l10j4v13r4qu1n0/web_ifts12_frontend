// Canal único de tutorías, validado por el instituto (devolución de Edith §7; ticket
// 0000090): correo de Clara Moroni, asunto oficial e indicación de año y carrera. Las
// consultas de tutorías no pasan por el formulario general de contacto.
export const CORREO_TUTORIAS = 'clara.moroni@bue.edu.ar';

export const ASUNTO_TUTORIAS = 'Sitio Web - Tutorías - Tu Nombre y Apellido';

/** Enlace `mailto:` con el asunto oficial ya codificado. */
export const ENLACE_CORREO_TUTORIAS = `mailto:${CORREO_TUTORIAS}?subject=${encodeURIComponent(ASUNTO_TUTORIAS)}`;
