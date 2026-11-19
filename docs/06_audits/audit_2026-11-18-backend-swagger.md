# Auditoría del Swagger del backend — `/apidocs/` roto, endpoints sin documentar y fixes

> Área: **Backend (Grupo 4)** · Proyecto Sitio Web Institucional IFTS N.º 12 — 2026
> Fecha de auditoría: **18/11/2026** · Rol: Decidora de Verdad (Capa 4 — verificación semántica)
> Fuente de verdad auditada: **`backend/` del ZIP `IFTS12_Backend_2026-11-16`** (commit
> `85a849a`), en particular el spec que Flasgger genera en `/apispec_1.json`.
> Alcance: la documentación de API que el backend publica; **no** el contrato que consume el
> frontend (eso fue `docs/06_audits/audit_2026-10-22-backend.md`).
> Disparador: pedido expreso del usuario, a partir de la exportación del ZIP y la generación de
> `documentacion/driveFrontend/04_backend/swagger_ifts12_backend_2026-11-16.json`.
> Artefactos de esta auditoría: spec crudo
> (`swagger_ifts12_backend_2026-11-16-flasgger-crudo.json`) y spec curado
> (`swagger_ifts12_backend_2026-11-16.json`), ambos en `documentacion/driveFrontend/04_backend/`
> (carpeta ignorada por git).

> **Regla de fuentes aplicada.** Cada hallazgo se verificó en la sesión actual: el spec crudo se
> obtuvo ejecutando `create_app()` del backend extraído y pidiendo `/apispec_1.json` con
> `app.test_client()`; los conteos y las referencias `archivo:línea` salen del código del ZIP, no
> de su documentación. No se completó ningún dato por suposición: lo que faltaba se derivó de
> `*_FIELDS`, `to_dict()` y `common/responses.py`.

---

## 1. Resumen ejecutivo

Los endpoints del backend **están**: 36 rutas y 92 operaciones, y se compararon una por una contra
`app.url_map` sin que falte ni sobre ninguna. El problema es otro: **el Swagger que el backend
publica no sirve como contrato**. De las 45 operaciones de escritura del backend, **42 no tienen el
cuerpo documentado** (16 con el body roto, 18 sin `body` y 8 con un `{type: object}` vacío); en el
spec crudo solo la subida de archivos queda usable, porque además faltan `contacto` y `login`. A eso
se suman **5 endpoints que directamente no aparecen**, **184 respuestas sin esquema** (de 304) y
**6 `operationId` nulos**. El archivo **no pasa un validador Swagger**: la primera llamada real desde
Swagger UI o desde un generador de clientes falla antes de mostrar nada útil.

**Veredicto:** 🔴 **el spec generado no es usable como contrato**, aunque la API funcione. La
causa raíz es de tres líneas de código: el YAML que arma `common/crud.py:_document()` está mal
indentado, `common/swagger.py:write_doc()` nunca declara el parámetro `body`, y cinco vistas no
tienen docstring ni `@swag_from`.

### 1.1 Tabla de severidad

| ID | Hallazgo | Severidad | Operaciones afectadas |
|---|---|---|---|
| BE-S01 | Cuerpos de request rotos en los 8 CRUD institucionales | 🔴 Crítico | 16 |
| BE-S02 | Escrituras académicas sin `body` declarado | 🔴 Crítico | 18 |
| BE-S03 | 5 endpoints del backend ausentes del spec | 🔴 Crítico | 5 |
| BE-S04 | 8 recursos sin `definitions` y respuestas sin esquema | 🟠 Alto | 184 respuestas |
| BE-S05 | `operationId: null` en los DELETE académicos | 🟠 Alto | 6 |
| BE-S06 | El `PUT` documentado contradice al runtime | 🟠 Alto | 14 |
| BE-S07 | `PATCH` documentado con `{type: object}` vacío | 🟠 Alto | 8 |
| BE-S08 | Parámetro de path no declarado en la descarga de archivos | 🟠 Alto | 2 |
| BE-S09 | Descripción YAML con coma sin comillas | 🟡 Medio | 1 |
| BE-S10 | `POST /api/v1/contacto` responde 500 no-JSON si falla el commit | 🟡 Medio | 1 |
| BE-S11 | Sin `host`, `produces` ni `consumes` | 🟡 Medio | 87 |
| BE-S12 | Tags inconsistentes (`Cuerpo-docente`, `Faqs`) | 🔵 Bajo | 8 |
| BE-S13 | `MessageResponse` genérico oculta la forma de la respuesta | 🔵 Bajo | 2 |

