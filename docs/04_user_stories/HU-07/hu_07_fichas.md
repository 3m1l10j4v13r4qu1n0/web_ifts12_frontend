# HU-07: Fichas de implementación — Capa decorativa v2

Fecha: 2026-11-19 · Estado: borrador (fase D0 completada; D1 detallada; D2 a D6 en índice)

## Resumen

Cada ficha es **una rama y un PR**. Dice qué hacer, con qué archivos, con qué referencia del
artefacto y cómo se verifica. Las reglas comunes (rama base, nombres, breakpoints,
accesibilidad, checklist del PR) están en `.opencode/rules/capa-decorativa.md` y no se repiten
acá. Los criterios de aceptación están en `README.md` y los escenarios en
`hu_07_pruebas.md`.

**Prompt para OpenCode (una línea por ficha):**

> Implementá la ficha `<ID>` de `docs/04_user_stories/HU-07/hu_07_fichas.md` respetando
> `.opencode/rules/capa-decorativa.md`. Antes de escribir código, mostrame el plan y los
> archivos que vas a tocar.

Las fichas de D2 en adelante se detallan al cerrar D1, con lo que se aprenda en las primeras.

## Tablero

| ID | Ficha | Fase | Depende de | Estado | Rama / PR |
|---|---|---|---|---|---|
| D0.1 | Decisiones de diseño y enmienda del contrato visual | D0 | — | hecha (19/11) | — |
| D0.2 | Referencia visual dentro del repo | D0 | — | hecha (19/11) | — |
| D0.3 | Mapa de clases del build a componentes del repo | D0 | D0.2 | hecha (19/11) | — |
| D0.4 | Línea base del sitio actual | D0 | — | hecha (19/11) | — |
| D1.1 | Paleta en el `@theme` | D1 | D0.1 | pendiente | — |
| D1.2 | Tipografías | D1 | D0.1 | pendiente | — |
| D1.3 | Forma y movimiento (radios, sombras, curvas, «reducir movimiento») | D1 | D1.1 | pendiente | — |
| D1.4 | Color por carrera y por página | D1 | D1.1 | pendiente | — |
| D1.5 | Estilos base (títulos, cuerpo, selección, foco) | D1 | D1.1, D1.2 | pendiente | — |
| D2.x | Piezas decorativas: etiqueta, enlace animado, chip y badge pendiente, botón, aparición al scroll, título revelado, líneas, esferas, anillo | D2 | D1 | a detallar | — |
| D3.x | Header, pestañas, menú desplegable, menú móvil, buscador, barra de progreso, volver arriba, pie y mapa | D3 | D2 | a detallar | — |
| D4.x | Inicio: portada, carrusel, accesos, tarjetas de carrera, novedades, franja del campus, telón | D4 | D3 | a detallar | — |
| D5.x | Páginas internas: encabezado, Instituto y Alumnos, ficha de carrera, FAQ, Tutoría y Docentes, Contacto, Novedades, tablas, estados, 404, búsqueda | D5 | D3 | a detallar | — |
| D6 | Cierre: mediciones, paridad visual, rendimiento, documentación y tag | D6 | D4, D5 | a detallar | — |

---

## Fase D0 · Decisiones y preparación

### D0.1 · Decisiones de diseño y enmienda del contrato visual

- **Objetivo:** dejar por escrito qué decide la HU-07, para que la auditoría no lo lea como
  desvío y para que las fichas siguientes no tengan que decidir sobre la marcha.
- **Tipo:** solo documentación (Capa 1). No hay código.
- **Archivos:** `docs/01_global/figma_v2_contrato_visual.md` (nueva sección al final) y esta
  ficha (completar la columna «Decisión»).
- **Quién decide:** el usuario. OpenCode redacta; no elige.

**Decisiones** (tomadas por el usuario el 19/11/2026; la recomendación era una propuesta, no
una decisión):

| # | Tema | Opciones | Recomendación | Decisión |
|---|---|---|---|---|
| 1 | Tipografías (ART-08) | Tres familias del artefacto / Source Sans 3 sola | Tres familias: es el diseño aprobado | **Tres familias** (confirma lo que ya dice el README): Plus Jakarta Sans en títulos, Source Sans 3 en texto y JetBrains Mono en etiquetas. |
| 2 | Paleta | Marino, azul y celestes del artefacto / acento único actual | Paleta del artefacto, con los límites de contraste de D1.1 | **Paleta del artefacto**, con los límites de contraste de CA-07-03 y los valores del Anexo B.1. |
| 3 | Color por carrera y por página | Sí (como el artefacto) / un solo color | Sí, con los valores del Anexo B | **Sí**, con los valores del Anexo B.3. |
| 4 | Telón: frecuencia | En cada visita a Inicio / una vez por sesión | Una vez por sesión: quien vuelve a Inicio no espera de nuevo | **Una vez por sesión** (decisión del usuario, 19/11/2026). Siempre solo en Inicio y ≤ 2,5 s (CA-07-06). |
| 5 | Ondas que quedan en el artefacto | El borde inferior del telón y la onda al pie de cada tarjeta de carrera son curvas | Cambiar ambas por líneas rectas o quitarlas (Edith pidió líneas) | **Quitar** (decisión del usuario, 19/11/2026): ni curva al pie del telón ni onda al pie de las tarjetas; se reemplazan por líneas rectas (CA-07-09). |
| 6 | Esferas de la portada | Son **enlaces** que rotan entre destacados (turno de una carrera, modalidad, Tutoría, última novedad) / esferas solo decorativas | Enlaces **sin rotación automática** (cada esfera fija a un destino), porque la rotación sin botón de pausa choca con WCAG 2.2.2 y suma enlaces nuevos (excepción a CA-07-01) | **Enlaces con prioridad sobre la decoración** (decisión del usuario, 19/11/2026): cada esfera apunta a un destino fijo, sin rotación automática. |
| 7 | Insignia UPCN flotante en la portada | Mantener / quitar | Mantener, sin texto agregado (el logo ya está en el pie) | **Quitar** (decisión condicionada del usuario, 19/11/2026): se cumple «si choca con CA-07-01», porque hoy UPCN solo está en el pie (`src/components/layout/Footer.tsx:77`) y la insignia en la Home sería contenido nuevo (ART-10). El logo del pie se mantiene. |
| 8 | Buscador | Ventana flotante con Ctrl+K (artefacto) / desplegable actual | Ventana flotante que reusa la lógica de `BuscadorGlobal` y el enlace a `/buscar` | **Reutilizar la lógica actual** (decisión del usuario, 19/11/2026): ventana flotante con Ctrl+K sobre `BuscadorGlobal`, no la del build. |
| 9 | Fuentes | Google Fonts (artefacto) / archivos propios en `public/fonts` | Archivos propios: no depende de un tercero, no expone datos de visitantes y anda aunque Google esté bloqueado | **Archivos propios en `public/fonts`** (decisión del usuario, 19/11/2026), sin dependencias npm de ejecución (CA-07-10). |
| 10 | Botón «Administración» en el pie del artefacto | — | No se trae: rige I12 (panel solo por URL), ART-16 | **Traerlo igual** (decisión del usuario, 19/11/2026): enmiende la decisión 22/10 (I12) de panel solo por URL. Se implementa en D3 (pie) y queda registrado como excepción a CA-07-01. |

