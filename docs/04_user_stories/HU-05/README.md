# HU-05: Historia de Usuario — Secciones Ingresantes y Alumnos

Fecha: 2026-11-16 · Estado: borrador

## Historia

**Como** futuro ingresante o alumno del IFTS N.º 12,
**quiero** que Ingresantes explique solo cómo inscribirme y que Alumnos me muestre primero
el calendario académico y después las respuestas a mis dudas,
**para** encontrar la información de mi etapa sin listados de carreras ni bloques que
corresponden a otra sección.

## Tarjeta

Dos tickets con el mismo criterio: **cada sección muestra solo lo que le corresponde**.

- **Ingresantes** pierde el listado de carreras (confunde la navegación) y los bloques
  Modalidad, Horarios, Equivalencias y Pases (pasan a Alumnos). Mantiene la inscripción y
  los requisitos ya validados, y retira la tabla de Fechas clave porque el instituto no
  confirmó fechas para publicar.
- **Alumnos** invierte el orden: primero el **calendario académico** —con las mesas de
  examen integradas y los eventos clave destacados— y después las **preguntas frecuentes
  desplegables**, que reemplazan las tarjetas de trámites.

- **Tickets:** Mantis 0000091 (`[FRONT][INGRESANTES] Reorganizar sección`) y 0000092
  (`[FRONT][ALUMNOS] Reorganizar sección y preguntas frecuentes`).
- **Fuente:** Mapa del Sitio V3 §5, §6 y §14; devolución de Edith §5 y §6.

## Reemplaza

- La estructura de Ingresantes de la V2 (listado de carreras, fechas clave, modalidad,
  horarios, equivalencias y pases) y la de Alumnos («Estudiantes» con 8 tarjetas y un
  apartado propio de mesas de examen). Los RF-01, RF-02, RF-05 y RF-09 quedan
  reencuadrados como indica el V3 §11.

## Criterios de Aceptación

### Ingresantes

- **CA-05-01.** Dado que entro a Ingresantes, cuando se renderiza la página, entonces
  **no** hay listado de carreras.
- **CA-05-02.** Dado que la sección se reorganiza, cuando la leo, entonces **no** aparecen
  los bloques Modalidad, Horarios, Equivalencias ni Pases.
- **CA-05-03.** Dado que no hay fechas de inscripción confirmadas, cuando se renderiza la
  página, entonces **no** se muestra la tabla de Fechas clave.
- **CA-05-04.** Dado que la inscripción ya está validada, cuando entro a Ingresantes,
  entonces veo cómo inscribirme, qué requisitos necesito (título secundario o certificado en
  trámite; convalidación si es del extranjero; DNI o pasaporte) y dónde hago la
  preinscripción, más la información de título y validez oficial.
- **CA-05-05.** Dado que el instituto todavía no entregó los enlaces, cuando se renderiza la
  preinscripción, entonces el enlace y el instructivo se muestran como pendientes (sin URL
  inventada) y el resto de la sección queda operativo.
- **CA-05-06.** Dado que existan los enlaces oficiales de preinscripción e instructivo,
  cuando se carguen, entonces la sección los expone y el botón «Inscripción GCBA» de la
  barra superior y del pie usa la misma URL (RN-02, RN-08).

### Alumnos

- **CA-05-07.** Dado que entro a Alumnos, cuando se renderiza la página, entonces el
  **calendario académico** aparece primero y las preguntas frecuentes después.
- **CA-05-08.** Dado que las tarjetas de trámites se reemplazan, cuando recorro la sección,
  entonces encuentro un **listado desplegable de preguntas** (no tarjetas con viñetas).
- **CA-05-09.** Dado que se incorporan las respuestas validadas, cuando abro las preguntas,
  entonces están las de **inscripción a materias, correlativas, inscripción a finales,
  constancia de examen (hasta 7 días hábiles), constancia de alumno regular, pase a otro
  IFTS, contacto con Bedelía, regularidad (75 % de asistencia, ya validada), horarios y
  modalidad de cursada, y contacto con docentes** por mensajería y foros del campus.