**Estado del artefacto:**

| Métrica | Spec crudo (`/apispec_1.json`) | Spec curado (18/11/2026) |
|---|---|---|
| `paths` | 31 | 36 |
| Operaciones | 87 | 92 |
| `definitions` | 24 | 51 |
| Escrituras con body utilizable | 1 de 43 | 45 de 45 |
| Respuestas con `schema` | 120 de 304 | 314 de 314 |
| Validador `swagger-spec-validator` | ❌ falla | ✅ sin errores ni warnings |

---

## 2. Método y reproducibilidad

El spec se obtuvo sin levantar servidor ni base de datos (el `DATABASE_URL` por defecto es
`sqlite://` en memoria):

```bash
# 1. venv temporal con Python 3.11 (no toca el repo)
~/.pyenv/versions/3.11.15/bin/python -m venv /tmp/opencode/ifts12-venv
/tmp/opencode/ifts12-venv/bin/pip install Flask==3.0.2 Flasgger==0.9.7.1 \
  Flask-Cors==4.0.0 Flask-SQLAlchemy==3.1.1 Flask-JWT-Extended==4.6.0 \
  python-dotenv==1.0.1 Werkzeug==3.0.1

# 2. volcado del spec
cd /tmp/opencode/ifts12-backend/backend
/tmp/opencode/ifts12-venv/bin/python -c "
from config import create_app
app = create_app()
print(app.test_client().get('/apispec_1.json').get_json())" > /tmp/spec.json
```

Las dependencias salen de `backend/requirements.txt`; Flasgger está fijado en **0.9.7.1**
(`requirements.txt:4`). Para validar:

```bash
/tmp/opencode/ifts12-venv/bin/pip install swagger-spec-validator
/tmp/opencode/ifts12-venv/bin/python -c "
from swagger_spec_validator.validator20 import validate_spec
import json; validate_spec(json.load(open('/tmp/spec.json')))
print('spec valido')"
```

La comparación de cobertura se hizo contra `app.url_map.iter_rules()`, normalizando
`<int:x>` a `{x}` y descartando `HEAD`, `OPTIONS` y las rutas de Flasgger (`/apidocs`,
`/apispec_1.json`, `/flasgger_static`, `/static`, `/oauth2-redirect.html`).

**Reproducción del fallo mínimo:** con el spec crudo, `validate_spec` corta en el primer error
—una respuesta con `{'description': 'Tipo', 'tamaño o contenido inválido': None}`, ver BE-S09— y,
si se saltea, en `operationId: null` (BE-S05) y en el path param sin declarar (BE-S08).

---

## 3. Cobertura: qué hay y qué no aparece

| Grupo | Rutas | Operaciones | En el spec crudo |
|---|---|---|---|
| Académico (carreras, planes, materias, docentes, asociaciones) | 12 | 36 | Sí, con body ausente o vacío |
| Contenidos administrables (calendario, cuerpo docente, documentos, faqs, noticias, novedades, personas, slider) | 16 | 48 | Sí, con body roto |
| Archivos | 4 | 4 | Parcial (`info` ausente, path param sin declarar) |
| Contacto | 1 | 1 | ❌ Ausente |
| Autenticación | 1 | 1 | ❌ Ausente |
| Health | 2 | 2 | ❌ Ausente |
| **Total** | **36** | **92** | **31 rutas / 87 operaciones** |

---

## 4. Hallazgos

### BE-S01 — Cuerpos de request rotos en los 8 CRUD institucionales · 🔴 Crítico

**Evidencia.** `common/crud.py:137-151`. `props` se arma con salto de línea y 10 espacios de
indentación, la misma profundidad que la clave `properties:`, así que YAML los lee como hermanos:

```python
    props = "".join(
        f"\n          {name}: {{type: {_SWAGGER_TYPES.get(rule['type'], 'string')}"
        ...
    body = f"""
      - in: body
        name: body
        required: true
        schema:
          type: object
          required: [{req}]
          properties:{props}"""
```

