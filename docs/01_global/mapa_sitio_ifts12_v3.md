# Mapa del Sitio V3 — Sitio Web Institucional IFTS N.º 12

Fecha: 2026-11-13 · Estado: borrador

## Resumen

Reemplaza al **Mapa del Sitio V2** (UX/UI, 15/09/2026) como fuente de verdad de la
navegación y la arquitectura de información del sitio. Se deriva de la devolución de Edith
del 08/11/2026 —transcripta en `devolucion_edith_2026_11_13.md`— y de los tickets de
Mantis 0000088–0000093 y 0000095–0000096, que implementan esa devolución.

Fija **7 pestañas** en la navegación principal (Inicio, Instituto, Carreras, Ingresantes,
Alumnos, Tutoría y FAQ) y deja **3 bloques en ⏳** a decisión del instituto (Docentes,
Novedades y Contacto), con dueño en el ticket **0000099**. No decide contenidos
institucionales pendientes, no reemplaza al contrato visual de Figma y no define URLs.

**Leyenda:** ✅ validado por Edith · 🟡 estructura definida, contenido institucional
pendiente · ⏳ decisión del instituto sin responder.

## Fuente y alcance

- **Devolución de Edith (08/11/2026):** `docs/01_global/devolucion_edith_2026_11_13.md`
  (14 secciones). Es la fuente principal de este mapa.
- **Tickets de Mantis (11/11/2026):** `documentacion/driveFrontend/matis_frontend/`
  — 0000088 (menú), 0000089 (horarios), 0000090 (Tutoría), 0000091 (Ingresantes),
  0000092 (Alumnos), 0000093 (Programas), 0000095 (turnos), 0000096 (resoluciones).
- **Mapa del Sitio V2 (15/09/2026):** se conserva como entregable fechado de UX/UI en
  `documentacion/driveFrontend/02_ux_ui/mapa_sitio_ifts12_(V2).md`; **queda reemplazado**
  por este documento (ver §14).
- **Fuera de este mapa:** los contenidos institucionales (textos, fotos, nóminas, URLs,
  números de resolución) y las decisiones abiertas de la §9.

## 1. Navegación principal

Barra superior fija con isologotipo enlazado a Inicio, buscador global, 7 pestañas y
3 accesos externos (Campus Virtual Moodle, SIU · Autogestión e Inscripción GCBA). El
buscador global y los 3 accesos externos **se mantienen** (V2): la devolución no los
cuestiona y confirma el botón "Inscripción GCBA" de la barra y del pie.

| # | Pestaña | Alcance | Estado | Fuente |
|---|---|---|---|---|
| 1 | Inicio | Carrusel de fotos en transición, Novedades integradas, accesos rápidos y FAQ | ✅ estructura · 🟡 fotos y accesos rápidos | Devolución §1, §2; 0000088 |
| 2 | Instituto | Nosotros · Autoridades · Plantel administrativo · Régimen de Estudios y Enseñanza · Régimen de Convivencia | ✅ estructura · 🟡 contenidos | Devolución §1, §3 |
| 3 | Carreras | Oferta académica y ficha unificada por carrera | ✅ estructura · 🟡 datos oficiales | Devolución §1, §4; 0000093, 0000095, 0000096 |
| 4 | Ingresantes | Requisitos e inscripción por preinscripción del GCBA | ✅ estructura · ⏳ enlaces oficiales | Devolución §1, §5; 0000091 |
| 5 | Alumnos | Calendario académico + preguntas frecuentes | ✅ estructura · 🟡 contenidos y formato | Devolución §1, §6; 0000092 |
| 6 | Tutoría | Presentación y canal único de contacto | ✅ estructura · 🟡 material de apoyo | Devolución §1, §7; 0000090 |
| 7 | FAQ | Pestaña propia de preguntas frecuentes | ✅ pestaña · ⏳ alcance por categoría | Devolución §1, §8 |

Cambios de nombre: **"Institucional" → "Instituto"**, **"Estudiantes" → "Alumnos"** y
**"Tutorías" → "Tutoría"** (Devolución §1, §3 y §6; ticket 0000088). El cambio de etiqueta
no define por sí mismo un cambio de URL (ver §15).

