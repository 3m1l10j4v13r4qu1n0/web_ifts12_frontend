# AGENTS.md

Frontend del sitio web institucional del IFTS N.º 12 (2026). Proyecto de equipo
(Frontend + UX/UI + Backend + Infraestructura). Los requisitos viven en
`docs/driveFrontend/` (minuta de análisis funcional, tarea inicial, plan de
infraestructura VPS). Ojo: `docs/driveFrontend` está en `.gitignore`, no commitear.

## Idioma y tono

- Responder siempre en español rioplatense, informal ("vos"). Nunca en inglés,
  aunque el código, logs o skills estén en inglés.

## Estado actual (leer antes de tocar nada)

- Frontend ya andamiado y operativo (Fases 1-4, tags `v1.0.0`–`v1.3.0`): hay
  `package.json`, `src/` completo (React 19 + Vite + TypeScript strict + Tailwind
  v4) y scripts `lint/build/test` en verde en `develop`.
- Se completó la Fase 5 (cierre/docs, `v1.4.0`), la Fase 6 (brechas de auditoría
  sin dependencias: contacto/pie, accesos rápidos, modalidad/horarios, FAQ por
  segmento, fechas ISO, `v1.5.0`) y el refactor Mapa Sitio V2 (15/09/2026: menú de
  9 items + buscador global, `v1.6.0`). La Home es navegable con datos simulados
  (`src/constants/mock-data.ts`); **aún no hay consumo de API real**.
- Base de documentación SDD completada (18/09/2026, mergeada a `develop`):
  `docs/sdd/01_global`, `02_tecnico`, `03_procesos` y `04_historias_usuario/HU-01`;
  skill `fe-architect-scaffold` con endpoints genéricos por historia de usuario.
  Ver detalles en `docs/sdd/estado_actual_proyecto.md`.
- Ramas `feature/`/`fix/` se crean siempre desde `develop` (una rama = una tarea).
- Siempre ejecutar `npm run lint` · `npm run build` · `npm run test` al tocar código.

## Fuente de verdad y anti-alucinación

- No inventar endpoints, campos, tipos, textos ni contenido institucional. El
  backend y los docs de `docs/driveFrontend/` son la única fuente de verdad.
- La fuente de verdad de endpoints del frontend es **por historia de usuario**:
  `docs/sdd/04_historias_usuario/HU-XX/hu_xx_api.md` (skill `fe-architect-scaffold`).
  Un endpoint que no está documentado en ninguna HU se trata como inexistente.
- Hasta validar contenidos, la Home se arma con datos simulados y sin
  afirmaciones institucionales definitivas; debe incluir acceso visible a Moodle
  y al enlace oficial de inscripción.
- Afirmar algo como existente solo si se verificó en la sesión actual (archivo
  leído o comando corrido). Ambigüedad → preguntar, no decidir por cuenta propia.
- Trabajar en pasos chicos, releer cada archivo tras escribirlo. Regla completa:
  `.opencode/rules/Reglas-anti-alucinacion.md`.

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

- **Reglas APA adaptadas:** `.agents/rules/apa-formato.md` (formato Markdown, estructura,
  títulos, citas y referencias) y `.agents/rules/apa-software.md` (código, figuras, tablas,
  referencias técnicas, checklist). Toda documentación nueva generada en el repo debe
  seguirlas.
- **Skill de plantilla:** `.agents/skills/apa-software-doc/SKILL.md` ofrece la plantilla de
  documento y ejemplos de citas/referencias.
- Aplican a informes de auditoría, minutas, SSD (`docs/sdd/`), memoria y cualquier doc que se
  genere. Se adapta al formato Markdown real del proyecto; no aplican pautas físicas de papel.

## Auditoría de documentación (regla + skill: `.agents/`)

- **Regla dura:** `.agents/rules/auditoria-documentacion.md` — al auditar documentación
  (requerimientos, especificaciones en `docs/driveFrontend/` u otra que afecte a un grupo),
  el agente DEBE actualizar también el archivo del grupo correspondiente (`grupo_X_*.md`),
  no quedarse solo con el informe versionado, y generar el informe en
  `docs/sdd/06_auditorias/auditoria-*.md`.
- **Fuente única de verdad de análisis funcional:** `docs/frontend/analisis_funcional_validado.md`
  (18/09/2026) — síntesis de los 3 PDFs aprobados en `docs/driveFrontend/01_analisis_funcional/`.
  Al auditar `grupo_1_analisis_funcional.md` u otra doc de análisis, comparar contra ese resumen
  validado + los PDFs aprobados, nunca contra suposiciones.
- **Skill:** `.agents/skills/auditoria-documentacion/SKILL.md` — flujo completo: identificar
  grupo → relevar estado real → leer el doc del grupo → marcar ✅/🟡/🔵/⏳ → aplicar
  correcciones verificadas → informe `docs/sdd/06_auditorias/auditoria-*.md` → memoria → commits
  (los cambios de `docs/driveFrontend/` NO se commitean).
- Ejemplo de referencia: auditoría de infraestructura (09/09/2026), que además del informe
  actualizó `grupo_5_infraestructura.md`.

## Memoria del proyecto (docs/sdd/estado_actual_proyecto.md y docs/sdd/bitacora_agentica.md)

- Antes de tocar código, leer `docs/sdd/estado_actual_proyecto.md` completo para tener el contexto actual del proyecto.
- Al terminar una implementación, eliminación o edición relevante (nueva entidad, caso de uso, endpoint, refactor de arquitectura, dependencia core):
  1. Actualizar la sección correspondiente de `docs/sdd/estado_actual_proyecto.md` (editar in-place, no reescribir todo el archivo).
  2. Agregar una entrada nueva al final de `docs/sdd/bitacora_agentica.md` con: fecha, qué se hizo, decisiones tomadas, archivos tocados, estado resultante. Nunca editar entradas previas de la bitácora.
- No generar entradas de bitácora por cambios triviales (typos, formateo, renames cosméticos).
- Si el código real contradice lo que dice `estado_actual_proyecto.md`, avisar antes de asumir cuál es la fuente de verdad.