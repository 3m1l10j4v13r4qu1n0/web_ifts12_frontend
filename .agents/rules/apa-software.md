# Reglas APA para Proyectos de Software (adaptado a este proyecto)

Normas APA 7.ª edición adaptadas al frontend del sitio del IFTS N.º 12 y a la
documentación Markdown de `docs/`. Aplica a todo documento generado en el repo.
Complementa `.agents/rules/apa-formato.md` (formato) y la plantilla de
`.agents/skills/apa-software-doc/SKILL.md`.

## Uso de Código

- Código en texto: resaltado inline con backticks (`` ` ``), fuente monoespaciada del visor.
- Bloques de código: fenced blocks con lenguaje (` ```tsx `, ` ```ts `, ` ```bash `).
- Snippets largos (>30 líneas): no inline; mover a `docs/snippets/` o un Apéndice y citarlo.
- Siempre que se muestre código, indicar el archivo de origen real (ruta del repo).

## Diagramas y Figuras

- Diagramas de arquitectura / flujos de trabajo: figura con título descriptivo
  (`Figura N.`), referenciada desde el texto.
- En Markdown usar código Mermaid si se renderiza (` ```mermaid `). (Verificar soporte del
  visor antes de usarlo; si no, imagen estática con `alt` descriptivo.)
- Capturas de pantalla: figura con nota de atribución si es necesario.
- Toda figura debe estar numerada y titulada; no se puede citar "ver figura 2" si no está
  numerada.

## Tablas de Datos

- Tabla de comparación de tecnologías: encabezados claros y consistentes.
- Tabla de requisitos (RF / matriz fijo-administrable): numeración secuencial y formato
  consistente entre filas.
- Tabla de resultados de pruebas / auditorías: estados con la leyenda del proyecto
  (✅ / 🟡 / 🔵 / ⏳) y datos presentados de forma clara.
- En Markdown: tablas con sintaxis GFM (`|` y separador `|---|`), encabezado en singular
  coherente con el contenido.

## Referencias Técnicas

- Documentación de APIs: citar versión y fecha de acceso.
- Repositorios de código: incluir hash (commit) o versión específica.
- Herramientas de desarrollo: citar versión y autor/organización.
- Documentos del instituto (`docs/driveFrontend/`): citar ruta exacta verificada y estado
  de validación (fuente única de verdad: `docs/frontend/analisis_funcional_validado.md`).

## Checklist de Documentación

- Portada → título descriptivo + fecha (y estado: borrador/validado).
- Resumen de 150-250 palabras.
- Estructura jerárquica de títulos (sin saltos de nivel).
- Formato APA aplicado (autor-fecha en citas y referencias).
- Código con fuente monoespaciada y lenguaje especificado.
- Figuras y tablas numeradas y tituladas.
- Citas con sistema autor-año.
- Referencias bibliográficas completas.
- Apéndices para material complementario.
- Sin contenido institucional inventado: textos, URLs, logos y datos pendientes del
  instituto se marcan 🔵/⏳.
- Releer el documento tras escribirlo antes de considerarlo terminado.