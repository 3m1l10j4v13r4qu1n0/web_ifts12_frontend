# Estado Actual del Proyecto

> Última actualización: 2026-09-21 (Ajuste Mapa V2: header con accesos externos, footer V2, hero con carrusel, secciones con mocks y rutas de detalle)
> Este archivo es una FOTO del presente, no un historial. Para el historial de cambios ver `docs/sdd/bitacora_agentica.md`.
> El agente debe leer este archivo completo al iniciar cualquier tarea sobre el proyecto.

## 1. Resumen del proyecto

Sitio web institucional del IFTS N.º 12 (2026). Frontend en **React 19 + Vite + TypeScript
strict + Tailwind CSS v4**, alineado al contrato `fe-architect-scaffold`. Se completó la
**Fase 1 (Andamiaje)**: estructura base del proyecto, scripts `lint`/`build`/`test` en verde,
tag **v1.0.0**, mergeada a `develop`. Se completó la **Fase 2 (Base)**: `api/client.ts` con
interceptor, AuthContext/ProtectedRoute preparados, `constants/mock-data.ts` con mocks
provisionales y placeholders de Moodle/inscripción, tag **v1.1.0**. Se completó la
**Fase 3 (Componentes reutilizables)**: `components/ui/` (Button, CardCarrera, CardNoticia,
FaqAcordeon, AccesosRapidos), `components/layout/` (Header+Nav, Footer, Portada) integrados en el
layout base, tokens de color 90/10 y helper `cn`, tag **v1.2.0**. La Home aún usa placeholders;
no hay consumo de API real. Se completó la **Fase 4 (Home navegable)**: HomePage con portada,
accesos rápidos, carreras, slider de novedades, comunidades y FAQ usando los mocks provisorios;
se sumaron los componentes `ui/SliderNoticias` (carrusel accesible, sin librerías) y
`ui/Comunidades`; CTA de Moodle e inscripción visibles solo cuando exista URL oficial; tag
**v1.3.0**. Sigue sin consumo de API real. Se completó la **Fase 5 (Cierre y documentación)**:
checklist final en verde, actualización de la propuesta tecnológica al estado real, acta de
decisiones, agenda de la reunión del lunes 31/08 y dependencias por equipo; tag **v1.4.0**.
Las 5 fases del plan inicial están cerradas; quedan bloqueos multi-equipo y la reunión del lunes.
Se completó la **Fase 6 (Brechas de auditoría sin dependencias)**: RF-22 contacto/pie de
página con dirección y horario, 5 accesos rápidos faltantes (SIU, Inscripción, Constancias,
Mesas, Calendario) como placeholders atenuados, tipos `Carrera` y `Noticia` extendidos con
`modalidad`/`horarios`/`imagenUrl`/`enlace`, 12 FAQs descriptivas por 4 categorías
(ingresantes/estudiantes/docentes/institucional), noticias con fechas ISO y ordenamiento
reciente→antigua en Home. Se completó el **Refactor Mapa Sitio V2** (15/09/2026): la nueva
fuente de verdad de navegación es `docs/driveFrontend/02_ux_ui/mapa_sitio_ifts12_(V2).md`
(actualizado 21/09/2026; el mapa V1 y el `mapa_inicial_sitio_web_ifts12_2026_v2.md` quedaron
eliminados). El menú principal pasó a **9 items** (Inicio, Carreras, Ingresantes,
Estudiantes, Tutorías, Docentes, Institucional, Novedades, Contacto), se agregó un **buscador
global** persistente en el header (`BuscadorGlobal`, filtra contenido local de mocks) y la Home
separa **accesos destacados** (Moodle, Inscripción, Carreras) de los **accesos rápidos**
(Tutorías, Becas, Constancias, Mesas, Calendario, Contacto).
Se completó el **Ajuste Mapa V2** (21/09/2026, rama `feature/ajuste-mapa-v2`): los accesos
Moodle/SIU/Inscripción (UX-A1, el V2 incluye SIU) pasan a una **barra superior del header**
atenuada mientras las URLs oficiales sigan vacías (`ACCESOS_EXTERNOS`); el **Footer** se
reestructuró al V2 (datos + columnas Mapa del sitio/Servicios/Plataformas externas +
formulario de consulta + isologotipos IFTS/GCBA/UPCN + "exclusivamente nocturno"); el hero de la
Home pasó de portada de texto a un **carrusel institucional** (`CarruselInstitucional` reusa
`mockNoticias`) con **grid de novedades recientes**; las 8 secciones placeholder se
reemplazaron por **estructura navegable con mocks** (Carreras, Ingresantes, Estudiantes,
Tutorías, Docentes, Institucional, Noticias con buscador local, FAQ, Contacto) y se agregaron las
**rutas de detalle** `/carreras/:id` y `/noticias/:id` (404 para ids inexistentes). El
`FormularioConsulta` valida en local (nombre, correo, mensaje) **sin POST** hasta confirmar
`/api/contacto` (BE-A6). Se eliminaron `Portada.tsx`, `PaginaPlaceholder.tsx` y `SliderNoticias.tsx`
(quedaron sin uso).

