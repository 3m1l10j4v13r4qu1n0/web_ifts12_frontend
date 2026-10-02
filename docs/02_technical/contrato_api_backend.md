---
# Tags del índice de memoria (D13): el CLI las scaffoldea, el Mentat ajusta.
tags:
  - contrato
  - api
  - backend
---

# Contrato de API del backend

> Documento de Capa 1 — Especificación. Registra el contrato técnico derivado del README de
> instalación del repositorio `backend_ifts12`, recibido el 01/10/2026.

Fecha: 2026-10-01 · Estado: borrador

## Resumen

Este documento establece el contrato técnico vigente del backend del IFTS N.º 12 tomando como
punto de partida el README de arranque local (`backend_ifts12`). Deja explícito que ese README es
un **subconjunto** de lo ya confirmado en `respuesta.md` (15/09/2026): documenta 5 endpoints de
los 16 confirmados y no incluye esquemas de datos (DTOs). Mientras Backend no responda las
preguntas abiertas del 01/10/2026, la fuente de verdad de endpoints **no se modifica** y
`src/api/endpoints.ts` sigue sin cambios.

## Fuente

- Origen: `inbox/_done/readme_backend_ifts12.md` (recibido el 2026-10-01)

## Qué establece

**Alcance:** el estado actual conocido del contrato de API (endpoints declarados, stack de
ejecución local, divergencias y preguntas abiertas), marcando todo lo que falta documentar.

**Supuestos:**

- La jerarquía de fuentes es: `documentacion/driveFrontend/04_backend/respuesta.md`
  (15/09/2026) > `documentacion/driveFrontend/04_backend/preguntas_abiertas_2026-10-01.md` >
  el README de `backend_ifts12` (01/10/2026).
- El prefijo de rutas es `/api/` (sin `/api/v1/`), confirmado por Backend (BE-A1).
- La fuente de verdad de endpoints por historia de usuario sigue siendo
  `docs/04_user_stories/HU-01/hu_01_api.md`. Un endpoint que no está documentado en ninguna HU se
  trata como inexistente.

**Límites:**

- Este documento **no reemplaza** a `respuesta.md`. El README es una guía de arranque local, y es
  parcial por diseño.
- No se modifican `docs/04_user_stories/HU-01/hu_01_api.md` ni `src/api/endpoints.ts` hasta que
  Backend responda las preguntas abiertas.
- La contraseña del usuario administrador **no se reproduce** en este documento.
- No se inventan DTOs, cuerpos ni códigos de error que no estén documentados en alguna fuente.

## 1. Jerarquía de fuentes

| Fuente | Rol | Por qué |
|---|---|---|
| `04_backend/respuesta.md` (15/09/2026) | **Fuente de verdad del contrato** | Definiciones técnicas formales de Backend: stack, mapa completo de rutas, JWT, paginación, estructura de errores, CORS y variables de entorno. |
| `04_backend/grupo_4_backend.md` | Estado de grupo (pedido y estado) | Resume qué necesita Frontend y marca estados con la leyenda ✅/🟡/🔵/⏳. |
| `04_backend/preguntas_abiertas_2026-10-01.md` | Contraste entre fuentes | Detalla las 9 discrepancias (P1–P9) entre `respuesta.md` y el README. |
| `inbox/_done/readme_backend_ifts12.md` (01/10/2026) | **Fuente primaria de este documento** | Guía de instalación y ejecución. Parcial: 5 endpoints, ningún esquema. |
| `docs/04_user_stories/HU-01/hu_01_api.md` | Fuente de verdad por HU | Define los endpoints que consume la Home. No se modifica con este documento. |
| `docs/02_technical/decisiones_tecnicas.md` | Decisiones vigentes | Stack y contrato del frontend alineados al contrato de arquitectura. |
| `docs/06_audits/audit_2026-09-15-backend.md` | Auditoría previa | Hallazgos BE-A1 a BE-A14. |

> **Regla:** el README **no reemplaza** a `respuesta.md`. Es más reciente, pero de alcance menor.

## 2. Lo que el README confirma

