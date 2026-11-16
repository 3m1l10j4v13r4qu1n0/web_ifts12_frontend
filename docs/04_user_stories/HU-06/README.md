# HU-06: Historia de Usuario — Ficha de carrera sin Programas y con turnos y resoluciones

Fecha: 2026-11-16 · Estado: borrador

## Historia

**Como** futuro ingresante o alumno que consulta una carrera,
**quiero** ver en la ficha el turno y el horario que corresponden a esa carrera y poder
acceder a su resolución oficial,
**para** saber cuándo se cursa y respaldar la validez del título sin buscar programas que el
instituto no publica.

## Tarjeta

La ficha de carrera es única y unificada. Esta HU aplica tres cambios de la devolución:

1. **Programas:** se elimina el apartado y su enlace del índice lateral. El instituto no
   publica programas individuales; se conservan el plan de estudios y las resoluciones.
2. **Turno y horario por carrera:** se abandona la bajada fija «exclusivamente nocturno».
   El turno **vespertino (18:30 a 22:30)** corresponde a Administración Pública, Políticas
   Culturales, Análisis de Sistemas y Ciencia de Datos e IA; el **matutino (9:00 a 13:00)**,
   a Gestión Parlamentaria. La modalidad es **híbrida**; en Gestión Parlamentaria queda
   pendiente de confirmación.
3. **Resoluciones:** se mantiene el número de resolución y se agrega la **descarga del PDF**
   de la Resolución de aprobación cuando el instituto entregue el archivo. No se publica un
   documento sin validar.

- **Tickets:** Mantis 0000093 (eliminar Programas), 0000095 (turnos y horarios) y 0000096
  (enlaces de descarga de resoluciones).
- **Fuente:** Mapa del Sitio V3 §4 y §14; devolución de Edith §4.

## Reemplaza

- La ficha de la V2 con **Programas descargables** y turno **exclusivamente nocturno**
  (RF-04 y RF-16 reencuadrados en el V3 §11). El apartado Programas no vuelve.

## Criterios de Aceptación

- **CA-06-01.** Dado que entro a la ficha de cualquier carrera, cuando recorro la página,
  entonces **no existe el apartado «Programas»** ni su enlace en el índice lateral; el plan
  de estudios sigue disponible.
- **CA-06-02.** Dado que el turno depende de la carrera, cuando se renderiza la ficha,
  entonces el turno y el horario salen de los datos de esa carrera y **no** de un literal
  fijo «exclusivamente nocturno» (hoy `CarreraDetallePage.tsx` usa `TURNO` hardcodeado).
- **CA-06-03.** Dado que el instituto confirmó los turnos, cuando se carga cada carrera,
  entonces Administración Pública, Políticas Culturales, Análisis de Sistemas y Ciencia de
  Datos e IA muestran **vespertino 18:30 a 22:30**, y Gestión Parlamentaria muestra
  **matutino 9:00 a 13:00**.
- **CA-06-04.** Dado que la modalidad es híbrida, cuando la ficha muestra la modalidad,
  entonces usa el dato de la carrera; si el dato falta (Gestión Parlamentaria está sin
  confirmar), entonces muestra el mensaje de proceso y **no** publica una modalidad sin
  confirmar.
- **CA-06-05.** Dado que cada carrera tiene resolución, cuando la ficha muestra
  Resoluciones, entonces veo el número; si además existe el PDF validado, entonces hay un
  enlace que abre o descarga el archivo.
- **CA-06-06.** Dado que hay resoluciones sin validar (Administración Pública, Políticas
  Culturales, Ciencia de Datos e IA, y la 6336/23 de Análisis de Sistemas por verificar),
  cuando se renderiza la ficha, entonces **no se inventa ni se enlaza** un PDF: se mantiene
  el mensaje de proceso hasta la validación de 0000081.
