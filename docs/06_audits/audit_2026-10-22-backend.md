# Auditoría de contrato de API — apispec OpenAPI vs. frontend

> Área: **Backend (Grupo 4)** · Proyecto Sitio Web Institucional IFTS N.º 12 — 2026
> Fecha de auditoría: **22/10/2026** · Rol: Decidora de Verdad (Capa 4 — verificación semántica)
> Fuente de verdad única: **`inbox/apispec_1.json`** — Swagger 2.0, «API institucional IFTS
> N.º 12», versión 1.0.0.
> Alcance: contrato de API del frontend (`src/api/`, `src/types/api/`, `src/hooks/`, consumo en
> páginas) contra el apispec.
> Disparador: pedido expreso del usuario. Contador de HUs cerradas: **0** (umbral 3), así que
> esta auditoría no la dispara el contador sino la llegada del apispec.
> Mecánica previa: `logsayer check` → sano con 1 aviso (`bandeja_entrada`: 3 archivos sin ubicar,
> entre ellos el propio `apispec_1.json`). `npm run build` ✅ y `npm run test` ✅ (29 archivos,
> **226 tests**). Todo pasa. El contrato, igual, está roto.

> **Regla de fuentes aplicada.** Todo endpoint, campo, parámetro y respuesta se contrastó contra
> `inbox/apispec_1.json`. **No** se usó `~/Descargas/backend_ifts12/` como verdad: el código
> backend quedó desactualizado por decisión del usuario (22/10/2026). Tampoco se usaron
> `documentacion/driveFrontend/04_backend/respuesta.md` (15/09/2026) ni
> `deudas_codigo_backend_2026-10-02.md` como contrato vigente: se citan solo como
> **antecedentes históricos superados**, y así quedan marcados en §6.

---

## 1. Resumen ejecutivo

El apispec llegó, pero **no es el contrato que el frontend implementó**. El 02/10/2026 el
frontend se alineó al código fuente de `backend_ifts12`: 5 rutas, arrays planos, `Carrera` con
`codigo`/`modalidad`/`resolucion`/`duracion_anios` en la raíz y novedades en `/api/novedades`.
El apispec del 22/10/2026 declara **8 recursos × 2 versiones = 16 paths**, todos `GET`, con
**respuestas paginadas**, un `Carrera` que **perdió cuatro campos**, planes de estudio y docentes
que el frontend nunca consumió, y **ninguna** mención a novedades, login, contacto ni health.

El resultado incómodo: **el frontend compila y los 226 tests pasan**, porque el contrato remoto
no está tipado en TypeScript ni testeado contra el apispec. Toda la incompatibilidad vive en el
borde de Zod y en los fixtures, que congelaron el contrato viejo. La primera llamada real contra
el backend nuevo rompe en `zCarreraApiLista.parse` (`src/types/api/carrera.schema.ts:25`).

**Veredicto:** 🔴 **el frontend NO es compatible con el apispec**, aunque `build`, `lint` y
`test` estén en verde. Lo que se rompe primero, en este orden:

1. `GET /api/carreras` responde `{data, page, size, total, total_pages}` y el schema espera un
   array → `ZodError` en `carrera.service.ts:21`. Afecta **7 superficies**: `/carreras`, la ficha
   `/carreras/:id`, la Home, `/buscar`, `/ingresantes`, `/docentes` y el buscador del header.
2. Aunque se envolviera el array, `Carrera` ya no trae `codigo` ni `modalidad` (ni `resolucion`
   ni `duracion_anios`) → segundo `ZodError`, y si se relajara el schema, la UI mostraría
   modalidad vacía y «PENDIENTE» en Datos oficiales.
3. En paralelo, `GET /api/novedades` **no existe en el apispec**: la Home, `/noticias`, la nota,
   `/buscar` y el buscador del header se quedan sin contrato (hoy reciben 404 → «No encontramos
   esta información»).

No hay pantalla blanca: `mensajeDeConsulta` (`src/utils/mensajeDeConsulta.ts:26-29`) convierte el
`ZodError` en «La información del servidor cambió de formato». Es una degradación *elegante*, no
una degradación *aceptable*: el sitio se queda sin carreras y sin novedades.

### 1.1 Tabla de severidad

| Severidad | Cantidad | Hallazgos |
|---|:---:|---|
| 🔴 **Crítico** | 3 | BE-N01 (paginado vs. array), BE-N02 (`Carrera` perdió 4 campos), BE-N03 (novedades sin contrato) |
| 🟠 **Alto** | 2 | BE-N04 (auth/contacto/health fuera del spec), BE-N05 (doble versionado sin canónica) |
| 🟡 **Medio** | 6 | BE-N07 (paginación), BE-N08 (campos oficiales mudados al plan), BE-N09 (auth sin definición), BE-N11 (sin `host`), BE-N12 (listados con agregados), BE-N13 (detalle por id vs. URL por slug) |
| 🔵 **Bajo** | 3 | BE-N10 (errores: **coincide**), BE-N14 (calidad formal del spec), BE-N15 (trampas de mapeo `activa`/`activo`) |
| 🟢 **Oportunidad** | 1 | BE-N06 (docentes/materias/planes ya existen y llenan huecos reales) |

### 1.2 Lo que el apispec sí resuelve

No es solo una mala noticia. El apispec cierra tres deudas históricas:

- **P7 / entrega 2 (Swagger):** existe y es formal. Ya no hay que derivar DTOs leyendo `models.py`.
- **Paginación (BE-A10 / pregunta 8 de Grupo 4):** existe, con nombres `page`/`size` (no
  `page`/`limit`).
- **`GET /api/carreras/{id}`:** existe (con `int64`). La deuda DB-14 deja de ser «no hay detalle»
  para pasar a ser «el detalle usa id numérico y la URL del sitio usa slug» (BE-N13).
- **Docentes, materias, planes-estudio:** existen y son la única fuente real para cuerpo docente,
  programas por materia y estructura del plan (BE-N06).

---

## 2. Verificación del apispec (lo que el archivo dice, textual)

Verificado con parseo del JSON (`swagger: 2.0`, `info.version: 1.0.0`, `basePath: "/"`,
`schemes: ["http","https"]`). Correcciones y precisiones sobre el resumen recibido:

