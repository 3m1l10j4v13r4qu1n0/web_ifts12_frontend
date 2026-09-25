# AGENTS.md

Frontend del sitio web institucional del IFTS N.º 12 (2026). Proyecto de equipo
(Frontend + UX/UI + Backend + Infraestructura). Los requisitos viven en
`documentacion/driveFrontend/` (minuta de análisis funcional, tarea inicial, plan de
infraestructura VPS). Ojo: `documentacion/driveFrontend/` está en `.gitignore`, no commitear.

## Idioma y tono

- Responder siempre en español rioplatense, informal ("vos"). Nunca en inglés,
  aunque el código, logs o skills estén en inglés.

## Sistema documental: logsayer (5 capas)

Este repo usa el CLI `logsayer` (instalado con `uv tool install logsayer`, binario en
`~/.local/bin/logsayer`) y su sistema de 5 capas. **Rutas en inglés, contenido en
español.** Los umbrales viven en `logsayer.toml` y este archivo los refleja.

| Capa | Responde | Dónde vive | Rol |
|---|---|---|---|
| 1 · Especificación | ¿qué hay que construir? | `docs/01_global/`, `docs/02_technical/`, `docs/04_user_stories/`, `docs/05_agile_methodology/`, `docs/03_process/` | Mentat |
| 2 · Estado | ¿dónde estamos ahora? | `docs/project_state.md` (snapshot) | Navegante |
| 3 · Bitácora | ¿cómo llegamos acá y por qué? | `docs/logbooks/logbook_<fase>_NN.md` (append-only) | Reverenda Madre |
| 4 · Verificación | ¿lo construido sigue siendo lo especificado? | `logsayer check` (mecánica) · `logsayer audit run` → `docs/06_audits/` | Suk Doctor + Decidora |
| 5 · Proceso | ¿cómo se trabaja acá? | `logsayer process check` + reglas de este archivo | Fremen |

**Flujo de sesión (obligatorio):**

1. Al iniciar, leer **solo** `docs/project_state.md` (`logsayer state show`). No leer
   `docs/logbooks/` completa: del logbook solo se consulta `docs/logbooks/00_index.md`
   y, si hace falta, un archivo puntual.
2. `logsayer audit status`: si el contador de HUs cerradas llega a **>= 3 HUs**, proponer
   auditoría (`logsayer audit run`) antes de tomar tarea nueva.
3. Si el uso de contexto supera el **70%**, proponer cierre de sesión antes de tomar más
   tareas.
4. Al trabajar una HU, leer solo su carpeta en `docs/04_user_stories/HU-XX/`.
5. Al cerrar sesión o commit (con aprobación previa del usuario): sobrescribir el snapshot
   `docs/project_state.md` (nunca acumulativo, sin duplicar specs) y registrar el
   porqué con `logsayer log add "..."`. Si el archivo de bitácora activo supera las
   **400 líneas**, el CLI crea el siguiente `NN` y actualiza `docs/logbooks/00_index.md`.
6. Antes de cerrar fase: `logsayer check` + `logsayer process check` + `npm run lint` ·
   `npm run build` · `npm run test`.

**Regla de oro:** cada documento vive en una sola capa. En `docs/` no hay `.md` sueltos:
la documentación institucional, las entregas, los wireframes, los mockups y el Drive
compartido viven en `documentacion/`. El histórico anterior a logsayer quedó archivado en
`docs/logbooks/logbook_legado_01.md` y **no se edita** (append-only).

- Subagentes por rol: `logsayer agent add opencode` genera
  `.opencode/agents/{mentat,navigator,reverend-mother,truthsayer}.md`.
- Ojo: si cambiás los umbrales de `logsayer.toml`, actualizá también los números de este
  archivo, porque `logsayer process check` verifica que coincidan.

## Estado actual (leer antes de tocar nada)

