# Decisiones Técnicas — Sitio Web Institucional IFTS N.º 12

Fecha: 2026-09-18 · Estado: borrador

## Resumen

Las decisiones técnicas del frontend se alinean con el contrato `fe-architect-scaffold`,
la propuesta técnica del equipo (2026) y la respuesta formal del backend (15/09/2026). Se
adopta React 19 + Vite + TypeScript strict + Tailwind CSS v4 con capa única de acceso a API
(`api/`), errores HTTP centralizados en interceptor de Axios, y despliegue como build
estático servido por Nginx en un VPS independiente del Moodle (plan B). Las decisiones de
backend (Python/Flask, PostgreSQL, Gunicorn, Docker Compose) y las del contrato de API son
de referencia para el frontend.

## 1. Stack tecnológico

### 1.1 Frontend (implementado)

| Componente | Tecnología | Motivo |
|---|---|---|
| Framework | React 19 | Estándar de la industria; `use()`, Actions y mejoras de Suspense |
| Build | Vite | Rápido, configuración mínima, build estático de producción |
| Lenguaje | TypeScript (strict) | Tipado fuerte; prohibido `any` |
| Router | React Router v7 | Sucesor de v6; rutas tipadas de frontend |
| HTTP client | Axios | Interceptores y manejo de errores centralizado |
| Estado de API | TanStack Query v5 | Cache, refetch y estados de carga/error |
| Estado global | Context API + useReducer | Simple, sin dependencias extra (YAGNI) |
| Validación | Zod | Esquemas de formularios y validación de respuestas en el borde |
| Estilos | Tailwind CSS v4 | Config en CSS nativo (`@theme`), base visual consistente |
| Linting/Formato | Biome | Reemplaza ESLint + Prettier en un binario |
| Testing | Vitest + React Testing Library | Alineado con Vite |

> Tabla 1. Stack tecnológico del frontend (fuente: Propuesta Tecnológica, 2026).

### 1.2 Backend de referencia (confirmado por el equipo de Backend)

| Componente | Tecnología |
|---|---|
| Lenguaje y framework | Python / Flask |
| Base de datos | PostgreSQL |
| Servidor WSGI interno | Gunicorn |
| Contenedores | Docker (Docker Compose) |
| Versionado de API | Prefijo `/api/` (sin `/api/v1/`) |

> Tabla 2. Stack de backend confirmado el 15/09/2026 (Respuesta del Backend, 2026).

## 2. Estructura de carpetas (implementada)

La estructura sigue el contrato `fe-architect-scaffold` (`api/`, `components/{ui,layout}`,
`pages/`, `hooks/`, `contexts/`, `routes/`, `types/api`, `types/domain`, `utils/`,
`constants/`, `styles/`). La única capa que conoce endpoints es `src/api/` (client +
`endpoints.ts` + `services/`). Los componentes presentacionales solo reciben props tipadas,
no hacen llamadas HTTP ni manejan estado global.

## 3. Contrato de API (reglas para el frontend)

| Tema | Decisión |
|---|---|
| Fuente de verdad de endpoints | `docs/04_user_stories/HU-XX/hu_xx_api.md` por historia de usuario (ver skill `fe-architect-scaffold`); rutas base confirmadas en `documentacion/driveFrontend/04_backend/respuesta.md` |
| Prefijo de rutas | `/api/` (sin `/api/v1/`) |
| Autenticación | JWT en `Authorization: Bearer <token>`; token `{ sub, email, rol, exp }` (login real atado a entrega 3 de Backend) |
| Roles propuestos | ADMIN, EDITOR, EDITOR_NOTICIAS 🟡 (a validar con Análisis Funcional) |
| Paginación | Query params `?page=1&limit=10` en listados largos |
| Errores | JSON estandarizado `{ "error": { "code", "message", "details" } }`, manejado en interceptor global de Axios |
| CORS | `http://localhost:5173` en desarrollo; dominio otorgado por Infra en producción |
| DTOs exactos | Pendientes de la tabla Swagger/OpenAPI (entrega 2 de Backend); hasta entonces se usan solo campos documentados y se marcan ⏳ |

> Tabla 3. Contrato de API aplicable al frontend (fuente: Respuesta del Backend, 2026;
> Auditoría de Backend, 2026).

## 4. Arquitectura de despliegue (Plan B)

El frontend se entrega como build estático (`dist/`) servido por Nginx, con terminación
HTTPS (Let's Encrypt) y redirección 80→443. El backend corre Python/Flask con Gunicorn y
PostgreSQL en el mismo VPS, independiente del Campus Moodle. Requisitos mínimos del VPS:
Ubuntu Server LTS, Python 3.10+, Nginx ≥ 1.18, PostgreSQL 14+, Docker Engine 24.0+
(Propuesta Tecnológica, 2026).

## 5. Variables de entorno (frontend)

| Variable | Uso | Estado |
|---|---|---|
| `API_BASE_URL` | URL base del backend (testing local en Docker) | 🟡 La provee Backend |
| `VITE_MOODLE_URL` | URL oficial del Campus Virtual Moodle | 🔵 IFTS/Dirección; fallback vacío en `.env` |
| `VITE_INSCRIPCION_URL` | URL oficial de inscripción del GCBA | 🔵 IFTS/Dirección; fallback vacío en `.env` |

> Tabla 4. Variables de entorno confirmadas por Backend el 15/09/2026 (Respuesta del
> Backend, 2026). Pendiente de frontend: crear `.env.example` y migrar `enlaces.ts` y
> `API_BASE_URL` a `import.meta.env` (BE-A9, INF-G1/G2).

## 6. Decisiones pendientes o en revisión

| Decisión | Estado |
|---|---|
| Confirmación de `/api/contacto` POST | 🔵 No confirmado por Backend (BE-A6) |
| Endpoint de búsqueda global | 🔵 Pendiente de Backend; el buscador actual filtra contenido local |
| ORM y rate limiting | 🔵 No respondidos por Backend (BE-A14) |
| Roles definitivos | 🟡 Validación con Análisis Funcional (BE-A7) |
| URLs oficiales Moodle/inscripción | 🔵 IFTS/Dirección |

## Referencias

Equipo de Frontend. (2026). Propuesta tecnológica — Frontend e Infraestructura. `documentacion/frontend/propuesta-tecnologica.md`.

Equipo de Backend. (2026). Respuesta a definiciones técnicas formales. `documentacion/driveFrontend/04_backend/respuesta.md`.

Equipo de Frontend. (2026). Auditoría de Backend. `docs/06_audits/audit_2026-09-15-backend.md`.

Opencode. (2026). Skill fe-architect-scaffold. `.opencode/skills/fe-architect-scaffold/SKILL.md`.