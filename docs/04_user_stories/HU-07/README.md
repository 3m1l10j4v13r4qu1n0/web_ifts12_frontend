# HU-07: Historia de Usuario — Identidad visual del sitio (capa decorativa v2)

Fecha: 2026-11-19 · Estado: borrador

## Historia

**Como** visitante del sitio (futuro ingresante, estudiante, docente o público general),
**quiero** recorrer un sitio con una identidad visual institucional, moderna y coherente en
todas las páginas,
**para** reconocer al IFTS N.º 12 y encontrar la información con comodidad, sin que el
diseño me tape el contenido, me demore o me deje afuera si uso lector de pantalla, teclado o
«reducir movimiento».

## Tarjeta

El sitio ya tiene la estructura, la navegación del Mapa V3 y los contenidos de la devolución
de Edith (HU-03 a HU-06). Esta HU agrega **solo la capa decorativa** del diseño aprobado por
el usuario: el artefacto «IFTS N.º 12 · Vista previa v2» (versión `1795021175-002d`,
18/11/2026). La capa incluye:

- Paleta azul marino y celeste, tres tipografías y color propio por carrera y por página.
- Header de vidrio, menú desplegable, menú móvil animado, buscador flotante y pie con mapa.
- Portadas con líneas animadas y esferas, carrusel con barras de progreso, tarjetas con
  relieve y aparición de bloques al hacer scroll.
- Telón de entrada en Inicio.

La HU es **paraguas**: se implementa por partes con las fichas de
`hu_07_fichas.md` (fases D0 a D6). Cada ficha es una rama y un PR. La HU se cierra cuando
pasan todos los criterios de aceptación, en la fase D6.

- **Fuente:** decisión del usuario (el diseño visual aprobado es el artefacto de Claude, no
  la estética de la V1). **Evidencia de los hallazgos:**
  `docs/06_audits/audit_2026-11-18-artefacto-web.md` (ART-06, ART-07, ART-08; PROTO-05,
  06, 08, 09, 10, 11).
- **Referencia de estilo:** `documentacion/referencia_visual_v2/` (CSS extraído del
  artefacto y dividido por tema).
- **Sin ticket de Mantis** todavía.

## Reemplaza

Para que la auditoría no lea estos cambios como desvíos:

- `figma_v2_contrato_visual.md` y `src/styles/index.css`: **una sola familia, Source Sans
  3**. Pasa a ser Source Sans 3 para texto, **Plus Jakarta Sans** para títulos y
  **JetBrains Mono** para etiquetas (cierra ART-08).
- **Regla 90/10 con acento único** (`acento-*`). Pasa a ser una paleta de marino y azul como
  acentos, celeste y verde agua solo decorativos, y un color por carrera y por página
  (ver ficha D1.1).
- El Figma v2 sigue mandando en **estructura, breakpoints (768/1024), estados y
  componentes**. Lo que cambia es la piel: colores, tipos, sombras, radios y movimiento.
- Las **olas** de la primera versión del artefacto **no vuelven**: Edith pidió líneas.

## Criterios de Aceptación

- **CA-07-01 · Sin cambios de contenido.** Dado que la HU solo agrega decoración, cuando
  comparo cada ruta antes y después, entonces el texto visible, el orden de las secciones,
  las rutas, los enlaces y los datos son los mismos. Los tests existentes siguen verdes sin
  cambiar sus expectativas de texto.
- **CA-07-02 · Tipografías.** Dado que el diseño aprobado usa tres familias, cuando se
  renderiza cualquier página, entonces los títulos (`h1`–`h4`) usan Plus Jakarta Sans, el
  texto usa Source Sans 3 y las etiquetas superiores y los rótulos técnicos usan JetBrains
  Mono, con respaldo de fuentes del sistema si no cargan.
- **CA-07-03 · Contraste.** Dado que la paleta tiene celestes y verdes claros, cuando hay
  texto sobre un fondo, entonces el contraste es de al menos **4,5:1** (o **3:1** para texto
  de 24 px o más, o 19 px en negrita), y los íconos, bordes de controles y el indicador de
  foco tienen al menos **3:1** contra su fondo.
- **CA-07-04 · Reducir movimiento.** Dado que tengo activado «reducir movimiento», cuando
  navego el sitio, entonces no hay animaciones en bucle, el telón no aparece y los bloques
  con aparición al scroll se ven de entrada.
- **CA-07-05 · Decoración invisible para tecnologías de asistencia.** Dado que uso lector de
  pantalla o teclado, cuando recorro una página, entonces ningún elemento decorativo
  (líneas, esferas, anillos, brillos, telón) recibe foco ni se anuncia: lleva
  `aria-hidden="true"` y no está en el orden de tabulación.
- **CA-07-06 · Telón de entrada.** Dado que entro al sitio por Inicio, cuando se carga la
  página, entonces el telón aparece **una vez por sesión**, dura **2,5 s o menos** y después el
  contenido queda usable. Si entro por un enlace directo a otra ruta, entonces el telón **no**
  aparece.
- **CA-07-07 · Medidas del contrato.** Dado que el contrato fija medidas, cuando mido a
  1440, 1024, 768 y 375 px, entonces:
  - el H1 mide como máximo 48 px en escritorio y 32 px en celular;
  - todo control interactivo tiene un área de al menos 44 × 44 px;
  - el texto del pie mide 12 px o más;
  - los accesos rápidos van en 2 columnas a 375 px;
  - no hay desborde horizontal.
- **CA-07-08 · Breakpoints.** Dado que el contrato usa 768 y 1024 px, cuando cambio el
  ancho, entonces los cambios de layout ocurren en esos dos cortes (se admiten ajustes
  finos solo si una ficha los justifica).