- El ancla de contexto es `docs/project_state.md` (sección "Qué está construido" y
  "Bloqueos abiertos"); el detalle técnico vigente, largo, está en
  `docs/02_technical/estado_implementacion.md`.
- Fases 1-6 y el refactor Mapa Sitio V2 cerrados (hasta `v1.6.0`). La Home es navegable
  con datos simulados (`src/constants/mock-data.ts`); **aún no hay consumo de API real**.
- Base de documentación completada (18/09/2026): `docs/01_global`, `docs/02_technical`,
  `docs/03_process` y `docs/04_user_stories/HU-01`; skill `fe-architect-scaffold` con
  endpoints genéricos por historia de usuario.
- Ramas `feature/`/`fix/` se crean siempre desde `develop` (una rama = una tarea).
- Siempre ejecutar `npm run lint` · `npm run build` · `npm run test` al tocar código.

## Fuente de verdad y anti-alucinación

- No inventar endpoints, campos, tipos, textos ni contenido institucional. El
  backend y los docs de `documentacion/driveFrontend/` son la única fuente de verdad.
- La fuente de verdad de endpoints del frontend es **por historia de usuario**:
  `docs/04_user_stories/HU-XX/*_api.md` (skill `fe-architect-scaffold`).
  Un endpoint que no está documentado en ninguna HU se trata como inexistente.
- Hasta validar contenidos, la Home se arma con datos simulados y sin
  afirmaciones institucionales definitivas; debe incluir acceso visible a Moodle
  y al enlace oficial de inscripción.
- Afirmar algo como existente solo si se verificó en la sesión actual (archivo
  leído o comando corrido). Ambigüedad → preguntar, no decidir por cuenta propia.
- Si el código real contradice lo que dice `docs/project_state.md` o
  `docs/02_technical/estado_implementacion.md`, avisar antes de asumir cuál es la
  fuente de verdad.
- Trabajar en pasos chicos, releer cada archivo tras escribirlo. Regla completa:
  `.opencode/rules/Reglas-anti-alucinacion.md` (lo general ahora vive en
  `~/.config/opencode/rules/anti-alucinacion.md`).

## Git (regla dura: `.opencode/rules/flujo-git.md`)

- Prohibido trabajar directo sobre `main` o `develop`. Ramas `feature/`/`fix/`
  siempre desde `develop`, una rama = una tarea.
- Commits atómicos, Conventional Commits EN ESPAÑOL con scope en minúscula
  (ej. `feat(ui): se agrega componente header`). Prohibidos mensajes vagos
  ("cambios", "update", "cosas varias").
- Antes de mergear: integrar `origin/develop` en la rama feature y resolver
  conflictos ahí; checklist previa `npm run lint` · `npm run build` · `npm run test`.
- **PRs con `gh`:** instalado en `~/.local/bin/gh` (autenticación la maneja el usuario,
  `gh auth login`). Tras pushear la rama (con aprobación), abrir PR hacia `develop` con
  `gh pr create --base develop --head <rama> ...`. Merge ORIGINAL (`gh pr merge --merge`) solo
  con aprobación del usuario; el agente NO crea/mergea/cierra PRs por cuenta propia.
- Push/merge SOLO con aprobación explícita del usuario.
- Al cerrar cada fase: commits atómicos + tag anotado con versión semver y nombre
  acorde a la fase, y push siempre previa pregunta (regla dura:
  `.opencode/rules/versionado-fases.md`).

## Arquitectura frontend (contrato: `.opencode/skills/fe-architect-scaffold/SKILL.md`)

- Estándar del proyecto: React + Vite + TypeScript (strict). Abrir ese skill al
  crear pantallas, componentes, hooks, servicios o conectar endpoints.
- Estructura de carpetas estricta: `api/` (client + services, única capa que
  conoce endpoints), `components/ui`, `components/layout`, `pages/`, `hooks/`,
  `contexts/`, `routes/`, `types/api` (espejo del backend), `utils/`,
  `constants/`, `styles/`.