| Tema | Qué confirma el README | Veredicto vs. fuente vigente |
|---|---|---|
| Lenguaje y framework | Python 3.10+ / Flask | ✅ Coincide con `respuesta.md` §1. |
| Prefijo de rutas | `/api/` (sin `/api/v1/`) | ✅ Coincide con BE-A1. |
| `GET /api/carreras` | Listado de tecnicaturas y planes de estudio | ✅ Coincide con el mapa confirmado. |
| `POST /api/auth/login` | Inicio de sesión para administradores | ✅ Coincide con la ruta confirmada. |
| Autenticación | `Flask-JWT-Extended` | ✅ Coincide con JWT Bearer (BE-A7). |
| **ORM** | **`Flask-SQLAlchemy`** | ✅ Responde la pregunta 4 de `grupo_4_backend.md` §9, que estaba sin responder (BE-A14). |
| CORS | `Flask-Cors` como dependencia | 🟡 Presente; falta confirmar contra `http://localhost:5173` (BE-A12). |
| Base de datos en el arranque local | **SQLite** (vía `seed.py`) | 🔵 Discrepa con **PostgreSQL** (`respuesta.md` §1, BE-A11). Ver **P4**. |
| Usuario administrador de seed | `seed.py` crea un admin por defecto | 🟡 Existencia confirmada; **contraseña no se reproduce** en este documento. Ver **P8**. |

## 3. Endpoints declarados en el README

| Método | Endpoint | Descripción (según README) | Estado vs. fuente vigente |
|---|---|---|---|
| **GET** | `/api/health` | Estado de salud del servidor | 🔵 No figura entre las 16 rutas confirmadas. Ver **P6**. |
| **GET** | `/api/carreras` | Listado de tecnicaturas y planes de estudio | ✅ Coincide con el mapa confirmado. |
| **GET** | `/api/novedades` | Noticias e información institucional | 🔵 **Discrepa**: la fuente de verdad indica **`/api/noticias`** y `/api/noticias/<id>`. Conflicto directo con HU-01. Ver **P1**. |
| **POST** | `/api/auth/login` | Inicio de sesión para administradores | ✅ Coincide. El ejemplo de prueba del README no se transcribe. |
| **POST** | `/api/contacto` | Envío de mensajes del formulario de contacto | 🔵 No mencionado en `respuesta.md` (BE-A6). Ver **P3**. |

> **Nota clave:** el README documenta **5 endpoints**. `respuesta.md` confirma **16 rutas**
> (13 GET públicos + 3 de autenticación), más el CRUD administrativo directo sobre las rutas
> administrables. El README es un **subconjunto deliberadamente parcial** para el arranque local.

## 4. Lo que el README no cubre

De las 16 rutas confirmadas, el README documenta 2: `/api/carreras` y `/api/auth/login`.

| Aspecto no cubierto | Estado conocido en la fuente vigente | Observación |
|---|---|---|
| **12 rutas públicas** | ✅ Confirmadas: `/api/carreras/<id>`, `/api/noticias`, `/api/noticias/<id>`, `/api/faqs?segmento=X`, `/api/slider`, `/api/calendario`, `/api/horarios`, `/api/docentes`, `/api/autoridades`, `/api/bedeles`, `/api/becas`, `/api/tutorias` | Ninguna aparece en el README. Ver **P2**. |
| **2 rutas de autenticación** | ✅ Confirmadas: `POST /api/auth/logout` y `GET /api/auth/me` | El README solo muestra `/api/auth/login`. |
| **CRUD administrativo** | ✅ POST/PUT/DELETE directos sobre las rutas administrables, **sin** prefijo `/api/admin/` (BE-A8). El CRUD de usuarios no está confirmado. | No cubierto por el README. |
| **Servidor WSGI y despliegue** | ✅ Gunicorn como WSGI interno; entrega con Docker / Docker Compose (BE-A11) | El README usa `python app.py`, el servidor de desarrollo de Flask. Ver **P5** y **P9**. |
| **Paginación** | ✅ `?page=1&limit=10` en listados largos (BE-A10) | No mencionada en el README. |
| **Swagger / OpenAPI + Postman** | ⏳ Entrega 2, plazo comprometido ~22/09/2026 | No mencionada en el README. Ver **P5**. |
| **Variables de entorno** | ✅ `API_BASE_URL`, `VITE_MOODLE_URL`, `VITE_INSCRIPCION_URL` (BE-A9) | No mencionadas en el README. |
| **DTOs / esquemas JSON** | ⏳ Entrega 3, plazo comprometido ~29/09/2026 | **Ausentes por completo.** Ver **P7**. |
| **Estructura de errores** | ✅ `{ "error": { "code", "message", "details" } }` (BE-A5) | No mencionada en el README. |
| **CORS (dominios permitidos)** | ✅ `http://localhost:5173` en desarrollo; dominio de Infra en producción (BE-A12) | Solo aparece `Flask-Cors` como dependencia. |
| **Rate limiting** | ❌ Sin responder (BE-A14) | El README no lo cubre; sigue sin respuesta. |

