# HU-07: Plan de Pruebas — Identidad visual del sitio (capa decorativa v2)

Fecha: 2026-11-19 · Estado: borrador

## Resumen

Traduce CA-07-01…CA-07-12 a escenarios Gherkin, casos TDD y mediciones. Como la HU es
visual, se combina: tests de Vitest para lo que se puede afirmar en el DOM (aria-hidden,
«reducir movimiento», telón, texto sin cambios) y mediciones a cuatro anchos para lo que solo
se ve en el navegador (H1, 44 px, pie, columnas, contraste, desborde). Las mediciones repiten
el método de la auditoría del 18/11 para poder comparar.

Cada ficha de `hu_07_fichas.md` dice qué escenarios corre. Al cerrar la HU (fase D6) se corren
todos.

## 1. Escenarios por criterio de aceptación

### Escenario 1: El texto no cambia (CA-07-01 · Caso de Regresión)

- **Dado** que capturé el texto visible (`innerText` de `header`, `main` y `footer`) de las
  rutas de la sección 3 antes de empezar la fase.
- **Cuando** termino la ficha y vuelvo a capturar.
- **Entonces** los textos son idénticos.
- **Y** ningún test existente cambió sus expectativas de texto.

### Escenario 2: Tipografías por rol (CA-07-02 · Caso de Éxito)

- **Dado** que abro cualquier página.
- **Cuando** inspecciono el estilo computado.
- **Entonces** `h1`–`h4` tienen `font-family` que empieza por «Plus Jakarta Sans».
- **Y** el cuerpo empieza por «Source Sans 3».
- **Y** las etiquetas superiores (eyebrow) empiezan por «JetBrains Mono».

### Escenario 3: Las fuentes no cargan (CA-07-02 · Caso de Borde)

- **Dado** que la red bloquea la descarga de fuentes.
- **Cuando** abro el sitio.
- **Entonces** el texto se ve con la fuente de respaldo del sistema, sin texto invisible.

### Escenario 4: Contraste de texto (CA-07-03 · Caso Negativo)

- **Dado** que la paleta tiene celeste `#4aa3d4`, celeste claro `#8fd0f0`, verde `#22a650` y
  aguamarina `#1e8a7e`.
- **Cuando** reviso el texto normal sobre fondo blanco o hielo.
- **Entonces** ninguno de esos cuatro colores se usa como color de texto normal en fondo
  claro (dan 2,81, 1,69, 3,16 y 4,21:1).
- **Y** las etiquetas y enlaces de color usan la mezcla con marino del build (62 % color +
  marino) u otro tono que llegue a 4,5:1.

### Escenario 5: Indicador de foco (CA-07-03 · Caso de Borde)

- **Dado** que navego con Tab.
- **Cuando** el foco cae en un enlace o botón sobre fondo claro.
- **Entonces** el contorno de foco tiene al menos 3:1 contra el fondo (el celeste del build da
  2,81:1 sobre blanco y no alcanza).

### Escenario 6: Reducir movimiento (CA-07-04 · Caso de Éxito)

- **Dado** que activé «reducir movimiento».
- **Cuando** entro por Inicio y recorro la página.
- **Entonces** el telón no aparece.
- **Y** las líneas, esferas, brillos y el carrusel no se animan solos.
- **Y** todos los bloques con aparición al scroll están visibles sin desplazarme.

### Escenario 7: Decoración oculta (CA-07-05 · Caso de Accesibilidad)

- **Dado** que recorro una página con lector de pantalla y con Tab.
- **Cuando** paso por la portada y el pie.
- **Entonces** líneas, esferas, anillos, brillos y telón no se anuncian ni reciben foco.

### Escenario 8: Telón solo en Inicio (CA-07-06 · Caso de Éxito)

- **Dado** que entro al sitio por `/`.
- **Cuando** se carga la página.
- **Entonces** el telón aparece y desaparece en 2,5 s o menos.
- **Y** después el contenido responde a clics y teclado.

### Escenario 9: Enlace directo (CA-07-06 · Caso Negativo)

- **Dado** que entro por un enlace directo a una ficha de carrera (`/carreras/:id`).
- **Cuando** se carga la página.
- **Entonces** el telón no aparece.

### Escenario 10: Medidas del contrato (CA-07-07 · Caso de Medición)

