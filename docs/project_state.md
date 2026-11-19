---
fase: fase-10
---

# Estado del proyecto — IFTS N.º 12 (frontend)

> Snapshot operativo para el agente al iniciar cada sesión. No es acumulativo: se
> sobrescribe al cerrar sesión con aprobación previa. No dupliques contenido de
> specs ni repitas el roadmap completo. El detalle técnico vigente vive en
> `docs/02_technical/estado_implementacion.md`.

## Regla operativa vigente: modo test (12/11/2026)

- Rige `.opencode/rules/integracion-test.md`: `develop` y `main` quedan **congeladas** hasta
  el cierre de los tickets 0000079 (coordinación de ramas) y 0000075 (QA).
- Base de ramas y destino de merge: `fix/integracion-test-20261031` (`d1afcf8`, remoto
  `infra`). Merge a `develop` solo con autorización escrita de Infra y aprobación del usuario.

## Fase actual del roadmap

Fase 10 cerrada (19/10/2026) · próxima fase a definir

_(Fase 10 = **alineación del frontend a los exports Desktop 1440 del avance de diseño**,
página por página (tareas T1–T16), cerrada con tag `v1.11.0`. No hay Fase 11 definida todavía.)_

**Situación 18/11/2026:** la devolución de Edith quedó especificada en Capa 1 —Mapa del
Sitio V3 y HU-03…HU-06— y las **cuatro HUs ya están implementadas y verificadas** sobre
`fix/integracion-test-20261031`: navegación V3 (HU-03), horarios y Tutoría (HU-04),
Ingresantes y Alumnos (HU-05, commit `84e6998`) y fichas de carrera (HU-06, commit
`aa3cf28`). `main` y `develop` siguen congeladas hasta el cierre de **0000079** (ramas) y
**0000075** (QA). El push al remoto `infra` sigue bloqueado por el host caído en Tailscale.
Lo que resta de la devolución es contenido ⏳ del instituto (presentaciones, resoluciones,
modalidad de Gestión Parlamentaria, enlaces de preinscripción y textos de Docentes/Novedades/
Contacto, dueño 0000099), no estructura.

_(Detalle en "Qué está construido" y en
`docs/02_technical/ticket_0000073_correcciones_integracion_test.md`.)_

## Alineación al diseño del avance (cerrada · 19/10/2026)

Plan de alineación página por página a los **exports Desktop 1440** del avance de diseño
(`documentacion/driveFrontend/01_analisis_funcional/avance_disenio_sitio_ifts12/`, 14 PDFs) y
al contrato `docs/01_global/figma_v2_contrato_visual.md`. El plan vive en
`inbox/_done/plan_diseño_aprobado.md` (tareas **T1–T16**, no versionado). Estado al 19/10/2026:

- **Hechas y mergeadas a `develop`:** T1 (header), T2 (home), T3 (carreras), T4 (ficha de
  carrera, 15/10/2026) y T5 (novedades, 15/10/2026).
