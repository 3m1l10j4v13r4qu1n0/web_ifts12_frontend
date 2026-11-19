# Referencia visual v2 — capa decorativa del artefacto

Material de **consulta** para la HU-07 (identidad visual). No es código del proyecto: no se
importa, no se compila y no se copia entero. Cada ficha de
`docs/04_user_stories/HU-07/hu_07_fichas.md` indica qué archivo y qué líneas mirar.

## Origen

- Artefacto «IFTS N.º 12 · Vista previa v2», `https://claude.ai/artifact/DtCfnn3GdmtYkCLbix8mPb`
  (slug `6853c98e-88da-4e4f-b103-b60df623dc76`, versión `1795021175-002d`, 18/11/2026).
- Archivo fuente: `assets/index-v2.css` (97 873 bytes, SHA-256
  `073a29d1c79f80515d07cdde4f1eb5eda43564d9b354cf1807958fdab0de98ca`).
- Se extrajo el bloque `@layer components` (la capa decorativa escrita a mano), se formateó
  con Prettier y se dividió por tema. Cada bloque lleva un comentario con las líneas
  originales. No se cambió ninguna regla.
- El bundle JS (`assets/index-v2.js`) no se incluye: las fichas citan los fragmentos de
  comportamiento que hagan falta.

## Archivos

| Archivo | Qué contiene | Fase |
|---|---|---|
| `css/00a_theme_actual_del_repo_compilado.css` | `@theme` del repo tal como quedó compilado en el build (acento, `seccion-*`, `texto`, `fondo`…). Sirve para el mapeo de D1. | D1 |
| `css/00_base_y_tipografia.css` | Variables `:root` de la paleta, reset, `.wrap`, títulos, `.eyebrow`, `.h2`, `.lead`, `.sec`, keyframes `float` y `fadeup`. | D1, D2 |
| `css/01_barra_de_progreso.css` | Barra de progreso de lectura. | D3 |
| `css/02_header_menu_buscador.css` | Barra superior, header de vidrio, marca, pestañas, menú desplegable, menú móvil y buscador flotante. | D3 |
| `css/03_primitivas.css` | Botón con barrido, enlace subrayado, chip, badge «a confirmar», aparición al scroll, título por partes, esferas base, anillo punteado y ajustes de contraste. | D2 |
| `css/04_inicio.css` | Portada, carrusel, tarjetas, tarjetas de carrera 3D, novedades, accesos rápidos y franja del campus. | D4 |
| `css/05_paginas_internas.css` | Encabezado de página, migas, menú secundario, bloques con lateral, notas, prosa, personas. | D5 |
| `css/06_faq.css` | Acordeón, grupos, pestañas y buscador de la FAQ. | D5 |
| `css/07_ficha_carrera_y_calendario.css` | Calendario, portada de ficha, datos, índice, plan por años, materias, descargas, docentes. | D5 |
| `css/08_tutoria_y_docentes.css` | Bloque de Tutoría con correo y botón copiar, recursos, detalle de tarjetas. | D5 |
| `css/09_pie_y_mapa.css` | Pie, columnas, líneas de colectivo, subte, logos y mapa SVG del barrio. | D3 |
| `css/10_estados_formularios_tablas.css` | Toast, volver arriba, vacíos, tablas, formularios, paginación, tarjetas de novedad, alertas. | D3, D5 |
| `css/11_ajustes_responsive_y_movimiento.css` | Regla de «reducir movimiento» y ajustes de la portada en celular. | D1, D4 |
| `css/12_lineas_y_esferas.css` | Líneas animadas (reemplazo de las olas), esferas con texto, desvanecido de portadas. | D2 |
| `css/13_telon_y_caricia.css` | Telón de entrada y trazo de transición. | D4 |
| `css/90_correcciones_auditoria_v2.css` | Correcciones de la auditoría del 18/11 (H1 48 px, 44 px, pie 12 px, 2 columnas, Apto Médico). **Mandan sobre los archivos anteriores.** | todas |
| `css/98_obsoleto_no_portar.css` | Reglas que el build ya no usa: transición «wipe», pantalla de carga, olas, carrusel de eventos y campos con etiqueta flotante. **No se portan.** | — |
| `css/99_ya_en_el_repo.css` | Utilidades que ya existen en `src/styles/index.css` (`revelar`, `tarjeta-elevable`, `ola-capa`, `entrada-suave`, `zoom-lento`, `resplandor-flotante`). Reutilizar o reemplazar, no duplicar. | D2 |

## Capturas

Las capturas **no se versionan**: viven en
`documentacion/driveFrontend/referencia_visual_v2/capturas/` (carpeta ignorada por git) y
deben pedirse al equipo de diseño si no están en el Drive. Estructura:
`<ancho>/<NN_ruta>.jpg` — 14 rutas a 1440, 1024, 768 y 375 px, página completa.

- Se tomaron el 19/11/2026 con Chrome headless (Playwright), sirviendo los archivos del
  artefacto en local. El router es de hash (`index.html#/ruta`).
- Con **«reducir movimiento»** activado, para que el telón no tape la página y todos los
  bloques con aparición al scroll estén visibles. Por eso las líneas y las esferas salen
  quietas.
- Las fuentes se sirvieron desde los paquetes `@fontsource` (mismas familias y pesos que el
  `<link>` de Google Fonts del artefacto).
- `capturas/movimiento/` (también en el Drive): Inicio a 1440 px **sin** «reducir
  movimiento», a los 1,2 s (telón saliendo) y a los 4,7 s (portada con líneas y esferas).
- `capturas/mediciones.tsv` (**sí versionado**, acá en `documentacion/referencia_visual_v2/`):
  familia y tamaño del H1 y desborde horizontal por ruta y ancho.
  En las 56 combinaciones el H1 es Plus Jakarta Sans de 32 a 48 px y no hay desborde.
- Las rutas son las del artefacto (`/alumnos`). En el repo, la equivalente es `/estudiantes`.

## Cómo leer estas reglas

1. **El orden importa.** En el build hay reglas que se pisan más abajo (por ejemplo, el
   tamaño de `.hero h1` del archivo 04 queda reemplazado por el del archivo 90, y el color de
   `.eyebrow` del 00 por el ajuste de contraste del 03). Ante dos valores, vale el del archivo
   de número mayor.
2. **Los breakpoints no se copian.** El build usa 1560, 1400, 1240, 1020, 900, 640, 560 y
   520 px. El proyecto usa 768 y 1024 (`figma_v2_contrato_visual.md`). Cada ficha dice a qué
   breakpoint se lleva cada cambio.
3. **Los nombres genéricos no se copian.** `.card`, `.btn`, `.chip`, `.nav`, `.q`, `.fs`,
   `.so`, `.cc` chocan con componentes del repo. La convención está en
   `.opencode/rules/capa-decorativa.md`.
4. **El texto no se copia.** Si una regla está atada a un contenido (por ejemplo, «Entidad
   conveniante» o el subte B), el contenido no se trae: manda el repo.
