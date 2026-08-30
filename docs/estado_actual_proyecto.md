# Estado Actual del Proyecto

> Última actualización: 2026-08-30 (cierre Fase 5)
> Este archivo es una FOTO del presente, no un historial. Para el historial de cambios ver `vitacora_agentica.md`.
> El agente debe leer este archivo completo al iniciar cualquier tarea sobre el proyecto.

## 1. Resumen del proyecto

Sitio web institucional del IFTS N.º 12 (2026). Frontend en **React 19 + Vite + TypeScript
strict + Tailwind CSS v4**, alineado al contrato `fe-architect-scaffold`. Se completó la
**Fase 1 (Andamiaje)**: estructura base del proyecto, scripts `lint`/`build`/`test` en verde,
tag **v1.0.0**, mergeada a `develop`. Se completó la **Fase 2 (Base)**: `api/client.ts` con
interceptor, AuthContext/ProtectedRoute preparados, `constants/mock-data.ts` con mocks
provisionales y placeholders de Moodle/inscripción, tag **v1.1.0**. Se completó la
**Fase 3 (Componentes reutilizables)**: `components/ui/` (Button, CardCarrera, CardNoticia,
FaqAcordeon, AccesosRapidos), `components/layout/` (Header+Nav, Footer, Portada) integrados en el
layout base, tokens de color 90/10 y helper `cn`, tag **v1.2.0**. La Home aún usa placeholders;
no hay consumo de API real. Se completó la **Fase 4 (Home navegable)**: HomePage con portada,
accesos rápidos, carreras, slider de novedades, comunidades y FAQ usando los mocks provisorios;
se sumaron los componentes `ui/SliderNoticias` (carrusel accesible, sin librerías) y
`ui/Comunidades`; CTA de Moodle e inscripción visibles solo cuando exista URL oficial; tag
**v1.3.0**. Sigue sin consumo de API real. Se completó la **Fase 5 (Cierre y documentación)**:
checklist final en verde, actualización de la propuesta tecnológica al estado real, acta de
decisiones, agenda de la reunión del lunes 31/08 y dependencias por equipo; tag **v1.4.0**.
Las 5 fases del plan inicial están cerradas; quedan bloqueos multi-equipo y la reunión del lunes.

## 2. Arquitectura

- Frontend SPA con estructura de carpetas estricta del contrato: `api/` (única capa que conoce
  endpoints), `components/{ui,layout}`, `pages/`, `hooks/`, `contexts/`, `routes/`,
  `types/api` (espejo del backend), `types/domain`, `utils/`, `constants/`, `styles/`.
- Componentes presentacionales solo reciben props tipadas, sin llamadas HTTP ni estado global.
- Errores HTTP centralizados en interceptor global de Axios (un solo lugar),
  sin `try/catch` dispersos.
- Tipado estricto, `any` prohibido (tsconfig en `strict`).
- Estado global: Context API (no Redux); datos de API futuros con TanStack Query v5.
- Páginas placeholder por sección: Home, Carreras, Ingresantes, Estudiantes, Docentes,
  Tutorías, Institucional, Noticias, FAQ, Contacto + 404.

## 3. Entidades / Modelos de dominio

- `UsuarioSesion` (`contexts/AuthContext.tsx`) — estructura de sesión preparada para auth futura.
- `ApiErrorResponse` (`types/api/error.types.ts`) — forma estándar de error del backend
  (`error`, `mensaje`, `usuario_id?`).

No hay más entidades: tipos de dominio pendientes de contratos del backend.

## 4. Casos de uso / Servicios implementados

- [x] Navegación entre secciones placeholder (AppRouter).
- [x] AuthContext y ProtectedRoute **preparados** (sin login real; el backend no lo soporta).
- [x] `constants/mock-data.ts` — mocks provisionales tipados (carreras, noticias, FAQ,
  accesos rápidos, comunidades) marcados para validar con Análisis.
- [x] Componentes reutilizables presentacionales: Header+Nav, Footer, Portada, CardCarrera,
  CardNoticia, FaqAcordeon, AccesosRapidos, Button (con tests).
- [x] Home navegable (HomePage): portada, CTA de campus/inscripción (visible solo con URL),
  accesos rápidos, carreras, slider de novedades, comunidades, FAQ. Con `SliderNoticias`
  (carrusel accesible) y `Comunidades` (con tests).
- [ ] Carreras, noticias, FAQ, etc. con contenido real — bloqueado por contratos de Análisis/Backend.

## 5. Endpoints / Interfaces expuestas

| Método | Ruta | Descripción | Estado |
|---|---|---|---|
| — | — | Tabla oficial de endpoints vacía; **prohibido inventar**. Ningún consumo de API. | ⛔ bloqueado (Backend) |

## 6. Infraestructura / Integraciones

- Frontend se entrega como **build estático** (`dist/`) para servir desde Nginx en un VPS
  independiente del Moodle (Plan B). Detalle en `docs/frontend/propuesta-tecnologica.md`.
- URLs de Moodle e inscripción en `src/constants/enlaces.ts` como **placeholders vacíos** hasta
  recibir las oficiales de IFTS/Dirección.
- Variables de entorno: ninguna aún (por definir `API_BASE_URL` con Backend/Infra).

## 7. Pendientes / TODO conocidos

- **Fase 2** — Base **completada** en `feature/fase-2-base` (types de dominio + mocks).
- **Fase 3** — Componentes reutilizables **completada** en `feature/fase-3-componentes`.
- **Fase 4** — Home navegable **completada** en `feature/fase-4-home` (slider accesible,
  comunidades, secciones de Home con mocks); mergeada a `develop` (`5afc13d`) y tag `v1.3.0`
  pusheado.
- **Fase 5** — Cierre y documentación **completada** en `feature/fase-5-cierre` (propuesta
  tecnológica al día, acta de decisiones, agenda de reunión del lunes, dependencias). Falta
  decidir merge a `develop`.
- Pendientes multi-equipo para la reunión del lunes 31/08: minuta V2 de Análisis, wireframes
  UX/UI, contratos de API Backend, confirmaciones de Infra/Dirección y URLs oficiales de
  Moodle/inscripción (`docs/frontend/dependencias-equipos.md`).

## 8. Decisiones y convenciones vigentes

- Responder y commiteár **siempre en español rioplatense**; Conventional Commits con scope en
  minúscula; commits atómicos.
- Prohibido trabajar sobre `main`/`develop`; ramas `feature/` desde `develop`.
- Regla **dura** de versionado por fases: al cerrar fase, commits atómicos + tag anotado semver
  (menor por fase, `v1.0.0` → Fase 1) y **push solo con aprobación explícita**
  (`.opencode/rules/versionado-fases.md`).
- No inventar endpoints, campos, textos ni contenido institucional; la Home usa mocks marcados
  como provisorios.
- Stack fijado y documentado en `docs/frontend/propuesta-tecnologica.md`; backend de referencia
  Python/Flask + Gunicorn + Nginx + PostgreSQL (Plan B).
- `docs/driveFrontend/` no se versiona (gitignored).