**Decisiones registradas el 19/11/2026 por el usuario.** Las filas 1 a 3 confirman lo que el
README ya daba por decidido; las demás son decisiones nuevas. La fila 10 enmiende la decisión
22/10 (I12) y por eso ART-16 deja de estar abierto cuando se implemente el pie.

**Enmienda aplicada:** `docs/01_global/figma_v2_contrato_visual.md`, sección «Enmienda
2026-11-19 — Piel visual v2 (HU-07)», con las 10 decisiones de arriba. No se duplica acá el
texto del contrato (regla de fuente única).

- **Listo cuando:** la tabla tiene las 10 decisiones tomadas, la enmienda está en el contrato
  con fecha, y `logsayer check` y `logsayer memory index` corren en verde.
- **Fuera de alcance:** reescribir el resto del contrato o el Figma.

### D0.2 · Referencia visual dentro del repo

- **Objetivo:** que OpenCode tenga la referencia en el repo, sin depender del artefacto.
- **Tipo:** solo archivos de consulta. No hay código.
- **Archivos:** copiar a `documentacion/referencia_visual_v2/` el paquete que acompaña esta
  HU:
  - `README.md` (índice y cómo leer los CSS);
  - `css/` (18 archivos: el `@layer components` del build, dividido por tema);
  - `capturas/` (14 rutas a 1440, 1024, 768 y 375 px con «reducir movimiento», dos capturas
    de Inicio con movimiento y `mediciones.tsv`).
- **Decisión de versionado:** las capturas pesan unos 16 MB. Recomendación: versionar `css/` y
  el `README.md`, y dejar `capturas/` en el Drive (`documentacion/driveFrontend/`, que no se
  versiona) con la ruta anotada en el `README.md`.
- **Listo cuando:** el `README.md` de la referencia está en el repo y cada ficha puede citar
  `css/<archivo>` sin ambigüedad.

### D0.3 · Mapa de clases del build a componentes del repo

- **Objetivo:** saber, antes de tocar código, qué componente de `src/` recibe cada pieza del
  build, y qué ya existe.
- **Tipo:** solo documentación. No hay código.
- **Archivos:** completar el **Anexo A** de esta ficha.
- **Instrucciones:**
  1. Para cada fila del Anexo A, buscar en `src/` el componente que hoy renderiza esa parte
     de la pantalla (la columna «Componente probable» es una suposición).
  2. Corregir la columna, marcar si el componente existe y anotar la ficha D2 a D5 que lo
     toca.
  3. Revisar si `src/styles/index.css` ya tiene las utilidades de
     `css/99_ya_en_el_repo.css` (`revelar`, `tarjeta-elevable`, `ola-capa`…). `ola-capa`
     corresponde a las olas viejas: anotar si se usa en algún componente.
  4. Si aparece una clase del build sin nombre en la regla (§4), proponer el nombre.
- **Listo cuando:** el Anexo A no tiene celdas «?» y cada fila tiene ficha asignada.
- **Estado (19/11/2026):** completado. El Anexo A tiene las 31 filas con componente real
  (`ruta:línea` verificada), existencia real (`sí`/`parcial`/`no`) y ficha corregida. Se
  documentan utilidades de `99_ya_en_el_repo.css` y propuestas de nombres para clases fuera
  del Anexo A. No se tocó `src/`.

#### Utilidades ya en el repo (`documentacion/referencia_visual_v2/css/99_ya_en_el_repo.css`)

Fuente: `99_ya_en_el_repo.css:2-41` (`ola-capa`, `ola-capa-lenta`, `entrada-suave`,
`zoom-lento`, `resplandor-flotante`, `revelar`/`revelar-visible`, `tarjeta-elevable`).

| Utilidad | ¿Existe en `src/styles/index.css` u otro archivo de `src/`? | Evidencia |
|---|---|---|
| `ola-capa` | No | No aparece en `src/styles/index.css:1-105` ni en búsquedas en `src/`. |
| `ola-capa-lenta` | No | Ídem. |
| `entrada-suave` | No | Ídem. |
| `zoom-lento` | No | Ídem. |
| `resplandor-flotante` | No | Ídem. |
| `revelar` / `revelar-visible` | No | Ídem (sin coincidencias de `revelar`). |
| `tarjeta-elevable` | No | Ídem (sin coincidencias de `tarjeta-elevable`). |

- **`ola-capa` en componentes:** no se usa en ningún componente de `src/` (búsquedas de
  `ola-capa`, `ola-capa-lenta` y `wave` sin usos de esa utilidad). Coincidencias de `ola`/`svg`
  encontradas son no relacionadas (`src/utils/mensajeDeConsulta.ts:14`,
  `src/pages/IngresantesPage.tsx:17`, `src/styles/index.css:12`,
  `src/components/ui/ModalBaja.tsx:16`, `src/components/ui/ModuloNoDisponible.tsx:23`).
  Coherente con D0.1 (quitar ondas): ninguna utilidad del 99 está portada ni usada.