- **CA-06-07.** Dado que hay una leyenda provisoria en Materias y correlatividades, cuando
  se renderiza la ficha, entonces se usa el texto definitivo de Edith: «A continuación
  encontrarás el listado de asignaturas de la carrera y el año/cuatrimestre al cual
  pertenecen. Para detalles sobre el régimen de correlatividades asociado, podés revisar
  atentamente el plan de estudios.»
- **CA-06-08.** Dado que los exports de diseño tienen anotaciones (refs `RF-xx`, `TC-006`,
  «PENDIENTE INSTITUCIONAL»), cuando se renderiza la ficha, entonces ninguna anotación
  aparece en pantalla (guard `anotaciones-no-renderizadas.test.ts`).

### Pendiente (no bloquea la ficha)

- ⏳ Carga en el backend de turno, horario y modalidad por carrera (0000080) y de los PDF de
  resolución (0000081).
- ⏳ Números de resolución de Administración Pública, Políticas Culturales y Ciencia de Datos
  e IA; verificación de la 6336/23 de Análisis de Sistemas.
- ⏳ Materias con año/cuatrimestre de las 4 carreras que faltan y año de las materias de
  Políticas Culturales.
- ⏳ Presentación de Administración Pública, Políticas Culturales y Gestión Parlamentaria.
- Fuera de esta HU (sin ticket propio, V3 §4): **cuerpo docente por carrera** y **descarga
  del plan de estudios desde el panel**.

## Specification by Example

- Futuro ingresante de Gestión Parlamentaria: ve turno matutino 9:00 a 13:00 y modalidad
  pendiente, sin que el sitio le diga «exclusivamente nocturno».
- Futuro ingresante de Análisis de Sistemas: ve turno vespertino, el plan de estudios y el
  número de resolución; el enlace de descarga aparece cuando el PDF esté validado.
- Alumno que busca programas de materias: ya no los encuentra (decisión institucional) y la
  página lo orienta al plan de estudios.
- Ficha con resolución sin validar: muestra el número si existe y un mensaje de proceso en
  lugar de un enlace roto.

## Acceptance TDD

- Verificar que la ficha no renderiza «Programas» ni su enlace del índice.
- Verificar que no aparece el literal «Exclusivamente nocturno» y que el turno proviene del
  dato de la carrera.
- Verificar los turnos por carrera (4 vespertinas y Gestión Parlamentaria matutina).
- Verificar el mensaje de proceso cuando falta la modalidad.
- Verificar el número de resolución y el enlace de descarga solo con PDF disponible.
- Verificar el texto definitivo de materias y correlatividades.
- Actualizar `src/__tests__/carrera-detalle.test.tsx:71`, que hoy espera «Exclusivamente
  nocturno».

## Impacto técnico

- `src/pages/CarreraDetallePage.tsx` (índice lateral, bloque Programas, `TURNO`, modalidad,
  resoluciones y texto de materias).
- `src/types/api/carreras.types.ts` si el turno/horario y la URL de la resolución no tienen
  campo en el contrato (verificar antes de agregar; no inventar campos).
- `src/constants/mock-data.ts` si la ficha usa datos simulados mientras el backend no los
  expone.
- `src/__tests__/carrera-detalle.test.tsx`.

## Fuera de alcance

- Cuerpo docente por carrera y presentaciones faltantes.
- Carga de PDF de planes y resoluciones en el panel (dependencia de backend).
- Listado de carreras y tarjetas de la Home (solo se ajusta el turno si muestra el viejo
  literal).

## Referencias

IFTS N.º 12. (2026). *Devolución de Edith — pendientes del sitio TEST*.
`docs/01_global/devolucion_edith_2026_11_13.md`.

Equipo de UX/UI y Frontend. (2026). *Mapa del Sitio V3*.
`docs/01_global/mapa_sitio_ifts12_v3.md`.

Carata, E. (2026). *Tickets 0000093, 0000095 y 0000096 — Fichas de carrera*. Mantis.
`documentacion/driveFrontend/matis_frontend/`.

Gramajo, M. (2026). *Tickets 0000080 y 0000081 — Modalidad y resoluciones oficiales*.
Mantis.