| Ítem | Verificado | Observación |
|---|---|---|
| `swagger` | `2.0` | ✅ |
| `basePath` | `"/"` | ✅ pero **los `paths` ya incluyen `/api/...`**: la base es el origen, no `/api`. Ver BE-N11. |
| `schemes` | `http`, `https` | ✅ |
| `host` | **ausente** | ⚠️ Sin host no hay URL de testing. Ver BE-N11. |
| `paths` | **16** | 8 recursos × `/api/...` y `/api/v1/...`, todos `GET`. |
| `securityDefinitions` / `security` | **ausentes** | ⚠️ El spec no declara ni un esquema de autenticación. Ver BE-N09. |
| `consumes` / `produces` / `tags` / `descriptions` por operación | **ausentes** | ⚠️ Ver BE-N14. |
| `required` en los `definitions` | **ausente en todos** | ⚠️ En Swagger 2.0 eso hace que **toda propiedad sea opcional**. Ver BE-N14. |
| `PaginatedDocentes.data` | `Docente[]` (**con** `materias`) | ⚠️ El listado devuelve el agregado completo, no el `Summary`. Ver BE-N12. |
| `PaginatedMaterias.data` | `Materia[]` (**con** `docentes`) | ⚠️ Ídem anterior. |
| `PaginatedPlanesEstudio.data` | `PlanEstudio[]` (**con** `materias[]`) | ⚠️ Ídem anterior. |
| `PaginatedCarreras.data` | `Carrera[]` (**con** `planes[]`) | ⚠️ Ídem anterior. |
| `PlanMateria` | `id, anio, cuatrimestre, orden, materia: MateriaSummary` | ⚠️ **No hay campo de correlatividades.** Ver §5, BE-N06. |
| `MateriaSummary` | `id, nombre, descripcion, programa_url, activa, created_at, updated_at` | ✅ `programa_url` habilita «Programas». |
| `DocenteSummary` | `id, nombre, apellido, descripcion, email, foto_url, activo, created_at, updated_at` | ✅ |
| `ErrorResponse` | `{error: string}` | ✅ Único punto que sigue coincidiendo 1:1 con el frontend. |
| Recursos ausentes | `Novedad`, `auth/*`, `contacto`, `health`, `faq`, `slider`, `calendario`, `horarios`, `autoridades`, `bedeles`, `becas`, `tutorias` | Confirmado por listado de `definitions` y `paths`. |

**Aclaración importante sobre el resumen previo:** el apispec **no** tiene ningún campo de
correlatividades ni URL de PDF del plan de estudios. `resolucion` es un string
(`RS-2023-6336-GCABA-MEDGC`), no un archivo. Entonces «correlatividades» de BE-N06 queda
**desmentido**: con este spec la tabla de la ficha se puede llenar a medias (año, cuatrimestre,
orden y nombre de materia), no completa.

---

## 3. Matriz endpoint del apispec → consumo real

Leyenda: ✅ compatible · 🟡 compatible con ajustes · 🔴 incompatible / sin contrato · 🟢 oportunidad
no aprovechada.

| # | Path del apispec | Método | ¿Lo consume el frontend? | Servicio / DTO / hook | Veredicto |
|:--:|---|---|---|---|---|
| 1 | `/api/carreras` | GET | **Sí** | `carrera.service.ts:20` · `zCarreraApiLista` · `useCarreras:28` | 🔴 N01 + N02 + N07 |
| 2 | `/api/carreras/{carrera_id}` | GET | **No** (el detalle se resuelve sobre la lista, `CarreraDetallePage:41-47`) | — | 🟢 N08 + N13 |
| 3 | `/api/docentes` | GET | No | — | 🟢 N06 + N12 |
| 4 | `/api/docentes/{docente_id}` | GET | No | — | 🟢 N06 |
| 5 | `/api/materias` | GET | No | — | 🟢 N06 + N12 |
| 6 | `/api/materias/{materia_id}` | GET | No | — | 🟢 N06 |
| 7 | `/api/planes-estudio` | GET | No | — | 🟢 N06 + N12 |
| 8 | `/api/planes-estudio/{plan_id}` | GET | No | — | 🟢 N06 + N13 |
| 9 | `/api/v1/carreras` | GET | No | — | 🟡 duplicado exacto del #1, sin canónica (N05) |
| 10 | `/api/v1/carreras/{carrera_id}` | GET | No | — | 🟡 duplicado del #2 (N05) |
| 11 | `/api/v1/docentes` | GET | No | — | 🟡 duplicado del #3 (N05) |
| 12 | `/api/v1/docentes/{docente_id}` | GET | No | — | 🟡 duplicado del #4 (N05) |
| 13 | `/api/v1/materias` | GET | No | — | 🟡 duplicado del #5 (N05) |
| 14 | `/api/v1/materias/{materia_id}` | GET | No | — | 🟡 duplicado del #6 (N05) |
| 15 | `/api/v1/planes-estudio` | GET | No | — | 🟡 duplicado del #7 (N05) |
| 16 | `/api/v1/planes-estudio/{plan_id}` | GET | No | — | 🟡 duplicado del #8 (N05) |

### 3.1 Rutas que el frontend toca y el apispec **no** tiene

| Ruta en el frontend | Estado real del consumo | Evidencia | Veredicto |
|---|---|---|---|
| `GET /api/novedades` | **Consumida** por 5 superficies | `endpoints.ts:52` · `novedad.service.ts:20` · `useNovedades:29` · `NoticiasPage:45` · `NotaCompletaPage:28` · `HomePage:36` · `BusquedaPage:53` · `BuscadorGlobal:21` | 🔴 **N03** — contrato inexistente |
| `POST /api/auth/login` | **Consumida** por el login admin | `endpoints.ts:46` · `auth.service.ts:22` · `AdminLoginPage:52` | 🔴 **N04 / N09** |
| `POST /api/contacto` | **No consumida** (solo declarada) | `endpoints.ts:55`; ningún servicio la usa; el form simula el éxito en `FormularioConsulta.tsx:72-82` | 🟠 **N04** — deuda latente + falso éxito en UI |
| `GET /api/health` | **No consumida** (solo declarada) | `endpoints.ts:44`; ningún servicio la usa | 🔵 **N04** — declarada y muerta |

> Regla dura del proyecto aplicada: **un endpoint que no está en el apispec se trata como
> inexistente**. Por eso `/api/novedades` no es «un endpoint viejo que sigue andando»: es una
> dependencia sin contrato que puede desaparecer sin aviso, y su consumidor principal es la
> portada del sitio.

---

## 4. Matriz campo por campo: `Carrera` nuevo vs. frontend

### 4.1 `Carrera` (definición del apispec)

| Campo en el apispec | Tipo / nulable | ¿Está en `CarreraApi`? (`src/types/api/carrera.types.ts`) | ¿Está en `Carrera` de dominio? (`src/types/domain/sitio.types.ts`) | Veredicto |
|---|---|---|---|---|
| `id` | integer int64 | ✅ `:19` | ✅ (string, slug) `:4` | ✅ |
| `nombre` | string | ✅ `:21` | ✅ `:5` | ✅ |
| `descripcion` | string \| null | ✅ `:27` | ✅ como `descripcionBreve` (`mapper:62`) | ✅ (nombre histórico engañoso) |
| `titulo_otorgado` | string \| null | ✅ `:31` | ✅ `tituloOtorgado` `:14` | ✅ |
| `activa` | boolean | ❌ | ❌ | 🟡 nuevo, sin consumidor |
| `created_at` | string date-time | ❌ | ❌ | 🟡 nuevo, sin consumidor |
| `updated_at` | string date-time | ❌ | ❌ | 🟡 nuevo, sin consumidor |
| `planes` | `CarreraPlanSummary[]` | ❌ | ❌ | 🔴 **bloquea plan, materias y datos oficiales** (N06/N08) |
| `codigo` | **ya no existe** | ❌ pero **el schema lo exige** (`carrera.schema.ts:15`) y los fixtures lo traen (`test-utils.tsx:23`) | ❌ | 🔴 **N02** |
| `modalidad` | **ya no existe** | ❌ pero el schema lo exige (`:22`), el type lo declara (`:33`) y el mapper lo lee (`carrera.mapper.ts:63`) | ✅ `modalidad: string` `:7` → se renderiza en `CardCarrera:12`, `CarrerasPage:118`, `CarreraDetallePage:84` | 🔴 **N02** |
| `resolucion` | **ya no existe en la raíz** (migró al plan) | ❌ pero el schema lo exige (`:16`) y el type lo declara (`:25`) | ✅ `resolucion?` `:16` → `CarreraDetallePage:172,325` | 🔴 **N02 + N08** |
| `duracion_anios` | **ya no existe en la raíz** (migró al plan) | ❌ pero el schema lo exige (`:20`) y el type lo declara (`:29`) | ✅ `duracionAnios?` `:15` → `CarreraDetallePage:85-88` | 🔴 **N02 + N08** |

