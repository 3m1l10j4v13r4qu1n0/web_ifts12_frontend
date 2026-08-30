# Agenda — Reunión de revisión del Frontend (lunes 31/08/2026)

Área: Frontend · Proyecto Sitio Web Institucional IFTS N.º 12 — 2026
Reunión de revisión y cierre de la fase inicial del plan (`docs/frontend/plan.md` sección 5).

## Contexto

- Al cierre de la Fase 5 (30/08/2026) el frontend tiene Home navegable con mocks, estructura
  versionada con tags `v1.0.0`…`v1.4.0`, propuesta tecnológica documentada y checklist
  `lint`·`build`·`test` en verde.
- Objetivo de la reunión: presentar la propuesta, validar decisiones propias del equipo y
  coordinar dependencias que no se resuelven unilateralmente (UX/UI, Backend, Infra, Dirección).

## Puntos de la agenda

1. **Presentación de la propuesta tecnológica** (`propuesta-tecnologica.md`)
   - Stack: React 19 + Vite + TypeScript strict + Tailwind v4 (validación del equipo).
   - Estructura de carpetas, componentes reutilizables y scripts.
   - Home navegable con datos simulados (demo de la Home).

2. **Revisión de las decisiones tomadas** (`acta-decisiones.md`)
   - Menú de 5 ítems + logo a Home.
   - Paleta provisional (90/10) a confirmar con UX/UI.
   - Mocks provisorios y placeholders de Moodle/inscripción.
   - Slider de novedades accesible sin librerías.

3. **Dependencias y bloqueos por equipo** (`dependencias-equipos.md`)
   - **Análisis funcional:** minuta V2 y mapa del sitio validado.
   - **UX/UI:** wireframes, navegación, criterios visuales y paleta.
   - **Backend:** contratos de API, esquemas y autenticación.
   - **Infraestructura:** aprobación del VPS independiente y restricciones de despliegue.
   - **QA:** versiones navegables tempranas (responsive, enlaces, accesibilidad).
   - **IFTS N.º 12:** URLs oficiales de Moodle e inscripción.

4. **Coordinación con equipos presentes**
   - **Infraestructura:** confirmar VPS (baseline 2 vCPU / 4 GB), build estático en Nginx y
     preguntas a proveedores (sección 7 de `dependencias-equipos.md`).
   - **Dirección:** hosting separado del Moodle, dominio `.com.ar` y autorización de gasto.
   - **Backend:** cronograma de contratos de API para la integración.

5. **Próximos pasos y asignaciones**
   - Definir responsables de desbloquear cada dependencia.
   - Acordar el siguiente hito de integración con Backend/Infra.

## Entregables a mostrar en la reunión

1. Home navegable con datos simulados (acceso a Moodle e inscripción cuando haya URL).
2. Estructura del proyecto + propuesta tecnológica + lista de componentes.
3. Lista explícita de dependencias y bloqueos.
4. `npm run lint` · `npm run build` · `npm run test` en verde.
5. Asignación de roles (`rol_equipo.md`).

## Checklist de cierre de la reunión

- [ ] Stack validado por el equipo.
- [ ] Paleta/criterios visuales coordinados con UX/UI.
- [ ] Responsables asignados por cada bloqueo.
- [ ] Fecha del próximo hito de integración confirmada.