#### Propuestas de nombres para clases del build no mapeadas en el Anexo A

No se agregan filas al Anexo A (solo propuestas). Clases detectadas en
`documentacion/referencia_visual_v2/css/`:

| Clase del build (archivo) | ¿Equivalente hoy en `src/`? | Nombre en español propuesto | Ficha sugerida | Nota |
|---|---|---|---|---|
| `.skip` (`03_primitivas.css:254,265`) | No encontrado | `EnlaceSaltarContenido` | D3 | Accesibilidad; si no existe, no se agrega en D1.5 (cambio de estructura). |
| `.sr` (`10_estados_formularios_tablas.css:60`) | Parcial (patrón `sr-only` de Tailwind en varios archivos) | `SoloLectoresPantalla` (utilidad/clase global) | D1/D2 | Útil si se portan utilidades de accesibilidad del build. |
| `.it` (`02_header_menu_buscador.css:149,152,165,169`) | Parcial (ítems en `src/components/layout/NavMenu.tsx:18-32`) | `ItemMenuNavegacion` | D3 | Subpieza del menú; hoy cubierta por `NavMenu`. |
| `.tag` (`04_inicio.css:162,186`) | Parcial (metadatos de slide en `src/components/ui/CarruselInstitucional.tsx:206-210`) | `EtiquetaDestacado` | D4 | Etiqueta visual del hero/slide. |
| `.cat` (`04_inicio.css:609`, `06_faq.css:105`, `03_primitivas.css:281,285`) | Parcial (`Badge`/filtros/tabs existentes) | `EtiquetaCategoria` | D4/D5 | Ya resuelto con `Badge`, filtros y tabs. |
| `.ph` (`04_inicio.css:581,587,593,596,623`) | Parcial (imagen en `CardNoticia`/`CarruselInstitucional`) | `ContenedorImagenNovedad` | D4/D5 | Contenedor de media integrado en componentes. |
| `.dm` (`10_estados_formularios_tablas.css:131,136,142,147`, `07_ficha_carrera_y_calendario.css:431`) | Parcial (pares dato/valor en `<dl>` de `CarreraDetallePage.tsx:160-181`) | `ParDatoValor` | D5 | Patrón de metadatos responsive. |
| `.orbx` (`08_tutoria_y_docentes.css:83`, `05_paginas_internas.css:220,230`) | No encontrado | `BloqueIconoDecorativo` | D2/D5 | Adorno/ícono decorativo, no portado. |
| `.addr` / `.subj` (`08_tutoria_y_docentes.css:43,50,58`) | Parcial (contenido en `src/pages/TutoriasPage.tsx:63-79`) | `DatoContactoTutorias` / `AsuntoCorreoTutorias` | D5 | Subpiezas del bloque `.mailbox` (fila de Tutoría). |
| `.glare` (`04_inicio.css:463,476`) | No encontrado | `BrilloTarjeta` (efecto decorativo) | D2/D4 | Efecto visual de `.cc`, no portado. |

#### Hallazgos del relevamiento

- **Ruta corregida:** `.sbtn/.so/.sbox/.sres` → componente real `src/components/layout/BuscadorGlobal.tsx:10` (no `components/ui/...`).
- **`.mega` no implementado:** `NavMenu` (`src/components/layout/NavMenu.tsx:15-36`) es plano; no hay mega-menú.
- **`[data-r]`, `.split`:** sin equivalente de revelado en `src/` (no hay `data-r`, `revelar` ni `useAparicion`; `split` solo en `src/utils/fecha.ts:11`). Marcado como `no`.
- **Rutas:** la ruta real es `/estudiantes` (`src/routes/AppRouter.tsx:28`), aunque la etiqueta de menú sea «Alumnos».
- **Piezas inline/parciales:** `.campus`, `.cal`, `.tut/.mailbox/.copy`, `.subnav/.bloque/.bh`, `.cd-hero/.facts/.toc/.plan/.yr/.mat/.dl` existen como contenido/secciones repartidas, no como componentes dedicados con esas clases.
- **`.apto`:** sin sección/bloque “Apto Médico” en `src/pages/DocentesPage.tsx` ni en `src/`.

### D0.4 · Línea base del sitio actual

- **Objetivo:** tener el «antes» para verificar CA-07-01 (sin cambios de contenido) y
  CA-07-10 (peso del bundle).
- **Tipo:** medición. No hay código del sitio; puede haber un script en `scripts/`.
- **Instrucciones:**
  1. Desde la rama base, `npm run build` y anotar el peso de `dist/assets/*.js` y `*.css`.
  2. Con `npm run dev`, capturar el texto visible (`innerText` de `header`, `main` y
     `footer`) de las rutas de `hu_07_pruebas.md` §3 y guardarlo como
     `documentacion/referencia_visual_v2/linea_base/<ruta>.txt`.
  3. Capturar las mismas rutas a 1440 y 375 px (el «antes» visual).
  4. Si se escribe un script (Playwright o Firefox headless, como en la auditoría del 18/11),
     dejarlo en `scripts/` para reutilizarlo en cada PR.
- **Listo cuando:** existen los `.txt` de todas las rutas, las capturas y la tabla de pesos
  en esta ficha.
- **Estado (19/11/2026):** completado. Captura realizada sobre la rama
  `feature/hu-07-capa-decorativa` (base `fix/integracion-test-20261031`, sin cambios en `src/`)
  con `npm run dev` y automatización vía `firefox-devtools` (navegación, `innerText` de
  `header`/`main`/`footer` y capturas de viewport). No se creó script adicional en `scripts/`.

#### Tabla de pesos del build (`npm run build`, 19/11/2026)

| Archivo (`dist/`) | Tamaño | Gzip | Nota |
|---|---:|---:|---|
| `index.html` | 1,07 kB | 0,58 kB | — |
| `assets/index-BvfqfUPy.css` | 39,82 kB | 8,00 kB | — |
| `assets/index-Cxxr-Gx3.js` | 543,76 kB | 158,47 kB | Aviso de chunk > 500 kB (preexistente). |