- Prohibido: `any`, llamadas HTTP directas en componentes presentacionales,
  `try/catch` dispersos para errores de API (interceptor global), y
  autenticación real mientras el backend no la soporte.

## Diseño del sitio

- Los skills de `.opencode/skills/` (`crear-portada-sitio-web`,
  `crear-sitio-web-completo`, `aplicar-estilos-disenio-web`,
  `mejorar-navegacion-web`, `storytelling-dijital`) y las `.opencode/rules/reglas-*.md`
  definen los criterios visuales del sitio (regla 90/10 de color, menú según el Mapa del Sitio
  V2 de UX/UI — 9 items aprobados el 15/09/2026 —, logo enlazado a home, portada 1680×900, etc.).
  Se activan a pedido
  del usuario (en su mayoría están `disable-model-invocation`).

## Documentación con formato APA (regla + skill: `.agents/`)

- **Reglas APA adaptadas:** `.agents/rules/apa-formato.md` y `.agents/rules/apa-software.md`
  (lo general de APA 7.ª vive en `~/.config/opencode/rules/apa.md`). Toda documentación
  nueva generada en el repo debe seguirlas.
- **Skill de plantilla:** `.agents/skills/apa-software-doc/SKILL.md` ofrece la plantilla de
  documento y ejemplos de citas/referencias.
- Aplican a informes de auditoría (`docs/06_audits/`), minutas, capas de `docs/`, memoria
  y cualquier doc que se genere. Se adapta al formato Markdown real del proyecto; no
  aplican pautas físicas de papel.

## Auditoría de documentación (regla + skill: `.agents/`)

- **Regla dura:** `.agents/rules/auditoria-documentacion.md` — al auditar documentación
  (requerimientos, especificaciones en `documentacion/driveFrontend/` u otra que afecte a un
  grupo), el agente DEBE actualizar también el archivo del grupo correspondiente
  (`grupo_X_*.md`), no quedarse solo con el informe versionado, y generar el informe en
  `docs/06_audits/audit_<fecha>-<área>.md`.
- **Fuente única de verdad de análisis funcional:**
  `documentacion/frontend/analisis_funcional_validado.md` (18/09/2026) — síntesis de los 3
  PDFs aprobados en `documentacion/driveFrontend/01_analisis_funcional/`. Al auditar
  `grupo_1_analisis_funcional.md` u otra doc de análisis, comparar contra ese resumen
  validado + los PDFs aprobados, nunca contra suposiciones.
- **Skill:** `.agents/skills/auditoria-documentacion/SKILL.md` — flujo completo: identificar
  grupo → relevar estado real → leer el doc del grupo → marcar ✅/🟡/🔵/⏳ → aplicar
  correcciones verificadas → informe en `docs/06_audits/` → bitácora y estado → commits
  (los cambios de `documentacion/driveFrontend/` NO se commitean).
- Ejemplo de referencia: auditoría de infraestructura (09/09/2026), que además del informe
  actualizó `grupo_5_infraestructura.md`.

## Memoria del proyecto

- Antes de tocar código, leer `docs/project_state.md` (y `docs/02_technical/estado_implementacion.md`
  si la tarea es de código) para tener el contexto actual.
- Al terminar una implementación, eliminación o edición relevante (nueva entidad, caso de uso,
  endpoint, refactor de arquitectura, dependencia core):
  1. `logsayer log add "..."` con: qué se hizo, decisiones tomadas, archivos tocados, estado
     resultante. Nunca editar entradas previas.
  2. Actualizar la sección correspondiente de `docs/project_state.md` y, si aplica, de
     `docs/02_technical/estado_implementacion.md` (editar in-place, no reescribir todo).
  3. Si se cerró una HU, incrementar el contador de `## HUs cerradas desde la última auditoría`.
- No generar entradas de bitácora por cambios triviales (typos, formateo, renames cosméticos).
