# HU-05: Plan de Pruebas — Secciones Ingresantes y Alumnos

Fecha: 2026-11-16 · Estado: borrador

## Resumen

Traduce CA-05-01…CA-05-11 a escenarios Gherkin y casos TDD. La estructura se puede probar
hoy con mocks; los textos literales de las respuestas y los enlaces oficiales se prueban
como pendientes (mensaje de proceso) hasta que el instituto los entregue.

## 1. Escenarios por criterio de aceptación

### Escenario 1: Ingresantes sin listado de carreras (Caso Negativo)

- **Dado** que entro a `/ingresantes`.
- **Cuando** se renderiza la página.
- **Entonces** no hay listado de carreras.

### Escenario 2: Ingresantes sin bloques de otra sección (Caso Negativo)

- **Dado** que entro a Ingresantes.
- **Cuando** recorro la página.
- **Entonces** no veo Modalidad, Horarios, Equivalencias ni Pases.

### Escenario 3: Sin fechas clave (Caso de Borde)

- **Dado** que el instituto no confirmó fechas de inscripción.
- **Cuando** se renderiza Ingresantes.
- **Entonces** la tabla de Fechas clave no aparece.

### Escenario 4: Inscripción y requisitos conservados (Caso de Éxito)

- **Dado** que entro a Ingresantes.
- **Cuando** leo la sección principal.
- **Entonces** veo cómo inscribirme, qué requisitos necesito y dónde hago la preinscripción.
- **Y** veo la información de título y validez oficial.

### Escenario 5: Enlaces de preinscripción pendientes (Caso de Borde)

- **Dado** que todavía no existen los enlaces oficiales.
- **Cuando** se renderiza la sección.
- **Entonces** el enlace y el instructivo se muestran como pendientes, sin URL inventada.

### Escenario 6: Alumnos con calendario primero (Caso de Éxito)

- **Dado** que entro a `/estudiantes`.
- **Cuando** se renderiza la página.
- **Entonces** el calendario académico aparece antes que las preguntas frecuentes.

### Escenario 7: Preguntas desplegables (Caso de Éxito)

- **Dado** que estoy en Alumnos.
- **Cuando** recorro la sección.
- **Entonces** encuentro un listado desplegable de preguntas y no tarjetas de trámites.

### Escenario 8: Las 10 preguntas de Edith (Caso de Contenido)

- **Dado** que abro el listado de Alumnos.
- **Cuando** leo las preguntas.
- **Entonces** están inscripción a materias, correlativas, inscripción a finales, constancia
  de examen, constancia de alumno regular, pase a otro IFTS, contacto con Bedelía,
  regularidad, horarios y modalidad, y contacto con docentes.

### Escenario 9: Mesas dentro del calendario (Caso de Estructura)

- **Dado** que las mesas de examen no tienen apartado propio.
- **Cuando** miro Alumnos.
- **Entonces** las mesas aparecen dentro del calendario con las fechas destacadas.
- **Y** no existe una sección separada de mesas.

### Escenario 10: Respuesta pendiente (Caso de Borde)

- **Dado** que una pregunta no tiene respuesta oficial.
- **Cuando** la abro.
- **Entonces** veo el mensaje de proceso y no una respuesta inventada.

## 2. Casos de Prueba TDD (checklist para desarrolladores)

- [ ] `test_ingresantes_no_lista_carreras()`
- [ ] `test_ingresantes_no_muestra_modalidad_horarios_equivalencias_ni_pases()`
- [ ] `test_ingresantes_no_muestra_tabla_de_fechas_clave()`
- [ ] `test_ingresantes_conserva_requisitos_e_inscripcion()`
- [ ] `test_ingresantes_muestra_enlaces_pendientes_sin_url()`
- [ ] `test_alumnos_muestra_el_calendario_antes_de_las_preguntas()`
- [ ] `test_alumnos_reemplaza_tarjetas_por_preguntas_desplegables()`
- [ ] `test_alumnos_incluye_las_10_preguntas_de_edith()`
- [ ] `test_alumnos_integra_las_mesas_en_el_calendario()`
- [ ] `test_respuesta_sin_validar_muestra_mensaje_de_proceso()`

## 3. Regresiones a actualizar (no borrar)

- `src/__tests__/ingresantes-page.test.tsx`: espera el listado de carreras y los bloques que
  se retiran.
- `src/__tests__/estudiantes-page.test.tsx`: espera las 8 tarjetas y la sección de mesas.

## Referencias

Equipo de Frontend. (2026). Propuesta tecnológica — Frontend e Infraestructura.
`documentacion/frontend/propuesta-tecnologica.md` (sección Testing).

IFTS N.º 12. (2026). Devolución de Edith — pendientes del sitio TEST.
`docs/01_global/devolucion_edith_2026_11_13.md`.
