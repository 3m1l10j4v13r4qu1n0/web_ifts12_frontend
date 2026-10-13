---
fase: fase-9
---

# Estado del proyecto — IFTS N.º 12 (frontend)

> Snapshot operativo para el agente al iniciar cada sesión. No es acumulativo: se
> sobrescribe al cerrar sesión con aprobación previa. No dupliques contenido de
> specs ni repitas el roadmap completo. El detalle técnico vigente vive en
> `docs/02_technical/estado_implementacion.md`.

## Fase actual del roadmap

Fase 9

_(Fase 9 = auditoría del código fuente del backend y **primer consumo real de API**.
Se leyó `~/Descargas/backend_ifts12/` línea por línea y, con lo verificado, el frontend pasó a
leer carreras y novedades del backend. Cierra la Fase 8, que había dejado el sitio 100% en
mocks.)_

## Qué está construido

- SPA React 19 + Vite + TypeScript strict + Tailwind v4 con `npm run lint · build · test` en verde
  (**118 tests**, antes 29).
- Home navegable según el **Mapa del Sitio V2** (9 ítems de menú + buscador global en el header),
  portada con carrusel institucional, footer V2, secciones de Carreras, Ingresantes,
  Estudiantes, Tutorías, Docentes, Institucional, Noticias, FAQ y Contacto, más rutas de detalle
  `/carreras/:id` y `/noticias/:id` y 404. La **portada de la Home siempre se muestra** (título +
  subtítulo institucionales); el set de novedades del carrusel muestra un **skeleton** mientras
  carga y solo se ve con datos del backend (14/10/2026).
- **Consumo real de API para carreras y novedades** (02/10/2026), contra `GET /api/carreras` y
  `GET /api/novedades`:
  - `src/api/endpoints.ts` con `VITE_API_BASE_URL` (fallback `localhost:5000`) y solo las 5 rutas
    que existen en `app.py`.
  - DTOs + esquemas Zod derivados de `models.py`: `carrera.types.ts`, `novedad.schema.ts`.
  - Servicios `carrera.service.ts` y `novedad.service.ts`, única capa que conoce endpoints.
  - Hooks `useCarreras` / `useNovedades` con TanStack Query (`staleTime` 5 min y 2 min).
  - Consumen API: `CarrerasPage`, `NoticiasPage`, `CarreraDetallePage`, `NotaCompletaPage`, las
    secciones de carreras y novedades de la **Home**, y el **buscador global**.
  - Estados de carga, error con reintento y vacío en las cuatro vistas. El mensaje de error lo
    produce el interceptor global de `src/api/client.ts`, no el componente (RN-13).
- Resto del sitio **sigue con datos simulados** en `src/constants/mock-data.ts`.
- HU-01 especificada y **actualizada contra el código** en `docs/04_user_stories/HU-01/`.
- **Correcciones de UX/UI y Frontend** especificadas en Capa 1
  (`docs/01_global/correcciones_ux_ui_frontend.md`, 08/10/2026): 9 bloqueantes (B1–B9), 12
  importantes (I1–I12) y 7 mejoras (M1–M7) de la auditoría UX/UI del 07/10, cada una con criterio
  de aceptación. Pendiente de priorización/implementación.
- **Revisión del consumo de API (08/10/2026):** los helpers del buscador se renombraron
  (`coincideTexto` / `coincideNullable`); el footer combina el horario confirmado
  "exclusivamente nocturno" (RF-22) con las modalidades reales del backend (Presencial,
  Híbrida y a distancia), absorbido por **RN-07** (`reglas_negocio.md`) y el contrato. Queda en
  `inbox/` el feedback sobre el guard de `contenido` en `NotaCompletaPage` (depende de una
  fuente de verdad de Backend/Contenidos).
- Contrato de API reescrito sobre el código fuente: `docs/02_technical/contrato_api_backend.md`
  (§3.1 DTOs con línea, §3.2 errores reales, §3.3 lo que no existe).
- Anexo de auditoría del backend en
  `documentacion/driveFrontend/04_backend/deudas_codigo_backend_2026-10-02.md`: 15 hallazgos
  **BE-E01**–**BE-E15** (no versionado, vive en el Drive).
- **Evidencia del ticket 0000010** (01/10/2026) sigue vigente: 13 rutas verificadas en navegador,
  15 capturas en `documentacion/screenshots/`.
- Cinco auditorías cerradas en `docs/06_audits/`.

## Decisiones activas (últimas 3-5)

- **Jerarquía de fuentes del contrato invertida (decisión del 02/10/2026):** **el código fuente
  manda**. `app.py` / `models.py` > `respuesta.md` (15/09) > README (01/10). El código es lo único
  verificable sin esperar una respuesta de Backend. Esto resuelve P1 y P7 por observación, y
  contradice la decisión del 01/10 que los ponía por debajo de `respuesta.md`.
- **El backend recibido es un prototipo, no la entrega pactada.** Se consume igual para no
  bloquear el avance del frontend, pero el alcance se limita a lo verificable: 5 endpoints de 16.
- **Detalle sin endpoint de detalle.** `GET /api/carreras/:id` y `/api/noticias/:id` no existen,
  así que el detalle se resuelve por slug contra la lista completa (misma consulta cacheada). El
  slug se deriva del `nombre`/`titulo` en un mapper, porque el backend no expone slug.
