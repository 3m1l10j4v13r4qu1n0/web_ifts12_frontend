# HU-03: Historia de Usuario — Navegación principal según el Mapa del Sitio V3

Fecha: 2026-11-16 · Estado: borrador

## Historia

**Como** visitante del sitio (futuro ingresante, alumno, docente o público general),
**quiero** que el menú principal use los nombres y las secciones aprobadas por el instituto,
**para** encontrar la información con la nomenclatura que usa el IFTS N.º 12 y sin
secciones que ya no existen como pestaña.

## Tarjeta

El instituto aprobó una navegación de **7 pestañas** —Inicio, Instituto, Carreras,
Ingresantes, Alumnos, Tutoría y FAQ— con el buscador global y los 3 accesos externos que ya
existen (Moodle, SIU e Inscripción GCBA). Esta HU cambia **solo la navegación y los nombres
visibles**: no reescribe el contenido de las páginas, que se trabaja en HU-04 (Tutoría y
horarios), HU-05 (Ingresantes y Alumnos) y HU-06 (Carreras).

- **Ticket:** Mantis 0000088 — `[FRONT][MENÚ] Actualizar navegación según devolución de Edith`.
- **Fuente:** `docs/01_global/mapa_sitio_ifts12_v3.md` §1, §9 y §14; devolución de Edith
  (08/11/2026) §1.
- **Bloque ⏳:** Docentes, Novedades y Contacto no forman parte de las 7 pestañas y su
  ubicación definitiva depende del ticket **0000099** (Melina Gramajo). Esta HU **no**
  decide esa ubicación: retira los tres del menú principal y deja las rutas y los accesos
  actuales como están (ver CA-03-05).

## Reemplaza

- La navegación de **9 ítems** del Mapa del Sitio V2 (Inicio, Carreras, Ingresantes,
  Estudiantes, Tutorías, Docentes, Institucional, Novedades, Contacto) y la redacción
  anterior de **RN-14**. El Mapa V2 queda como entregable fechado y no se edita.

## Criterios de Aceptación

- **CA-03-01.** Dado que ingreso al sitio en escritorio, cuando se renderiza el encabezado,
  entonces el menú principal muestra **7 pestañas en este orden**: Inicio, Instituto,
  Carreras, Ingresantes, Alumnos, Tutoría y FAQ (V3 §1; RN-14).
- **CA-03-02.** Dado que el menú cambió de nombre, cuando lo leo, entonces dice
  **Instituto** (antes Institucional), **Alumnos** (antes Estudiantes) y **Tutoría** (antes
  Tutorías), y desaparecen las etiquetas viejas de todo el sitio (menú, pie, títulos y
  breadcrumbs de las páginas afectadas).
- **CA-03-03.** Dado que FAQ pasa a ser pestaña principal, cuando la selecciono, entonces
  navego a `/faq` y la pestaña queda marcada como activa.
- **CA-03-04.** Dado que el sitio tiene rutas ya publicadas, cuando se aplica el renombre,
  entonces **no se migran las URLs**: `/institucional`, `/estudiantes` y `/tutorias` siguen
  respondiendo (V3 §15). El cambio de etiqueta no obliga a cambiar rutas.
- **CA-03-05.** Dado que Docentes, Novedades y Contacto no están entre las 7 pestañas,
  cuando reviso el menú principal, entonces no aparecen; y el resto de los accesos se
  mantiene: Novedades se alcanza desde el bloque de Inicio y desde el pie, Contacto desde
  el pie y Docentes conserva su ruta y su página (queda **sin enlace desde el menú hasta que
  responda 0000099**). No se elimina ninguna página ni ruta.
- **CA-03-06.** Dado que navego desde un celular, cuando abro el menú, entonces veo las
  mismas 7 pestañas (menú hamburguesa), sin desbordes horizontales y con navegación por
  teclado (Enter/Espacio para abrir y cerrar).
- **CA-03-07.** Dado que el pie de página repite los enlaces del mapa, cuando lo leo,
  entonces las columnas usan los nombres nuevos (Instituto, Alumnos, Tutoría) y no anuncian
  Becas, Boleto ni Mesas como secciones propias (V3 §10; RN-08 ⏳).
- **CA-03-08.** Dado que los exports de diseño tienen anotaciones (refs `RF-xx`, códigos
  B/I/M, "PENDIENTE INSTITUCIONAL"), cuando se renderiza header, menú o pie, entonces
  ninguna anotación aparece en pantalla (guard `anotaciones-no-renderizadas.test.ts`).

### Pendiente (no bloquea esta HU)

- ⏳ **Ubicación de Docentes, Novedades y Contacto** (pestaña aparte o acceso desde el pie):
  ticket 0000099. Hasta la respuesta, se aplica CA-03-05 y no se inventa la ubicación.

## Specification by Example

- Visitante en escritorio: ve 7 pestañas con los nombres nuevos y el buscador; entra a FAQ
  desde el menú.
- Visitante en celular: abre el menú hamburguesa y encuentra las mismas 7 pestañas.
- Alguien con un enlace guardado a `/estudiantes`: la ruta sigue funcionando, con el título
  "Alumnos".
- Alguien busca Docentes en el menú: no lo encuentra (decisión pendiente); la página sigue
  existiendo si llega por URL directa.

## Acceptance TDD

- Verificar que `MENU_PRINCIPAL` tiene exactamente 7 ítems, en el orden y con las etiquetas
  aprobadas.
- Verificar que FAQ figura en el menú y navega a `/faq`.
- Verificar que Docentes, Novedades y Contacto **no** están en `MENU_PRINCIPAL` y que sus
  rutas siguen existiendo en el router.
- Verificar que el menú móvil renderiza los mismos 7 ítems.
- Verificar los nombres nuevos en el pie y en los títulos/breadcrumbs de Instituto, Alumnos
  y Tutoría.
- Verificar que los tests de header y navegación anteriores (que esperaban 9 ítems y las
  etiquetas viejas) se actualizan, no se borran.

## Impacto técnico

- `src/constants/navegacion.ts` (`MENU_PRINCIPAL`, `NAV_FOOTER_MAPA`).
- `src/components/layout/Header.tsx`, `MobileMenu.tsx` y `Footer.tsx` (solo etiquetas y
  enlaces).
- Títulos y breadcrumbs de `InstitucionalPage.tsx` / `EstudiantesPage.tsx` /
  `TutoriasPage.tsx` (los nombres visibles; el contenido va en HU-04 y HU-05).
- Tests: `src/__tests__/header.test.tsx` y los que cuentan ítems del menú.

## Fuera de alcance

- Contenido de cada sección (HU-04, HU-05 y HU-06).
- URLs nuevas o redirecciones (V3 §15).
- Ubicación de Docentes, Novedades y Contacto (0000099).
- Rediseño visual del header o del pie.

## Referencias

IFTS N.º 12. (2026). *Devolución de Edith — pendientes del sitio TEST*.
`docs/01_global/devolucion_edith_2026_11_13.md`.

Equipo de UX/UI y Frontend. (2026). *Mapa del Sitio V3*.
`docs/01_global/mapa_sitio_ifts12_v3.md`.

Carata, E. (2026). *Ticket 0000088 — [FRONT][MENÚ] Actualizar navegación según devolución de
Edith*. Mantis. `documentacion/driveFrontend/matis_frontend/`.

Gramajo, M. (2026). *Ticket 0000099 — [AF][MENÚ] Confirmar ubicación de Docentes, Novedades y
Contacto*. Mantis.