- **T6 (nota completa, 15/10/2026):** mergeada a `develop` (`1852e46`).
- **T7 (FAQ, 15/10/2026):** mergeada a `develop` (PR #19, `e4c22ad`).
- **T8 (búsqueda, 16/10/2026):** mergeada a `develop` (PR #20, `45afdda`).
- **T9 (ingresantes, 16/10/2026):** mergeada a `develop` (PR #21, `79cc8c3`).
- **T10 (estudiantes, 16/10/2026):** mergeada a `develop` (PR #22, `bf30b5c`). Detalle en
  "Alineación al diseño del avance" más abajo.
- **T11 (docentes, 16/10/2026):** mergeada a `develop` (PR #24, `dd04b33`). Detalle en
  "Alineación al diseño del avance" más abajo.
- **T12 (tutorías, 19/10/2026):** mergeada a `develop` (PR #26, `e14d69d`). Detalle en
  "Alineación al diseño del avance" más abajo.
- **T13 (institucional, 19/10/2026):** mergeada a `develop` (PR #28, `3b215cc`). Detalle en
  "Alineación al diseño del avance" más abajo.
- **T14 (contacto, 19/10/2026):** mergeada a `develop` (PR #30, `654e1c4`). Detalle en
  "Alineación al diseño del avance" más abajo.
- **T15 (404, 19/10/2026):** mergeada a `develop` (PR #32, `3408e10`). Detalle en
  "Alineación al diseño del avance" más abajo.
- **T16 (verificación y cierre, 19/10/2026):** smoke en Firefox de las 14 rutas del plan y
  cierre de la Fase 10 con tag **`v1.11.0`**. Detalle en "Alineación al diseño del avance"
  más abajo.
- **Regla de anotaciones (14/10/2026):** los textos de los exports que son **notas de UX/UI**
  (refs `RF-xx`, `PENDIENTE`, "Se cargan desde el panel admin", "Sin datos inventados", etc.)
  **no se renderizan** en ninguna pantalla: van como **comentario de código** en el componente.
  Ya corregido en Home y Carreras (`fix/alineacion-disenio-anotaciones`, merge `dca04ed`). Los
  mensajes de proceso tipo "sitio en construcción" sí se mantienen. La regla quedó en
  `inbox/_done/plan_diseño_aprobado.md` y ahora tiene **guard mecánico**:
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
  (**289 tests** en 37 archivos, verificado 18/11/2026).
- Home navegable con el **menú de 7 pestañas del Mapa del Sitio V3** (Inicio, Instituto,
  Carreras, Ingresantes, Alumnos, Tutoría y FAQ), buscador global en el header y los 3 accesos
  externos; las rutas históricas se conservan (V3 §15). Portada con
  carrusel institucional, footer con datos, columnas, formulario e isologotipos, secciones de
  Carreras, Ingresantes, Estudiantes, Tutorías, Docentes, Institucional, Noticias, FAQ y
  Contacto, más rutas de detalle `/carreras/:id` y `/noticias/:id` y 404. La **portada de la Home siempre se muestra** (título +
  subtítulo institucionales); el set de novedades del carrusel muestra un **skeleton** mientras
  carga y solo se ve con datos del backend (14/10/2026).
- **Consumo real de API para carreras y novedades** (02/10/2026), contra `GET /api/carreras` y
  `GET /api/novedades`:
  - `src/api/endpoints.ts` con `VITE_API_BASE_URL` (fallback `localhost:5000`). Carreras es
    contractual; novedades, auth y contacto quedan marcados como **no contractuales** (no
    figuran en el apispec) y se aíslan por bandera.
  - DTOs + esquemas Zod derivados de `models.py`: `carrera.types.ts`, `novedad.schema.ts`.
  - Servicios `carrera.service.ts` y `novedad.service.ts`, única capa que conoce endpoints.
  - Hooks `useCarreras` / `useNovedades` con TanStack Query (`staleTime` 5 min y 2 min).
  - Consumen API: `CarrerasPage`, `NoticiasPage`, `CarreraDetallePage`, `NotaCompletaPage`, las
    secciones de carreras y novedades de la **Home**, y el **buscador global**.
  - Estados de carga, error con reintento y vacío en las cuatro vistas. El mensaje de error lo
    produce el interceptor global de `src/api/client.ts`, no el componente (RN-13).
- **Aislamiento de módulos fuera del apispec (23/10/2026):** `src/constants/contrato.ts` expone
  `novedadesHabilitadas()`, `authHabilitada()` y `contactoHabilitado()` (default on en dev/test,
  off en prod, forzables por `VITE_*`). Con novedades apagadas, `useNovedades` no dispara el
  request y Home, Noticias y la nota completa muestran `ModuloNoDisponible` (la nota no da 404);
  el buscador global deja de indexar novedades. PR #38 y PR #40.
- **Header sin acceso visible al panel (23/10/2026):** se quitó el ícono de persona y el menú de
  cuenta (`ACCESOS_CUENTA`); `/admin/login` solo por URL directa. Con auth apagada,
  `AdminLoginPage` y `ProtectedRoute` muestran `ModuloNoDisponible` y no renderizan el
  formulario. Rama `fix/aislamiento-auth-header`.
- **Aislamiento de contacto (23/10/2026):** `FormularioConsulta` queda deshabilitado con
  `fieldset disabled` y aviso cuando `contactoHabilitado()` es false; no se simula un envío
  exitoso. Aplica a Footer, Tutorías y la página Contacto. Rama `fix/aislamiento-contacto`.
- **Login de administración con consumo real (20/10/2026, rama `feature/login-admin-panel`,
  sin push):** `/admin/login` alineada al frame **A1 Desktop 1440** del Figma v2, con
  `AdminLayout` propio (header oscuro `#1F2328`, "Volver al sitio público", pie admin; las
  rutas `/admin*` quedan sin Header/Footer público). `auth.service.ts` consume
  `POST /api/auth/login` (mapea el campo `token` del backend a la key `auth_token` de
  `client.ts`); `AuthContext` restaura la sesión síncrona desde `localStorage` (`auth_usuario`
  con `id`/`nombre`/`email`/`rol`); `ProtectedRoute` redirige a `/admin/login` y protege
  `/admin`. _Histórico:_ la excepción del 20/10/2026 había reintroducido un menú de cuenta con
  ícono de persona en la top bar. **Decisión 22/10/2026 (UX/UI, #0040/I12): se quita el ícono
  de persona y el menú de cuenta; el panel queda accesible solo por URL directa
  `/admin/login`.** `POST /api/auth/logout` y `/auth/me` no existen → logout local.
  El CRUD del panel sigue sin backend (UI-only); RF-24 (roles) pendiente → mensaje de proceso.
  Smoke en Firefox con backend caído (toggle y chrome ok); credenciales reales pendientes de
  backend local (Flask sin instalar). Detalle en bitácora 20/10/2026.
- Resto del sitio **sigue con datos simulados** en `src/constants/mock-data.ts` (se eliminó el
  bloque `mockComunidades` por B3/I12).
- HU-01 especificada y **actualizada contra el código** en `docs/04_user_stories/HU-01/`.
- **HU-02 de administración creada** (20/10/2026) en `docs/04_user_stories/HU-02/`: README
  con criterios CA-01…CA-14 (+ CA-06b de sesión expirada), `hu_02_api.md` con
  `POST /api/auth/login` y `GET /api/novedades` ✅ más 7 endpoints CRUD/auth 🔵 propuestos
  (no existen: DB-03), caso de uso expandido, modelos de datos y plan de pruebas (12
  escenarios Gherkin). Capturas de documentación del login y del panel (cáscara pre-A2) en
  `documentacion/screenshots/admin_01_login.png` y `admin_02_panel.png` (1440 × 900).
  Rama: `feature/admin-frames-figma`.
- **HUs de la devolución de Edith creadas (16/11/2026)** en `docs/04_user_stories/`, con
  README y plan de pruebas cada una, y con la sección "Reemplaza" para que la auditoría no
  las lea como hallazgos: **HU-03** navegación V3 (0000088), **HU-04** horarios y Tutoría
  (0000089 + 0000090), **HU-05** Ingresantes y Alumnos (0000091 + 0000092) y **HU-06**
  fichas de carrera (0000093 + 0000095 + 0000096). Cada una separa CA verificables hoy de
  pendientes ⏳ con dueño. Los tickets que no son funcionalidad (ronda QA 0000075, ramas
  0000079 y el bug responsive 0000087) quedaron en
  `docs/02_technical/tickets_operativos_ronda_test_2026_11.md`.
- **HU-03 a HU-06 implementadas (16–18/11/2026)** sobre `fix/integracion-test-20261031`:
  - **HU-03 (navegación):** menú de 7 pestañas con FAQ como pestaña (las rutas
    `/institucional`, `/estudiantes` y `/tutorias` no migran; Docentes, Novedades y Contacto
    salen del menú y Novedades y Contacto se alcanzan desde el pie), títulos Instituto /
    Alumnos / Tutoría y horarios de atención en dos franjas (9:00–13:00 y 18:30–22:30) en
    barra superior, pie, Contacto y Tutoría. El buscador usa `SECCIONES_BUSCABLES`, que suma
    Docentes, Novedades y Contacto al menú.
  - **HU-04 (Tutoría):** sin tabla de turnos ni formulario; el canal es
    `clara.moroni@bue.edu.ar` con el asunto «Sitio Web - Tutorías - Tu Nombre y Apellido». El
    asunto «Tutorías» salió del formulario de Contacto y su FAQ tiene la respuesta oficial.
  - **HU-05 (Ingresantes y Alumnos, `84e6998`):** Ingresantes pierde el listado de carreras,
    los bloques Modalidad/Horarios/Equivalencias/Pases y la tabla de Fechas clave; explica la
    preinscripción del GCBA con tres preguntas validadas y deja el enlace y el instructivo
    pendientes (`VITE_INSCRIPCION_URL`, `VITE_INSCRIPCION_INSTRUCTIVO_URL`). Alumnos invierte
    el orden: calendario primero con las mesas de examen integradas y destacadas, y después
    las diez preguntas desplegables de Edith. La pestaña de FAQ pasa a «Alumnos».
  - **HU-06 (fichas de carrera, `aa3cf28`):** se elimina el apartado Programas y su enlace del
    índice; el turno, el horario y la modalidad salen de cada carrera
    (`src/constants/cursadaCarreras.ts`): vespertino 18:30–22:30 en AP, Políticas Culturales,
    Análisis de Sistemas y Ciencia de Datos e IA, y matutino 9:00–13:00 en Gestión
    Parlamentaria (modalidad pendiente). La resolución conserva su número y solo enlaza el
    PDF cuando el instituto lo valida. Materias y correlatividades usa el texto definitivo.
  Tests: **289 en 37 archivos**. Lo que resta es contenido ⏳ del instituto, no estructura.
- **HU-07 (capa decorativa) especificada, sin implementar (19/11/2026):** HU paraguas con
  README, fichas D0–D6 y plan de pruebas en `docs/04_user_stories/HU-07/`; regla de proceso en
  `.opencode/rules/capa-decorativa.md`; referencia visual (18 CSS + `mediciones.tsv`, sin las 58
  capturas, que quedan en el Drive) en `documentacion/referencia_visual_v2/`; y auditoría del
  artefacto en Capa 4 (`docs/06_audits/audit_2026-11-18-artefacto-web.md`). D0.1 sigue con 10
  decisiones ⏳, así que **no se portó nada a `src/`** y no se editó
  `figma_v2_contrato_visual.md` (la HU lo reemplaza en piel cuando se implemente).
  Rama: `feature/hu-07-capa-decorativa`. Auditoría del 19/11 actualizada con la fila HU-07.
  En piel visual prevalece lo que pide la HU (decisión del usuario del 18/11) sobre el contrato
  visual y la regla 90/10; el `no cumple` del informe es por falta de código, no por contradicción.
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
- **Alineación al diseño del avance (cerrada, 19/10/2026):** T1–T16 mergeadas a `develop`;
  Fase 10 cerrada con tag `v1.11.0`.
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
  - **T11 (docentes, 16/10/2026):** `DocentesPage` reescrita según el export "06 · Docentes"
    (mergeada a `develop`, PR #24 `dd04b33`). Breadcrumb `Inicio / Docentes`, eyebrow
    verde y **H1 + bajada del diseño** ("Información y accesos de interés para el plantel docente.
    Las autoridades se publican en Institucional."; las refs RF-15/16/17 e I7 quedan como
    comentario). Secciones del export: **"Información general y comunicados"** (mensaje de proceso:
    no hay endpoint de comunicados), **"Concursos docentes"** (estado vacío "No hay convocatorias
    abiertas." — el diseño pide ese vacío cuando no hay concursos), **"Cuerpo docente por carrera"**
    (se listan las **carreras reales del backend** vía `useCarreras`, con `AvisoCarga`/`AvisoError`,
    y cada una con la nómina como mensaje de proceso: no se inventan nombres ni docentes),
    **"Repositorio de normativas y documentación"** (3 archivos del diseño —Normativa docente ·
    Instructivo para docentes · Documentación académica— con "Descargar" deshabilitado) y
    **"Accesos de interés"** (Campus Virtual Moodle, Calendario académico → `/estudiantes`, y
    SIU · Autogestión; Moodle/SIU deshabilitados porque `ENLACES` está vacío). Se eliminó la
    sección FAQ de docentes (no está en el export) y el viejo bloque genérico "Espacios docentes".
    Anotaciones del diseño (RF-15/16/17, I7, "se cargan desde el panel admin", "PENDIENTE
    INSTITUCIONAL", "Externo · URL PENDIENTE") como comentario de código. **Decisiones del usuario:**
    (1) comunicados = mensaje de proceso, sin tarjetas inventadas; (2) cuerpo docente lista las
    carreras reales del backend, no las 6 del diseño. Tests: nuevo
    `src/__tests__/docentes-page.test.tsx` (6) → **181 tests verdes**. Verificado en navegador
    contra un mock local (`:5000`) con 3 carreras: estructura, estados vacío/proceso y accesos sin
    anotaciones renderizadas. Evidencia: `documentacion/screenshots/t11_docentes.png`.
  - **T12 (tutorías, 19/10/2026):** `TutoriasPage` reescrita según el export "05 · Tutorías"
    (mergeada a `develop`, PR #26, `e14d69d`). Breadcrumb
    `Inicio / Tutorías`, eyebrow ambar y **H1 + bajada del diseño** ("Espacio de acompañamiento
    al estudiante. Información institucional del servicio de tutorías."; el "(sin reserva de
    turnos ni solicitud online · I12)" queda como comentario). Secciones del export:
    **"Presentación del espacio"** ("Qué es y para quién": texto de presentación y foto del
    espacio como mensajes de proceso, anotaciones "PENDIENTE INSTITUCIONAL" y M1 como código),
    **"Días, horarios y modalidades de atención"** (tabla Día / Horario / Modalidad con las 2
    filas PENDIENTE del diseño) y **"Contacto con el equipo de tutores"** (3 tarjetas —Correo de
    tutorías con mensaje de proceso, Dónde con la ubicación real, ¿Tenés una consulta? con CTA
    "Ir a Contacto" → `/contacto`— más tarjeta de datos del instituto con "Correo institucional"
    como mensaje de proceso; anotaciones I10 y franja horaria como comentario). **"Consulta
    directa"** usa `FormularioConsulta` con el título del diseño, **sin h2 externo** (el título
    lo aporta el propio formulario, mismo patrón que Contacto, para no duplicar la región
    accesible); la nota I1 (campos obligatorios, validación de correo, éxito según API) queda como
    comentario. Tests: nuevo `src/__tests__/tutorias-page.test.tsx` (6) → **187 tests verdes**
    (lint y build OK). Verificado en navegador contra el dev server: DOM sin anotaciones
    renderizadas, validación del formulario con los 3 mensajes de error y navegación a
    `/contacto`. Evidencia: `documentacion/screenshots/t12_tutorias.png`.
  - **T13 (institucional, 19/10/2026):** `InstitucionalPage` reescrita según el export
    "07 · Institucional" (mergeada a `develop`, PR #28, `3b215cc`). Breadcrumb
    `Inicio / Institucional`, eyebrow "El instituto" y **H1 + bajada del diseño** ("Historia,
    autoridades, bedelía, normativa y enlaces de interés del IFTS N.º 12."; las refs RF-xx
    quedan como comentario). Secciones del export: **"Historia del IFTS N.º 12"** (texto de
    historia y foto institucional como mensajes de proceso; anotaciones I6 y M1 como código),
    **"Autoridades"** (3 bloques de estructura "Nombre y apellido / Cargo · a validar" con
    mensaje de proceso; B7: ejemplos de cargo = estructura, no dato), **"Bedelía"** (tabla
    Año / carrera · Bedel/a · Horario · Contacto con las 3 filas PENDIENTE del diseño; RF-29 y
    la nota de datos individuales vs. genéricos como comentario), **"Normativa"** (Reglamento
    orgánico, Código de convivencia y Otra normativa institucional con botón "Descargar"
    deshabilitado, patrón de T4/T11) y **"Enlaces de interés institucional"** (Ciudad Bilingüe
    y Centro de Simulación con "Enlace oficial próximamente"; RF-33/URLs PENDIENTES como
    comentario). Se quitó lo que no estaba en el export (isologotipos, CTA de contacto,
    Inscripciones GCBA en el aside). Tests: nuevo `src/__tests__/institucional-page.test.tsx`
    (6) → **193 tests verdes** (lint y build OK). Evidencia:
    `documentacion/screenshots/t13_institucional.png` (1440×3600, Firefox headless; el
    `saveTo` del MCP de Firefox fallaba, se usó `firefox --headless --screenshot`).
  - **T14 (contacto, 19/10/2026):** `ContactoPage` y `FormularioConsulta` alineados al export
    "09 · Contacto" (mergeada a `develop`, PR #30, `654e1c4`). Breadcrumb `Inicio / Contacto`
    y **H1 + bajada del diseño** ("Consultas generales, de ingreso y de tutorías. También
    podés usar la consulta directa del pie de página."). **"Escribinos"**: el formulario se
    extiende con props `conAsunto` (select Consulta general / Ingreso / Tutorías, tomados de
    la bajada de la página y del CTA de Tutorías de T12), `conPrivacidad` (checkbox
    "Acepto la política de privacidad" obligatorio), `etiquetaMensaje` ("Mensaje" en
    Contacto, "Consulta" en las consultas directas) y `ayuda` ("Campos obligatorios marcados
    con *."); la etiqueta "Nombre" pasó a **"Nombre y apellido"** en todos los usos (diseño
    del pie y de Contacto). **"Datos institucionales"** (dirección y horario nocturno reales;
    correo y teléfono como mensajes de proceso, anotaciones I10 como código), **"Ubicación"**
    (mapa y "Cómo llegar" pendientes: proveedor y enlace PENDIENTE como comentario, sin
    inventar URL) y **"Preguntas frecuentes de contacto"** (las 3 preguntas del export con
    `FaqAcordeon`, sin categoría visible y respuestas de proceso; no existen en
    `mockFaqs`). La consulta directa del pie y Tutorías mantienen el formato simple. El
    mensaje de éxito confirma solo el registro (nota de "06 · Estados" como comentario; el
    `POST /api/contacto` existe en el backend pero se consume en un ticket propio, HU-01).
    Tests: nuevo `src/__tests__/contacto-page.test.tsx` (5) + 3 en
    `formulario-consulta.test.tsx` y ajuste de `tutorias-page.test.tsx` → **201 tests
    verdes** (lint y build OK). Evidencia:
    `documentacion/screenshots/t14_contacto.png`.
  - **T15 (404, 19/10/2026):** `PaginaNoEncontrada` alineada al export "12 · Error 404"
    (mergeada a `develop`, PR #32, `3408e10`). Sin breadcrumb (el export no lo muestra): se
    mantiene el `Estado tipo="404"` con el título y la bajada del diseño, el botón **"Ir al
    inicio"** → `/` (antes "Volver al inicio") y se agrega el **formulario "Buscar en el sitio"**
    (input + "Buscar") que navega a `/buscar?q=…`; el envío vacío va a `/buscar` sin parámetro.
    Tests: nuevo `src/__tests__/pagina-no-encontrada.test.tsx` (5) → **206 tests verdes**
    (lint y build OK). Evidencia: `documentacion/screenshots/t15_404.png`.
  - **T16 (verificación y cierre, 19/10/2026):** `npm run lint` · `npm run build` ·
    `npm run test` (**206 tests**) en verde. Smoke en Firefox (`npm run dev`,
    `localhost:5173`) de las 14 rutas del plan: `/`, `/carreras`,
    `/carreras/tecnicatura-superior-en-analisis-de-sistemas`, `/ingresantes`, `/estudiantes`,
    `/docentes`, `/tutorias`, `/institucional`, `/noticias`,
    `/noticias/inscripciones-abiertas-para-el-ciclo-lectivo-2026`, `/faq`, `/buscar?q=carreras`,
    `/contacto` y ruta inexistente (404). Todas renderizan header, contenido y footer; carreras,
    ficha y novedades muestran sus estados de carga porque el backend local no está corriendo.
    Sin contenido institucional inventado: solo `localhost:5000` del API y mensajes de proceso
    (`PENDIENTE`, "se publica cuando esté disponible"); el guard de anotaciones sigue verde.
    Fase 10 cerrada con tag `v1.11.0`.
- **Revisión del consumo de API (08/10/2026):** los helpers del buscador se renombraron
  (`coincideTexto` / `coincideNullable`); el footer combina el horario confirmado
  "exclusivamente nocturno" (RF-22) con las modalidades reales del backend (Presencial,
  Híbrida y a distancia), absorbido por **RN-07** (`reglas_negocio.md`) y el contrato. El
  feedback sobre el guard de `contenido` en `NotaCompletaPage` quedó archivado en
  `inbox/_done/feedback_review_consumo_api_2026-10-08.md` (depende de una fuente de verdad
  de Backend/Contenidos).
- Contrato de API reescrito sobre el código fuente: `docs/02_technical/contrato_api_backend.md`
  (§3.1 DTOs con línea, §3.2 errores reales, §3.3 lo que no existe).
- Anexo de auditoría del backend en
  `documentacion/driveFrontend/04_backend/deudas_codigo_backend_2026-10-02.md`: 15 hallazgos
  **BE-E01**–**BE-E15** (no versionado, vive en el Drive).
- **Evidencia del ticket 0000010** (01/10/2026) sigue vigente: 13 rutas verificadas en navegador,
  15 capturas en `documentacion/screenshots/`.
- Cinco auditorías cerradas en `docs/06_audits/`.
- **Rama de integración TEST descargada y revisada, sin merge (02/11/2026):**
  `fix/integracion-test-20261031` (local y publicada en el Git central como
  `infra/fix/integracion-test-20261031`, SHA `d1afcf8`, base `33f9954` = `develop` actual)
  trae consumo real de `/api/v1` (carreras, planes, materias, docentes, novedades, slider,
  login, contacto), CRUD admin visual, PDFs/logos con `deploy/fuentes.json` y suite de **268
  tests**. Está desplegada en https://ifts12-test.tail5bd71a.ts.net/. **No se mergeó a `main`
  ni `develop`** por indicación del profesor (02/11/2026): la decisión de rama oficial queda
  para la reunión del ticket **0000079** y el QA corre por separado en **0000075**; `develop`
  **no contiene** esos cambios. Detalle operativo en
  `docs/02_technical/ticket_0000073_correcciones_integracion_test.md`.
- **Bandeja de entrada procesada (02/11/2026):** 7 archivos → vacía. El ticket 0000073 quedó
  como doc de Capa 1 (`docs/02_technical/ticket_0000073_correcciones_integracion_test.md`);
  los cinco archivos antiguos (plan y análisis de aislamiento apispec, `apispec_1.json`,
  pendientes UX/UI Mantis y plan de diseño) y el parche `frontend-correcciones.patch` pasaron
  a `inbox/_done/` **sin documento**, por decisión del usuario (estaban desactualizados). Se
  reapuntaron 14 referencias vivas a `inbox/_done/...` en README, `.env.example`,
  `estado_implementacion.md`, `contrato_api_backend.md`, este snapshot y 5 archivos de `src/`
  (solo comentarios). Logbooks y `docs/06_audits/` no se tocaron (históricos). **A las 12:00
  del 02/11/2026 llegaron 3 tickets Mantis nuevos**; el **0000077** (diseño definitivo del
  CRUD para UX/UI) ya se procesó con el flujo (PDF → Markdown →
  `docs/02_technical/ticket_0000077_diseno_definitivo_crud_administrativo.md`) y quedan
  **2 sin ubicar** en la bandeja: `0000075` (QA) y `0000079` (Infra, rama oficial).
- **Pack de insumos para UX/UI (02/11/2026):** `documentacion/ux_ui/pack_insumos_crud_0000077.md`
  (222 líneas, listo para compartir, sin credenciales) concentra lo que el diseño del CRUD
  necesita saber: matriz de los 6 apartados × campos (fuente `src/constants/admin.ts` de la
  rama `fix/integracion-test-20261031`), operaciones y errores reales de HU-02, catálogo de
  estados, qué **no** diseñar (escritura de novedades/FAQ/slider, consultas, cuentas, carga
  de archivos, permisos del Editor), restricciones del contrato visual (breakpoints
  1440/768/375 y 7 componentes verificados en el Figma v2), **6 preguntas abiertas** (frame
  `A2` desalineado, adjuntos `14/15-admin*.png`, paginación, selects de referencia,
  permisos, filtros) y checklist de validación de la entrega. Diseño **pendiente**;
  implementación sujeta a 0000079.
- **Pendientes vivos (02/11/2026):** los módulos siguen detrás de las banderas `VITE_*` de
  `src/constants/contrato.ts` (en el entorno TEST se cargan con `deploy/test.env`); la FAQ
  segmentada sigue con el catálogo local (`mockFaqs`; falta contrato de categorías); el CRUD
  del panel es **provisional** (el diseño final se coordina con UX/UI en **0000077**);
  contenidos institucionales y controles pendientes de sus fuentes; paquete JS **~551 kB**
  (evaluar división por rutas); **QA completo pendiente (0000075)**. Estos puntos viven sobre
  todo en la rama TEST, no mergeada; detalle en el doc del ticket 0000073.

## Decisiones activas (últimas 3-5)

- **Devolución de Edith y prototipo de Claude (13/11/2026):** la devolución del instituto
  (PDF del 08/11, 14 secciones) quedó como documento de Capa 1 en
  `docs/01_global/devolucion_edith_2026_11_13.md`, y el prototipo navegable se archivó en
  `documentacion/driveFrontend/02_ux_ui/prototipo_claude_2026_11_13/` (HTML + texto
  renderizado + README; carpeta no versionada).
  La auditoría (`docs/06_audits/audit_2026-11-13-prototipo-claude-ux-ui.md`) concluye que el
  prototipo cierra #0040 y #0037 y el menú de 7 pestañas, pero **toma 15 decisiones que el
  instituto nunca confirmó**: no se consideran especificación hasta que haya acta. El
  prototipo no es handoff ni reemplaza al Figma v2. El PDF y la transcripción de Edith quedaron
  archivados en `inbox/_done/`.
- **Sin merge de la rama TEST hasta la reunión 0000079 (02/11/2026):** la rama
  `fix/integracion-test-20261031` (`d1afcf8`) queda descargada, revisada y desplegada en el
  sitio TEST, pero **no se mergea a `main` ni `develop`** por indicación del profesor; la
  rama oficial se define en la reunión del ticket 0000079 y el QA corre por separado en
  0000075. Ante cambios locales o divergencias: detenerse y coordinar, sin `reset --hard` ni
  `push --force`.
- **Acceso al panel por link discreto en la top bar (20/10/2026):** "Administración" como texto
  junto a los accesos externos del header, sin ícono de persona (I12); checkbox "Mostrar
  contraseña" en el login (como el Figma A1) y se eliminó "Mantener sesión iniciada". La
  sesión se restaura desde `localStorage` (no hay `/auth/me`); logout solo local.
- **Los chips "Secciones" del buscador se arman con los datos (T8, 16/10/2026):** se listan solo
  las secciones presentes en los resultados de la consulta (no los 5 fijos del export), porque el
  alcance buscable sigue pendiente con Análisis (**I4**) y no se quieren filtros que no devuelvan
  nada. El índice buscable no se amplió: sigue limitado a secciones del menú, carreras, novedades
  y FAQ.
- **Los exports Desktop 1440 del avance de diseño son la referencia visual vigente** para la
  alineación en curso (junto al contrato `figma_v2_contrato_visual.md`). El plan está en
  `inbox/_done/plan_diseño_aprobado.md`; se trabaja una tarea por rama. (14/10/2026)
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
- **Mapa del Sitio V3 en navegación (13/11/2026):** `docs/01_global/mapa_sitio_ifts12_v3.md`
  reemplaza al V2 (que queda como entregable fechado en el Drive, sin editar): 7 pestañas
  (Inicio, Instituto, Carreras, Ingresantes, Alumnos, Tutoría y FAQ) + buscador + 3 accesos
  externos. Docentes, Novedades y Contacto quedan ⏳ con dueño en el ticket 0000099. RN-07,
  RN-08 y RN-14 se actualizaron. **Implementado en `src/` (18/11/2026):** el menú ya es el de
  la V3 y HU-03…HU-06 están cerradas.
- **HU-05: el buscador no usa el menú como único índice (18/11/2026):** `SECCIONES_BUSCABLES`
  mantiene Docentes, Novedades y Contacto aunque no sean pestaña, para no perder acceso a
  páginas que siguen publicadas (V3 §15). La FAQ de estudiantes actuales se publica como
  «Alumnos» (etiqueta visible y `etiquetasCategoria`), pero el id interno sigue siendo
  `estudiantes` para no migrar datos ni rutas.
- **HU-06: turno, horario y modalidad por carrera, no un literal fijo (18/11/2026):** hasta que
  el backend los exponga (0000080) viven en `src/constants/cursadaCarreras.ts`, indexados por
  slug. Gestión Parlamentaria es la única matutina (9:00–13:00) y su modalidad queda ⏳; las
  otras cuatro son vespertinas (18:30–22:30) e híbridas. El PDF de la resolución se enlaza
  solo cuando el instituto lo valida (0000096).

## Bloqueos abiertos (no resolver sin fuente)

- **Contenidos ⏳ de la devolución de Edith (13/11/2026)** → Docentes en el pie vs pestaña,
  listado de Novedades, formulario de contacto, categoría Docentes en FAQ, Becas/Boleto,
  Enlaces de interés, Eventos de Tutoría en la v1, modalidad de Gestión Parlamentaria, correos
  docentes, formato de los regímenes y ubicación del título de validez. La estructura ya quedó
  especificada en HU-03…HU-06 y el Mapa V3, e implementada; lo que sigue bloqueado es el
  **contenido** que el instituto todavía no entregó, que se muestra con mensaje de proceso.
  **Dueño: Análisis + UX/UI.** Tabla completa en
  `docs/06_audits/audit_2026-11-13-prototipo-claude-ux-ui.md`, §6.
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
- **Nombre del token (🟡, resuelto de hecho en el frontend):** el backend devuelve `token` y el
  cliente lee `auth_token` (`src/api/client.ts`); `auth.service.ts` mapea el campo en el login.
  Queda alinearlo en el backend cuando toque (BE-E01–BE-E06).
- **Plazos vencidos (P5):** Swagger (~22/09) y DTOs (~29/09) no llegaron. El frontend compensó
  con DTOs derivados del código, pero no es una entrega de Backend.
- **Swagger del backend inválido (18/11/2026)** → el ZIP `IFTS12_Backend_2026-11-16` trae las 36
  rutas / 92 operaciones, pero el spec que publica `/apidocs/` no pasa un validador Swagger: 42 de
  45 escrituras sin `body`, 5 endpoints ausentes (`auth/login`, `contacto`, `health` ×2,
  `archivos/{id}/info`) y 184 respuestas sin esquema. Contrato de referencia mientras tanto: el
  spec curado `documentacion/driveFrontend/04_backend/swagger_ifts12_backend_2026-11-16.json`
  (válido, 92 operaciones). Informe: `docs/06_audits/audit_2026-11-18-backend-swagger.md`.
  **Dueño: Grupo 4.**
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
| DB-03 | Alcance de la administración (WF 13, 14, 15) | Grupo 1 | 🟡 **Avanzada**: HU-02 especificada (20/10/2026). Faltan endpoints CRUD confirmados por Grupo 1. |
| DB-04 | Definición de la búsqueda global (WF 12): ¿widget o página? | Grupo 2 | 🔵 Abierta. El buscador existe como widget y ya usa datos reales; falta la decisión formal. |
| DB-05 | HUs de las secciones que solo tienen HU-01 | Frontend | 🔵 Abierta. Sin avance. |
| DB-14 | 404 de `/carreras/:id` y `/noticias/:id` con `:id` inexistente | Frontend | 🟢 **Resuelta**: el detalle distingue "carrera inexistente" del 404 de ruta, con tests. |

## Verificación

- Frontend: `npm run lint` · `npm run build` · `npm run test` (289 tests en 37 archivos).
- Sistema documental: `logsayer check` · `logsayer process check` · `logsayer memory index`.
- **Mapa del Sitio V3 (13/11/2026):** creado en Capa 1
  (`docs/01_global/mapa_sitio_ifts12_v3.md`) con la devolución de Edith y los tickets
  0000088–0000096 como fuente, la tabla de reemplazos V2 → V3 y los 3 bloques ⏳ con dueño
  en el ticket 0000099. Cascada aplicada a RN-07/RN-08/RN-14, `alcance.md`,
  `figma_v2_contrato_visual.md`, `estado_implementacion.md`, HU-01, `AGENTS.md` y las reglas
  y skills de navegación. `logsayer check` y `logsayer process check` en verde; índice de
  memoria regenerado (45 documentos).
- **HUs de la devolución de Edith (16/11/2026):** HU-03…HU-06 creadas con README y plan de
  pruebas, cada una con la sección "Reemplaza", CA verificables y pendientes ⏳ con dueño
  (0000099, 0000080, 0000081 y material del instituto). Los tickets operativos 0000075,
  0000079 y el bug 0000087 quedaron fuera de las HUs, en
  `docs/02_technical/tickets_operativos_ronda_test_2026_11.md`. Índice de memoria
  regenerado (54 documentos); `logsayer check` y `logsayer process check` en verde.
- **Implementación de HU-03 y HU-04 (16/11/2026):** lint, build y 280 tests en verde
  (37 archivos). Nuevos: `src/constants/tutorias.ts`, `src/__tests__/navegacion-v3.test.tsx`
  y `src/__tests__/horarios-atencion.test.tsx`. El literal viejo «exclusivamente nocturno»
  que quedaba en `IngresantesPage.tsx` (HU-05) y en `CarreraDetallePage.tsx` más la bajada de
  `CarrerasPage.tsx` (HU-06) se resolvió en la implementación siguiente. Los contenidos ⏳ de
  Tutoría (texto de presentación, imagen, material de apoyo y eventos) siguen como mensaje de
  proceso.
- **Implementación de HU-05 y HU-06 (18/11/2026):** lint, build y 289 tests en verde
  (37 archivos), verificado con `84e6998` (Ingresantes y Alumnos) y `aa3cf28` (fichas). Nuevo
  `src/constants/cursadaCarreras.ts`; se eliminó el apartado Programas de
  `ContenidoAcademico.tsx`. Sin backend local no hubo smoke con datos reales: los estados de
  carga/error se cubren en tests y los contenidos ⏳ siguen como mensaje de proceso.
- **Auditoría del prototipo de Claude (13/11/2026):** 31 tickets y 14 secciones de la
  devolución cruzados contra el artefacto archivado, medido en Firefox a 1440/1024/768/375.
  Resultado: 10 ✅, 15 🟡, 1 🔵, 5 ⏳ en tickets; 12 hallazgos PROTO-01…PROTO-12. Informe en
  `docs/06_audits/audit_2026-11-13-prototipo-claude-ux-ui.md`.
- Consumo verificado **en navegador** (Firefox, `localhost:5173`) contra un servidor que replica
  la serialización de `app.py:62-92` leyendo de `instance/ifts12.db`: listado, detalle, buscador,
  y los tres estados (con datos, con backend caído, y reintento funcionando).
- **Cotejo con la DB real:** 3 carreras (`id` 1–3) y 2 novedades (`id` 1–2) leídas de
  `instance/ifts12.db`. Los nombres reales (`Tecnicatura Superior en Análisis de Sistemas`) **no
  coinciden** con los mocks del sitio (`Gestión Parlamentaria`), por eso se quitaron los mocks de
  estas dos secciones.
- **Rama `fix/integracion-test-20261031` verificada (02/11/2026):** identidad SHA `d1afcf8`
  confirmada (`git rev-parse HEAD`), checklist en verde (`npm ci` sin vulnerabilidades, lint,
  build y **268/268 tests** en 35 archivos, coincidentes con lo informado en el ticket 0000073)
  y parche `inbox/_done/frontend-correcciones.patch` verificado 1:1 contra la rama (57 archivos
  en ambos).

## HUs cerradas desde la última auditoría

0 — auditoría semántica de HU-01…HU-06 cerrada el 19/11/2026 en
`docs/06_audits/audit_2026-11-19.md` (3 `cumple`, 3 `parcial`, sin omisiones); contador reiniciado
con `logsayer audit reset`. Los hallazgos abiertos (AF-A1…AF-A5, UX-A1, BE-A1, BE-A2) siguen en
el informe.