En el spec resultante el schema de `POST /api/v1/personas` es
`{"type": "object", "properties": null, "nombre": {...}, "cargo": {...}}`: ni un campo dentro de
`properties`. Afecta a `personas`, `slider`, `documentos`, `faqs`, `noticias`, `novedades`,
`calendario` y `cuerpo-docente` (8 POST + 8 PUT).

**Fix.** Indentar `props` a 12 espacios (hijos de `properties`) y cerrar el bloque:

```python
    props = "".join(
        f"\n            {name}: {{type: {_SWAGGER_TYPES.get(rule['type'], 'string')}"
        + (", format: date" if rule["type"] not in _SWAGGER_TYPES else "")
        + "}"
        for name, rule in fields.items()
    )
```

**Aceptación.** Ningún schema de body contiene la clave `properties` en `null`; Swagger UI muestra
los campos de los 8 POST y 8 PUT.

### BE-S02 — Escrituras académicas sin `body` declarado · 🔴 Crítico

**Evidencia.** `common/swagger.py:349-392`. `write_doc()` recibe nombre, schema de respuesta,
summary y parámetros de path, pero **nunca agrega un parámetro `body`**, y las vistas académicas
solo usan `@swag_from(write_doc(...))`. Ejemplo: `POST /api/v1/carreras` queda con
`{operationId, responses, security, summary, tags}` y sin `parameters`. Son 18 operaciones
(6 POST + 6 PUT + 6 PATCH de carreras, planes, materias, docentes, planes-materias y
docentes-materias).

**Fix.** Agregar `fields` y `required` a `write_doc()` y construir el body con el mismo criterio
que `common/crud.py:_document()` (una sola función compartida evita que se vuelvan a desincronizar):

```python
def write_doc(tag, operation_name, response_schema, summary, status_code=200,
              path_parameter=None, path_parameters=None, delete=False,
              fields=None, required=(), partial=False):
    ...
    if fields:
        parametros_body = [{
            "in": "body", "name": "body", "required": True,
            "schema": {
                "type": "object",
                "properties": {n: {"type": _SWAGGER_TYPES.get(r["type"], "string")}
                               for n, r in fields.items()},
                **({"required": list(required)} if required and not partial else {}),
            },
        }]
```

**Aceptación.** Las 45 operaciones de escritura declaran `body` con `properties` no vacías (o
`formData` en la subida de archivos). Criterio de verificación automática:

```python
escrituras = [(p, m) for p, ops in spec["paths"].items() for m in ops
              if m in ("post", "put", "patch")]
sin_body = [(p, m) for p, m in escrituras
            if not any(x.get("in") in ("body", "formData")
                       for x in spec["paths"][p][m].get("parameters", []))]
assert not sin_body, sin_body
```

### BE-S03 — 5 endpoints del backend ausentes del spec · 🔴 Crítico

**Evidencia.** Vistas sin docstring ni `@swag_from`:

| Método y ruta | Archivo:línea | Por qué importa |
|---|---|---|
| `POST /api/v1/auth/login` | `apps/users/routes.py:12` | Es el único modo de obtener el JWT que piden todas las escrituras |
| `POST /api/v1/contacto` | `apps/contact/routes.py:12` | Único endpoint público de escritura del sitio |
| `GET /api/v1/archivos/{id}/info` | `apps/institutional/routes.py:89-94` | Metadatos que usa el panel para enlazar documentos |
| `GET /api/v1/health` | `common/routes.py:9` | Monitoreo |
| `GET /api/health` | `common/routes.py:9` (alias sin prefijo) | Monitoreo heredado |

**Fix.** Docstring `---` estilo Flasgger en las tres primeras y `@swag_from(collection_doc(...))`
o docstring equivalente en health. Para login, declarar `email`/`password` y los códigos
400/401/403; para contacto, `nombre` (≤100), `email` (≤120) y `mensaje`, con 201 y 400.

**Aceptación.** `spec["paths"]` contiene las 5 rutas y `set(url_map) - set(spec["paths"])` es
vacío.

### BE-S04 — 8 recursos sin `definitions` y respuestas sin esquema · 🟠 Alto

