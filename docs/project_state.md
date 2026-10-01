---
fase: fase-8
---

# Estado del proyecto — IFTS N.º 12 (frontend)

> Snapshot operativo para el agente al iniciar cada sesión. No es acumulativo: se
> sobrescribe al cerrar sesión con aprobación previa. No dupliques contenido de
> specs ni repitas el roadmap completo. El detalle técnico vigente vive en
> `docs/02_technical/estado_implementacion.md`.

## Fase actual del roadmap

Fase 8

_(Fase 8 = cierre del ticket 0000010: evidencia navegable de la primera versión y registro
de las deudas bloqueantes, sin cambios de código en `src/`. Cierra la Fase 7 (logsayer v0.8.0)
más el contrato derivado del backend Flask, hasta `v1.10.0`. El sitio en sí sigue sin
consumir API.)_

## Qué está construido

- SPA React 19 + Vite + TypeScript strict + Tailwind v4 con `npm run lint · build · test` en verde.
- Home navegable según el **Mapa del Sitio V2** (9 ítems de menú + buscador global en el
  header), portada con carrusel institucional, footer V2, secciones de Carreras,
  Ingresantes, Estudiantes, Tutorías, Docentes, Institucional, Noticias, FAQ y Contacto,
  más rutas de detalle `/carreras/:id` y `/noticias/:id` y 404.
- Datos simulados en `src/constants/mock-data.ts`; **sin consumo de API real**.
- HU-01 (Home institucional pública) especificada en `docs/04_user_stories/HU-01/`.
- Contrato del backend derivado del README que remitió el equipo de Backend:
  `docs/02_technical/contrato_api_backend.md` (Capa 1, 01/10/2026), con jerarquía de fuentes
  declarada y 9 divergencias abiertas (P1–P9).
- Cinco auditorías cerradas en `docs/06_audits/` (análisis funcional, backend, infraestructura,
  UX/UI y la del README del backend).
- **Evidencia del ticket 0000010** (01/10/2026): las **13 rutas** del sitio verificadas una por
  una en navegador (con `h1` y enlaces de navegación leídos del DOM, sin errores de consola),
  11 de 15 wireframes con equivalente implementado, y **15 capturas** en
  `documentacion/screenshots/` (desktop 1680×900, mobile 390×844 y estado del menú desplegado).
  Documento en `documentacion/entregas/2026-10-01__Evidencia_Ticket_0000010_Version_Navegable_v0.1.md`.
- **Deudas bloqueantes registradas** con dueño por grupo en
  `documentacion/driveFrontend/deudas_bloqueantes_2026-10-01.md` (no versionado, vive en el
  Drive): 4 bloqueantes (DB-01 a DB-04) y 10 relevantes, cada una con qué falta, por qué
  bloquea y qué se necesita de vuelta.

## Decisiones activas (últimas 3-5)

- **Sistema documental logsayer (5 capas), CLI v0.8.0.** `docs/` contiene solo capas del
  framework (`01_global`, `02_technical`, `03_process`, `04_user_stories`,
  `05_agile_methodology`, `06_audits`, `logbooks`, `project_state.md`) más el índice
  transversal generado `docs/00_memory_index.md`; la documentación institucional y de
  la cátedra quedó en `documentacion/`. Verificación: `logsayer check` y
  `logsayer process check`. El CLI se actualiza con `uv tool install --force logsayer`:
  sin `--force` uv da la instalación por satisfactoria y no cambia nada.
- **Rutas en inglés, contenido en español** (convención del framework). La fuente de verdad
  de endpoints es **por historia de usuario**: `docs/04_user_stories/HU-XX/*_api.md`. Un
  endpoint que no está en ninguna HU se trata como inexistente.
- **Reglas y skills delegates al global de opencode** (`~/.config/opencode/rules/`,
  `~/.config/opencode/skills/`). En el repo queda solo lo específico del proyecto.
