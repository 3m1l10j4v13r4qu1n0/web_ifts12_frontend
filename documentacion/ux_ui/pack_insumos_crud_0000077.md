# Pack de insumos para UX/UI — Diseño definitivo del CRUD administrativo (ticket 0000077)

**Para:** equipo UX/UI · **De:** Frontend · **Fecha:** 2 de noviembre de 2026
**Contexto:** ticket Mantis 0000077 (asignado a Manuk Meneses). Este documento concentra
todo lo que el diseño necesita saber de la implementación real, para que no haya idas y
vueltas. Todo lo que sigue está verificado contra el código y el Backend; lo que no está
verificado queda marcado como pregunta abierta, nunca como respuesta.

**Sitio de pruebas:** https://ifts12-test.tail5bd71a.ts.net/ · panel en `/admin/login`.
El acceso de prueba (usuario y contraseña) está en la nota privada del ticket 0000077 en
Mantis: no se replica en ningún archivo compartido ni en capturas.

---

## 1. Punto de partida en Figma

Archivo **"IFTS 12 v2 - alineado a contratos"** (fileKey `MHBgrLD9g8ka6sX6ezkO1l`),
referencia visual vigente.

**Ya existe en el archivo y sirve de base:**

| Elemento | Dónde |
|---|---|
| `A1 · Admin · Login` | páginas Desktop 1440 / Tablet 768 / Mobile 375 |
| `A3 · Admin · Formulario (alta / edición)` | ídem, los 3 breakpoints |
| `A3b · Admin · Confirmación de baja (modal)` | ídem, los 3 breakpoints |
| Componentes `Button`, `FormField`, `Eyebrow`, `Estado`, `ModalBaja`, `TablaAdmin`, `Skeleton` | página "02 · Componentes" (25 componentSets en total) |

**Páginas de trabajo:** `03 · Desktop 1440`, `04 · Tablet 768`, `05 · Mobile 375`,
`06 · Estados`, `07 · Specs / Handoff`.

---

## 2. Matriz de los 6 apartados × campos

Fuente: `src/constants/admin.ts` de la rama `fix/integracion-test-20261031`, contrastado
con los validadores del Backend (`CARRERA_FIELDS` y `*_FIELDS` de
`apps/academic/routes.py`). **No existen campos de modalidad, horarios ni
correlatividades: no se agregan.**

| Apartado | Campo | Tipo | Obligatorio | Límite / rango | Selección |
|---|---|---|:---:|---|---|
| **Carreras** | `nombre` | texto | ✅ | máx. 150 | — |
| | `titulo_otorgado` | texto | | máx. 200 | — |
| | `descripcion` | textarea | | — | — |
| | `activa` | casilla "Activo" | | — | — |
| **Planes de estudio** | `carrera_id` | selección | ✅ | — | → Carreras |
| | `nombre` | texto | | máx. 150 | — |
| | `codigo` | texto | | máx. 80 | — |
| | `resolucion` | texto | | máx. 150 | — |
| | `duracion_anios` | número | | entero, máx. 32767 | — |
| | `vigente_desde` | fecha | | — | — |
| | `vigente_hasta` | fecha | | — | — |
| | `activo` | casilla "Activo" | | — | — |
| **Materias** | `nombre` | texto | ✅ | máx. 180 | — |
| | `descripcion` | textarea | | — | — |
| | `programa_url` | texto (enlace) | | — | — |
| | `activa` | casilla "Activo" | | — | — |
| **Docentes** | `nombre` | texto | ✅ | máx. 120 | — |
| | `apellido` | texto | ✅ | máx. 120 | — |
| | `email` | correo | | máx. 254 | — |
| | `foto_url` | texto (enlace) | | — | — |
| | `descripcion` | textarea | | — | — |
| | `activo` | casilla "Activo" | | — | — |
| **Materias por plan** | `plan_estudio_id` | selección | ✅ | — | → Planes de estudio |
| | `materia_id` | selección | ✅ | — | → Materias |
| | `anio` | número | ✅ | entero, máx. 32767 | — |
| | `cuatrimestre` | número | | máx. 4 | — |
| | `orden` | número | | entero, máx. 32767 | — |
| **Docentes por materia** | `docente_id` | selección | ✅ | — | → Docentes |
| | `materia_id` | selección | ✅ | — | → Materias |

