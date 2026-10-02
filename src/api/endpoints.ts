// Constantes de la capa API. Es la única capa que conoce las URLs del backend.
//
// @TODO: definir la URL base real junto con Backend/Infra para el build. Hoy sale de
// VITE_API_BASE_URL con fallback a localhost:5000, que es el puerto que declara el
// backend (`app.py:120`).

const urlBaseCruda = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000';

/**
 * Prefijo de rutas del backend. Confirmado contra el código el 02/10/2026: las 5 rutas
 * reales de `app.py` usan `/api/` y ninguna usa versionado (BE-A1).
 */
export const API_BASE_URL = `${urlBaseCruda.replace(/\/+$/, '')}/api`;

/**
 * Endpoints verificados contra el código fuente del backend el 02/10/2026
 * (`~/Descargas/backend_ifts12/`).
 *
 * Solo se documentan los que existen. De los 16 que el backend confirmó el 15/09/2026,
 * estos son los 5 que el código implementa:
 *
 * | Método | Path                | Servidor          | DTO en types/api |
 * | :--- | :--- | :--- | :--- |
 * | GET  | /health            | app.py:25-30      | — (estático) |
 * | POST | /auth/login        | app.py:34-58      | ⏳ pendiente |
 * | GET  | /carreras          | app.py:62-75      | carrera.types.ts ✅ |
 * | GET  | /novedades         | app.py:79-92      | novedad.types.ts ✅ |
 * | POST | /contacto          | app.py:96-111     | ⏳ pendiente |
 *
 * ⚠️ Lo que sigue confirmado pero **no existe en el código**, y por eso no va acá:
 * `/api/slider`, `/api/noticias`, `/api/noticias/:id`, `/api/carreras/:id`,
 * `/api/faqs`, `/api/docentes`, `/api/tutorias`, `/api/becas`, `/api/calendario`,
 * `/api/horarios`, `/api/autoridades`, `/api/bedeles`, `/api/auth/logout`,
 * `/api/auth/me` y todo el CRUD administrativo.
 *
 * `/api/noticias` NO es lo mismo que `/api/novedades`: el código expone la segunda.
 * El nombre `/noticias` venía de la respuesta del 15/09/2026, que no coincide con el
 * código. Ver docs/04_user_stories/HU-01/hu_01_api.md, sección 1.
 *
 * Nota sobre `/api/carreras/:id`: figura en el archivo muerto `routes.py:61` del backend,
 * nunca importado, y con `<int:carrera_id>`. No se puede consumir.
 */
export const endpoints = {
  salud: '/health',
  autenticacion: {
    login: '/auth/login',
  },
  carreras: {
    listar: '/carreras',
  },
  novedades: {
    listar: '/novedades',
  },
  contacto: {
    crear: '/contacto',
  },
} as const;