## 5. Stack de ejecución local (según el README)

| Componente | Detalle |
|---|---|
| **Python** | 3.10 o superior |
| **Entorno virtual** | `venv` (`python -m venv venv` + `.\venv\Scripts\activate` en PowerShell; `python3 -m venv venv` + `source venv/bin/activate` en Linux/macOS) |
| **Dependencias** | `Flask Flask-Cors Flask-SQLAlchemy Flask-JWT-Extended python-dotenv` |
| **Inicialización de datos** | `python seed.py` → crea las tablas y carga carreras, novedades y un usuario administrador (contraseña no reproducida) |
| **Servidor de desarrollo** | `python app.py` |
| **Puerto** | `5000` (desarrollo local). Ver **P9**. |
| **Base de datos local** | **SQLite**, creada y sembrada por `seed.py`. Ver **P4**. |

> **Nota:** el entorno de desarrollo usa SQLite y el servidor de desarrollo de Flask; el contrato
> de entrega indica **PostgreSQL + Gunicorn + Docker Compose**. La diferencia es esperable en un
> arranque local, pero requiere aclaración (**P4** y **P9**).

## 6. Divergencias y preguntas abiertas (P1–P9)

| ID | Pregunta | Prioridad | Estado |
|---|---|---|---|
| **P1** | Ruta de noticias: ¿`/api/noticias` o `/api/novedades`? | Alta | 🔵 Abierta |
| **P2** | Alcance: ¿el README es parcial o cambió el mapa de rutas? | Alta | 🔵 Abierta |
| **P3** | `POST /api/contacto`: confirmar existencia, body y errores | Media | 🔵 Abierta |
| **P4** | ¿SQLite solo en local o PostgreSQL también en testing? | Media | 🔵 Abierta |
| **P5** | ¿Siguen vigentes los compromisos de entrega? | Media | 🔵 Abierta |
| **P6** | `GET /api/health`: ¿se mantiene y qué devuelve? | Baja | 🔵 Abierta |
| **P7** | DTOs: ¿cuándo llega la tabla Swagger / OpenAPI? | Baja | 🔵 Abierta |
| **P8** | Credencial de administrador de seed en texto plano | Media | 🔵 Abierta |
| **P9** | Puerto y forma de ejecución en el entorno de testing | Info | 🔵 Abierta |

> Detalle completo de cada pregunta: `documentacion/driveFrontend/04_backend/preguntas_abiertas_2026-10-01.md`.

**P1** es la de mayor impacto: define la ruta que consume la Home. Hasta que Backend responda, no se
modifica `hu_01_api.md` ni `src/api/endpoints.ts`.

**P5** necesita una aclaración de plazos: al 01/10/2026 ya vencieron las entregas 2 (Swagger /
OpenAPI, ~22/09) y 3 (DTOs + Auth + GETs, ~29/09), y la entrega 4 (seeders + errores) vence
~06/10/2026.

## 7. Seguridad

- **Credencial de seed en texto plano (P8):** el README del backend publica el usuario
  administrador por defecto con su contraseña en claro, junto con un comando de prueba. Este
  documento **no reproduce la contraseña**.
- **Criterio del equipo de Frontend:** no se usan credenciales por defecto contra entornos
  compartidos ni se documentan en archivos versionados.
- **Lo que se pide a Backend:** que la contraseña se genere por variable de entorno o sea rotable
  en el primer arranque, y que el README deje de mostrarla en claro.