## 2. Inicio

- **Carrusel:** reemplazar las fotos por imágenes institucionales nuevas y de mejor
  resolución. 🟡 El IFTS debe enviarlas; falta definir si las 2 fotos "Visita CIPPER" se
  quitan o quedan.
- **Novedades:** integrar las últimas noticias en el Inicio. Ya existe el bloque "Novedades
  del último mes"; se conserva el criterio de orden de la más reciente a la más antigua
  (RN-03). ⏳ Si además se mantiene la página con el listado completo (ver §9).
- **Accesos rápidos:** actualizar los enlaces según la nueva estructura; Becas, Boleto y
  Mesas dejan de ser secciones propias. ⏳ Qué accesos rápidos quedan (Devolución §12).
- **FAQ:** se mantiene el bloque de preguntas destacadas de la Home, con enlace a la pestaña
  FAQ.

## 3. Instituto

Cinco subapartados, en este orden:

| Subapartado | Contenido | Estado | Pendiente |
|---|---|---|---|
| Nosotros | Historia, misión institucional y rol del IFTS N.º 12 en la educación técnica superior pública de CABA | 🟡 | El IFTS envía el texto |
| Autoridades | Equipo de conducción y Consejo Directivo; se toma del sitio anterior (`ifts12online.com.ar`) | 🟡 | Edith confirma vigencia |
| Plantel administrativo | Listado del personal; **reemplaza la tabla de Bedelía por año** (1.º a 3.º). Los correos de bedelía pasan a las FAQ de Alumnos | 🟡 | Vigencia del listado y baja de la tabla por año |
| Régimen de Estudios y Enseñanza | Reemplaza "Reglamento orgánico" | 🟡 | Formato: texto en página o PDF |
| Régimen de Convivencia | Reemplaza "Código de convivencia" | 🟡 | Formato: texto en página o PDF |

- **"Otra normativa"** de la V2 no figura en la estructura de Edith: queda reemplazada por
  los dos regímenes.
- **Enlaces de interés** (Ciudad Bilingüe, Centro de Simulación): ⏳ Edith no los menciona
  en la nueva estructura; si quedan, faltan las URL.

## 4. Carreras

Ficha técnica unificada por carrera, con estos bloques:

| Bloque | Qué establece | Estado |
|---|---|---|
| Presentación y título oficial | Se mantiene; falta la presentación en AP, Políticas Culturales y Gestión Parlamentaria | 🟡 |
| Turno y modalidad | **Vespertino 18:30–22:30** en AP, Políticas Culturales, Análisis de Sistemas y Ciencia de Datos e IA; **Matutino 9:00–13:00** en Gestión Parlamentaria. Modalidad **híbrida** (clases presenciales y virtuales, sincrónicas o asincrónicas en el campus) | ✅ turno · ⏳ confirmar híbrida en las 5 carreras, incluida Gestión Parlamentaria |
| Plan de estudios | Se mantiene el PDF del plan vigente | ✅ |
| Materias y correlatividades | Materias con año/cuatrimestre en las 4 carreras que faltan; texto definitivo: "A continuación encontrarás el listado de asignaturas de la carrera y el año/cuatrimestre al cual pertenecen. Para detalles sobre el régimen de correlatividades asociado, podés revisar atentamente el plan de estudios." | 🟡 |
| Programas | **Se elimina** el apartado y su enlace del índice lateral: no se publican programas individuales | ✅ |
| Resoluciones | Se mantienen y se agrega la **descarga de la Resolución de aprobación** de cada carrera (Drive, "Info Carreras") | 🟡 números de AP, Políticas Culturales y CDIA; verificar 6336/23 de Análisis de Sistemas |
| Cuerpo docente | Cada carrera muestra **solo sus docentes**; se quita el listado por carrera de la sección Docentes | 🟡 faltan nóminas de CDIA y GP y datos de AP, Políticas Culturales y AS |

La bajada "turno exclusivamente nocturno" de la V2 y del código queda sin efecto.

## 5. Ingresantes

