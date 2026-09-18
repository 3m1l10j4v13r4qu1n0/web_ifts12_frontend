---
name: apa-software-doc
description: plantilla y ejemplos para documentar software del proyecto con normas APA 7.ª edición adaptadas a Markdown. Usar al generar o auditar documentación del repo (informes, minutas, SSD en docs/sdd/, memoria). Complementa las reglas .agents/rules/apa-formato.md y .agents/rules/apa-software.md.
---

# Skill: Documentación de Software estilo APA

## Descripción

Proporciona la plantilla y ejemplos para estandarizar la documentación de software del
proyecto siguiendo las normas APA 7.ª edición, **adaptadas al formato Markdown real** de
`docs/`. Complementa las reglas adaptadas del proyecto:

- `.agents/rules/apa-formato.md` — estructura, títulos, citas y referencias.
- `.agents/rules/apa-software.md` — código, figuras, tablas y referencias técnicas.

## Uso

Aplicar la plantilla y las citas de las secciones siguientes a todo documento nuevo que se
genere en el repo: informes de auditoría (`docs/sdd/06_auditorias/`), minutas, SSD
(`docs/sdd/`), memoria y entregas (`docs/entregas/`). En Markdown no aplican pautas físicas de
papel (márgenes, fuentes, tamaño); el render lo define el visor.

## Plantilla para Documentación de Software

```markdown
# [Título del Proyecto]

Fecha: [YYYY-MM-DD] · Estado: [borrador | validado]

## Resumen
[150-250 palabras describiendo el proyecto]

## 1. Introducción
### 1.1 Contexto
### 1.2 Objetivos
### 1.3 Alcance

## 2. Metodología
### 2.1 Arquitectura
### 2.2 Tecnologías Utilizadas
### 2.3 Diseño de Base de Datos

## 3. Implementación
### 3.1 Estructura del Proyecto
### 3.2 Funcionalidades Principales
### 3.3 Interfaz de Usuario

## 4. Resultados
### 4.1 Pruebas Realizadas
### 4.2 Rendimiento
### 4.3 Limitaciones

## 5. Discusión
### 5.1 Comparación con Otras Soluciones
### 5.2 Mejoras Futuras

## 6. Conclusiones

## Referencias

## Apéndices
### Apéndice A: Documentación de API
### Apéndice B: Configuración del Entorno
### Apéndice C: Código Fuente Relevante
```

> Los títulos son **jerárquicos** (`#` → `##` → `###` → `####`) y los encabezados con contenido
> propio (tablas/listas) se escriben acabados en dos puntos.

## Ejemplo de Citas

### Cita de Librería
```markdown
La librería React (Facebook, 2013) proporciona una arquitectura basada en
componentes para construir interfaces de usuario.
```

### Cita de Artículo Técnico
```markdown
Según Martin (2017), los principios SOLID son fundamentales para el
diseño de software orientado a objetos.
```

### Cita de Documentación Oficial
```markdown
La API de RESTful debe seguir los principios de statelessness y
uniform interface (Fielding, 2000).
```

### Cita de Documento Interno del Proyecto
```markdown
El alcance y los accesos rápidos de la Home se definen en el análisis funcional validado
(`docs/frontend/analisis_funcional_validado.md`, 18/09/2026).
```

## Formato de Referencias

### Formato General
```
Apellido, N. A. (Año). Título del trabajo. Fuente. URL
```

### Ejemplos

#### Documentación Oficial
```
React. (2023). Documentación oficial de React. Meta Platforms.
https://react.dev/
```

#### Libro de Programación
```
Martin, R. C. (2017). Clean Architecture: A Craftsman's Guide to Software Structure and
Design. Prentice Hall.
```

#### Artículo Académico
```
Fielding, R. T. (2000). Architectural Styles and the Design of Network-based Software
Architectures [Tesis de Doctorado, Universidad de California, Irvine].
https://www.ics.uci.edu/~fielding/pubs/dissertation/top.htm
```

#### Documento Interno del Proyecto
```
IFTS N.º 12. (2026). Análisis funcional validado. docs/frontend/analisis_funcional_validado.md.
```

## Notas Importantes

1. Adaptar al contexto del proyecto: citar rutas **reales** verificadas en la sesión.
2. Mantener formato consistente (jerarquía de títulos, tablas GFM, código con lenguaje).
3. Priorizar la comprensión del lector.
4. Mantener referencias actualizadas (versión y fecha de acceso en fuentes digitales).
5. Verificar que todas las fuentes citadas estén en la lista de referencias.
6. **Anti-alucinación:** no citar ni inventar autores, fechas o URLs sin verificar la fuente.
7. No dar por confirmados contenidos institucionales pendientes (textos, URLs, logos): marcar 🔵/⏳.
8. Figuras y tablas numeradas y tituladas (ver `.agents/rules/apa-software.md`).
9. Releer el documento tras escribirlo antes de considerarlo terminado.