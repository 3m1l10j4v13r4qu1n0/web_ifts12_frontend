---
# Tags del índice de memoria (D13): el CLI las scaffoldea, el Mentat ajusta.
tags:
  - contrato
  - api
  - backend
---

# Contrato de API del backend

> Documento de Capa 1 — Especificación. Registra el contrato técnico derivado del README de
> instalación del repositorio `backend_ifts12` (01/10/2026) y de la **auditoría del código
> fuente** de ese repositorio (02/10/2026).

Fecha: 2026-10-02 · Estado: vigente para `GET /carreras` y `GET /novedades`; el resto del mapa
sigue bloqueado por ausencia de endpoints.

## Resumen

Este documento establece el contrato técnico vigente del backend del IFTS N.º 12. Su fuente
principal cambió el 02/10/2026: ya no es solo el README, sino el **código fuente** de
`backend_ifts12`, auditado línea por línea. La jerarquía de fuentes es, de mayor a menor:

1. **Código fuente** (`app.py`, `models.py`) — lo que el servidor hace.
2. `respuesta.md` (15/09/2026) — lo que Backend dijo que haría.
3. README de instalación (01/10/2026) — guía de arranque local, parcial.

El código gana porque es lo que se puede verificar. Resultado: de las 16 rutas confirmadas el
15/09/2026, **solo 5 existen** (`app.py:25-111`), y las contradicciones son varias, incluida una
que cambia una URL: el listado de novedades es **`/api/novedades`**, no `/api/noticias`.

Consecuencia práctica: el frontend ya consume los dos GET verificables (`/carreras` y
`/novedades`) con DTOs derivados del código, y el resto del mapa queda **documentado como
inexistente** en lugar de inventado. El detalle de carrera y de novedad se resuelve contra la
lista completa porque **no hay endpoint de detalle**. El anexo de hallazgos está en
`documentacion/driveFrontend/04_backend/deudas_codigo_backend_2026-10-02.md` (BE-E01–BE-E15).

## Fuente

- Origen primario: `inbox/_done/readme_backend_ifts12.md` (01/10/2026)
- Auditoría del código: `documentacion/driveFrontend/04_backend/deudas_codigo_backend_2026-10-02.md`
  (02/10/2026), sobre `~/Descargas/backend_ifts12/`

## Qué establece

**Alcance:** el estado actual conocido del contrato de API (endpoints declarados, stack de
ejecución local, divergencias y preguntas abiertas), marcando todo lo que falta documentar.

**Supuestos:**

- **Jerarquía de fuentes (vigente desde el 02/10/2026):** código fuente (`app.py`,
  `models.py`) > `respuesta.md` (15/09/2026) > README de `backend_ifts12` (01/10/2026) >
  `preguntas_abiertas_2026-10-01.md`. El código es la fuente de verdad porque es lo único
  verificable sin depender de una respuesta pendiente.
- El código recibido es un **prototipo**, no la entrega pactada: no tiene tests, `routes.py` es
  código muerto, `database/schema.sql` está corrupto y hay 5 endpoints de 16. Se consume igual,
  pero el resto del mapa no se promises.
- El prefijo de rutas es `/api/` (sin `/api/v1/`), confirmado por Backend (BE-A1).
- La fuente de verdad de endpoints por historia de usuario sigue siendo
  `docs/04_user_stories/HU-01/hu_01_api.md`. Un endpoint que no está documentado en ninguna HU se
  trata como inexistente.

**Límites:**

- Este documento **no reemplaza** a `respuesta.md`. El README es una guía de arranque local, y es
  parcial por diseño.
- Las preguntas abiertas **P1** y **P7** quedaron resueltas **por observación del código**, no
  por respuesta de Backend: la ruta es `/api/novedades` y los DTOs se leyeron de `models.py`.
  Las demás siguen abiertas y acotan lo que el frontend puede consumir.
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

## 3. Endpoints: los que existen en el código