**Lectura:** de 12 propiedades del `Carrera` nuevo, el frontend acierta 4, ignora 4 y **declara 4
que ya no vienen**. Con Zod v4, una propiedad declarada sin `.optional()` es obligatoria: el
`parse` no falla por los campos de más, falla por los 4 que faltan.

### 4.2 Tipos anidados del apispec: no hay ni un tipo espejo en el frontend

| Tipo del apispec | Campos | ¿Existe en `src/types/api/`? | Dónde se necesitaría |
|---|---|---|---|
| `CarreraPlanSummary` | `id, carrera_id, nombre, codigo, resolucion, duracion_anios, vigente_desde, vigente_hasta, activo, created_at, updated_at` | ❌ | Ficha de carrera: «Datos oficiales», «Resoluciones», plan vigente |
| `PlanEstudio` | `CarreraPlanSummary` + `materias[]` | ❌ | Ficha: «Plan de estudios», «Materias» |
| `PlanMateria` | `id, anio, cuatrimestre, orden, materia` | ❌ | Ficha: tabla de materias por año/cuatrimestre |
| `MateriaSummary` | `id, nombre, descripcion, programa_url, activa, …` | ❌ | Ficha: «Programas» (botón Descargar hoy `disabled`) |
| `Materia` | `MateriaSummary` + `docentes[]` | ❌ | Página `/docentes`: cuerpo docente por materia |
| `DocenteSummary` | `id, nombre, apellido, descripcion, email, foto_url, activo, …` | ❌ | `/docentes` y «Cuerpo docente» de la ficha (`CarreraDetallePage:347-352`) |
| `Docente` | `DocenteSummary` + `materias[]` | ❌ | Listado `/docentes` |
| `ErrorResponse` | `error: string` | ✅ `error.types.ts:28-30` | `client.ts:30-38` | ✅ **BE-N10** |

### 4.3 Detalle fino que va a morder en el mapeo

- `CarreraPlanSummary.nombre` es `x-nullable`: un plan puede venir **sin nombre**. La ficha no
  puede usar `plan.nombre` como título sin fallback.
- `Carrera.activa` (femenino, en la carrera) vs. `CarreraPlanSummary.activo` (masculino, en el
  plan). Dos booleanos parecidos, con semántica distinta. Ver BE-N15.
- `vigente_desde` / `vigente_hasta` son `format: date` (no `date-time`), y `vigente_hasta` puede
  ser `null` (= vigente). Elegir «el plan vigente» requiere comparar contra hoy, no contra
  `activo`. Ver BE-N08.
- `PlanMateria.cuatrimestre` y `orden` son nulables; `anio` no. La tabla de la ficha tiene que
  ordenar y agrupar tolerando nulos.

---

## 5. Hallazgos

Todos los hallazgos usan el código de área **BE-N** (Backend, contrato nuevo). El «dueño» indica
quién puede cerrar el hallazgo, no quién lo escribió.

### BE-N01 — `GET /api/carreras` ahora es paginado y el schema espera un array · 🔴 Crítico

- **Evidencia:** `src/types/api/carrera.schema.ts:25` (`z.array(zCarreraApi)`) ·
  `src/api/services/carrera.service.ts:20-21` (`apiClient.get<CarreraApi[]>` + `parse` del
  array) · `src/hooks/useCarreras.ts:28-33` · consumidores: `CarrerasPage:9`,
  `CarreraDetallePage:41`, `HomePage:30`, `BusquedaPage:52`, `IngresantesPage:52`,
  `DocentesPage:45`, `BuscadorGlobal:20`.
- **Evidencia del contrato:** apispec `PaginatedCarreras` = `{data: Carrera[], page, size, total,
  total_pages}`; params `page` (default 1, mín 1) y `size` (default 10, mín 1).
- **Impacto:** `ZodError` («expected array, received object») en la primera respuesta. Las **7**
  superficies que usan carreras muestran error o lista vacía. `/ingresantes` pierde el contador
  de carreras; el buscador del header deja de indexar carreras.
- **Fix propuesto (sin implementar):** crear un schema genérico
  `zRespuestaPaginada(esquema)` reutilizable, devolver `{items, total, page, size, totalPages}`
  desde el servicio (no desde el hook) y que el hook exponga `total` además de `carreras`.
- **Dueño:** Frontend.

### BE-N02 — `Carrera` perdió `codigo`, `modalidad`, `resolucion` y `duracion_anios` · 🔴 Crítico

- **Evidencia:** `src/types/api/carrera.types.ts:23,25,29,33` ·
  `src/types/api/carrera.schema.ts:15,16,20,22` · `src/api/mappers/carrera.mapper.ts:63,66,67` ·
  `src/types/domain/sitio.types.ts:7,15,16` · `src/components/ui/CardCarrera.tsx:12` ·
  `src/pages/CarrerasPage.tsx:118` · `src/pages/CarreraDetallePage.tsx:84,85-88,172,325` ·
  fixtures: `src/test-utils.tsx:23,29,34,39` · `src/__tests__/api-schemas.test.ts:9,14`.
- **Evidencia del contrato:** `Carrera` = `id, nombre, descripcion, titulo_otorgado, activa,
  created_at, updated_at, planes`. `codigo`, `resolucion` y `duracion_anios` están en
  `CarreraPlanSummary`.
- **Impacto:** doble incompatibilidad. (a) Zod falla por campos faltantes, incluso si se arregla
  el paginado de N01. (b) Aunque se relaje el schema, la modalidad se muestra vacía en tarjetas y
  ficha, y «Datos oficiales» cae a PENDIENTE en título de resolución y duración. El campo
  `modalidad` además **no tiene reemplazo en el spec**: no existe en ningún definition.
- **Fix propuesto:** redefinir `CarreraApi` contra el spec (quitar los 4, sumar `activa` +
  timestamps + `planes`) y **congelar el render de modalidad** (ver §8, paso 5) hasta que
  Análisis/Backend definan de dónde sale. No inventar `modalidad` desde `planes.nombre`.
- **Dueño:** Frontend (tipos/mapper) + Análisis (decidir si la modalidad institucional sale de
  otro lado o se deja PENDIENTE).

### BE-N03 — `GET /api/novedades` no existe en el apispec · 🔴 Crítico