- **CA-05-10.** Dado que las mesas de examen no tienen apartado propio, cuando miro el
  calendario, entonces las mesas aparecen **dentro del calendario** con sus fechas
  destacadas en negrita, y no existe una sección de mesas separada.
- **CA-05-11.** Dado que faltan datos institucionales, cuando abro una pregunta sin
  respuesta oficial, entonces se muestra el mensaje de proceso (no se inventa la respuesta).

### Pendiente (no bloquea la estructura)

- ⏳ Enlaces de preinscripción e instructivo (0000091; devolución §14.1).
- ⏳ Respuestas literales de Edith para Alumnos y datos asociados: rutas en SIU-Guaraní,
  archivo de constancia de examen, formulario y correo de pase, correos de Bedelía de las 5
  carreras.
- ⏳ Formato del calendario: tabla con fechas destacadas, PDF descargable o ambos.
- ⏳ Decisiones: ¿quedan Becas, Boleto estudiantil y Trámite de títulos? ¿Equivalencias usa
  `equivalencias.ifts12@gmail.com`?
- ⏳ Ubicación de «Título y validez oficial» (propuesta: FAQ › Ingresantes).

## Specification by Example

- Futuro ingresante: entra a Ingresantes, lee los requisitos y cómo inscribirse, y no ve el
  listado de carreras que ya está en Carreras.
- Alumno: entra a Alumnos, ve primero el calendario con las mesas destacadas y luego abre la
  pregunta de constancia de examen.
- Alumno que busca equivalencias: hoy no está en Ingresantes; la decisión de dónde vive la
  respuesta queda pendiente.
- Visitante sin fechas de inscripción confirmadas: no ve una tabla de fechas vacía o
  inventada.

## Acceptance TDD

- Verificar que Ingresantes no renderiza carreras, ni Modalidad/Horarios/Equivalencias/Pases,
  ni la tabla de Fechas clave.
- Verificar que Ingresantes conserva requisitos, inscripción y título/validez.
- Verificar que Alumnos renderiza el calendario antes que las preguntas.
- Verificar que las tarjetas de trámites ya no existen y que el listado es desplegable.
- Verificar que las 10 preguntas de Edith están presentes y que las sin respuesta muestran
  el mensaje de proceso.
- Verificar que la sección de mesas separada ya no existe y que las mesas se leen dentro del
  calendario.
- Actualizar `ingresantes-page.test.tsx` y `estudiantes-page.test.tsx`, que hoy esperan la
  estructura anterior.

## Impacto técnico

- `src/pages/IngresantesPage.tsx` (quitar bloques y tabla; conservar requisitos).
- `src/pages/EstudiantesPage.tsx` (reordenar; accordion; mesas dentro del calendario).
- `src/constants/mock-data.ts` (preguntas frecuentes de alumnos y su contenido pendiente).
- `src/__tests__/ingresantes-page.test.tsx` y `src/__tests__/estudiantes-page.test.tsx`.

## Fuera de alcance

- Carga real del calendario y de las respuestas (depende del instituto y del panel).
- Cambios de backend o de endpoints: no hay endpoints nuevos en esta HU.
- Sección Carreras y ficha de carrera (HU-06).

## Referencias

IFTS N.º 12. (2026). *Devolución de Edith — pendientes del sitio TEST*.
`docs/01_global/devolucion_edith_2026_11_13.md`.

Equipo de UX/UI y Frontend. (2026). *Mapa del Sitio V3*.
`docs/01_global/mapa_sitio_ifts12_v3.md`.

Carata, E. (2026). *Tickets 0000091 y 0000092 — Ingresantes y Alumnos*. Mantis.
`documentacion/driveFrontend/matis_frontend/`.