- **CA-07-09 · Líneas, no olas.** Dado que Edith pidió líneas, cuando se renderizan las
  portadas, el pie o las tarjetas, entonces la decoración usa líneas y no ondas.
- **CA-07-10 · Sin dependencias nuevas.** Dado que el bundle ya pesa unos 551 kB, cuando se
  implementa cualquier ficha, entonces no se agregan paquetes de npm de ejecución, y el
  tamaño de JS y CSS del build se informa en cada PR.
- **CA-07-11 · Guard de anotaciones.** Dado que existe
  `src/__tests__/anotaciones-no-renderizadas.test.ts`, cuando corro la suite, entonces sigue
  verde y ninguna nota de diseño aparece en pantalla.
- **CA-07-12 · Paridad visual.** Dado que el artefacto es la referencia, cuando comparo cada
  página con su captura de referencia (ficha D0.2), entonces la jerarquía, los colores, las
  tipografías y los efectos coinciden, salvo las diferencias que exigen los CA-07-03 a
  CA-07-09.

### Pendiente (no bloquea la HU)

- ⏳ Visto bueno del instituto (Edith) sobre la paleta y el telón; la decisión de diseño es
  del usuario y queda registrada en la ficha D0.1.
- ✅ Frecuencia del telón decidida el 19/11/2026: **una vez por sesión** (ficha D0.1).
- ⏳ Realineación del Figma v2 con la piel nueva, por UX/UI (no bloquea el código).

## Specification by Example

- **Futuro ingresante en el celular:** entra por Inicio, ve el telón con los logos menos de
  2,5 s, después la portada con líneas y esferas. Los accesos rápidos están en 2 columnas y
  ningún botón mide menos de 44 px.
- **Alumna con «reducir movimiento»:** entra por Inicio y no ve el telón; las líneas están
  quietas y todos los bloques aparecen de entrada. La información es la misma.
- **Usuario de lector de pantalla en una ficha de carrera:** recorre la página con Tab y el
  lector anuncia el título, el índice y los datos. Ni las esferas ni las líneas se anuncian.
- **Docente que entra por un enlace directo a `/docentes`:** no ve el telón; ve la portada de
  la página con su color, las migas y el contenido de siempre.

## Acceptance TDD

- Verificar que cada página de `src/pages/` conserva el texto que hoy esperan sus tests
  (no se tocan las expectativas de texto).
- Verificar que los componentes decorativos (`Lineas`, `Esferas`, `Telon` y los que defina
  D2) renderizan `aria-hidden="true"` y no tienen elementos enfocables.
- Verificar que con `matchMedia('(prefers-reduced-motion: reduce)')` el telón no se monta y
  el hook de aparición marca todo como visible.
- Verificar que el telón se monta solo en la ruta `/` y que se desmonta en 2,5 s o menos.
- Verificar el guard de anotaciones.
- Mediciones manuales o con Playwright a 1440, 1024, 768 y 375 px (H1, 44 px, pie, columnas,
  desborde, contraste), como en la auditoría del 18/11.

## Impacto técnico

- `index.html` (fuentes) y `src/styles/index.css` (`@theme`: paleta, tipografías, radios,
  sombras, curvas).
- Nueva carpeta `src/styles/deco/` con el CSS que no conviene escribir en utilidades
  (líneas, esferas, telón, acordeón, carrusel).
- Nuevos componentes en `src/components/ui/deco/` (o la ubicación que fije D0.3) y un hook de
  aparición.
- Retoque visual de `components/layout/` (`Header`, `NavMenu`, `MobileMenu`, `Footer`,
  `EncabezadoPagina`), de `components/ui/` (`Button`, `Badge`, `Eyebrow`, `CardCarrera`,
  `CardNoticia`, `FaqAcordeon`, `AccesosRapidos`, `CarruselInstitucional`) y de las páginas.
- Nueva constante de color por carrera y por página, indexada por slug, en la línea de
  `src/constants/cursadaCarreras.ts`.
- Tests nuevos de accesibilidad decorativa y de «reducir movimiento».

## Fuera de alcance

- Cualquier cambio de contenido, de datos, de rutas o de navegación (HU-03 a HU-06).
- Contenidos ⏳ del instituto (fotos del carrusel, presentaciones, resoluciones).
- El panel de administración (`/admin*`), que mantiene su `AdminLayout`.
- La transición «wipe» entre páginas, la pantalla de carga, el carrusel de eventos y los
  campos con etiqueta flotante: el build v2 ya no los usa
  (`referencia_visual_v2/css/98_obsoleto_no_portar.css`).

## Referencias

IFTS N.º 12. (2026, 18 de noviembre). *IFTS N.º 12 · Vista previa v2* [Artefacto web,
versión `1795021175-002d`]. https://claude.ai/artifact/DtCfnn3GdmtYkCLbix8mPb

IFTS N.º 12. (2026, 18 de noviembre). *Auditoría del artefacto web del sitio IFTS N.º 12
contra la documentación del proyecto (v1)*. `docs/06_audits/audit_2026-11-18-artefacto-web.md`.

IFTS N.º 12. (2026, 13 de octubre). *Figma v2 — contrato visual de referencia*.
`docs/01_global/figma_v2_contrato_visual.md`.

IFTS N.º 12. (2026). *Reglas de negocio transversales* (RN-11, RN-12).
`docs/01_global/reglas_negocio.md`.

W3C. (2023). *Web Content Accessibility Guidelines (WCAG) 2.2* (criterios 1.4.3, 1.4.11,
2.3.3 y 2.5.5). https://www.w3.org/TR/WCAG22/
