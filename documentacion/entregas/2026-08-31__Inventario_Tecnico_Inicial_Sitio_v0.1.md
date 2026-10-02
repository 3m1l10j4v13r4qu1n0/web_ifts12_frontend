# Inventario Técnico Inicial - Sitio Web IFTS N.º 12

Área: Frontend · Proyecto Sitio Web Institucional IFTS N.º 12 — 2026 · Etapa 1 (relevamiento) · Fecha: 31/08/2026

## Objetivo

Registrar el relevamiento técnico inicial del sitio web actual del IFTS N.º 12 y las secciones identificadas, a partir del relevamiento de Análisis (minuta del 27/08/2026) y del “Mapa Inicial del Sitio Web - IFTS 12 - 2026”. Es una revisión técnica exploratoria: **no se cierra diseño antes de validar con Análisis y UX/UI**.

------------------------------------------------------------------------

## Ficha del Sitio

| Campo | Valor |
|----|----|
| **URL / acceso actual** | El sitio actual es el espacio alojado en Moodle (`ifts12online`, según la minuta). \[URL oficial a completar con IFTS/Dirección\] |
| **Tipo de sitio** | Actualmente alojado en Moodle; el nuevo sitio lo reemplaza por una web institucional independiente. |
| **Hosting** | Servidor que administra el Moodle del IFTS N.º 12 (contacto: Oscar). Adopción del Plan B (VPS independiente) pendiente de aprobación. |
| **Estrategia de hosting** | Se evalúa si la nueva web convive con el Moodle o se aloja en otra instancia (Plan B: VPS independiente, build estático en Nginx). |
| **Responsive / accesibilidad** | A relevar en el sitio actual (objetivo del nuevo sitio: accesible, claro, administrable). |
| **Fecha de relevamiento** | 31/08/2026 |
| **Responsable del relevamiento** | Equipo Frontend (enlace: Emilio Aquino) |

------------------------------------------------------------------------

## Secciones del sitio identificadas (insumo del mapa inicial / relevamiento)

| \# | Página/Sección | Tipo de contenido | ¿Requiere datos dinámicos? | Puede avanzar con mocks |
|----|----|----|----|----|
| 1 | Home / Portada | Portada, accesos rápidos, carreras, novedades, comunidades, FAQ | Parcial | Sí (mocks) |
| 2 | Carreras | Listado y detalle de carreras, planes, correlatividades, programas | Sí | Parcial |
| 3 | Ingresantes | Modalidades, horarios, fechas de inscripción, equivalencias, trámites de pase | Sí | Parcial |
| 4 | Estudiantes | Servicios estudiantiles, régimen académico | Sí | Parcial |
| 5 | Docentes | Información para docentes | Sí | Parcial |
| 6 | Tutorías | Comunidad/Espacio de tutorías (acceso rápido) | Sí | Parcial |
| 7 | Institucional | Historia, autoridades, normativa, reglamento orgánico, código de convivencia, docentes, logos | Parcial | Parcial |
| 8 | Noticias / Novedades | Slider de noticias editable por el instituto, con historial | Sí | Sí (mocks) |
| 9 | FAQ | Preguntas frecuentes (ingresantes, estudiantes, docentes) | Parcial | Sí (mocks) |
| 10 | Contacto | Datos de contacto | Parcial | Sí (mocks) |

------------------------------------------------------------------------

## Accesos rápidos desde la Home (relevados en la minuta 27/08)

Campus virtual (aula), tutorías, becas, constancias, mesas de examen, calendario académico, preguntas frecuentes, carreras y contacto.

> Nota: el acceso “campus virtual” apunta a `ENLACES.moodle` (placeholder vacío) y “becas” quedó sin ruta hasta definir su página en UX/UI (ver vitácora Fase 2).

------------------------------------------------------------------------

## Comunidades relevadas (tres bloques visibles al ingresar)

- Comunidad de tutoría
- Comunidad de alumnos
- Comunidad docente

------------------------------------------------------------------------

## Carreras relevadas (muestra, sin confirmar) — minuta 27/08

