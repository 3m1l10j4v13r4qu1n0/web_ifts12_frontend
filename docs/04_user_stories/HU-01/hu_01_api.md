---
tags:
  - hu-01
  - api
  - backend
---

# HU-01: Especificación de API — Home institucional pública

Fecha: 2026-09-18 · **Actualizado:** 2026-10-02 · Estado: borrador

## Resumen

Los endpoints de la Home usan el prefijo `/api/` (sin `/api/v1/`, hallazgo BE-A1). Los DTOs
de `GET /api/carreras` y `GET /api/novedades` están **verificados contra el código fuente
del backend** (`~/Descargas/backend_ifts12/`, recibido el 28/09/2026) el 02/10/2026, y son
los dos únicos de este documento con esquema confirmado. El resto sigue ⏳ esperando la tabla
Swagger/OpenAPI (entrega 2 de Backend, vencida el 22/09/2026).

> **Jerarquía de fuentes (decisión del 02/10/2026):** el **código fuente** es la fuente de
> verdad, porque es lo que corre. La respuesta del 15/09/2026
> (`documentacion/driveFrontend/04_backend/respuesta.md`) confirmó 16 rutas, pero el código
> implementa **5**. Verificá siempre contra el código antes que contra esa respuesta.

## 1. Endpoints de la Home

| Método | Ruta | Propósito en la Home | Estado |
|---|---|---|:---|
| GET | `/api/slider` | Carrusel/slider institucional activo de la Home | 🔵 no existe en el backend |
| GET | `/api/novedades` | Noticias para el slider y listado reciente→antigua | ✅ **existe** (`app.py:79-92`) |
| GET | `/api/carreras` | Listado de carreras para la sección Carreras | ✅ **existe** (`app.py:62-75`) |
| GET | `/api/faqs?segmento=X` | FAQ destacadas de la Home filtradas por segmento | 🔵 no existe (la tabla `faq` está en el Postgres, sin modelo Flask ni ruta) |

> Tabla 1. Endpoints públicos de la Home. Los dos verificados se auditaron endpoint por
> endpoint el 02/10/2026; los dos ausentes se buscaron uno por uno en `app.py` y en el
> archivo de rutas muerto `routes.py`, y no aparecen.

## 2. DTOs verificados contra el código (✅ 02/10/2026)

Estos dos esquemas están confirmados por dos vías independientes: el modelo
(`models.py:25-36` y `models.py:50-60`) y la base real (`instance/ifts12.db`, con 3 carreras
de `id` 1, 2, 3 y 2 novedades de `id` 1, 2).

### 2.1 `GET /api/carreras`

Sin parámetros de query, sin paginación, sin filtros. Devuelve un **array plano**, sin
involtorio `{data, meta}`.

```json
[
  {
    "id": 1,
    "nombre": "Tecnicatura Superior en Análisis de Sistemas",
    "codigo": "AS-2023",
    "resolucion": "RS-2023-6336-GCABA-MEDGC",
    "descripcion": "Formación profesional orientada al desarrollo de software…",
    "duracion_anios": 3,
    "titulo_otorgado": "Técnico Superior en Análisis de Sistemas",
    "modalidad": "Híbrida / Presencial"
  }
]
```

| Campo | Tipo | Nulo | Default | Origen |
|---|---|:---:|---|:---|
| `id` | **number** | no | autoincrement | `models.py:28` |
| `nombre` | string | no | — | `models.py:29` |
| `codigo` | string (UNIQUE) | no | — | `models.py:30` |
| `resolucion` | string | sí | `null` | `models.py:31` |
| `descripcion` | string | sí | `null` | `models.py:32` |
| `duracion_anios` | **number** | sí | `3` | `models.py:33` |
| `titulo_otorgado` | string | sí | `null` | `models.py:34` |
| `modalidad` | string | sí | `'A distancia / Híbrida'` | `models.py:35` |

### 2.2 `GET /api/novedades`

Sin parámetros de query. Orden **fijo** `fecha_publicacion DESC` (`app.py:81`), sin
paginación ni filtro. Devuelve un **array plano**.

```json
[
  {
    "id": 2,
    "titulo": "Inicio de Clases y Tutorías para Estudiantes",
    "copete": "Conocé el cronograma de acompañamiento y tutorías académicas.",
    "contenido": "El equipo tutor del IFTS 12 puso a disposición los horarios…",
    "categoria": "Estudiantes",
    "imagen_url": null,
    "destacado": false,
    "fecha_publicacion": "2026-09-28T19:54:25.920870"
  }
]
```

| Campo | Tipo | Nulo | Default | Origen |
|---|---|:---:|---|:---|
| `id` | **number** | no | autoincrement | `models.py:53` |
| `titulo` | string | no | — | `models.py:54` |
| `copete` | string | sí | `null` | `models.py:55` |
| `contenido` | string | no | — | `models.py:56` |
| `categoria` | string | sí | `'Institucional'` | `models.py:57` |
| `imagen_url` | string | sí | `null` | `models.py:58` |
| `destacado` | **boolean** | sí | `false` | `models.py:59` |
| `fecha_publicacion` | string ISO 8601 | sí | `datetime.utcnow` | `models.py:60` |

> ⚠️ **`fecha_publicacion` es naive UTC**: se serializa con `.isoformat()` (`app.py:90`) y
> **no lleva sufijo `Z` ni offset**. El frontend tiene que asumir UTC al parsear.

## 3. DTOs pendientes (⏳)

### 3.1 `GET /api/faqs?segmento=X` — no existe

La **tabla `faq` sí está modelada** en el Postgres de diseño (`database/schema.sql`) con
`segmento` y `orden`, pero **no hay modelo Flask ni ruta que la sirva**. Cuando exista, hay
un desacuerdo de nombre de campo que hay que resolver antes: el SQL dice `segmento`, este
documento decía `categoria`. El nombre que quede es el que va al DTO.