Build: Vite v8.3.5, 2194 módulos, `✓ built in 582ms`.

#### Artefactos de línea base

- **Texto visible (14 rutas, `hu_07_pruebas.md` §3):** `documentacion/referencia_visual_v2/linea_base/`
  → `inicio.txt`, `institucional.txt`, `carreras.txt`, `carrera-analisis-de-sistemas.txt`,
  `carrera-gestion-parlamentaria.txt`, `ingresantes.txt`, `estudiantes.txt`, `tutorias.txt`,
  `docentes.txt`, `noticias.txt`, `faq.txt`, `contacto.txt`, `buscar-carreras.txt`, `404.txt`.
  Formato: secciones `=== HEADER ===`, `=== MAIN ===`, `=== FOOTER ===` (captura a 1440 px).
- **Capturas «antes» (14 rutas × 1440 y 375 px, 28 PNG):**
  `documentacion/driveFrontend/referencia_visual_v2/linea_base/<ruta>-1440.png` y
  `<ruta>-375.png` (ruta en Drive, no versionada). Páginas con consumo de API sin backend muestran
  sus estados de carga reales al momento de la captura (p.ej. carreras/novedades/fichas), lo que
  forma parte del «antes».

---

## Fase D1 · Fundaciones

> Al terminar D1, el sitio cambia de colores y de tipografías **sin cambiar ninguna
> estructura**. Cada ficha de D1 es chica: si un PR toca más de `index.html`,
> `src/styles/index.css`, `src/constants/` y `src/hooks/`, se está adelantando a D2.

### D1.1 · Paleta en el `@theme`

- **Objetivo:** cargar la paleta del artefacto como tokens de Tailwind y reapuntar los
  tokens semánticos existentes para que los componentes actuales tomen la piel nueva sin
  tocarlos.
- **Archivos:** `src/styles/index.css` (`@theme`).
- **Referencia:** `css/00_base_y_tipografia.css` líneas 2–28 (variables `:root`) y
  `css/00a_theme_actual_del_repo_compilado.css` (tokens actuales que se reapuntan).
- **Instrucciones:**
  1. Agregar los tokens nuevos del **Anexo B.1** con los nombres en español que figuran ahí.
  2. Reapuntar los tokens existentes según el **Anexo B.2**. No borrar ningún token: puede
     haber componentes que lo usen.
  3. Agregar `--color-borde-control: #7f8ca2` para bordes de campos de formulario. El
     `--color-linea` del artefacto (`#d9e5ef`) da 1,28:1 y no sirve como borde de un campo
     (WCAG 1.4.11 pide 3:1). Se usa solo en tarjetas y separadores.
  4. No usar `celeste`, `celeste-claro`, `verde-ifts` ni `aguamarina` como color de texto
     normal sobre fondo claro (ver Anexo B.1).
  5. Los colores `seccion-*` (rojo, verde, ámbar, cian, naranja) **no se tocan** en esta
     ficha. D1.4 define los colores por sección nuevos; los viejos se retiran en D6 si nada
     los usa.
- **Restricciones:** sin cambiar clases en componentes; solo valores de tokens.
- **Listo cuando:**
  - `lint`, `build` y `test` en verde;
  - texto de las rutas igual a la línea base (CA-07-01);
  - a 1440 px, el sitio ya muestra textos en tinta `#0d1b33`, fondos hielo y acentos azules
    (captura antes/después en el PR);
  - ningún texto normal nuevo queda debajo de 4,5:1 (CA-07-03).
- **Fuera de alcance:** fuentes, sombras, radios, colores por sección.

### D1.2 · Tipografías

- **Objetivo:** Plus Jakarta Sans para títulos, Source Sans 3 para texto y JetBrains Mono para
  etiquetas, servidas según la decisión 9 de D0.1.
- **Archivos:** `index.html`, `public/fonts/` (si se sirven desde el sitio) y
  `src/styles/index.css`.
- **Referencia:** `index.html` del artefacto (pesos: Plus Jakarta Sans 500–800, Source Sans 3
  400–700 más itálica 400, JetBrains Mono 400 y 500) y `css/00_base_y_tipografia.css`
  líneas 23–25 (`--display`, `--body`, `--mono`).
- **Instrucciones:**
  1. Si se sirven desde el sitio: archivos `woff2` de los subconjuntos `latin` y
     `latin-ext` (cubren tildes y ñ), con `@font-face`, `font-display: swap` y
     `<link rel="preload">` solo para Source Sans 3 400 y Plus Jakarta Sans 800. Licencia
     SIL OFL en `public/fonts/LICENSE.txt`.
  2. Si se usa Google Fonts: copiar el `<link>` y los `preconnect` del artefacto.
  3. Tokens: `--font-sans` (Source Sans 3, ya existe), `--font-display` (Plus Jakarta Sans,
     nuevo) y `--font-mono` (JetBrains Mono, reemplaza el valor por defecto). Todos con
     respaldo de fuentes del sistema.
  4. **No** aplicar todavía la fuente de títulos a `h1`–`h4`: eso es D1.5.
- **Listo cuando:** en DevTools las tres familias figuran como cargadas; con la red bloqueada
  el texto se ve con la fuente del sistema (escenario 3); `build` informa el peso de las
  fuentes.
- **Fuera de alcance:** tamaños de títulos (los fija D1.5 con el tope de 48/32).

### D1.3 · Forma y movimiento

- **Objetivo:** radios, sombras, curvas de animación y un único mecanismo de «reducir
  movimiento» para todo el sitio.
- **Archivos:** `src/styles/index.css` y `src/hooks/useMovimientoReducido.ts` (nuevo) con su
  test.
- **Referencia:** `css/00_base_y_tipografia.css` (`--r`, `--ease`, `--ease2`, `--shadow`,
  keyframes `float` y `fadeup`), `css/11_ajustes_responsive_y_movimiento.css` líneas 2–17 y
  `css/99_ya_en_el_repo.css`.
