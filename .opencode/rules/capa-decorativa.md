# Regla: capa decorativa (HU-07)

> Capa 5 — Proceso. Aplica a toda tarea de la HU-07 «Identidad visual del sitio» (fichas
> D0 a D6 de `docs/04_user_stories/HU-07/hu_07_fichas.md`). Se suma a
> `integracion-test.md`, `flujo-git.md` y `versionado-fases.md`; si algo choca, mandan
> esas tres.
>
> **Precedencia visual:** en piel (colores, tipografías, sombras, radios y movimiento), lo que
> pide HU-07 y sus fichas prevalece sobre `docs/01_global/figma_v2_contrato_visual.md` y sobre
> la regla 90/10: es la decisión del usuario del 18/11 (sección «Reemplaza» del README de la
> HU). Las tres reglas de proceso citadas arriba siguen mandando **en proceso**; esto no las
> modifica.

## 1. Al empezar una ficha

1. Leer `docs/project_state.md` (como en toda sesión).
2. Leer **solo** la carpeta `docs/04_user_stories/HU-07/`: `README.md` (CA),
   `hu_07_pruebas.md` (escenarios) y la ficha pedida en `hu_07_fichas.md`.
3. Abrir de `documentacion/referencia_visual_v2/css/` **solo** los archivos y líneas que
   cita la ficha. Ante dos valores para la misma regla, vale el archivo de número mayor
   (el `90_` manda sobre todos).
4. Crear la rama desde la base vigente (`fix/integracion-test-20261031` mientras rija el modo
   test): `git fetch` → `checkout` de la base → `pull` → `checkout -b
   feature/hu07-<id-ficha>-<tema>` (ej.: `feature/hu07-d1-1-paleta`).
5. Capturar el texto visible de las rutas que toca la ficha (`innerText` de `header`, `main`
   y `footer`) **antes** de cambiar nada. Sirve para el CA-07-01.

## 2. Prohibido

- Cambiar textos, datos, rutas, enlaces, el orden de las secciones o la navegación. Si la
  referencia trae un texto distinto del repo, **manda el repo**.
- Traer contenido del artefacto que no está en el repo (ej.: «Entidad conveniante», subte B,
  fotos o nombres).
- Agregar dependencias de npm de ejecución (animación, carruseles, íconos nuevos, CSS-in-JS).
  Los archivos de fuentes `woff2` en `public/` no cuentan como dependencia.
- Portar lo que está en `98_obsoleto_no_portar.css`.
- Copiar los breakpoints del build o los nombres genéricos de clase (ver §4 y §5).
- Dibujar olas. La decoración es de líneas.
- Tocar `/admin*` y su `AdminLayout`.
- Modificar expectativas de texto en tests existentes para que pasen.

## 3. Dónde va cada cosa

| Qué | Dónde |
|---|---|
| Colores, tipografías, radios, sombras, curvas | `@theme` de `src/styles/index.css` |
| Estilos que se escriben bien con utilidades | Clases de Tailwind en el JSX del componente |
| Keyframes, pseudo-elementos, selectores con estado, clases de SVG, `color-mix()` | `src/styles/deco/<pieza>.css` dentro de `@layer components`, importado desde `index.css` |
| Piezas decorativas reutilizables | `src/components/ui/deco/` (un componente por pieza) |
| Hooks (aparición al scroll, movimiento reducido) | `src/hooks/` |
| Color por carrera y por página | Constante en `src/constants/` indexada por slug (ficha D1.4) |

## 4. Nombres

Kebab-case en español, como las utilidades que ya existen (`revelar`, `tarjeta-elevable`).
Nunca nombres genéricos de una o dos letras ni los del build que chocan con el repo:

