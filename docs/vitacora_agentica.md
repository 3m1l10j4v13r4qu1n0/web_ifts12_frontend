# Vitácora Agéntica

> Historial cronológico y append-only. NUNCA se borra ni se reescribe una entrada pasada.
> Cada entrada corresponde a una sesión/tarea significativa de trabajo del agente sobre el proyecto.
> Cuando este archivo crezca demasiado, archivar entradas viejas en `vitacora_YYYY-QX.md` y dejar acá solo un índice + las últimas entradas.

---

## 2026-08-29 — Fase 1 (Andamiaje) del frontend y regla de versionado por fases

**Qué se hizo:** se creó el andamiaje completo del frontend en `feature/tarea-inicial-frontend`
sobre el stack acordado (React 19, Vite 8, TypeScript strict, Tailwind v4, React Router v7, Axios,
TanStack Query v5, Zod, Biome 2, Vitest 4). Se configuraron los scripts `lint`/`build`/`test` en
verde, la estructura de carpetas del contrato `fe-architect-scaffold`, el AppRouter con las
secciones del mapa del sitio (páginas placeholder), AuthContext + ProtectedRoute preparados, el
cliente Axios con interceptor (sin endpoints reales) y placeholders de enlaces institucionales.
Se dejó una prueba unitaria de `PaginaPlaceholder`. Se taggeó **v1.0.0** ("Fase 1 - Andamiaje") y
se pusheó con aprobación del usuario. Además se creó la regla dura de versionado por fases
(`versionado-fases.md`) y se referenció en `AGENTS.md`.

**Decisiones de arquitectura:** se siguió el contrato `fe-architect-scaffold` (skill) tal cual,
sin desviaciones: capa `api/` única que conoce endpoints, componentes presentacionales sin HTTP,
interceptor global de errores, `any` prohibido, estructura AuthContext/ProtectedRoute preparada
sin login real (el backend no lo soporta). No se inventaron endpoints ni URLs oficiales
(Moodle/inscripción quedaron como placeholders vacíos). Comunión semver: cada fase suma versión
menor (v1.0.0 → Fase 1, v1.1.0 → Fase 2…), major solo por decisión del equipo.

**Archivos/módulos tocados:**
- `package.json` / `package-lock.json` — dependencias del stack y scripts `dev`/`build`/`lint`/`lint:fix`/`test`.
- `vite.config.ts` — plugins React + Tailwind v4, setup de Vitest (jsdom, jest-dom).
- `tsconfig*.json` — TypeScript strict, proyecto en solución (app + node).
- `biome.json` — linter/formateador (migrado a presets de Biome 2).
- `.gitignore` — se sumó `*.tsbuildinfo`.
- `src/api/{client,endpoints}.ts`, `src/api/services/` — cliente Axios con interceptor y tablas de endpoints vacías.
- `src/contexts/AuthContext.tsx` — estructura de sesión vacía preparada.
- `src/routes/{AppRouter,ProtectedRoute}.tsx` — rutas de las secciones + ruta protegida lista.
- `src/pages/*` — páginas placeholder de las 10 secciones + 404.
- `src/constants/enlaces.ts` — placeholders de Moodle e inscripción.
- `src/types/api/error.types.ts` — forma de error del backend.
- `src/App.tsx`, `src/main.tsx`, `src/styles/index.css`, `src/setup-tests.ts`, `src/__tests__/pagina-placeholder.test.tsx`.
- `.opencode/rules/versionado-fases.md` — nueva regla dura de commits + tags por fase.
- `AGENTS.md` — referencia a la nueva regla.
- `docs/estado_actual_proyecto.md`, `docs/vitacora_agentica.md` — memoria del proyecto creada en esta sesión.

**Estado resultante:** Fase 1 cerrada y taggeada (`v1.0.0`); rama `feature/tarea-inicial-frontend`
pushiada (último commit `2ab4c12`), `lint`·`build`·`test` en verde. Sin cambios pendientes en el
working tree. Próximos pasos: Fase 2 (base/mocks), Fase 3 (componentes reutilizables), Fase 4
(Home navegable). Recordar: reiniciar opencode para que cargue la nueva regla.

---

## 2026-08-30 — Merge de la Fase 1 (Andamiaje) a develop y Fase 2 (Base)

