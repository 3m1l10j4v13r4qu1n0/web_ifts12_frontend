# Análisis estético comparativo — FLACSO e IFTS11 aplicado a IFTS12

**Fecha:** 2026-10-09
**Estado:** Solo lectura

## 1. Comparativa por eje

### 1.1 Paleta de colores

| Rol | FLACSO | IFTS11 | Lectura |
|---|---|---|---|
| Primario | Azul `#005581` (links, header, breadcrumb) | Azul `#03a9f4`, hover `#0299de`, `#335996`/`#163970`/`#3471E3` | FLACSO más coherente (1 azul). IFTS11 usa varios azules |
| Acento por sección | Rojo `#BA0C2F`/`#b61b2d`, Verde `#228848`, Ámbar `#F2A900`, Cian `#0092BC`, Naranja `#DC582A` | Verde `#4caf50`, Amarillo `#fbc02d`, Violeta `#9c27b0` | FLACSO codifica categoría (wayfinding). IFTS11 decorativo |
| Neutros | Fondo `#f1f2ec`, texto `#333`, gris `#777`, borde `#ccc`/`#dedfda`, blanco `#fff` | Texto `#666`, footer `#222`, fondo `#ebebeb`, borde `#e0e0e0`, blanco | Ambos con grises + blanco + bordes finos |
| Overlays | `rgba(color-sección, 0.84–0.94)` | `#38546B` @ 0.26 + caja blanca con blur(10) | FLACSO tonifica con color de sección; IFTS11 usa blanco translúcido |

### 1.2 Tipografías

| Eje | FLACSO | IFTS11 |
|---|---|---|
| Familia | Cuerpo Helvetica/Arial; títulos/nav/asides **Myriad Pro** (Typekit, pago) | Cuerpo **Source Sans Pro**; Google Fonts |
| Base | 13px / line-height 1.5 | 18px / 130% / weight 300 |
| Escala | H1 35, H2 24, H3 20, H4 16, H5 13 px | H1 3em/600, H2 2.22em/300, H3 1.44em/600, H4 1.11em, H5 1em, H6 1em |
| Nav | Myriad Pro 16px, uppercase, 600 | Source Sans Pro 1em, uppercase, letter-spacing 3 |

### 1.3 Espaciado, grid, breakpoints, ritmo

| Eje | FLACSO | IFTS11 |
|---|---|---|
| Contenedor | Fijo **992px** (viewport width=992) | Fluido `gridContainer` con 15px lateral |
| Grid | 12 columnas (61px + 20 gutter) | cp3/cp4/cp6, flex |
| Breakpoints | No responsive real | Mobile-first real; menú mobile overlay |
| Ritmo | margin-bottom 35–50; alturas fijas | padding 50; footer 222 |

### 1.4 Componentes visuales

| Componente | FLACSO | IFTS11 |
|---|---|---|
| Hero | Carrusel + aside 3/12; H1/H2 + "Leer más" | Full-bleed + caja translúcida con blur + 2 botones |
| Botones | Cuadrado `#005581`, uppercase, sin radius | `.button` radius 4, uppercase, tracking, sombra material, hover |
| Tarjetas | Imagen + título sobre overlay color + categoría + CTA pie | Blanca, radius 3, sombra, borde inferior 5px de acento |
| Header/nav | 153px blanco, topMenu + mainMenu + buscador | Transparente sobre hero, uppercase, dropdown oscuro, sticky |
| Footer | Blanco 375px, columnas, sprite social | `#222`, borde superior 5px azul, Font Awesome |
| Links/íconos | `#005581` sin subrayado, hover opacidad | `#03a9f4`, hover subrayado, Font Awesome |

### 1.5 Estilo general
- **FLACSO:** editorial/académico clásico, suizo (Swiss), codifica por color de área.
- **IFTS11:** corporativo template, hero onepage + sombras + botones uppercase.
- **Recomendado:** Flat/Minimal + Swiss (1 color de acento + neutros + grilla fluida + una sola familia) — alineado a reglas 90/10.

