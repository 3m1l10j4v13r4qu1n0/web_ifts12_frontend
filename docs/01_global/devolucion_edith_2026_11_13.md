---
# Tags del índice de memoria (D13): el CLI las scaffoldea, el Mentat ajusta.
tags:
  - devolucion
  - edith
  - instituto
  - ux
  - ui
  - contenidos
  - pendientes
---

# Devolución de Edith — pendientes del sitio TEST

> Documento de Capa 1 — Especificación. Transcribe la devolución de Edith (IFTS N.º 12)
> sobre el sitio TEST: por sección, qué cambia, dónde va, qué contenido ya está validado y
> qué falta confirmar. No agrega alcance nuevo ni responde las preguntas abiertas.

Fecha: 2026-11-13 · Estado: borrador

## Resumen

Devolución del instituto sobre el sitio TEST, ordenada en 14 secciones (menú, Inicio,
Instituto, Carreras, Ingresantes, Alumnos, Tutoría, FAQ, Docentes, Novedades, Contacto y pie,
general/diseño, administrador y pedidos al instituto). Fija qué contenido está validado, qué
falta confirmar, quién lo implementa y una lista de 15 pedidos al instituto. Los casos de
prueba y el registro en Mantis quedan a cargo de QA.

## Fuente

- Original: `inbox/_done/Pendientes + Devolución de Edith.pdf` (8 páginas, PDF de Microsoft Word,
  creado el 08/11/2026; archivado el 13/11/2026). Encabezado del original: "IFTS N.º 12 · Cruce
  pendientes / devolución Edith".
- Autoría: Edith (instituto), según la devolución transcripta.
- Transcripción: `inbox/_done/Pendientes + Devolución de Edith.md` (recibida el 2026-11-13). Este
  documento reproduce su contenido sección por sección; el `.md` no se versiona.

## Alcance del documento

Lo que sigue transcribe el original sin resumir ni completar datos: por sección se indica qué
cambia, dónde va, qué contenido ya está validado, qué falta confirmar y qué equipo lo
implementa. Nada se marca como final sin fuente y aprobación del instituto.

## 1. Nueva estructura del menú

| Hoy en TEST | Propuesta de Edith | Qué falta confirmar |
|---|---|---|
| Inicio | 1. Inicio (fotos en transición + novedades) | Nada |
| Institucional | 2. Instituto | Nada |
| Carreras | 3. Carreras | Nada |
| Ingresantes | 4. Ingresantes (requisitos + link de preinscripción) | Nada |
| Estudiantes | 5. Alumnos | Nada |
| Tutorías | 6. Tutoría | Nada |
| FAQ (solo en pie y enlaces) | 7. FAQ (pestaña propia) | Nada |
| Docentes | No figura entre las 7 pestañas, pero Edith le da contenido | ¿Pestaña aparte o acceso desde el pie? |
| Novedades | Integrada en Inicio | ¿Se mantiene la página con el listado completo? |
| Contacto | Datos en el pie de página | ¿Se mantiene la pestaña Contacto con el formulario? |

## 2. Inicio

| Qué cambia | Dónde va | Contenido ya validado | Qué falta confirmar | Equipo |
|---|---|---|---|---|
| Reemplazar las fotos del carrusel por fotos institucionales nuevas y de mejor calidad. | Inicio › carrusel | Pedido de Edith. | El IFTS tiene que enviar las fotos (en buena resolución). ¿Las 2 fotos "Visita CIPPER" se quitan o quedan? | UX/UI · Frontend |
| Integrar las Novedades en el Inicio (últimas noticias). | Inicio › Novedades | Edith lo pide. Ya existe el bloque "Novedades del último mes". | Los artículos (ver Novedades). ¿Se mantiene además la página /noticias con el listado completo? | Frontend |

## 3. Instituto