**Qué se hizo:** se integró `origin/develop` en `feature/tarea-inicial-frontend` (sin conflictos:
develop era ancestro), checklist en verde (`lint`·`build`·`test`) y se mergeó la Fase 1 a
`develop` con merge commit. Desde `develop` se creó `feature/fase-2-base`. Se completó la Fase 2
(Base): se crearon los tipos de dominio del sitio (`types/domain/sitio.types.ts`: Carrera,
Noticia, FaqItem, AccesoRapido, Comunidad, FaqCategoria) y `constants/mock-data.ts` con mocks
provisionales (carreras, noticias, FAQ, accesos rápidos, comunidades) marcados para validar con
Análisis. Se taggeó **v1.1.0** ("Fase 2 - Base"). Los demás entregables de la Fase 2 (AppRouter,
`api/client.ts` con interceptor, AuthContext/ProtectedRoute, placeholders Moodle/inscripción) ya
venían implementados desde la Fase 1.

**Decisiones de arquitectura:** los mocks solo usan contenido verificado en la minuta de
relevamiento del 27/08/2026 (carreras nombradas: gestión parlamentaria, administración y gestión
de políticas culturales, administración pública; accesos rápidos de la minuta; comunidades de
tutoría/alumnos/docentes). Descripciones y respuestas quedan como "pendiente de validación" sin
afirmaciones institucionales definitivas. El acceso "campus virtual" toma `ENLACES.moodle`
(placeholder vacío) y "becas" queda sin ruta hasta definir su página en UX/UI. Tipos de dominio en
`types/domain/` (no en `types/api/`) porque son datos de UI provisionales, no esquemas del backend.

**Archivos/módulos tocados:**
- `src/types/domain/sitio.types.ts` — nuevos tipos de dominio del sitio (se reemplaza el `.gitkeep`).
- `src/constants/mock-data.ts` — mocks provisionales tipados para la Home.
- `docs/estado_actual_proyecto.md` — Fase 2 completada, pendientes actualizados.
- `docs/vitacora_agentica.md` — esta entrada.
- Git: merge `f4726cf` de la Fase 1 a `develop`; rama `feature/fase-2-base` (commits `f98fed2`,
  `e275b5a`); tag anotado `v1.1.0`.

**Estado resultante:** `develop` contiene la Fase 1; `feature/fase-2-base` tiene la Fase 2 con
`lint`·`build`·`test` en verde; tag `v1.1.0` creado sin pushear. Falta pushear merge de develop,
rama y tag (requiere aprobación). Próximo paso: Fase 3 (componentes reutilizables).

---

## 2026-08-30 — Fase 3 (Componentes reutilizables)