## 2. Elementos a tomar prestados (sin copiar)

**De FLACSO:**
1. Color por categoría (secciones Mapa V2) — eyebrow/breadcrumb.
2. Overlay tonificado con color de sección sobre fotos (no negro puro).
3. Tarjeta retrato con título superpuesto y CTA al pie.
4. Jerarquía "titular grande + cuerpo chico" con 1 familia.

**De IFTS11:**
5. Sistema de botones (variantes, tamaños, sombra suave, hover).
6. Hero con caja translúcida (blur) legible sobre imagen.
7. Borde inferior de acento en tarjetas.
8. Base 16–18px, line-height 130%.
9. Footer con íconos de contacto (con `aria-label`).

**No tomar:** layout no-responsive 992px (FLACSO), paleta multicolor + wallpapers stock (IFTS11), Myriad Pro (pago), Playfair Display, textos/logos.

## 3. Tokens Tailwind v4 para IFTS12 (provisional)

```css
@import "tailwindcss";

@theme {
  --font-sans: "Source Sans 3", "Segoe UI", system-ui, -apple-system, sans-serif;

  --text-xs: 0.75rem; --text-xs--line-height: 1.4;
  --text-sm: 0.875rem; --text-sm--line-height: 1.5;
  --text-base: 1rem; --text-base--line-height: 1.6;
  --text-lg: 1.125rem; --text-lg--line-height: 1.55;
  --text-xl: 1.25rem; --text-xl--line-height: 1.5;
  --text-2xl: 1.5rem; --text-2xl--line-height: 1.35;
  --text-3xl: 1.875rem; --text-3xl--line-height: 1.25;
  --text-4xl: 2.25rem; --text-4xl--line-height: 1.15;
  --text-5xl: 3rem; --text-5xl--line-height: 1.1;

  --spacing-seccion-sm: 2.5rem;
  --spacing-seccion-md: 4rem;
  --spacing-seccion-lg: 6rem;
  --spacing-touch: 2.75rem;

  /* Acento PROVISIONAL — reemplazar cuando UX/UI entregue */
  --color-acento-50: #eff6ff;
  --color-acento-100: #dbeafe;
  --color-acento-200: #bfdbfe;
  --color-acento-500: #3b82f6;
  --color-acento-600: #2563eb;
  --color-acento-700: #1d4ed8;
  --color-acento-800: #1e40af;

  --color-exito: #15803d;
  --color-error: #b91c1c;
  --color-aviso: #b45309;
  --color-info: #1d4ed8;
}
```

## 4. Ajustes sugeridos a componentes existentes

| Componente | Ajuste | Corrige |
|---|---|---|
| Button | min-h-11 (44px), variants, tamaño sm | B9, M6 |
| Header | burger 44×44, acento hovers, mantener top bar | B6, M6 |
| Cards | rounded-lg, sombra suave, borde inferior acento opcional, 2 columnas en móvil | B4, M3, M5 |
| Footer | íconos con aria-label, enlaces secundarios | I10, M4 |
| Hero/Carrusel | overlay tonificado con color sección + variante blur | M1 |
| Iconografía | lucide-react (open source, accesible) | M4 |

## 5. Mapeo con correcciones

| ID | Acción |
|---|---|
| B6 | No copiar 992px; mantener fluido + tablet propio |
| B8 | Usar logos existentes (`public/IFTS12.jpg`, `logoCABA.png`, `logoUpcn.png`) |
| B9 | Usar tokens provisionales hasta entrega UX/UI |
| I2 | Estados (exito/error/aviso/info) en @theme |
| I10 | Footer legible, sin correo inventado |
| M3–M7 | Unificar lenguaje, íconos, táctil, breakpoints estándar |

## 6. Advertencias

- Paleta/tipografía definitivas = UX/UI (B9, M7). Los valores son **reemplazables**.
- No Myriad Pro (pago). No wallpapers stock.
- Navegación sigue Mapa V2 (9 ítems). Tensión AF-A6 (7 vs 9) sin resolver.
- Solo lectura; ningún archivo modificado.
