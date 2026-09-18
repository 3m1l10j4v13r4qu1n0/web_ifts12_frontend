# Acta de Decisiones — Frontend IFTS N.º 12

Área: Frontend · Proyecto Sitio Web Institucional IFTS N.º 12 — 2026
Documento vivo: registra las decisiones tomadas en las fases 1-5 (30/08/2026) y las que
deban validarse con otros equipos. Cada entrada indica fecha, contexto, decisión y estado.

> Referencia: las decisiones se consolidan de `docs/sdd/bitacora_agentica.md`,
> `docs/frontend/{plan,propuesta-tecnologica,dependencias-equipos}.md` y del skill
> `fe-architect-scaffold`.

## 1. Stack tecnológico (Fase 1 — Andamiaje)

- **Fecha:** 28-29/08/2026.
- **Decisión:** React 19 + Vite + TypeScript (strict) + Tailwind CSS v4, con React Router v7,
  Axios, TanStack Query v5, Context API, Zod- (habilitado en el stack), Biome (lint/formato) y
  Vitest + React Testing Library (tests).
- **Estado:** implementada y documentada en `propuesta-tecnologica.md`. A validar por el equipo
  en la reunión del lunes 31/08.
- **Nota:** el rol "HTML/CSS/Bootstrap" del docx de referencia se implementa con Tailwind v4
  (ver `rol_equipo.md`).

## 2. Rama de trabajo y flujo Git (Fase 0)

- **Fecha:** 28/08/2026.
- **Decisión:** prohibido trabajar sobre `main`/`develop`; ramas `feature/` desde `develop`;
  una rama = una tarea; commits atómicos con Conventional Commits en español; push/merge solo
  con aprobación explícita.
- **Estado:** activa como regla dura (`.opencode/rules/flujo-git.md`).

## 3. Menú principal de 5 ítems + logo a Home (Fase 3)

- **Fecha:** 29/08/2026.
- **Decisión:** el menú principal tiene 5 ítems (Carreras, Ingresantes, Estudiantes, Docentes,
  Noticias), sin ítem "Inicio" porque el logo enlaza a la Home. Institucional, Tutorías, FAQ y
  Contacto quedan en el footer.
- **Estado:** **REEMPLAZADA** el 15/09/2026 por la decisión 11 (Mapa del Sitio V2: menú de 9
  ítems + buscador global). Se conserva como registro histórico.

## 4. Paleta provisional de color (Fase 3)

- **Fecha:** 29/08/2026.
- **Decisión:** un único color de acento azul + neutros (regla 90/10) vía tokens `@theme` en
  Tailwind v4. Paleta **provisoria** hasta validar con UX/UI.
- **Estado:** implementada; pendiente de confirmación de la paleta oficial con UX/UI.

## 5. Datos de la Home con mocks provisorios (Fase 2/4)

- **Fecha:** 29-30/08/2026.
- **Decisión:** la Home se arma con datos simulados tipados en `constants/mock-data.ts`,
  marcados como provisorios y sin afirmaciones institucionales definitivas, hasta recibir la
  minuta V2 de Análisis y los contenidos oficiales.
- **Estado:** implementada.

## 6. URLs de Moodle e inscripción como placeholders (Fase 2/4)

- **Fecha:** 29-30/08/2026.
- **Decisión:** las URLs oficiales de Moodle e inscripción viven vacías en `constants/enlaces.ts`
  hasta recibirlas de IFTS/Dirección. En la Home y el Footer los enlaces externos (campus virtual
  e inscripción) se muestran **solo cuando existe URL**, para no renderizar enlaces rotos.
- **Estado:** implementada; pendiente de URLs oficiales.

## 7. Sin consumo de API real (Fase 2/4)

- **Fecha:** 29-30/08/2026.
- **Decisión:** no se consume API real ni se inventan endpoints. La tabla oficial de endpoints
  del backend está vacía; el frontend deja preparados `api/client.ts` (interceptor), `services/`,
  `types/api` y `AuthContext`/`ProtectedRoute` para la integración futura.
- **Estado:** activa (regla anti-alucinación del skill).

## 8. Slider de novedades accesible sin librerías (Fase 4)

- **Fecha:** 30/08/2026.
- **Decisión:** las novedades se muestran en un carrusel propio (`ui/SliderNoticias`) con estado
  local `useState`, navegación circular, indicador de posición y ARIA. No se instala librería de
  carrusel (YAGNI) hasta definir wireframes de UX/UI.
