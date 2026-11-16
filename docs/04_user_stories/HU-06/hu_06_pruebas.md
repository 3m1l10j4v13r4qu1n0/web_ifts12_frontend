# HU-06: Plan de Pruebas — Ficha de carrera sin Programas y con turnos y resoluciones

Fecha: 2026-11-16 · Estado: borrador

## Resumen

Traduce CA-06-01…CA-06-08 a escenarios Gherkin y casos TDD. La estructura y los textos se
prueban con los datos de la carrera; la descarga de la resolución y el turno real dependen
de lo que exponga el backend, por lo que se prueban también los estados sin dato.

## 1. Escenarios por criterio de aceptación

### Escenario 1: Sin apartado Programas (Caso Negativo)

- **Dado** que entro a la ficha de cualquier carrera.
- **Cuando** recorro la página.
- **Entonces** no existe el apartado «Programas».
- **Y** el índice lateral no tiene el enlace «Programas».
- **Y** el plan de estudios sigue visible.

### Escenario 2: Turno por carrera (Caso de Éxito)

- **Dado** que la carrera tiene turno cargado.
- **Cuando** se renderiza la ficha.
- **Entonces** muestra el turno y el horario de esa carrera.

### Escenario 3: Sin literal nocturno (Caso Negativo)

- **Dado** que la ficha usa datos de la carrera.
- **Cuando** se renderiza.
- **Entonces** no aparece «Exclusivamente nocturno».
- **Y** el turno no está hardcodeado en el componente.

### Escenario 4: Turnos confirmados (Caso de Datos)

- **Dado** que el instituto confirmó los turnos.
- **Cuando** abro cada ficha.
- **Entonces** Administración Pública, Políticas Culturales, Análisis de Sistemas y Ciencia
  de Datos e IA muestran 18:30 a 22:30, y Gestión Parlamentaria muestra 9:00 a 13:00.

### Escenario 5: Modalidad sin confirmar (Caso de Borde)

- **Dado** que Gestión Parlamentaria no tiene modalidad confirmada.
- **Cuando** abro su ficha.
- **Entonces** se muestra el mensaje de proceso y no una modalidad inventada.

### Escenario 6: Resolución con PDF validado (Caso de Éxito)

- **Dado** que la carrera tiene número de resolución y PDF validado.
- **Cuando** abro Resoluciones.
- **Entonces** veo el número y un enlace que abre o descarga el archivo.

### Escenario 7: Resolución sin validar (Caso de Borde)

- **Dado** que la resolución no está validada.
- **Cuando** abro Resoluciones.
- **Entonces** no hay enlace a un PDF inexistente y se mantiene el mensaje de proceso.

### Escenario 8: Texto definitivo de materias (Caso de Contenido)

- **Dado** que la ficha muestra Materias y correlatividades.
- **Cuando** leo la bajada.
- **Entonces** usa el texto definitivo de Edith y no la leyenda provisoria.

### Escenario 9: Sin anotaciones de diseño (Caso de Guard)

- **Dado** que el export de la ficha tiene anotaciones (`TC-006`, `PENDIENTE
  INSTITUCIONAL`).
- **Cuando** se renderiza.
- **Entonces** ninguna anotación aparece en pantalla.

## 2. Casos de Prueba TDD (checklist para desarrolladores)

- [ ] `test_ficha_no_renderiza_apartado_programas()`
- [ ] `test_indice_lateral_no_tiene_enlace_programas()`
- [ ] `test_ficha_no_muestra_el_literal_exclusivamente_nocturno()`
- [ ] `test_ficha_muestra_el_turno_de_la_carrera()`
- [ ] `test_turnos_confirmados_por_carrera()`
- [ ] `test_modalidad_pendiente_muestra_mensaje_de_proceso()`
- [ ] `test_resolucion_muestra_numero_y_descarga_con_pdf()`
- [ ] `test_resolucion_sin_validar_no_enlaza_un_pdf()`
- [ ] `test_materias_usa_el_texto_definitivo_de_edith()`

## 3. Regresiones a actualizar (no borrar)

- `src/__tests__/carrera-detalle.test.tsx:71`: hoy espera «Exclusivamente nocturno» en los
  datos oficiales.

## Referencias

Equipo de Frontend. (2026). Propuesta tecnológica — Frontend e Infraestructura.
`documentacion/frontend/propuesta-tecnologica.md` (sección Testing).

IFTS N.º 12. (2026). Devolución de Edith — pendientes del sitio TEST.
`docs/01_global/devolucion_edith_2026_11_13.md`.
