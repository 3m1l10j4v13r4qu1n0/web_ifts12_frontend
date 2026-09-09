# Flujo de Git — SGVIR

Reglas obligatorias de ramas, commits y merges. Aplican a agentes y humanos por igual.

## Ramas

- **Prohibido** trabajar directamente sobre `main` o `develop`.
- Crear `feature/<tema>` o `fix/<tema>` **siempre desde `develop`**.
- Una rama = una tarea/HU coherente. Mantener ramas cortas (PRs chicos se revisan mejor).

```text
main
└── develop
    ├── feature/hu-09-nueva-pantalla
    ├── fix/validacion-descuento
    └── docs/actualizar-readme
```

## Pull Requests con `gh`

`gh` es la CLI oficial de GitHub para gestionar los PRs (no reemplaza a git). Instalado en
`~/.local/bin/gh` (si no está en el PATH: `~/.local/bin/gh ...`). Autenticación: `gh auth login`
(la maneja el usuario, no el agente).

- **Crear PR** hacia `develop` (solo después de pushear la rama con aprobación previa del
  usuario): `gh pr create --base develop --head <rama> --title "..." --body "..."`
- **Listar / ver:** `gh pr list` · `gh pr view <n>`
- **Moverte a un PR:** `gh pr checkout <n>`
- **Mergear** ORIGINAL (no squash) de un PR ya aprobado: `gh pr merge --merge <n>`
- **NO** crear, mergear ni cerrar PRs por cuenta propia sin aprobación explícita del usuario.
- El PR es una capa de revisión sobre el push: primero se pushea la rama, después se abre el
  PR. El merge a `develop`/`main` se hace solo con autorización.

## Commits

- **Conventional Commits en español**, scope en minúscula:
  - `feat(utils): se agrega funcion cn a utils`
  - `fix(backend): se corrige validacion de plazo en cambios`
  - `docs(rules): se agrega regla de flujo de git`
- Prohibido mensajes vagos ("cambios", "arreglos", "update", "cosas varias").
- Un tema por commit (commits atómicos). Si el commit necesita "y" para describirse, son dos commits.

## Antes de mergear a develop

1. Integrar primero `origin/develop` **dentro de la rama feature** (`git fetch` + `git merge origin/develop`) y resolver los conflictos ahí, no en develop.
2. Checklist obligatorio, todo en verde antes del merge:
   - Backend: `venv/bin/ruff check .` · `venv/bin/black --check .` · `venv/bin/python -m pytest`
   - Frontend: `npm run lint` · `npm run build` · `npm run test`
3. Pushear la rama y abrir el PR (con `gh pr create`) **únicamente** cuando el usuario lo pida o lo apruebe explícitamente.
4. El merge a `develop` se hace preferentemente vía PR aprobado (`gh pr merge --merge <n>`), siempre con autorización del usuario.

## Limpieza

- Borrar las ramas ya mergeadas (local con `git branch -d`, que solo borra si está integrada).
- Para remotas, verificar antes con `git branch -r --merged develop` y luego `git push origin --delete <rama>`.
- Nunca borrar `main` ni `develop`.
