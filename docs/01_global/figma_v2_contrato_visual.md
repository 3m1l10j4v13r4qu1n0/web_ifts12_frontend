---
# Tags del índice de memoria (D13): el CLI las scaffoldea, el Mentat ajusta.
tags:
  - figma
  - contrato
  - visual
  - ux
  - ui
---

# Figma v2 — contrato visual de referencia

> Documento de Capa 1 — Especificación. Registra al archivo "IFTS 12 v2 - alineado a
> contratos" como la referencia visual vigente del sitio y deja sin efecto al Figma
> anterior "IFTS 12 PC". No agrega alcance nuevo ni inventa datos institucionales:
> define estructura visual y componentes, no contenidos.

Fecha: 2026-10-13 · Estado: vigente

## Resumen

El archivo de Figma **"IFTS 12 v2 - alineado a contratos"** (fileKey `MHBgrLD9g8ka6sX6ezkO1l`)
es la **referencia visual vigente** del sitio institucional del IFTS N.º 12. Fue creado a
partir del plan del 09/10/2026 y del prompt que lo originó, y **reemplaza** al Figma
anterior "IFTS 12 PC" (fileKey `r3OmvrMfGmi2rKjK9TuC7j`), que la auditoría del 09/10/2026
descalificó como contrato por desvíos bloqueantes (B1–B4, B6–B8, I8, I11, I12), menú
incompleto y diseño solo para PC.

El v2 se construyó alineado a los contratos vigentes: análisis funcional validado
(RF-01…RF-34), Mapa del Sitio V2 (9 ítems + buscador), correcciones B1–B9 / I1–I12 / M1–M7,
wireframes HTML y el estado real del código (navegación, enlaces y estilos).

## Qué establece

1. **Contrato visual vigente.** El Figma v2 es la fuente de verdad de diseño: estructura
   de pantallas, layout por breakpoint, estados de interfaz, specs y componentes. El
   código del frontend debe alinearse a él, y las correcciones B/I/M de
   `docs/01_global/correcciones_ux_ui_frontend.md` se validan contra esta referencia.
2. **Reemplazo del Figma viejo.** "IFTS 12 PC" queda **sin efecto** como contrato: su
   auditoría determinó que no debe tomarse como referencia (login de Campus en lugar de
   admin, red social "Comunidad de alumnos", homes duplicadas, 4 ítems de menú en header,
   logos recreados, contenido inventado). Si un artefacto visual anterior (wireframes V1,
   Figma viejo) contradice al v2, **manda el v2**.
3. **Estructura verificada del v2.** 9 páginas: Cover, Fundaciones, Componentes, Desktop,
   Tablet, Mobile, Estados, Specs y Archivo; **24 componentSets con variantes**. Las
   páginas Desktop/Tablet/Mobile y Specs atienden el déficit de responsive y de specs que
   tenía el Figma viejo (B6, M7).
4. **Anti-alucinación.** El v2 define estructura visual, componentes y estados, pero **no
   autoriza contenido institucional**: textos definitivos, URLs oficiales (Moodle, SIU,
   inscripción), logos de alta resolución, autoridades, correos y fechas siguen pendientes
   de fuente oficial (B7, B8, I5, I6, I8, I10, M2). La tensión AF-A6 (7 vs 9 accesos
   rápidos) sigue abierta con UX/UI.
5. **Uso en verificación.** Las próximas auditorías de UX/UI comparan contra el v2 (no
   contra el Figma viejo). Un frame o página del v2 se considera referencia solo si existe
   en este archivo.

## Fuente

- Origen del v2: prompt `documentacion/driveFrontend/02_ux_ui/prompt_figma_make_v2.md`
  (2026-10-09; no versionado, vive en el Drive).
- Figma v2: "IFTS 12 v2 - alineado a contratos", fileKey `MHBgrLD9g8ka6sX6ezkO1l`.
- Figma viejo descalificado: "IFTS 12 PC", fileKey `r3OmvrMfGmi2rKjK9TuC7j`, auditado en
  `docs/06_audits/audit_2026-10-09-figma.md` (2026-10-09).
- Contratos de origen: `documentacion/frontend/analisis_funcional_validado.md`
  (2026-09-18), `documentacion/driveFrontend/02_ux_ui/mapa_sitio_ifts12_(V2).md`
  (2026-09-15), `docs/01_global/correcciones_ux_ui_frontend.md` (2026-10-08), wireframes
  HTML (`documentacion/wireframes/`), `src/constants/navegacion.ts`,
  `src/constants/enlaces.ts`, `src/styles/index.css`.

## Breakpoints

- Tablet: desde 768px (`--breakpoint-sm: 48rem`).
- Escritorio: desde 1024px (`--breakpoint-md: 64rem`).
- Se aplicaron en Tailwind v4 (`src/styles/index.css`) y en `NavMenu`, `MobileMenu`, `Header`.
- Móvil: < 768px.

## Historial

- 2026-10-09: auditoría del Figma viejo y plan del v2 (fuentes a considerar).
- 2026-10-13: publicado el Figma v2; este documento lo registra como contrato visual
  vigente y absorbe el plan (plan ejecutado).