- **Un endpoint no documentado en el código se trata como inexistente.** No se promete ninguna de
  las 11 rutas restantes mientras Backend no las implemente.
- **Sistema documental logsayer (5 capas), CLI v0.9.0.** Verificación con `logsayer check` y
  `logsayer process check`. Índice de memoria generado con `logsayer memory index`.
- **Rutas en inglés, contenido en español.** La fuente de verdad de endpoints sigue siendo **por
  historia de usuario**: `docs/04_user_stories/HU-XX/*_api.md`.
- **Mapa del Sitio V2 manda en navegación** (9 ítems + buscador). Tensión **AF-A6 abierta**:
  Análisis validó 7 accesos rápidos y el V2 tiene 9 (incluye SIU) — falta cierre con UX/UI.

## Bloqueos abiertos (no resolver sin fuente)

- **URL del backend en el entorno de testing (P9)** → bloquean el build de despliegue. `.env.example`
  lo tiene marcado con `@TODO`; hoy solo hay `localhost:5000`.
- **Las 11 rutas restantes** (`/faqs`, `/slider`, `/calendario`, `/docentes`, `/autoridades`,
  `/tutorias`, `/becas`, `/horarios`, `/bedeles`, `/auth/logout`, `/auth/me` + CRUD) → sin backend
  no hay contrato. Esas páginas siguen en mocks. **Dueño: Grupo 4.**
- **11 hallazgos de seguridad del backend** (BE-E01–BE-E06, BE-E10): `debug=True` en `0.0.0.0`,
  secretos JWT hardcodeados, CORS `*`, ninguna ruta con `jwt_required`, `activo` no verificado en
  el login, credencial de admin en claro. **No bloquean el frontend**, pero impiden considerar el
  backend apto para producción. **Dueño: Grupo 4.**
- **SQLite vs PostgreSQL (P4)** → si el entorno de testing corre SQLite, los tipos del DTO pueden
  diferir. Hoy verificado sobre SQLite.
- **Nombre del token (🔴):** el login real devuelve `token`, el cliente lee `auth_token`
  (`src/api/client.ts`). Sin impacto mientras no haya login; hay que alinearlo cuando exista.
- **Plazos vencidos (P5):** Swagger (~22/09) y DTOs (~29/09) no llegaron. El frontend compensó
  con DTOs derivados del código, pero no es una entrega de Backend.
- URLs oficiales de Moodle, inscripción y SIU (IFTS/Dirección) → bloquean `enlaces.ts`. Los accesos
  se muestran atenuados.
- `/api/contacto`: el endpoint existe (`P3` resuelta) pero el formulario sigue validando en local
  sin enviar. Falta decisión de alcance, no de contrato.
- Tensión de accesos rápidos 7 vs 9 (AF-A6) y contenidos reales de Análisis (🔵/❌).

### Estado de las deudas del ticket 0000010

Detalle con dueño y qué se necesita de vuelta en
`documentacion/driveFrontend/deudas_bloqueantes_2026-10-01.md` (no versionado, en el Drive).

| ID | Deuda | Dueño | Estado 02/10/2026 |
|:---|:---|:---|:---|
| DB-01 | Tabla oficial de endpoints (parámetros, bodies, códigos) | Grupo 4 | 🟡 **Avanzada**: hay tabla de los 5 endpoints reales, verificada con línea. Faltan las 11 rutas. |
| DB-02 | Esquemas JSON exactos (DTOs) | Grupo 4 | 🟢 **Resuelta de hecho**: DTOs derivados de `models.py` + Zod + 18 tests. Falta que Backend los confirme. |
| DB-03 | Alcance de la administración (WF 13, 14, 15) | Grupo 1 | 🔵 Abierta. Sin avance. |
| DB-04 | Definición de la búsqueda global (WF 12): ¿widget o página? | Grupo 2 | 🔵 Abierta. El buscador existe como widget y ya usa datos reales; falta la decisión formal. |
| DB-05 | HUs de las secciones que solo tienen HU-01 | Frontend | 🔵 Abierta. Sin avance. |
| DB-14 | 404 de `/carreras/:id` y `/noticias/:id` con `:id` inexistente | Frontend | 🟢 **Resuelta**: el detalle distingue "carrera inexistente" del 404 de ruta, con tests. |

## Verificación

- Frontend: `npm run lint` · `npm run build` · `npm run test` (118 tests).
- Sistema documental: `logsayer check` · `logsayer process check` · `logsayer memory index`.
- Consumo verificado **en navegador** (Firefox, `localhost:5173`) contra un servidor que replica
  la serialización de `app.py:62-92` leyendo de `instance/ifts12.db`: listado, detalle, buscador,
  y los tres estados (con datos, con backend caído, y reintento funcionando).
- **Cotejo con la DB real:** 3 carreras (`id` 1–3) y 2 novedades (`id` 1–2) leídas de
  `instance/ifts12.db`. Los nombres reales (`Tecnicatura Superior en Análisis de Sistemas`) **no
  coinciden** con los mocks del sitio (`Gestión Parlamentaria`), por eso se quitaron los mocks de
  estas dos secciones.

## HUs cerradas desde la última auditoría

0