Verificado el 02/10/2026 sobre `app.py:25-111`. Las 5 rutas registradas con `@app.route` son las
únicas que responden. `routes.py` **nunca se importa** (el `import` está comentado en
`app.py:151`), así que sus 12 rutas más el CRUD administrativo son código muerto.

| Método | Endpoint | Código | Estado |
|---|---|---|---|
| **GET** | `/api/health` | `app.py:25-30` | 🟡 Existe. No figuraba entre las 16 rutas. **Resuelve P6** por observación. |
| **POST** | `/api/auth/login` | `app.py:34-58` | 🟡 Existe. JWT **sin** `jwt_required` en ninguna ruta (BE-E04). |
| **GET** | `/api/carreras` | `app.py:62-75` | ✅ **Consumido por el frontend.** Sin parámetros, sin paginación. |
| **GET** | `/api/novedades` | `app.py:79-92` | ✅ **Consumido por el frontend.** Orden fijo `fecha_publicacion DESC`. |
| **POST** | `/api/contacto` | `app.py:96-111` | 🟡 Existe. No implementado en el frontend (ver §8). |

> **P1 resuelta por observación:** la ruta de novedades es **`/api/novedades`**, no `/api/noticias`.
> Es lo que dice el código, y el código gana. `hu_01_api.md` y `src/api/endpoints.ts` se
> actualizaron en consecuencia.

### 3.1 DTOs derivados del código

`models.py` y el serializador de `app.py` dan el contrato exacto. Antes no había ninguna fuente
para esto (**P7**): estos DTOs salen de leer el código, no de un Swagger.

**`GET /api/carreras` → `CarreraApi[]`** (array plano, no `{data, meta}`):

| Campo | Tipo | Nullable | Origen |
|---|---|---|---|
| `id` | `number` (int) | No | `db.Integer` PK, `models.py:28` |
| `nombre` | `string` | No | `models.py:29` |
| `codigo` | `string` | No | `models.py:30` |
| `resolucion` | `string` | Sí | `models.py:31` |
| `descripcion` | `string` (Text) | Sí | `models.py:32` |
| `duracion_anios` | `number` (int) | Sí | `models.py:33` |
| `titulo_otorgado` | `string` | Sí | `models.py:34` |
| `modalidad` | `string` | Sí | `models.py:35` |

**`GET /api/novedades` → `NovedadApi[]`** (array plano):

| Campo | Tipo | Nullable | Origen |
|---|---|---|---|
| `id` | `number` (int) | No | `db.Integer` PK, `models.py:53` |
| `titulo` | `string` | No | `models.py:56` |
| `copete` | `string` | Sí | `models.py:57` |
| `contenido` | `string` (Text) | No | `models.py:59` |
| `categoria` | `string` | Sí | `models.py:60`, default `'Institucional'` |
| `imagen_url` | `string` | Sí | `models.py:61` |
| `destacado` | `boolean` | No | `db.Boolean`, `models.py:62`. SQLite lo guarda `1`/`0`; el serializador devuelve bool |
| `fecha_publicacion` | `string` ISO naive UTC | Sí | `models.py:63`, `default=datetime.utcnow`, `.isoformat()` en `app.py:90` |

> **Trampa de la fecha:** `datetime.utcnow` + `.isoformat()` produce `2026-09-28T19:54:25.920870`,
> **sin `Z` ni offset**. `new Date()` lo interpretaría como hora local y correría el día para
> usuarios en UTC-3. El mapper de `src/api/mappers/novedad.mapper.ts` le agrega la `Z`
> explícitamente. Cubierto por un test dedicado.

### 3.2 Estructura de errores (la real)

El backend **no** usa la estructura confirmada en `respuesta.md` (BE-A5). Devuelve texto plano en
3 rutas (`app.py:41`, `app.py:46`, `app.py:100`):

```json
{ "error": "Faltan campos obligatorios" }
```

Sin `code`, sin `details`, sin array de validación. `src/types/api/error.types.ts` refleja esto, y
el interceptor de `src/api/client.ts` normaliza cualquier fallo a `{status, mensaje}` con un
fallback por código de estado, para que los componentes nunca vean un `AxiosError` (regla RN-13).

