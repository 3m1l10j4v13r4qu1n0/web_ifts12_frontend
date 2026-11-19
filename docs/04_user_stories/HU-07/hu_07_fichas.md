# HU-07: Fichas de implementación — Capa decorativa v2

Fecha: 2026-11-19 · Estado: borrador (fases D0 y D1 detalladas; D2 a D6 en índice)

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
| D0.1 | Decisiones de diseño y enmienda del contrato visual | D0 | — | pendiente | — |
| D0.2 | Referencia visual dentro del repo | D0 | — | pendiente | — |
| D0.3 | Mapa de clases del build a componentes del repo | D0 | D0.2 | pendiente | — |
| D0.4 | Línea base del sitio actual | D0 | — | pendiente | — |
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

**Decisiones a tomar** (la recomendación es una propuesta, no una decisión):

| # | Tema | Opciones | Recomendación | Decisión |
|---|---|---|---|---|
| 1 | Tipografías (ART-08) | Tres familias del artefacto / Source Sans 3 sola | Tres familias: es el diseño aprobado | ⏳ |
| 2 | Paleta | Marino, azul y celestes del artefacto / acento único actual | Paleta del artefacto, con los límites de contraste de D1.1 | ⏳ |
| 3 | Color por carrera y por página | Sí (como el artefacto) / un solo color | Sí, con los valores del Anexo B | ⏳ |
| 4 | Telón: frecuencia | En cada visita a Inicio / una vez por sesión | Una vez por sesión: quien vuelve a Inicio no espera de nuevo | ⏳ |
| 5 | Ondas que quedan en el artefacto | El borde inferior del telón y la onda al pie de cada tarjeta de carrera son curvas | Cambiar ambas por líneas rectas o quitarlas (Edith pidió líneas) | ⏳ |
| 6 | Esferas de la portada | Son **enlaces** que rotan entre destacados (turno de una carrera, modalidad, Tutoría, última novedad) / esferas solo decorativas | Enlaces **sin rotación automática** (cada esfera fija a un destino), porque la rotación sin botón de pausa choca con WCAG 2.2.2 y suma enlaces nuevos (excepción a CA-07-01) | ⏳ |
| 7 | Insignia UPCN flotante en la portada | Mantener / quitar | Mantener, sin texto agregado (el logo ya está en el pie) | ⏳ |
| 8 | Buscador | Ventana flotante con Ctrl+K (artefacto) / desplegable actual | Ventana flotante que reusa la lógica de `BuscadorGlobal` y el enlace a `/buscar` | ⏳ |
| 9 | Fuentes | Google Fonts (artefacto) / archivos propios en `public/fonts` | Archivos propios: no depende de un tercero, no expone datos de visitantes y anda aunque Google esté bloqueado | ⏳ |
| 10 | Botón «Administración» en el pie del artefacto | — | No se trae: rige I12 (panel solo por URL), ART-16 | ⏳ |

**Texto propuesto para el contrato** (OpenCode lo adapta a las decisiones tomadas):

> ## Enmienda 2026-11-19 — Piel visual v2 (HU-07)
>
> El Figma v2 sigue siendo la referencia de **estructura, breakpoints (768/1024), estados y
> componentes**. La **piel** (paleta, tipografías, sombras, radios y movimiento) pasa a ser la
> del artefacto «IFTS N.º 12 · Vista previa v2» (versión `1795021175-002d`), aprobada por el
> usuario el `<fecha>`. Reemplaza la regla de familia única Source Sans 3 y la de acento único
> 90/10. Decisiones: `<lista de la tabla de D0.1>`. Referencia extraída en
> `documentacion/referencia_visual_v2/`. Especificación: `docs/04_user_stories/HU-07/`.

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

## Anexo A · Mapa de clases del build a componentes del repo (completar en D0.3)

| Pieza del build (archivo CSS) | Componente probable en `src/` | ¿Existe? | Ficha |
|---|---|---|---|
| `.topbar` (02) | `components/layout/Header.tsx` (barra superior) | ? | D3 |
| `header.main`, `.hbar`, `.brand` (02) | `components/layout/Header.tsx` | ? | D3 |
| `.nav`, `.mega` (02) | `components/layout/NavMenu.tsx` | ? | D3 |
| `.mmenu`, `.burger` (02) | `components/layout/MobileMenu.tsx` | ? | D3 |
| `.sbtn`, `.so`, `.sbox`, `.sres` (02) | `components/ui/BuscadorGlobal.tsx` | ? | D3 |
| `.progress` (01) | nuevo `components/ui/deco/BarraProgreso.tsx` | no | D3 |
| `.totop` (10) | nuevo `components/ui/deco/VolverArriba.tsx` | no | D3 |
| `footer`, `.fgrid`, `.fcols`, `.fbot`, `.fform` (09) | `components/layout/Footer.tsx` + `FormularioConsulta` | ? | D3 |
| `.mapa-once`, `.mo-*` (09) | nuevo `components/ui/deco/MapaBarrio.tsx` | ? | D3 |
| `.btn` (03) | `components/ui/Button.tsx` | sí | D2 |
| `.lnk` (03) | nuevo `enlace-animado` o variante de enlace | ? | D2 |
| `.chip`, `.tbd` (03) | `components/ui/Badge.tsx` | sí | D2 |
| `.eyebrow` (00) | `components/ui/Eyebrow.tsx` | sí | D2 |
| `[data-r]`, `.split` (03) | utilidad `revelar` + hook nuevo `useAparicion` | parcial | D2 |
| `.lineas`, `.lf-*` (12) | nuevo `components/ui/deco/Lineas.tsx` | no | D2 |
| `.esferas`, `.esfera*` (12) | nuevo `components/ui/deco/Esferas.tsx` | no | D2 |
| `.hero`, `.feat`, `.fs`, `.fbar`, `.fnav` (04) | `pages/HomePage.tsx` + `CarruselInstitucional` | ? | D4 |
| `.quick`, `.q` (04) | `components/ui/AccesosRapidos.tsx` | sí | D4 |
| `.cgrid`, `.cc` (04) | `components/ui/CardCarrera.tsx` | sí | D4 |
| `.news`, `.ncard` (04, 10) | `components/ui/CardNoticia.tsx` | sí | D4, D5 |
| `.campus` (04) | sección de Inicio | ? | D4 |
| `.telon*` (13) | nuevo `components/ui/deco/Telon.tsx` | no | D4 |
| `.phero`, `.crumbs` (05) | `components/layout/EncabezadoPagina.tsx` + `Breadcrumb` | sí | D5 |
| `.subnav`, `.bloque`, `.bh` (05) | `InstitucionalPage`, `EstudiantesPage` | ? | D5 |
| `.faq`, `.fq`, `.ftabs` (06) | `components/ui/FaqAcordeon.tsx`, `FaqPage` | sí | D5 |
| `.cd-hero`, `.facts`, `.toc`, `.plan`, `.yr`, `.mat`, `.dl` (07) | `CarreraDetallePage`, `ContenidoAcademico` | sí | D5 |
| `.cal` (07) | calendario de `EstudiantesPage` | ? | D5 |
| `.tut`, `.mailbox`, `.copy` (08) | `TutoriasPage` | sí | D5 |
| `.apto` (90) | `DocentesPage` (Apto Médico) | ? | D5 |
| `.rtable`, `.empty`, `.alerta`, `.pager`, `.form` (10) | `TablaAdmin`/tablas, `Estado`, `Paginacion`, `FormField` | sí | D5 |
| `.toast` (10) | `components/ui/Toast.tsx` | sí | D5 |

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
