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
El informa documenta qué se cumple, qué falta y qué se puede implementar sin esperar a otros
equipos. Pendiente: aprobar el plan de lo accionable y re-auditar cuando lleguen Drive,
URLs oficiales y contratos de Backend.

---

## 2026-09-09 — Fase 6: Brechas de auditoría sin dependencias externas

**Qué se hizo:**
Implementación de los 5 puntos "accionables sin dependencias externas" de la auditoría contra
el análisis funcional unificado (docs/frontend/auditoria-analisis-unificado.md). Se ejecutaron
5 sub-fases en secuencia:

- **Fase 6a (RF-22):** ContactoPage con dirección "Misiones 26, C1083 ABB, CABA", horario
  nocturno y correo placeholder. Footer actualizado con dirección y horario en la columna 1.
- **Fase 6b:** 5 accesos rápidos faltantes (SIU, Inscripción GCBA, Constancias, Mesas de
  examen, Calendario académico) agregados a `mockAccesosRapidos` como placeholders atenuados
  (href vacío → deshabilitados). `ENLACES` extendido con las 4 nuevas keys vacías.
- **Fase 6c:** Tipos `Carrera` y `Noticia` extendidos: `Carrera` con `modalidad` (obligatoria)
  y `horarios?` (opcional); `Noticia` con `imagenUrl?` y `enlace?` (opcionales). Mocks de
  carreras ampliados a 6 (como indica el documento) con modalidad "Presencial" y horarios.
  CardCarrera muestra modalidad; CardNoticia y SliderNoticias muestran imagen condicional.
- **Fase 6d:** `FaqCategoria` extendida con `'institucional'`. 12 FAQs descriptivas: 3
  ingresantes (inscripción, equivalencias, requisitos), 4 estudiantes (regularidad, constancias,
  mesas), 2 docentes (concursos, acceso), 3 institucional (bedeles, SIU, títulos, traspasos).
- **Fase 6e:** Noticias mock con fechas ISO (2026-09-01, 2026-08-15, 2026-07-20). Ordenamiento
  reciente→antigua implementado en HomePage antes de pasar al slider. Posibilidad de destacar
  "último mes" preparada.

**Decisiones:**
- Todos los textos son placeholders descriptivos, no contenido definitivo del análisis funcional.
- `Carrera.modalidad` es `string` (no enum) para no inventar valores; se mapea cuando lleguen
  datos reales del backend.
- `Noticia.imagenUrl` y `Noticia.enlace` son opcionales para retrocompatibilidad con mocks
  existentes.
- La categoría `institucional` en FAQ agrupa bedeles, SIU, títulos y traspasos (RF-29/30/31/32).
- El ordenamiento de noticias se hace en HomePage (presentacional), no en el componente slider.
- Se usó `npm run lint:fix` para corregir formato de Biome en 2 archivos.

**Archivos tocados:**
- `src/types/domain/sitio.types.ts` — `Carrera` (+modalidad, +horarios), `Noticia` (+imagenUrl, +enlace), `FaqCategoria` (+institucional)
- `src/constants/enlaces.ts` — +4 keys: siu, constancias, mesasExamen, calendario
- `src/constants/mock-data.ts` — 6 carreras con modalidad/horarios, 12 FAQs por 4 categorías, 3 noticias con fechas, 11 accesos rápidos
- `src/pages/ContactoPage.tsx` — reemplazado placeholder con contenido real (RF-22)
- `src/pages/HomePage.tsx` — agregado ordenamiento de noticias por fecha
- `src/components/layout/Footer.tsx` — agregada dirección y horario
- `src/components/ui/CardCarrera.tsx` — muestra modalidad y horarios
- `src/components/ui/CardNoticia.tsx` — muestra imagenUrl condicional
- `src/components/ui/SliderNoticias.tsx` — muestra imagenUrl condicional
- `src/components/ui/FaqAcordeon.tsx` — agregada categoría "Institucional"
- `docs/estado_actual_proyecto.md` — actualizado resumen, entidades, casos de uso, pendientes
- `docs/vitacora_agentica.md` — esta entrada

**Estado resultante:**
Las 5 brechas de auditoría accionables sin dependencias externas quedan cerradas. Verificación:
lint ✅, build ✅, tests ✅ (11/11). El frontend ahora tiene: dirección/horario en Contacto y
Footer, 11 accesos rápidos en Home (5 atenuados), 6 carreras con modalidad, 12 FAQs por 4
categorías, noticias con fechas y ordenamiento reciente→antigua. Pendientes: contenido real de
Análisis/Edith, endpoints y auth de Backend, wireframes de UX/UI, URLs oficiales.