- **Se quita el listado de carreras** de la sección (confunde la navegación).
- **Inscripción:** preinscripción online por el sistema de la Agencia de Aprendizaje a lo
  Largo de la Vida (GCBA), con instructivo paso a paso y enlace. Tres preguntas con
  respuesta: ¿Cómo me inscribo? · ¿Qué requisitos necesito? (título secundario o
  certificado en trámite; convalidación si es del extranjero; DNI o pasaporte) · ¿Dónde
  hago la preinscripción? ⏳ Enlace a la preinscripción e instructivo (marcados
  `[INSERTAR]` por Edith). Con esos enlaces se resuelve también el botón "Inscripción GCBA"
  de la barra superior y del pie.
- **Se quitan** los bloques Fechas clave, Modalidad, Horarios, Equivalencias y Pases: los
  cuatro últimos pasan a Alumnos y la tabla de Fechas clave se retira salvo que el instituto
  confirme fechas para publicar (⏳).
- **Título y validez oficial:** se publica el texto de Edith; ⏳ ubicación propuesta:
  FAQ › Ingresantes.

## 6. Alumnos

Dos bloques, en este orden:

1. **Calendario académico** (primero). Las mesas de examen **no** tienen apartado propio:
   van dentro del calendario, con los eventos clave resaltados en negrita. ⏳ Formato: tabla,
   PDF descargable o ambos.
2. **Preguntas frecuentes desplegables** (reemplazan las tarjetas con viñetas de
   Regularidad, Constancias, Becas, Boleto, Títulos y Traspasos). Respuestas de Edith:
   inscripción a materias · correlativas · inscripción a finales · constancia de examen
   (hasta 7 días hábiles) · constancia de alumno regular · pase a otro IFTS · contacto con
   Bedelía · regularidad (75 % de asistencia, ya validada) · horarios y modalidad de cursada
   · contacto con docentes por mensajería y foros del campus.

Pendientes:

- ⏳ **Becas, Boleto estudiantil y Trámite de títulos** no figuran en la devolución: ¿se
  quitan?
- ⏳ **Equivalencias** está en el índice de Edith sin respuesta: ¿se usa
  `equivalencias.ifts12@gmail.com`?
- ⏳ Datos para completar respuestas: rutas en SIU-Guaraní (materias, finales, constancia de
  regular), archivo de constancia de examen, formulario y correo de pase, correos de Bedelía
  de las 5 carreras.

## 7. Tutoría

- **Presentación:** texto institucional de 3 párrafos (acompañamiento, permanencia y
  egreso) e imagen provistos por Edith. ✅
- **Se quita la tabla de días y horarios.** ✅
- **Canal único:** correo `clara.moroni@bue.edu.ar`, con asunto
  "Sitio Web - Tutorías - Tu Nombre y Apellido", indicando año y carrera. ✅
- **Formulario de contacto:** se quita el asunto "Tutorías" y el texto "Escribinos desde el
  formulario… asunto Tutorías"; se actualiza la FAQ "¿Cómo contacto al equipo de tutorías?".
  ✅
- ⏳ **Material de apoyo:** importar los recursos de orientación de "Comunidad Tutorías" del
  campus en secciones descargables (requiere acceso o exportación y gestión de documentos en
  el administrador).
- ⏳ **Eventos importantes:** mini carrusel de charlas, congresos e invitaciones (distinto de
  Novedades); requiere carga desde el administrador y definir si entra en la primera versión.

## 8. Preguntas frecuentes (FAQ)

- **Pestaña propia en el menú principal.** ✅
- Reemplaza las respuestas "pendiente de validación" por las respuestas de Edith (6 bloques
  temáticos) y las 5 ya validadas del documento ALUMNOS. ✅
- ⏳ Alcance: ¿la pestaña reúne todas las preguntas (Ingresantes, Alumnos, Docentes) o solo
  las generales? Propuesta: todas, por categoría, y las mismas preguntas se muestran dentro
  de cada sección.
- ⏳ Categoría **Docentes**: no tiene preguntas; ¿se elimina la pestaña Docentes de FAQ?

## 9. Bloques en ⏳ (Docentes, Novedades y Contacto)

