// URLs oficiales pendientes de IFTS/Direccion. Placeholders hasta recibirlas:
// no usar valores inventados en enlaces institucionales.
export const ENLACES = {
  moodle: import.meta.env.VITE_MOODLE_URL ?? '',
  // Preinscripción del GCBA e instructivo paso a paso (devolución de Edith §5; ticket 0000091).
  // Con la misma URL de `inscripcion` se resuelven los botones "Inscripción GCBA" del header y
  // del pie (RN-02, RN-08).
  inscripcion: import.meta.env.VITE_INSCRIPCION_URL ?? '',
  instructivoInscripcion: import.meta.env.VITE_INSCRIPCION_INSTRUCTIVO_URL ?? '',
  siu: import.meta.env.VITE_SIU_URL ?? '',
  constancias: '',
  mesasExamen: '',
  calendario: '',
} as const;