- **Evidencia:** `src/api/endpoints.ts:52` · `src/api/services/novedad.service.ts:20-21` ·
  `src/hooks/useNovedades.ts:29` · `src/pages/NoticiasPage.tsx:45` ·
  `src/pages/NotaCompletaPage.tsx:28` · `src/pages/HomePage.tsx:36` ·
  `src/pages/BusquedaPage.tsx:53` · `src/components/layout/BuscadorGlobal.tsx:21` ·
  `src/utils/busqueda.ts:27-30,40-44`.
- **Evidencia del contrato:** no hay `Novedad`, `novedades` ni `noticias` en `paths` ni en
  `definitions`. Tampoco hay CRUD de novedades (que HU-02 proponía).
- **Impacto:** el recurso con más superficie del sitio (portada, carrusel, listado, nota,
  historial, buscador) queda **sin contrato**. Contra un backend que respete el spec, las cinco
  superficies reciben 404 y muestran «No encontramos esta información». El buscador global
  degrada en silencio (ignora el error y busca solo sobre secciones y FAQ).
- **Observación semántica:** `/api/novedades` es el **único** recurso cuyo nombre el spec
  directamente no menciona y que el frontend sí consume. Es el hallazgo de mayor riesgo de
  producto, no de código.
- **Fix propuesto:** no tocar nada todavía; **aislar** el consumo detrás de una bandera y elevar
  la pregunta a Backend (§7, Q2). Si el recurso se confirma, congelar el DTO en
  `hu_01_api.md`/`hu_02_api.md` antes de reescribir tipos.
- **Dueño:** Backend (contrato) + Frontend (aislamiento).

### BE-N04 — `auth/login`, `contacto` y `health` tampoco están en el apispec · 🟠 Alto

- **Evidencia:** `src/api/endpoints.ts:44` (`/health`), `:46` (`/auth/login`), `:55`
  (`/contacto`) · `src/api/services/auth.service.ts:22-23` ·
  `src/pages/AdminLoginPage.tsx:52` · `src/components/ui/FormularioConsulta.tsx:72-82` y
  `:234-242`.
- **Evidencia del contrato:** el spec no declara `securityDefinitions`, no hay path `auth/*`, no
  hay `contacto` ni `health`.
- **Precisión sobre el hallazgo previo:** **el formulario de contacto no consume la API.** El
  submit valida en local y muestra «Consulta registrada. El envío real estará disponible cuando
  el backend habilite el canal oficial de contacto» (`FormularioConsulta.tsx:79-81,239-240`). O
  sea: no hay un consumo roto, hay (a) una ruta declarada y muerta en `endpoints.ts:55` y (b) un
  mensaje de éxito que **suena a envío**. La parte (b) es semántica del sitio y hay que corregirla
  aunque el contrato nunca llegue.
- **Impacto:** el login admin depende de un contrato que el spec no reconoce, y el token que se
  guarda no lo valida nadie (no hay ruta protegida declarada). El login puede dejar de funcionar
  sin que ningún test lo detecte, porque el test mockea `iniciarSesion`.
- **Fix propuesto:** mantener `auth.service` como está pero **marcarlo no contractual** (comment
  + issue), y reescribir el aviso del formulario para que no insinúe envío. Ver §8.
- **Dueño:** Backend (auth/contacto) + Frontend (copy) + Análisis (alcance del contacto).

### BE-N05 — Doble versionado `/api/...` vs. `/api/v1/...` sin canónica · 🟠 Alto

- **Evidencia:** `src/api/endpoints.ts:13` fija `${urlBaseCruda}/api` · `:10-11` documenta
  «ninguna usa versionado».
- **Evidencia del contrato:** los 16 paths son duplicados exactos; el spec no marca `deprecated`
  en ninguna de las dos familias, no hay `tags`, no hay nota de versión.
- **Impacto:** si Backend retira `/api/...` en favor de `/api/v1/...`, **cada** servicio cambia de
  URL a la vez. Hoy el frontend apuesta a `/api` sin que el spec lo declare canónico: es una
  decisión nuestra, no del contrato.
- **Fix propuesto:** que Backend declare la canónica (y marque la otra `deprecated`). En el
  frontend, dejar el prefijo en **una sola constante** (`PREFIJO_API`) para que el cambio sea de
  una línea; hoy ya está centralizado en `endpoints.ts:13`, así que el costo de esperar es cero.
- **Dueño:** Backend (decisión) + Frontend (centralización, ya hecha).

### BE-N06 — Docentes, materias y planes existen y llenan huecos reales · 🟢 Oportunidad

- **Evidencia de los huecos:** `src/pages/CarreraDetallePage.tsx:225-235` (plan «Descargar»
  `disabled`), `:253-283` (tabla de materias vacía con mensaje de proceso), `:295-305`
  (programas `disabled`), `:347-352` («La nómina se publica cuando esté disponible») ·
  `src/pages/DocentesPage.tsx:98-133` (nómina por carrera como mensaje de proceso).
- **Evidencia del contrato:** `MateriaSummary.programa_url`, `PlanMateria.{anio, cuatrimestre,
  orden}`, `Docente.{nombre, apellido, email, foto_url}` y `Carrera.planes[]`.
- **Qué se puede llenar de verdad:** cuerpo docente por materia y por carrera, tabla de materias
  por año/cuatrimestre, y «Programas» con `programa_url` (link real, no PDF propio).
- **Qué NO se puede llenar (corrección al resumen previo):** **correlatividades** — no hay campo
  en `PlanMateria` ni en ningún definition; y **PDF del plan de estudios** — `resolucion` es un
  string, no un archivo. La columna «Correlativas para cursar/rendir» y el botón «Descargar plan»
  siguen sin fuente.
- **Fix propuesto:** servicios `docente.service.ts`, `materia.service.ts` y `plan.service.ts`
  (solo lectura, con Zod), y conectar «Cuerpo docente» y «Programas». Dejar correlatividades y
  PDF como PENDIENTE con el motivo explícito.
- **Dueño:** Frontend (consumo) + Análisis (¿la tabla de correlatividades se publica sin
  correlativas, o se espera un campo nuevo?).

### BE-N07 — Paginación: `page`/`size` (default 10) vs. consumo sin paginar · 🟡 Medio

- **Evidencia:** `src/api/services/carrera.service.ts:11` («Sin parámetros de query, sin
  paginación») · `:20` (llamada sin `params`) · `src/pages/CarrerasPage.tsx:15-17` (el copy usa
  `carreras.length` como total) · `src/pages/HomePage.tsx:147` («{carreras.length} carreras») ·
  `src/utils/busqueda.ts:40-44` (índice local sobre la lista cargada).
- **Evidencia del contrato:** `size` default **10**, mínimo 1; no hay máximo declarado; `total`
  y `total_pages` vienen en la respuesta.
- **Impacto:** con 6 carreras hoy no se nota; con 11 el sitio **miente en silencio**: el contador
  de la Home y de `/carreras` dice 10, el buscador no encuentra la carrera 11, y su slug da 404 en
  la ficha (porque el detalle se resuelve contra la página cargada). No es un error visible: es
  una truncación silenciosa. Además, la convención histórica `?page=1&limit=10` (BE-A10) quedó
  reemplazada por `?page&size` — hay documentación que sigue diciendo `limit`.
- **Fix propuesto:** pedir `size` explícito (p. ej. 100) mientras no haya paginación de UI, o
  implementar paginación real; usar `total` para los contadores y para decidir si hay que seguir
  pidiendo páginas antes de indexar en el buscador.
