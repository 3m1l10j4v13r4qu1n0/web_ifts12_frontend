---
fase: fase-10
---

# Estado del proyecto — IFTS N.º 12 (frontend)

> Snapshot operativo para el agente al iniciar cada sesión. No es acumulativo: se
> sobrescribe al cerrar sesión con aprobación previa. No dupliques contenido de
> specs ni repitas el roadmap completo. El detalle técnico vigente vive en
> `docs/02_technical/estado_implementacion.md`.

## Fase actual del roadmap

Fase 10

_(Fase 10 = **alineación del frontend a los exports Desktop 1440 del avance de diseño**,
página por página (tareas T1–T16). Cierra la Fase 9, que había dejado el consumo real de API de
carreras y novedades. Detalle de avance y pendientes en la sección siguiente.)_

## Alineación al diseño del avance (en curso · próxima sesión)

Plan de alineación página por página a los **exports Desktop 1440** del avance de diseño
(`documentacion/driveFrontend/01_analisis_funcional/avance_disenio_sitio_ifts12/`, 14 PDFs) y
al contrato `docs/01_global/figma_v2_contrato_visual.md`. El plan vive en
`inbox/plan_diseño_aprobado.md` (tareas **T1–T16**, no versionado). Estado al 15/10/2026:

- **Hechas y mergeadas a `develop`:** T1 (header), T2 (home), T3 (carreras), T4 (ficha de
  carrera, 15/10/2026) y T5 (novedades, 15/10/2026).
