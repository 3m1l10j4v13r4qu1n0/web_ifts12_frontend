# Auditoría de Backend — respuesta del equipo vs. estado del proyecto

> Área: **Backend (Grupo 4)** · Proyecto Sitio Web Institucional IFTS N.º 12 — 2026
> Fecha de auditoría: **15/09/2026** · Revisor: Frontend (enlace transversal)
> Fuente auditada: `docs/driveFrontend/04_backend/respuesta.md` (definiciones técnicas
> formales del equipo de Backend)
> Estado real relevado: código actual en `develop` (rama `feature/auditoria-backend`),
> `src/`, `docs/frontend/` y `docs/estado_actual_proyecto.md`.

## 1. Resumen ejecutivo

El 15/09/2026 el equipo de Backend entregó su respuesta formal con el stack, el mapa de
endpoints públicos/auth/admin, autenticación JWT, paginación, estructura de errores, CORS,
variables de entorno y cronograma de entregas comprometido. El frontend quedaba bloqueado por
"contratos de API" desde la Fase 1; con esta respuesta se destraba parcialmente: ahora hay
**rutas confirmadas** para empezar a armar la capa `api/` real, aunque la implementación de
consumo depende de la entrega 3 (DTOs, Auth y GETs, 2 semanas) y la tabla Swagger (entrega 2,
1 semana).

El frontend ya estaba alineado en la mayor parte de las definiciones (cliente Axios con
Bearer, tipos de dominio, CORS de Vite, stack Plan B). Tres desvíos reales se detectaron en el
documento del grupo 4 (rutas `/api/v1/` vs `/api/`, `categoria` vs `segmento`, CRUD bajo
`/api/admin/` que no existe) y uno en código (`ApiErrorResponse` con forma de error distinta a
la confirmada), ya corregido en esta auditoría.

## 2. Consistencia por área (✅ / 🟡 / ❌ / 🔵)

| Área | Estado | Comentario |
|---|---|---|
| Stack y arquitectura (Flask, PostgreSQL, Gunicorn, Docker) | ✅ | Confirmado; coincide con Plan B y propuesta tecnológica (BE-A11) |
| Prefijo/versión de rutas (`/api/`) | ✅ | Confirmado; doc grupo 4 decía `/api/v1/` → corregido (BE-A1) |
| Endpoints públicos GET | ✅ | 16 rutas confirmadas; 8 nuevas para el doc del grupo (BE-A2) |
| Materias en detalle de carrera | ✅ | No hay endpoint separado; integradas en `/api/carreras/:id` (BE-A3) |
| FAQ con filtro por segmento | ✅ | `/api/faqs?segmento=X`; doc decía `categoria` → corregido (BE-A4) |
| Endpoint de contacto POST | 🔵 | No mencionado en la respuesta; requiere confirmación (BE-A6) |
| CRUD administrativo | ✅ | Directo sobre rutas administrables, sin `/api/admin/` (BE-A8) |
| Autenticación JWT (Bearer) | ✅ | Token `{ sub, email, rol, exp }` (BE-A7) |
| Roles (ADMIN, EDITOR, EDITOR_NOTICIAS) | 🟡 | Propuesta sujeta a validación con Grupo 1 (BE-A7) |
| Paginación | ✅ | `?page=1&limit=10` (BE-A10) |
| Estructura de errores | ✅/🟡 | JSON estandarizado confirmado; falta tabla de códigos (BE-A5) |
| CORS | ✅ | `localhost:5173` en dev; dominio de Infra en prod (BE-A12) |
| Variables de entorno | 🟡/🔵 | 3 confirmadas; Moodle/inscripción 🔵 IFTS (BE-A9) |
| Datos de prueba (seeders) | ⏳ | Comprometidos en entrega 4 (3 semanas) |
| Tabla oficial (Swagger/OpenAPI + Postman) | ⏳ | Entrega 2 comprometida (1 semana) |
| ORM y rate limiting | ❌ | No respondidos (preguntas 4 y 7 del grupo 4) |

## 3. Hallazgos

