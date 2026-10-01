# Auditoría de Backend — README de `backend_ifts12` vs. contrato vigente

> Área: **Backend (Grupo 4)** · Proyecto Sitio Web Institucional IFTS N.º 12 — 2026
> Fecha de auditoría: **01/10/2026** · Revisor: Frontend (enlace transversal)
> Fuente auditada: README de instalación y ejecución del repositorio `backend_ifts12`, recibido
> el 01/10/2026 y archivado en `inbox/_done/readme_backend_ifts12.md`
> Contraste contra: `documentacion/driveFrontend/04_backend/respuesta.md` (15/09/2026),
> `documentacion/driveFrontend/04_backend/grupo_4_backend.md`,
> `docs/04_user_stories/HU-01/hu_01_api.md` y `docs/06_audits/audit_2026-09-15-backend.md`
> Estado real relevado: `src/` (sin cambios en esta auditoría) y `docs/02_technical/`

## 1. Resumen ejecutivo

El 01/10/2026 el equipo de Backend remitió el README del repositorio `backend_ifts12`: una guía
de arranque local con `venv`, `pip install`, `seed.py` y `python app.py` en
`http://localhost:5000`, que incluye una tabla de **5 endpoints** y **ningún esquema de datos**.

El documento es posterior a la respuesta formal del 15/09/2026, pero su **alcance es
sustancialmente menor**: documenta 2 de las 16 rutas confirmadas (y ninguna de las 12 rutas
públicas que la Home y el resto de las secciones necesitan). Por eso se decidió que **no
reemplaza** a `respuesta.md` como fuente de verdad, y que ni `hu_01_api.md` ni
`src/api/endpoints.ts` se modifican hasta que Backend responda.

Lo que el README sí aporta es valor: confirma el stack Flask (coincidente con BE-A11) y **resuelve
la pregunta 4 de §9 de `grupo_4_backend.md`**, que estaba en ❌ *sin responder*: el ORM es
`Flask-SQLAlchemy`. Con eso BE-A14 queda parcialmente cerrado; el rate limiting sigue sin
respuesta.

El README también introduce **una discrepancia de alto impacto**: lista `GET /api/novedades`
mientras la fuente vigente documenta `GET /api/noticias` (BE-A2). Si se hubiera escrito la ruta
del README en `endpoints.ts`, la Home habría fallado en producción.

Como aporte, el README documenta `POST /api/contacto`, que estaba 🔵 sin confirmar desde el
15/09/2026 (BE-A6), aunque sin body ni estructura de errores, por lo que sigue sin poder
implementarse.

Se levanta **un hallazgo de seguridad**: el README publica el usuario administrador por defecto
con su contraseña en texto plano, junto con un comando de prueba. Desde Frontend no se reproduce
esa credencial en ningún documento.

## 2. Consistencia por área (✅ / 🟡 / ❌ / 🔵)

| Área | Estado | Comentario |
|---|---|---|
| Stack (Python/Flask) | ✅ | Confirma el stack ya validado (BE-A11) |
| Prefijo de rutas `/api/` | ✅ | Coincide con BE-A1 |
| `GET /api/carreras` | ✅ | Coincide con el mapa confirmado |
| `POST /api/auth/login` | ✅ | Coincide con el mapa confirmado |
| Autenticación JWT | ✅ | `Flask-JWT-Extended`; coherente con Bearer (BE-A7) |
| **ORM** | ✅ **Nuevo** | **`Flask-SQLAlchemy`** → cierra la pregunta 4 de §9 (BE-A14 parcial) |
| Ruta de noticias | 🔴 **Conflicto** | README dice `/api/novedades`; la fuente vigente dice `/api/noticias` (BE-A15) |
| Alcance del mapa de rutas | ❌ | 5 endpoints en el README contra 16 confirmadas (BE-A16) |
| `/api/contacto` POST | 🔵 | Aparece en el README, sin body ni errores documentados (BE-A17) |
| Persistencia | 🔵 | `seed.py` sobre SQLite contra PostgreSQL confirmado (BE-A18) |
| Forma de ejecución | 🔵 | `python app.py` (dev) contra Gunicorn + Docker Compose (BE-A19, BE-A23) |
| Swagger/OpenAPI + Postman | 🔵 | No mencionado; entrega 2 vencida ~22/09 (BE-A19) |
| DTOs / esquemas JSON | ⏳ | Ausentes por completo; entrega 3 vencida ~29/09 (BE-A21) |
| Paginación `?page&limit` | ✅ | No mencionada en el README; sigue vigente lo confirmado (BE-A10) |
| CORS | 🟡 | `Flask-Cors` presente; falta confirmar contra `localhost:5173` (BE-A12) |
| Variables de entorno | 🔵 | No mencionadas; siguen vigentes las 3 confirmadas (BE-A9) |
| CRUD administrativo | 🔵 | No mencionado; sigue lo confirmado en BE-A8 |
| Rate limiting | ❌ | Sigue sin responder (BE-A14) |
| `GET /api/health` | 🔵 | No figura en el mapa confirmado (BE-A20) |
| Credenciales de seed | ⚠️ | Contraseña de admin en texto plano (BE-A22) |

