# Acta de Decisiones — Frontend IFTS N.º 12

Área: Frontend · Proyecto Sitio Web Institucional IFTS N.º 12 — 2026
Documento vivo: registra las decisiones tomadas en las fases 1-5 (30/08/2026) y las que
deban validarse con otros equipos. Cada entrada indica fecha, contexto, decisión y estado.

> Referencia: las decisiones se consolidan de `docs/vitacora_agentica.md`,
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
- **Estado:** implementada (regla de navegación máx. 5 ítems).

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
