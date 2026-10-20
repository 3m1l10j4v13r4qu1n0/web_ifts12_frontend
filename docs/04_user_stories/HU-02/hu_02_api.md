---
tags:
  - hu-02
  - api
  - backend
  - admin
---

# HU-02: Especificación de API — Administración de contenidos del sitio

Fecha: 2026-10-20 · Estado: borrador

## Resumen

Los endpoints de la administración usan el prefijo `/api/` (mismo criterio que HU-01).
Solo **dos rutas existen hoy** en el backend (`POST /api/auth/login` y
`GET /api/novedades`); el CRUD de escritura, el logout y el endpoint de sesión **no
existen** y se documentan aquí como propuestas 🔵 pendientes de confirmación de Backend
(deuda DB-03, Grupo 1). Siguiendo la jerarquía de fuentes de HU-01 (§ Resumen), el
**código fuente del backend es la fuente de verdad**: todo estado ✅ de este documento se
verificó contra `app.py`; todo lo 🔵 se buscó y no está implementado.

> **Regla anti-alucinación:** ninguna ruta de este archivo se consume en `src/` sin
> verificar antes su estado. Un endpoint 🔵 no se implementa: mientras no exista, las
> acciones de escritura muestran un mensaje de proceso (CA-10).

## 1. Endpoints de la administración

| Método | Ruta | Propósito en el panel | Estado |
|---|---|---|:---|
| POST | `/api/auth/login` | Autenticación del personal administrador (B1) | ✅ **existe** (`app.py:34-58`) |
| GET | `/api/novedades` | Listado base de noticias del panel (mismo DTO que HU-01 §2.2) | ✅ **existe** (`app.py:79-92`) |
| POST | `/api/novedades` | Alta de noticia (RF-25) | 🔵 no existe — propuesta §3.1 |
| PUT | `/api/novedades/:id` | Edición de noticia (RF-25) | 🔵 no existe — propuesta §3.1 |
| DELETE | `/api/novedades/:id` | Baja de noticia (RF-25) | 🔵 no existe — propuesta §3.1 |
| GET | `/api/slider` | Lectura de slides del carrusel (RF-34) | 🔵 no existe (HU-01 §3.2) |
| POST/PUT/DELETE | `/api/slider[/:id]` | Alta, edición, orden y baja de slides (RF-34) | 🔵 no existe — propuesta §3.2 |
| POST | `/api/auth/logout` | Cierre de sesión en servidor | 🔵 no existe — el logout es local |
| GET | `/api/auth/me` | Restauración/verificación de sesión vigente | 🔵 no existe — la sesión se reconstruye desde `localStorage` |

> Tabla 1. Endpoints de la administración. Los dos ✅ se verificaron contra `app.py`; los
> siete 🔵 se buscaron por ruta y no existen. Las escrituras se proponen **sin prefijo
> `/api/admin/`**, según la convención registrada en DB-03/BE-A8.

## 2. DTO verificado: `POST /api/auth/login` (✅)

Request (`Content-Type: application/json`):

```json
{
  "email": "admin@test.com",
  "password": "secreto"
}
```

Response 200:

```json
{
  "token": "<token devuelto por el backend>",
  "usuario": {
    "id": 1,
    "nombre": "Nombre",
    "apellido": "Apellido",
    "email": "admin@test.com",
    "rol": "ADMIN"
  }
}
```

| Campo | Tipo | Nulo | Origen |
|---|---|:---:|---|
| `token` | string | no | `app.py` (response del login) |
| `usuario.id` | **number** | no | `app.py` |
| `usuario.nombre` | string | no | `app.py` |
| `usuario.apellido` | string | no | `app.py` |
| `usuario.email` | string | no | `app.py` |
| `usuario.rol` | string | no | `app.py`; valores posibles 🟡 (ver §4) |

> El frontend tipa este contrato en `src/types/api/` y lo consume en
> `src/api/services/auth.service.ts`. La sesión (token + usuario) persiste en
> `localStorage` desde `src/contexts/AuthContext.tsx`.

## 3. Endpoints propuestos (🔵 no existen)

Contrato propuesto por Frontend para que Backend lo confirme o lo corrija. **No está
implementado**: hasta que pase a ✅, el frontend no lo consume.