Notas:

- Los **cuatro primeros apartados** tienen casilla **Activo** (baja lógica).
- Las **dos relaciones no tienen casilla Activo**: su baja es quitar la relación.
- Los campos opcionales vacíos se envían como `null` (no como cadena vacía).

---

## 3. Operaciones reales (lo que el diseño debe reflejar)

Seis colecciones: `carreras`, `planes-estudio`, `materias`, `docentes`, `planes-materias`,
`docentes-materias`. Prefijo `/api/v1`, mismo origen que el sitio.

| Acción | Método | Detalle |
|---|---|---|
| Listar | `GET` | paginado: `{data, page, size, total, total_pages}` (`page`/`size` arrancan en 1) |
| Ver uno | `GET` | `{data: {...}}` |
| Alta | `POST` | el panel actual usa `POST` para crear |
| Editar | `PATCH` (también existe `PUT`) | el panel usa `PATCH` |
| Baja | `DELETE` | ver abajo |

**Clave de detalle:** `/:id` en todo, **excepto** `docentes-materias`, que usa
`/:docente_id/:materia_id` (clave compuesta).

**Baja según apartado:**

- Carreras, Planes, Materias, Docentes → la baja pone `activa`/`activo` en `false`: el
  registro **sigue en la base pero deja de publicarse** y **se reactiva desde
  Editar > casilla Activo**.
- Materias por plan, Docentes por materia → el `DELETE` **quita la relación** (para
  volver a dejarla hay que crearla de nuevo).

**Errores que el diseño debe tener previstos:** `400` validación, `401` sesión ausente o
vencida, `403` rol no autorizado, `404` inexistente, `409` conflicto de integridad.
Shape: `{"error": "mensaje en texto plano"}`.

**Sesión:** login con usuario y contraseña; el token dura **ocho horas** y no hay
"olvidé mi contraseña" ni cierre de sesión en el servidor: una sesión vencida obliga a
volver a entrar. La autorización se evalúa en el Backend con el rol actual del usuario.

**Lo que hoy trae el panel:** recorre todas las paginas con `size=100` y muestra el
listado completo (ver pregunta abierta N.º 3).

---

## 4. Estados que hay que diseñar

Los pide el ticket y todos existen o aplican en el código actual:

**Listado (por apartado):** datos · cargando (skeleton, componente `Skeleton`) · vacío ·
error con reintento · búsqueda y filtros (el ticket los incluye en el alcance).

**Formulario (alta y edición comparten pantalla):** campos en reposo · foco · validación
por campo (obligatoriedad, longitud, tipo número/fecha/correo) · error del Backend
conservando lo que el usuario escribió · ocupado (deshabilitado mientras guarda) · éxito
(mensaje "Cambios guardados.").

**Baja:** confirmación en modal (ya existe el frame `A3b`).

**Reactivación:** desde Editar, encendiendo la casilla *Activo* en los cuatro primeros
apartados.

**Transversales:** sesión vencida (`401` → volver al login) · conflicto `409` ·
identidad del usuario y cierre de sesión · navegación entre los seis apartados ·
estados de las tablas de relaciones (con las dos entidades referenciadas legibles).

---

## 5. Qué NO diseñar como si existiera

Esto **no está implementado** en el Backend: si aparece en un diseño, Frontend no lo va a
poder construir.

- Escritura de **novedades, FAQ y slider** (solo lectura hoy; el CRUD de noticias no
  existe).
- **Consultas recibidas** desde el panel (el formulario de contacto solo registra).
- **Administración de cuentas** y recuperación de contraseña.
- **Carga de archivos**: `foto_url` y `programa_url` son enlaces de texto, no subida de
  imágenes ni PDF.
- **Permisos diferenciados** del Editor: hoy Administrador y Editor tienen las mismas
  operaciones de contenido, y los permisos definitivos están pendientes de definición (no
  cambiarlos por cuenta propia, como indica el ticket).