## 3. Hallazgos

| ID | Severidad | Hallazgo | Acción tomada / pendiente |
|---|---|---|---|
| BE-A15 | **Alta** | El README lista `GET /api/novedades`; la fuente vigente (`respuesta.md` §2, BE-A2) documenta **`/api/noticias`** y `/api/noticias/<id>`. Es la ruta que consume la Home (HU-01). | 🔵 Registrado como **P1** en la consulta a Backend. `hu_01_api.md` y `endpoints.ts` **no se modifican**. Riesgo de producción si se acepta el README sin confirmar. |
| BE-A16 | **Alta** | El README documenta 5 endpoints; la fuente vigente confirma 16 rutas (13 GET públicos + 3 de auth). Faltan las 12 rutas públicas que la Home y el resto de las secciones necesitan, entre ellas `/api/slider`, `/api/noticias` y `/api/faqs?segmento=X`. | 🔵 Registrado como **P2**. Si el alcance real se redujo a 5 endpoints, el sitio no tiene de dónde tomar datos y hay que renegociar alcance con Grupo 1. |
| BE-A17 | Media | `POST /api/contacto` aparece en el README pero no estaba confirmado (BE-A6, 🔵 desde el 15/09). Sin body, validaciones ni estructura de errores documentados. | 🔵 Registrado como **P3**. El README es indicio, no confirmación: no se implementa el servicio del formulario de contacto. |
| BE-A18 | Media | `seed.py` crea las tablas en **SQLite**; la fuente vigente confirma **PostgreSQL** (BE-A11), y el Plan B de infraestructura asume PostgreSQL 14+. | 🔵 Registrado como **P4**. Necesario para fijar `API_BASE_URL` y el CORS del entorno de testing. |
| BE-A19 | Media | El README no menciona Gunicorn, Docker Compose, paginación, Swagger/OpenAPI ni variables de entorno. Al 01/10/2026 vencieron las entregas 2 (~22/09) y 3 (~29/09), y la 4 (~06/10) vence esta semana. | 🔵 Registrado como **P5**. Se pide a Backend el estado actualizado de cada entrega antes de que el frontend avance con la capa `api/` real. |
| BE-A20 | Baja | `GET /api/health` no figura entre las 16 rutas confirmadas. | 🔵 Registrado como **P6**. No se consume hasta estar en el mapa oficial. |
| BE-A21 | Baja | El README no incluye ningún esquema ni ejemplo de respuesta; los DTOs de HU-01 siguen marcados ⏳. | 🔵 Registrado como **P7**. Se pide fecha estimada de la tabla Swagger y, si es posible, adelantar los DTOs de carreras y noticias. |
| BE-A22 | Media | ⚠️ **Seguridad:** el README publica el usuario administrador por defecto con su contraseña en texto plano, más un comando `curl`/`Invoke-RestMethod` de prueba. Una credencial fija en el repositorio es riesgo en cualquier entorno donde corra el seed. | ✅ **La contraseña no se reproduce** en ningún documento de Frontend. 🔵 Registrado como **P8**: se pide que se genere por variable de entorno o sea rotable en el primer arranque. |
| BE-A23 | Info | El README documenta `python app.py` en `localhost:5000` (servidor de desarrollo de Flask), mientras el contrato de entrega es Gunicorn + Docker Compose. | 🔵 Registrado como **P9**. Se pide la URL y el puerto del entorno de testing. |
| BE-A24 | Baja | **Novedad positiva:** el README confirma el ORM **`Flask-SQLAlchemy`**, que responde la pregunta 4 de §9 de `grupo_4_backend.md` (que estaba ❌ *sin responder*) y cierra parcialmente BE-A14. | ✅ Marcado como ✅ en `grupo_4_backend.md` §6.2 y §9. El rate limiting (pregunta 7) sigue ❌ porque el README no lo cubre. |

## 4. Brechas resumidas

| Severidad | Total | Responsable |
|---|---|---|
| **Alta** | 2 nuevas (BE-A15, BE-A16) + 3 previas resueltas | Backend (respondiendo P1, P2) |
| **Media** | 4 nuevas (BE-A17, BE-A18, BE-A19, BE-A22) + 4 previas | Mixto: Backend + seguridad |
| **Baja** | 3 (BE-A20, BE-A21, BE-A24) | Backend |
| **Info** | 1 (BE-A23) | Backend |

> Estado acumulado: las brechas **Alta** del 15/09/2026 (BE-A1, BE-A5, BE-A8) siguen resueltas;
> las **Alta** nuevas son BE-A15 y BE-A16.

## 5. Cambios aplicados en esta auditoría

**Drive (no versionado, `.gitignore:273`)**

- **Nuevo:** `documentacion/driveFrontend/04_backend/preguntas_abiertas_2026-10-01.md` — consulta
  formal con las 9 preguntas abiertas (P1–P9), en el estilo de `grupo_4_backend.md`
  (Qué es / Por qué lo necesitamos / Qué respondan), con jerarquía de fuentes declarada.
