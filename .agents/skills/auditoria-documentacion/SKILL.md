---
name: auditoria-documentacion
description: flujo para auditar documentación del proyecto (requerimientos, especificaciones, planes) y actualizar el archivo del grupo correspondiente (ej. grupo_x_*.md) marcando checklists de lo ya cubierto. Usar cuando se pida auditar documentación, comparar requerimientos de un equipo/grupo con el estado real del proyecto, o al actualizar un informe de auditoría.
---

# Auditoría de Documentación y actualización del archivo del grupo

Habilitar este flujo cuando el trabajo consista en auditar documentación (comprobar que los
requisitos de un área coinciden con el estado real del proyecto) o cuando se pida marcar/
actualizar los documentos de grupo (`grupo_x_*.md`).

Complementa la regla dura `.agents/rules/auditoria-documentacion.md`.

## Objetivo

Toda auditoría de documentación debe terminar con **dos entregables**:

1. El informe de auditoría versionado (`docs/frontend/auditoria-*.md`).
2. El archivo del grupo correspondiente **actualizado** (`docs/driveFrontend/0X_*/grupo_X_*.md`),
   con sus checklists marcados y las correcciones aplicadas.

## Flujo de trabajo

### 1. Identificar el grupo y el documento fuente

Mapear el documento que se audita al grupo que le corresponde:

| Grupo | Documento típico en `docs/driveFrontend/` |
|---|---|
| 1 · Análisis Funcional | `01_analisis_funcional/*`, unificados de RF |
| 2 · UX/UI | `02_ux_ui/*`, wireframes, paleta |
| 3 · Frontend | `03_frontend/*`, convenciones de UI |
| 4 · Backend | `04_backend/*`, contratos de API |
| 5 · Infraestructura | `05_infraestructura/*` (especificación, cuestionario, grupo_5) |
| 6 · QA | `06_qa/*`, planes de testing |

### 2. Relevar el estado real del proyecto

Leer (en la sesión actual) los documentos internos y el código que evidencian lo que YA existe:
- `docs/frontend/propuesta-tecnologica.md`, `dependencias-equipos.md`.
- `docs/estado_actual_proyecto.md` (completo).
- Código afectado: `src/**`, `vite.config.ts`, `package.json`, etc.
- Solo marcar ✅ lo que se pueda verificar con un archivo leído o un comando corrido.

### 3. Leer completo el archivo del grupo

Localizar `docs/driveFrontend/0X_*/grupo_X_*.md` y leerlo COMPLETO antes de editarlo.

### 4. Comparar y marcar

Con la leyenda:

| Símbolo | Uso |
|---|---|
| ✅ | ya cubierto por el proyecto (verificado) |
| 🟡 | parcial / difiere levemente |
| 🔵 | pendiente externo (otro equipo / Dirección) |
| ⏳ | en proceso / bloqueado temporal |

Marcar cada ítem del documento del grupo sin inventar estados. Cuando una sección del grupo
pida algo que el proyecto ya entrega, reemplazar el estado por ✅ y aclarar dónde/qué se
verificó (fecha y evidencia).

### 5. Aplicar correcciones verificadas

Sobre el archivo del grupo:
- Typos que puedan propagarse a config real (ej. dominios, variables, URLs).
- Configuraciones de ejemplo incompletas según la especificación (revisar: cabeceras de
  seguridad, límites, fallbacks).
- Tablas que no reflejen la realidad del código (ej. variables de entorno que faltan).
- Cada corrección debe poder trazarse a un hallazgo de la auditoría (ID estable, ej. INF-A1).

### 6. Generar el informe versionado

Crear/actualizar `docs/frontend/auditoria-<area>.md`:
- Tabla de consistencia por área (✅ / 🟡 / ❌ / 🔵).
- Hallazgos con IDs (prefijo del área, ej. `INF-`, `RF-`).
- Brechas resumidas con severidad y responsable.
- Checklist accionable.
- Sección que indique qué archivo del grupo fue actualizado.

### 7. Registrar en memoria

- `docs/estado_actual_proyecto.md`: actualizar la sección correspondiente (in-place).
- `docs/vitacora_agentica.md`: entrada nueva al final (append-only), nunca editar previas.

### 8. Commits y PR

- Commitear SOLO el informe y la memoria (`docs/frontend/auditoria-*.md`,
  `docs/estado_actual_proyecto.md`, `docs/vitacora_agentica.md`).
- NO commitear `docs/driveFrontend/**` (gitignored).
- Commits atómicos, Conventional Commits en español, scope en minúscula
  (ej. `docs(infra): se auditan requerimientos de infraestructura vs proyecto`).
- Push y PR solo con aprobación explícita del usuario: `git push origin <rama>` y luego
  `gh pr create --base develop --head <rama> ...` (ver `.opencode/rules/flujo-git.md`).

## Ejemplo aplicado (patrón de referencia)

Auditoría de infraestructura (09/09/2026):
- Informe: `docs/frontend/auditoria-infraestructura.md`.
- Grupo actualizado: `docs/driveFrontend/05_infraestructura/grupo_5_infraestructura.md`
  (build ✅, ambientes ✅, typo de dominio corregido INF-D1, bloque Nginx completado
  INF-E1/INF-E2, variables ampliadas INF-G2, sección 13 de estado de avance).

## Checklist de calidad

- [ ] Se leyó completo el archivo del grupo antes de editarlo.
- [ ] Los ✅ marcados tienen evidencia verificada en la sesión (archivo o comando).
- [ ] Cada corrección del archivo del grupo tiene un ID de hallazgo trazable.
- [ ] El informe versionado referencia el archivo del grupo modificado.
- [ ] No se commiteó nada de `docs/driveFrontend/`.
- [ ] `docs/estado_actual_proyecto.md` y `vitacora_agentica.md` quedaron al día.