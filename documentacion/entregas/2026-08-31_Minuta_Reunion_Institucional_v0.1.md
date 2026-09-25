# Minuta de Reunión — Coordinación del Frontend (reunión interna 31/08/2026)

## Datos Generales

| Campo | Contenido |
|----|----|
| **Fecha y horario** | 31/08/2026 — Clase 3 · Inicio de la Etapa 1 (relevamiento formal) |
| **Tipo de reunión** | Interna del equipo Frontend (revisión de propuesta tecnológica y coordinación de dependencias) |
| **Objetivo** | Revisar la propuesta tecnológica del Frontend, el estado de la estructura base y listar las decisiones que dependen de UX/UI, Backend e Infraestructura para iniciar sin bloquearse. |
| **Participantes** | Emilio Aquino (PM/Enlace), Nélida Fernández (Doc.), Nicole Vargas Callejas (Ref. técnico), Camila González, Jesica Hinojosa Guevara, Sofía López Portela |

------------------------------------------------------------------------

## Contexto

- Al cierre de la Fase 5 (30/08/2026) el frontend tiene Home navegable con mocks, estructura versionada (tags `v1.0.0`…`v1.4.0`), propuesta tecnológica documentada y checklist `lint`·`build`·`test` en verde.
- Se toma como insumo el relevamiento de Análisis del 27/08/2026 (minuta con Edith Olmedo Carmona) y el “Mapa Inicial del Sitio Web - IFTS 12 - 2026” (insumo obligatorio a validar por Análisis).

------------------------------------------------------------------------

## Temas Tratados

1.  Presentación de la propuesta tecnológica (`documentacion/frontend/propuesta-tecnologica.md`): React 19 + Vite + TypeScript strict + Tailwind v4.
2.  Revisión de las decisiones tomadas en las fases 1-5 (`documentacion/frontend/acta-decisiones.md`): menú de 5 ítems + logo a Home, paleta provisional (90/10), mocks provisorios, placeholders de Moodle/inscripción, slider accesible sin librerías.
3.  Estado de la Home navegable y componentes reutilizables implementados.
4.  Dependencias y bloqueos por equipo (ver `documentacion/frontend/dependencias-equipos.md`).
5.  Definición de lo que Frontend puede avanzar con datos simulados y lo que debe esperar contratos.

------------------------------------------------------------------------

## Secciones del sitio identificadas (insumo del mapa / relevamiento)

Home, Carreras, Ingresantes, Estudiantes, Docentes, Tutorías, Institucional, Noticias/Novedades, FAQ, Contacto, acceso a Campus Virtual (Moodle) e inscripción oficial. Además: accesos rápidos y los tres bloques/comunidades relevados (Tutoría, Alumnos, Docentes).

------------------------------------------------------------------------

## Decisiones Tomadas

| ID | Decisión | Motivo | Áreas afectadas | Estado |
|----|----|----|----|----|
| DEC-001 | Adoptar React 19 + Vite + TS strict + Tailwind v4 como stack frontend | Coherencia con la materia y capacidad del equipo; alineado al skill `fe-architect-scaffold` | Frontend, Backend, Infra | Propuesta (a validar en reunión) |
| DEC-002 | Home navegable con datos simulados mientras se validan contenidos | No se inventan afirmaciones institucionales definitivas | Frontend, Análisis | Validada |
| DEC-003 | Acceso a Moodle e inscripción visible solo cuando exista URL oficial | Evitar enlaces rotos; placeholders en `constants/` | Frontend, IFTS N.º 12 | Validada |
| DEC-004 | Paleta provisional 90/10 de acento azul | Regla de color; a confirmar con UX/UI | Frontend, UX/UI | Propuesta |

------------------------------------------------------------------------

## Dependencias y bloqueos detectados

| Necesita de | Qué | Estado |
|----|----|----|
| Análisis | Minuta V2 de correcciones, mapa del sitio validado, contenidos institucionales | Bloqueado |
| UX/UI | Wireframes, navegación, criterios visuales y paleta por carrera | Bloqueado |
| Backend | Contratos de API, esquemas, autenticación y datos de prueba | Bloqueado |
| Infraestructura | Aprobación del VPS independiente y restricciones de build/despliegue | Pendiente |
| IFTS N.º 12 | URLs oficiales de Moodle e inscripción | Pendiente |
| QA | Entrega de versiones navegables tempranas para pruebas | En curso |

------------------------------------------------------------------------

## Lo que Frontend puede avanzar sin bloquearse

- Estructura base del proyecto (ya implementada).
- Home navegable con datos simulados (ya implementada).
- Componentes reutilizables presentacionales (parcialmente implementados).
- Preparación de accesos a Moodle/inscripción (placeholders hasta recibir URLs).

------------------------------------------------------------------------

## Próximos pasos

1.  Validar propuesta tecnológica y paleta con el equipo y UX/UI.
2.  Coordinar con Análisis la minuta V2 y el mapa del sitio validado.
3.  Coordinar con Backend el cronograma de contratos de API.
4.  Coordinar con Infra la aprobación del VPS (baseline 2 vCPU / 4 GB) y la estrategia de despliegue.
5.  Acordar el siguiente hito de integración con Backend/Infra.

------------------------------------------------------------------------

## Riesgos o Dependencias Detectadas

| Riesgo/Bloqueo | Impacto | Probabilidad | Mitigación |
|----|----|----|----|
| Sin minuta V2 / mapa validado de Análisis | Se trabaja con secciones identificadas pero sin estructura definitiva | Media | Avanzar con mocks provisorios y marcar pendientes |
| Sin wireframes de UX/UI | Jerarquía visual y navegación no definidas | Media | Usar criterio 90/10 provisional; informar dificultades a UX/UI |
| URLs oficiales de Moodle/inscripción pendientes | Enlaces no visibles hasta recibirlas | Media | Placeholders; CTA oculto hasta tener URL |
| Stack/paleta sin validar | Riesgo de retrabajo | Baja | Validar en la reunión y registrar en acta de decisiones |

------------------------------------------------------------------------

**Elaborado por:** Nélida Fernández (Responsable de documentación) **Fecha de emisión:** 31/08/2026 **Revisado por:** Emilio Aquino (Coordinador/PM)
