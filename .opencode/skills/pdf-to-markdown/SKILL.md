---
name: pdf-to-markdown
description: convierte archivos PDF a Markdown con detección automática entre texto nativo y documentos escaneados (OCR). Usar cuando se necesite pasar a Markdown los PDFs de documentacion/driveFrontend/ (minutas, análisis funcional, especificaciones) u otro PDF del proyecto. La implementación vive en el skill global ~/.config/opencode/skills/pdf-to-markdown/.
---

# pdf-to-markdown

Convierte archivos PDF a formato Markdown con detección automática de texto nativo vs. documentos escaneados.

> Nota de migración: la implementación completa (scripts, tests, `package.json` y `node_modules`)
> vive en el skill **global** `~/.config/opencode/skills/pdf-to-markdown/`. Este archivo solo
> referencia al global (misma herramienta y flags) para mantener compatibilidad con las referencias
> locales del repo. No editar acá.

## Uso (desde el skill global)

```bash
cd ~/.config/opencode/skills/pdf-to-markdown

# convertir PDF a Markdown (modo auto por defecto)
node scripts/convert.cjs -i <entrada.pdf> -o <salida.md>

# ejecutar tests
npm test
```

Limitaciones conocidas: layouts multi-columna imperfectos, fórmulas matemáticas mal convertidas.
OCR para PDFs escaneados requiere setup adicional de `tesseract.js` (`npm install` en el global).