- **Dado** que mido a 1440, 1024, 768 y 375 px.
- **Cuando** reviso cada ruta de la sección 3.
- **Entonces** el H1 mide ≤ 48 px en escritorio y ≤ 32 px a 375 px.
- **Y** ningún control visible mide menos de 44 × 44 px.
- **Y** ningún texto del pie mide menos de 12 px.
- **Y** los accesos rápidos de Inicio van en 2 columnas a 375 px.
- **Y** `scrollWidth − innerWidth` es 0.

### Escenario 11: Cortes de layout (CA-07-08 · Caso de Borde)

- **Dado** que achico la ventana de 1440 a 375 px.
- **Cuando** paso por 1024 y 768 px.
- **Entonces** los cambios de columnas y de menú ocurren en esos cortes.

### Escenario 12: Sin olas (CA-07-09 · Caso Negativo)

- **Dado** que reviso portadas, pie y tarjetas de carrera.
- **Cuando** busco decoración ondulada.
- **Entonces** no hay ondas: la decoración son líneas.

### Escenario 13: Sin dependencias (CA-07-10 · Caso de Proceso)

- **Dado** un PR de cualquier ficha.
- **Cuando** reviso `package.json`.
- **Entonces** no hay dependencias de ejecución nuevas.
- **Y** el PR informa el tamaño de JS y CSS del build antes y después.

### Escenario 14: Paridad con la referencia (CA-07-12 · Caso Visual)

- **Dado** las capturas de referencia del artefacto (ficha D0.2).
- **Cuando** capturo la misma ruta y el mismo ancho en el sitio.
- **Entonces** coinciden jerarquía, colores, tipografías y efectos, salvo los ajustes que
  piden los escenarios 4, 5, 10 y 11.

## 2. Casos de Prueba TDD (checklist para desarrolladores)

- [ ] `test_decorativos_tienen_aria_hidden_y_no_son_enfocables()`
- [ ] `test_lineas_no_se_animan_con_reducir_movimiento()`
- [ ] `test_hook_aparicion_marca_todo_visible_con_reducir_movimiento()`
- [ ] `test_hook_aparicion_marca_visible_al_entrar_en_pantalla()`
- [ ] `test_telon_se_monta_solo_en_inicio()`
- [ ] `test_telon_no_se_monta_con_reducir_movimiento()`
- [ ] `test_telon_se_desmonta_en_2500_ms_o_menos()` (con timers falsos)
- [ ] `test_color_por_carrera_devuelve_color_por_defecto_si_el_slug_no_existe()`
- [ ] `test_textos_de_paginas_sin_cambios()` (los tests de página existentes, sin tocar)
- [ ] `test_anotaciones_no_renderizadas()` (guard existente)

## 3. Rutas y anchos de medición

Rutas: `/`, `/institucional`, `/carreras`, la ficha de Análisis de Sistemas, la ficha de
Gestión Parlamentaria, `/ingresantes`, `/estudiantes`, `/tutorias`, `/docentes`,
`/noticias`, `/faq`, `/contacto`, `/buscar?q=carreras` y una ruta inexistente (404). Anchos:
1440, 1024, 768 y 375 px.

> Las rutas son las del repo (V3 §15: `/institucional`, `/estudiantes` y `/tutorias` no
> migran). Los slugs de las fichas se toman de `src/constants/cursadaCarreras.ts`.

## 4. Regresiones a vigilar (no borrar)

- `src/__tests__/anotaciones-no-renderizadas.test.ts` (guard).
- Tests de `Header`, `MobileMenu` y `BuscadorGlobal` (foco, Esc, bloqueo de scroll, Ctrl+K):
  la piel nueva no puede romper el teclado.
- `src/__tests__/navegacion-v3.test.tsx` y `horarios-atencion.test.tsx` (HU-03 y HU-04).

## Referencias

IFTS N.º 12. (2026, 18 de noviembre). *Auditoría del artefacto web del sitio IFTS N.º 12
contra la documentación del proyecto (v1)*, §2 (método) y §7 (mediciones).
`docs/06_audits/audit_2026-11-18-artefacto-web.md`.

Equipo de Frontend. (2026). Propuesta tecnológica — Frontend e Infraestructura.
`documentacion/frontend/propuesta-tecnologica.md` (sección Testing).
