# Auditoría de cumplimiento — Análisis funcional todo unificado IFTS 12

> Fecha: 2026-09-08
> Fuente auditada: `docs/driveFrontend/Analisis funcional todo unificado IFTS 12.pdf`
> Objeto auditado: frontend en su estado actual (rama `develop`/Fase 5, Home navegable con
> mocks, placeholders de URLs, sin consumo de API).
> Alcance: verificación de cumplimiento de los Requisitos Funcionales v1 (RF-01…RF-34), el
> mapa de contenidos y la propuesta de menú/accesos de la Parte IV/VI del documento.
> Documento vivo: revisar al recibir Drive de Edith, URLs oficiales y contratos de Backend.

## Resumen ejecutivo

| Categoría | Cumplimiento |
|---|---|
| Arquitectura e infraestructura (build estático, VPS separado del Moodle) | ✅ Alineado |
| Home con accesos rápidos, novedades y comunidades | 🟡 Parcial — estructura lista, faltan accesos (SIU, inscripción, constancias, mesas, calendario), imágenes y orden por fecha |
| Comunidades (tutoría / alumnos / docentes) | ✅ Implementado |
| Página institucional (historia, autoridades, normativa, bedeles, contacto, logos) | ❌ Placeholder |
| Carreras (modalidad, horarios, plan de estudios) | ❌ Solo 3 mocks, tipo sin modalidad |
| Noticias / novedades (CRUD, historial, imagen, último mes) | 🔵 Bloqueado por Backend + contenido (CRUD); slider visual sin imágenes |
| Autenticación / roles / panel de administración | 🔵 Bloqueado por Backend (AuthContext y ProtectedRoute preparados) |
| Enlaces externos (Moodle, inscripción GCBA, SIU) | 🟡 Preparados como placeholders vacíos (se muestran solo con URL oficial) |

## Matriz de cumplimiento RF-01 → RF-34

### Futuros ingresantes

| RQ | Requisito | Estado | Detalle / archivos |
|---|---|---|---|
| RF-01 | Listado completo de carreras con nombre y modalidad | ❌ | `types/domain/sitio.types.ts` — `Carrera` solo tiene `nombre` + `descripcionBreve`. Mocks: 3 carreras (`constants/mock-data.ts`), el documento referencia 6. Falta campo `modalidad`. |
| RF-02 | Requisitos y fechas de inscripción | ❌ | No existe sección ni contenido. |
| RF-03 | Acceso directo y visible al enlace oficial de inscripción del GCBA | 🟡 | `constants/enlaces.ts` → `ENLACES.inscripcion` placeholder vacío. CTA condicional ya implementado en `pages/HomePage.tsx:31`. Se activa solo con URL. |
| RF-04 | Horarios y modalidad de cada carrera | ❌ | No existe; el tipo `Carrera` no contempla horarios/modalidad. |
| RF-05 | Equivalencias y pases desde otros institutos | ❌ | No existe. |
| RF-06 | FAQ específica para futuros ingresantes | 🟡 | Categoría `ingresantes` existe en `FaqAcordeon` y `mock-data.ts`; los textos son genéricos pendientes de validación. |

### Estudiantes actuales

| RQ | Requisito | Estado | Detalle |
|---|---|---|---|
| RF-07 | Condiciones para mantener la regularidad | ❌ | No existe. |
| RF-08 | Cómo se solicitan constancias | ❌ | No existe (falta acceso rápido a Constancias). |
| RF-09 | Fechas y modalidad de mesas de examen | ❌ | No existe (falta acceso rápido a Mesas de examen). |
| RF-10 | Becas: tipos, requisitos, procedimiento | 🟡 | Solo acceso rápido "Becas" con `href: ''` (renderizado atenuado en `AccesosRapidos.tsx`). Sin contenido. |
| RF-11 | Calendario académico actualizado | ❌ | No existe (falta acceso rápido a Calendario). |
| RF-12 | Acceso directo y visible al Campus Virtual (Moodle) | 🟡 | `ENLACES.moodle` placeholder vacío; banda `bg-acento-100` y CTA ya implementados condicionalmente en Home. |
| RF-13 | Boleto estudiantil | ❌ | No existe. En el documento queda como "caso a confirmar" (¿solo informativo o trámite?). |
| RF-14 | FAQ específica para estudiantes actuales | 🟡 | Categoría `estudiantes` de mocks, textos genéricos. |

### Docentes

