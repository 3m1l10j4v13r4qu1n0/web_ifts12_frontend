# Registro de Decisiones - Equipo Frontend

Área: Frontend · Proyecto Sitio Web Institucional IFTS N.º 12 — 2026 Documento vivo: consolida las decisiones tomadas en las fases 1-5 y las pendientes de validación.

> Referencia: `docs/frontend/acta-decisiones.md`, `docs/sdd/bitacora_agentica.md`, `docs/frontend/{plan,propuesta-tecnologica,dependencias-equipos}.md` y el skill `fe-architect-scaffold`.

## Convenciones

- **ID:** DEC-XXX (formato secuencial)
- **Estado:** Propuesta / Validada / Reemplazada

------------------------------------------------------------------------

## Registro de decisiones tomadas

| ID | Fecha | Decisión | Motivo | Áreas afectadas | Responsable | Estado |
|----|----|----|----|----|----|----|
| DEC-001 | 29/08/2026 | Stack: React 19 + Vite + TypeScript (strict) + Tailwind CSS v4 + React Router v7 + Axios + TanStack Query v5 + Zod + Biome + Vitest | Coherencia con la materia, capacidad del equipo y alineación al skill `fe-architect-scaffold` | Frontend, Backend, Infra | Nicole Vargas Callejas | Validada (a validar en reunión) |
| DEC-002 | 28/08/2026 | Rama de trabajo: prohibido `main`/`develop`; ramas `feature/` desde `develop`; commits atómicos Conventional Commits en español; push/merge solo con aprobación | Regla de flujo git del proyecto | Frontend, Infra | Emilio Aquino | Validada |
| DEC-003 | 29/08/2026 | Menú principal de 5 ítems + logo a Home; Institucional, Tutorías, FAQ y Contacto en el footer | Regla de navegación máx. 5 ítems | Frontend, UX/UI | Camila González | Validada |
| DEC-004 | 29/08/2026 | Paleta provisional 90/10 con un color de acento azul + neutros (tokens `@theme` Tailwind) | Regla 90/10 de color; a confirmar con UX/UI | Frontend, UX/UI | Camila González | Propuesta (pendiente paleta oficial) |
| DEC-005 | 29/08/2026 | Home con datos simulados tipados en `constants/mock-data.ts`, marcados como provisorios | No se inventan afirmaciones institucionales definitivas | Frontend, Análisis | Camila González | Validada |
| DEC-006 | 29/08/2026 | URLs de Moodle e inscripción vacías en `constants/enlaces.ts`; enlaces externos visibles solo si hay URL | Evitar enlaces rotos | Frontend, IFTS N.º 12 | Jesica Hinojosa Guevara | Validada |
| DEC-007 | 29/08/2026 | Sin consumo de API real; no se inventan endpoints; se dejan preparados client/interceptor/services/types | Regla anti-alucinación; tabla oficial de endpoints vacía | Frontend, Backend | Nicole Vargas Callejas | Validada |
| DEC-008 | 30/08/2026 | Slider de novedades con carrusel propio accesible (sin librería) | YAGNI hasta definir wireframes de UX/UI | Frontend, UX/UI | Jesica Hinojosa Guevara | Validada |
| DEC-009 | 29/08/2026 | Sin autenticación real; solo estructura `AuthContext`/`ProtectedRoute` preparada | El backend aún no la soporta (YAGNI) | Frontend, Backend | Nicole Vargas Callejas | Validada |
| DEC-010 | 28/08/2026 | Infraestructura Plan B: VPS independiente del Moodle; Frontend entrega build estático servido por Nginx | Decisión de infraestructura del proyecto | Frontend, Infra, Dirección | Emilio Aquino | Propuesta (pendiente aprobación) |
| DEC-011 | 09/09/2026 | Migrar placeholders de `enlaces.ts` y `API_BASE_URL` a variables de entorno `VITE_*` (`import.meta.env`) | Auditoría infra: el código no usa `import.meta.env` (INF-G1) | Frontend, Infra | Nicole Vargas Callejas | Propuesta (depende de lista final de variables, INF-G2) |
| DEC-012 | 09/09/2026 | Política de optimización de imágenes: WebP/SVG, máx. 500 KB por imagen | Especificación técnica exige assets optimizados (INF-C1) | Frontend, Infra | Emilio Aquino | Validada |
| DEC-013 | 09/09/2026 | Alinear `propuesta-tecnologica.md` §6 con la especificación técnica de Infra (versiones mínimas, ancho de banda, subdominios `test`/`campus`, TLS 1.2/1.3 + HSTS) | Brechas INF-A1/A2, INF-B1, INF-D2 detectadas en la auditoría | Frontend, Infra | Emilio Aquino | Validada |
| DEC-014 | 09/09/2026 | Entregas de `docs/entregas/` en formato Markdown (pandoc) además del `.docx` fuente | Disponibilidad versionable y diffable de las entregas | Frontend | Nélida Fernández | Validada |

------------------------------------------------------------------------

## Decisiones pendientes de validación con otros equipos

| Decisión | Requiere validar con | Estado |
|----|----|----|
| Stack definitivo (DEC-001) | Equipo (reunión 31/08) + Infra (despliegue) | A validar |
| Paleta oficial de color (DEC-004) | UX/UI | A validar |
| Mapa del sitio y navegación definitiva | Análisis + UX/UI | A validar |
| Contratos de API y esquemas | Backend | A validar |
| Aprobación VPS y despliegue (DEC-010) | Dirección + Infra | Pendiente |
| URLs oficiales (Moodle, inscripción, SIU, constancias, mesas, calendario) | IFTS N.º 12 | Pendiente |
| Lista final de variables `VITE_*` (DEC-011) | Infra | Pendiente (INF-G2) |

------------------------------------------------------------------------

## Historial de Cambios

| Fecha | Cambio | Motivo |
|----|----|----|
| 31/08/2026 | Se consolida el registro con las decisiones de las fases 1-5 | Formalización en docs/entregas para la reunión |
| 09/09/2026 | Se agregan DEC-011…DEC-014 (env vars, política de imágenes, alineación propuesta §6, entregas en Markdown) | Actualización por auditoría de infraestructura y rama `feature/implementacion-infra` |

------------------------------------------------------------------------

**Elaborado por:** Nélida Fernández (Responsable de documentación) **Fecha de emisión:** 31/08/2026 **Revisado por:** Emilio Aquino (Coordinador/PM)
