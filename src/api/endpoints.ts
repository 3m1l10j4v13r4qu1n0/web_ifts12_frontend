// Contrato verificado en el Git central de Backend dff587c.
// La URL vacía usa el mismo origen de Nginx y evita localhost en el bundle.
const urlBaseCruda = import.meta.env.VITE_API_BASE_URL ?? '';
export const API_BASE_URL = `${urlBaseCruda.replace(/\/+$/, '')}/api/v1`;

export const endpoints = {
  /** POST /api/v1/auth/login, confirmado en apps/users/routes.py. */
  autenticacion: {
    login: '/auth/login',
  },
  carreras: {
    listar: '/carreras',
  },
  /**
   * GET /api/v1/novedades, confirmado en apps/news/routes.py.
   * Solo se consume si `novedadesHabilitadas()` es `true`.
   */
  novedades: {
    listar: '/novedades',
  },
  /** POST /api/v1/contacto, confirmado en apps/contact/routes.py. */
  contacto: {
    crear: '/contacto',
  },
} as const;