- **Estado:** implementada.

## 9. Autenticación real no implementada (Fase 2)

- **Fecha:** 29/08/2026.
- **Decisión:** no se implementa login real hasta que el backend la soporte; solo se deja la
  estructura (`AuthContext`, `ProtectedRoute`) preparada.
- **Estado:** activa (YAGNI).

## 10. Infraestructura Plan B (VPS independiente del Moodle)

- **Fecha:** 28/08/2026.
- **Decisión:** la nueva web se aloja en un VPS independiente del Moodle; Frontend entrega un
  build estático servido por Nginx. Detalle, dimensionamiento y proveedores en
  `propuesta-tecnologica.md` secciones 6-7.
- **Estado:** propuesta documentada; pendiente de aprobación de Dirección y contrato con Infra.

## 11. Mapa del Sitio V2 como fuente de verdad de navegación (refactor 15/09/2026)

- **Fecha:** 15/09/2026.
- **Contexto:** UX/UI entregó el Mapa del Sitio V2 (`02_ux_ui/mapa_inicial_sitio_web_ifts12_2026_v2.md`),
  propuesta de arquitectura de información con buscador global, accesos destacados/rápidos y menú de 9
  items; reemplaza al mapa V1 (relevamiento 27/08), que fue eliminado.
- **Decisión 1 (menú principal):** adoptar el menú de 9 items de la V2 (Inicio, Carreras, Ingresantes,
  Estudiantes, Tutorías, Docentes, Institucional, Novedades, Contacto), con "Inicio" además del logo
  enlazado a la Home. Reemplaza la regla previa de "máx. 4-5 items".
- **Decisión 2 (buscador global):** `BuscadorGlobal` persistente en el header que filtra contenido
  local (secciones del menú, carreras, novedades y FAQs de los mocks) con normalización de tildes. La
  indexación real y el rastreo de PDFs quedan pendientes de un endpoint de búsqueda de Backend.
- **Decisión 3 (accesos de la Home):** separar **accesos destacados** (Campus Virtual Moodle,
  Inscripción oficial, Carreras) de los **accesos rápidos** (Tutorías, Becas, Constancias, Mesas de
  examen, Calendario académico, Contacto), según la V2. Moodle/inscripción siguen deshabilitados como
  placeholders hasta tener URL oficial.
- **Estado:** implementada en `refactor/mapa-sitio` (15/09/2026). Pendiente: endpoint de búsqueda
  de Backend y wireframes definitivos de UX/UI.

## 12. Fuente única de verdad de Análisis + 7 accesos rápidos (18/09/2026)

- **Fecha:** 18/09/2026.
- **Contexto:** el cliente validó `docs/frontend/analisis_funcional_validado.md` como síntesis de
  los 3 PDFs aprobados de Análisis Funcional (`docs/driveFrontend/01_analisis_funcional/`). La
  Respuesta a Frontend fija puntos que había que confirmar: accesos rápidos, dirección, login y
  alcance por etapas.
- **Decisión 1 (accesos rápidos):** la Home tiene **7 accesos rápidos confirmados** por Análisis
  (Campus Moodle, SIU, Inscripción GCBA, Becas, Constancias, Mesas de examen, Calendario
  académico) — el documento aclara explícitamente que son **7, no 9**. El Mapa V2 de UX/UI lista
  9 accesos sin SIU: la tensión queda **🟡 documentada** y la navegación la define UX/UI (no se
  sobrescribe).
- **Decisión 2 (login):** el login es **exclusivo del personal que administra contenidos**; el
  contenido informativo es público (RF-23…RF-28, RF-34).
- **Decisión 3 (alcance):** implementación por etapas **A (v1) → B → C**, con el bot/asistente
  virtual fuera de v1 (etapa C).
- **Decisión 4 (Contacto):** dirección **Misiones 26, C1083 ABB, CABA** y horario **nocturno** son
  contenido fijo confirmado (ya implementado en RF-22 desde la Fase 6).
- **Estado:** fuente validada registrada como nueva referencia de auditoría; documentación auditada
  contra ella (rama `feature/auditoria-fuente-analisis`, informe
  `docs/sdd/06_auditorias/auditoria-analisis-unificado.md`).
