# Flujo de Git

> Nota de migración: las reglas de ramas, commits, PRs con `gh` y merges son
> **globales** (fuente única: `~/.config/opencode/rules/git.md`, cargada vía
> `instructions` del config global de opencode). Este archivo queda para mantener
> esta referencia local y la checklist específica del repo. No duplicar ni editar
> la regla global acá.

## Excepción vigente: modo test (regla del proyecto)

Mientras el sitio TEST esté en pruebas, rige `.opencode/rules/integracion-test.md`:

- `develop` y `main` congeladas: sin commits, merges ni push.
- Base de ramas y destino de merge: `fix/integracion-test-20261031` (remoto `infra`).
- Merge a `develop` solo con autorización escrita de Infra (ticket 0000079) y aprobación
  del usuario.

## Checklist específico del repo (antes de mergear)

- Frontend: `npm run lint` · `npm run build` · `npm run test`
- `gh` instalado en `~/.local/bin/gh` (si no está en el PATH: `~/.local/bin/gh ...`).