Estos tres bloques no entran en las 7 pestañas, pero tienen contenido y pedidos definidos.
**No se resuelven por omisión.** Dueño de la decisión: ticket **0000099**
(`[AF][MENÚ] Confirmar ubicación de Docentes, Novedades y Contacto`, asignado a Melina
Gramajo), relacionado desde el ticket 0000088.

| Bloque | Definido por Edith | Pregunta abierta |
|---|---|---|
| **Docentes** | Quitar el listado de docentes por carrera (queda solo en cada ficha). Agregar el instructivo **Solicitud de Apto Médico**: turno por MiBA con cuenta `@bue`, 96 h de anticipación, requisitos del día del examen, plazo de 60 días desde la toma de posesión y contacto `turno.aptodoc@bue.edu.ar`. Nuevos contenidos: cronograma presencialidad/virtualidad · instructivo o link para DDJJ · instructivo y link para licencias médicas · link a la oferta de cargos de IFTS | ¿Pestaña aparte o acceso desde el pie? ¿Se publica el apto médico como PDF descargable o texto con PDF adjunto? ¿Se reemplaza el enlace acortado (`goo.su`) por la URL oficial de MiBA? ¿Siguen Comunicados, Concursos, Normativa docente, Instructivo y Documentación académica? |
| **Novedades** | Integrar las últimas noticias en el Inicio. Cargar 5 artículos iniciales: jubilación de parte del staff docente/administrativo · incorporación del secretario académico · ceremonia de egreso · eventos y actividades de cultura · Sistemas en la feria de ciencias (temas definidos; textos, fotos y fechas los escribe el IFTS) | ¿Se mantiene la página con el listado completo de novedades? |
| **Contacto** | Domicilio **Misiones 26, C1083 ABB, CABA**. Horario de atención **lunes a viernes de 9:00 a 13:00 y de 18:30 a 22:30**, que reemplaza "Atención exclusivamente nocturna" en barra superior, pie y Tutoría. Mapa de la zona de Once (Plaza Miserere) y transportes: colectivos 2, 5, 7, 8, 19, 31, 32, 41, 56, 57, 61, 62, 64, 68, 71, 75, 84, 86, 88, 90, 95, 98, 101, 103, 104, 105, 115, 118, 129, 132, 146, 151, 164, 168, 188 y 194; Subte A (Alberti y Plaza Miserere) y H (Plaza Once) | ¿Se mantiene la pestaña Contacto con el formulario? ¿Mapa embebido o enlace a Google Maps? ¿A qué correo llegan las consultas, quién las atiende, plazo de respuesta y teléfono? ¿Se aprueba el texto de política de privacidad o se quita la casilla? |

## 10. Pie de página

- **Domicilio** Misiones 26, C1083 ABB, CABA. ✅
- **Horario** lunes a viernes de 9:00 a 13:00 y de 18:30 a 22:30. ✅ Reemplaza "Atención
  exclusivamente nocturna" y se quita la leyenda "Exclusivamente nocturno · Presencial,
  Híbrida y a distancia".
- **Formulario de consulta directa** (validación de campos) y **política de privacidad**:
  🟡 depende del circuito de contacto y del texto legal.
- **Isologotipos obligatorios:** IFTS N.º 12, GCBA y UPCN. ✅
- **Leyenda** "los contenidos institucionales se validan con el equipo de UX/UI": 🟡
  cambiarla (los valida el instituto) o quitarla (Devolución §12).
- **Columnas del pie:** actualizar los enlaces según la nueva estructura; Becas, Boleto y
  Mesas dejan de ser secciones propias. ⏳ Qué accesos rápidos quedan en Inicio.

## 11. Requisitos funcionales afectados

El análisis funcional validado (RF-01…RF-34) sigue vigente; estos son los requisitos que
este mapa **reencuadra**. No se reescriben acá: se listan para que la auditoría no los lea
como contradicción.