- **Instrucciones:**
  1. Tokens nuevos: `--radius-tarjeta: 20px`, `--radius-tarjeta-grande: 26px`,
     `--radius-pildora: 999px`, `--shadow-profunda: 0 18px 50px -22px #0b2c5e59`,
     `--ease-telon: cubic-bezier(.65, 0, .35, 1)`. `--ease-suave` ya existe con el mismo
     valor que `--ease` del artefacto: reutilizarlo.
  2. Keyframes: el `flotar` y el `entrada-suave` del repo equivalen a `float` y `fadeup` del
     artefacto. Reutilizarlos; no duplicar.
  3. Regla global de «reducir movimiento» como la del artefacto (líneas 2–17 del archivo 11):
     duración mínima de transiciones y animaciones, una sola iteración, y `revelar` visible.
     Verificar que no pisa las reglas que ya tiene el repo.
  4. Hook `useMovimientoReducido()`: devuelve `true` si
     `matchMedia('(prefers-reduced-motion: reduce)')` coincide y se actualiza si el usuario
     cambia la preferencia. Seguro para tests (sin `window.matchMedia` devuelve `false`).
     Todas las fichas siguientes usan este hook.
- **Listo cuando:** tests del hook (coincide, no coincide, cambia en vivo, sin `matchMedia`);
  `lint`, `build` y `test` en verde; sin cambios visibles fuera de sombras y radios donde ya
  se usaban tokens.
- **Fuera de alcance:** animaciones concretas (líneas, esferas, telón) y el hook de aparición
  al scroll (D2).

### D1.4 · Color por carrera y por página

- **Objetivo:** tener en un solo lugar el color que el artefacto le da a cada carrera, a cada
  página y a cada categoría de FAQ, para que los componentes lo pasen como `--c`.
- **Archivos:** `src/constants/coloresSecciones.ts` (nuevo) y su test.
- **Referencia:** **Anexo B.3** (valores extraídos del bundle del artefacto).
- **Instrucciones:**
  1. Tres mapas: `COLOR_POR_CARRERA` (clave = slug, **los mismos slugs que
     `src/constants/cursadaCarreras.ts`**), `COLOR_POR_PAGINA` (clave = ruta del repo) y
     `COLOR_POR_CATEGORIA_FAQ` (clave = id interno de categoría; Alumnos sigue siendo
     `estudiantes`).
  2. Funciones `colorDeCarrera(slug)` y `colorDePagina(ruta)` con color por defecto (Anexo
     B.3) si la clave no existe.
  3. Es dato de presentación: no va en `cursadaCarreras.ts`, que es contenido del instituto.
- **Listo cuando:** test que cubre las 5 carreras, las páginas del Anexo B.3 y el valor por
  defecto; ningún componente lo usa todavía (lo usan D2 a D5).
- **Fuera de alcance:** aplicar los colores en pantalla.

### D1.5 · Estilos base

- **Objetivo:** aplicar la piel a los elementos HTML base: títulos, cuerpo, selección de
  texto y foco.
- **Archivos:** `src/styles/index.css` (`@layer base`).
- **Referencia:** `css/00_base_y_tipografia.css` líneas 38–86 (cuerpo, títulos, `::selection`)
  y `css/03_primitivas.css` líneas 254–271 (`.skip`, `:focus-visible`);
  `css/90_correcciones_auditoria_v2.css` (tope de H1).
- **Instrucciones:**
  1. `body`: Source Sans 3, color tinta, `-webkit-font-smoothing: antialiased`. Tamaño: el
     artefacto usa 17 px en escritorio y 16 px en celular; aplicarlo solo si no rompe el
     ritmo de los componentes actuales (si rompe, dejar 16 px y anotarlo).
  2. `h1`–`h4`: Plus Jakarta Sans, `letter-spacing: -0.03em`, color marino,
     `line-height: 1.08`. **H1 con tope de 48 px en escritorio y 32 px en celular**
     (`clamp(32px, 4vw, 48px)`, como el archivo 90), no los 78–92 px del archivo 04.
  3. `::selection`: fondo celeste y texto blanco es solo decorativo (2,81:1); aceptable porque
     es un resaltado temporal, pero anotar la decisión.
  4. **Foco:** el artefacto usa contorno celeste de 3 px, que da 2,81:1 sobre blanco y no
     llega al 3:1. Usar **azul `#2f61d6`** (5,52:1) sobre fondos claros y **celeste claro
     `#8fd0f0`** (8,1:1) sobre fondos marinos (barra superior, pie, telón), con
     `outline-offset: 3px`.
  5. Si el enlace «Saltar al contenido» ya existe en el repo, solo tomar su piel (marino,
     píldora); si no existe, **no** agregarlo en esta ficha: es un cambio de estructura y va
     con D3.
- **Listo cuando:** escenarios 2, 5 y 10 (solo H1) de `hu_07_pruebas.md` pasan a 1440 y
  375 px; texto igual a la línea base; tests en verde.
- **Fuera de alcance:** `.eyebrow`, `.h2`, `.lead` y demás clases de componente (D2).

---

## Anexo A · Mapa de clases del build a componentes del repo (completado en D0.3)

Relevamiento verificado (19/11/2026) con evidencia `ruta:línea` en `src/`. Sin cambios de código.