**Qué se hizo:** se mergeó la Fase 2 a `develop` (merge commit `dc968a7`) y desde ahí se creó
`feature/fase-3-componentes`. Se completó la Fase 3: componentes `ui/` (Button con variantes y
soporte de enlaces internos/externos, CardCarrera, CardNoticia, FaqAcordeon accesible con un ítem
abierto a la vez, AccesosRapidos con ítems pendientes deshabilitados), componentes `layout/`
(NavMenu, Header con logo a la home, menú sticky y hamburguesa mobile, Footer, Portada genérica)
integrados al layout base de la app (App.tsx). Se agregaron tokens de color de acento en
`styles/index.css` vía `@theme` (regla 90/10, paleta provisional UX/UI), el helper `cn` en
`utils/`, constantes de navegación (`constants/navegacion.ts`: menú principal de 5 ítems sin
"Inicio", footer), pruebas unitarias de Button, FaqAcordeon, AccesosRapidos y Header, y se habilitó
`tailwindDirectives: true` en Biome para parsear `@theme`. Se taggeó **v1.2.0** ("Fase 3 -
Componentes reutilizables").

**Decisiones de arquitectura:** componentes presentacionales que solo reciben props tipadas, sin
HTTP ni estado global; el único estado local está en Header (menú móvil) y FaqAcordeon (ítem
abierto). El menú principal apunta a Carreras, Ingresantes, Estudiantes, Docentes y Noticias;
Institucional, Tutorías, FAQ y Contacto quedan en el footer (máximo 5 ítems por regla de
navegación). El logo del instituto enlaza a la home (sin ítem "Inicio"). Paleta de acento azul
provisional hasta validar con UX/UI; no se inventaron URLs ni contenido institucional. El panel del
acordeón se renderiza condicionalmente (jsdom no respeta el atributo `hidden` en `<section>`).
Footer y botones externos usan `ENLACES` blank cuando estén disponibles.

**Archivos/módulos tocados:**
- `src/components/ui/{Button,CardCarrera,CardNoticia,FaqAcordeon,AccesosRapidos}.tsx` (se remueve `.gitkeep`).
- `src/components/layout/{NavMenu,Header,Footer,Portada}.tsx` (se remueve `.gitkeep`).
- `src/App.tsx` — Header + Footer en el layout base.
- `src/constants/navegacion.ts`, `src/utils/cn.ts` — nav y helper de clases.
- `src/styles/index.css` — tokens `@theme` de acento (90/10).
- `biome.json` — `tailwindDirectives: true`.
- `src/__tests__/{button,faq-acordeon,accesos-rapidos,header}.test.tsx` — 4 suites nuevas.
- Git: merge `dc968a7` de la Fase 2 a `develop`; rama `feature/fase-3-componentes` con 16 commits
  atómicos; tag anotado `v1.2.0`.

**Estado resultante:** `develop` contiene Fases 1 y 2; `feature/fase-3-componentes` tiene la Fase 3
con `lint`·`build`·`test` en verde (5 archivos de test, 7 pruebas). Push del merge de develop, de
la rama y del tag `v1.2.0` pendiente de aprobación. Próximo paso: Fase 4 (Home navegable con
mocks).
---

## 2026-08-30 — Fase 4 (Home navegable)

**Qué se hizo:** desde `develop` se creó `feature/fase-4-home` y se completó la Fase 4: Home
navegable con mocks provisorios (sin consumo de API real). Se agregaron dos componentes `ui/`
nuevos: `SliderNoticias` (carrusel accesible con indicador de posición y botones anterior/
siguiente, `aria-live`/`aria-roledescription="carrusel"`, sin librerías extra) y `Comunidades`
(grilla de cards enlazadas a tutoria/estudiantes/docentes). Se reemplazó el placeholder de
`HomePage` por secciones completas: portada (reutilizando `Portada`), CTA de campus virtual e
inscripción, accesos rápidos, carreras, novedades (slider), comunidades y FAQ. Los CTA de Moodle
e inscripción se renderizan **solo cuando existe URL oficial** (`ENLACES` placeholder vacío por
ahora), consistente con el comportamiento del Footer. Se agregaron tests de `SliderNoticias` y
`Comunidades`. `lint` · `build` · `test` en verde (7 archivos de test, 11 pruebas). Tag anotado
**v1.3.0**.

**Decisiones de arquitectura:** el slider se resuelve con estado local (`useState`) y navegación
circular, sin librerías (YAGNI, por falta de wireframes de UX/UI). Dado que las URLs oficiales de
Moodle/inscripción aún son placeholders vacíos, la Home oculta esos bloques hasta recibir las
URLs, evitando enlaces rotos. Los componentes nuevos son presentacionales (solo props tipadas) y
los textos de la Home siguen siendo provisorios, sin afirmaciones institucionales definitivas.

**Archivos/módulos tocados:**
- `src/components/ui/SliderNoticias.tsx` (+ test) — carrusel accesible de novedades.
- `src/components/ui/Comunidades.tsx` (+ test) — grilla de comunidades enlazadas.
- `src/pages/HomePage.tsx` — reemplaza el placeholder por la Home navegable completa.
- Docs: `estado_actual_proyecto.md` (Fase 4 marcada completada).
- Git: rama `feature/fase-4-home` con 3 commits atómicos; tag anotado `v1.3.0`.

**Estado resultante:** `feature/fase-4-home` contiene la Fase 4 con `lint`·`build`·`test` en
verde. Push de la rama, del merge a `develop` y del tag `v1.3.0` pendiente de aprobación. Próximo
paso: Fase 5 (cierre y documentación). Dependencias bloqueadas siguen: minuta V2 de Análisis,
wireframes UX/UI, contratos de API Backend, URLs oficiales de Moodle/inscripción.

---

## 2026-08-30 — Fase 5 (Cierre y documentación)

**Qué se hizo:** desde `develop` se creó `feature/fase-5-cierre` y se completó la Fase 5 de
cierre del plan inicial del frontend. Se actualizó `docs/frontend/propuesta-tecnologica.md` al
estado real del código (estructura de carpetas y componentes efectivamente implementados,
scripts existentes, responsive/accesibilidad del estado actual, nota de cierre de fases). Se
crearon dos documentos nuevos: `docs/frontend/acta-decisiones.md` (decisiones de las fases 1-5:
stack, flujo git, menú de 5 ítems, paleta provisional, mocks, placeholders, sin API real, slider
sin librerías, auth sin implementar, Plan B) y `docs/frontend/agenda-reunion-lunes.md` (agenda de
la reunión del lunes 31/08: propuesta tecnológica, decisiones, dependencias por equipo,
coordinación con Infra/Dirección/Backend y próximos pasos). Se actualizó
`docs/frontend/dependencias-equipos.md` (estado del stack y sección 10 "qué se avanzó al cierre
de la Fase 5"). Checklist final `lint` · `build` · `test` en verde (7 suites, 11 pruebas). Tag
anotado **v1.4.0**.

**Decisiones de arquitectura / administrativas:** los documentos de cierre reflejan únicamente lo
ya verificado en el repo; no se inventaron datos ni se adelantaron decisiones ajenas al equipo. El
stack sigue marcado como "a validar" en la reunión del lunes (no se auto-aprueba). El acta de
decisiones queda como documento vivo para registrar futuras decisiones.

**Archivos/módulos tocados:**
- `docs/frontend/propuesta-tecnologica.md` — actualizado al estado real de las fases 1-5.
- `docs/frontend/acta-decisiones.md` — nuevo: decisiones de las fases 1-5.
- `docs/frontend/agenda-reunion-lunes.md` — nuevo: agenda de la reunión del 31/08.
- `docs/frontend/dependencias-equipos.md` — estado del stack y sección de avance.
- Docs: `estado_actual_proyecto.md` (Fase 5 marcada completada).
- Git: rama `feature/fase-5-cierre` con 4 commits atómicos de documentación; tag anotado
  `v1.4.0`.

**Estado resultante:** `feature/fase-5-cierre` contiene la documentación de cierre con
`lint`·`build`·`test` en verde. Push de la rama, del merge a `develop` y del tag `v1.4.0`
pendiente de aprobación. Con esto quedan cerradas las 5 fases del plan inicial del frontend;
sigue la reunión del lunes 31/08 y los pendientes multi-equipo (minuta V2, wireframes UX/UI,
contratos de API, VPS/Infra, URLs oficiales).

---

## 2026-09-04 — Incorporación del Mapa Inicial del Sitio Web (relevamiento 27/08)

**Qué se hizo:** se incorporó como contexto al proyecto el archivo
`docs/driveFrontend/mapa_inicial_sitio_web_ifts12_2026.md`, que reúne la estructura y los
posibles botones/menú resultantes del relevamiento del 27/08/2026 con las autoridades del IFTS
N.º 12. El mapa define: secciones del sitio (Home, Carreras, Ingresantes, Estudiantes, Tutorías,
Docentes, Institucional, Noticias), 3 comunidades destacadas (tutoría, alumnos, docentes), 9
accesos rápidos para la Home, y 11 posibles botones de menú. Se actualizó
`docs/estado_actual_proyecto.md` con una nueva sección "Documentos de referencia" que detalla
estas secciones y el criterio de trabajo del mapa (Análisis valida contenido, UX/UI define
experiencia, Frontend/Backend implementan sobre definiciones acordadas).

**Decisiones:** el mapa es preliminar y no definitivo; Frontend lo toma como base técnica pero
no implementa a partir de él hasta que Análisis/UX lo validen. Los textos del mapa marcan
claramente que UX/UI debe definir qué elementos van al menú principal, submenús, bloques de
Home o accesos rápidos. Se mantiene la regla de no inventar contenido.

**Archivos tocados:**
- `docs/driveFrontend/mapa_inicial_sitio_web_ifts12_2026.md` — nuevo, leído y añadido como
  contexto.
- `docs/estado_actual_proyecto.md` — nueva sección 8 (Documentos de referencia), se renumeró
  Decisiones a sección 9.
- `docs/vitacora_agentica.md` — esta entrada.

**Estado resultante:** el mapa queda documentado como fuente de referencia en el proyecto.
Frontend tiene claridad sobre la estructura esperada del sitio. Pendiente: validación de
Análisis/UX sobre el mapa, wireframes UX/UI, y decenas de dependencias multi-equipo que
quedaron abiertas tras el cierre de la Fase 5.

---

## 2026-09-04 — Documentos de dependencias por grupo (fuentes de verdad)

**Qué se hizo:** se crearon 6 documentos markdown en `docs/driveFrontend/`, uno por cada
grupo de trabajo del proyecto, que detallan qué hay que pedirle a cada equipo para que
el proyecto avance. Cada archivo es una fuente de verdad viva sobre las dependencias,
bloqueos y entregables esperados de cada grupo:

1. `grupo_1_analisis_funcional.md` — Contenidos institucionales, mapa validado, URLs
   oficiales, logos. **Grupo que más bloquea al resto.**
2. `grupo_2_ux_ui.md` — Wireframes, paleta definitiva, tipografía, mapa de navegación,
   flujos de usuario, componentes visuales.
3. `grupo_3_frontend.md` — Estado actual de Frontend, qué ya entregamos, qué necesitamos
   de otros, qué les entregamos a ellos.
4. `grupo_4_backend.md` — Tabla de endpoints, esquemas de datos, códigos de error,
   autenticación, datos de prueba, confirmación de tecnología.
5. `grupo_5_infraestructura.md` — VPS, dominio, Nginx, variables de entorno, backups,
   monitoreo, estrategia de ambientes, flujo de despliegue.
6. `grupo_6_qa.md` — Ambiente de testing, plan de testing, casos de prueba por sección,
   checklist pre-despliegue, recorridos de usuario.

Se actualizó `docs/estado_actual_proyecto.md` con la nueva sección 9 que referencia estos
archivos.

**Decisiones:** se optó por crear un archivo por grupo (no uno solo) para que cada equipo
tenga un documento claro y acotado de qué se espera de ellos. Los archivos están en
`docs/driveFrontend/` (gitignored) como el resto de la documentación de Drive. Cada
archivo incluye: qué se necesita, por qué, estado actual, preguntas a responder, y
cronograma sugerido de entregas.

**Archivos tocados:**
- `docs/driveFrontend/grupo_1_analisis_funcional.md` — nuevo.
- `docs/driveFrontend/grupo_2_ux_ui.md` — nuevo.
- `docs/driveFrontend/grupo_3_frontend.md` — nuevo.
- `docs/driveFrontend/grupo_4_backend.md` — nuevo.
- `docs/driveFrontend/grupo_5_infraestructura.md` — nuevo.
- `docs/driveFrontend/grupo_6_qa.md` — nuevo.
- `docs/estado_actual_proyecto.md` — nueva sección 9, fecha actualizada.
- `docs/vitacora_agentica.md` — esta entrada.

**Estado resultante:** los 6 documentos quedan como fuente de verdad para coordinar
dependencias entre grupos. Frontend puede usar estos archivos para comunicar bloqueos
y pedidos a los demás equipos de manera clara y estructurada.

---

## 2026-09-08 — Auditoría de cumplimiento contra el análisis funcional unificado

**Qué se hizo:** se leyó el documento nuevo del equipo de Análisis Funcional
(`docs/driveFrontend/Analisis funcional todo unificado IFTS 12.pdf`, extraído con
`pdftotext`) y se auditó el frontend contra sus 34 requisitos funcionales (RF-01…RF-34),
el mapa de contenidos (Parte IV) y la propuesta consolidada menú/accesos (Parte VI). Se
materializó el resultado en `docs/frontend/auditoria-analisis-unificado.md` con: resumen
ejecutivo por categoría, matriz de cumplimiento completa, comparativa de accesos rápidos,
menú y comunidades, cumplimientos positivos, desvíos, lista de "accionable sin dependencias
externas" y bloqueos externos por equipo.

**Decisiones:**
- Solo materializar el informe, **sin tocar código** (no se implementó nada de lo accionable
  todavía; queda pendiente de aprobación el plan de implementación).
- Trabajar en rama nueva `feature/auditoria-analisis-unificado` desde `develop` (no se
  mergea ni pushea sin pregunta).
- El `.gitignore` está modificado en el working tree (comentada la línea
  `docs/driveFrontend/`); se respeta la regla de no versionar `docs/driveFrontend/` y no se
  commiteará esa carpeta.
- Hallazgos principales: RF-22 (dirección/horario, contenido fijo confirmado) y accesos
  rápidos faltantes (SIU, inscripción GCBA, constancias, mesas, calendario) son lo más
  accionable; `Carrera` sin `modalidad`/`horarios`; menú propuesto por Análisis (9 items)
  excede el límite de 5 del proyecto → coordinar UX/UI; CRUD/login/panel y noticias con
  fecha/imagen quedan bloqueados por Backend y contenido del Drive.

**Archivos tocados:**
- `docs/driveFrontend/Analisis funcional todo unificado IFTS 12.pdf` — nuevo, leído como
  fuente de verdad (no versionado).
- `docs/frontend/auditoria-analisis-unificado.md` — nuevo, informe de la auditoría.
- `docs/estado_actual_proyecto.md` — fecha actualizada, nueva sección 8 con el documento
  unificado y la auditoría, pendiente de implementación registrado en la sección 7.
- `docs/vitacora_agentica.md` — esta entrada.

**Estado resultante:** el frontend queda auditado contra el documento unificado de Análisis.
El informe documenta qué se cumple, qué falta y qué se puede implementar sin esperar a otros
equipos. Pendiente: aprobar el plan de lo accionable y re-auditar cuando lleguen Drive,
URLs oficiales y contratos de Backend.
