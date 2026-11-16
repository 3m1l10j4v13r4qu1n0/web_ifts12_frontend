# Reglas de Negocio Transversales — Sitio Web Institucional IFTS N.º 12

Fecha: 2026-09-18 · Estado: borrador

## Resumen

Las reglas de negocio transversales aplican a múltiples historias de usuario y deben ser
respetadas por el frontend, el backend y el panel de administración. Se deducen del
análisis funcional validado (18/09/2026), de la respuesta formal del backend (15/09/2026) y
de los mapas del sitio de UX/UI (V2, 15/09/2026, y su reemplazo V3, 13/11/2026). Cada regla
referencia su requisito funcional (RF) o su documento de origen; lo pendiente externo se
marca 🔵/⏳ y no se inventa.

## 1. Reglas transversales

| ID | Regla | Fuente |
|---|---|---|
| RN-01 | El sitio es **complementario** al Campus Virtual Moodle y debe tener acceso visible y directo a este desde la Home | RF-12, RF-28 (Análisis Funcional, 2026) |
| RN-02 | La Home debe exponer el enlace oficial de inscripción del GCBA de forma directa y visible | RF-03 (Análisis Funcional, 2026) |
| RN-03 | Las noticias/novedades se ordenan de la más reciente a la más antigua; el último mes debe quedar visible en la vista principal | RF-25 (Análisis Funcional, 2026) |
| RN-04 | El contenido se clasifica como **fijo** (historia, normativa, planes, logos, enlaces oficiales, dirección) o **administrable** (noticias, carrusel, calendario, horarios, autoridades, docentes, bedeles, becas, tutorías, FAQ) | Matriz fijo-administrable del Análisis Funcional, 2026 |
| RN-05 | El login es **exclusivo del personal que administra contenidos**; el contenido informativo es público | RF-23 (Análisis Funcional, 2026) |
| RN-06 | El instituto tiene 6 carreras; el listado debe mostrar nombre y modalidad, con horarios/turno en cada ficha | RF-01, RF-04 (Análisis Funcional, 2026) |
| RN-07 | Contacto y pie de página muestran la dirección confirmada **Misiones 26, C1083 ABB, CABA** y el horario de atención **lunes a viernes de 9:00 a 13:00 y de 18:30 a 22:30**; ya no se usa "exclusivamente nocturno". La modalidad de cursada es híbrida (⏳ confirmar Gestión Parlamentaria) | Devolución de Edith, 08/11/2026 (§11); Mapa del Sitio V3, 13/11/2026 |
| RN-08 | La barra superior mantiene los **3 accesos externos confirmados**: Campus Virtual (Moodle), SIU e inscripción oficial (GCBA). ⏳ Qué accesos rápidos quedan en la Home: Becas, Boleto y Mesas dejan de ser secciones propias | Devolución de Edith, 08/11/2026 (§12); Mapa del Sitio V3, 13/11/2026 |
| RN-09 | El asistente virtual (bot) queda fuera de la primera versión (etapa C); no debe aparecer en el sitio v1 | Análisis Funcional, 2026 (§7) |
| RN-10 | Las URLs oficiales externas (Moodle, inscripción GCBA, SIU) se muestran **solo cuando sean provistas por la institución**; mientras tanto se usan placeholders vacíos y los CTA se ocultan o atenúan | Análisis Funcional, 2026 (§8); Frontend |
| RN-11 | Los contenidos institucionales reales (textos, logos, datos de bedeles/SIU, fechas de mesas) pendientes del instituto no se inventan; se marcan 🔵/⏳ | Análisis Funcional, 2026 (§8, §11) |
| RN-12 | El sitio debe cumplir buenas prácticas de accesibilidad y responsive (mobile-first, ARIA, navegación por teclado, regla 90/10 de color) | Propuesta Tecnológica, 2026; UX/UI |
| RN-13 | Los errores del backend se manejan de forma centralizada en el interceptor HTTP, con estructura de error estandarizada `{ error: { code, message, details } }` | Respuesta del Backend, 15/09/2026 |
| RN-14 | El acceso a la navegación principal sigue el **Mapa del Sitio V3** (13/11/2026): menú de 7 pestañas —Inicio, Instituto, Carreras, Ingresantes, Alumnos, Tutoría y FAQ— más buscador global. Docentes, Novedades y Contacto quedan ⏳ con dueño en el ticket 0000099 | Mapa del Sitio V3, 13/11/2026; ticket 0000088 |

> Tabla 1. Reglas de negocio transversales del sitio.

## 2. Reglas pendientes de validación institucional

| Regla | Estado | Depende de |
|---|---|---|
| SIU: sistema exacto, público destinatario y nombre visible | 🔵 | Análisis Funcional / Edición |
| Bedeles: datos individuales o información genérica del rol | 🔵 | Análisis Funcional / Edición |
| Solicitud de títulos y traspasos: informativo vs. gestionable | 🟡 | Decisión por etapas (informativo en v1) |
| Roles de backend (ADMIN, EDITOR, EDITOR_NOTICIAS) | 🟡 | Validación con Análisis Funcional (BE-A7) |
| Ubicación de Docentes, Novedades y Contacto (pestaña o pie) | ⏳ | Ticket 0000099 (Análisis Funcional) |
| Accesos rápidos que quedan en la Home | ⏳ | Devolución de Edith, 08/11/2026 (§12) |
| Categoría Docentes en FAQ: ¿se elimina? | ⏳ | Devolución de Edith, 08/11/2026 (§8) |
| Becas, Boleto estudiantil y Trámite de títulos: ¿se quitan? | ⏳ | Devolución de Edith, 08/11/2026 (§6) |

## Referencias

IFTS N.º 12. (2026). Análisis funcional validado. `documentacion/frontend/analisis_funcional_validado.md`.

Equipo de Backend. (2026). Respuesta a definiciones técnicas formales. `documentacion/driveFrontend/04_backend/respuesta.md`.

Equipo de Frontend. (2026). Propuesta tecnológica — Frontend e Infraestructura. `documentacion/frontend/propuesta-tecnologica.md`.

Equipo de UX/UI. (2026). Mapa del Sitio V2. `documentacion/driveFrontend/02_ux_ui/mapa_sitio_ifts12_(V2).md`.

Equipo de UX/UI y Frontend. (2026). Mapa del Sitio V3. `docs/01_global/mapa_sitio_ifts12_v3.md`.