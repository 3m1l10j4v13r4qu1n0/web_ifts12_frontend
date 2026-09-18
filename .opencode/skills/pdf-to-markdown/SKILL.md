---
name: pdf-to-markdown
description: convierte archivos PDF a Markdown con detección automática entre texto nativo y documentos escaneados (OCR). Usar cuando se necesite pasar a Markdown los PDFs de docs/driveFrontend/ (minutas, análisis funcional, especificaciones) u otro PDF del proyecto.
disable-model-invocation: true
---

# pdf-to-markdown

Convierte archivos PDF a formato Markdown con detección automática de texto nativo vs. documentos escaneados.

## Objetivo

Pasar a Markdown los PDFs del proyecto (fuente de verdad en `docs/driveFrontend/`) para poder
compararlos, citarlos y auditarlos contra la documentación del repo. El resultado típico se
guarda junto al análisis funcional (`docs/frontend/`) para alimentar la fuente única de verdad
`docs/frontend/analisis_funcional_validado.md`.

## Resumen rápido

**Meta:** convertir PDF a Markdown bien formateado, detectando automáticamente si tiene texto
nativo o necesita OCR.

**Flujo:**
1. **Auto-detectar** — determinar si el PDF tiene texto nativo o necesita OCR
2. **Convertir** — correr `scripts/convert.cjs` con la ruta de entrada y flags opcionales de modo/salida
3. **Salida** — devuelve JSON con estado de éxito, cantidad de páginas y ruta de salida

**Reglas clave:**

- Usar `--mode auto` (por defecto) para dejar que la herramienta decida entre nativo y OCR
- OCR para PDF escaneados requiere setup adicional de `tesseract.js`
- Los layouts complejos de varias columnas pueden no preservar la estructura perfectamente

## Dependencias

El skill trae su propio `package.json` en `.opencode/skills/pdf-to-markdown/`. Si falta
`node_modules`, instalarlas una sola vez:

```bash
cd .opencode/skills/pdf-to-markdown
npm install
```

**Dependencias:** `@opendocsg/pdf2md` (PDFs nativos), `pdfjs-dist` (parsing de PDF).

**Nota:** el OCR para PDF escaneados requiere setup adicional (ver sección OCR).

## Uso rápido

```bash
# Conversión básica (auto-detecta nativo vs escaneado)
node .opencode/skills/pdf-to-markdown/scripts/convert.cjs --input ./document.pdf

# Especificar ruta de salida
node .opencode/skills/pdf-to-markdown/scripts/convert.cjs -i ./doc.pdf -o ./output.md

# Forzar modo nativo (saltear detección de OCR)
node .opencode/skills/pdf-to-markdown/scripts/convert.cjs -i ./doc.pdf --mode native
```

## Opciones CLI

| Opción        | Corto | Descripción                                     | Por defecto      |
| ------------- | ----- | ----------------------------------------------- | ---------------- |
| `--input`     | `-i`  | Ruta del PDF de entrada                         | (requerido)      |
| `--output`    | `-o`  | Ruta del markdown de salida                     | `{input}.md`     |
| `--mode`      | `-m`  | Modo de conversión: `auto`, `native`, `ocr`     | `auto`           |
| `--help`      | `-h`  | Muestra el mensaje de ayuda                     |                  |

También acepta el PDF como argumento posicional: `node .../convert.cjs archivo.pdf`.

## Ejemplos de uso en el proyecto

```bash
node .opencode/skills/pdf-to-markdown/scripts/convert.cjs \
  -i "docs/driveFrontend/01_analisis_funcional/Analisis funcional todo unificado IFTS 12.pdf" \
  -o docs/frontend/analisis_funcional_unificado.md
```

## Características

- **Auto-Detección:** determina automáticamente si el PDF tiene texto nativo o requiere OCR
- **PDFs nativos:** extracción rápida con `@opendocsg/pdf2md`
- **Tablas:** preservación básica de la estructura de tablas
- **Multi-OS:** funciona en Windows, macOS y Linux
- **Sin dependencias de sistema:** implementación en JavaScript puro

## Modos de conversión

### Auto (por defecto)

Detecta si el PDF tiene texto extraíble en la primera página. Usa extracción nativa si hay
texto; si no, avisa que se necesita OCR.

### Nativo

Extracción directa y rápida de texto. Mejor para PDFs con texto seleccionable (no escaneados).

### OCR (PDFs escaneados) — Próximamente

Para documentos escaneados. Actualmente no implementado — el skill avisa si un PDF parece
escaneado.

## Salida

Devuelve JSON en caso de éxito:

```json
{
    "success": true,
    "input": "/path/to/input.pdf",
    "output": "/path/to/output.md",
    "stats": {
        "pages": 5,
        "mode": "native"
    }
}
```

## Códigos de salida

| Código | Significado |
| ------ | ----------- |
| 0      | Éxito       |
| 1      | Error       |

## Ejecutar los tests

```bash
cd .opencode/skills/pdf-to-markdown
npm test
```

## Limitaciones

- Los layouts complejos de varias columnas pueden no preservar la estructura
- La precisión del OCR de PDFs escaneados depende de la calidad de imagen
- Las fórmulas matemáticas pueden no convertir perfectamente
- El OCR en primera ejecución descarga datos de idioma (~15MB)

## Setup de OCR (opcional)

Para soporte de PDFs escaneados, instalar las dependencias adicionales:

```bash
cd .opencode/skills/pdf-to-markdown
npm install tesseract.js pdfjs-dist canvas
```

**Nota:** el paquete `canvas` puede requerir herramientas de build en algunos sistemas.

## Anti-alucinación

- El PDF convertido es material de trabajo: antes de citarlo como fuente de verdad, verificarlo
  contra los PDFs aprobados en `docs/driveFrontend/` (regla `.agents/rules/auditoria-documentacion.md`).
- No inventar contenido que no aparezca en el PDF convertido.
- Si la conversión pierde estructura (tablas, columnas), avisarlo y pedir revisión en vez de
  "arreglarlo" adivinando.