## 2. Arquitectura

- Frontend SPA con estructura de carpetas estricta del contrato: `api/` (única capa que conoce
  endpoints), `components/{ui,layout}`, `pages/`, `hooks/`, `contexts/`, `routes/`,
  `types/api` (espejo del backend), `types/domain`, `utils/`, `constants/`, `styles/`.
- Componentes presentacionales solo reciben props tipadas, sin llamadas HTTP ni estado global.
- Errores HTTP centralizados en interceptor global de Axios (un solo lugar),
  sin `try/catch` dispersos.
- Tipado estricto, `any` prohibido (tsconfig en `strict`).
- Estado global: Context API (no Redux); datos de API futuros con TanStack Query v5.
- Páginas por sección con estructura navegable y datos de mocks (no más placeholders): Home,
  Carreras + detalle, Ingresantes, Estudiantes, Docentes, Tutorías, Institucional, Noticias +
  detalle, FAQ, Contacto + 404.
- Navegación según el Mapa del Sitio V2 (UX/UI, 15/09/2026): menú principal de 9 items +
  buscador global persistente en el header (`BuscadorGlobal`, índice local de mocks) +
  barra superior de accesos externos (Moodle/SIU/Inscripción, atenuados sin URL) +
  accesos destacados y rápidos separados en la Home + footer V2 (columnas, formulario e isologotipos).

## 3. Entidades / Modelos de dominio

- `UsuarioSesion` (`contexts/AuthContext.tsx`) — estructura de sesión preparada para auth futura.
- `ApiErrorResponse` (`types/api/error.types.ts`) — forma estándar de error del backend
  (`error`, `mensaje`, `usuario_id?`).
- `Carrera` (`types/domain/sitio.types.ts`) — `id`, `nombre`, `descripcionBreve`, `modalidad`,
  `horarios?`. 6 mocks con modalidad "Presencial" y horarios.
- `Noticia` (`types/domain/sitio.types.ts`) — `id`, `titulo`, `resumen`, `fecha`,
  `imagenUrl?`, `enlace?`. 3 mocks con fechas ISO (2026-09-01, 2026-08-15, 2026-07-20).
- `FaqItem` (`types/domain/sitio.types.ts`) — 4 categorías: `ingresantes`, `estudiantes`,
  `docentes`, `institucional`. 12 mocks con textos descriptivos.
- `AccesoRapido` (`types/domain/sitio.types.ts`) — 11 accesos en Home (6 internos + 5
  atenuados pendientes de URLs oficiales).
- `Comunidad` (`types/domain/sitio.types.ts`) — 3 comunidades (tutoría, alumnos, docentes).

## 4. Casos de uso / Servicios implementados

- [x] Navegación entre secciones placeholder (AppRouter).
- [x] AuthContext y ProtectedRoute **preparados** (sin login real; el backend no lo soporta).
- [x] `constants/mock-data.ts` — mocks provisionales tipados (carreras, noticias, FAQ,
  accesos rápidos, comunidades) marcados para validar con Análisis.
- [x] Componentes reutilizables presentacionales: Header+Nav, Footer, CardCarrera,
  CardNoticia, FaqAcordeon, AccesosRapidos, Button, CarruselInstitucional,
  FormularioConsulta (con tests).
- [x] Home navegable (HomePage): hero con carrusel de novedades, CTA de campus/inscripción
  (visible solo con URL), accesos rápidos (11 items, 5 atenuados), carreras (6 con modalidad),
  grid de novedades recientes, comunidades, FAQ (12 items, 4 categorías).
