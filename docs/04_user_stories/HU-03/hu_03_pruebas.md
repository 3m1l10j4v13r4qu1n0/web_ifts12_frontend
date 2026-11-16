# HU-03: Plan de Pruebas — Navegación principal según el Mapa del Sitio V3

Fecha: 2026-11-16 · Estado: borrador

## Resumen

Traduce los criterios de CA-03-01…CA-03-08 a escenarios Gherkin y a casos TDD para el
frontend (Vitest + React Testing Library). Cubre escritorio, celular, rutas existentes y los
accesos de reemplazo de los bloques ⏳. No requiere backend: la navegación es estática.

## 1. Escenarios por criterio de aceptación

### Escenario 1: Las 7 pestañas del Mapa V3 (Caso de Éxito)

- **Dado** que ingreso al sitio en escritorio.
- **Cuando** se renderiza el encabezado.
- **Entonces** el menú muestra Inicio, Instituto, Carreras, Ingresantes, Alumnos, Tutoría y
  FAQ, en ese orden.
- **Y** no muestra 9 ítems ni las etiquetas Institucional, Estudiantes o Tutorías.

### Escenario 2: FAQ como pestaña principal (Caso de Éxito)

- **Dado** que estoy en cualquier página.
- **Cuando** selecciono la pestaña FAQ.
- **Entonces** navego a `/faq` y la pestaña queda activa.

### Escenario 3: Las rutas no migran (Caso de Compatibilidad)

- **Dado** un enlace guardado a `/institucional`, `/estudiantes` o `/tutorias`.
- **Cuando** lo abro.
- **Entonces** la página responde y su título visible dice Instituto, Alumnos y Tutoría
  respectivamente.

### Escenario 4: Bloques ⏳ fuera del menú (Caso de Borde)

- **Dado** que Docentes, Novedades y Contacto no son pestañas.
- **Cuando** reviso el menú principal.
- **Entonces** no aparecen.
- **Y** Novedades y Contacto siguen accesibles desde el pie, y `/docentes` sigue existiendo
  (sin enlace desde el menú hasta que responda 0000099).

### Escenario 5: Menú en celular (Caso Responsive)

- **Dado** un ancho de 390 px.
- **Cuando** abro el menú hamburguesa.
- **Entonces** veo las mismas 7 pestañas.
- **Y** el menú se abre y se cierra con teclado, sin desborde horizontal.

### Escenario 6: Nombres nuevos en el pie (Caso de Consistencia)

- **Dado** que el pie repite el mapa.
- **Cuando** lo leo.
- **Entonces** dice Instituto, Alumnos y Tutoría.
- **Y** Becas, Boleto y Mesas no figuran como secciones propias.

### Escenario 7: Sin anotaciones de diseño (Caso de Guard)

- **Dado** que los exports tienen anotaciones de UX/UI.
- **Cuando** se renderiza el header o el pie.
- **Entonces** ninguna anotación aparece en pantalla.

## 2. Casos de Prueba TDD (checklist para desarrolladores)

- [ ] `test_menu_principal_tiene_las_7_pestanas_del_mapa_v3()`
- [ ] `test_faq_es_pestana_principal_y_navega_a_faq()`
- [ ] `test_docentes_novedades_y_contacto_no_estan_en_el_menu()`
- [ ] `test_rutas_institucional_estudiantes_y_tutorias_siguen_respondiendo()`
- [ ] `test_titulos_visibles_usan_instituto_alumnos_y_tutoria()`
- [ ] `test_pie_usa_los_nombres_nuevos()`
- [ ] `test_menu_movil_muestra_las_mismas_7_pestanas()`
- [ ] `test_menu_movil_se_abre_y_cierra_con_teclado()`

## 3. Regresiones a actualizar (no borrar)

- `src/__tests__/header.test.tsx`: hoy espera el listado anterior del menú.
- Cualquier test o snapshot que cuente 9 ítems del menú.

## Referencias

Equipo de Frontend. (2026). Propuesta tecnológica — Frontend e Infraestructura.
`documentacion/frontend/propuesta-tecnologica.md` (sección Testing).

Equipo de UX/UI y Frontend. (2026). Mapa del Sitio V3.
`docs/01_global/mapa_sitio_ifts12_v3.md`.