| Qué cambia | Dónde va | Contenido ya validado | Qué falta confirmar | Equipo |
|---|---|---|---|---|
| La pestaña "Institucional" pasa a llamarse Instituto, con 5 subapartados: Nosotros, Autoridades, Plantel administrativo, Régimen de Estudios y Enseñanza, Régimen de Convivencia. | Menú › Instituto | Estructura definida por Edith. | Nada | UX/UI · Frontend |
| Nosotros: historia, misión institucional y rol del IFTS N.º 12 en la educación técnica superior pública de CABA. | Instituto › Nosotros | Nada | El IFTS lo va a enviar. | Análisis |
| Autoridades: equipo de conducción y Consejo Directivo (hoy hay 3 tarjetas "a validar"). | Instituto › Autoridades | Edith indica tomarlo del sitio anterior (ifts12online.com.ar). | Que Edith confirme que los datos del sitio anterior siguen vigentes. | Análisis |
| Plantel administrativo: listado del personal. Reemplaza la tabla de Bedelía por año (1.º a 3.º). | Instituto › Plantel administrativo | Tomarlo del sitio anterior. | Vigencia del listado. ¿Se elimina la tabla de Bedelía por año? (los correos de bedelía pasan a las FAQ de Alumnos). | Análisis |
| Régimen de Estudios y Enseñanza y Régimen de Convivencia: reemplazan "Reglamento orgánico / Código de convivencia / Otra normativa". | Instituto › Régimen de… | Tomarlos del sitio anterior. | Formato: ¿texto en la página o PDF descargable? | Análisis · Frontend |
| Enlaces de interés (Ciudad Bilingüe, Centro de Simulación): Edith no los menciona en la nueva estructura. | Instituto | Nada | ¿Se quitan o quedan? Si quedan, faltan las URL. | Análisis |

## 4. Carreras

| Qué cambia | Dónde va | Contenido ya validado | Qué falta confirmar | Equipo |
|---|---|---|---|---|
| Turno: cambiar "exclusivamente nocturno" por Vespertino (18:30 a 22:30 h) en AP, Políticas Culturales, Análisis de Sistemas y Ciencia de Datos e IA. Gestión Parlamentaria: Matutino (9:00 a 13:00 h). | Cada ficha › Datos oficiales y Modalidad y horarios; tarjetas de carreras en Inicio | Validado por Edith. Nota: la carrera matutina es Gestión Parlamentaria (en el documento de pendientes figura como "Adm Parlamentaria"). | Nada | Backend (dato) · Frontend |
| Modalidad: híbrida (clases presenciales y virtuales, sincrónicas o asincrónicas en el campus). | Cada ficha › Modalidad | Texto de Edith (FAQ "¿Cuál es la modalidad de cursada?"). | ¿Es híbrida en las 5 carreras, incluida Gestión Parlamentaria? | Backend · Frontend |
| Eliminar el apartado Programas (y el enlace "Programas" del índice lateral). | Cada ficha | Validado por Edith: no se cargan programas individuales. | Nada | Frontend |
| Se mantienen el plan de estudios (PDF) y las resoluciones: agregar la descarga de la Resolución de aprobación en cada carrera. | Cada ficha › Plan de estudios / Resoluciones | Edith confirma que las resoluciones están en el Drive, carpeta "Info Carreras". | Número de resolución de AP, Políticas Culturales y CDIA (hoy PENDIENTE). Verificar la 6336/23 de Análisis de Sistemas con el archivo del Drive. | Análisis · Backend |
| Materias y correlatividades: cargar las materias con año/cuatrimestre desde el plan de estudios en las 4 carreras que faltan, y reemplazar la leyenda provisoria por el texto definitivo. | Cada ficha › Materias y correlatividades | Texto definitivo: "A continuación encontrarás el listado de asignaturas de la carrera y el año/cuatrimestre al cual pertenecen. Para detalles sobre el régimen de correlatividades asociado, podés revisar atentamente el plan de estudios." | Año de las materias de Políticas Culturales (la nómina no lo indica). Duración de Políticas Culturales (hoy PENDIENTE). | Análisis (relevar del PDF) · Backend (carga) |
| Cuerpo docente: cada carrera muestra solo sus docentes (ver Nomina_Docentes_Consolidada_IFTS12.xlsx). | Cada ficha › Cuerpo docente | AS: nómina completa con año, cuatrimestre, correlatividades y correo (PDF del instituto, confirma Res. 6336/23). Cultura: 26 materias con docente y correo, sin año. AP: 13 nombres, sin materia ni correo. CDIA y GP: sin nómina. | AP: materia y correo de cada docente. Cultura: año/cuatrimestre, 2 correos y si algunas materias son de AP. AS: docente de PPIV y 2 correos abreviados. Nombres distintos entre listas (Sabaz, Ezcurra). ¿Se publican los correos de docentes? | Análisis · Backend |
| Presentación de la carrera: falta en AP, Políticas Culturales y Gestión Parlamentaria. | Cada ficha › Presentación | Nada | Edith no lo menciona: ¿se toma del plan de estudios (perfil del egresado) y lo valida el IFTS? | Análisis |