### 3.3 Lo que NO existe

Confirmado por lectura del código, no por suposición. **Un endpoint que no está en esta lista se
trata como inexistente:**

`/api/slider` · `/api/noticias` · `/api/noticias/:id` · `/api/carreras/:id` · `/api/faqs` ·
`/api/docentes` · `/api/tutorias` · `/api/becas` · `/api/calendario` · `/api/horarios` ·
`/api/autoridades` · `/api/bedeles` · `/api/auth/logout` · `/api/auth/me` · CRUD administrativo.

> `/api/carreras/:id` figura en el archivo muerto `routes.py:61` con `<int:carrera_id>`. No se
> puede consumir. **Impacto:** la página de detalle resuelve la carrera contra la lista completa
> (la misma consulta que el listado, cacheada por TanStack Query). El slug de la URL se deriva
> del `nombre` en el mapper, porque el backend no expone slug.

> **Verificación en la DB sembrada** (`instance/ifts12.db`): 3 carreras con `id` 1, 2, 3 y 2
> novedades con `id` 1, 2. El nombre real es `Tecnicatura Superior en Análisis de Sistemas`, no el
> de los mocks del frontend, que era `Gestión Parlamentaria`. Las modalidades reales incluyen
> `A Distancia / Híbrida`, que no describe la etiqueta fija "exclusivamente nocturno": esa
> etiqueta quedó como horario de atención confirmado (RN-07) y el footer la combina con las
> modalidades reales, mientras que las fichas de carrera muestran la modalidad del dato.

## 4. Lo que sigue confirmado por escrito pero ausente del código

De las 16 rutas de `respuesta.md` (15/09/2026), el código implementa 2. Las otras 14 no existen.

| Aspecto | Lo que dice `respuesta.md` | Lo que hace el código | Estado |
|---|---|---|---|
| **14 rutas públicas** | `/api/carreras/<id>`, `/api/noticias`, `/api/noticias/<id>`, `/api/faqs?segmento=X`, `/api/slider`, `/api/calendario`, `/api/horarios`, `/api/docentes`, `/api/autoridades`, `/api/bedeles`, `/api/becas`, `/api/tutorias`, más `/api/carreras` y `/api/noticias` | Ninguna implementada | 🔵 **No existe en el código.** Ver **P2**. |
| **2 rutas de autenticación** | `POST /api/auth/logout`, `GET /api/auth/me` | No implementadas | 🔵 No existe. |
| **CRUD administrativo** | POST/PUT/DELETE directos sobre las rutas administrables, **sin** prefijo `/api/admin/` (BE-A8) | No implementado | 🔵 No existe. El CRUD de usuarios nunca estuvo confirmado. |
| **Servidor WSGI y despliegue** | Gunicorn; entrega con Docker / Docker Compose (BE-A11) | Solo `app.run(host='0.0.0.0', port=5000, debug=True)` | 🔵 Ver **BE-E01** y **P5**. |
| **Paginación** | `?page=1&limit=10` en listados largos (BE-A10) | Ninguna ruta acepta parámetros de query | 🔵 No existe. Ver **BE-E07**. |
| **Swagger / OpenAPI + Postman** | Entrega 2, plazo comprometido ~22/09/2026 | No hay OpenAPI en el repo | 🔵 Vencido. Ver **P5**. |
| **Variables de entorno** | `API_BASE_URL`, `VITE_MOODLE_URL`, `VITE_INSCRIPCION_URL` (BE-A9) | `config.py` lee de `.env`, pero `app.py` **ignora `API_BASE_URL`** y serializa las URLs a mano | 🔵 Ver **BE-E05**. |
| **DTOs / esquemas JSON** | Entrega 3, plazo comprometido ~29/09/2026 | Ninguno | 🟡 **Resuelto por observación**: los DTOs de §3.1 salen de `models.py`. Ver **P7**. |
| **Estructura de errores** | `{ "error": { "code", "message", "details" } }` (BE-A5) | `{ "error": "texto plano" }` | 🔵 **Discrepancia real.** Ver §3.2. |
| **CORS (dominios permitidos)** | `http://localhost:5173` en desarrollo; dominio de Infra en producción (BE-A12) | `CORS(app)` sin argumentos: `Access-Control-Allow-Origin: *` | 🔵 Ver **BE-E03**. |
| **Rate limiting** | ❌ Sin responder (BE-A14) | No implementado | ❌ Sin responder. |

