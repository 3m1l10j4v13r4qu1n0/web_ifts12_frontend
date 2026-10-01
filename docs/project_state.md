---
fase: fase-7
---

# Estado del proyecto — IFTS N.º 12 (frontend)

> Snapshot operativo para el agente al iniciar cada sesión. No es acumulativo: se
> sobrescribe al cerrar sesión con aprobación previa. No dupliques contenido de
> specs ni repitas el roadmap completo. El detalle técnico vigente vive en
> `docs/02_technical/estado_implementacion.md`.

## Fase actual del roadmap

Fase 7

_(Fase 7 = adopción del framework documental logsayer: `docs/` pasa a tener las 5 capas
(Especificación, Estado, Bitácora, Verificación, Proceso). Fases 1-6 y el refactor
Mapa Sitio V2 cerrados, más la implementación de infraestructura, hasta `v1.7.0`
(la rama `main` va por `v1.8.0`). El sitio en sí no consume API todavía.)_

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

## Verificación

- Frontend: `npm run lint` · `npm run build` · `npm run test`.
- Sistema documental: `logsayer check` (mecánico) · `logsayer process check` (proceso) ·
  `logsayer state show` · `logsayer audit status` · `logsayer memory status`.

## HUs cerradas desde la última auditoría

0