## 5. Ingresantes

| Qué cambia | Dónde va | Contenido ya validado | Qué falta confirmar | Equipo |
|---|---|---|---|---|
| Quitar el listado de carreras de esta sección (confunde la navegación). | Ingresantes | Validado por Edith. | Nada | Frontend |
| Contenido principal: inscripción online por el sistema de preinscripción de la Agencia de Aprendizaje a lo Largo de la Vida (GCBA), con instructivo paso a paso y enlace. | Ingresantes › Inscripción a las tecnicaturas | 3 preguntas con respuesta: ¿Cómo me inscribo?, ¿Qué requisitos necesito? (título secundario o certificado en trámite; convalidación si es del extranjero; DNI o pasaporte) y ¿Dónde hago la preinscripción? | Enlace a la preinscripción y enlace al instructivo (marcados [INSERTAR] por Edith). Con eso se resuelve también el botón "Inscripción GCBA" de la barra superior y del pie. | Análisis · Frontend |
| Quitar los bloques que pasan a Alumnos o quedan sin uso: Fechas clave, Modalidad, Horarios, Equivalencias y Pases. | Ingresantes | Edith ubica Horarios, Modalidad, Equivalencias y Pases en Alumnos. | ¿Se publican fechas de inscripción? Si no, se quita la tabla de Fechas clave. | UX/UI · Frontend |
| Título y validez oficial (FAQ "¿Los títulos tienen validez nacional?"). | Ingresantes o FAQ | Texto de Edith. | Ubicación: proponemos FAQ › Ingresantes. | Análisis |

## 6. Alumnos

| Qué cambia | Dónde va | Contenido ya validado | Qué falta confirmar | Equipo |
|---|---|---|---|---|
| La pestaña "Estudiantes" pasa a llamarse Alumnos. Orden: 1) Calendario académico, 2) Preguntas frecuentes. | Menú › Alumnos | Validado por Edith. | Nada | UX/UI · Frontend |
| Quitar las tarjetas con viñetas (Regularidad, Constancias, Becas, Boleto, Títulos, Traspasos) y pasar el contenido a un listado desplegable de preguntas. | Alumnos › Preguntas frecuentes | Formato validado. Respuestas de Edith: inscripción a materias, correlativas, inscripción a finales, constancia de examen (hasta 7 días hábiles), constancia de alumno regular, pase a otro IFTS, contacto con Bedelía. Regularidad (75 % de asistencia) ya validada en las FAQ del sitio. | Becas, Boleto estudiantil y Trámite de títulos no aparecen en la devolución: ¿se quitan? Equivalencias está en el índice de Edith pero sin respuesta: ¿se usa la actual (equivalencias.ifts12@gmail.com)? | Análisis · Frontend |
| Datos que faltan dentro de las respuestas de Edith. | Alumnos › Preguntas frecuentes | Nada | Rutas en SIU-Guaraní (inscripción a materias, finales, constancia de regular). Archivo de constancia de examen. Formulario de pase y correo de envío. Correos de Bedelía de las 5 carreras. | Análisis (pedir al IFTS) |
| Calendario académico al inicio; no crear un apartado aparte de mesas de examen; resaltar en negrita los eventos clave (mesas). | Alumnos › Calendario académico | Edith confirma que el calendario está en el Drive. | ¿Se publica como tabla con las fechas destacadas, como PDF descargable o ambos? | Análisis · Frontend |
| Horarios y modalidad de cursada. | Alumnos (preguntas) | Respuestas de Edith (vespertino 18:30–22:30, matutino 9–13 solo GP; modalidad híbrida). | Nada | Frontend |
| Contacto con docentes por mensajería y foros del campus. | Alumnos o FAQ | Respuesta de Edith. | Nada | Frontend |

## 7. Tutoría

