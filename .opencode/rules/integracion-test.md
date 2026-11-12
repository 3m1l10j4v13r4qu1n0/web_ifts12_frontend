# Modo test — rama de integración (regla dura del proyecto)

Regla **local de este repositorio**, de vigencia temporal. Mientras esté activa, la base
de las ramas y el destino de los merges se rigen por este archivo y **no** por
`~/.config/opencode/rules/git.md` (regla global, que no se modifica). Al levantarse, el
repo vuelve al flujo global sin cambios pendientes.

## Vigencia

- **Desde:** 31/10/2026, cuando Infra publicó la rama de integración TEST.
- **Hasta:** que se cierren el ticket **0000079** (coordinación de ramas) y el **0000075**
  (QA), Infra autorice el merge a `develop` y esa autorización quede registrada.

## Contexto verificado (12/11/2026)

| Dato | Valor |
|---|---|
| Rama de integración | `fix/integracion-test-20261031` |
| Remoto que la publica | `infra` → `gitfront@100.111.107.65:/srv/git/frontend.git` |
| SHA publicado | `d1afcf8a30e7e070a6a1e5ae021b1006d7e27c9e` |
| Base en `develop` | `33f995448f31e94895db1f40497004a940848b8f` |
| Sitio TEST | https://ifts12-test.tail5bd71a.ts.net/ |

La rama **no existe en `origin` (GitHub)**: no se le pueden abrir PRs ahí. La integración
se hace con merge local y push al remoto `infra`.

## Reglas

1. **`develop` y `main` quedan congeladas.** Prohibido commitear, mergear o pushear
   directo sobre ellas hasta que Infra autorice el cierre del modo test.
2. **Base de toda rama nueva:** `fix/integracion-test-20261031`. Las ramas `feature/*` y
   `fix/*` nacen de la rama de test (nunca de `develop`), para no reintroducir regresiones
   ya corregidas en TEST.
3. **Destino único de merge:** `fix/integracion-test-20261031`. Merge local + push al
   remoto `infra`, solo con aprobación explícita del usuario. Prohibido abrir PRs hacia
   `develop` o `main`.
4. **Historia inmutable:** prohibido `reset --hard`, `push --force` o rebase que reescriba
   la historia de la rama de test. El SHA publicado se conserva en el historial.
5. **Checklist antes de mergear:** traer la rama de test actualizada, correr
   `npm ci` · `npm run lint` · `npm run build` · `npm run test`. Todo en verde antes del
   merge.
6. **Merge a `develop`:** solo con autorización **escrita** de Infra (ticket 0000079 o
   equivalente) **y** aprobación explícita del usuario en la sesión. El agente no lo hace
   por cuenta propia ni "aprovecha" un push.
7. **Conflictos o divergencias:** detenerse y coordinar con Infra/Front/Back. No resolver
   por cuenta propia ni reescribir historia.
8. **Si `develop` avanzara** con autorización de Infra, sincronizar la rama de test con
   `develop` antes de seguir; nunca al revés.
9. **Al terminar un merge, el repo queda parado en `fix/integracion-test-20261031`**, no en
   la rama mergeada. Recién después se borra la rama ya integrada (local y, si existe, en
   `origin`).

## Flujo de una tarea

```bash
# 1. Base: la rama de test publicada por Infra
git fetch infra
git switch -c feature/<tema> infra/fix/integracion-test-20261031

# 2. Trabajo y commits atómicos (Conventional Commits en español)
# ...

# 3. Checklist en verde
npm ci && npm run lint && npm run build && npm run test

# 4. Integrar la rama de test actualizada dentro de la rama de trabajo
git fetch infra
git merge infra/fix/integracion-test-20261031

# 5. Merge a la rama de test (local) y push a infra, con aprobación
git switch fix/integracion-test-20261031
git merge --no-ff feature/<tema>
git push infra fix/integracion-test-20261031

# 6. Quedar parado en la rama de test (no volver a la rama mergeada) y borrar la integrada
git branch -d feature/<tema>
```

## Verificación rápida

```bash
git rev-parse fix/integracion-test-20261031   # debe coincidir con infra/...
git log --oneline -3 fix/integracion-test-20261031
git branch -vv | grep integracion
```

## Cómo se levanta la regla

1. Confirmar cierre de 0000079 (rama oficial definida) y 0000075 (QA completo).
2. Registrar la autorización de Infra y el merge a `develop` en bitácora y en
   `docs/project_state.md`.
3. Marcar este archivo como **derogado** (encabezado "Derogada el AAAA-MM-DD") o borrarlo;
   el repo vuelve a `.opencode/rules/flujo-git.md` y a la regla global.