| En el build | En el repo |
|---|---|
| `.btn`, `.btn.ghost`, `.btn.sm` | Variantes y tamaños del componente `Button` existente |
| `.lnk` | `enlace-animado` |
| `.chip` | Variante del componente `Badge` |
| `.tbd`, `.ph-tbd` | Variante `pendiente` de `Badge` (un solo estilo para lo pendiente, PROTO-11) |
| `.eyebrow` | Componente `Eyebrow` existente |
| `[data-r]`, `.in` | Utilidad `revelar` existente + hook de aparición |
| `.split`, `.sw` | `titulo-revelado` |
| `.card` | `tarjeta-elevable` existente (extenderla, no duplicarla) |
| `.cc`, `.glare`, `.idx` | `tarjeta-carrera`, `tarjeta-carrera-brillo`, `tarjeta-carrera-numero` |
| `.q` | `acceso-rapido` |
| `.feat`, `.fs`, `.fbar`, `.fnav` | `carrusel`, `carrusel-diapositiva`, `carrusel-progreso`, `carrusel-controles` |
| `.mega` | `menu-desplegable` |
| `.mmenu`, `.burger` | `menu-movil`, `boton-menu` |
| `.so`, `.sbox`, `.sres` | `buscador-capa`, `buscador-caja`, `buscador-resultados` |
| `.fq`, `.pm`, `.ans` | `faq-item`, `faq-icono`, `faq-respuesta` |
| `.lineas`, `.lf-*`, `.esfera*`, `.telon*`, `.mo-*` | Se conservan (ya están en español) |
| `.dashring` | `anillo-punteado` |
| `.wrap` | Contenedor existente `max-w-contenido` |

Si una clase del build no está en la tabla, la ficha propone el nombre y lo agrega acá.

## 5. Breakpoints

El repo usa `sm` = 768 px (tablet) y `md` = 1024 px (escritorio). Equivalencias:

| Corte del build | En el repo |
|---|---|
| ≤ 520, 560, 640 px | Estilo base (celular, < 768) |
| ≤ 780, 900, 1020 px | `sm:` (768 a 1023) |
| ≤ 1240, 1400, 1560 px | `md:` (≥ 1024). Si a 1024 no entra, se resuelve achicando, no con un corte nuevo |

Un corte intermedio solo se admite si la ficha lo justifica con una captura.

## 6. Accesibilidad y movimiento

- Todo elemento decorativo lleva `aria-hidden="true"`, no tiene `tabIndex` y no contiene
  enlaces ni botones. Si una esfera muestra un dato real (ej.: novedad destacada), el dato
  va además en el DOM accesible.
- Toda animación en bucle o de entrada se apaga con `prefers-reduced-motion: reduce`. Usar
  el hook común, no un `matchMedia` suelto por componente.
- Texto normal ≥ 4,5:1. Texto grande, íconos, bordes de controles y foco ≥ 3:1. Colores que
  **no** van como texto normal sobre fondo claro: celeste `#4aa3d4` (2,81:1), celeste claro
  `#8fd0f0` (1,69:1), verde `#22a650` (3,16:1), aguamarina `#1e8a7e` (4,21:1). Para etiquetas
  de color, usar la mezcla del build: `color-mix(in srgb, <color> 62%, #0b2c5e)`.
- Indicador de foco: no usar celeste sobre blanco. Ver ficha D1.5.
- Áreas táctiles ≥ 44 × 44 px; H1 ≤ 48/32 px; pie ≥ 12 px.

## 7. Antes de pedir el PR

- [ ] `npm run lint` · `npm run build` · `npm run test` en verde.
- [ ] Guard `anotaciones-no-renderizadas.test.ts` en verde.
- [ ] Texto visible igual al capturado en el paso 1.5 (CA-07-01).
- [ ] Capturas a 1440 y 375 px de las rutas que toca la ficha, junto a la captura de
      referencia (D0.2).
- [ ] Tamaño de JS y CSS de `dist/` antes y después, en la descripción del PR.
- [ ] «Listo cuando» de la ficha, punto por punto.
- [ ] `logsayer check` en verde.

## 8. Al cerrar

- Con aprobación del usuario: `logsayer log add "HU-07 · <ficha>: <qué se hizo>"`.
- Marcar la ficha como hecha en `hu_07_fichas.md` (estado, rama y PR). No reescribir el
  `project_state.md` por cada ficha: se actualiza al cerrar cada fase (D0…D6).
- Si la ficha dejó una decisión nueva (nombre, corte, color), se escribe en la ficha y, si es
  transversal, en la §4 o §5 de esta regla.