## 5. Stack de ejecución local (según el README)

| Componente | Detalle |
|---|---|
| **Python** | 3.10 o superior |
| **Entorno virtual** | `venv` (`python -m venv venv` + `.\venv\Scripts\activate` en PowerShell; `python3 -m venv venv` + `source venv/bin/activate` en Linux/macOS) |
| **Dependencias** | `Flask Flask-Cors Flask-SQLAlchemy Flask-JWT-Extended python-dotenv` |
| **Inicialización de datos** | `python seed.py` → crea las tablas y carga carreras, novedades y un usuario administrador (contraseña no reproducida) |
| **Servidor de desarrollo** | `python app.py` |
| **Puerto** | `5000` (`app.py:120`). Ver **P9**. |
| **Base de datos local** | **SQLite** en `instance/ifts12.db`, creada y sembrada por `seed.py`. Ver **P4**. |
| **Estado real del repo** | Prototipo: sin tests, `routes.py` muerto, `database/schema.sql` corrupto, `.env` faltante y `requirements.txt` incompleto. Anexo BE-E01–BE-E15. |

> **Nota:** el entorno de desarrollo usa SQLite y el servidor de desarrollo de Flask; el contrato
> de entrega indica **PostgreSQL + Gunicorn + Docker Compose**. La diferencia es esperable en un
> arranque local, pero requiere aclaración (**P4** y **P9**).

> **Verificado en el repo (02/10/2026):** la DB sembrada tiene 3 carreras, 2 novedades, 1 usuario,
> y **0 filas** en `materias` y `contactos`. Los datos de contacto del seed no se cargaron, lo que
> hace que `POST /api/contacto` funcione pero no haya nada que listar.

## 6. Divergencias y preguntas abiertas (P1–P9)

Estado actualizado el 02/10/2026, después de leer el código.

| ID | Pregunta | Prioridad | Estado |
|---|---|---|---|
| **P1** | Ruta de noticias: ¿`/api/noticias` o `/api/novedades`? | Alta | ✅ **Resuelta por observación**: es `/api/novedades` (`app.py:79`). `hu_01_api.md` y `endpoints.ts` actualizados. |
| **P2** | Alcance: ¿el README es parcial o cambió el mapa de rutas? | Alta | 🔴 **Resuelta, y la respuesta es peor**: no es parcial por diseño, faltan 11 de 16 rutas. |
| **P3** | `POST /api/contacto`: confirmar existencia, body y errores | Media | 🟡 **Resuelta por observación**: existe (`app.py:96`). Body y errores leídos del código. No implementado en el frontend. |
| **P4** | ¿SQLite solo en local o PostgreSQL también en testing? | Media | 🔵 Abierta. El repo solo tiene SQLite. |
| **P5** | ¿Siguen vigentes los compromisos de entrega? | Media | 🔴 **Están vencidos y no cumplidos.** Swagger y DTOs sepués del 22 y 29/09. El frontend compensó con los DTOs del §3.1. |
| **P6** | `GET /api/health`: ¿se mantiene y qué devuelve? | Baja | ✅ **Resuelta por observación**: existe (`app.py:25`), devuelve `{"status": "ok"}`. |
| **P7** | DTOs: ¿cuándo llega la tabla Swagger / OpenAPI? | Baja | ✅ **Resuelta por observación**: no hay Swagger, pero los DTOs se derivaron de `models.py` (§3.1). |
| **P8** | Credencial de administrador de seed en texto plano | Media | 🔴 **Agravada**: la credencial está en el README, en `seed.py` y en la DB. Ver **BE-E06**. |
| **P9** | Puerto y forma de ejecución en el entorno de testing | Info | 🔵 Abierta. Sigue sin haber URL de testing; el frontend usa `VITE_API_BASE_URL`. |

