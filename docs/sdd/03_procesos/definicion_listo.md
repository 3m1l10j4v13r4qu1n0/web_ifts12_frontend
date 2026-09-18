# Definition of Ready (DoR) — Sitio Web Institucional IFTS N.º 12

Fecha: 2026-09-18 · Estado: borrador

## Resumen

El Definition of Ready (DoR) define los criterios que una Historia de Usuario (HU) del
proyecto debe cumplir antes de moverse a la columna «En desarrollo» del tablero Kanban.
Se adapta del proceso ágil del proyecto (método Kanban, `docs/sdd/05_metodologia_agil/`) e
incorpora el contrato de documentación por historia de usuario usado en
`docs/sdd/04_historias_usuario/`.

## 1. Criterios de entrada en desarrollo

Una Historia de Usuario no puede moverse a la columna «En desarrollo» si no cumple:

- [ ] Tiene el formato estándar (**Como… quiero… para…**) y describe al actor según
      `docs/sdd/01_global/actores.md`.
- [ ] Está dentro del alcance definido en `docs/sdd/01_global/alcance.md` y no contradice
      las reglas de negocio transversales de `docs/sdd/01_global/reglas_negocio.md`.
- [ ] Tiene Criterios de Aceptación en formato Gherkin (**Dado/Cuando/Entonces**), uno por
      comportamiento verificable.
- [ ] Tiene al menos 2 ejemplos en Specification by Example.
- [ ] Tiene definidos los casos de prueba TDD (positivo, negativo y de borde).
- [ ] Tiene especificado el/los endpoint/s de API a consumir en su archivo `hu_XX_api.md`
      (método, ruta y request/response), respetando el contrato del backend
      (`docs/driveFrontend/04_backend/respuesta.md`) y la fuente por historia de usuario
      definida en el skill `fe-architect-scaffold`.
- [ ] Tiene identificadas las entidades de datos (con sus campos deducidos) y las reglas de
      negocio que involucra.
- [ ] Están identificados los estados de UI obligatorios (loading, error y empty state)
      cuando la HU consume API.
- [ ] Backend revisó los archivos `.md` de la HU y no tiene dudas bloqueantes; para el
      frontend, los endpoints usados están documentados (no se inventan).

## 2. Notas de mantenimiento

- Cada HU nueva crea su carpeta `docs/sdd/04_historias_usuario/HU-XX/` con los archivos
  `hu_XX.md`, `hu_XX_caso_uso_expandido.md`, `hu_XX_modelos_datos.md`, `hu_XX_api.md` y
  `hu_XX_pruevas.md`.
- Al crear una HU con su `hu_XX_api.md`, la lista oficial de endpoints del skill
  `fe-architect-scaffold` se actualiza de forma automática (fuente de verdad por historia
  de usuario).
- Los contenidos institucionales no confirmados se marcan 🔵/⏳ y no bloquean la HU salvo
  que sean condición necesaria de sus criterios de aceptación.

## Referencias

Equipo del proyecto. (2026). Metodología Kanban. `docs/sdd/05_metodologia_agil/metodoKanban.md`.

Opencode. (2026). Skill fe-architect-scaffold. `.opencode/skills/fe-architect-scaffold/SKILL.md`.