| RF | Texto original | Reencuadre V3 |
|---|---|---|
| RF-01 | Mostrar el listado completo de carreras y modalidades | Se mantiene en Carreras; se quita de Ingresantes |
| RF-02 | Publicar requisitos y fechas de inscripción | Requisitos sí; fechas ⏳ (se retira la tabla si no se confirman) |
| RF-04 | Detallar horarios y turno **nocturno** de cada carrera | Turno vespertino/matutino por carrera |
| RF-05 | Informar equivalencias y pases | Pasan a Alumnos (FAQ) |
| RF-09 | Publicar fechas y modalidades de mesas de examen | Mesas dentro del calendario, sin apartado propio |
| RF-13 | Informar el boleto estudiantil | ⏳ ¿se quita? |
| RF-16 | Listar el cuerpo docente por carrera | Solo en la ficha de cada carrera |
| RF-22 | Contacto con dirección y horario **nocturno** | Dos franjas: 9–13 y 18:30–22:30 |
| RF-25 | Noticias del último mes visibles en portada | Se mantiene, integrado en Inicio |
| RF-29 | Información y contacto con bedeles | Plantel administrativo en Instituto; correos en FAQ de Alumnos |
| RF-31 | Procedimiento de solicitud de títulos | ⏳ ¿se quita? |
| RF-32 | Traspasos entre institutos | Pase a otro IFTS en FAQ de Alumnos |
| RF-33 | Enlaces de interés (Ciudad Bilingüe) | ⏳ ¿se quitan o quedan? |

## 12. Administrador de contenidos

Contenidos que el instituto necesita actualizar con frecuencia (Devolución §13). Los que hoy
**no** están en el panel requieren definición funcional y, en varios casos, backend:

| Contenido | Hoy en el panel | Definición a validar |
|---|---|---|
| Carreras: turno, horario, modalidad, duración, resolución, presentación | Sí (carreras y planes) | Que turno, horario y modalidad sean campos editables por carrera |
| Materias por año/cuatrimestre y docentes por carrera | Sí | Nada |
| PDF de planes y resoluciones | No | Subir y reemplazar el PDF de cada plan y resolución |
| Novedades (foto y fecha) | No | Alta, edición, publicación y baja |
| Fotos del carrusel de Inicio | No | Subir, ordenar y quitar |
| Eventos de Tutoría (mini carrusel) | No | Solo si entra en la primera versión |
| Material de Tutoría y documentos de Docentes (DDJJ, licencias, apto médico) | No | Documentos descargables por sección, con fecha de actualización |
| Calendario académico | No | Reemplazar cada ciclo (tabla o PDF) |
| Preguntas frecuentes | No (por API) | Alta, edición, orden y categoría |
| Autoridades y plantel administrativo | No | Edición de nombres y cargos |
| Consultas del formulario de contacto | No | Bandeja de consultas, cuando se defina el circuito |

**Accesos:** perfiles para **Edith Olmedo** y **Matías Sánchez**. ⏳ Diferencia entre
Administrador y Editor (hoy con el mismo alcance).

## 13. Pautas de UX/UI vigentes

Se conservan de la V2 las pautas que la devolución no modifica, con estas correcciones:

- Cabecera fija con regreso a Inicio, buscador y accesos a Moodle, SIU e Inscripción GCBA.
- Portada con banner institucional, accesos a los trámites más consultados y espacio para las
  noticias del mes.
- Fichas de carreras con estructura unificada por bloques (sin Programas).
- Responsive (desktop, tablet y mobile) y buenas prácticas de accesibilidad (RN-12), con la
  regla 90/10 de color y los isologotipos obligatorios en el pie.
- Estados de UI obligatorios: carga, sin datos y errores de validación en el formulario de
  consulta y en el login de administradores.
- **Se elimina** la indicación de recordar de forma permanente el turno "exclusivamente
  nocturno": el horario vigente son las dos franjas de atención.
- **Paleta de colores:** propuesta de Edith basada en los logos de UPCN y del IFTS 12 (azul
  UPCN, celeste, verde azulado, blanco y gris claro, con variantes) y collage de fotos. Es
  una **sugerencia, no obligatoria**; no se puede confirmar el Pantone sin el manual de
  marca de UPCN (⏳).

## 14. Reemplazos V2 → V3