| Qué cambia | Dónde va | Contenido ya validado | Qué falta confirmar | Equipo |
|---|---|---|---|---|
| Presentación del espacio con el texto institucional (3 párrafos). | Tutoría › Presentación | Texto completo de Edith (acompañamiento, permanencia y egreso). Imagen para tutoría incluida en su documento. | Nada | Frontend |
| Quitar la tabla de días y horarios. Dejar solo el canal de contacto. | Tutoría | Validado. | Nada | Frontend |
| Canal único: correo de Clara Moroni (clara.moroni@bue.edu.ar), asunto "Sitio Web - Tutorías - Tu Nombre y Apellido", indicando año y carrera. | Tutoría › Correo de tutorías | Texto validado por Edith. | Nada | Frontend |
| Las consultas de tutorías no entran por el formulario de contacto: quitar el asunto "Tutorías" del formulario y el texto "Escribinos desde el formulario… asunto Tutorías". Actualizar la FAQ de contacto "¿Cómo contacto al equipo de tutorías?". | Contacto › formulario; Tutoría | Validado. | Nada | Frontend · Backend |
| Material de apoyo: importar los recursos de orientación del campus (Comunidad Tutorías) en secciones descargables. | Tutoría › Material de apoyo | Pedido de Edith. | Acceso al campus o exportación de los archivos; qué secciones y cuáles recursos priorizar. Requiere gestión de documentos en el administrador. | Análisis · Backend |
| Eventos importantes: mini carrusel para charlas, congresos e invitaciones (distinto de Novedades). | Tutoría | Pedido de Edith. | ¿Entra en la primera versión? Requiere que el IFTS pueda cargarlos desde el administrador. | Análisis · Backend · Frontend |

## 8. Preguntas frecuentes

| Qué cambia | Dónde va | Contenido ya validado | Qué falta confirmar | Equipo |
|---|---|---|---|---|
| Pestaña propia de Preguntas frecuentes en el menú principal. | Menú › FAQ | Estructura de Edith (7 pestañas). | ¿La pestaña reúne todas las preguntas (Ingresantes, Alumnos, Docentes) o solo las generales? Proponemos: reúne todas, por categoría, y las mismas preguntas se muestran dentro de cada sección. | Análisis · UX/UI |
| Reemplazar las respuestas "pendiente de validación" por las respuestas de Edith y las 5 ya validadas. | FAQ | Respuestas de Edith (6 bloques temáticos) + 5 validadas del documento ALUMNOS. | La categoría Docentes no tiene preguntas: ¿se elimina la pestaña Docentes de FAQ? | Análisis · Backend |

## 9. Docentes

| Qué cambia | Dónde va | Contenido ya validado | Qué falta confirmar | Equipo |
|---|---|---|---|---|
| Quitar el listado de docentes por carrera de esta sección (queda solo en cada carrera). | Docentes | Validado por Edith. | Nada | Frontend |
| Agregar el instructivo Solicitud de Apto Médico (turno por MiBA con cuenta @bue, 96 h de anticipación, requisitos del día del examen, plazo de 60 días desde la toma de posesión, contacto turno.aptodoc@bue.edu.ar). | Docentes › Documentación / Trámites | Documento compartido por Edith ("Turno Apto Médico - actualizada", 2 páginas, GCBA). | ¿Se publica el PDF como descargable o se resume en texto con el PDF adjunto? El formulario usa un enlace acortado (goo.su): pedir la URL oficial de MiBA, porque los enlaces acortados pueden dejar de funcionar. Confirmar cada cuánto se actualiza. | Análisis · Frontend |
| Nuevo contenido de la sección: Cronograma presencialidad/virtualidad · Instructivo o link para completar DDJJ · Instructivo y link para cargar licencias médicas · Link a la oferta de cargos de IFTS. | Docentes | Los 4 ítems los define Edith. | Los 4 enlaces/archivos. ¿Siguen Comunicados, Concursos, Normativa docente, Instructivo y Documentación académica? Docentes no figura en el menú de 7 pestañas: ¿pestaña aparte o acceso desde el pie? | Análisis |

## 10. Novedades

| Qué cambia | Dónde va | Contenido ya validado | Qué falta confirmar | Equipo |
|---|---|---|---|---|
| Cargar 5 artículos iniciales: jubilación de parte del staff docente/administrativo, incorporación del secretario académico, ceremonia de egreso, eventos y actividades de cultura, Sistemas en la feria de ciencias. | Novedades (y su bloque en Inicio) | Temas definidos por Edith. | Los textos, fotos y fechas de cada artículo (los escribe el IFTS). Requiere carga de novedades desde el administrador. | Análisis · Backend |

## 11. Contacto y pie de página