> Detalle completo de cada pregunta: `documentacion/driveFrontend/04_backend/preguntas_abiertas_2026-10-01.md`.
> Hallazgos del código: `documentacion/driveFrontend/04_backend/deudas_codigo_backend_2026-10-02.md`.

**P2 y P5** son las que más pesan: no se trata de un arranque local parcial, sino de una entrega
que no llegó a completarse. El frontend no puede dejar de consumir `/carreras` y `/novedades` por
eso, pero **sí** debe frenar ahí: las 11 rutas restantes se piden antes de prometer pantallas que
las necesitan.

**P9** sigue abierta y bloquea el despliegue: sin URL del backend en el entorno de testing, el
build del frontend no tiene a dónde apuntar. `.env.example` lo deja explícito con un `@TODO`.

## 7. Seguridad

Lo verificado en el código el 02/10/2026. Ninguno de estos puntos es del frontend: son deudas de
Backend, y el frontend no puede compensarlas desde el lado del cliente.

| ID | Hallazgo | Dónde | Consecuencia |
|---|---|---|---|
| **BE-E01** | `debug=True` con `host='0.0.0.0'` | `app.py:120` | La consola de Werkzeug es accesible desde la red en un entorno que podría ser público. |
| **BE-E02** | Secretos JWT y de BD hardcodeados | `config.py:10-13` | anyone que lea el repo conoce la clave de firma de los tokens. |
| **BE-E03** | `CORS(app)` sin restringir origen | `app.py:118` | `Access-Control-Allow-Origin: *`: cualquier origen puede llamar la API. |
| **BE-E04** | Ninguna ruta usa `jwt_required` | `app.py` completo | El JWT se emite pero no se valida: no hay endpoint protegido real. |
| **BE-E05** | `activo` del usuario no se verifica en el login | `app.py:48-56` | Un usuario desactivado puede iniciar sesión igual. |
| **BE-E06** | Credencial de admin en claro | `seed.py`, `README.md` y la propia DB | El acceso de administrador está documentado públicamente. **Este documento no reproduce la contraseña.** |
| **BE-E10** | `app.py` corre con el servidor de desarrollo de Flask | `app.py:120` | No es Gunicorn ni Docker, como pedía el contrato de entrega. |

- **Criterio del equipo de Frontend:** no se usan credenciales por defecto contra entornos
  compartidos ni se documentan en archivos versionados. Frontend no implementa autenticación real
  mientras el backend no la soporte de verdad (regla de `AGENTS.md`).
- **Lo que se pide a Backend:** rotar los secretos a variables de entorno, proteger con
  `jwt_required` lo que deba protegerse, restringir CORS a los orígenes reales, sacar `debug`,
  verificar `activo`, y sacar la credencial del README y de la DB.
- **Lo que sí se documenta:** el mecanismo esperado, JWT en `Authorization: Bearer <token>`
  (BE-A7). El login no está implementado en el frontend; ver §8.

## 8. Impacto en el frontend

Estado al 02/10/2026, después de la auditoría del código y del primer consumo real.

