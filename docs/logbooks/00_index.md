# Bitácoras — índice

| Archivo | Fase | Rango | Decisiones clave |
|---|---|---|---|
| logbook_fase-7_01.md | fase-7 | 1 | 2026-09-25 13:31 — Fase 7 (adopción de logsayer): se instala el framework documental de 5 capas con 'logsayer init --here' (logsayer.toml, docs/01_global..06_audits, docs/logbooks, project_state.md) y se migra la documentación: docs/sdd/* pasa a las rutas del framework, la bitácora histórica a logbook_legado_01.md (intacta, 24 entradas), el detalle largo del estado a docs/02_technical/estado_implementacion.md y la doc no-capa (entregas, frontend, wireframes, mockups, rol_equipo, Drive) a documentacion/ fuera de docs/. Se fusiona AGENTS.md con el protocolo logsayer (Fremen verifica 70%/400 líneas/>= 3 HUs), se actualizan las 105 referencias de ruta en 39 archivos y se generan los subagentes de rol en .opencode/agents/ con el frontmatter adaptado al esquema permission de opencode. Verificación: logsayer check y process check en verde, npm run lint/build/test en verde. |
| logbook_legado_01.md | legado | 1 | `package.json` / `package-lock.json` — dependencias del stack y scripts `dev`/`build`/`lint`/`lint:fix`/`test`. |