- [x] Header con barra superior de accesos directos (Campus virtual, SIU, Inscripción)
  atenuados mientras las URLs oficiales estén vacías (UX-A1).
- [x] Footer V2: datos institucionales, columnas Mapa del sitio/Servicios/Plataformas externas,
  formulario de consulta y franja de isologotipos IFTS/GCBA/UPCN; copy "exclusivamente nocturno".
- [x] ContactoPage con formulario, dirección y horario (RF-22); FAQ completa (12 items).
- [x] Secciones con estructura navegable y mocks: CarrerasPage, CarreraDetallePage
  (`/carreras/:id`), Ingresantes, Estudiantes, Tutorías, Docentes, Institucional,
  NoticiasPage (buscador local), NotaCompletaPage (`/noticias/:id`), FAQ, Contacto.
- [ ] Carreras, noticias, FAQ, etc. con contenido real — bloqueado por contratos de Análisis/Backend.

## 5. Endpoints / Interfaces expuestas

El 15/09/2026 el equipo de Backend respondió con definiciones técnicas formales
(`docs/driveFrontend/04_backend/respuesta.md`): **prefijo `/api/`**, rutas públicas GET
confirmadas (`/api/carreras[/:id]`, `/api/noticias[/:id]`, `/api/faqs?segmento=X`, `/api/slider`,
`/api/calendario`, `/api/horarios`, `/api/docentes`, `/api/autoridades`, `/api/bedeles`,
`/api/becas`, `/api/tutorias`), auth JWT (`/api/auth/login|logout|me`) y CRUD admin directo
sobre rutas administrables. La tabla oficial (Swagger/OpenAPI) llega como entrega 2 (1 semana).

| Método | Ruta | Descripción | Estado |
|---|---|---|---|
| — | — | Mapa de rutas **confirmado** por Backend; falta Swagger y DTOs. `src/api/endpoints.ts` sigue vacío; ningún consumo de API todavía. | 🟡 contrato confirmado — integración pendiente de entregas 2-3 |

## 6. Infraestructura / Integraciones

- Frontend se entrega como **build estático** (`dist/`) para servir desde Nginx en un VPS
  independiente del Moodle (Plan B). Detalle en `docs/frontend/propuesta-tecnologica.md`.
- URLs de Moodle e inscripción en `src/constants/enlaces.ts` como **placeholders vacíos** hasta
  recibir las oficiales de IFTS/Dirección.
- Variables de entorno (15/09/2026): Backend confirmó **3** (`API_BASE_URL`, `VITE_MOODLE_URL`,
  `VITE_INSCRIPCION_URL`), resolviendo la duda INF-G2 ("¿3, 6 o 7?"). `API_BASE_URL` la proveerá
  Backend (URL de testing local en Docker); Moodle/inscripción siguen 🔵 IFTS con fallback en
  `.env`. Falta crear `.env.example` y migrar `enlaces.ts`/`API_BASE_URL` a `import.meta.env`.
- `docs/frontend/propuesta-tecnologica.md` §6 alineado con la especificación técnica de
  Infraestructura (09/09/2026): versiones mínimas (Python 3.10+, PostgreSQL 14+, Docker 24.0+,
  Nginx ≥ 1.18), ancho de banda en la tabla de dimensionamiento (1 TB/4 TB/8 TB) y rangos de
  disco unificados (INF-A1/A2/B1); subdominios `test`/`campus`, TLS 1.2/1.3 y HSTS en §6.5
  (INF-D2). Nueva sección §9 con la política de optimización de imágenes (WebP/SVG ≤ 500 KB,
  INF-C1). README con sección "Build de producción" (comando + nota de env vars).
- Pendiente de Infra/Dirección: definición de variables `VITE_*` (¿3, 6 o 7?), URLs oficiales
  y resultado de la reunión con Oscar (Moodle). Al definirse, se crea `.env.example`, se migra
  `enlaces.ts` y `API_BASE_URL` a `import.meta.env` (INF-G1/G2).

## 7. Pendientes / TODO conocidos

- **Fase 2** — Base **completada** en `feature/fase-2-base` (types de dominio + mocks).
- **Fase 3** — Componentes reutilizables **completada** en `feature/fase-3-componentes`.
- **Fase 4** — Home navegable **completada** en `feature/fase-4-home` (slider accesible,
  comunidades, secciones de Home con mocks); mergeada a `develop` (`5afc13d`) y tag `v1.3.0`
  pusheado.
