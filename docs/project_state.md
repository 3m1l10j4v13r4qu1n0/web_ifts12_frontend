# Estado del proyecto — IFTS N.º 12 (frontend)

> Snapshot operativo para el agente al iniciar cada sesión. No es acumulativo: se
> sobrescribe al cerrar sesión con aprobación previa. No dupliques contenido de
> specs ni repitas el roadmap completo. El detalle técnico vigente vive en
> `docs/02_technical/estado_implementacion.md`.

## Fase actual del roadmap

Fase 7

_(Fase 7 = adopción del framework documental logsayer: `docs/` pasa a tener las 5 capas
(Especificación, Estado, Bitácora, Verificación, Proceso). Fases 1-6 y el refactor
Mapa Sitio V2 cerrados, hasta `v1.6.0`. El sitio en sí no consume API todavía.)_

## Qué está construido

- SPA React 19 + Vite + TypeScript strict + Tailwind v4 con `npm run lint · build · test` en verde.
- Home navegable según el **Mapa del Sitio V2** (9 ítems de menú + buscador global en el
  header), portada con carrusel institucional, footer V2, secciones de Carreras,
  Ingresantes, Estudiantes, Tutorías, Docentes, Institucional, Noticias, FAQ y Contacto,
  más rutas de detalle `/carreras/:id` y `/noticias/:id` y 404.
- Datos simulados en `src/constants/mock-data.ts`; **sin consumo de API real**.
- HU-01 (Home institucional pública) especificada en `docs/04_user_stories/HU-01/`.
- Cuatro auditorías cerradas en `docs/06_audits/` (análisis funcional, backend,
  infraestructura, UX/UI).

## Decisiones activas (últimas 3-5)

- **Sistema documental logsayer (5 capas).** `docs/` contiene solo capas del framework
  (`01_global`, `02_technical`, `03_process`, `04_user_stories`, `05_agile_methodology`,
  `06_audits`, `logbooks`, `project_state.md`); la documentación institucional y de la
  cátedra quedó en `documentacion/`. Verificación: `logsayer check` y
  `logsayer process check`.
- **Rutas en inglés, contenido en español** (convención del framework). La fuente de verdad
  de endpoints es **por historia de usuario**: `docs/04_user_stories/HU-XX/*_api.md`. Un
  endpoint que no está en ninguna HU se trata como inexistente.
- **Reglas y skills delegates al global de opencode** (`~/.config/opencode/rules/`,
  `~/.config/opencode/skills/`). En el repo queda solo lo específico del proyecto.
- **Mapa del Sitio V2 manda en navegación** (9 ítems + buscador). Tensión **AF-A6 abierta**:
  Análisis validó 7 accesos rápidos y el V2 tiene 9 (incluye SIU) — falta cierre con UX/UI.
- **Sin autenticación ni API real** hasta que Backend entregue Swagger y DTOs. Los accesos
  a Moodle/SIU/Inscripción se muestran atenuados mientras las URLs oficiales estén vacías.

## Bloqueos abiertos (no resolver sin fuente)

- URLs oficiales de Moodle e inscripción (IFTS/Dirección) → bloquean `enlaces.ts`,
  `.env.example` y la migración a `import.meta.env`.
- Swagger/OpenAPI y DTOs de Backend (entrega 2) → bloquean el consumo de API.
- `/api/contacto` POST sin confirmar: hoy el formulario valida en local y no envía.
- Tensión de accesos rápidos 7 vs 9 (AF-A6) y contenidos reales de Análisis (🔵/❌).

## Verificación

- Frontend: `npm run lint` · `npm run build` · `npm run test`.
- Sistema documental: `logsayer check` (mecánico) · `logsayer process check` (proceso) ·
  `logsayer state show` · `logsayer audit status`.

## HUs cerradas desde la última auditoría

0