- **Dueño:** Frontend.

### BE-N08 — Los campos oficiales se mudaron al plan: hay que redefinir de dónde lee la ficha · 🟡 Medio

- **Evidencia:** `src/api/mappers/carrera.mapper.ts:54-56,65-67` (lee `resolucion`,
  `duracion_anios` y `titulo_otorgado` de la raíz) · `src/pages/CarreraDetallePage.tsx:157-183`
  («Datos oficiales») · `:325` (resolución) · `src/types/domain/sitio.types.ts:9-16`.
- **Evidencia del contrato:** `CarreraPlanSummary` = `codigo, resolucion, duracion_anios,
  vigente_desde, vigente_hasta, activo`; `Carrera` conserva solo `titulo_otorgado`.
- **Impacto:** la ficha muestra «Título que otorga» ✅, pero resolución y duración quedan sin
  fuente. Y hay una ambigüedad nueva: una carrera puede tener **varios** planes (`planes[]`), así
  que «la resolución» y «la duración» dejan de ser un dato único.
- **Fix propuesto:** decidir (con Análisis) cuál es el «plan vigente» —candidato: `activo === true`
  y `vigente_hasta === null`, o el de `vigente_desde` más reciente— y resolverlo en el mapper, no
  en la página. Mostrar `plan.codigo` y `plan.resolucion` con fallback a PENDIENTE.
- **Dueño:** Frontend (mapper) + Análisis (regla de negocio «plan vigente»).

### BE-N09 — El apispec no define autenticación de ninguna clase · 🟡 Medio

- **Evidencia:** `src/types/api/auth.types.ts:11-31` (`LoginRequest`, `UsuarioApi`,
  `LoginResponse`) · `src/types/api/auth.schema.ts:10-21` · `src/api/client.ts:5,13-21` (Bearer
  desde `auth_token`) · `src/api/services/auth.service.ts:14,22`.
- **Evidencia del contrato:** sin `securityDefinitions`, sin `security`, sin ningún path de auth.
  Tampoco hay 401/403 documentados: los únicos errores declarados son **400** (listados) y
  **404** (detalles).
- **Impacto:** `{token, usuario:{id,nombre,apellido,email,rol}}` es un contrato que nadie
  respalda. Tampoco hay contrato para expiración, refresh ni verificación de sesión, y el
  interceptor mapea 401/403 con textos propios (`client.ts:50-53`) que el spec no prevé.
- **Fix propuesto:** no escribir más código de auth hasta que Backend declare el esquema. Dejar
  el body actual documentado como **no contractual** en `error.types.ts`/`auth.types.ts` (ya hay
  precedente: `ApiErrorBody` está declarado y sin usar a propósito).
- **Dueño:** Backend.

### BE-N10 — `ErrorResponse {error: string}` coincide con el frontend · 🔵 Bajo (conforme)

- **Evidencia:** `src/types/api/error.types.ts:24-30` (`ApiErrorMessage = string`,
  `ApiErrorResponse {error}`) · `src/api/client.ts:30-38` (lee `error` string) · `:46-61`
  (fallbacks por estado).
- **Evidencia del contrato:** `ErrorResponse: {error: string}`.
- **Veredicto:** **único punto del contrato que sigue coincidiendo 1:1.** Consecuencia práctica:
  el manejo de errores **no** es parte del problema. `ApiErrorBody` (`error.types.ts:38-42`)
  queda definitivamente muerto (era la forma de BE-A5, que ya nadie sostiene).
- **Fix propuesto:** ninguno. Solo corregir el comentario de `error.types.ts:11-21`, que todavía
  plantea «dos caminos» cuando el apispec ya eligió uno.
- **Dueño:** Frontend (comentario).

### BE-N11 — Sin `host` en el spec: la URL base sigue sin definirse (P9 abierta) · 🟡 Medio

- **Evidencia:** `src/api/endpoints.ts:3-7,13` (`VITE_API_BASE_URL` con fallback
  `http://localhost:5000`).
- **Evidencia del contrato:** `host` ausente; `basePath: "/"`; `schemes: [http, https]`.
- **Impacto:** el build de despliegue sigue apuntando a `localhost:5000`. Además hay una trampa
  concreta: como los `paths` del spec **ya incluyen** `/api/...` y `basePath` es `/`, la base
  correcta es **el origen** (`https://host`), no `https://host/api`. Si alguien configura
  `VITE_API_BASE_URL=https://host/api` «siguiendo el spec», `endpoints.ts:13` produce
  `/api/api/carreras`.
- **Fix propuesto:** documentar en `endpoints.ts` que la variable es **origen sin path**, y pedir
  a Backend/Infra la URL de testing (§7, Q6).
- **Dueño:** Backend/Infra (host) + Frontend (comentario y validación de la variable).

### BE-N12 — Los listados devuelven agregados completos, no `Summary` · 🟡 Medio (nuevo)

- **Evidencia:** no hay ningún consumidor (los servicios no existen), por eso no rompe hoy.
- **Evidencia del contrato:** `PaginatedDocentes.data` = `Docente[]` (con `materias[]`);
  `PaginatedMaterias.data` = `Materia[]` (con `docentes[]`); `PaginatedPlanesEstudio.data` =
  `PlanEstudio[]` (con `materias[]`); `PaginatedCarreras.data` = `Carrera[]` (con `planes[]`).
- **Impacto:** el nombre del schema dice «paginated» pero el payload no es liviano: una página de
  10 docentes trae 10 docentes × sus materias. Al tipar, es tentador asumir que el listado trae
  `DocenteSummary` (por el nombre del definition) y perder los campos anidados. También invita a
  un N+1 evitable: para la página `/docentes` alcanza con el listado, sin pedir cada detalle.
- **Fix propuesto:** tipar los listados con el tipo **completo** que declara el spec y no con el
  `Summary`; reutilizar los anidados en la UI en vez de pedir detalles uno por uno.
- **Dueño:** Frontend (tipado) + Backend (confirmar que es intencional).

### BE-N13 — El detalle nuevo usa `id` numérico; la URL del sitio usa slug · 🟡 Medio (nuevo)

- **Evidencia:** `src/api/mappers/carrera.mapper.ts:7-19,33-41` (slug derivado del `nombre`) ·
  `src/pages/CarreraDetallePage.tsx:43-47` (resuelve contra la lista) ·
  `src/pages/CarrerasPage.tsx:52` (`/carreras/${carrera.id}` con id de dominio = slug).
- **Evidencia del contrato:** `GET /api/carreras/{carrera_id}` con `carrera_id` `integer` (path,
  **required**). No hay slug en ningún definition.
- **Impacto:** «ya existe el detalle» no elimina el problema de DB-14, lo transforma: para pedir
  el detalle hay que tener el `id` numérico, y el `id` solo se consigue desde la lista — que ahora
  es paginada. Si el slug no está en la página cargada, la ficha da 404 aunque la carrera exista.
- **Fix propuesto:** mantener slug→id en el mapper y, para la ficha, pedir
  `GET /api/carreras/{id}` una vez resuelto el id (deja de depender de `size`). Alternativa de
  producto: pasar la URL a `/carreras/{id}` — decisión de UX/Análisis, no de Frontend solo.