| Punto | Estado | Detalle |
|---|---|---|
| **`src/api/endpoints.ts`** | ✅ **Poblado con lo verificado** | Solo las 5 rutas de `app.py:25-111`. Las inexistentes quedan listadas como tales en el comentario del archivo. |
| **`src/types/api/`** | ✅ **DTOs reales** | `carrera.types.ts`, `novedad.types.ts`, `error.types.ts`, cada uno con esquema Zod derivado de `models.py`. |
| **`src/api/services/`** | ✅ **2 servicios** | `carrera.service.ts` y `novedad.service.ts`: única capa que conoce endpoints, con `parse` de Zod en el borde. |
| **Consumo de API real** | ✅ **Carreras y novedades** | `CarrerasPage`, `NoticiasPage`, ambos detalles y las secciones de la Home leen del backend. El resto del sitio sigue en mocks. |
| **Estados de UI** | ✅ | Loading, error con reintento y vacío en las cuatro vistas. El mensaje de error lo produce el interceptor global, no el componente (RN-13). |
| **Detalle de carrera / novedad** | ✅ **Resuelto sin endpoint de detalle** | Se busca por slug contra la lista completa; la misma consulta cacheada. Un enlace al detalle no cuesta un request extra. |
| **Buscador global** | ✅ **Sobre datos reales** | Antes indexaba `mockCarreras`/`mockNoticias` y ofrecía enlaces a páginas que ya no mostraban esas carreras. Ahora usa los mismos hooks que las páginas. |
| **`horarios`** | 🔵 **No se muestra** | El backend no expone el campo. No se inventa (regla anti-alucinación). La sección "Horarios" de `/carreras` lo dice explícitamente. |
| **Login real** | ⏸️ **No implementado** | El cliente inyecta Bearer, pero no hay pantalla de login ni `auth/me`. El backend tampoco lo soporta (BE-E04). |
| **Formulario de contacto** | ⏸️ **No implementado** | El endpoint existe (`P3` resuelta) y el formulario manda mail simulado. Falta decisión de alcance, no de contrato. |
| **Resto de rutas (11)** | ⏳ **Bloqueadas** | Sin backend no hay `/faqs`, `/slider`, `/calendario`, `/docentes`, `/autoridades`, `/tutorias`, `/becas`, `/horarios`, `/bedeles`. Esas páginas siguen en mocks. |
| **Variables de entorno** | 🟡 **Parcial** | `VITE_API_BASE_URL` implemented con fallback a `localhost:5000`. La URL de testing sigue pendiente (**P9**): `.env.example` lo marca con `@TODO`. Moodle, inscripción y SIU siguen sin URL oficial (BE-A9 / DB-07). |
| **Nombre del token** | 🔵 **Discrepancia abierta** | El login real devuelve `token`; `src/api/client.ts` lee `auth_token`. Sin impacto mientras no haya login, pero hay que alinearlo cuando lo haya. |

## Cómo se valida

1. **Trazabilidad:** cada endpoint y cada campo se rastrea a `app.py` o `models.py` con línea.
   Lo que no aparece en el código queda en §3.3 como inexistente.
2. **Verificación cruzada con la DB:** los DTO se contrastaron contra las filas reales de
   `instance/ifts12.db` (3 carreras, 2 novedades), no solo contra el código.
3. **Contrato ejecutado:** los servicios se probaron contra un servidor que replica la
   serialización de `app.py:62-92`, leyendo de la misma DB. Se comprobó en el navegador el
   listado, el detalle, el buscador, y los tres estados (con datos, sin backend, reintento).
4. **Esquemas Zod:** 18 tests verifican que el borde rechaza `id` como string, `destacado` como
   `1`, respuestas envueltas en `{data, meta}`, y duration decimal.
5. **Horario y modalidad reales:** el footer conserva el horario confirmado "exclusivamente
   nocturno" (RN-07, RF-22) y suma las modalidades reales de la DB (Presencial, Híbrida y a
   distancia); las fichas de carrera muestran la modalidad del dato (`A Distancia / Híbrida`).
6. **Credencial redactada:** la contraseña del administrador no aparece en ningún documento
   versionado, ni en este archivo.
7. **Hallazgos referenciados:** BE-E01 a BE-E15 resuelven contra
   `documentacion/driveFrontend/04_backend/deudas_codigo_backend_2026-10-02.md`; BE-A1 a BE-A14
   contra `docs/06_audits/audit_2026-09-15-backend.md`.

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
- Equipo de Frontend. (2026). *Deudas y hallazgos del código backend* (02/10/2026).
  `documentacion/driveFrontend/04_backend/deudas_codigo_backend_2026-10-02.md`.