| ID | Severidad | Hallazgo | Acción tomada / pendiente |
|---|---|---|---|
| BE-A1 | Alta | El doc del grupo 4 usaba prefijo `/api/v1/` en todas las rutas; Backend confirmó **`/api/`** (sin versión en el path). Riesgo de propagar rutas equivocadas a `endpoints.ts`. | ✅ Tabla §1.2 del grupo corregida. Al poblar `endpoints.ts` usar `/api/...`. |
| BE-A2 | Alta | Rutas públicas confirmadas **ausentes en el doc** del grupo: `/api/slider`, `/api/calendario`, `/api/horarios`, `/api/docentes`, `/api/autoridades`, `/api/bedeles`, `/api/becas`, `/api/tutorias` (incluye el slider que la Home necesita). | ✅ Agregadas a la tabla §1.2 del grupo. |
| BE-A3 | Media | Backend no define `/api/carreras/:id/materias`; las materias vienen en el **detalle** de la carrera. | ✅ Documentado en §1.2. |
| BE-A4 | Media | FAQ confirmado como `/api/faqs?segmento=X`; el doc del grupo decía `/api/faq?categoria=X` (nombre plural y parámetro distinto). | ✅ Corregido en §1.2. |
| BE-A5 | **Alta** | Estructura de error confirmada: `{ "error": { "code", "message", "details" } }`. El tipo `ApiErrorResponse` (`src/types/api/error.types.ts`) usaba `{ error: string; mensaje; usuario_id? }`, incompatible. | ✅ Tipo corregido en esta auditoría (ver §5). Pendiente: tabla de códigos y mapeo en interceptor de Axios. |
| BE-A6 | Media | `/api/contacto` (POST) del pedido original **no fue confirmado** en la respuesta. | 🔵 Requiere confirmación de Backend o definirse como enlace/email. |
| BE-A7 | Media | JWT + token `{ sub, email, rol, exp }` confirmados; roles propuestos sujetos a validación con Grupo 1. El frontend ya envía `Bearer` desde `localStorage`. | ✅ Documentado en §4. El login real queda atado a la entrega 3. |
| BE-A8 | Alta | CRUD admin confirmado **directo sobre las rutas administrables** (`/api/noticias`, `/api/carreras`, `/api/faqs`, etc.); el doc del grupo proponía un prefijo `/api/admin/`. CRUD de usuarios no confirmado explícitamente. | ✅ Tabla §1.2 corregida. Usuarios queda 🟡. |
| BE-A9 | Media | Variables de entorno: **3 confirmadas** (`API_BASE_URL`, `VITE_MOODLE_URL`, `VITE_INSCRIPCION_URL`). Resuelve la duda INF-G2 de "¿3, 6 o 7?". Backend proveerá la URL de testing local. | ✅ Documentado en §8. Pendiente frontend: `.env.example` + migración a `import.meta.env` (INF-G1/G2). |
| BE-A10 | Baja | Paginación `?page=1&limit=10` confirmada. | Documentado; aplicar en query params cuando haya servicios. |
| BE-A11 | Baja | Stack confirmado (Python/Flask + PostgreSQL + Gunicorn + **Docker Compose**) coincidente con el Plan B. | Sin cambios. |
| BE-A12 | Baja | CORS dev `http://localhost:5173` — coincide con el puerto de Vite. | Sin cambios. |
| BE-A13 | Info | Cronograma de Backend comprometido: Swagger 1 sem, DTOs+Auth+GETs 2 sem, seeders+errores 3 sem, CRUD admin 4 sem. | §11 del grupo actualizado con plazos comprometidos. Ventana de integración real ≈ 2-3 semanas. |
| BE-A14 | Baja | ORM y rate limiting **no respondidos** por Backend (preguntas 4 y 7). El 429 de la tabla de errores sigue sin confirmación de rate limit. | Queda pendiente en el doc del grupo. |

## 4. Brechas resumidas

| Severidad | Total | Responsable |
|---|---|---|
| Alta (contrato en código/doc con forma incorrecta) | 3 (BE-A1, BE-A5, BE-A8) | Frontend (doc §1.2 + tipo) — resueltas |
| Media | 5 (BE-A3, BE-A4, BE-A6, BE-A7, BE-A9) | Mixto: Frontend corregido; BE-A6 → Backend |
| Baja / Info | 6 (BE-A2, BE-A10…BE-A14) | Mixto |

## 5. Cambios de código aplicados

- `src/types/api/error.types.ts` — `ApiErrorResponse` reescrito para reflejar el contrato
  confirmado `{ error: { code, message, details } }` (hallazgo BE-A5). Tipo sin uso previo en
  `src/` (verificado), cambio de bajo riesgo.

## 6. Documento del grupo actualizado

`docs/driveFrontend/04_backend/grupo_4_backend.md` (fuente de verdad, NO versionada):

- Estado de cada sección marcado con leyenda (✅/🟡/🔵/⏳).
- Tabla §1.2 reescrita con rutas `/api/...` confirmadas + 8 rutas nuevas + nota de CRUD directo.
- §3 con la estructura de error JSON confirmada.
- §4 JWT + roles + estructura del token confirmados.
- §8 tabla de variables (3 confirmadas).
- §9 preguntas respondidas por Backend marcadas.
- §11 cronograma con plazos comprometidos por Backend.

## 7. Checklist accionable

- [ ] **Inmediato:** no usar `/api/v1/` al poblar `src/api/endpoints.ts` (BE-A1) — esperar Swagger (entrega 2).
- [ ] **Inmediato:** si se avanza con `api/endpoints.ts`, registrar `/api/slider` para la Home (BE-A2).
- [ ] **Al llegar la entrega 3:** crear servicios y tipos `types/api/` según DTOs; implementar login con Bearer.
- [ ] **Al llegar la entrega 4:** mapear códigos de error en el interceptor de Axios (BE-A5) con mensajes por código.
- [ ] **Pedir a Backend:** confirmación de `/api/contacto` POST (BE-A6) y respuesta de ORM/rate limiting (BE-A14).
- [ ] **Con Grupo 1:** validar roles ADMIN/EDITOR/EDITOR_NOTICIAS (BE-A7).
- [ ] **Con Infra/IFTS:** URLs de Moodle e inscripción para completar `.env.example` y migrar `enlaces.ts`/`API_BASE_URL` a `import.meta.env` (BE-A9 / INF-G1/G2).

## 8. Referencias

- `docs/driveFrontend/04_backend/respuesta.md` — respuesta formal de Backend (15/09/2026).
- `docs/driveFrontend/04_backend/grupo_4_backend.md` — doc del grupo actualizado en esta auditoría.
- `src/api/client.ts`, `src/api/endpoints.ts`, `src/types/api/error.types.ts` — estado real del código.
- `docs/frontend/dependencias-equipos.md` §3 — dependencias de Backend (actualizado).
- `docs/estado_actual_proyecto.md` — foto de estado (actualizada en esta auditoría).