- **Dueño:** Frontend + UX/Análisis (esquema de URL).

### BE-N14 — Calidad formal del spec: sin `required`, sin auth, sin `produces` · 🔵 Bajo (nuevo)

- **Evidencia:** parseo del JSON: ninguna definición tiene `required`; no hay
  `securityDefinitions`; no hay `consumes`/`produces`; ninguna operación tiene `description`,
  `summary` ni `tags`.
- **Impacto:** en Swagger 2.0, sin `required` **todas** las propiedades son opcionales. Un
  generador de tipos produciría un `Carrera` con los 8 campos opcionales, lo que invita a un
  frontend que tolera cualquier cosa. También impide distinguir «dato que siempre viene» de «dato
  que puede faltar», que es justo lo que el Zod del proyecto necesita.
- **Fix propuesto:** pedir a Backend que agregue `required`, `produces: application/json` y
  descripciones; no bloquear el consumo por esto, pero **no** generar tipos automáticamente desde
  el spec hasta que esté.
- **Dueño:** Backend.

### BE-N15 — Trampas de mapeo: `activa` vs. `activo`, `nombre` nulable, fechas `date` · 🔵 Bajo (nuevo)

- **Evidencia:** no hay código todavía (los tipos del plan no existen), por eso es preventivo.
- **Evidencia del contrato:** `Carrera.activa` (bool) vs. `CarreraPlanSummary.activo` (bool);
  `CarreraPlanSummary.nombre` y `.codigo` son `x-nullable`; `vigente_desde`/`vigente_hasta` son
  `format: date`; `PlanMateria.cuatrimestre` y `.orden` son nulables.
- **Impacto:** mapeos invertidos (`activo`↔`activa`), títulos vacíos por `plan.nombre === null`, y
  comparaciones de fecha mezclando `date` con `date-time` (`new Date('2023-01-01')` se interpreta
  UTC; `created_at` no).
- **Fix propuesto:** al crear `plan.schema.ts`, nombrar `activoPlan` ≠ `activaCarrera`, usar
  `.nullable()` en todo lo que el spec marca `x-nullable`, y parsear `date` como fecha local
  (`YYYY-MM-DD` + mediodía) para no correr el día.
- **Dueño:** Frontend.

---

## 6. Documentación que quedó obsoleta

En todos los casos, la fuente que gana es `inbox/apispec_1.json` (22/10/2026). Los documentos de
respuesta histórica se marcan como **superados** y no se editan en esta auditoría: el
informe es el registro, y los cambios de Capa 1 los decide el equipo.

### 6.1 `docs/02_technical/contrato_api_backend.md` — **superado casi por completo**

| Línea | Dice | Contradice al apispec |
|---|---|---|
| `:15-16` | «vigente para `GET /carreras` y `GET /novedades`; el resto bloqueado» | carreras ya no es array; novedades no existe en el spec; hay 8 recursos |
| `:20-30` | jerarquía «código fuente manda», «solo 5 rutas existen» | el apispec declara 16 paths |
| `:51-58` | «prefijo `/api/`, sin `/api/v1/`» | el spec duplica ambas familias |
| `:101-113` | tabla de «los 5 endpoints que existen» | faltan 8 recursos; `/auth/login`, `/contacto` y `/health` no están en el spec |
| `:124-136` | `CarreraApi[]` array plano con `codigo`, `resolucion`, `duracion_anios`, `modalidad` | **contradicción campo por campo** (N01/N02) |
| `:137-153` | DTO de novedades, trampa de fecha naive UTC | recurso inexistente en el spec (N03) |
| `:157-166` | errores `{error: string}` | ✅ **sigue vigente** (N10) |
| `:168-180` | «lo que NO existe», incluido `/api/carreras/:id` | docentes, materias, planes y detalle **existen** |
| `:189-206` | paginación «no existe», Swagger «no hay» | paginación y Swagger **existen** |
| `:232-243` | estado de P1–P9 | P1 sigue abierta, P5 y P7 quedan resueltas por el apispec |
| `:283-297` | impacto en frontend: 2 servicios, DTOs reales | hay 3 servicios, uno de ellos (auth) fuera del spec |

**Recomendación:** no es un documento a corregir línea por línea, es un documento a **reemplazar**
por una especificación derivada del apispec (Capa 1), con el histórico de código movido a un anexo
marcado como superado.

### 6.2 `docs/04_user_stories/HU-01/hu_01_api.md` — **parcialmente superado**

| Línea | Dice | Contradice al apispec |
|---|---|---|
| `:14-18` | «`/api/` sin `/api/v1/`»; solo carreras y novedades con esquema | versión duplicada; 8 recursos con esquema |
| `:20-23` | «el código fuente es la fuente de verdad» | ahora manda el apispec; el código quedó desactualizado (decisión 22/10) |
| `:27-32` | tablas de endpoints de la Home | falta `GET /api/carreras/{id}`; novedades sigue sin respaldo |
| `:44-73` | `GET /api/carreras` sin paginación, array plano, con `codigo` y `modalidad` | **contradicción directa** (N01/N02) |
| `:75-107` | DTO de novedades | recurso ausente del spec (N03) |
| `:109-121` | `/api/faqs` y `/api/slider` no existen | ✅ sigue vigente |
| `:138-148` | §5 «sin paginación», «array plano», «sin filtros» | paginación y `data` wrapper **existen** |
| `:159-162` | `POST /api/contacto` existe con body y 201 | no está en el spec (N04) |
| `:163-165` | «`/api/carreras/:id` no existe» | existe, por `id` numérico (N13) |

### 6.3 `docs/04_user_stories/HU-02/hu_02_api.md` — **parcialmente superado**

| Línea | Dice | Contradice al apispec |
|---|---|---|
| `:15-21` | «solo dos rutas existen» y el código es la verdad | el spec reconoce 16 y ninguna de las dos de HU-02 |
| `:29-43` | tabla con `login` y `novedades` ✅ | ninguno de los dos está en el spec |
| `:45-82` | DTO del login | contrato sin respaldo (N09) |
| `:122-131` | errores `{error: string}` | ✅ sigue vigente |
| `:136-140` | «sin paginación ni filtros server-side» | `page`/`size` existen (N07) |

### 6.4 `docs/02_technical/modelo_datos_global.md` — **superado en las entidades que importan**

| Línea | Dice | Contradice al apispec |
|---|---|---|
| `:11-12` | campos «dependen de la tabla Swagger (entrega 2)» ⏳ | el apispec llegó |
| `:18` | `Carrera` con `modalidad` y `horarios` | sin `modalidad` ni `horarios`; con `planes`, `activa`, timestamps |
| `:19` | `Noticia` como entidad base | no existe en el spec |
| `:20-28` | FAQ, Slider, Calendario, Horario, Docente, Autoridad, Bedel, Beca, Tutoría | de todas, **solo `Docente`** existe |
| `:31` | `Usuario`/`Rol` con roles propuestos | no hay auth definida (N09) |
| `:32` | `ApiErrorResponse {code, message, details}` ✅ | **marcado ✅ cuando es falso**: el spec dice `{error: string}` (N10) |

> El `:32` es el error de estado más grave del documento: da por confirmada una forma de error que
> el apispec desmiente y que el código nunca implementó.