---

## 2026-09-09 — Auditoría de infraestructura: requerimientos vs. proyecto

**Qué se hizo:** desde `develop` se creó la rama `feature/requerimientos-infraestructura`. Se
auditaron los 3 documentos de `docs/driveFrontend/05_infraestructura/` (especificación técnica
de requerimientos, cuestionario Moodle/hosting y checklist del grupo 5) contra la documentación
interna del frontend (`docs/frontend/propuesta-tecnologica.md`,
`dependencias-equipos.md`, `estado_actual_proyecto.md`) y el código real (vite.config.ts,
package.json, `src/api/endpoints.ts`, `src/constants/enlaces.ts`). Se generó el informe
`docs/frontend/auditoria-infraestructura.md` con tabla de consistencia por área, 10 brechas
codificadas (INF-A1…INF-J1) y checklist accionable para Frontend.

**Decisiones/des cubrimientos clave:**
- El proyecto está esencialmente alineado con los requerimientos de Infra: build estático, SPA
  fallback, stack Python/Flask/PostgreSQL/Docker, ambientes y backups coinciden.
- Brecha severa: typo `iffts12.edu.ar` (doble f) en `grupo_5_infraestructura.md` — riesgo de
  propagarse a config real de Nginx/DNS.
- El código no usa `import.meta.env` ni `VITE_*`: las URLs viven como constantes vacías en
  `enlaces.ts` y `endpoints.ts`. No existe `.env.example`.
- D3 define solo 3 variables de entorno pero el frontend tiene 6 placeholders de URLs
  (moodle, inscripción, SIU, constancias, mesas, calendario) → brecha de coordinación.
- Cabeceras de seguridad Nginx y `client_max_body_size 15m` de la especificación no están en
  el bloque Nginx propuesto por el grupo 5.

**Archivos tocados:**
- `docs/frontend/auditoria-infraestructura.md` — nuevo, informe completo de la auditoría.
- `docs/vitacora_agentica.md` — esta entrada.

**Estado resultante:** auditoría de infraestructura documentada en la rama
`feature/requerimientos-infraestructura`. No se tocó código de aplicación. Pendientes: revisar
las brechas con Infra (typo de dominio, cabeceras Nginx, variables de entorno), alinear la
propuesta tecnológica y migrar enlaces a variables de entorno cuando haya URLs oficiales.

---

## 2026-09-09 — Aplicación de hallazgos al doc del grupo 5 de Infraestructura

**Qué se hizo:** sobre la base de la auditoría de infraestructura, se actualizó el documento
`docs/driveFrontend/05_infraestructura/grupo_5_infraestructura.md` (fuente de verdad no
versionada) para marcar lo ya cubierto por el Frontend y corregir brechas:

- **Marcado como ✅:** build estático listo (`npm run build` en verde el 09/09/2026), ambiente
  de desarrollo operativo (`npm run dev`), pasos 1-2 del flujo de despliegue (push a feature +
  integración en develop).
- **INF-D1:** corregido el typo `iffts12.edu.ar` → `ifts12.edu.ar` (dominio con doble "f") en
  el CNAME y el subdominio de testing.
- **INF-E1/INF-E2:** bloque Nginx del grupo 5 completado con cabeceras de seguridad
  (X-Frame-Options, X-Content-Type-Options, X-XSS-Protection, Content-Security-Policy) y
  `client_max_body_size 15m`, con nota de validar la CSP con Frontend/QA.
- **INF-G2:** tabla de variables de entorno ampliada de 3 a 7 (`VITE_*` sumando SIU,
  constancias, mesas de examen y calendario), con nota del estado real del código.
- **Sección 13 nueva:** "Estado de avance según auditoría INF" clasificando lo cubierto por
  Frontend, lo corregido en el documento y lo pendiente de Infra/Dirección/Backend.

**Decisiones:** se trabajó solo sobre el documento fuente del Drive (no versionado), como
pidió el usuario; los cambios versionados de memoria ya estaban registrados en la entrada de
auditoría previa. No se repitió validación de código porque no se tocó `src/`.

**Archivos tocados:**
- `docs/driveFrontend/05_infraestructura/grupo_5_infraestructura.md` — actualizado (gitignored).
- `docs/frontend/auditoria-infraestructura.md` — referenciado como marco (ya commitado en la
  entrada previa).

**Estado resultante:** el documento del grupo 5 refleja el estado real del Frontend y las
correcciones de la auditoría. Pendientes de Infra/Dirección/Backend: VPS, dominio, Nginx real,
URLs oficiales, contratos de API y presupuesto de testing.