### 3.1 CRUD de noticias (RF-25)

| Método | Ruta | Body propuesto | Respuesta propuesta |
|---|---|---|---|
| POST | `/api/novedades` | Campos de §3.1.1 | `201` con la noticia creada |
| PUT | `/api/novedades/:id` | Campos de §3.1.1 (parcial o completo) | `200` con la noticia actualizada |
| DELETE | `/api/novedades/:id` | sin body | `204` sin contenido |

Códigos de estado, formato de `:id` (number vs. slug) y manejo de permisos por rol:
**a definir con Backend** (RF-24 🟡, BE-A7).

#### 3.1.1 Campos propuestos del body

Basados en el modelo `novedades` ya verificado en HU-01 §2.2 (`models.py:53-60`):

| Campo | Tipo | Obligatorio | Notas |
|---|---|:---:|---|
| `titulo` | string | sí | también obligatorio en la validación del formulario |
| `copete` | string | no | resumen corto |
| `contenido` | string | sí | el backend hoy lo exige (`models.py:56`) |
| `categoria` | string | no | default `'Institucional'` |
| `imagen_url` | string | no | URL de la imagen |
| `destacado` | boolean | no | default `false` |
| `fecha_publicacion` | string ISO 8601 (naive UTC) | no | default `datetime.utcnow` |

### 3.2 Carrusel institucional (RF-34)

Sin modelo ni ruta en el backend (idem HU-01 §3.2 para `GET /api/slider`). La tabla
`slider` está en el Postgres de diseño, sin cablear. El body de alta/edición (imagen,
texto alternativo, orden, activo) queda **pendiente de diseño de DTO con Backend**; el
frontend tipa hoy `SlideCarrusel` desde `src/components/ui/CarruselInstitucional.tsx:4`
con datos locales.

## 4. Manejo de errores

- **Shape real del backend** (verificado, HU-01 §4): `{"error": "texto plano"}`, un
  string, sin `code` ni `details`. Los casos del login son
  `400 "Email y contraseña requeridos"` y `401 "Credenciales inválidas"` (`app.py:41`,
  `app.py:46`).
- El login muestra ese texto en el formulario (CA-04); el resto de las llamadas pasa por
  el interceptor global de Axios (RN-13), nunca con `try/catch` en componentes.
- Los endpoints 🔵, cuando existan, deberán devolver el mismo shape de error o avisar a
  Frontend para ajustar `src/types/api/error.types.ts` (punto abierto de HU-01 §4).
- Estados de UI obligatorios en el panel: cargando, vacío y error (CA-08).

## 5. Convenciones de serialización

Aplican las de HU-01 §5: `snake_case` en todos los campos, arrays planos sin
`{data, meta}`, fechas ISO 8601 naive UTC, booleanos JSON nativos y **sin paginación ni
filtros server-side**. En consecuencia, la paginación y los filtros del panel (CA-07) son
**locales** sobre los datos que devuelve `GET /api/novedades`; no se implementan
`?page`/`?limit` hasta que el backend los soporte.

## 6. Notas del contrato

- El rol del `usuario` del login viene del backend, pero **los valores todavía no están
  definidos**: `ADMIN`, `EDITOR` y `EDITOR_NOTICIAS` son propuestos 🟡 y dependen de la
  validación BE-A7 (`docs/01_global/reglas_negocio.md` §2). Hasta entonces, la UI no
  deriva permisos del rol (CA-13).
- El `token` hoy solo se guarda y se envía de vuelta al backend cuando este lo pida: no
  hay endpoint `me` ni verificación remota de sesión, así que la expiración real de la
  sesión no es detectable por el frontend (limitación registrada en CA-06).

## Referencias

Backend IFTS N.º 12. (2026). Código fuente del backend (Flask). Recibido el 28/09/2026.

Equipo de Frontend. (2026). Especificación de API — Home institucional pública (HU-01). `docs/04_user_stories/HU-01/hu_01_api.md`.

Equipo de Frontend. (2026). Deudas bloqueantes DB-03 (alcance de la administración). `documentacion/driveFrontend/deudas_bloqueantes_2026-10-01.md` (no versionado).

Equipo de Frontend. (2026). Reglas de negocio transversales. `docs/01_global/reglas_negocio.md`.