| Qué cambia | Dónde va | Contenido ya validado | Qué falta confirmar | Equipo |
|---|---|---|---|---|
| Domicilio: Misiones 26, Ciudad de Buenos Aires. | Contacto y pie | Validado. | Nada | Frontend |
| Horario de atención: lunes a viernes de 9:00 a 13:00 h y de 18:30 a 22:30 h. Reemplaza "Atención exclusivamente nocturna" de la barra superior, el pie y Tutoría. | Barra superior, pie, Contacto | Validado por Edith. | Nada | Frontend |
| Quitar del pie "Exclusivamente nocturno · Presencial, Híbrida y a distancia". | Pie | Corrección derivada de turnos y modalidad validados. | Nada | Frontend |
| Mapa de la zona de Once (Plaza Miserere) y transportes: colectivos 2, 5, 7, 8, 19, 31, 32, 41, 56, 57, 61, 62, 64, 68, 71, 75, 84, 86, 88, 90, 95, 98, 101, 103, 104, 105, 115, 118, 129, 132, 146, 151, 164, 168, 188 y 194; Subte A (Alberti y Plaza Miserere) y H (Plaza Once). | Contacto › Ubicación y Cómo llegar | Listado y mapa de referencia de Edith. | Mapa embebido o enlace a Google Maps (Edith acepta propuestas). | UX/UI · Frontend |
| Correo institucional de contacto y circuito del formulario. | Contacto, pie, FAQ de contacto | Nada | Sigue sin definirse: a qué correo llegan las consultas, quién las atiende, plazo de respuesta y teléfono. Sin esto Backend no puede habilitar el envío de correos. | Análisis · Backend |
| Política de privacidad (el formulario exige aceptarla y la página da 404). | Contacto | Nada | Texto a aprobar por el IFTS o quitar la casilla. | Análisis |

## 12. General, diseño e imágenes

| Qué cambia | Dónde va | Contenido ya validado | Qué falta confirmar | Equipo |
|---|---|---|---|---|
| Pie: cambiar "los contenidos institucionales se validan con el equipo de UX/UI" (los valida el instituto) o quitar la leyenda. | Pie | Nada | Nada | Frontend |
| Pie y accesos rápidos: actualizar los enlaces según la nueva estructura (Becas, Boleto y Mesas dejan de ser secciones propias). | Pie, Inicio | Deriva de la nueva estructura. | Qué accesos rápidos quedan en Inicio. | UX/UI · Frontend |
| Paleta de colores basada en los logos de UPCN y del IFTS 12 (azul UPCN, celeste, verde azulado, blanco, gris claro), con variantes; collage de fotos. | Diseño general | Propuesta de Edith (sugerencia, no obligatoria). | Edith aclara que no se puede confirmar el Pantone sin el manual de marca de UPCN. | UX/UI |
| Imágenes: el IFTS debe enviar más fotos y en buena resolución. | Todo el sitio | Nada | Fotos del IFTS. | Análisis (pedir) |

## 13. Qué va a poder editar el instituto desde el administrador

Hoy el panel administra solo carreras, planes, materias, materias por plan, docentes y
docentes por materia. Según la devolución, el instituto necesita actualizar seguido estos
contenidos:

| Contenido | ¿Está hoy en el panel? | Definición funcional a validar |
|---|---|---|
| Carreras: turno, horario, modalidad, duración, resolución, presentación | Sí (carreras y planes) | Confirmar que turno, horario y modalidad sean campos editables por carrera. |
| Materias por año/cuatrimestre y docentes por carrera | Sí | Nada |
| PDF de planes y resoluciones | No | Poder subir y reemplazar el PDF de cada plan y resolución. |
| Novedades (con foto y fecha) | No | Alta, edición, publicación y baja de novedades. |
| Fotos del carrusel de Inicio | No | Subir, ordenar y quitar fotos. |
| Eventos de Tutoría (mini carrusel) | No | Solo si entra en la primera versión. |
| Material de apoyo de Tutoría y documentos de Docentes (DDJJ, licencias, apto médico) | No | Gestión de documentos descargables por sección, con fecha de actualización. |
| Calendario académico | No | Reemplazar el calendario cada ciclo (tabla o PDF). |
| Preguntas frecuentes | No (se cargan por API) | Alta, edición, orden y categoría (Ingresantes, Alumnos, Docentes). |
| Autoridades y plantel administrativo | No | Edición de nombres y cargos. |
| Consultas del formulario de contacto | No | Bandeja de consultas, solo cuando se defina el circuito. |

