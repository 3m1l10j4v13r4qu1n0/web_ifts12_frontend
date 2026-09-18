# Reglas de Formato APA para Documentación de Software (adaptado a Markdown)

Normas APA 7.ª edición adaptadas al formato real del proyecto: documentación
**Markdown** dentro de `docs/` (informes, minutas, SSD, auditorías). Aplica a todo
documento nuevo que se genere en el repo. Complementa la plantilla de
`.agents/skills/apa-software-doc/SKILL.md`.

## Estructura del Documento

1. Título descriptivo y fecha (encabezado `#`) — indicar estado si aplica (borrador, validado).
2. Resumen de 150-250 palabras (sección `## Resumen`).
3. Contenido principal (Introducción, Metodología, Resultados, Discusión) en secciones jerárquicas.
4. Referencias bibliográficas (sección `## Referencias`).
5. Apéndices para material complementario (sección `## Apéndices` con sub-apéndices).

## Formato General (Markdown)

- **Títulos:** jerarquía estricta `#` (nivel 1) → `##` → `###` → `####`, sin saltos de nivel.
- **Encabezados con contenido propio:** acabados en dos puntos si se introducen tablas/listas.
- **Texto:** párrafos separados por línea en blanco; negrita (`**`) para destacar decisiones y
  reglas; cursiva (`*`) para términos extranjeros.
- **Énfasis mínimo:** no abusar de negrita/cursiva; mantener legibilidad.
- **Listas:** usar listas ordenadas (`1.`) para pasos secuenciales y viñetas para alternativas.
- **Alineación del texto:** izquierda (sin justificar), margen derecho irregular.
- **En Markdown no aplican** tamaño de papel, márgenes en cm ni fuentes tipográficas: el render
  lo define el visor. Respetar un ancho de línea razonable (~80-100 caracteres) en el código fuente.

## Títulos y Subtítulos

| Nivel de título | Formato en Markdown |
|---|---|
| Nivel 1 | `#` — Incluido, Negrita, Primera Letra de Palabras Clave en Mayúscula |
| Nivel 2 | `##` — Negrita, Primera Letra de Palabras Clave en Mayúscula |
| Nivel 3 | `###` — Negrita, Primera Letra de Palabras Clave en Mayúscula |
| Nivel 4 | `####` — Negrita, cursiva, en línea con el párrafo |
| Nivel 5 | `#####` — Cursiva, en línea con el párrafo |

> En Markdown el negrita/cursiva de los encabezados no se transpila: la jerarquía de `#` marca
> el nivel real. La tabla indica el nivel semántico equivalente a APA.

## Citas y Referencias

- Sistema: **Autor-Fecha** (tal cual APA).
- Cita narrativa: `Autor (Año)`.
- Cita en paréntesis: `(Autor, Año)`.
- Cita textual (<40 palabras): llamada en línea con comillas dobles en el texto.
- Cita en bloque (>40 palabras): bloque citado (`>`) con sangría propia.
- Referencias: listado al final, con entradas ordenadas alfabéticamente por autor.
- Para fuentes digitales (documentación oficial, librerías, documentos del Drive del
  instituto): incluir versión si existe y fecha de acceso.

## Anti-alucinación documental

- Las citas a documentos internos deben apuntar a rutas **reales** del repo o de
  `docs/driveFrontend/` (verificadas en la sesión).
- No citar ni inventar autores, fechas o URLs sin verificar la fuente.
- Marcadores de estado: ✅ listo / 🟡 parcial / 🔵 pendiente externo / ⏳ en proceso.