**Evidencia.** `common/swagger.py:14` solo define los schemas académicos (24). Los contenidos
institucionales responden `200: {description: Registro}` sin `schema`
(`common/crud.py:157-161`): hay **184 respuestas sin esquema** en el crudo, incluidas las de
`/api/v1/personas`, `/slider`, `/documentos`, `/faqs`, `/noticias`, `/novedades`, `/calendario`,
`/cuerpo-docente` y las de archivos.

**Fix.** Derivar cada definición de `Model.to_dict()` (fuente real de la respuesta) y referenciarla
desde las respuestas, más los envoltorios `{data}` y paginados:

```python
defs["PersonaInstitucional"] = {"type": "object", "properties": {...}}  # desde to_dict()
defs["PersonaInstitucionalResponse"] = {
    "type": "object", "properties": {"data": {"$ref": "#/definitions/PersonaInstitucional"}}}
defs["PaginatedPersonaInstitucional"] = {
    "type": "object", "properties": {
        "data": {"type": "array", "items": {"$ref": "#/definitions/PersonaInstitucional"}},
        "page": {"type": "integer"}, "size": {"type": "integer"},
        "total": {"type": "integer"}, "total_pages": {"type": "integer"}}}
```

**Aceptación.** Toda respuesta 2xx con cuerpo JSON tiene `schema` con `$ref` resoluble; no quedan
`$ref` a definiciones inexistentes.

### BE-S05 — `operationId: null` en los DELETE académicos · 🟠 Alto

**Evidencia.** `common/swagger.py:376` copia `operation_name` a `operationId`, y los seis DELETE
lo pasan como `None`: `apps/careers/routes.py:116`, `apps/academic/routes.py:227`, `:313`, `:399`,
`:495` y `:634`. Ejemplo: `write_doc("Carreras", None, "CarreraResponse", "Desactivar carrera", 200, ...)`.
Es inválido según el estándar y rompe generadores de clientes.

**Fix.** `"operationId": operation_name or f"{summary_slug}"` o, mejor, quitar la clave cuando el
valor sea `None`:

```python
doc = {"tags": [tag], "summary": summary, "security": [{"Bearer": []}], ...}
if operation_name:
    doc["operationId"] = operation_name
```

**Aceptación.** Ningún `operationId` es `null` y no hay dos iguales.

### BE-S06 — El `PUT` documentado contradice al runtime · 🟠 Alto

**Evidencia.** `common/crud.py:160` reutiliza el mismo `body` del POST, cuyo `required` son solo
los campos obligatorios; pero `replace_item` llama a `_save(item_id, partial=False)` y
`_save` exige **todos** los campos (`common/crud.py:89-91`):

```python
    values, message = validated_json(
        fields, required=() if partial else tuple(fields), partial=partial
    )
```

Un cliente que siga el Swagger manda solo lo obligatorio y recibe 400.

**Fix.** Dos bodies distintos: POST con `required = required`, PUT con `required = list(fields)`,
PATCH sin `required`.

**Aceptación.** Para cada `PUT`, el `required` del body coincide con `tuple(FIELDS)`; un request
con solo los campos obligatorios del POST falla en ambos lados (doc y runtime).

### BE-S07 — `PATCH` documentado con `{type: object}` vacío · 🟠 Alto

**Evidencia.** `common/crud.py:161`: `schema: {type: object}` sin `properties`. El panel no puede
saber qué campos acepta un PATCH de `personas`.

**Fix.** Mismos `properties` que el POST/PUT, sin `required` (partial=True). El spec curado ya lo
hace así.

**Aceptación.** Ningún `PATCH` con body vacío.

### BE-S08 — Parámetro de path no declarado en la descarga de archivos · 🟠 Alto

**Evidencia.** `apps/institutional/routes.py:59-68`: dos `@route` para la misma vista
(`/archivos/<int:archivo_id>` y `/archivos/<int:archivo_id>/<path:_nombre>`) con un docstring que
no declara `archivo_id`. El spec queda inválido: *"Path parameter 'archivo_id' used is not
documented"*.

**Fix.** Agregar el parámetro al docstring; para la variante con nombre, declarar también `_nombre`
como `string`. Alternativa: un `@swag_from` por regla (`/archivos/{archivo_id}` y
`/archivos/{archivo_id}/{_nombre}`) con su propio `parameters`.