- **Fase 5** — Cierre y documentación **completada** en `feature/fase-5-cierre` (propuesta
  tecnológica al día, acta de decisiones, agenda de reunión del lunes, dependencias). Falta
  decidir merge a `develop`.
- Pendientes multi-equipo para la reunión del lunes 31/08: minuta V2 de Análisis, wireframes
  UX/UI, contratos de API Backend, confirmaciones de Infra/Dirección y URLs oficiales de
  Moodle/inscripción (`docs/frontend/dependencias-equipos.md`).
- **Auditoría de UX/UI** contra los documentos nuevos de `docs/driveFrontend/02_ux_ui/`
  (V1 + Mapa V2 + wireframes) **completada** (`docs/sdd/06_auditorias/auditoria-ux-ui.md`, rama
  `feature/auditoria-ux-ui`, 21/09/2026): wireframes de todas las secciones ✅ entregados;
  el V2 nuevo **incluye SIU** en la barra superior (ajusta AF-A6); falta implementar los accesos
  Moodle/SIU/Inscripción en el `Header` (UX-A1), resolver la tensión de accesos 7 vs 9 (UX-A2),
  y quedan 🔵 formulario de consulta, paleta/tipografía y estados de UI de validación.
- **Auditoría** contra `Analisis funcional todo unificado IFTS 12.pdf` **completada**
  (`docs/sdd/06_auditorias/auditoria-analisis-unificado.md`, rama `feature/auditoria-analisis-unificado`):
  RF-01…RF-34 auditados; mayoría 🟡/❌/🔵. **Plan de implementación aprobado y ejecutado** en
  Fase 6: RF-22 (contacto/pie), accesos rápidos faltantes, `Carrera` con modalidad/horarios,
  FAQ descriptiva por segmento, fechas en novedades. Quedan pendientes los 🔵 (bloqueados por
  Backend) y los ❌ que requieren contenidos oficiales de Análisis/Edith.
- **Auditoría de análisis funcional contra la fuente única de verdad validada** (18/09/2026)
  **completada** (`docs/sdd/06_auditorias/auditoria-analisis-unificado.md` v2, rama
  `feature/auditoria-fuente-analisis`): se actualizaron `grupo_1_analisis_funcional.md`,
  `grupo_3_frontend.md`, `docs/frontend/{dependencias-equipos,acta-decisiones}.md`. Pendiente
  transversal: resolver con UX/UI la tensión de accesos de Home (**7 confirmados por Análisis**
  vs. **9 del Mapa V2**, sin SIU) — hallazgo AF-A6.
- **Auditoría de infraestructura** contra los 3 documentos de `docs/driveFrontend/05_infraestructura/`
  **completada** (`docs/sdd/06_auditorias/auditoria-infraestructura.md`, rama
  `feature/requerimientos-infraestructura`): arquitectura Plan B, build estático, stack y
  ambientes consistentes. 10 brechas detectadas (INF-A1…INF-J1), la única severa es un typo
  `iffts12.edu.ar` (doble f) en el doc del grupo 5 que puede propagarse a config real. El
  frontend no usa `import.meta.env` todavía; falta `.env.example` y migrar enlaces a variables
  de entorno cuando haya URLs oficiales.
- **Auditoría de backend** contra `docs/driveFrontend/04_backend/respuesta.md` **completada**
  (`docs/sdd/06_auditorias/auditoria-backend.md`, rama `feature/auditoria-backend`): rutas `/api/`
  confirmadas (doc del grupo 4 decía `/api/v1/`, corregido), 8 rutas públicas nuevas registradas,
  FAQ `?segmento=X`, CRUD admin directo (sin `/api/admin/`). Hallazgo de código corregido:
  `ApiErrorResponse` ahora refleja `{ error: { code, message, details } }` (BE-A5). Pendientes:
  confirmar `/api/contacto` POST, ORM y rate limiting; validar roles con Grupo 1.

## 8. Documentos de referencia (relevamiento)

