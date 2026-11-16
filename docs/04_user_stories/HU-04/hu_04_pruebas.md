# HU-04: Plan de Pruebas — Horarios de atención y sección Tutoría

Fecha: 2026-11-16 · Estado: borrador

## Resumen

Traduce CA-04-01…CA-04-08 a escenarios Gherkin y casos TDD. Los horarios y el correo son
datos estáticos confirmados por el instituto: no requieren backend. La presentación de
Tutoría queda pendiente del material literal y se prueba como mensaje de proceso.

## 1. Escenarios por criterio de aceptación

### Escenario 1: Horario en la barra superior (Caso de Éxito)

- **Dado** que cargo cualquier página.
- **Cuando** miro la barra superior.
- **Entonces** leo «Misiones 26, C1083 ABB, CABA» con «Lunes a viernes de 9:00 a 13:00 y de
  18:30 a 22:30».
- **Y** no aparece «Atención exclusivamente nocturna».

### Escenario 2: Horario en el pie (Caso de Éxito)

- **Dado** que llego al pie.
- **Cuando** leo los datos institucionales.
- **Entonces** aparecen las dos franjas.
- **Y** no aparece «Exclusivamente nocturno · Presencial, Híbrida y a distancia».

### Escenario 3: Horario en Contacto (Caso de Éxito)

- **Dado** que entro a `/contacto`.
- **Cuando** leo los datos del instituto.
- **Entonces** el horario son las dos franjas.

### Escenario 4: Tutoría sin tabla (Caso Negativo)

- **Dado** que entro a `/tutorias`.
- **Cuando** se renderiza la página.
- **Entonces** no hay tabla de días, horarios ni modalidades.

### Escenario 5: Canal único de tutorías (Caso de Éxito)

- **Dado** que quiero contactar al equipo de tutorías.
- **Cuando** leo el bloque de contacto.
- **Entonces** veo `clara.moroni@bue.edu.ar` y el asunto «Sitio Web - Tutorías - Tu Nombre y
  Apellido».
- **Y** el enlace es `mailto:` con el asunto precargado.
- **Y** se indica incluir año y carrera.

### Escenario 6: Formulario sin asunto Tutorías (Caso Negativo)

- **Dado** que abro el formulario general de contacto.
- **Cuando** despliego el selector de asunto.
- **Entonces** «Tutorías» no está entre las opciones.
- **Y** la página de Tutoría no menciona «elegir el asunto Tutorías».

### Escenario 7: FAQ de tutorías (Caso de Contenido)

- **Dado** que abro la pregunta «¿Cómo contacto al equipo de tutorías?».
- **Cuando** se despliega.
- **Entonces** la respuesta indica el correo y el asunto oficiales.

### Escenario 8: Presentación pendiente (Caso de Borde)

- **Dado** que el texto y la imagen de presentación todavía no fueron entregados.
- **Cuando** se renderiza Tutoría.
- **Entonces** se muestra un mensaje de proceso y no se inventa contenido.

### Escenario 9: Sin anotaciones de diseño (Caso de Guard)

- **Dado** que el export de Tutoría tiene anotaciones (`I10`, `I12`, `M1`).
- **Cuando** se renderiza la página.
- **Entonces** ninguna anotación aparece en pantalla.

## 2. Casos de Prueba TDD (checklist para desarrolladores)

- [ ] `test_header_muestra_las_dos_franjas_de_atencion()`
- [ ] `test_pie_muestra_las_dos_franjas_y_no_la_leyenda_nocturna()`
- [ ] `test_contacto_muestra_las_dos_franjas_de_atencion()`
- [ ] `test_tutoria_no_renderiza_tabla_de_horarios()`
- [ ] `test_tutoria_muestra_correo_y_asunto_oficiales()`
- [ ] `test_enlace_mailto_incluye_el_asunto_codificado()`
- [ ] `test_formulario_de_contacto_no_ofrece_el_asunto_tutorias()`
- [ ] `test_faq_de_tutorias_indica_correo_y_asunto()`
- [ ] `test_presentacion_de_tutoria_muestra_mensaje_de_proceso()`

## 3. Regresiones a actualizar (no borrar)

- `src/__tests__/tutorias-page.test.tsx:59`: espera «Atención exclusivamente nocturna» y la
  tabla de turnos.
- `src/__tests__/contacto-page.test.tsx`: horario del instituto.
- `src/__tests__/formulario-consulta.test.tsx`: opciones del selector de asunto.
- `src/__tests__/header.test.tsx`: barra superior.

## Referencias

Equipo de Frontend. (2026). Propuesta tecnológica — Frontend e Infraestructura.
`documentacion/frontend/propuesta-tecnologica.md` (sección Testing).

IFTS N.º 12. (2026). Devolución de Edith — pendientes del sitio TEST.
`docs/01_global/devolucion_edith_2026_11_13.md`.
