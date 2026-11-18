/**
 * Turno, horario y modalidad por carrera (Mapa del Sitio V3 §4; devolución de Edith §4).
 *
 * El backend todavía no expone estos datos (ticket 0000080 y BE-N02 del apispec). Hasta que
 * lo haga, los valores validados por el instituto viven acá, indexados por el slug de la
 * carrera. El turno reemplaza al literal fijo «Exclusivamente nocturno» de la V2.
 *
 * No se inventan valores: Gestión Parlamentaria todavía no tiene la modalidad confirmada y
 * por eso su `modalidad` queda `undefined` (la UI muestra el mensaje de proceso).
 */
export interface CursadaCarrera {
  /** Turno de cursada confirmado por el instituto. */
  turno: 'Vespertino' | 'Matutino';
  /** Franja horaria del turno. */
  horario: string;
  /** Modalidad de cursada; `undefined` cuando el instituto no la confirmó. */
  modalidad?: 'Híbrida';
}

const VESPERTINO = { turno: 'Vespertino', horario: '18:30 a 22:30' } as const;

export const CURSADA_CARRERAS: Record<string, CursadaCarrera> = {
  'administracion-publica': { ...VESPERTINO, modalidad: 'Híbrida' },
  'administracion-y-gestion-de-politicas-culturales': { ...VESPERTINO, modalidad: 'Híbrida' },
  'analisis-de-sistemas': { ...VESPERTINO, modalidad: 'Híbrida' },
  'ciencia-de-datos-e-inteligencia-artificial': { ...VESPERTINO, modalidad: 'Híbrida' },
  // La única carrera matutina; modalidad pendiente de confirmación institucional.
  'gestion-parlamentaria': { turno: 'Matutino', horario: '9:00 a 13:00' },
};

/** Devuelve la cursada de la carrera por slug; `undefined` si todavía no está cargada. */
export function cursadaDeCarrera(slug: string): CursadaCarrera | undefined {
  return CURSADA_CARRERAS[slug];
}
