# Reglas de Negocio Transversales — Sitio Web Institucional IFTS N.º 12

Fecha: 2026-09-18 · Estado: borrador

## Resumen

Las reglas de negocio transversales aplican a múltiples historias de usuario y deben ser
respetadas por el frontend, el backend y el panel de administración. Se deducen del
análisis funcional validado (18/09/2026), de la respuesta formal del backend (15/09/2026)
y del Mapa del Sitio V2 de UX/UI. Cada regla referencia su requisito funcional (RF) o su
documento de origen; lo pendiente externo se marca 🔵/⏳ y no se inventa.

## 1. Reglas transversales

| ID | Regla | Fuente |
|---|---|---|
| RN-01 | El sitio es **complementario** al Campus Virtual Moodle y debe tener acceso visible y directo a este desde la Home | RF-12, RF-28 (Análisis Funcional, 2026) |
| RN-02 | La Home debe exponer el enlace oficial de inscripción del GCBA de forma directa y visible | RF-03 (Análisis Funcional, 2026) |
| RN-03 | Las noticias/novedades se ordenan de la más reciente a la más antigua; el último mes debe quedar visible en la vista principal | RF-25 (Análisis Funcional, 2026) |
| RN-04 | El contenido se clasifica como **fijo** (historia, normativa, planes, logos, enlaces oficiales, dirección) o **administrable** (noticias, carrusel, calendario, horarios, autoridades, docentes, bedeles, becas, tutorías, FAQ) | Matriz fijo-administrable del Análisis Funcional, 2026 |
| RN-05 | El login es **exclusivo del personal que administra contenidos**; el contenido informativo es público | RF-23 (Análisis Funcional, 2026) |
| RN-06 | El instituto tiene 6 carreras; el listado debe mostrar nombre y modalidad, con horarios/turno en cada ficha | RF-01, RF-04 (Análisis Funcional, 2026) |
| RN-07 | Contacto y pie de página muestran dirección y horario confirmados: **Misiones 26, C1083 ABB, CABA**, atención solo nocturno | RF-22 (Análisis Funcional, 2026) |
| RN-08 | La Home expone los **7 accesos rápidos confirmados**: Campus Virtual (Moodle), SIU, inscripción oficial (GCBA), becas, constancias, mesas de examen y calendario académico | Análisis Funcional, 2026 (Parte IV y VI) |
| RN-09 | El asistente virtual (bot) queda fuera de la primera versión (etapa C); no debe aparecer en el sitio v1 | Análisis Funcional, 2026 (§7) |
| RN-10 | Las URLs oficiales externas (Moodle, inscripción GCBA, SIU) se muestran **solo cuando sean provistas por la institución**; mientras tanto se usan placeholders vacíos y los CTA se ocultan o atenúan | Análisis Funcional, 2026 (§8); Frontend |
| RN-11 | Los contenidos institucionales reales (textos, logos, datos de bedeles/SIU, fechas de mesas) pendientes del instituto no se inventan; se marcan 🔵/⏳ | Análisis Funcional, 2026 (§8, §11) |
| RN-12 | El sitio debe cumplir buenas prácticas de accesibilidad y responsive (mobile-first, ARIA, navegación por teclado, regla 90/10 de color) | Propuesta Tecnológica, 2026; UX/UI |
| RN-13 | Los errores del backend se manejan de forma centralizada en el interceptor HTTP, con estructura de error estandarizada `{ error: { code, message, details } }` | Respuesta del Backend, 15/09/2026 |
| RN-14 | El acceso a la navegación principal sigue el Mapa del Sitio V2 de UX/UI (menú de 9 ítems y buscador global) | Mapa del Sitio V2, 15/09/2026 |

> Tabla 1. Reglas de negocio transversales del sitio.

## 2. Reglas pendientes de validación institucional

| Regla | Estado | Depende de |
|---|---|---|
| SIU: sistema exacto, público destinatario y nombre visible | 🔵 | Análisis Funcional / Edición |
| Bedeles: datos individuales o información genérica del rol | 🔵 | Análisis Funcional / Edición |
| Solicitud de títulos y traspasos: informativo vs. gestionable | 🟡 | Decisión por etapas (informativo en v1) |
| Roles de backend (ADMIN, EDITOR, EDITOR_NOTICIAS) | 🟡 | Validación con Análisis Funcional (BE-A7) |

## Referencias

IFTS N.º 12. (2026). Análisis funcional validado. `documentacion/frontend/analisis_funcional_validado.md`.

Equipo de Backend. (2026). Respuesta a definiciones técnicas formales. `documentacion/driveFrontend/04_backend/respuesta.md`.

Equipo de Frontend. (2026). Propuesta tecnológica — Frontend e Infraestructura. `documentacion/frontend/propuesta-tecnologica.md`.

Equipo de UX/UI. (2026). Mapa del Sitio V2. `documentacion/driveFrontend/02_ux_ui/mapa_sitio_ifts12_(V2).md`.