- **Mapa del Sitio V2 manda en navegación** (9 ítems + buscador). Tensión **AF-A6 abierta**:
  Análisis validó 7 accesos rápidos y el V2 tiene 9 (incluye SIU) — falta cierre con UX/UI.
- **Sin autenticación ni API real** hasta que Backend entregue Swagger y DTOs. Los accesos
  a Moodle/SIU/Inscripción se muestran atenuados mientras las URLs oficiales estén vacías.
- **Jerarquía de fuentes del contrato de API** (decisión del 01/10/2026):
  `04_backend/respuesta.md` (15/09/2026) > `preguntas_abiertas_2026-10-01.md` > el README de
  `backend_ifts12` (01/10/2026). El README es más reciente pero **de alcance menor** (5 endpoints
  de los 16 confirmados, ningún DTO), así que **no reemplaza** a `respuesta.md`: ni
  `hu_01_api.md` ni `src/api/endpoints.ts` se modifican hasta que Backend responda.

## Bloqueos abiertos (no resolver sin fuente)

- URLs oficiales de Moodle e inscripción (IFTS/Dirección) → bloquean `enlaces.ts`,
  `.env.example` y la migración a `import.meta.env`.
- Swagger/OpenAPI y DTOs de Backend → bloquean el consumo de API. Al 01/10/2026 **vencieron las
  entregas 2 (~22/09) y 3 (~29/09)**; la 4 (seeders + errores) vence ~06/10.
- **Conflicto de ruta de noticias (P1, alta):** el README dice `/api/novedades`, la fuente
  vigente dice `/api/noticias`. No escribir ninguna de las dos en `endpoints.ts` hasta respuesta.
- **Alcance del mapa de rutas (P2, alta):** confirmar si los 16 endpoints confirmados siguen
  vigentes o si el backend realmente expone solo los 5 del README.
- SQLite en el seed vs. PostgreSQL confirmado (P4) y URL/puerto de testing para `API_BASE_URL`
  (P9) → bloquean la configuración de la capa `api/`.
- `/api/contacto` POST sin confirmar body ni errores: hoy el formulario valida en local y no envía.
- ⚠️ El README del backend publica la contraseña del admin de seed en claro: no se reproduce ni se
  usa contra entornos compartidos.
- Tensión de accesos rápidos 7 vs 9 (AF-A6) y contenidos reales de Análisis (🔵/❌).

### Las 4 deudas bloqueantes del ticket 0000010

Detalle completo con dueño, estado y qué se necesita de vuelta en
`documentacion/driveFrontend/deudas_bloqueantes_2026-10-01.md` (no versionado, en el Drive).

| ID | Deuda | Dueño |
|:---|:---|:---|
| DB-01 | Tabla oficial de endpoints (parámetros, bodies, códigos) | Grupo 4 |
| DB-02 | Esquemas JSON exactos (DTOs) | Grupo 4 |
| DB-03 | Alcance de la administración (WF 13, 14, 15) | Grupo 1 |
| DB-04 | Definición de la búsqueda global (WF 12): ¿widget o página? | Grupo 2 |

Las dos primeras tienen **plazo vencido** (22/09 y 29/09). Verificado el 01/10/2026:
`src/api/endpoints.ts` sigue con `endpoints = {} as const`, `src/api/services/` solo tiene
`.gitkeep` y **ninguna de las 13 rutas consume la API**: el sitio navegable es 100% mocks.

Dos deudas **no dependen de terceros** y se pueden avanzar ya: **DB-05**, crear las historias
de usuario de las secciones que solo tienen HU-01 (Home), y **DB-14**, distinguir el 404 de
`/carreras/:id` y `/noticias/:id` cuando un `:id` no exista (hoy cae en el 404 genérico).

## Verificación

- Frontend: `npm run lint` · `npm run build` · `npm run test`.
- Sistema documental: `logsayer check` (mecánico) · `logsayer process check` (proceso) ·
  `logsayer state show` · `logsayer audit status` · `logsayer memory status`.

## HUs cerradas desde la última auditoría

0
