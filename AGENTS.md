# AGENTS.md

Frontend del sitio web institucional del IFTS N.º 12 (2026). Proyecto de equipo
(Frontend + UX/UI + Backend + Infraestructura). Los requisitos viven en
`docs/driveFrontend/` (minuta de análisis funcional, tarea inicial, plan de
infraestructura VPS). Ojo: `docs/driveFrontend` está en `.gitignore`, no commitear.

## Idioma y tono

- Responder siempre en español rioplatense, informal ("vos"). Nunca en inglés,
  aunque el código, logs o skills estén en inglés.

## Estado actual (leer antes de tocar nada)

- El repo NO tiene código de aplicación todavía: no hay `package.json`, `src/`
  ni build al root. El andamiaje frontend está pendiente (ver "Tarea Inicial"
  en `docs/driveFrontend/`).
- No existen comandos `npm run lint/build/test` hasta que se andamie el proyecto.
  Verificar siempre que exista `package.json` antes de ejecutarlos.
- Solo existe `main`/`origin/main`; `develop` no se creó aún. Antes de crear
  ramas `feature/`/`fix/` hay que decidir y crear `develop` (preguntar primero).

## Fuente de verdad y anti-alucinación

- No inventar endpoints, campos, tipos, textos ni contenido institucional. El
  backend y los docs de `docs/driveFrontend/` son la única fuente de verdad.
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
  conflictos ahí; checklist previa `npm run lint` · `npm run build` · `npm run test`
  (una vez que existan esos scripts).
- Push/merge SOLO con aprobación explícita del usuario.

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
  definen los criterios visuales del sitio (regla 90/10 de color, máx. 4-5 items
  de menú, logo enlazado a home, portada 1680×900, etc.). Se activan a pedido
  del usuario (en su mayoría están `disable-model-invocation`).