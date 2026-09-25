# Reporte Semanal - Equipo Frontend

Área: Frontend · Proyecto Sitio Web Institucional IFTS N.º 12 — 2026

## Semana: 31/08/2026 - Clase 3 (Inicio Etapa 1)

| Pregunta | Respuesta |
|----|----|
| **¿Qué terminamos esta semana?** | Se cerraron las 5 fases del plan inicial del frontend (Fase 5 “Cierre y documentación”) sobre la rama `feature/fase-5-cierre`. Quedó actualizada la propuesta tecnológica, el acta de decisiones, la agenda de la reunión del lunes y las dependencias por equipo. Checklist `lint`·`build`·`test` en verde (7 suites, 11 pruebas). |
| **¿Qué está en curso?** | Formalización de los documentos de entrega (minuta, acta de roles, registro de decisiones, matriz de dependencias, inventario técnico) en `documentacion/entregas/`. Home navegable con datos simulados implementada en fases previas. |
| **¿Qué decisión necesitamos?** | Validación del stack (React 19 + Vite + TS strict + Tailwind v4) y de la paleta provisional con el equipo y UX/UI; aprobación del VPS con Infra/Dirección. |
| **¿Qué nos bloquea?** | Minuta V2 de Análisis y mapa del sitio validado; wireframes de UX/UI; contratos de API de Backend; URLs oficiales de Moodle/inscripción; aprobación de VPS/Dirección. |
| **¿Quién depende de nosotros?** | QA necesita una versión navegable temprana para probar responsive, enlaces, accesibilidad e integración. |
| **¿De quién dependemos?** | Análisis (contenidos/mapa), UX/UI (wireframes/paleta), Backend (contratos de API), Infraestructura (VPS/despliegue), IFTS N.º 12 (URLs oficiales). |
| **¿Qué entregable/documento actualizamos?** | `documentacion/entregas/` (minuta, acta de roles, registro de decisiones, matriz de dependencias, reporte, inventario técnico); `documentacion/frontend/` (propuesta, acta, agenda, dependencias). |
| **Próximo objetivo concreto** | Validar la propuesta tecnológica y coordinar con Análisis/UX/UI el mapa del sitio y los wireframes; acordar el próximo hito de integración con Backend/Infra. |

------------------------------------------------------------------------

## Semana: 09/09/2026 - Auditoría de infraestructura y alineación de la propuesta

| Pregunta | Respuesta |
|----|----|
| **¿Qué terminamos esta semana?** | Auditoría de infraestructura completa (`docs/06_audits/audit_2026-09-09-infraestructura.md`): 10 brechas identificadas (INF-A1…INF-J1), 1 severa (typo de dominio en `grupo_5`, corregido en el Drive). Rama `feature/implementacion-infra`: propuesta tecnológica §6 alineada con la especificación (versiones mínimas, ancho de banda, subdominios `test`/`campus`, TLS 1.2/1.3 + HSTS), nueva §9 con política de imágenes, README con build de producción. Bloque Nginx de ejemplo completado con cabeceras de seguridad y `client_max_body_size 15m`. Recordatorio `documentacion/driveFrontend/05_infraestructura/bloqueo_infra.md` para Infra. PR #2 abierto hacia `develop`. |
| **¿Qué está en curso?** | Alineación de entregables de `documentacion/entregas/` (matriz de dependencias, registro de decisiones, reporte) y conversión a Markdown. Fase 6 (brechas de auditoría de análisis) ya implementada en fases previas. |
| **¿Qué decisión necesitamos?** | Lista final de variables `VITE_*` con Infra (INF-G2) para cerrar INF-G1 (`.env.example` + migración a `import.meta.env`); aprobación de VPS y URLs oficiales con IFTS/Dirección. |
| **¿Qué nos bloquea?** | Todo bloqueante es externo: VPS/Dirección (dinero/dominio), URLs oficiales, reunión con Oscar por el Moodle (Plan B y subdominio `campus`), contratos de API de Backend, wireframes de UX/UI y minuta V2 de Análisis. |
| **¿Quién depende de nosotros?** | QA (versión navegable temprana y ambiente de testing); Infra (build listo + ejemplo Nginx completo + criterios de assets listos). |
| **¿De quién dependemos?** | Infra (VPS, Nginx real, lista `VITE_*`, reunión Oscar), IFTS N.º 12 (URLs oficiales), Backend (API), Análisis (contenidos/mapa), UX/UI (wireframes/paleta). |
| **¿Qué entregable/documento actualizamos?** | `documentacion/entregas/` (matriz de dependencias, registro de decisiones, reporte semanal — en Markdown); `documentacion/frontend/` (auditoría de infra, propuesta tecnológica, estado del proyecto, vitácora); `documentacion/driveFrontend/05_infraestructura/` (bloqueo_infra.md, grupo_5 corregido). |
| **Próximo objetivo concreto** | Cerrar la coordinación de variables de entorno con Infra (INF-G2) para migrar `enlaces.ts`/`API_BASE_URL` a `import.meta.env` y entregar `.env.example`; esperar definiciones de VPS/URLs. |

------------------------------------------------------------------------

## Notas Adicionales

- Los bloqueos se comunican tempranamente al enlace del área correspondiente, no se resuelven unilateralmente.
- La Home se arma con datos simulados marcados como provisorios, sin afirmaciones institucionales definitivas.
- La auditoría de infraestructura confirmó que el frontend está alineado en lo esencial (build estático, SPA, stack, ambientes, backups); los pendientes dependen de decisiones de Infra/Dirección.

------------------------------------------------------------------------

## Historial de Reportes

| Semana                        | Fecha      | Estado                |
|-------------------------------|------------|-----------------------|
| Cierre fase inicial + Clase 3 | 31/08/2026 | Primer reporte formal |
| Auditoría de infraestructura  | 09/09/2026 | Reporte actualizado (infra + alineación propuesta) |

------------------------------------------------------------------------

**Elaborado por:** Nélida Fernández (Responsable de documentación) **Fecha de emisión:** 31/08/2026 (actualizado 09/09/2026) **Revisado por:** Emilio Aquino (Coordinador/PM)