| Bloque de la V2 | La V2 dice | La V3 establece |
|---|---|---|
| Navegación | 9 ítems | 7 pestañas + buscador + 3 accesos externos |
| Inicio | Carrusel, botonera, novedades y FAQ | Igual, con fotos nuevas y Novedades integradas; accesos rápidos a redefinir |
| Instituto ("Institucional") | Historia, autoridades, **bedelía por año**, normativa, enlaces | 5 subapartados: Nosotros, Autoridades, Plantel administrativo, Régimen de Estudios y Enseñanza, Régimen de Convivencia |
| Carreras | Turno **exclusivamente nocturno** y **programas descargables** | Turno por carrera (vespertino/matutino), sin Programas, resoluciones con descarga |
| Ingresantes | Listado de carreras, fechas clave, **horarios/modalidad/equivalencias/pases** | Sin listado ni esos bloques; preinscripción GCBA con instructivo |
| Alumnos ("Estudiantes") | 8 tarjetas y **mesas de examen como apartado** | Calendario primero + FAQ desplegable; mesas dentro del calendario |
| Tutoría ("Tutorías") | Días, horarios y modalidades | Sin tabla; canal único por correo |
| FAQ | Solo en pie y enlaces | Pestaña propia |
| Docentes | Pestaña con listado por carrera, comunicados y concursos | Sin listado; apto médico y 4 contenidos nuevos; ⏳ ubicación |
| Novedades | Pestaña con listado completo, filtros y detalle | Integrada en Inicio; ⏳ si se mantiene la página completa |
| Contacto y pie | "Exclusivamente nocturno"; sin mapa ni transportes | 9–13 y 18:30–22:30; mapa y transportes; ⏳ formulario y circuito |
| Pautas UX/UI | Recordar el turno nocturno | Dos franjas de atención; se quita esa indicación |

## 15. Qué no decide este mapa

- **URLs y rutas:** el cambio de etiqueta (Instituto, Alumnos, Tutoría) no obliga a cambiar
  las rutas actuales; cualquier migración de URL se define en la HU correspondiente.
- **Contenidos institucionales:** textos, fotos, nóminas docentes, números de resolución,
  correos, teléfono, enlaces oficiales y calendario.
- **Ubicación de Docentes, Novedades y Contacto:** ⏳ ticket 0000099.
- **Contrato visual:** el Figma v2 sigue siendo la referencia de diseño; su realineación a
  la V3 se resuelve en UX/UI.
- **Alcance de backend y panel:** solo se registra como dependencia (§12).

## 16. Impacto documental

Este mapa obliga a leer con la V3 los documentos que citaban la navegación de la V2:

| Documento | Qué cambia |
|---|---|
| `docs/01_global/reglas_negocio.md` | RN-07 (horarios), RN-08 (accesos rápidos) y RN-14 (navegación) |
| `docs/01_global/alcance.md` | §2 (secciones), §3 (navegación) y §5 (criterios de aceptación) |
| `docs/01_global/figma_v2_contrato_visual.md` | Nota de vigencia: el Figma se construyó con la V2 |
| `docs/02_technical/estado_implementacion.md` | Fuente de verdad de navegación y estado actual |
| `docs/04_user_stories/HU-01/` | README, caso de uso y pruebas |
| `docs/project_state.md` | Snapshot (menú y decisión activa) |
| `AGENTS.md`, `.opencode/rules/reglas-navegacion.md`, `reglas-guia-sitio-web.md`, `.opencode/skills/mejorar-navegacion-web/`, `crear-sitio-web-completo/` | Reglas y skills que fijaban el menú de 9 ítems |
| `documentacion/driveFrontend/02_ux_ui/mapa_sitio_ifts12_(V2).md` | Se conserva como entregable fechado; no se edita |

## Referencias

IFTS N.º 12. (2026). *Devolución de Edith — pendientes del sitio TEST*.
`docs/01_global/devolucion_edith_2026_11_13.md`.

Equipo de UX/UI. (2026). *Mapa General del Sitio V2*.
`documentacion/driveFrontend/02_ux_ui/mapa_sitio_ifts12_(V2).md`.

Carata, E. (2026). *Tickets de Mantis 0000088–0000093 y 0000095–0000096* [Frontend].
`documentacion/driveFrontend/matis_frontend/`.

Gramajo, M. (2026). *Ticket 0000099 — [AF][MENÚ] Confirmar ubicación de Docentes, Novedades
y Contacto*. Mantis.
