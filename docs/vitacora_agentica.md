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

---

## 2026-08-30 — Merge de la Fase 1 (Andamiaje) a develop y Fase 2 (Base)

**Qué se hizo:** se integró `origin/develop` en `feature/tarea-inicial-frontend` (sin conflictos:
develop era ancestro), checklist en verde (`lint`·`build`·`test`) y se mergeó la Fase 1 a
`develop` con merge commit. Desde `develop` se creó `feature/fase-2-base`. Se completó la Fase 2
(Base): se crearon los tipos de dominio del sitio (`types/domain/sitio.types.ts`: Carrera,
Noticia, FaqItem, AccesoRapido, Comunidad, FaqCategoria) y `constants/mock-data.ts` con mocks
provisionales (carreras, noticias, FAQ, accesos rápidos, comunidades) marcados para validar con
Análisis. Se taggeó **v1.1.0** ("Fase 2 - Base"). Los demás entregables de la Fase 2 (AppRouter,
`api/client.ts` con interceptor, AuthContext/ProtectedRoute, placeholders Moodle/inscripción) ya
venían implementados desde la Fase 1.

**Decisiones de arquitectura:** los mocks solo usan contenido verificado en la minuta de
relevamiento del 27/08/2026 (carreras nombradas: gestión parlamentaria, administración y gestión
de políticas culturales, administración pública; accesos rápidos de la minuta; comunidades de
tutoría/alumnos/docentes). Descripciones y respuestas quedan como "pendiente de validación" sin
afirmaciones institucionales definitivas. El acceso "campus virtual" toma `ENLACES.moodle`
(placeholder vacío) y "becas" queda sin ruta hasta definir su página en UX/UI. Tipos de dominio en
`types/domain/` (no en `types/api/`) porque son datos de UI provisionales, no esquemas del backend.

**Archivos/módulos tocados:**
- `src/types/domain/sitio.types.ts` — nuevos tipos de dominio del sitio (se reemplaza el `.gitkeep`).
- `src/constants/mock-data.ts` — mocks provisionales tipados para la Home.
- `docs/estado_actual_proyecto.md` — Fase 2 completada, pendientes actualizados.
- `docs/vitacora_agentica.md` — esta entrada.
- Git: merge `f4726cf` de la Fase 1 a `develop`; rama `feature/fase-2-base` (commits `f98fed2`,
  `e275b5a`); tag anotado `v1.1.0`.

**Estado resultante:** `develop` contiene la Fase 1; `feature/fase-2-base` tiene la Fase 2 con
`lint`·`build`·`test` en verde; tag `v1.1.0` creado sin pushear. Falta pushear merge de develop,
rama y tag (requiere aprobación). Próximo paso: Fase 3 (componentes reutilizables).