- **Lo que sí se documenta:** el mecanismo esperado, JWT en `Authorization: Bearer <token>`, con
  la estructura de token confirmada en `respuesta.md` §3 (BE-A7). La implementación real del
  login depende de la entrega 3 de Backend.

## 8. Impacto en el frontend

| Punto | Estado | Qué hacer hasta tener respuesta |
|---|---|---|
| **`src/api/endpoints.ts`** | 🔵 Sin poblar | **No se modifica.** Los endpoints quedan sin registrar hasta recibir la tabla oficial. |
| **`src/types/api/`** | ⏳ Bloqueado por falta de DTOs | No se crean tipos con campos inventados. |
| **Consumo de API real (Home)** | 🔵 Bloqueado | La Home sigue con datos simulados (`src/constants/mock-data.ts`). |
| **Login real** | 🟡 Preparado, no conectado | El cliente Axios ya inyecta Bearer desde `localStorage`; el login real depende de la entrega 3. |
| **Formulario de contacto** | 🔵 Sin confirmar | No se implementa el servicio hasta resolver **P3**. |
| **Divergencia `novedades` / `noticias`** | 🔵 Riesgo alto | **Prohibido** cambiar `hu_01_api.md`. Resolver **P1** antes de tocar endpoints o servicios. |
| **Variables de entorno del frontend** | 🟡 Parcial | `API_BASE_URL`, `VITE_MOODLE_URL` y `VITE_INSCRIPCION_URL` confirmadas; Moodle e inscripción siguen pendientes de IFTS / Dirección (BE-A9). |

## Cómo se valida

1. **Trazabilidad:** toda afirmación sobre endpoints puede rastrearse a `respuesta.md`, al README
   archivado o a `preguntas_abiertas_2026-10-01.md`. Lo que no aparece en ninguna de las tres
   queda marcado como ⏳ o 🔵.
2. **Fuentes de verdad intactas:** `docs/04_user_stories/HU-01/hu_01_api.md` y
   `src/api/endpoints.ts` no fueron modificados al redactar este documento.
3. **Subconjunto explícito:** la tabla de endpoints del README cubre 2 de las 16 rutas confirmadas
   y no incluye ningún DTO; ambas ausencias quedan escritas en §3 y §4.
4. **Conflicto trazado:** la discrepancia **P1** aparece con prioridad Alta y con la restricción
   explícita de no modificar HU-01 ni `endpoints.ts`.
5. **Credencial redactada:** la contraseña del administrador no aparece en ningún documento
   versionado. En este archivo no figura.
6. **Hallazgos referenciados:** las remisiones BE-A1 a BE-A14 resuelven contra
   `docs/06_audits/audit_2026-09-15-backend.md`.
7. **Preguntas completas:** P1 a P9 tienen prioridad y estado, y cada una verifica contra
   `preguntas_abiertas_2026-10-01.md`.

## Referencias

- Equipo de Backend. (2026). *Backend IFTS N.º 12 — Guía de instalación y ejecución* (README de
  `backend_ifts12`), recibido el 01/10/2026. `inbox/_done/readme_backend_ifts12.md`.
- Equipo de Backend. (2026). *Respuesta a definiciones técnicas formales* (15/09/2026).
  `documentacion/driveFrontend/04_backend/respuesta.md`.
- Equipo de Frontend. (2026). *Grupo 4 — Backend (Datos y APIs)*, actualizado el 01/10/2026.
  `documentacion/driveFrontend/04_backend/grupo_4_backend.md`.
- Equipo de Frontend. (2026). *Preguntas abiertas a Backend — a partir del README de
  `backend_ifts12`* (01/10/2026).
  `documentacion/driveFrontend/04_backend/preguntas_abiertas_2026-10-01.md`.
- Equipo de Frontend. (2026). *HU-01: Especificación de API — Home institucional pública*.
  `docs/04_user_stories/HU-01/hu_01_api.md`.
- Equipo de Frontend. (2026). *Decisiones Técnicas — Sitio Web Institucional IFTS N.º 12*.
  `docs/02_technical/decisiones_tecnicas.md`.
- Equipo de Frontend. (2026). *Auditoría de Backend — respuesta del equipo vs. estado del
  proyecto* (15/09/2026). `docs/06_audits/audit_2026-09-15-backend.md`.