| Pieza del build (archivo CSS) | Componente REAL en `src/` (ruta:línea) | ¿Existe? | Ficha | Nota corta si corrigió algo |
|---|---|---:|---|---|
| `.topbar` (02) | `src/components/layout/Header.tsx:21-49` (`<header>` sticky; barra superior `bg-slate-900` con `UBICACION_HEADER` y `ACCESOS_EXTERNOS`) | parcial | D3 | No es componente dedicado: la “topbar” vive dentro de `Header`. |
| `header.main`, `.hbar`, `.brand` (02) | `src/components/layout/Header.tsx:21` (`<header>`), `:51-63` (bloque de marca/logos `Link to="/"` con `logoCABA.png` e `IFTS12.jpg`), `:81-88` (barra de navegación) | parcial | D3 | No hay clases `.hbar/.brand` ni componente separado; la estructura de cabecera está integrada en `Header`. |
| `.nav`, `.mega` (02) | `src/components/layout/NavMenu.tsx:15-36` (lista `<ul>` de `NavLink`), usado en `src/components/layout/Header.tsx:86` | parcial | D3 | `.nav` tiene equivalente funcional (menú horizontal). **No hay `.mega`** ni mega-menú desplegable en `src/` (solo ítems planos). |
| `.mmenu`, `.burger` (02) | Burger: `src/components/layout/Header.tsx:69-78` (botón `Menu`, `aria-controls="menu-principal-mobile"`). Menú móvil: `src/components/layout/MobileMenu.tsx:18`, `:105-136` (`dialog`/`nav`, portal, `NavMenu` + `BuscadorGlobal`) | parcial | D3 | Repartido: el botón “burger” está en `Header` y el panel móvil es `MobileMenu` (componente dedicado). No hay clases `.mmenu/.burger`. |
| `.sbtn`, `.so`, `.sbox`, `.sres` (02) | `src/components/layout/BuscadorGlobal.tsx:10`, `:54-67` (`input type="search" role="combobox"`), `:70-108` (panel de resultados/sugerencias + enlace “Ver todos los resultados”). Uso: `src/components/layout/Header.tsx:66`, `src/components/layout/MobileMenu.tsx:131` | sí | D3 | **Corrección de ruta:** el componente probable decía `components/ui/BuscadorGlobal.tsx`; en realidad está en `src/components/layout/BuscadorGlobal.tsx`. No hay clases `.sbtn/.so/.sbox/.sres`, pero el componente dedicado existe. |
| `.progress` (01) | No encontrado en `src/` (búsqueda sin coincidencias de `progress` de barra/UI en componentes/páginas) | no | D3 | Correcto: no existe `BarraProgreso` ni equivalente. |
| `.totop` (10) | No encontrado en `src/` (búsqueda sin coincidencias de `totop`) | no | D3 | Correcto: no existe `VolverArriba` ni equivalente. |
| `footer`, `.fgrid`, `.fcols`, `.fbot`, `.fform` (09) | `src/components/layout/Footer.tsx:82` (`<footer>`), `:84-124` (grid/columnas de enlaces), `:127` (renderiza `FormularioConsulta`), `:149-166` (bloque inferior). Formulario: `src/components/ui/FormularioConsulta.tsx:35`, `:119-286` | parcial | D3 | `Footer` y `FormularioConsulta` existen como componentes dedicados; la estructura/semántica de clases `.fgrid/.fcols/.fbot/.fform` del build no está implementada como tal (usa Tailwind). |
| `.mapa-once`, `.mo-*` (09) | No encontrado en `src/` (búsqueda sin coincidencias de `mapa-once`/`mo-`) | no | D3 | Correcto: no existe `MapaBarrio` ni equivalente. |
| `.btn` (03) | `src/components/ui/Button.tsx:9-17` (props/variantes), `:36-74` (render botón/enlace, variantes `primario/secundario/fantasma/enlace`, estados) | sí | D2 | Correcto. Componente dedicado con variantes; sin clase CSS `.btn`. |
| `.lnk` (03) | Variante de enlace en `src/components/ui/Button.tsx:27`, `:33`, `:49-66` (`variante="enlace"` / `href`) + enlaces inline ad-hoc en páginas/componentes | parcial | D2 | No hay componente `enlace-animado` nuevo ni clase `.lnk`. El equivalente real hoy es la variante `enlace` de `Button` (y enlaces comunes). |
| `.chip`, `.tbd` (03) | `src/components/ui/Badge.tsx:4-17`, `:22-34` (etiqueta/chip con tonos) | parcial | D2 | `.chip`/badge tiene equivalente dedicado (`Badge`). `.tbd` (estado “a confirmar” visual del build) no aparece como componente/clase específica en `src/`. |
| `.eyebrow` (00) | `src/components/ui/Eyebrow.tsx:4-18`, `:26-36` | sí | D2 | Correcto. |
| `[data-r]`, `.split` (03) | No encontrado como patrón de aparición/reveal en `src/` (no hay `data-r`, `revelar`, `useAparicion`). Única coincidencia textual de `split`: `src/utils/fecha.ts:11` (`iso.split('-')`, no relacionado) | no | D2 | **Corrección:** la tabla lo marcaba “parcial”; no hay utilidad de revelado ni hook de aparición equivalente en `src/`. |
| `.lineas`, `.lf-*` (12) | No encontrado en `src/` (búsqueda sin coincidencias de `lineas`/`lf-`) | no | D2 | Correcto. |
| `.esferas`, `.esfera*` (12) | No encontrado en `src/` (búsqueda sin coincidencias de `esferas`/`esfera`) | no | D2 | Correcto. |
| `.hero`, `.feat`, `.fs`, `.fbar`, `.fnav` (04) | Portada/carrusel: `src/pages/HomePage.tsx:81-93` (`CarruselInstitucional`), `src/components/ui/CarruselInstitucional.tsx:146`, `:179-305` (sección hero `aria-label="Novedades destacadas"`, slide actual, controles anterior/siguiente `:243-260`, indicadores `:263-281`, pausa/reanudar opcional `:225-241`). Home arma slides en `src/pages/HomePage.tsx:28-30,52-74` | parcial | D4 | Existe componente dedicado `CarruselInstitucional` usado en `HomePage`; no reproduce literalmente `.feat/.fs/.fbar/.fnav` del build (autoplay/progreso visual distintos). |
| `.quick`, `.q` (04) | `src/components/ui/AccesosRapidos.tsx:5-11`, `:9-65` (lista de accesos). Uso en Home: `src/pages/HomePage.tsx:214-220` | sí | D4 | Correcto. Componente dedicado. |
| `.cgrid`, `.cc` (04) | Tarjeta: `src/components/ui/CardCarrera.tsx:5-30`. Grilla/listado en `src/pages/HomePage.tsx:200-207` y páginas de carreras (`src/pages/CarrerasPage.tsx`) | sí | D4 | Correcto (equivalente por componente + grilla contenedora). |
| `.news`, `.ncard` (04, 10) | Tarjeta: `src/components/ui/CardNoticia.tsx:6-48`. Listados en `src/pages/HomePage.tsx:148-153`, `src/pages/NoticiasPage.tsx:234-245` | sí | D4, D5 | Correcto. |
| `.campus` (04) | Sección inline en Home: `src/pages/HomePage.tsx:95-113` (`aria-label="Acceso al campus virtual"`, CTA a `ENLACES.moodle`) | parcial | D4 | Existe como bloque/sección de contenido, no como componente dedicado ni clase `.campus`. |
| `.telon*` (13) | No encontrado en `src/` (búsqueda sin coincidencias de `telon`) | no | D4 | Correcto. |
| `.phero`, `.crumbs` (05) | `src/components/layout/EncabezadoPagina.tsx:5-13`, `:20-44` (banda de encabezado, breadcrumb opcional, eyebrow, H1, descripción). `src/components/ui/Breadcrumb.tsx:4-10`, `:14-43`. Usos: p.ej. `src/pages/CarrerasPage.tsx:25`, `src/pages/NoticiasPage.tsx:116,135`, `src/pages/FaqPage.tsx:58`, `src/pages/InstitucionalPage.tsx:71`, `src/pages/EstudiantesPage.tsx:67`, `src/pages/DocentesPage.tsx:55`, `src/pages/TutoriasPage.tsx:8`, `src/pages/IngresantesPage.tsx:42`, `src/pages/ContactoPage.tsx:38` | sí | D5 | Correcto como equivalentes funcionales dedicados (`EncabezadoPagina`/`Breadcrumb`), sin clases `.phero/.crumbs`. |
| `.subnav`, `.bloque`, `.bh` (05) | Estructura de secciones/bloques en páginas internas: `src/pages/InstitucionalPage.tsx:84-223` (`<section>` + bloques), `src/pages/EstudiantesPage.tsx:88-182`, `src/pages/IngresantesPage.tsx:68-137`, `src/pages/DocentesPage.tsx:69-201`, `src/pages/TutoriasPage.tsx:23-105` | parcial | D5 | No hay subnavegación interna `.subnav` ni componentes/patrón `.bloque/.bh` dedicados en `src/` (búsqueda sin clases); sí hay secciones de contenido equivalentes. |
| `.faq`, `.fq`, `.ftabs` (06) | Acordeón: `src/components/ui/FaqAcordeon.tsx:16-23`, `:21-75`. Página con tabs/filtro: `src/pages/FaqPage.tsx:16-20` (segmentos), `:71` (`<Tabs ...>`), `:86` (`<FaqAcordeon ...>`). Componente de pestañas en repo: `src/components/ui/Tabs.tsx` | sí | D5 | Equivalente funcional: `FaqAcordeon` + `Tabs` (ftabs) + `FaqPage`. Sin clases `.faq/.fq/.ftabs`. |
| `.cd-hero`, `.facts`, `.toc`, `.plan`, `.yr`, `.mat`, `.dl` (07) | Detalle: `src/pages/CarreraDetallePage.tsx:97-118` (hero/encabezado de ficha), `:122-149` (presentación), `:160-181` (“Datos oficiales” tipo ficha/facts en `<dl>`), `:215-258` (plan de estudios/descarga), `:347-366` (TOC lateral “En esta carrera”). Académico: `src/components/ui/ContenidoAcademico.tsx:15-55` (materias en tabla), `:57-72` (cuerpo docente) | parcial | D5 | No hay clases/componentes homónimos; la ficha existe repartida entre `CarreraDetallePage` y `ContenidoAcademico` con estructura equivalente parcial. |
| `.cal` (07) | Calendario en `src/pages/EstudiantesPage.tsx:14-62` (datos), `:88-164` (sección + `<table>` “Calendario académico” con filas destacadas) | parcial | D5 | Existe como contenido/tabla dentro de la página, no como componente dedicado `.cal`. |
| `.tut`, `.mailbox`, `.copy` (08) | `src/pages/TutoriasPage.tsx:23-50` (presentación), `:56-88` (contacto con equipo, correo `ENLACE_CORREO_TUTORIAS`), `:96-104` (datos institucionales) | parcial | D5 | Contenido presente en la página, pero sin estructura/componentes `.tut/.mailbox/.copy` ni acción de copiado. |
| `.apto` (90) | No encontrado en `src/pages/DocentesPage.tsx` ni en `src/` (búsqueda “Apto Médico/apto” sin coincidencias funcionales en UI) | no | D5 | No hay sección/bloque “Apto Médico” implementado. |
| `.rtable`, `.empty`, `.alerta`, `.pager`, `.form` (10) | Tabla admin: `src/components/ui/TablaAdmin.tsx:26-63`. Vacío/error/carga/alertas de estado: `src/components/ui/Estado.tsx:23-98`, `:113-138`. Paginación: `src/components/ui/Paginacion.tsx:11-60`. Formularios/campos: `src/components/ui/FormField.tsx:27-118` y usos (p.ej. `src/pages/AdminCrudPanel.tsx:138-187`, `src/pages/AdminLoginPage.tsx:121-143`) | sí | D5 | Componentes dedicados equivalentes a la intención (`TablaAdmin`, `Estado`, `Paginacion`, `FormField`), sin clases `.rtable/.empty/.alerta/.pager/.form`. |
| `.toast` (10) | `src/components/ui/Toast.tsx:6-18`, `:24-50` | sí | D5 | Correcto. |

