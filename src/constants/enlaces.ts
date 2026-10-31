// URLs oficiales pendientes de IFTS/Direccion. Placeholders hasta recibirlas:
// no usar valores inventados en enlaces institucionales.
export const ENLACES = {
  moodle: import.meta.env.VITE_MOODLE_URL ?? '',
  inscripcion: '',
  siu: import.meta.env.VITE_SIU_URL ?? '',
  constancias: '',
  mesasExamen: '',
  calendario: '',
} as const;