- Gestión parlamentaria
- Administración y gestión de políticas culturales
- Administración pública
- (otras a confirmar con Análisis)

> Mocks marcados como provisorios en `constants/mock-data.ts`; pendientes de validación con Análisis.

------------------------------------------------------------------------

## Componentes reutilizables previstos (según la estructura del sitio)

| Componente | Estado en el código | Requiere datos externos |
|----|----|----|
| Header + navegación (logo a Home, menú 5 ítems) | Implementado | No |
| Footer institucional | Implementado | No |
| Portada (hero) | Implementado | Parcial |
| Tarjeta de carrera (CardCarrera) | Implementado | Parcial (mocks) |
| Tarjeta de noticia (CardNoticia) | Implementado | Sí (mocks) |
| FAQ / acordeón (FaqAcordeon) | Implementado | Sí (mocks) |
| Accesos rápidos (AccesosRapidos) | Implementado | Parcial |
| Slider de novedades (SliderNoticias) | Implementado | Sí (mocks) |
| Comunidades (Comunidades) | Implementado | Sí (mocks) |
| Botones (Button) | Implementado | No |

------------------------------------------------------------------------

## Requerimientos Potenciales de Datos/Servicios (para coordinar con Backend)

| \# | Funcionalidad | ¿Necesita datos dinámicos? | Backend involucrado |
|----|----|----|----|
| 1 | Carreras, planes, correlatividades, programas | Sí | Sí |
| 2 | Noticias/novedades (slider editable por el instituto) | Sí | Sí |
| 3 | FAQ | Parcial | Sí |
| 4 | Comunidades (tutoría, alumnos, docentes) | Sí | Sí |
| 5 | Administración de contenidos (roles/permisos de edición) | Sí | Sí |
| 6 | Enlace al Moodle (campus virtual) | No (enlace) | No (URL oficial) |
| 7 | Inscripción oficial | No (enlace) | No (URL oficial) |

------------------------------------------------------------------------

## Problemas / Consideraciones Técnicas Observadas (a partir del relevamiento)

| \# | Observación | Área afectada | Estado |
|----|----|----|----|
| 1 | El sitio actual está alojado en Moodle; se evalúa si convive o se separa con el nuevo sitio | Infra, Backend | En evaluación (Plan B) |
| 2 | Se necesita que el instituto pueda editar novedades y contenidos sin depender de un externo | Backend, Frontend | A definir límites de edición |
| 3 | Contenidos actuales sin sistematizar (planes, resoluciones, datos docentes) | Análisis | Requiere validación |
| 4 | URLs oficiales de Moodle e inscripción aún no disponibles | IFTS N.º 12 | Pendiente |

------------------------------------------------------------------------

## Dudas / Preguntas a resolver con otras áreas

- [ ] ¿El acceso a la nueva web reemplaza al Moodle en `ifts12online` o se configuran rutas para ambos? (Análisis/Infra)
- [ ] ¿Paleta de colores por carrera o única? (UX/UI)
- [ ] ¿Qué contenidos podrá editar internamente el instituto? (Análisis/Backend)
- [ ] ¿Mapa del sitio definitivo validado por Análisis? (Análisis)

------------------------------------------------------------------------

## Siguientes Pasos (Clase 4 - 07/09)

1.  Consolidar el inventario con las observaciones de Análisis y UX/UI.
2.  Producir el esqueleto HTML/prototipo semántico a partir de esta estructura (sin cerrar diseño).
3.  Devolver limitaciones o dudas técnicas a UX/UI.
4.  Validar el mapa del sitio y el inicio de la integración con Backend.

------------------------------------------------------------------------

## Historial de Cambios

| Fecha | Cambio | Motivo |
|----|----|----|
| 31/08/2026 | Creación del inventario técnico inicial | Inicio de Etapa 1 (clase 3) |

------------------------------------------------------------------------

**Elaborado por:** Nélida Fernández (Responsable de documentación) **Fecha de emisión:** 31/08/2026 **Revisado por:** Emilio Aquino (Coordinador/PM)