**Aceptación.** Todo `{param}` presente en la ruta tiene su parámetro `in: path, required: true`.

### BE-S09 — Descripción YAML con coma sin comillas · 🟡 Medio

**Evidencia.** `apps/institutional/routes.py:39`:
`400: {description: Tipo, tamaño o contenido inválido}`. En YAML flow mapping la coma separa
claves, así que Flasgger publica `{"description": "Tipo", "tamaño o contenido inválido": null}`.
Es el primer error que reporta el validador.

**Fix.** Comillas dobles: `400: {description: "Tipo, tamaño o contenido inválido"}`. Vale la pena
revisar el resto de los docstrings por comas sin comillas.

**Aceptación.** Ninguna respuesta tiene claves fuera de `description`, `schema`, `headers` y
`examples`.

### BE-S10 — `POST /api/v1/contacto` responde 500 no-JSON si falla el commit · 🟡 Medio

**Evidencia.** `apps/contact/routes.py:28` usa `db.session.commit()` directo, a diferencia del
resto del backend, que pasa por `commit_or_error()` (`common/institutional.py`). Un error de
integridad escapa al `errorhandler` de `HTTPException` (`config/__init__.py`) y devuelve el 500
HTML de Flask, no `{error}`.

**Fix.** Reemplazar por `commit_or_error()` y devolver su respuesta si hay error.

**Aceptación.** Con una base caída o una restricción violada, la respuesta es
`{"error": "..."}` con código 500/409 y `Content-Type: application/json`.

### BE-S11 — Sin `host`, `produces` ni `consumes` · 🟡 Medio

**Evidencia.** El spec crudo tiene solo `basePath`, `definitions`, `info`, `paths`, `schemes`,
`securityDefinitions` y `swagger`. No hay `host`, y las 87 operaciones están sin `produces`; solo
`POST /api/v1/archivos` declara `consumes: multipart/form-data`. Un consumidor no puede deducir la
URL base (sigue abierta la pregunta P9 del frontend) ni el tipo de contenido de las descargas
binarias.

**Fix.** `produces: [application/json]` global, `consumes: [application/json]`, `host` desde
configuración (`API_HOST`) y `produces: [application/octet-stream, application/pdf, image/*]` en la
descarga de archivos.

**Aceptación.** `host` presente y toda operación con `produces` resuelto (global o propio).

### BE-S12 — Tags inconsistentes · 🔵 Bajo

**Evidencia.** `common/crud.py:136` hace `path.strip("/").split("/")[0].capitalize()`, lo que
produce `Cuerpo-docente` (guion conservado) frente a `Carreras`, `Materias por plan` o `Faqs`
(sigla capitalizada como palabra). En Swagger UI quedan dos criterios de nombres.

**Fix.** Pasar el tag como parámetro de `register_crud()` en lugar de derivarlo del path.

**Aceptación.** Cada recurso tiene un tag único y estable, declarado en `spec["tags"]` con
descripción.

### BE-S13 — `MessageResponse` genérico oculta la forma de la respuesta · 🔵 Bajo

**Evidencia.** `common/swagger.py:154-157` define `MessageResponse` como `{data: object}` y
`write_doc(..., response_schema=None, ...)` lo usa en los dos DELETE que no devuelven el registro
(`DELETE /api/v1/planes-materias/{relation_id}` y
`DELETE /api/v1/docentes-materias/{docente_id}/{materia_id}`). El cliente no sabe que la respuesta
trae `{"data": {"mensaje": "..."}}`.

**Fix.** Definir `MessageDataResponse` con `mensaje: string` y usar el `*Response` del recurso en
los DELETE que devuelven la fila desactivada.

**Aceptación.** Ninguna respuesta 2xx usa `{data: object}` sin propiedades.

---

## 5. Lo que sí está bien (para no romperlo al corregir)

