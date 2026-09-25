# Flujo de Git

> Nota de migración: las reglas de ramas, commits, PRs con `gh` y merges son
> **globales** (fuente única: `~/.config/opencode/rules/git.md`, cargada vía
> `instructions` del config global de opencode). Este archivo queda para mantener
> esta referencia local y la checklist específica del repo. No duplicar ni editar
> la regla global acá.

## Checklist específico del repo (antes de mergear a develop)

- Frontend: `npm run lint` · `npm run build` · `npm run test`
- `gh` instalado en `~/.local/bin/gh` (si no está en el PATH: `~/.local/bin/gh ...`).