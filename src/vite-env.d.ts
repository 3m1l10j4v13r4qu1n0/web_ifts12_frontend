/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * URL base del backend, sin el prefijo `/api` (el cliente lo agrega solo).
   *
   * @example http://localhost:5000
   *
   * @TODO: confirmar con Backend e Infra la URL del entorno desplegado. El backend declara
   * el puerto 5000 en `app.py:120`, pero el VPS va a servir el frontend como build estático
   * y el backend todavía no tiene URL de testing confirmada (pregunta P9 de
   * `documentacion/driveFrontend/04_backend/preguntas_abiertas_2026-10-01.md`).
   */
  readonly VITE_API_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