### 3.2 `GET /api/slider` — no existe

Sin modelo, sin tabla en `models.py`. La tabla `slider` **sí** está en el Postgres de
diseño, sin cablear.

## 4. Manejo de errores

- **Respuesta real del backend** (verificada el 02/10/2026): `{"error": "texto plano"}`, un
  **string**, no un objeto. Los tres casos que devuelve son
  `400 "Email y contraseña requeridos"` (`app.py:41`), `400 "Campos obligatorios
  incompletos"` (`app.py:100`) y `401 "Credenciales inválidas"` (`app.py:46`). **No hay
  `code` ni `details` en ninguna respuesta.**
- El contrato del 15/09/2026 confirmaba `{ "error": { "code", "message", "details" } }`
  (BE-A5), pero **no está implementado**. `src/types/api/error.types.ts` se corrigió el
  02/10 para reflejar la forma real, y queda marcado como provisorio hasta que Backend
  decida si implementa el shape de BE-A5 o si el frontend se adapta a este.
- Los errores se gestionan en el interceptor global de Axios, nunca con `try/catch` en
  componentes (RN-13).
- Estados de UI obligatorios en la Home: loading, error y empty state por sección.

## 5. Convenciones de serialización (verificadas 02/10/2026)

| Aspecto | Comportamiento real | Consecuencia en el frontend |
|:---|:---|:---|
| Naming | `snake_case` en **todos** los campos. Nunca camelCase | El mapper de DTO a dominio traduce los nombres |
| Éxito | Array plano `[{...}]`, sin `{data, meta}` | No asumir envoltorio |
| Fechas | ISO 8601 sin `Z` ni offset (naive UTC) | Parsear asumiendo UTC |
| Booleanos | `true`/`false` JSON nativo (en SQLite se guardan 0/1) | Tipo `boolean`, nunca `0`/`1` |
| Paginación | **Ninguna** en ningún listado | No implementar `?page`/`?limit` hasta que exista |
| Filtros | **Ninguno** en ningún listado | La búsqueda global sigue siendo local |
| Serialización | Manual, con dicts literales en cada route + `jsonify()` | No hay esquema formal: los DTOs pueden cambiar |

> ⚠️ **El backend no tiene un solo test**, así que nada fija el comportamiento de ningún
> endpoint: nombres de campo, orden, formato de fecha y shape de error pueden cambiar sin
> que nada se rompa. Estos DTOs son autoritativos **hoy**, no estables.

## 6. Notas del contrato

- Los enlaces externos (Moodle, inscripción del GCBA y SIU) **no son endpoints** del
  backend: son URLs de variables de entorno (`VITE_MOODLE_URL`, `VITE_INSCRIPCION_URL`) que
  el frontend resuelve desde `src/constants/enlaces.ts` (RN-10).
- `POST /api/contacto` **existe** y está confirmado (`app.py:96-111`): body
  `{nombre_apellido, email, mensaje}` obligatorios y `{telefono, asunto}` opcionales;
  responde 201 `{message: string}` o 400 `{error: string}`. El frontend todavía **no lo
  consume**: el formulario valida en local. Queda para un ticket propio.
- `GET /api/carreras/:id` **no existe como endpoint activo.** Solo figura en el archivo
  muerto `routes.py:61`, con `<int:carrera_id>` (tipo entero), incompatible con el slug que
  usa la ruta `/carreras/:id` del frontend. Es la deuda DB-14.

## 7. Veredicto sobre el `id` (resuelto 02/10/2026)

La contradicción que este documento arrastraba desde el 18/09/2026 quedó **resuelta, y el
veredicto es contra el frontend**:

> **`id` es `number`.** En las 5 entidades del backend es `db.Column(db.Integer,
> primary_key=True)` (`models.py:9, 28, 42, 53, 66`), el Postgres de diseño usa `SERIAL`, y
> los valores reales en la base son `1, 2, 3`. **No existe ningún `id` de tipo string en el
> backend.**

Había **tres convenciones distintas** en juego, y dos eran invento propio del frontend:

| Fuente | Tipo de `id` | Estado |
|:---|:---|:---|
| `models.py` + base real | `number` | ✅ La correcta |
| `hu_01_api.md` (hasta el 01/10) | `"c1"` (string) | ❌ Inventado desde los mocks |
| `src/constants/mock-data.ts:19` | `'gestion-parlamentaria'` (slug) | ❌ Slug de UI, no un id de API |

El slug de los mocks se conserva **como identificador de navegación**, porque las URLs del
sitio usan `/carreras/gestion-parlamentaria`, pero **no es el `id` de la API**. El mapper
traduce: la URL trae el slug, el servicio pide por `id` numérico. Eso implica que la tabla
de carreras completa tiene que estar disponible para resolver el slug → `id` antes de
pedir el detalle, y el detalle **no se puede consumir todavía** (ver DB-14).

## Referencias

Backend IFTS N.º 12. (2026). Código fuente del backend (Flask, 451 líneas de Python). Recibido el 28/09/2026.

Equipo de Backend. (2026). Respuesta a definiciones técnicas formales. `documentacion/driveFrontend/04_backend/respuesta.md`.

Frontend IFTS N.º 12. (2026). Auditoría del código del backend. `docs/06_audits/audit_2026-10-02-backend-espejo.md`.

Frontend IFTS N.º 12. (2026). Hallazgos de errores e inconsistencias del backend. `documentacion/driveFrontend/04_backend/deudas_codigo_backend_2026-10-02.md`.

Equipo de Frontend. (2026). Auditoría de Backend. `docs/06_audits/audit_2026-09-15-backend.md`.