- Campos de modalidad, horarios o correlatividades.

---

## 6. Restricciones del contrato visual vigente

- **Breakpoints:** Desktop 1440 (desde 1024 px) · Tablet 768 · Mobile 375 (hasta 767 px).
- **Reutilizar los componentes existentes** siempre que se pueda: `Button`, `FormField`,
  `Eyebrow`, `Estado`, `ModalBaja`, `TablaAdmin`, `Skeleton`. Componentes nuevos solo si
  los existentes no cubren el caso.
- **Identidad oficial conservada:** el panel mantiene la identidad del sitio; se conservó
  el footer oscuro con logos blancos sobre fondo transparente y el logo UPCN oficial
  indicado por el profesor. El botón "Administración" es configurable.
- **Sin contenidos inventados:** los textos e imágenes de ejemplo en un diseño no son
  contenido real. Las notas de diseño (`RF-xx`, `PENDIENTE`, "Se cargan desde el panel
  admin") **no se renderizan en la web**: quedan como anotación del diseño y, en código,
  como comentario (hay un test que falla si alguna se renderiza).
- **Accesibilidad:** objetivos táctiles de 44×44 px, foco visible, foco atrapado dentro de
  modales y menús, contraste legible.

---

## 7. Preguntas abiertas (para que las resolvamos juntos)

1. **Frame `A2 · Admin · Panel (Noticias + Carrusel)`:** no coincide con el CRUD
   académico implementado (los seis apartados de más abajo) y el Backend no permite
   escribir novedades. ¿Se reemplaza por el panel académico, se archiva o se mantiene
   aparte? *No proponemos respuesta: lo dejamos a la reunión.*
2. **Adjuntos del ticket** (`14-administrador-final.png` y `15-admin-movil.png`): no
   están en el avance de diseño ni en el repositorio. ¿Son bocetos propios? ¿De dónde
   salen?
3. **Paginación:** el panel actual trae todos los registros con `size=100`. ¿Diseñamos
   paginado, "cargar más" o listado completo?
4. **Selección de referencias:** con catálogos de hasta decenas de registros (carreras,
   materias, docentes…), ¿select tradicional o campo de búsqueda?
5. **Permisos del Editor:** están pendientes de definición. ¿Cómo representamos ese
   estado en el diseño para que no se lea como definitivo?
6. **Búsqueda y filtros por apartado:** ¿cuáles queremos en cada listado?

---

## 8. Checklist de validación (para cuando haya diseños)

Frontend va a revisar la entrega contra esto antes de implementar:

- [ ] Los **6 apartados** en Desktop 1440, Tablet 768 y Mobile 375.
- [ ] Cada campo de la matriz del punto 2 tiene su contraparte (o está marcado
      "no diseñar").
- [ ] Estados completos del punto 4 (datos, cargando, vacío, error, éxito, ocupado,
      validación, confirmación de baja, sesión vencida).
- [ ] Baja lógica con casilla *Activo* en los 4 primeros apartados; relaciones sin casilla.
- [ ] Login, identidad de usuario y cierre de sesión.
- [ ] Sin campos ni contenidos inventados; anotaciones de diseño no renderizadas.
- [ ] Componentes reutilizados o justificación de los nuevos.
- [ ] Specs y medidas en la página `07 · Specs / Handoff`.
- [ ] Criterios de accesibilidad incluidos (44×44, foco, contraste).

---

## 9. Referencias

- Diseño: Figma "IFTS 12 v2 - alineado a contratos", fileKey `MHBgrLD9g8ka6sX6ezkO1l`.
- Contrato visual: `docs/01_global/figma_v2_contrato_visual.md`.
- Contrato de API de administración: `docs/04_user_stories/HU-02/hu_02_api.md`.
- Ticket 0000077 procesado: `docs/02_technical/ticket_0000077_diseno_definitivo_crud_administrativo.md`.
- Rama con la implementación actual: `fix/integracion-test-20261031` (SHA `d1afcf8`),
  desplegada en el sitio TEST.
- Coordinación: 0000079 (ramas, reunión del 02/11/2026) · 0000075 (QA) · 0000073 (Front).