| Ítem | Estado |
|---|---|
| Cobertura de rutas: 36 rutas / 92 operaciones, sin faltantes ni sobrantes | ✅ verificado contra `url_map` |
| Seguridad: lecturas públicas, escrituras con `Bearer` (JWT, roles admin/editor) | ✅ coherente con `common/authorization.py` |
| Envoltorios de respuesta `{data}`, `{data,page,…}` y `{error}` | ✅ coinciden con `common/responses.py` |
| Paginación (`page`, `size`, `incluir_inactivas`) en los listados | ✅ declarada en los 14 listados |
| Baja lógica en todos los DELETE | ✅ documentada como tal |
| `ErrorResponse` reutilizado en los códigos de error | ✅ sin `$ref` rotos |
| CORS y preflight OPTIONS fuera del JWT | ✅ `common/authorization.py` |

---

## 6. Orden de trabajo sugerido para Backend

1. **BE-S01 + BE-S02 + BE-S06 + BE-S07** en un solo PR: son la misma función de documentación.
   Sin esto, Swagger UI no muestra ningún campo y el resto de las mejoras no se puede probar.
2. **BE-S03**: docstrings de `login`, `contacto`, health y `archivos/info`. Cinco bloques cortos,
   impacto inmediato en quien integra el panel.
3. **BE-S05 + BE-S08 + BE-S09**: los tres errores que hacen fallar el validador. Son de una línea
   cada uno.
4. **BE-S04**: definiciones de los 8 recursos derivadas de `to_dict()`. Es el trabajo más largo y
   el que más valor aporta a los generadores de clientes.
5. **BE-S10 + BE-S11 + BE-S12 + BE-S13**: consistencia y calidad formal.

Cierre: volver a volcar `/apispec_1.json`, correr el validador y comparar contra `url_map` con el
script de §2. El spec curado
(`documentacion/driveFrontend/04_backend/swagger_ifts12_backend_2026-11-16.json`) sirve como
referencia de destino: es el mismo backend con estos arreglos aplicados en el archivo, no en el
código.

---

## 7. Límites de esta auditoría

- Se auditó **el spec**, no el comportamiento HTTP. No se ejecutaron requests contra una base
  real: los códigos 200/201/400/401/403/404/409 se tomaron del código de las vistas.
- No se revisó la lógica de negocio ni las migraciones (`migrations/versions/v0001…v0003`).
- No se auditó el contrato que consume el frontend (`src/api/`, `src/types/api/`) contra este
  spec nuevo: es la materia de `docs/06_audits/audit_2026-10-22-backend.md` y quedó desactualizada
  porque el spec del 16/11 es mucho más amplio (36 rutas contra 16 paths).
- `documentacion/driveFrontend/` no se versiona: el spec curado y el crudo no entran a git, solo
  este informe.

---

## 8. Documentos actualizados por esta auditoría

| Documento | Cambio |
|---|---|
| `documentacion/driveFrontend/04_backend/grupo_4_backend.md` | Sección nueva con el estado real del Swagger y los hallazgos BE-S01…S13 |
| `docs/02_technical/estado_implementacion.md` | Registro del spec del 16/11 y de la brecha de contrato |
| `docs/project_state.md` | Snapshot: contrato de API pendiente de arreglo en el backend |
| `docs/logbooks/` | Entrada de bitácora con el porqué de la generación y del curado |

---

## 9. Referencias

Instituto de Formación Técnica Superior N.º 12. (2026). *IFTS12_Backend_2026-11-16* [Paquete de
código fuente del backend, commit `85a849a`]. Equipo Backend IFTS N.º 12.

Instituto de Formación Técnica Superior N.º 12. (2026). *Swagger 2.0 del backend — spec crudo y
spec curado* [Archivos JSON]. `documentacion/driveFrontend/04_backend/`.

Flasgger. (2024). *Flasgger 0.9.7.1* [Biblioteca de Python para generar Swagger desde Flask].
PyPI. https://pypi.org/project/flasgger/0.9.7.1/

OpenAPI Initiative. (2021). *OpenAPI Specification v2.0 (Swagger)*.
https://spec.openapis.org/oas/v2.0

Python Software Foundation. (2026). *swagger-spec-validator* [Validador de specs Swagger 2.0].
PyPI. https://pypi.org/project/swagger-spec-validator/

Proyecto Sitio Web Institucional IFTS N.º 12. (2026). *Auditoría de contrato de API — apispec
OpenAPI vs. frontend* (`docs/06_audits/audit_2026-10-22-backend.md`).