### Accesos al panel

- Perfil administrador para **Edith Olmedo** y **Matías Sánchez**.
- Falta definir la diferencia entre Administrador y Editor: hoy los dos roles tienen el mismo
  alcance. ¿Ambos son Administradores, o uno edita contenido sin gestionar usuarios?

## 14. Lo que hay que pedir al instituto

Para centralizar, en orden de prioridad:

1. Enlace a la preinscripción (Agencia de Aprendizaje a lo Largo de la Vida) y enlace al
   instructivo paso a paso.
2. Correos de Bedelía de las 5 carreras.
3. Correo institucional que recibe las consultas del formulario, quién las atiende, plazo de
   respuesta y teléfono.
4. Rutas en SIU-Guaraní: inscripción a materias, a finales y constancia de alumno regular.
5. Archivo descargable de constancia de examen; formulario y correo para pases a otro IFTS.
6. Calendario académico del Drive en versión final.
7. Números de resolución de AP, Políticas Culturales y Ciencia de Datos e IA (Drive, "Info
   Carreras"), y verificación de la 6336/23 de Análisis de Sistemas.
8. Nóminas docentes de CDIA y GP; materia y correo de los 13 docentes de AP; año/cuatrimestre
   de las materias de Políticas Culturales; docente de PPIV en Análisis de Sistemas; archivo
   "Datos docentes de AyGPC" (llegó vacío).
9. Texto de Nosotros (historia, misión y rol del IFTS).
10. Los 5 artículos de Novedades con fotos y fechas.
11. Fotos institucionales en buena resolución.
12. Enlaces de Docentes: cronograma presencialidad/virtualidad, DDJJ, licencias médicas y
    oferta de cargos; URL oficial del formulario de apto médico (reemplazar el enlace
    acortado).
13. Acceso o exportación del material de Comunidad Tutorías del campus.
14. Decisiones: ¿quedan Becas, Boleto estudiantil y Trámite de títulos? ¿Equivalencias usa
    equivalencias.ifts12@gmail.com? ¿Quedan los enlaces Ciudad Bilingüe y Centro de
    Simulación? ¿Eventos de Tutoría en la primera versión? ¿Modalidad híbrida también en
    Gestión Parlamentaria?
15. Texto de política de privacidad del formulario.

## Preguntas abiertas al instituto

Extraídas de la columna "Qué falta confirmar" de cada tabla; no hay respuestas acá. Son
dependencias del instituto, no defectos del sitio.

### Menú y secciones

- Docentes: ¿pestaña aparte o acceso desde el pie?
- Novedades: ¿se mantiene la página con el listado completo?
- Contacto: ¿se mantiene la pestaña Contacto con el formulario?

### Inicio

- El IFTS tiene que enviar las fotos (en buena resolución). ¿Las 2 fotos "Visita CIPPER" se
  quitan o quedan?
- Los artículos (ver Novedades). ¿Se mantiene además la página /noticias con el listado
  completo?

### Instituto

- Nosotros: el IFTS lo va a enviar.
- Autoridades: que Edith confirme que los datos del sitio anterior siguen vigentes.
- Plantel administrativo: vigencia del listado. ¿Se elimina la tabla de Bedelía por año?
- Régimen de Estudios y Enseñanza y Régimen de Convivencia: formato, ¿texto en la página o
  PDF descargable?
- Enlaces de interés: ¿se quitan o quedan? Si quedan, faltan las URL.

### Carreras

- ¿Es híbrida en las 5 carreras, incluida Gestión Parlamentaria?
- Número de resolución de AP, Políticas Culturales y CDIA (hoy PENDIENTE). Verificar la
  6336/23 de Análisis de Sistemas con el archivo del Drive.
- Año de las materias de Políticas Culturales (la nómina no lo indica). Duración de Políticas
  Culturales (hoy PENDIENTE).
- AP: materia y correo de cada docente. Cultura: año/cuatrimestre, 2 correos y si algunas
  materias son de AP. AS: docente de PPIV y 2 correos abreviados. Nombres distintos entre
  listas (Sabaz, Ezcurra). ¿Se publican los correos de docentes?
- Presentación: ¿se toma del plan de estudios (perfil del egresado) y lo valida el IFTS?

### Ingresantes

- Enlace a la preinscripción y enlace al instructivo (marcados [INSERTAR] por Edith).
- ¿Se publican fechas de inscripción? Si no, se quita la tabla de Fechas clave.
- Ubicación de "Título y validez oficial": se propone FAQ › Ingresantes.

### Alumnos

- Becas, Boleto estudiantil y Trámite de títulos no aparecen en la devolución: ¿se quitan?
  Equivalencias está en el índice de Edith pero sin respuesta: ¿se usa la actual
  (equivalencias.ifts12@gmail.com)?
- Rutas en SIU-Guaraní (inscripción a materias, finales, constancia de regular). Archivo de
  constancia de examen. Formulario de pase y correo de envío. Correos de Bedelía de las 5
  carreras.
- Calendario académico: ¿se publica como tabla con las fechas destacadas, como PDF
  descargable o ambos?

### Tutoría

- Material de apoyo: acceso al campus o exportación de los archivos; qué secciones y cuáles
  recursos priorizar. Requiere gestión de documentos en el administrador.
- Eventos importantes: ¿entra en la primera versión? Requiere que el IFTS pueda cargarlos
  desde el administrador.

### Preguntas frecuentes

- ¿La pestaña reúne todas las preguntas (Ingresantes, Alumnos, Docentes) o solo las
  generales?
- La categoría Docentes no tiene preguntas: ¿se elimina la pestaña Docentes de FAQ?

### Docentes

- Apto médico: ¿se publica el PDF como descargable o se resume en texto con el PDF adjunto?
  Pedir la URL oficial de MiBA en lugar del enlace acortado (goo.su). Confirmar cada cuánto se
  actualiza.
- Nuevo contenido: los 4 enlaces/archivos. ¿Siguen Comunicados, Concursos, Normativa docente,
  Instructivo y Documentación académica? ¿Pestaña aparte o acceso desde el pie?

### Novedades

- Los textos, fotos y fechas de cada artículo (los escribe el IFTS). Requiere carga de
  novedades desde el administrador.

### Contacto y pie de página

- Mapa: embebido o enlace a Google Maps (Edith acepta propuestas).
- Correo institucional: sigue sin definirse a qué correo llegan las consultas, quién las
  atiende, plazo de respuesta y teléfono. Sin esto Backend no puede habilitar el envío de
  correos.
- Política de privacidad: texto a aprobar por el IFTS o quitar la casilla.

### General, diseño e imágenes

- ¿Qué accesos rápidos quedan en Inicio?
- Paleta: Edith aclara que no se puede confirmar el Pantone sin el manual de marca de UPCN.
- Imágenes: fotos del IFTS en buena resolución.

### Administrador

- Confirmar que turno, horario y modalidad sean campos editables por carrera.
- ¿Ambos perfiles (Edith Olmedo y Matías Sánchez) son Administradores, o uno edita contenido
  sin gestionar usuarios?

### Lista de 15 pedidos al instituto

Los mismos 15 puntos de la sección 14, en orden de prioridad:

1. Enlace a la preinscripción y enlace al instructivo paso a paso.
2. Correos de Bedelía de las 5 carreras.
3. Correo institucional del formulario, quién atiende, plazo de respuesta y teléfono.
4. Rutas en SIU-Guaraní: inscripción a materias, a finales y constancia de alumno regular.
5. Archivo de constancia de examen; formulario y correo para pases a otro IFTS.
6. Calendario académico del Drive en versión final.
7. Resoluciones de AP, Políticas Culturales y CDIA, y verificación de la 6336/23 de Análisis de
   Sistemas.
8. Nóminas docentes de CDIA y GP; materia y correo de los 13 docentes de AP; año/cuatrimestre
   de Políticas Culturales; docente de PPIV de Análisis de Sistemas; archivo "Datos docentes de
   AyGPC".
9. Texto de Nosotros (historia, misión y rol del IFTS).
10. Los 5 artículos de Novedades con fotos y fechas.
11. Fotos institucionales en buena resolución.
12. Enlaces de Docentes y URL oficial del formulario de apto médico.
13. Acceso o exportación del material de Comunidad Tutorías del campus.
14. Decisiones: Becas, Boleto y Títulos; Equivalencias; Ciudad Bilingüe y Centro de
    Simulación; Eventos de Tutoría; modalidad híbrida en Gestión Parlamentaria.
15. Texto de política de privacidad del formulario.