- `docs/frontend/analisis_funcional_validado.md` — **Fuente única de verdad de Análisis
  Funcional, validada por el cliente el 18/09/2026**: síntesis de los 3 PDFs aprobados en
  `docs/driveFrontend/01_analisis_funcional/` (Documento Consolidado, Respuesta a Frontend, PP
  Análisis). Fija: accesos rápidos de Home **7 (no 9)**, dirección confirmada (Misiones 26,
  C1083 ABB, CABA — nocturno), login solo para administradores de contenido, 6 carreras, bot
  fuera de v1, alcance por etapas A→B→C y RF-01…RF-34. Ante contradicción con documentación
  vieja, manda esta fuente (y los PDFs antes que todo).
- `docs/sdd/06_auditorias/auditoria-analisis-unificado.md` — **Auditoría v2 (18/09/2026)** contra
  la fuente única validada y el estado real (Fase 6 + refactor Mapa V2). Hallazgos AF-A1…AF-A10,
  matriz RF-01…RF-34, accesos 7 confirmados y tensión 🟡 Mapa V2 (9 accesos sin SIU). Reemplaza a
  la v1 (08/09/2026, pre–Fase 6). Documento vivo.
- `docs/driveFrontend/Analisis funcional todo unificado IFTS 12 (2).pdf` — PDF fuente del
  Consolidado (8 partes), entre los 3 aprobados. Los PDFs mandan ante contradicción.
- `docs/sdd/06_auditorias/auditoria-infraestructura.md` — Auditoría de consistencia entre los
  requerimientos de infraestructura (`docs/driveFrontend/05_infraestructura/`: especificación
  técnica, cuestionario Moodle y grupo 5) y el estado real del frontend. 10 brechas
  codificadas (INF-A1…INF-J1) + checklist accionable. Documento vivo.
- `docs/sdd/06_auditorias/auditoria-backend.md` — Auditoría de la respuesta de Backend
  (`docs/driveFrontend/04_backend/respuesta.md`) contra el estado real del frontend. 14
  hallazgos (BE-A1…BE-A14), tabla de consistencia por área, correcciones al doc del grupo 4 y
  al tipo `ApiErrorResponse`, y checklist accionable. Documento vivo.
- `docs/entregas/` — entregables de cierre de fases (acta de roles, inventario técnico,
  matriz de dependencias, registro de decisiones, reporte semanal, minuta). Disponibles en
  **Markdown** (pandoc, 09/09/2026) además del `.docx` fuente; matriz, registro y reporte
  actualizados con la auditoría de infraestructura. Recordatorio de pendientes de Infra en
  `docs/driveFrontend/05_infraestructura/bloqueo_infra.md` (no versionado).
- `docs/driveFrontend/02_ux_ui/` — **Documentación UX/UI actualizada (21/09/2026)**:
  - `DocumentaciónDisenoUX(V1).md` — documento técnico de diseño V1 (Home, login del Campus
    Moodle —externo al sitio—, estructura por sección, esquema de navegación V1 superado).
  - `mapa_sitio_ifts12_(V2).md` — **Mapa General del Sitio V2** (reemplazó a
    `mapa_inicial_sitio_web_ifts12_2026_v2.md`): menú de 9 ítems + buscador global + **accesos
    directos a Moodle, SIU e Inscripción GCBA en la barra superior**. Ahora el V2 **incluye SIU**
    → ajusta la tensión AF-A6 (antes "V2 sin SIU"); SIU pasa a la cabecera.
  - **Wireframes (nueva ubicación versionable):** `docs/sdd/07_wireframes/` — 16 pantallas HTML de
    baja fidelidad alineadas al **Mapa del Sitio V2 (21/09/2026)** (13 públicas + 3 de
    administración: login, panel, formulario). CSS embebido autocontenido, escala de grises.
    Movidos desde `docs/driveFrontend/02_ux_ui/wireframe/` (gitignored) para poder versionarlos;
    los buscas en navegación local abriendo `docs/sdd/07_wireframes/index.html`. **Siguen siendo la
    fuente de verdad de navegación** junto con el V2.
  - Auditoría: `docs/sdd/06_auditorias/auditoria-ux-ui.md` (hallazgos UX-A1…UX-A10).
- `docs/sdd/01_global/`, `docs/sdd/02_tecnico/`, `docs/sdd/03_procesos/` y
  `docs/sdd/04_historias_usuario/HU-01/` — **base de documentación SDD completada (18/09/2026)**:
  `vision.md`, `actores.md`, `alcance.md` y `reglas_negocio.md` (RN-01…RN-14 transversales);
  `decisiones_tecnicas.md` y `modelo_datos_global.md`; `definicion_listo.md` (DoR, renombrado
  desde el typo `definicio_listo`); y la **HU-01 Home institucional pública** con sus 5 archivos
  (`hu_01.md`, caso de uso expandido, modelos de datos, `hu_01_api.md` con endpoints `GET` de la
  Home y plan de pruebas). Base para nuevas historias de usuario.
