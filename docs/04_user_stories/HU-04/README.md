# HU-04: Historia de Usuario — Horarios de atención y sección Tutoría

Fecha: 2026-11-16 · Estado: borrador

## Historia

**Como** visitante del sitio,
**quiero** ver los horarios oficiales de atención del instituto y el canal correcto para
contactar al equipo de tutorías,
**para** saber cuándo puedo acercarme al IFTS y cómo pedir acompañamiento sin pasar por el
formulario general de contacto.

## Tarjeta

Dos cambios de la devolución de Edith que comparten el mismo dato institucional (horario) y
la misma página (Tutoría):

1. **Horarios de atención.** Se reemplaza la leyenda «Atención exclusivamente nocturna» por
   las dos franjas confirmadas: **lunes a viernes de 9:00 a 13:00 y de 18:30 a 22:30**, en la
   barra superior, el pie, Contacto y Tutoría.
2. **Tutoría.** Se quita la tabla de días y horarios, se publica el correo
   **clara.moroni@bue.edu.ar** como canal único —con el asunto «Sitio Web - Tutorías - Tu
   Nombre y Apellido», indicando año y carrera—, se elimina el asunto «Tutorías» del
   formulario general y se actualiza la pregunta frecuente de contacto.

- **Tickets:** Mantis 0000089 (`[FRONT][GENERAL] Actualizar horarios de atención
  institucional`) y 0000090 (`[FRONT][TUTORÍA] Actualizar contenido y canal de contacto`).
- **Fuente:** Mapa del Sitio V3 §7, §9 y §10; devolución de Edith §7 y §11.

## Reemplaza

- La regla **RN-07** anterior («atención solo nocturno») y la bajada «turno exclusivamente
  nocturno» del pie y de Tutoría. El horario vigente son las dos franjas.

## Criterios de Aceptación

### Horarios

- **CA-04-01.** Dado que cargo cualquier página, cuando miro la barra superior, entonces leo
  la dirección **Misiones 26, C1083 ABB, CABA** con el horario **lunes a viernes de 9:00 a
  13:00 y de 18:30 a 22:30**, y ya no aparece «Atención exclusivamente nocturna».
- **CA-04-02.** Dado que miro el pie, cuando llego a los datos institucionales, entonces veo
  las dos franjas y **no** aparece la leyenda «Exclusivamente nocturno · Presencial, Híbrida
  y a distancia».
- **CA-04-03.** Dado que entro a Contacto, cuando leo los datos del instituto, entonces el
  horario de atención son las dos franjas (RF-22; RN-07).

### Tutoría

- **CA-04-04.** Dado que entro a Tutoría, cuando se renderiza la página, entonces **no
  existe la tabla de días, horarios y modalidades** y la página se enfoca en la presentación
  y en el canal de contacto.
- **CA-04-05.** Dado que quiero contactar al equipo, cuando leo el bloque de contacto,
  entonces veo el correo **clara.moroni@bue.edu.ar** con el asunto indicado «Sitio Web -
  Tutorías - Tu Nombre y Apellido» y la indicación de incluir **año y carrera**; el enlace
  es un `mailto:` con el asunto precargado.
- **CA-04-06.** Dado que el formulario general de contacto tiene un selector de asunto,
  cuando lo abro, entonces **«Tutorías» ya no es una opción**; la página de Tutoría tampoco
  pide «elegir el asunto Tutorías» ni envía al formulario.
- **CA-04-07.** Dado que existe la pregunta frecuente «¿Cómo contacto al equipo de
  tutorías?», cuando la abro, entonces la respuesta indica el correo y el asunto oficiales
  (hoy esa pregunta no existe: se agrega).
- **CA-04-08.** Dado que los exports de diseño tienen anotaciones («PENDIENTE
  INSTITUCIONAL», refs `I10`/`I12`/`M1`), cuando se renderiza Tutoría, entonces ninguna
  anotación aparece en pantalla (guard `anotaciones-no-renderizadas.test.ts`).

### Pendiente (no bloquea el resto)

- ⏳ **Presentación de Tutoría:** el texto institucional de 3 párrafos (acompañamiento,
  permanencia y egreso) y la imagen no están transcriptos en Capa 1. Se publican cuando el
  instituto entregue el material literal; mientras tanto la página mantiene un mensaje de
  proceso (no se redacta contenido por cuenta propia).
- ⏳ **Material de apoyo** (recursos de «Comunidad Tutorías») y **eventos importantes**
  (mini carrusel): dependen de acceso/exportación del campus y de definición de alcance.

## Specification by Example

- Visitante en escritorio: en la barra superior lee las dos franjas de atención; en Tutoría
  encuentra el correo de Clara Moroni con el asunto y la indicación de año y carrera.
- Visitante en celular: los horarios se leen completos y el enlace `mailto:` abre el cliente
  de correo con el asunto cargado.
- Alguien que quiere tutorías entra al formulario general: ya no ve «Tutorías» como asunto y
  la página lo deriva al correo.
- Alguien busca en FAQ cómo contactar tutorías: encuentra la respuesta con el correo.

## Acceptance TDD

- Verificar que la barra superior, el pie, Contacto y Tutoría muestran las dos franjas y no
  el texto «exclusivamente nocturno».
- Verificar que Tutoría no renderiza tabla de horarios.
- Verificar el `mailto:` con el correo y el asunto codificado, y la indicación de año y
  carrera.
- Verificar que «Tutorías» no está en las opciones del formulario.
- Verificar la FAQ de tutorías con la respuesta oficial.
- Actualizar los tests que hoy esperan el texto viejo
  (`src/__tests__/tutorias-page.test.tsx`, `contacto-page.test.tsx`,
  `formulario-consulta.test.tsx`, `header.test.tsx`).

## Impacto técnico

- `src/constants/navegacion.ts` (`UBICACION_HEADER`).
- `src/components/layout/Footer.tsx` (`DATOS_INSTITUCIONALES.horario`).
- `src/pages/ContactoPage.tsx` (horario).
- `src/pages/TutoriasPage.tsx` (tabla fuera, correo y texto de contacto).
- `src/components/ui/FormularioConsulta.tsx` (lista `ASUNTOS`).
- `src/constants/mock-data.ts` (FAQ de tutorías).

## Fuera de alcance

- Texto literal e imagen de presentación (⏳ material del instituto).
- Material de apoyo y mini carrusel de eventos (⏳).
- Circuito del formulario de contacto y correo institucional (0000099 / devolución §11).
- Reordenamiento de Alumnos y Carreras (HU-05 y HU-06).

## Referencias

IFTS N.º 12. (2026). *Devolución de Edith — pendientes del sitio TEST*.
`docs/01_global/devolucion_edith_2026_11_13.md`.

Equipo de UX/UI y Frontend. (2026). *Mapa del Sitio V3*.
`docs/01_global/mapa_sitio_ifts12_v3.md`.

Carata, E. (2026). *Tickets 0000089 y 0000090 — Horarios de atención y Tutoría*. Mantis.
`documentacion/driveFrontend/matis_frontend/`.