| RQ | Requisito | Estado | Detalle |
|---|---|---|---|
| RF-15 | Concursos docentes | ❌ | No existe. |
| RF-16 | Cuerpo docente por carrera | ❌ | No existe. |
| RF-17 | Información y accesos específicos para docentes | 🟡 | Solo "Comunidad docente" enlazada a `/docentes` (placeholder). |

### Institucional

| RQ | Requisito | Estado | Detalle |
|---|---|---|---|
| RF-18 | Historia del IFTS N.º 12 | ❌ | `pages/InstitucionalPage.tsx` es placeholder. |
| RF-19 | Autoridades | ❌ | placeholder. |
| RF-20 | Normativa (reglamento orgánico, código de convivencia) | ❌ | placeholder. |
| RF-21 | Logos institucionales (IFTS N.º 12, GCBA, UPCN) | ❌ | No implementado (documento pide: pie de página / Home). |
| RF-22 | Contacto: dirección Misiones 26, C1083 ABB, CABA; horario nocturno; correo | ❌ | `pages/ContactoPage.tsx` placeholder. El footer **no** incluye dirección/horario, aunque el documento los define como contenido fijo "a incluir en Contacto y pie de página" (Parte I y VII). |
| RF-29 | Bedeles: quiénes son y cómo contactarlos | ❌ | No existe (documento: informativo v1). |
| RF-30 | Acceso visible al sistema SIU | ❌ | No existe (enlace, nombre y público a confirmar por Edith). |
| RF-31 | Procedimiento de solicitud de títulos | ❌ | No existe (informativo en v1). |
| RF-32 | Procedimiento de traspasos entre IFTS | ❌ | No existe (informativo en v1). |
| RF-33 | Enlaces de interés (Ciudad Bilingüe, Centro de Simulación) | ❌ | No existe (prioridad baja, bloque/pie de página). |

### Administración

| RQ | Requisito | Estado | Detalle |
|---|---|---|---|
| RF-23 | Módulo de autenticación (login) para administración | 🔵 | `contexts/AuthContext.tsx` y `routes/ProtectedRoute.tsx` preparados sin uso. No hay ruta `/login` (backend no soporta auth todavía). |
| RF-24 | Roles y permisos de edición | 🔵 | No existe; depende del modelo de Backend. |
| RF-25 | CRUD de noticias, reciente→antigua, último mes en Home | 🔵 | `SliderNoticias` con mocks sin fechas (`mock-noticia.fecha = ''`); sin CRUD ni orden. |
| RF-26 | Panel de administración (calendario, horarios, autoridades, carreras, concursos) | 🔵 | No existe. |
| RF-27 | Contenidos administrables persistidos en BD | 🔵 | Backend (regla anti-alucinación: no inventar endpoints). |
| RF-28 | Acceso directo y visible a Moodle desde Home | 🟡 | Condicional implementado (`ENLACES.moodle`, banda + CTA). |
| RF-34 | Administrar imágenes del carrusel/slider desde panel | 🔵 | `SliderNoticias` no tiene imágenes; sin panel. |

## Comparativa con el mapa de contenidos (Parte IV) y propuesta consolidada (Parte VI)

### Accesos rápidos de Home

Propuestos por el documento: Campus Virtual (Moodle), SIU, Inscripción oficial (GCBA), Becas,
Constancias, Mesas de examen, Calendario académico.

| Acceso | Presente en Home |
|---|---|
| Campus virtual | ✅ (placeholder URL) |
| Tutorías | ✅ |
| Carreras | ✅ |
| Contacto | ✅ |
| Preguntas frecuentes | ✅ |
| Becas | ✅ (atenuado) |
| SIU | ❌ |
| Inscripción oficial GCBA | ❌ como acceso rápido (solo CTA condicional de portada) |
| Constancias | ❌ |
| Mesas de examen | ❌ |
| Calendario académico | ❌ |

### Menú principal

- **Actual (5 items, cumple regla 90/10/máx. 5)**: Carreras, Ingresantes, Estudiantes,
  Docentes, Noticias (`constants/navegacion.ts`).
- **Propuesto por el documento**: Home, Nosotros, Carreras, Comunidad docente, Comunidad
  alumnos, Comunidad tutoría, Preguntas Frecuentes, Noticias, Contacto — **9 items, excede el
  máximo de 4-5 aplicado por las reglas de navegación del proyecto**. Conflicto a resolver
  con UX/UI (el propio documento delega la arquitectura visual/menú definitiva a UX/UI).

### Comunidades

- Tutoría / Alumnos / Docentes: ✅ implementadas en Home (`mockComunidades` + `Comunidades.tsx`),
  coinciden con el documento.

### Novedades