- **T6 (nota completa, 15/10/2026):** mergeada a `develop` (`1852e46`).
- **T7 (FAQ, 15/10/2026):** mergeada a `develop` (PR #19, `e4c22ad`).
- **T8 (búsqueda, 16/10/2026):** mergeada a `develop` (PR #20, `45afdda`).
- **T9 (ingresantes, 16/10/2026):** mergeada a `develop` (PR #21, `79cc8c3`).
- **T10 (estudiantes, 16/10/2026):** mergeada a `develop` (PR #22, `bf30b5c`). Detalle en
  "Alineación al diseño del avance" más abajo.
- **Pendientes (próxima sesión):** T11 (docentes), T12 (tutorías), T13 (institucional), T14
  (contacto), T15 (404) y T16 (verificación y cierre).
- **Regla de anotaciones (14/10/2026):** los textos de los exports que son **notas de UX/UI**
  (refs `RF-xx`, `PENDIENTE`, "Se cargan desde el panel admin", "Sin datos inventados", etc.)
  **no se renderizan** en ninguna pantalla: van como **comentario de código** en el componente.
  Ya corregido en Home y Carreras (`fix/alineacion-disenio-anotaciones`, merge `dca04ed`). Los
  mensajes de proceso tipo "sitio en construcción" sí se mantienen. La regla quedó en
  `inbox/plan_diseño_aprobado.md` y ahora tiene **guard mecánico**:
  `src/__tests__/anotaciones-no-renderizadas.test.ts` (15/10/2026) recorre las fuentes de
  `src/` y falla si una anotación quedó renderizada.
- **Texto propio fuera de la UI (15/10/2026):** se quitaron del render y quedaron como
  comentario el `descripcion` original del encabezado de Carreras ("Oferta académica del
  instituto…") y el segundo renglón del subtítulo del carrusel de la Home ("Contenidos
  provisorios pendientes de validación."). Ninguno figura en los 14 PDFs (verificado con
  `pdftotext`): eran copy propio, no del diseño. En **T5** se recuperó para Carreras la **bajada
  del export** ("Oferta académica del IFTS N.º 12: N carreras en turno exclusivamente nocturno…"),
  con la cantidad tomada del backend (no fija en el "5" del diseño).
- **Base de las ramas Tn (15/10/2026):** las ramas T4–T16 se habían creado por adelantado desde
  `1b40ec3`, **anterior** al fix de anotaciones (`dca04ed`) y al de logos (`29b2fe6`); por eso T4
  arrancó con los textos viejos y hubo que integrar `develop` a mitad de tarea. Regla: **cada Tn
  se crea desde el `develop` del momento** (`git fetch` → `checkout develop` → `pull` →
  `checkout -b feature/…`), nunca reutilizando una rama pre-creada.
- **Ajuste de logos del header (14/10/2026):** el usuario reportó los dos logos "en diferentes
  posiciones". Ahora van `logoCABA.png` + `apple-touch-icon.png`, ambos a `h-10` y centrados
  (antes `IFTS12.jpg` h-10 + `logoCABA.png` h-8). El footer e Institucional siguen con
  `IFTS12.jpg`. Rama `fix/header-logos`, merge `29b2fe6`.
- **Límite:** solo hay exports Desktop 1440; el Figma v2 (tablet/mobile) sigue bloqueado por
  rate limit (429).

## Qué está construido

- SPA React 19 + Vite + TypeScript strict + Tailwind v4 con `npm run lint · build · test` en verde
  (**175 tests**, antes 29).
- Home navegable según el **Mapa del Sitio V2** (9 ítems de menú + buscador global en el header),
  portada con carrusel institucional, footer V2, secciones de Carreras, Ingresantes,
  Estudiantes, Tutorías, Docentes, Institucional, Noticias, FAQ y Contacto, más rutas de detalle
  `/carreras/:id` y `/noticias/:id` y 404. La **portada de la Home siempre se muestra** (título +
  subtítulo institucionales); el set de novedades del carrusel muestra un **skeleton** mientras
  carga y solo se ve con datos del backend (14/10/2026).
- **Consumo real de API para carreras y novedades** (02/10/2026), contra `GET /api/carreras` y
  `GET /api/novedades`:
  - `src/api/endpoints.ts` con `VITE_API_BASE_URL` (fallback `localhost:5000`) y solo las 5 rutas
    que existen en `app.py`.
  - DTOs + esquemas Zod derivados de `models.py`: `carrera.types.ts`, `novedad.schema.ts`.
  - Servicios `carrera.service.ts` y `novedad.service.ts`, única capa que conoce endpoints.
  - Hooks `useCarreras` / `useNovedades` con TanStack Query (`staleTime` 5 min y 2 min).
  - Consumen API: `CarrerasPage`, `NoticiasPage`, `CarreraDetallePage`, `NotaCompletaPage`, las
    secciones de carreras y novedades de la **Home**, y el **buscador global**.
  - Estados de carga, error con reintento y vacío en las cuatro vistas. El mensaje de error lo
    produce el interceptor global de `src/api/client.ts`, no el componente (RN-13).
- Resto del sitio **sigue con datos simulados** en `src/constants/mock-data.ts` (se eliminó el
  bloque `mockComunidades` por B3/I12).
- HU-01 especificada y **actualizada contra el código** en `docs/04_user_stories/HU-01/`.
- **Correcciones de UX/UI y Frontend** especificadas en Capa 1
  (`docs/01_global/correcciones_ux_ui_frontend.md`, 08/10/2026): 9 bloqueantes (B1–B9), 12
  importantes (I1–I12) y 7 mejoras (M1–M7) de la auditoría UX/UI del 07/10, cada una con criterio
  de aceptación. Pendiente de priorización/implementación.
- **Plan de correcciones UX/UI y Frontend (faseado):** Capa 1 define el **orden y fases** para
  abordar esos hallazgos en `docs/01_global/plan_correcciones_uxui_frontend.md` (08/10/2026),
  complementando los criterios por corrección de
  `docs/01_global/correcciones_ux_ui_frontend.md`.
- **Revisión del consumo de API (técnica):** Capa 2 registra el único punto pendiente
  (guard defensivo de `contenido` en `NotaCompletaPage`) en
  `docs/02_technical/revision_consumo_api.md` (08/10/2026), sujeto a validación con
  Backend/Contenidos.
- **Rediseño alineado al Figma v2 «IFTS 12 v2 - alineado a contratos» (en curso, rama
  `feature/figma-v2-contrato-visual`):** el Figma nuevo quedó registrado como contrato visual
  vigente en Capa 1 (`docs/01_global/figma_v2_contrato_visual.md`, da de baja al Figma anterior)
  y las dos auditorías asociadas viven en Capa 4 (`docs/06_audits/audit_2026-10-08-ux-ui-frontend.md`
  y `audit_2026-10-09-figma.md`). Ejecutadas las **Fases 2–5** del plan:
  - Tokens de diseño en `src/styles/index.css` (`@theme`, regla 90/10: acento único + neutros, una
    sola familia Source Sans 3, escala H1 48/H3 24/H4 20, zonas táctiles de 44px, contenedor
    fluido 1216px).
  - Componentes base nuevos: `Button` (variantes/tamaños/cargando), `Badge`, `Eyebrow`,
    `Breadcrumb`, `Tabs`, `FiltroTag`, `Paginacion`, `Estado` (loading/empty/error/success/404…),
    `Toast`, `ModalBaja`, `FormField` (+Input/Select/Textarea), `Checkbox`, `TablaAdmin`.
  - Layout: `Header` (top bar Campus/SIU/Inscripción, logo→home, buscador, hamburguesa 44×44 sin
    ícono de persona), `NavMenu` con activo subrayado, `MobileMenu` (Esc + scroll-lock),
    `EncabezadoPagina` estándar con eyebrow de sección, íconos con `lucide-react`.
  - Páginas: buscador como página `/buscar` agrupado por tipo + enlace "Ver todos los resultados",
    FAQ con filtro por segmento, Ingresantes/Carreras con `useCarreras()`, admin solo-UI
    (`/admin` y `/admin/login` con acciones deshabilitadas y PENDIENTE), 404 con `Estado`, y se
    eliminó el bloque "Comunidad de alumnos" (B3/I12: `Comunidades.tsx`, `mockComunidades`, tipo y
    test). Pantallas alineadas a tokens y `EncabezadoPagina` en todo el sitio.
  - **Pendiente:** Fase 6+ (responsive e interactivos finos) y tokens de color definitivos de
    UX/UI — el `get_figma_data` de Figma está en rate limit (~4 días), se trabaja con la
    referencia FLACSO + GLOBAL_VARS ya obtenidos.
- **Alineación al diseño del avance (14/10/2026, en curso):** T1–T10 mergeadas a `develop`; la
  próxima tarea pendiente es T11 (docentes).
  - **T1 (header):** top bar con la ubicación `Misiones 26, C1083 ABB, CABA · Atención
    exclusivamente nocturna` (texto del PDF; el plan decía "nocturno") y accesos con etiqueta
    larga (`Campus Virtual Moodle` / `SIU · Autogestión` / `Inscripción GCBA`); constante
    `UBICACION_HEADER` en `constants/navegacion.ts`.
  - **T2 (home):** orden del diseño (Carrusel → Accesos destacados → Novedades del último mes →
    Carreras → Accesos rápidos → FAQ). Se **mantiene** la sección "Carreras" (Oferta académica · N
    carreras + "Ver todas las carreras") — decisión del usuario, revierte el plan original que la
    quitaba. `mockAccesosRapidos` pasa a **7** accesos con las descripciones del diseño. FAQ de la
    Home: 4 destacadas (no coinciden todavía con las 4 del diseño; se alinean en T7) + "Ver todas
    las preguntas" → `/faq`. Sin "Comunidades".
  - **T3 (carreras):** H2 "Nuestras carreras" + subtítulo con cantidad; sección "Horarios" →
    "Turno, modalidad y horarios (resumen)" con tabla Carrera/Turno/Modalidad/Horarios/Ficha
    (Turno = Nocturno, Modalidad = dato real del backend, Horarios = PENDIENTE, Ficha → detalle).
  - **T4 (ficha de carrera, 15/10/2026):** `CarreraDetallePage` reescrita según el export
    "02.1 · Carrera · detalle (plantilla)": breadcrumb + eyebrow "Carreras", índice lateral "En
    esta carrera" (7 anclas) y bloques Presentación, Datos oficiales, Modalidad y horarios, Plan
    de estudios, Materias y correlatividades (tabla con estado vacío), Programas, Resoluciones y
    Cuerpo docente; sidebar "¿Querés inscribirte?" + "Consultar por esta carrera" + "En esta
    carrera" + "Otras carreras". Los campos oficiales del DTO (`titulo_otorgado`,
    `duracion_anios`, `resolucion`) se agregaron al tipo de dominio `Carrera` y al mapper
    (`undefined` si el backend trae `null`): "Datos oficiales" muestra dato real y PENDIENTE solo
    como fallback. Turno = "Exclusivamente nocturno" (RN-07), Modalidad = backend, Horarios =
    PENDIENTE, PDFs (plan/programas/resoluciones) con "Descargar" deshabilitado. Anotaciones del
    diseño (RF-16, "PENDIENTE INSTITUCIONAL", "Se administra desde el panel") como comentario de
    código. Hallazgo: la DB real tiene una tabla `materias` **vacía** y sin modelo/ruta, lo que
    confirma el estado vacío. Verificado en navegador contra un servidor local que replica
    `app.py:62-92` sobre `instance/ifts12.db`.
  - **T5 (novedades, 15/10/2026):** `NoticiasPage` alineada al export "08 · Novedades":
    hero con la bajada real ("Gacetillas, avisos y comunicaciones del instituto, de la más
    reciente a la más antigua"), barra de filtros (búsqueda en vivo + Año + Mes + "Filtrar"),
    chips de categoría **derivadas de los datos del backend** (no se inventa el listado del
    wireframe: el export trae "Carreras / Institucional / Gacetillas / Docentes" como nota de
    UX/UI), contador "N de N resultados · orden: más reciente primero.", grilla 1/2/3 columnas y
    paginación de 6. `CardNoticia` con badges fecha+categoría, copete a 3 líneas e imagen 16:9.
    `Noticia` ganó `categoria`; el mapper mapea `categoria`; helper `src/utils/fecha.ts`
    (`dd/mm/aaaa`). Además, fixes de encabezado que salieron de la revisión: `EncabezadoPagina`
    acepta **breadcrumb** opcional → `/carreras` y `/noticias` muestran "Inicio / Sección"; y
    Carreras recupera breadcrumb, **bajada del export** y eyebrow "Carreras" (antes "Oferta
    académica", que no está en el PDF). Verificado en navegador contra el mock local.
  - **T6 (nota completa, 15/10/2026):** `NotaCompletaPage` reescrita según el export
    "08.1 · Novedades · nota completa": `EncabezadoPagina` con breadcrumb `Inicio / Novedades /
    título` y eyebrow "Novedades", badges fecha (`dd/mm/aaaa`) + categoría, imagen principal con
    `alt` = título (si `imagen_url`), layout de 2 columnas (contenido a `75ch` + sidebar) y botón
    "Volver a Novedades". Sidebar: **"Historial de publicaciones"** (nota actual + hasta 3
    anteriores, comparación **por día** — el mismo día cuenta, porque las 2 novedades reales
    comparten fecha — + "Ver todas las novedades") y **"Compartir / Copiar enlace"** (Web Share
    API con fallback a `navigator.clipboard` + `Toast`; Firefox bloquea el portapapeles → toast de
    error). Bloque "Adjunto de la nota" como **mensaje de proceso** (el DTO de novedad no tiene
    campo de adjuntos, `models.py:50-60`). Anotaciones del diseño ("Archivo oficial PENDIENTE ·
    PDF", "lo carga el panel admin", "alt obligatorio") como comentario de código. Verificado en
    navegador contra el mock local con las 2 novedades reales (estructura, historial, navegación y
    fallback de clipboard); evidencia en `documentacion/screenshots/t6_nota_completa.png` y
    `t6_nota_completa_historial.png`. Nota: el layout Desktop 1440 `lg:` de 2 columnas quedó
    probado por CSS estándar y por el patrón de T4 (la pantalla del equipo es de 1024px, la
    evidencia se capturó a ese ancho con la sidebar apilada).
  - **T7 (FAQ, 15/10/2026):** `FaqPage` alineada al export "10 · Preguntas frecuentes
    (segmentada)": breadcrumb `Inicio / Preguntas frecuentes`, eyebrow "Preguntas frecuentes"
    (ambar) y bajada "Respuestas por perfil: ingresantes, estudiantes y docentes." (las refs
    `RF-06 · RF-14 · I3` y la nota de UX/UI "Accesible desde Home…" quedan como comentario de
    código). **Tres segmentos** del diseño (Ingresantes / Estudiantes / Docentes, sin "Todas" ni
    "Institucional"), **buscador interno** "Buscar en preguntas frecuentes" (filtra por pregunta o
    respuesta dentro del segmento activo), dos **estados vacíos** (con y sin búsqueda) y CTA
    "¿No encontraste lo que buscabas?" + "Ir a Contacto" → `/contacto`. **Decisiones del usuario:**
    (1) las 12 FAQ inventadas de fases previas se reemplazaron por las **5 preguntas del export**
    (segmento Ingresantes), con respuesta como **mensaje de proceso** ("Respuesta oficial pendiente
    de validación institucional.") porque las respuestas oficiales están PENDIENTES; (2) las **4
    FAQ institucionales** (bedeles, SIU, títulos, traspasos) se conservan en el data **sin tab**,
    accesibles solo desde el buscador global del header. `FaqAcordeon` ganó la prop
    `mostrarCategoria` (la etiqueta de categoría se oculta en `/faq`, donde el segmento ya la
    indica; se mantiene en las páginas de sección) y un **guard de array vacío** ("No hay preguntas
    para este segmento por ahora.") que evita el recuadro vacío en Estudiantes/Docentes. Tests:
    `src/__tests__/faq-page.test.tsx` (7) + 1 en `faq-acordeon.test.tsx`. Verificado en navegador
    contra el mock local: estructura, tabs, buscador ("carreras" → 2, "inscripción" → 1), estados
    vacíos y CTA a `/contacto`; efectos colaterales OK en Home (4 destacadas de ingresantes) e
    Ingresantes (5 FAQ con etiqueta). Evidencia: `documentacion/screenshots/t7_faq.png` y
    `t7_faq_busqueda.png`. **Hallazgo (fuera de T1–T16):** el footer "Mapa del sitio" no lista
    "Preguntas frecuentes" en Servicios, a diferencia del export.
  - **T8 (búsqueda, 16/10/2026):** `BusquedaPage` alineada al export "11 · Resultados de búsqueda"
    y a su estado sin resultados (11b). Encabezado con breadcrumb `Inicio / Resultados de búsqueda`
    + eyebrow y H1 "Resultados de búsqueda" (antes el H1 era `Resultados para «…»`), **formulario de
    búsqueda** (input + "Buscar") que actualiza `?q`, **chips "Secciones"** que filtran por sección,
    **resumen** "N resultado(s) para «q» · criterio: títulos y metadatos." (la nota de alcance
    pendiente, "(… a confirmar con Análisis · I4)", queda como comentario de código), resultados
    **agrupados por sección** con título, descripción y ruta de migas, y **paginación de 4** por
    página (`Paginacion`, antes sin usar). Estado **sin resultados**: "Sin resultados para «q»" +
    "Revisá la ortografía, probá con otra palabra o navegá por las secciones." + "Limpiar filtros" +
    accesos directos (Carreras / Ingresantes / Estudiantes / Preguntas frecuentes / Contacto).
    **Decisión del usuario:** los chips se arman con las **secciones presentes en los resultados**
    (no se ofrecen filtros vacíos) por I4 pendiente; **no se amplió el índice buscable** (alcance a
    confirmar con Análisis). `src/utils/busqueda.ts`: `categoria` → `seccion` + nuevo `contexto`
    (ruta de migas); el tope de 8 resultados salió de la utilidad y quedó en el desplegable del
    header (`SUGERENCIAS_MAX`), porque la página necesita todos para paginar. `BuscadorGlobal` usa
    `seccion` y oculta la etiqueta cuando coincide con el título. Tests: `busqueda.test.ts`
    actualizado, nuevo `busqueda-page.test.tsx` (7) y ajuste en `buscador-global.test.tsx`.
    Verificado en navegador contra el mock local (chips, filtro por chip, paginación, sin
    resultados y accesos directos). Evidencia: `documentacion/screenshots/t8_busqueda.png` y
    `t8_busqueda_sin_resultados.png`.
  - **T9 (ingresantes, 16/10/2026):** `IngresantesPage` alineada al export "03 · Ingresantes"
    (mergeada a `develop`, PR #21 `79cc8c3`). Breadcrumb `Inicio / Ingresantes`, eyebrow verde e
    **H1 + bajada del diseño** ("Todo lo que necesitás para ingresar al IFTS N.º 12: carreras,
    requisitos, fechas, modalidad, equivalencias, pases y preguntas frecuentes"). Aviso de
    inscripción informativo ("La inscripción se realiza en el sitio oficial del Gobierno de la
    Ciudad. Este sitio informa el recorrido; no inscribe."; ref RF-03 como comentario). Sección
    "Carreras disponibles" con **contador y enlace "Ver las N carreras" con la cantidad real del
    backend** (no el "6" fijo del diseño) → `/carreras`. Nueva sección **"Requisitos y fechas de
    inscripción"**: bloque de requisitos (mensaje de proceso para el listado oficial PENDIENTE +
    CTA "Inscribirme en el sitio oficial (GCBA)" que usa `ENLACES.inscripcion`, hoy vacío → "El
    enlace oficial se publica cuando esté disponible.") y **tabla Etapa / Fecha** con las 3 etapas
    del diseño (Inscripción online · Presentación de documentación · Inicio de clases) y Fecha =
    PENDIENTE (nota "estructura de ejemplo: validar con Análisis" como comentario). "Modalidad,
    horarios y equivalencias" con las bajadas del export y mensajes de proceso en las 3 tarjetas.
    "Pases desde otros institutos" con "Cómo pedir un pase" (mensaje de proceso) + "Consultar por
    Contacto" → `/contacto`. FAQ de ingresantes con enlace "Ver todas las preguntas" → `/faq`.
    Anotaciones del diseño (RF-03/04/05/06/32, I5, "PENDIENTE INSTITUCIONAL", "estructura de
    ejemplo") como comentario de código. Tests: nuevo `src/__tests__/ingresantes-page.test.tsx`
    (5). Evidencia: `documentacion/screenshots/t9_ingresantes.png`.
  - **T10 (estudiantes, 16/10/2026):** `EstudiantesPage` alineada al export "04 · Estudiantes"
    (mergeada a `develop`, PR #22 `bf30b5c`). Breadcrumb `Inicio / Estudiantes`,
    eyebrow cian y **H1 + bajada del diseño** ("Información y trámites para estudiantes actuales:
    regularidad, constancias, mesas, calendario, becas, boleto y títulos/traspasos"; el "Reemplaza
    la propuesta 'Comunidad de alumnos' (B3)" y la nota "el propio sitio vs. trámites externos"
    quedan como comentario). Sección **"Trámites e información"** con las **8 tarjetas del diseño**
    (Regularidad · Constancias · Mesas de examen · Becas · Boleto estudiantil · Trámite de títulos ·
    Traspasos entre IFTS · Campus Virtual Moodle), con los CTAs del export: los destinos que aún no
    existen como página quedan **deshabilitados**, "Ver mesas" baja a la tabla de la propia página
    (`#mesas-de-examen-final`) y Moodle usa `ENLACES.moodle` (hoy vacío → "Enlace oficial
    próximamente"). Sección **"Calendario académico"** como **tabla** Período / Actividad / Desde /
    Hasta con las 3 filas del diseño (1.er cuatrimestre, Receso, 2.º cuatrimestre) y fechas
    PENDIENTE + caja "Calendario académico completo" con "Descargar" deshabilitado (PDF PENDIENTE).
    Sección **"Mesas de examen final"** como tabla Turno / Carrera / Fecha / Modalidad (2 filas de
    ejemplo, PENDIENTE). FAQ de estudiantes con las **4 preguntas del export** + "Ver todas las
    preguntas" → `/faq`. Anotaciones del diseño (RF-07…RF-32, I8, B3) como comentario de código. Datos:
    se agregaron las 4 FAQ de estudiantes a `mock-data.ts` (respuesta de proceso `RESPUESTA_PENDIENTE`);
    el estado vacío de `/faq` pasó del segmento Estudiantes al de Docentes. Tests: nuevo
    `src/__tests__/estudiantes-page.test.tsx` (6) + ajuste en `faq-page.test.tsx`. **175 tests
    verdes.** Verificado en navegador contra el dev server: estructura, tablas, acordeón y ausencia
    de anotaciones renderizadas. Evidencia: `documentacion/screenshots/t10_estudiantes.png`.
- **Revisión del consumo de API (08/10/2026):** los helpers del buscador se renombraron
  (`coincideTexto` / `coincideNullable`); el footer combina el horario confirmado
  "exclusivamente nocturno" (RF-22) con las modalidades reales del backend (Presencial,
  Híbrida y a distancia), absorbido por **RN-07** (`reglas_negocio.md`) y el contrato. Queda en
  `inbox/` el feedback sobre el guard de `contenido` en `NotaCompletaPage` (depende de una
  fuente de verdad de Backend/Contenidos).
- Contrato de API reescrito sobre el código fuente: `docs/02_technical/contrato_api_backend.md`
  (§3.1 DTOs con línea, §3.2 errores reales, §3.3 lo que no existe).
- Anexo de auditoría del backend en
  `documentacion/driveFrontend/04_backend/deudas_codigo_backend_2026-10-02.md`: 15 hallazgos
  **BE-E01**–**BE-E15** (no versionado, vive en el Drive).
- **Evidencia del ticket 0000010** (01/10/2026) sigue vigente: 13 rutas verificadas en navegador,
  15 capturas en `documentacion/screenshots/`.
- Cinco auditorías cerradas en `docs/06_audits/`.

## Decisiones activas (últimas 3-5)

- **Los chips "Secciones" del buscador se arman con los datos (T8, 16/10/2026):** se listan solo
  las secciones presentes en los resultados de la consulta (no los 5 fijos del export), porque el
  alcance buscable sigue pendiente con Análisis (**I4**) y no se quieren filtros que no devuelvan
  nada. El índice buscable no se amplió: sigue limitado a secciones del menú, carreras, novedades
  y FAQ.
- **Los exports Desktop 1440 del avance de diseño son la referencia visual vigente** para la
  alineación en curso (junto al contrato `figma_v2_contrato_visual.md`). El plan está en
  `inbox/plan_diseño_aprobado.md`; se trabaja una tarea por rama. (14/10/2026)
- **La Home conserva la sección "Carreras" (Oferta académica)** tal como el diseño, revirtiendo
  la decisión del plan original de quitarla. "Comunidades" sigue fuera (B3/I12). (14/10/2026)
- **Modalidad desde el backend, no PENDIENTE:** aunque el diseño muestre "Modalidad: PENDIENTE",
  se muestra el dato real del backend (coherente con `CardCarrera`); PENDIENTE solo si viene
  vacío. Los horarios sí quedan PENDIENTE (no existen en el DTO). (14/10/2026)
- **Jerarquía de fuentes del contrato invertida (decisión del 02/10/2026):** **el código fuente
  manda**. `app.py` / `models.py` > `respuesta.md` (15/09) > README (01/10). El código es lo único
  verificable sin esperar una respuesta de Backend. Esto resuelve P1 y P7 por observación, y
  contradice la decisión del 01/10 que los ponía por debajo de `respuesta.md`.
- **El backend recibido es un prototipo, no la entrega pactada.** Se consume igual para no
  bloquear el avance del frontend, pero el alcance se limita a lo verificable: 5 endpoints de 16.
- **Detalle sin endpoint de detalle.** `GET /api/carreras/:id` y `/api/noticias/:id` no existen,
  así que el detalle se resuelve por slug contra la lista completa (misma consulta cacheada). El
  slug se deriva del `nombre`/`titulo` en un mapper, porque el backend no expone slug.
- **Un endpoint no documentado en el código se trata como inexistente.** No se promete ninguna de
  las 11 rutas restantes mientras Backend no las implemente.
- **Sistema documental logsayer (5 capas), CLI v0.9.0.** Verificación con `logsayer check` y
  `logsayer process check`. Índice de memoria generado con `logsayer memory index`.
- **Rutas en inglés, contenido en español.** La fuente de verdad de endpoints sigue siendo **por
  historia de usuario**: `docs/04_user_stories/HU-XX/*_api.md`.
- **Mapa del Sitio V2 manda en navegación** (9 ítems + buscador). Tensión **AF-A6 abierta**:
  Análisis validó 7 accesos rápidos y el V2 tiene 9 (incluye SIU) — falta cierre con UX/UI.

## Bloqueos abiertos (no resolver sin fuente)

- **URL del backend en el entorno de testing (P9)** → bloquean el build de despliegue. `.env.example`
  lo tiene marcado con `@TODO`; hoy solo hay `localhost:5000`.
- **Las 11 rutas restantes** (`/faqs`, `/slider`, `/calendario`, `/docentes`, `/autoridades`,
  `/tutorias`, `/becas`, `/horarios`, `/bedeles`, `/auth/logout`, `/auth/me` + CRUD) → sin backend
  no hay contrato. Esas páginas siguen en mocks. **Dueño: Grupo 4.**
- **11 hallazgos de seguridad del backend** (BE-E01–BE-E06, BE-E10): `debug=True` en `0.0.0.0`,
  secretos JWT hardcodeados, CORS `*`, ninguna ruta con `jwt_required`, `activo` no verificado en
  el login, credencial de admin en claro. **No bloquean el frontend**, pero impiden considerar el
  backend apto para producción. **Dueño: Grupo 4.**
- **SQLite vs PostgreSQL (P4)** → si el entorno de testing corre SQLite, los tipos del DTO pueden
  diferir. Hoy verificado sobre SQLite.
- **Nombre del token (🔴):** el login real devuelve `token`, el cliente lee `auth_token`
  (`src/api/client.ts`). Sin impacto mientras no haya login; hay que alinearlo cuando exista.
- **Plazos vencidos (P5):** Swagger (~22/09) y DTOs (~29/09) no llegaron. El frontend compensó
  con DTOs derivados del código, pero no es una entrega de Backend.
- URLs oficiales de Moodle, inscripción y SIU (IFTS/Dirección) → bloquean `enlaces.ts`. Los accesos
  se muestran atenuados.
- `/api/contacto`: el endpoint existe (`P3` resuelta) pero el formulario sigue validando en local
  sin enviar. Falta decisión de alcance, no de contrato.
- Tensión de accesos rápidos 7 vs 9 (AF-A6) y contenidos reales de Análisis (🔵/❌). El diseño
  del avance confirma **7 accesos rápidos** (incluye SIU) y 5–6 carreras, según la pantalla.
- **Backend local sin dependencias para el smoke:** `~/Descargas/backend_ifts12/` necesita
  Flask/Flask-SQLAlchemy/Flask-CORS (no instalados en el entorno). Sin backend corriendo, el
  consumo real de carreras/novedades no se puede verificar en navegador; sí se ven los estados de
  carga/error/vacío. `npm run lint · build · test` no depende de él.

### Estado de las deudas del ticket 0000010

Detalle con dueño y qué se necesita de vuelta en
`documentacion/driveFrontend/deudas_bloqueantes_2026-10-01.md` (no versionado, en el Drive).

| ID | Deuda | Dueño | Estado 02/10/2026 |
|:---|:---|:---|:---|
| DB-01 | Tabla oficial de endpoints (parámetros, bodies, códigos) | Grupo 4 | 🟡 **Avanzada**: hay tabla de los 5 endpoints reales, verificada con línea. Faltan las 11 rutas. |
| DB-02 | Esquemas JSON exactos (DTOs) | Grupo 4 | 🟢 **Resuelta de hecho**: DTOs derivados de `models.py` + Zod + 18 tests. Falta que Backend los confirme. |
| DB-03 | Alcance de la administración (WF 13, 14, 15) | Grupo 1 | 🔵 Abierta. Sin avance. |
| DB-04 | Definición de la búsqueda global (WF 12): ¿widget o página? | Grupo 2 | 🔵 Abierta. El buscador existe como widget y ya usa datos reales; falta la decisión formal. |
| DB-05 | HUs de las secciones que solo tienen HU-01 | Frontend | 🔵 Abierta. Sin avance. |
| DB-14 | 404 de `/carreras/:id` y `/noticias/:id` con `:id` inexistente | Frontend | 🟢 **Resuelta**: el detalle distingue "carrera inexistente" del 404 de ruta, con tests. |

## Verificación

- Frontend: `npm run lint` · `npm run build` · `npm run test` (175 tests).
- Sistema documental: `logsayer check` · `logsayer process check` · `logsayer memory index`.
- Consumo verificado **en navegador** (Firefox, `localhost:5173`) contra un servidor que replica
  la serialización de `app.py:62-92` leyendo de `instance/ifts12.db`: listado, detalle, buscador,
  y los tres estados (con datos, con backend caído, y reintento funcionando).
- **Cotejo con la DB real:** 3 carreras (`id` 1–3) y 2 novedades (`id` 1–2) leídas de
  `instance/ifts12.db`. Los nombres reales (`Tecnicatura Superior en Análisis de Sistemas`) **no
  coinciden** con los mocks del sitio (`Gestión Parlamentaria`), por eso se quitaron los mocks de
  estas dos secciones.

## HUs cerradas desde la última auditoría

0