## Anexo B · Valores extraídos del artefacto

### B.1 · Paleta (tokens nuevos)

Contraste calculado con la fórmula de WCAG 2.2 sobre blanco `#ffffff` y sobre hielo
`#f2f8fc`.

| Token nuevo | Variable del build | Valor | Sobre blanco | Sobre hielo | Uso permitido como texto normal |
|---|---|---|---|---|---|
| `--color-marino` | `--navy` | `#0b2c5e` | 13,67 | 12,76 | Sí |
| `--color-marino-2` | `--navy2` | `#123d80` | 10,47 | 9,78 | Sí |
| `--color-azul` | `--blue` | `#2f61d6` | 5,52 | 5,16 | Sí |
| `--color-petroleo` | `--teal` | `#1d7aa3` | 4,81 | 4,49 | Sobre blanco sí; sobre hielo **no** (4,49) |
| `--color-aguamarina` | `--aqua` | `#1e8a7e` | 4,21 | 3,93 | **No** (solo texto grande o íconos) |
| `--color-verde-ifts` | `--green` | `#22a650` | 3,16 | 2,95 | **No** (íconos con 3:1 solo sobre blanco) |
| `--color-celeste` | `--celeste` | `#4aa3d4` | 2,81 | 2,62 | **No** (decorativo) |
| `--color-celeste-claro` | `--cel2` | `#8fd0f0` | 1,69 | 1,58 | **No** sobre claro; **sí** sobre marino (8,1) |
| `--color-menta` | `--mint` | `#d3f2e6` | — | — | Fondo |
| `--color-hielo` | `--ice` | `#f2f8fc` | — | — | Fondo |
| `--color-hielo-2` | `--ice2` | `#e4f1f9` | — | — | Fondo |
| `--color-tinta` | `--ink` | `#0d1b33` | 17,19 | 16,05 | Sí |
| `--color-tinta-2` | `--ink2` | `#2b3a55` | 11,42 | 10,66 | Sí |
| `--color-apagado` | `--muted` | `#5d6c86` | 5,31 | 4,96 | Sí |
| `--color-linea` | `--line` | `#d9e5ef` | 1,28 | 1,20 | Borde de tarjeta y separador, **no** de campo |
| `--color-borde-control` | (nuevo) | `#7f8ca2` | 3,40 | 3,18 | Borde de campos de formulario |
| `--color-pendiente-fondo` | `.tbd` | `#fff6dc` | — | — | Fondo del badge «a confirmar» |
| `--color-pendiente-borde` | `.tbd` | `#e9b949` | — | — | Borde punteado del badge |
| `--color-pendiente-texto` | `.tbd` | `#8a5a00` | 5,93 | 5,53 | Sí (5,49 sobre su fondo) |