- `.opencode/skills/fe-architect-scaffold/SKILL.md` — **actualizado 18/09/2026**: la lista de
  endpoints ya no se hardcodea en el skill; la fuente de verdad es por historia de usuario
  (`docs/sdd/04_historias_usuario/HU-XX/hu_xx_api.md`) y crece automáticamente con cada HU nueva.

## 9. Documentos de dependencias por grupo

- `docs/driveFrontend/01_analisis_funcional/grupo_1_analisis_funcional.md` — Qué pedirle a Análisis
  Funcional. **Actualizado 18/09/2026:** minuta V2 y mapa validado ✅ entregados (Partes I y IV del
  Consolidado); accesos rápidos 7 confirmados; dirección/horario confirmados. Quedan 🔵 los
  contenidos reales, URLs oficiales, logos y datos de SIU/bedeles/títulos/traspasos (Drive de Edith).
- `docs/driveFrontend/02_ux_ui/grupo_2_ux_ui.md` — Qué pedirle a UX/UI (wireframes, paleta
  definitiva, tipografía, mapa de navegación, flujos de usuario, componentes visuales).
  **Actualizado 21/09/2026:** wireframes ✅ entregados (13 pantallas), mapa V2 ✅, accesos
  destacados/rápidos 🟡 (tensión 7 vs 9), sistema visual 🔵 pendiente.
- `docs/driveFrontend/grupo_3_frontend.md` — Estado de Frontend, qué ya entregamos, qué
  necesitamos de otros, y qué les entregamos a ellos.
- `docs/driveFrontend/grupo_4_backend.md` — Qué pedirle a Backend (tabla de endpoints, esquemas
  de datos, códigos de error, autenticación, datos de prueba, tecnología confirmada).
- `docs/driveFrontend/grupo_5_infraestructura.md` — Qué pedirle a Infra (VPS, dominio, Nginx,
  variables de entorno, backups, monitoreo, estrategia de ambientes).
- `docs/driveFrontend/grupo_6_qa.md` — Qué pedirle a QA (ambiente de testing, plan de testing,
  casos de prueba, checklist pre-despliegue, recorridos de usuario).

## 10. Decisiones y convenciones vigentes

- Responder y commiteár **siempre en español rioplatense**; Conventional Commits con scope en
  minúscula; commits atómicos.
- Prohibido trabajar sobre `main`/`develop`; ramas `feature/` desde `develop`.
- PRs con `gh` (`~/.local/bin/gh`): tras el push aprobado, `gh pr create --base develop`; el
  merge (`gh pr merge --merge`) solo con aprobación del usuario. Definido en
  `.opencode/rules/flujo-git.md`.
- Regla **dura** de versionado por fases: al cerrar fase, commits atómicos + tag anotado semver
  (menor por fase, `v1.0.0` → Fase 1) y **push solo con aprobación explícita**
  (`.opencode/rules/versionado-fases.md`).
- No inventar endpoints, campos, textos ni contenido institucional; la Home usa mocks marcados
  como provisorios.
- Stack fijado y documentado en `docs/frontend/propuesta-tecnologica.md`; backend de referencia
  Python/Flask + Gunicorn + Nginx + PostgreSQL (Plan B).
- `docs/driveFrontend/` no se versiona (gitignored), pero su contenido es fuente de verdad.
- Al auditar documentación, además del informe, actualizar siempre el archivo del grupo
  correspondiente (`grupo_X_*.md`) — regla dura
  `.agents/rules/auditoria-documentacion.md` y skill
  `.agents/skills/auditoria-documentacion/SKILL.md`.
- La fuente de verdad de endpoints del frontend es **por historia de usuario**:
  `docs/sdd/04_historias_usuario/HU-XX/hu_xx_api.md` (skill `fe-architect-scaffold` actualizado
  el 18/09/2026). Cada HU nueva con su `hu_xx_api.md` amplía esa fuente **sin editar el skill**;
  un endpoint que no está en ninguna HU se trata como inexistente.