### 6.5 `docs/project_state.md` (Capa 2 — snapshot)

| Línea | Dice | Contradice al apispec |
|---|---|---|
| `:84-88` | consumo real «contra `GET /api/carreras` y `GET /api/novedades`», DTOs de `models.py` | carreras cambió de forma; novedades sin contrato |
| `:86-87` | «`endpoints.ts` con solo las 5 rutas que existen en `app.py`» | 16 paths vigentes, 8 recursos |
| `:96-99` | login contra `POST /api/auth/login` | no está en el spec |
| `:420-422` | «Modalidad desde el backend, no PENDIENTE» | el campo **desapareció** del contrato (N02) |
| `:423-428` | «el código fuente manda»; «5 endpoints de 16» | decisión revertida el 22/10: manda el apispec |
| `:429-431` | «detalle sin endpoint de detalle» | `GET /api/carreras/{id}` existe (N13) |
| `:445-447` | bloqueo por «las 11 rutas restantes» | docentes/materias/planes ya no son bloqueo |
| `:457-458` | «Swagger no llegó» | llegó (P5/P7 cerradas) |
| `:461-462` | «`/api/contacto` existe» | fuera del spec (N04) |

> No se edita el snapshot en esta auditoría (regla del rol: la Capa 2 la actualiza quien cierra
> sesión). Queda como insumo para el próximo cierre.

---

## 7. Preguntas que hay que hacerle a Backend

Ordenadas por impacto. Cada una tiene que volver por escrito: sin respuesta, el frontend no
avanza sobre ese recurso.

**Q1 · Versionado canónico.** El spec declara `/api/...` y `/api/v1/...` con contenido idéntico y
sin `deprecated`. ¿Cuál es la canónica? ¿La otra se retira, se mantiene como alias o se congela?
¿Cuándo? *(N05)*

**Q2 · Novedades.** El spec no tiene `Novedad` ni `novedades` ni `noticias`. ¿Desapareció el
recurso, está pendiente de documentar, o se renombró a otro path? Si sigue existiendo: ¿cuál es el
DTO definitivo y su contrato de orden/paginación? Es la portada del sitio. *(N03)*

**Q3 · Autenticación.** No hay `securityDefinitions`. ¿Cuál es el mecanismo (JWT Bearer?), dónde
está `POST /auth/login`, qué devuelve exactamente (`token` + `usuario`?), hay `logout`/`me`, qué
roles existen y qué códigos (401/403) devuelve? ¿Se aplica a alguna ruta de las 16? *(N09)*

**Q4 · Contacto y health.** No están en el spec. ¿`POST /api/contacto` y `GET /api/health` siguen
vigentes fuera del spec, o quedaron afuera a propósito? Si siguen: body, validaciones, códigos y
respuesta 201. *(N04)*

**Q5 · Paginación y filtros.** Confirmar: `page` 1-based, default 1; `size` default 10; ¿hay máximo
de `size`? ¿Cuál es el orden por defecto de cada listado (carreras, docentes, materias, planes)?
¿Por qué `planes-estudio` no acepta `?carrera_id=`? Sin ese filtro, la ficha de carrera necesita
N+1 requests o filtrar en cliente. *(N07, N13)*

**Q6 · Host de testing y base.** `host` está vacío y `basePath` es `/`. ¿Cuál es la URL de testing
(esquema, host, puerto) y si hay prefijo extra detrás de un proxy? ¿`schemes: [http, https]` refleja
el entorno real? ¿CORS para el origen de Vite y para el dominio de producción? *(N11, P9)*

**Q7 · Campos oficiales y plan vigente.** `resolucion`, `duracion_anios` y `codigo` ahora viven en
`CarreraPlanSummary`. ¿Con qué criterio se elige «el plan vigente» de una carrera: `activo`,
`vigente_desde`, `vigente_hasta`? ¿Puede haber dos planes activos? ¿`Carrera.titulo_otorgado`
alcanza como dato único de la carrera? *(N08)*

**Q8 · Modalidad y horarios.** `modalidad` desapareció de todo el spec y los horarios nunca
estuvieron. ¿Se van a publicar? Si no, hay que retirar el campo del sitio y ajustar el copy con
UX/UI, no dejarlo «PENDIENTE» para siempre. *(N02)*

**Q9 · Correlatividades y PDF del plan.** `PlanMateria` no tiene correlativas y `resolucion` es un
string, no un archivo. ¿Se van a agregar (`correlativas_cursar`, `correlativas_rendir`,
`plan_url`)? Hoy la tabla de la ficha se puede llenar solo a medias. *(N06)*

**Q10 · Obligatoriedad en el spec.** Ninguna definición tiene `required`. ¿Se puede completar para
distinguir «siempre viene» de «puede faltar»? Afecta la validación de Zod y el tipado. *(N14)*

---

## 8. Arreglos de implementación (priorizados, **sin tocar código**)

Lo que el frontend puede resolver solo, sin esperar a Backend. El orden importa: cada paso
depende de que el anterior esté decidido.

1. **No parchear a medias (bloqueante de proceso).** Un `parse` que acepte `array | {data}` con
   `union` haría pasar el build y escondería el desajuste. El contrato cambió de forma: se cambia
   el tipo, no se tolera el error. *(N01)*
2. **Schema paginado reutilizable.** `zRespuestaPaginada(esquema)` con `data`, `page`, `size`,
   `total`, `total_pages`; usarlo en carreras y dejarlo listo para docentes/materias/planes. El
   servicio devuelve `{items, total, page, size, totalPages}` y el hook expone `total`.
   *(N01, N07, N12)*
3. **Reescribir `CarreraApi` contra el spec.** Quitar `codigo`, `modalidad`, `resolucion`,
   `duracion_anios`; agregar `activa`, `created_at`, `updated_at`, `planes: CarreraPlanSummaryApi[]`.
   Crear `plan.types.ts` + `plan.schema.ts` + mapper. *(N02, N08, N12, N15)*
4. **Resolver «plan vigente» en el mapper, no en la página.** Una función
   `planVigente(planes)` con la regla que defina Análisis; la ficha consume un objeto
   `datosOficiales` ya resuelto. Mientras no haya regla, `undefined` → PENDIENTE. *(N08)*
5. **Decidir qué pasa con «Modalidad».** Tres opciones legítimas: sacarla de la UI y del tipo de
   dominio, mostrarla siempre como PENDIENTE con mensaje de proceso, o esperar un campo nuevo. Lo
   que no se puede es seguir leyendo un campo que ya no existe ni inventarlo desde
   `planes[].nombre`. Decisión con Análisis/UX. *(N02)*
6. **Detalle por id.** Mantener slug→id y, en la ficha, pedir `GET /api/carreras/{id}` después de
   resolver el id desde la lista (o pedir `size` grande). Así la ficha deja de depender de la
   página cargada. *(N07, N13)*
7. **Servicios nuevos de solo lectura.** `plan.service.ts`, `materia.service.ts`,
   `docente.service.ts`, con sus tipos y Zod; conectar «Cuerpo docente» (por materia y por
   carrera) y «Programas» (`programa_url`). Dejar correlativas y PDF del plan como PENDIENTE con
   motivo. *(N06)*