---

## 2026-09-09 — Regla + skill de auditoría de documentación (.agents/)

**Qué se hizo:** se creó la regla dura `.agents/rules/auditoria-documentacion.md` y el skill
`.agents/skills/auditoria-documentacion/SKILL.md` para que toda auditoría de documentación
también actualice el archivo del grupo correspondiente (`docs/driveFrontend/0X_*/grupo_X_*.md`),
no solo el informe versionado. Se editó `AGENTS.md` con la sección "Auditoría de documentación
(regla + skill: `.agents/`)" que referencias ambos y el ejemplo de la auditoría de
infraestructura como patrón.

**Decisiones:**
- La regla vive en `.agents/rules/` (nueva subcarpeta, mismo patrón que `.opencode/rules/`);
  el skill en `.agents/skills/auditoria-documentacion/` siguiendo el formato de frontmatter
  YAML de los skills existentes.
- Los estados de checklist son estables y consistentes con las auditorías previas:
  ✅ listo / 🟡 parcial / 🔵 pendiente externo / ⏳ en proceso.
- Queda explícito que los cambios a `docs/driveFrontend/**` NO se commitean (gitignored);
  solo se versiona el informe (`docs/frontend/auditoria-*.md`) y la memoria.
- Anti-alucinación: ✅ solo se marca con evidencia verificada en la sesión actual; no se
  cambian estados que dependan de decisiones externas no confirmadas.

**Archivos tocados:**
- `.agents/rules/auditoria-documentacion.md` — nueva regla dura (nueva subcarpeta `rules/`).
- `.agents/skills/auditoria-documentacion/SKILL.md` — nuevo skill con workflow completo.
- `AGENTS.md` — nueva sección "Auditoría de documentación (regla + skill: `.agents/`)".
- `docs/estado_actual_proyecto.md` — ítem en "Decisiones y convenciones vigentes".
- `docs/vitacora_agentica.md` — esta entrada.

**Estado resultante:** el patrón ya aplicado en la auditoría de infraestructura queda
institucionalizado para futuras auditorías (grupo_1…grupo_6). No se tocó ningún doc de
`docs/driveFrontend/` en esta tarea.

---

## 2026-09-09 — Integración de `gh` (CLI de GitHub) al flujo de git

**Qué se hizo:** se instaló el binario de `gh` v2.100.0 en `~/.local/bin/gh` (sin root, entorno
Arch sin snap/apt) y el usuario completó `gh auth login`. Se actualizó la regla dura
`.opencode/rules/flujo-git.md` con una sección "Pull Requests con `gh`" (crear PR hacia
`develop` con `gh pr create`, listar/ver con `gh pr list`/`view`, checkout, y merge ORIGINAL
`gh pr merge --merge` solo con aprobación). También se actualizó `AGENTS.md` (sección Git) y el
skill `.agents/skills/auditoria-documentacion/SKILL.md` (paso de push + `gh pr create`).

**Decisiones:**
- `gh` no reemplaza a git: es la capa de GitHub para gestionar PRs. El push sigue siendo git.
- Queda explícito que el agente NO crea/mergea/cierra PRs sin aprobación del usuario.
- El flujo merge a `develop` queda preferentemente vía PR aprobado (no merge directo local).

**Archivos tocados:**
- `.opencode/rules/flujo-git.md` — nueva sección PRs con `gh` + pasos de merge vía PR.
- `AGENTS.md` — sección Git con uso de `gh` e instalación en `~/.local/bin/gh`.
- `.agents/skills/auditoria-documentacion/SKILL.md` — sección "Commits y PR" con `gh pr create`.
- `docs/estado_actual_proyecto.md` — ítem en decisiones vigentes.
- `docs/vitacora_agentica.md` — esta entrada.

