# Vitácora Agéntica

> Historial cronológico y append-only. NUNCA se borra ni se reescribe una entrada pasada.
> Cada entrada corresponde a una sesión/tarea significativa de trabajo del agente sobre el proyecto.
> Cuando este archivo crezca demasiado, archivar entradas viejas en `vitacora_YYYY-QX.md` y dejar acá solo un índice + las últimas entradas.

---

## 2026-08-29 — Fase 1 (Andamiaje) del frontend y regla de versionado por fases

**Qué se hizo:** se creó el andamiaje completo del frontend en `feature/tarea-inicial-frontend`
sobre el stack acordado (React 19, Vite 8, TypeScript strict, Tailwind v4, React Router v7, Axios,
TanStack Query v5, Zod, Biome 2, Vitest 4). Se configuraron los scripts `lint`/`build`/`test` en
verde, la estructura de carpetas del contrato `fe-architect-scaffold`, el AppRouter con las
secciones del mapa del sitio (páginas placeholder), AuthContext + ProtectedRoute preparados, el
cliente Axios con interceptor (sin endpoints reales) y placeholders de enlaces institucionales.
Se dejó una prueba unitaria de `PaginaPlaceholder`. Se taggeó **v1.0.0** ("Fase 1 - Andamiaje") y
se pusheó con aprobación del usuario. Además se creó la regla dura de versionado por fases
(`versionado-fases.md`) y se referenció en `AGENTS.md`.

**Decisiones de arquitectura:** se siguió el contrato `fe-architect-scaffold` (skill) tal cual,
sin desviaciones: capa `api/` única que conoce endpoints, componentes presentacionales sin HTTP,
interceptor global de errores, `any` prohibido, estructura AuthContext/ProtectedRoute preparada
sin login real (el backend no lo soporta). No se inventaron endpoints ni URLs oficiales
(Moodle/inscripción quedaron como placeholders vacíos). Comunión semver: cada fase suma versión
menor (v1.0.0 → Fase 1, v1.1.0 → Fase 2…), major solo por decisión del equipo.

**Archivos/módulos tocados:**
- `package.json` / `package-lock.json` — dependencias del stack y scripts `dev`/`build`/`lint`/`lint:fix`/`test`.
- `vite.config.ts` — plugins React + Tailwind v4, setup de Vitest (jsdom, jest-dom).
- `tsconfig*.json` — TypeScript strict, proyecto en solución (app + node).
- `biome.json` — linter/formateador (migrado a presets de Biome 2).
- `.gitignore` — se sumó `*.tsbuildinfo`.
- `src/api/{client,endpoints}.ts`, `src/api/services/` — cliente Axios con interceptor y tablas de endpoints vacías.
- `src/contexts/AuthContext.tsx` — estructura de sesión vacía preparada.
- `src/routes/{AppRouter,ProtectedRoute}.tsx` — rutas de las secciones + ruta protegida lista.
- `src/pages/*` — páginas placeholder de las 10 secciones + 404.
- `src/constants/enlaces.ts` — placeholders de Moodle e inscripción.
- `src/types/api/error.types.ts` — forma de error del backend.
- `src/App.tsx`, `src/main.tsx`, `src/styles/index.css`, `src/setup-tests.ts`, `src/__tests__/pagina-placeholder.test.tsx`.
- `.opencode/rules/versionado-fases.md` — nueva regla dura de commits + tags por fase.
- `AGENTS.md` — referencia a la nueva regla.
- `docs/estado_actual_proyecto.md`, `docs/vitacora_agentica.md` — memoria del proyecto creada en esta sesión.

**Estado resultante:** Fase 1 cerrada y taggeada (`v1.0.0`); rama `feature/tarea-inicial-frontend`
pushiada (último commit `2ab4c12`), `lint`·`build`·`test` en verde. Sin cambios pendientes en el
working tree. Próximos pasos: Fase 2 (base/mocks), Fase 3 (componentes reutilizables), Fase 4
(Home navegable). Recordar: reiniciar opencode para que cargue la nueva regla.