8. **Aislar novedades.** No reescribir `novedad.*` contra un contrato inexistente. Sacar el
   consumo detrás de una bandera/feature-flag de módulo y dejar las superficies con mensaje de
   proceso, o mantener el consumo actual aceptando que está fuera de contrato y que puede caerse.
   La decisión es de producto, no técnica. *(N03)*
9. **Contacto: arreglar el mensaje, no el endpoint.** «Consulta registrada» suena a envío y no hay
   envío. Cambiar el copy a mensaje de proceso (o a mailto si Análisis lo define). *(N04)*
10. **Documentar la base URL.** Dejar explícito en `endpoints.ts` que `VITE_API_BASE_URL` es
    **origen sin `/api`** (`basePath: "/"` + paths con `/api`), para evitar el `/api/api`.
    *(N11)*
11. **Actualizar fixtures y tests al contrato nuevo, al final.** `src/test-utils.tsx:19-39`,
    `src/__tests__/api-schemas.test.ts:9,14,82` y `src/__tests__/api-services.test.ts:62-65`
    congelan el contrato viejo; el test `:82` incluso **afirma** que `{data, meta}` debe fallar.
    Mientras no se actualicen, la suite verde es una falsa señal de compatibilidad. *(N01, N02)*
12. **No generar tipos desde el spec todavía.** Sin `required`, un generador produce todo
    opcional y destruye la validación de borde. Escribir los tipos a mano hasta que el spec
    declare obligatoriedad. *(N14)*

### 8.1 Orden de merge sugerido

Un solo ticket no: el cambio de contrato de carreras (pasos 2–4) es independiente del alta de
planes/docentes (paso 7), y novedades (paso 8) y contacto (paso 9) no dependen de nada técnico.
Sugerencia: **(A)** pasos 1–5 en una rama `fix/contrato-carreras`; **(B)** pasos 6–7 en
`feature/detalle-y-docentes`; **(C)** pasos 9 y 10 sueltos; **(D)** paso 11 dentro de (A) y (B),
nunca antes.

---

## 8.5 Reconciliación con la auditoría UX/UI (22/10/2026)

Esta auditoría y la UX/UI (`audit_2026-10-22-ux-ui.md`) se contradicen en tres puntos.
Decisión del 22/10/2026: **el apispec manda** sobre `hu_01_api.md` y `hu_02_api.md` mientras
el recurso no figure en el contrato.

| Tema | Auditoría de API | Auditoría UX/UI | Resolución |
|---|---|---|---|
| Contacto | Fuera del apispec → aislar | #0029 pide implementar `POST /api/contacto` | **Aislar.** Se corrige igual el éxito falso. |
| Auth | Fuera del apispec → aislar | #0023 lo da por resuelto | **Aislar.** El código queda detrás de un flag. |
| Novedades | Fuera del apispec → aislar | #0025 lo da por resuelto | **Aislar.** |

Esto confirma BE-N03 y BE-N04: mientras el recurso no esté en el apispec, el frontend no lo
consume. El plan derivado son 13 tareas, una rama por tarea, en
`inbox/plan_aislamiento_apispec_2026-10-22.md` §13-§14.

## 9. Límites de esta auditoría

- **No se ejecutó el frontend contra el backend nuevo.** Se verificó contrato contra código y se
  corrieron `build` y `test` (verdes), pero no hay instancia del backend que sirva este apispec.
  Todo el impacto descrito es **estático** (schema vs. spec) más el comportamiento conocido del
  borde de Zod y del interceptor.
- **No se usó `~/Descargas/backend_ifts12/`** como verdad, por decisión del usuario. Las
  referencias a `app.py`/`models.py` que sobreviven en comentarios del código citan un backend
  **desactualizado**; se señalan donde importan (§6).
- **`inbox/apispec_1.json` todavía no es un documento de Capa 1.** Sigue en la bandeja y el
  `logsayer check` lo lista sin ubicar. El ruteo lo decide Mentat; esta auditoría solo lo usa como
  fuente de verdad, no lo promueve.
- **No se tocó `documentacion/driveFrontend/`** ni ningún otro documento de Capa 1, 2 o 3. El
  bloque para insertar en `grupo_4_backend.md` se entrega al usuario, listo para pegar.

---

## 10. Referencias

Backend IFTS N.º 12. (2026). *API institucional IFTS N.º 12* (versión 1.0.0) [Especificación
OpenAPI 2.0]. `inbox/apispec_1.json`.

Equipo de Backend. (2026). *Respuesta a definiciones técnicas formales* (15/09/2026).
`documentacion/driveFrontend/04_backend/respuesta.md`. **[Superado: antecedente histórico.]**

Equipo de Backend. (2026). *Backend IFTS N.º 12 — Guía de instalación y ejecución* (README de
`backend_ifts12`, 01/10/2026). `inbox/_done/readme_backend_ifts12.md`. **[Superado: antecedente
histórico.]**

Equipo de Frontend. (2026). *Contrato de API del backend* (02/10/2026).
`docs/02_technical/contrato_api_backend.md`. **[Superado por el apispec del 22/10/2026; ver §6.1.]**

Equipo de Frontend. (2026). *HU-01: Especificación de API — Home institucional pública*
(actualizada el 02/10/2026). `docs/04_user_stories/HU-01/hu_01_api.md`. **[Parcialmente superado;
ver §6.2.]**

Equipo de Frontend. (2026). *HU-02: Especificación de API — Administración de contenidos del
sitio* (20/10/2026). `docs/04_user_stories/HU-02/hu_02_api.md`. **[Parcialmente superado; ver
§6.3.]**

Equipo de Frontend. (2026). *Modelo de datos global (entidades base)* (18/09/2026).
`docs/02_technical/modelo_datos_global.md`. **[Superado en las entidades que importan; ver §6.4.]**

Equipo de Frontend. (2026). *Estado actual del proyecto* (snapshot de Capa 2, al 22/10/2026).
`docs/project_state.md`. **[Requiere actualización; ver §6.5.]**

Equipo de Frontend. (2026). *Auditoría de Backend — respuesta del equipo vs. estado del
proyecto* (15/09/2026). `docs/06_audits/audit_2026-09-15-backend.md`.

Equipo de Frontend. (2026). *Grupo 4 — Backend (Datos y APIs)* (actualizado el 02/10/2026).
`documentacion/driveFrontend/04_backend/grupo_4_backend.md`. **[Se actualiza con el bloque
entregado junto a este informe.]**

Equipo de Frontend. (2026). *Preguntas abiertas a Backend — a partir del README de
`backend_ifts12`* (01/10/2026).
`documentacion/driveFrontend/04_backend/preguntas_abiertas_2026-10-01.md`. **[P1–P9: P1 y P9
siguen abiertas; P5 y P7 quedan resueltas por el apispec.]**

Equipo de Frontend. (2026). *Deudas y hallazgos del código backend* (02/10/2026).
`documentacion/driveFrontend/04_backend/deudas_codigo_backend_2026-10-02.md`. **[Superado como
contrato; se conserva como diagnóstico del código desactualizado.]**

IFTS N.º 12. (2026). *Análisis funcional validado* (18/09/2026).
`documentacion/frontend/analisis_funcional_validado.md`.