**Etiquetas y enlaces de color:** el build los oscurece con
`color-mix(in srgb, <color> 62%, #0b2c5e)` (`css/03_primitivas.css` líneas 278–334). Mantener
esa regla para que cualquier color de sección llegue a 4,5:1.

**Aviso para D2:** el botón del build pasa a un degradé azul → celeste al pasar el mouse, con
texto blanco. Sobre el extremo celeste el texto da 2,81:1. En D2, terminar el degradé en
petróleo `#1d7aa3` (4,81:1) o en azul.

### B.2 · Tokens existentes que se reapuntan

| Token del repo | Valor actual | Valor nuevo | Motivo |
|---|---|---|---|
| `--color-texto` | `#333` | `#0d1b33` (tinta) | Texto general |
| `--color-texto-suave` | `#666` | `#5d6c86` (apagado) | 5,31:1, sigue pasando |
| `--color-borde-suave` | `#dedfda` | `#d9e5ef` (línea) | Tarjetas y separadores |
| `--color-fondo` | `#f1f2ec` | `#f2f8fc` (hielo) | Fondos de sección |
| `--color-fondo-alt` | `#ebebeb` | `#e4f1f9` (hielo 2) | Fondos alternos |
| `--color-acento-600` | `#2563eb` | `#2f61d6` (azul) | Acento principal |
| `--color-acento-700` | `#1d4ed8` | `#123d80` (marino 2) | Hover |
| `--color-acento-800` | `#1e40af` | `#0b2c5e` (marino) | Activo y títulos |

`--color-borde` (`#ccc`, 1,61:1) queda como está para no romper nada, pero los campos de
formulario pasan a `--color-borde-control` en D5.

### B.3 · Color por carrera, por página y por categoría

Extraído del bundle `assets/index-v2.js` del artefacto.

**Por carrera** (clave del artefacto → usar el slug equivalente de `cursadaCarreras.ts`):

| Carrera | Color |
|---|---|
| Administración Pública | `#2f61d6` (azul) |
| Políticas Culturales | `#1e8a7e` (aguamarina) |
| Análisis de Sistemas | `#1d7aa3` (petróleo) |
| Ciencia de Datos e IA | `#22a650` (verde) |
| Gestión Parlamentaria | `#0b2c5e` (marino) |
| Por defecto | `#4aa3d4` (celeste) |

**Por página** (encabezado, etiqueta y detalles):

| Página | Color |
|---|---|
| Instituto, Ingresantes, FAQ | `#2f61d6` |
| Carreras, Novedades, Búsqueda, Autoridades | `#1d7aa3` |
| Alumnos, Tutoría, Documentos | `#1e8a7e` |
| Docentes, Contacto, Privacidad | `#0b2c5e` |
| Por defecto | `#1d7aa3` |

**Por categoría de FAQ:** ingresantes `#2f61d6`, estudiantes (Alumnos) `#3d8fc4`, docentes
`#0b2c5e`, institucional `#1d7aa3`, contacto `#4aa3d4`.

**Líneas animadas** (para D2): versión clara con capas brisa `#cfe8f5`→`#8fd0f0`, fondo
`#8fd0f0`→`#c6e7f6`, medio `#4aa3d4`→`#2f61d6`, frente `#123d80`→`#1d7aa3` y luz `#2f9be0`.
Versión oscura con brisa `#1d7aa3`→`#2f61d6`, fondo `#2f61d6`→`#123d80`, medio
`#4aa3d4`→`#8fd0f0`, frente `#8fd0f0`→`#cfe8f5` y luz `#ffffff`.

## Referencias

IFTS N.º 12. (2026, 18 de noviembre). *IFTS N.º 12 · Vista previa v2* [Artefacto web,
versión `1795021175-002d`]. https://claude.ai/artifact/DtCfnn3GdmtYkCLbix8mPb

W3C. (2023). *Web Content Accessibility Guidelines (WCAG) 2.2*.
https://www.w3.org/TR/WCAG22/