**Estado resultante:** primer PR del repo creado (#1) con `gh pr create` de
`feature/requerimientos-infraestructura` → `develop`. El uso de `gh` queda documentado en las
reglas del proyecto.

---

## 2026-09-09 — Implementación de brechas de auditoría de infraestructura (rama `feature/implementacion-infra`)

**Qué se hizo:** se creó la rama `feature/implementacion-infra` desde `develop` y se ejecutaron
las porciones de la auditoría de infraestructura que el Frontend puede resolver sin esperar a
Infra/Dirección:

- **`docs/frontend/propuesta-tecnologica.md`:**
  - §6.3: versiones mínimas de software alineadas con la especificación técnica (Ubuntu
    22.04/24.04, Python 3.10+, Nginx ≥ 1.18, PostgreSQL 14+, MySQL 8/MariaDB 10.6+, Docker
    Engine 24.0+ y Compose v2.x) — INF-B1.
  - §6.4: tabla de dimensionamiento con columna de ancho de banda (1 TB/100 Mbps, 4 TB/1 Gbps,
    8 TB/1 Gbps) y rangos de disco unificados (mínimo 25-30 GB, ideal 100-160 GB) — INF-A1/A2.
  - §6.5: subdominios `test.ifts12.edu.ar` y `campus.ifts12.edu.ar` + requisitos TLS 1.2/1.3 y
    HSTS — INF-D2.
  - §9 (nueva): política de optimización de imágenes WebP/SVG ≤ 500 KB — INF-C1.
- **`README.md`:** nueva sección "Build de producción" (`npm run build` → `dist/` estático +
  nota de fallback SPA y env vars pendientes) — checklist §5.1.
- **`docs/estado_actual_proyecto.md`:** §6 actualizado con el estado de la alineación y los
  pendientes de Infra (INF-G1/G2).

**Decisiones:**
- Quedan **bloqueadas por Infra/Dirección** las variables `VITE_*` (¿3, 6 o 7?): se espera el
  acuerdo sobre la lista final antes de crear `.env.example` y migrar `enlaces.ts`/`API_BASE_URL`
  a `import.meta.env` (INF-G1/G2).
- La corrección del typo `iffts12.edu.ar` y las cabeceras Nginx quedan a cargo de Infra
  (INF-D1/E1/E2), ya aplicadas en el doc de Drive del grupo 5 en la auditoría previa.
- La política de imágenes se documenta con reglas manuales de equipo; la automatización en CI
  queda como opcional a coordinar con Infra.

**Archivos tocados:**
- `docs/frontend/propuesta-tecnologica.md` — §6.3, §6.4, §6.5 y nueva §9.
- `README.md` — sección "Build de producción".
- `docs/estado_actual_proyecto.md` — §6 y cabecera de "última actualización".
- `docs/vitacora_agentica.md` — esta entrada.

**Estado resultante:** 4 de las 5 brechas internas del Frontend resueltas en documentación
(INF-A1, INF-A2, INF-B1, INF-D2, INF-C1) y el checklist §5.1 completo. Sin cambios de código en
`src/`; las tareas de env vars (INF-G1/G2) siguen a la espera de la decisión de Infra/Dirección.

---

## 2026-09-09 — Conversión de entregas a Markdown + actualización al estado actual

**Qué se hizo:** se convirtieron los 6 entregables de `docs/entregas/` de `.docx` a Markdown
(pandoc `-t gfm --wrap=none`), manteniendo los `.docx` fuente. Se verificó qué documentos
estaban desactualizados respecto de las implementaciones de hoy (auditoría de infraestructura
y rama `feature/implementacion-infra`) y se actualizaron 3:

- **Matriz de Dependencias:** se agregaron dependencias nuevas de la auditoría (lista final de
  variables `VITE_*` INF-G2, cabeceras Nginx + `client_max_body_size 15m` INF-E1/E2, resultado
  de la reunión con Oscar INF-J1, URL definitiva de la API con Backend, URLs oficiales de las 6
  integraciones) y se marcaron Listo los entregables resueltos (propuesta §6, política de
  imágenes, bloque Nginx de ejemplo).
- **Registro de Decisiones:** se agregaron DEC-011 (env vars a `import.meta.env`), DEC-012
  (política de imágenes WebP/SVG ≤ 500 KB), DEC-013 (alineación de propuesta §6 con especif.),
  DEC-014 (entregas en Markdown).
- **Reporte Semanal:** se agregó la semana 09/09/2026 (auditoría de infraestructura + rama
  `feature/implementacion-infra` + PR #2), conservando el reporte de la semana 31/08.

**No se tocaron:** Acta de Roles, Inventario Técnico y Minuta (documentos históricos/snapshot,
sin cambios por infra).

**Decisiones:**
- Los `.docx` fuente se conservan; los `.md` generados son la versión versionable/diffable.
- Solo 3 entregables necesitaban actualización al estado real; el resto queda como registro
  histórico de la fecha de emisión.

**Archivos tocados:**
- `docs/entregas/*.md` — 6 archivos nuevos (conversión pandoc).
- `docs/entregas/2026-08-31__Matriz_Dependencias_Frontend_v0.1.md` — actualizado (nuevas deps).
- `docs/entregas/2026-08-31__Registro_Decisiones_Frontend_v0.1.md` — actualizado (DEC-011…014).
- `docs/entregas/2026-08-31__Reporte_Semanal_Frontend_v0.1.md` — actualizado (semana 09/09).
- `docs/estado_actual_proyecto.md` — §8 con referencias a entregas Markdown.
- `docs/vitacora_agentica.md` — esta entrada.

**Estado resultante:** las entregas reflejan el estado real del frontend (infra auditada y
alineada). Los pendientes (INF-G1/G2, VPS, URLs) siguen bloqueados por Infra/Dirección.

---

## 2026-09-15 — Refactor Mapa Sitio V2 (nueva fuente de verdad de UX/UI)

**Qué se hizo:** se creó la rama `refactor/mapa-sitio` desde `develop` (previo commit de la
auditoría de backend en `feature/auditoria-backend` según aprobación del usuario). Se eliminó el
mapa desactualizado `docs/driveFrontend/02_ux_ui/mapa_inicial_sitio_web_ifts12_2026.md` y se
implementó la **nueva fuente de verdad** `mapa_inicial_sitio_web_ifts12_2026_v2.md` de UX/UI
(15/09/2026) en el código:

- **Menú principal de 9 items** (`constants/navegacion.ts`): Inicio, Carreras, Ingresantes,
  Estudiantes, Tutorías, Docentes, Institucional, Novedades, Contacto. Reemplaza la regla previa
  de máx. 4-5 items (aprobado por el usuario).
- **Buscador global** (`components/layout/BuscadorGlobal.tsx` + `utils/busqueda.ts`): persistente
  en el header, filtra contenido local (secciones del menú, carreras, novedades y FAQs) con
  normalización de tildes, `combobox` accesible y navegación con Enter/click. Sin endpoint de
  Backend todavía.
- **Accesos de la Home separados** según V2: `ui/AccesosDestacados` (Campus Virtual Moodle,
  Inscripción oficial, Carreras) + `AccesosRapidos` (Tutorías, Becas, Constancias, Mesas de
  examen, Calendario académico, Contacto). `mock-data.ts` reorganizado (3 destacados + 6 rápidos).
- **Header** con dos filas: logo + buscador (+ hamburguesa mobile) arriba y NavMenu de 9 items
  abajo en desktop. Footer con `NAV_FOOTER` reducido a Preguntas frecuentes (evita duplicar el
  menú).

**Decisiones:**
- La V2 es la fuente de verdad de navegación; se actualizaron las reglas internas que decían
  "máx. 4-5 items" (`AGENTS.md`, `reglas-navegacion.md`, `reglas-guia-sitio-web.md`,
  skills `crear-sitio-web-completo` y `mejorar-navegacion-web`) y `propuesta-tecnologica.md`.
- El buscador indexa solo contenido local de mocks: la indexación real (incl. PDFs) queda
  pendiente de un endpoint de búsqueda de Backend (no confirmado) — no se alucina endpoint.
- Slider de novedades se mantiene como "noticias y novedades destacadas" (V2 no lo prohíbe y el
  backend confirmó `/api/slider`).
- El rol `combobox` en el input reemplazó a `role="search"` del form (Biome a11y); evitó el tag
  `<search>` (desconocido en jsdom).

**Archivos tocados:**
- Código: `src/constants/navegacion.ts`, `src/constants/mock-data.ts`, `src/utils/busqueda.ts`,
  `src/components/layout/{BuscadorGlobal,Header}.tsx`, `src/components/ui/AccesosDestacados.tsx`,
  `src/pages/HomePage.tsx`.
- Tests: `src/__tests__/{busqueda.test.ts,buscador-global.test.tsx,accesos-destacados.test.tsx}` (3 suites nuevas).
- Reglas/docs: `AGENTS.md`, `.opencode/rules/{reglas-navegacion,reglas-guia-sitio-web}.md`,
  `.opencode/skills/{crear-sitio-web-completo,mejorar-navegacion-web}/SKILL.md`,
  `docs/frontend/{propuesta-tecnologica,acta-decisiones}.md`, `docs/estado_actual_proyecto.md`.
- Drive (gitignored): eliminado el mapa V1; queda solo la V2.

**Estado resultante:** `refactor/mapa-sitio` con navegación, buscador global y accesos V2
implementados. Verificación: lint ✅, build ✅, tests ✅ (19/19, 10 archivos). Pendientes: validar
la V2 con Análisis Funcional, wireframes de UX/UI, endpoint de búsqueda de Backend, URLs oficiales
de Moodle/inscripción. Commit/push de la rama pendientes de aprobación.