- El documento pide: slider/carrusel con **imagen principal**, acceso a la nota completa,
  noticias del último mes visibles, historial, orden reciente→antigua y CRUD.
- Actual: slider de texto accesible sin imágenes, sin detalle de noticia, sin fechas, sin
  historial ni CRUD. 🔵.

### Contenido fijo vs. administrable (Parte V)

- Contenidos **fijos** que el frontend podría representar hoy: historia/normativa (falta
  Drive), logos (falta material), enlaces oficiales (faltan URLs), **dirección y horario
  (RF-22 — confirmados, no implementados)**.
- Contenidos **administrables** (noticias, calendario, autoridades, carreras, etc.): todos
  requieren Backend/CRUD → 🔵.

## Cumplimientos positivos detectados

1. **Complementariedad con Moodle**: el sitio se trata como servicio independiente y el
   acceso al Campus es un bloque condicional explícito en Home (alineado con la "aclaración
   fundamental" del documento).
2. **Tres comunidades** visibles al ingresar, tal como pide la minuta.
3. **FAQ organizada por segmento** (ingresantes / estudiantes / docentes) con acordeón
   accesible.
4. **Slider/carrusel accesible** sin librerías (base visual para el futuro con imágenes).
5. **Autenticación preparada** (AuthContext + ProtectedRoute) sin inventar backend.
6. **Regla anti-alucinación respetada**: no hay URLs, textos ni endpoints inventados; todo lo
   pendiente se muestra como placeholder o atenuado.
7. **Arquitectura e infraestructura alineadas** con el Plan B (build estático para servir
   desde Nginx en VPS separado; API única vía `api/client.ts` cuando existan contratos).
8. **Navegación responsive y accesible** (menú hamburguesa, active states, aria).

## Desvíos / tensiones detectadas

- `Carrera` sin `modalidad` ni `horarios` (RF-01/RF-04) y solo 3 mocks cuando el documento
  lista 6 carreras ("Carreras (6)").
- Footer sin dirección/horario de contacto a pesar de ser contenido fijo confirmado (RF-22).
- Falta acceso rápido a inscripción oficial GCBA como bloque de Home (hoy solo CTA de portada
  condicional).
- El menú propuesto por Análisis (9 items) choca con el límite de 5 del proyecto → coordinar UX/UI.
- Slider sin imágenes ni fecha → no cumple "último mes visible" ni orden reciente→antigua.
- Ítems de menú "Ingresantes", "Tutorías", "Docentes", "Estudiantes" son placeholder puro;
  el documento exige contenido real para cada perfil.

## Accionable sin dependencias externas (datos fijos confirmados)

Estos puntos no requieren Backend, Drive ni URLs para avanzar (son contenido fijo o
estructura):

1. **RF-22 — Contacto + pie de página**: agregar dirección "Misiones 26, C1083 ABB, CABA" y
   horario "atención nocturna" (datos confirmados en Parte VII) en `ContactoPage` y en el
   `Footer`.
2. **Accesos rápidos faltantes** (SIU, Inscripción, Constancias, Mesas, Calendario) como
   placeholders atenuados en Home (mismo patrón que "Becas"), a activar cuando lleguen URLs.
3. **Extender `Carrera`** con `modalidad` y `horarios` (RF-01/RF-04), manteniendo mocks para
   validar con Análisis.
4. **FAQ del documento** (preguntas priorizadas por segmento + nuevas: bedeles, SIU, títulos,
   traspasos) para reemplazar los textos genéricos de los mocks.
5. **Novedades con fecha** para permitir orden reciente→antigua y destacar el "último mes".

## Bloqueos externos (dependen de otros equipos)

- **Análisis / Dirección (Edith)**: Drive con contenidos, URL oficial de inscripción GCBA,
  enlace/nombre de SIU, datos de bedeles, detalle por carrera, material gráfico del carrusel,
  logos.
- **Backend**: endpoints (tabla vacía), modelo de datos, login/roles, panel de administración,
  CRUD de noticias. Sin contratos no se puede consumir API (regla anti-alucinación).
- **UX/UI**: wireframes, paleta y mapa de navegación definitivo (incl. resolución del menú
  de 9 items propuesto por Análisis vs. límite de 5).
- **QA**: criterios de aceptación y ambiente de testing (Parte VIII.13).

## Próximos pasos sugeridos

1. Aprobar el plan de implementación de la sección "Accionable sin dependencias externas".
2. Pedir formalmente a Análisis los pendientes de la Parte VII (SIU, bedeles, títulos,
   traspasos, detalle de carreras) y a Backend los contratos de API.
3. Re-auditar este documento cuando lleguen Drive, URLs y contratos.