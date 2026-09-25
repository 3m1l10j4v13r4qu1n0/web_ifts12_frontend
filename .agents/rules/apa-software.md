# Reglas APA para Proyectos de Software (adaptado a este proyecto)

> Nota de migración: las pautas APA de código, figuras, tablas y referencias
> técnicas son **globales** (`~/.config/opencode/rules/apa.md`, cargada vía
> `instructions`). Este archivo conserva solo lo específico del repo.

## Específico del repo

- Snippets largos (>30 líneas): mover a un Apéndice del mismo documento o a `documentacion/snippets/` y citarlo;
  indicar siempre el archivo de origen real.
- Diagramas: usar Mermaid si el visor lo soporta; si no, imagen estática con `alt` descriptivo.
- Tablas: sintaxis GFM (`|` + separador `|---|`); estados con la leyenda del
  proyecto (✅ / 🟡 / 🔵 / ⏳).
- Documentos del instituto (`documentacion/driveFrontend/`): citar ruta exacta verificada y
  estado de validación (fuente única: `documentacion/frontend/analisis_funcional_validado.md`).
- Sin contenido institucional inventado: textos, URLs, logos y datos pendientes se
  marcan 🔵 / ⏳.