- `documentacion/driveFrontend/04_backend/grupo_4_backend.md`:
  - §6.2 — fila ORM: `SQLAlchemy (presumiblemente)` → **`Flask-SQLAlchemy` ✅** (BE-A24).
  - §9 pregunta 4 — ❌ *sin responder* → ✅ **`Flask-SQLAlchemy`** (BE-A24).
  - Encabezado — nota de provenance del 01/10/2026 que enlaza la consulta nueva.
  - Referencia rota corregida: el informe de auditoría apuntaba a
    `docs/frontend/auditoria-backend.md`, ruta inexistente → `docs/06_audits/audit_2026-09-15-backend.md`.

**Repositorio (versionado)**

- **Nuevo:** `docs/02_technical/contrato_api_backend.md` (Capa 1) — contrato derivado del README,
  con la jerarquía de fuentes, lo que confirma, lo que no cubre, las divergencias P1–P9 y el
  impacto en el frontend.
- **Nuevo:** este informe.

**No se tocó**

- `src/` — `endpoints.ts` sigue sin poblar. Ningún endpoint del README se registró.
- `docs/04_user_stories/HU-01/hu_01_api.md` — la fuente de verdad por HU sigue con
  `/api/noticias` (BE-A15 abierto).
- `docs/02_technical/decisiones_tecnicas.md` — la tabla de pendientes ya cubre `/api/contacto`,
  ORM y rate limiting; los hallazgos nuevos no obligan a modificarla todavía.

## 6. Documento del grupo actualizado

`documentacion/driveFrontend/04_backend/grupo_4_backend.md` (fuente de verdad compartida, **NO
versionada**):

- §6.2 y §9 actualizados con el ORM confirmado (BE-A24).
- Nota de provenance del 01/10/2026 con el alcance real del README y el enlace a la consulta.
- §1.2 **sin cambios**: la tabla de endpoints mantiene `/api/noticias` mientras BE-A15 está
  abierto.
- §9 pregunta 7 (rate limiting) **sin cambios**: sigue ❌ sin responder.

## 7. Checklist accionable

- [ ] **Inmediato:** no escribir `/api/novedades` en `src/api/endpoints.ts` (BE-A15) — la fuente
  vigente dice `/api/noticias`.
- [ ] **Inmediato:** no reducir el mapa de endpoints a los 5 del README (BE-A16); las 12 rutas
  públicas siguen confirmadas.
- [ ] **Inmediato:** no reproducir ni usar la credencial de seed del README (BE-A22).
- [ ] **Enviar a Backend:** la consulta `preguntas_abiertas_2026-10-01.md` completa (P1–P9),
  priorizando P1, P2 y P5.
- [ ] **Al llegar la entrega 2 (Swagger/OpenAPI):** crear `endpoints.ts` y `types/api/` según los
  esquemas oficiales, no según el README.
- [ ] **Al llegar la entrega 3 (DTOs + Auth + GETs):** implementar login con Bearer y los servicios
  de la Home.
- [ ] **Al llegar la entrega 4 (seeders + errores):** mapear códigos de error en el interceptor de
  Axios (BE-A5) con mensajes por código.
- [ ] **Con Grupo 1:** si el alcance real se reduce a 5 endpoints (P2), renegociar qué datos muestra
  cada sección.
- [ ] **Con Infra/IFTS:** URL y puerto de testing para `API_BASE_URL` (P4, P9); URLs de Moodle e
  inscripción para completar `.env.example` (BE-A9).

## 8. Referencias

- Equipo de Backend. (2026). *Backend IFTS N.º 12 — Guía de instalación y ejecución* (README de
  `backend_ifts12`), recibido el 01/10/2026. `inbox/_done/readme_backend_ifts12.md`.
- Equipo de Backend. (2026). *Respuesta a definiciones técnicas formales* (15/09/2026).
  `documentacion/driveFrontend/04_backend/respuesta.md`.
- Equipo de Frontend. (2026). *Grupo 4 — Backend (Datos y APIs)*, actualizado el 01/10/2026.
  `documentacion/driveFrontend/04_backend/grupo_4_backend.md`.
- Equipo de Frontend. (2026). *Preguntas abiertas a Backend — a partir del README de
  `backend_ifts12`* (01/10/2026).
  `documentacion/driveFrontend/04_backend/preguntas_abiertas_2026-10-01.md`.
- Equipo de Frontend. (2026). *Auditoría de Backend — respuesta del equipo vs. estado del
  proyecto* (15/09/2026). `docs/06_audits/audit_2026-09-15-backend.md`.
- Equipo de Frontend. (2026). *Contrato de API del backend*.
  `docs/02_technical/contrato_api_backend.md`.
- Equipo de Frontend. (2026). *HU-01: Especificación de API — Home institucional pública*.
  `docs/04_user_stories/HU-01/hu_01_api.md`.