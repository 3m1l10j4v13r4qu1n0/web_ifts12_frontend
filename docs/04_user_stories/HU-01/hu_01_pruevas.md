# HU-01: Plan de Pruebas — Home institucional pública

Fecha: 2026-09-18 · Estado: borrador

## Resumen

El plan de pruebas traduce los criterios de aceptación de la HU-01 a escenarios
verificables (Specification by Example) en formato Gherkin y a casos de prueba TDD para el
frontend (Vitest + React Testing Library, alineado con `fe-architect-scaffold`). Cubre el
caso de éxito, el caso negativo sin URL oficial y los casos de borde de secciones sin datos
o con error de API.

## 1. Escenarios por criterio de aceptación

### Escenario 1: Render completo de la Home (Caso de Éxito)

- **Dado** que ingreso a la URL principal del sitio.
- **Cuando** se renderiza la Home.
- **Entonces** se muestran portada, accesos destacados y rápidos, carreras, slider de
  noticias, comunidades y preguntas frecuentes.
- **Y** el menú principal muestra los 9 ítems del Mapa del Sitio V2 con el buscador global.

### Escenario 2: Acceso destacado a Moodle e inscripción (Caso de Éxito)

- **Dado** que existen URLs oficiales de Moodle e inscripción del GCBA.
- **Cuando** se renderiza la Home.
- **Entonces** los accesos destacados a Moodle y a la inscripción se muestran visibles y
  clicables (RF-03, RF-12, RF-28).

### Escenario 3: Sin URL oficial de un servicio externo (Caso Negativo)

- **Dado** que la URL oficial está vacía (placeholder en `enlaces.ts`).
- **Cuando** se renderiza la Home.
- **Entonces** el CTA externo correspondiente se oculta o se atenúa.
- **Y** el resto de las secciones de la Home sigue operativo (RN-10).

### Escenario 4: Orden de las noticias (Caso de Formato)

- **Dado** que se cargan noticias con fecha ISO.
- **Cuando** se muestran en el slider/listado.
- **Entonces** se ordenan de la más reciente a la más antigua y el último mes queda
  visible (RN-03).

### Escenario 5: Carreras con modalidad y horarios (Caso de Datos)

- **Dado** que el instituto tiene 6 carreras.
- **Cuando** se muestra el listado de carreras.
- **Entonces** cada tarjeta muestra nombre y modalidad, y horarios cuando existen.

### Escenario 6: Slider/noticias vacíos (Caso de Borde)

- **Dado** que no hay noticias disponibles para una sección.
- **Cuando** se renderiza la Home.
- **Entonces** la sección muestra su estado vacío (empty state) sin romper el resto de la
  página.

### Escenario 7: Error al consultar la API (Caso de Borde)

- **Dado** que una sección responde con un error HTTP.
- **Cuando** el interceptor global de Axios procesa la respuesta.
- **Entonces** la sección afectada muestra el estado de error con un mensaje amigable y el
  resto de la Home continúa funcionando (RN-13).

## 2. Casos de Prueba TDD (checklist para desarrolladores)

- [ ] `test_render_home_con_todas_las_secciones()`
- [ ] `test_acceso_destacado_a_moodle_visible_con_url()`
- [ ] `test_cta_externo_oculto_o_atenuado_sin_url()`
- [ ] `test_noticias_ordenadas_reciente_a_antigua()`
- [ ] `test_card_carrera_muestra_modalidad_y_horarios()`
- [ ] `test_estado_vacio_en_slider_sin_noticias()`
- [ ] `test_estado_error_seccion_con_error_de_api()`

## Referencias

Equipo de Frontend. (2026). Propuesta tecnológica — Frontend e Infraestructura. `documentacion/frontend/propuesta-tecnologica.md` (sección Testing).

IFTS N.º 12. (2026). Análisis funcional validado. `documentacion/frontend/analisis_funcional_validado.md`.