# Auditoría del artefacto web del sitio IFTS N.º 12 contra la documentación del proyecto (v1)

> Fecha: 2026-11-18.
> Alcance: Capa 4 — verificación semántica. Se audita el **artefacto publicado en Claude**
> (`https://claude.ai/artifact/1u1GBH5ZWPkSu9xuC9zLWX`, slug
> `0742d659-8400-4352-b2aa-e2e6190cdc24`, versión `1794866524-026e`, publicada el
> 16/11/2026 22:02 UTC), no el código de `src/` ni el sitio TEST.
>
> Pregunta que responde este informe: **¿el artefacto refleja lo que especifican el Mapa del
> Sitio V3, las HU-03 a HU-06, las reglas de negocio y la devolución de Edith? ¿Qué está
> implementado y qué no?**
>
> Es el **mismo artefacto** que auditó `audit_2026-11-13-prototipo-claude-ux-ui.md`, pero
> republicado: ya no es la maqueta HTML del 13/11, sino un **build de Vite de la SPA React**
> (`assets/index-DeVhpH_p.js`, 654 KB) con las respuestas de la API **congeladas** dentro del
> bundle (carreras, planes, materias, cuerpo docente, documentos, FAQ, personas, slider y
> calendario, con fecha 16/11/2026), más una página `panel.html` con 11 capturas del panel de
> administración y una página `pdf-no-incluido.html`.
>
> Procedencia: entrega externa `auditoria_artefacto_web_v1.md`, incorporada desde `inbox/`
> el 19/11/2026 con aprobación del usuario; original archivado en `inbox/_done/`.

## Veredicto en una línea

El artefacto ya tiene **el contenido de la devolución de Edith bien aplicado** en Tutoría,
horarios, Ingresantes, Alumnos, fichas de carrera, Contacto y pie (20 de 35 criterios de
aceptación cumplidos). Pero **no aplica la navegación del Mapa V3**: sigue con el menú de 9
ítems y los nombres «Institucional» y «Tutorías», y deja la FAQ fuera de las pestañas. También
**publica datos que la documentación todavía marca como no validados**: el enlace de
preinscripción y los PDF de resoluciones. El instructivo de **Apto Médico** sigue sin estar.

## 1. Resumen ejecutivo

Leyenda: ✅ implementado · 🟡 parcial · ❌ no implementado · ⚠️ implementado, pero contradice o
se adelanta a la documentación · ⏳ no verificable o depende del instituto.

### 1.1 Criterios de aceptación de las HU de la devolución de Edith

| HU | Tema | CA | ✅ | 🟡 | ❌ | ⚠️ | ⏳ |
|---|---|---:|---:|---:|---:|---:|---:|
| HU-03 | Navegación V3 | 8 | 2 | 3 | 3 | 0 | 0 |
| HU-04 | Horarios y Tutoría | 8 | 7 | 1 | 0 | 0 | 0 |
| HU-05 | Ingresantes y Alumnos | 11 | 6 | 3 | 0 | 1 | 1 |
| HU-06 | Fichas de carrera | 8 | 5 | 2 | 0 | 1 | 0 |
| **Total** | | **35** | **20** | **9** | **3** | **2** | **1** |

### 1.2 Lo que el artefacto resuelve

- **Horarios de atención** en las dos franjas (9:00–13:00 y 18:30–22:30) en barra superior,
  pie y Contacto; no queda ningún «nocturno» en el sitio (0 apariciones en 23 rutas).
- **Tutoría** completa: los 3 párrafos de Edith, la imagen, el canal único
  `clara.moroni@bue.edu.ar` con `mailto:` y asunto precargado, la indicación de año y carrera,
  sin tabla de horarios y sin el asunto «Tutorías» en el formulario.
- **Ingresantes** sin listado de carreras, sin Modalidad, Horarios, Equivalencias ni Pases y
  sin Fechas clave; con requisitos y las 4 preguntas (incluida la de validez del título).
- **Alumnos**: primero el calendario y después 13 preguntas desplegables con respuestas de
  Edith; sin apartado de mesas.
- **Fichas de carrera**: las 5 carreras, sin «Programas», turno y horario por carrera
  (4 vespertinas y Gestión Parlamentaria matutina), modalidad de Gestión Parlamentaria
  «A confirmar por el instituto», materias por año y cuatrimestre y cuerpo docente por
  carrera.
- **Instituto**: los 5 subapartados en el orden de Edith; el Plantel administrativo reemplaza
  la tabla de Bedelía por año; Régimen de Convivencia con 2 PDF del Drive.
- **Contacto**: vuelve el formulario (cierra PROTO-03), sin asunto Tutorías, con página de
  política de privacidad (antes daba 404) y mensaje honesto de vista previa al enviar.
- **Pie**: domicilio, horario, 36 líneas de colectivo, subte, esquema del barrio y enlace a
  Google Maps, isologotipos IFTS, GCBA y UPCN, y la leyenda corregida («validados por el
  instituto»).
- **Sin desborde horizontal** a 1440, 1024, 768 y 375 px en las 7 rutas medidas.
- **Trazabilidad de datos:** cada registro de FAQ, persona y documento trae un campo
  `fuente` (por ejemplo, «Revisión de Edith Olmedo Carmona… 13/11/2026»).

### 1.3 Lo que no se puede dar por resuelto

1. **Menú de 9 ítems** con nombres viejos; FAQ solo en la barra superior (HU-03, RN-14).
2. **Enlace de preinscripción publicado** sin fuente documentada. Los propios datos del
   artefacto dicen «Se omitió [INSERTAR ENLACE A LA PREINSCRIPCIÓN] hasta recibirlo»
   (CA-05-05, RN-10).
3. **Resoluciones enlazadas sin validar**, incluida la 6336/23 de Análisis de Sistemas, que
   su propio registro marca «a verificar (AF)» (CA-06-06).
4. **Apto Médico ausente** en Docentes, y el buscador no lo encuentra (PROTO-02 sigue
   abierto).
5. **3 de los 10 temas de Alumnos faltan**: constancia de examen, pase a otro IFTS y contacto
   con Bedelía (CA-05-09).
6. **Los 12 enlaces a PDF de la vista previa caen en 404** del propio sitio (ART-05).
7. **Contrato visual**: H1 de 92 px en las páginas internas, tipografías fuera de contrato,
   indicadores del carrusel de 4 px, rótulos del pie de 11 px y 1 columna a 375 px.

## 2. Método y límites

1. Se descargaron los 32 archivos del artefacto con `read_file` (hashes SHA-256 verificados
   contra `list_files`) y se sirvieron en local (`python3 -m http.server`).
2. El router es de **hash** (`index.html#/ruta`). Se recorrieron en Chrome headless
   (Playwright) 23 rutas: las 16 del router (incluidas `/admin`, `/privacidad` y una
   inexistente), las 5 fichas de carrera y 2 detalles inexistentes.
3. Por cada ruta se extrajo el texto renderizado (`innerText` del `main`, del `header` y del
   `footer`), los enlaces y una captura de página completa. Las respuestas de FAQ se leyeron
   del bundle, porque el acordeón abre una sola pregunta por vez.
4. Se midió a 1440, 1024, 768 y 375 px: desborde (`scrollWidth − innerWidth`), tamaño del
   H1, controles visibles con alto menor a 44 px, tipografía mínima del pie y columnas de
   las grillas de la Home.
5. Se probaron interacciones: carrusel (autoplay, pausa), buscador (botón, Ctrl+K, Esc),
   menú móvil (apertura, foco, bloqueo de scroll, Esc), formulario de Contacto (vacío y
   completo), login de administración y enlaces a PDF.
6. **Límites.** No hay backend: el envío de formularios y el login muestran el aviso de vista
   previa. El panel se evalúa **solo por las capturas** de `panel.html`. El calendario y las
   novedades vienen vacíos en los datos congelados, así que su formato no se puede verificar.
   BUG-004 (teclado virtual que tapa «Enviar») requiere un dispositivo real: no se evaluó.
7. Los nombres de personas y los números de resolución **no se validaron** contra el
   instituto: el informe solo registra si la documentación los da por validados o no.

## 3. Matriz de criterios de aceptación

### 3.1 HU-03 — Navegación según el Mapa del Sitio V3

| CA | Estado | Evidencia en el artefacto |
|---|---|---|
| CA-03-01 · 7 pestañas en orden | ❌ | El menú de escritorio tiene **9 ítems**: Inicio, Carreras, Ingresantes, Alumnos, Tutorías, Docentes, Institucional, Novedades, Contacto. Instituto no está segunda y FAQ no figura. |
| CA-03-02 · Instituto / Alumnos / Tutoría | 🟡 | «Alumnos» sí (menú, H1, breadcrumb y pie). «Institucional» y «Tutorías» siguen en el menú, el pie, el H1 y el breadcrumb. |
| CA-03-03 · FAQ como pestaña activa | ❌ | «Preguntas frecuentes» está en la barra superior y en el pie, no entre las pestañas. En el menú móvil aparece como décimo ítem, sin número. |
| CA-03-04 · No migrar URLs | ✅ | `/institucional` y `/tutorias` responden; `/estudiantes` redirige a `/alumnos` y sigue funcionando. |
| CA-03-05 · Docentes, Novedades y Contacto fuera del menú | ❌ | Los tres están en el menú principal (ítems 06, 08 y 09). La documentación los deja sin enlace en el menú hasta que responda 0000099. |
| CA-03-06 · Menú móvil igual, sin desborde, con teclado | 🟡 | Sin desborde a 375 px, Esc cierra, el foco va al primer ítem y bloquea el scroll. Pero muestra los 9 ítems + FAQ + Campus + SIU, no las 7 pestañas. |
| CA-03-07 · Pie con nombres nuevos y sin Becas/Boleto/Mesas | 🟡 | No anuncia Becas, Boleto ni Mesas. Sigue con «Institucional» y «Tutorías». |
| CA-03-08 · Sin anotaciones de diseño | ✅ | 0 apariciones de `RF-`, «PENDIENTE INSTITUCIONAL» o códigos B/I/M en las 23 rutas. |

> **Nota:** `docs/project_state.md` declara HU-03 **implementada y verificada** (16–18/11)
> sobre `fix/integracion-test-20261031`. El artefacto, publicado el 16/11 a las 22:02 UTC,
> no tiene ese menú: o se armó desde otra rama o es anterior a ese commit. Ver ART-01.

### 3.2 HU-04 — Horarios de atención y Tutoría

| CA | Estado | Evidencia |
|---|---|---|
| CA-04-01 · Barra superior: dirección y dos franjas | 🟡 | «Misiones 26, CABA · Lun a vie · 9 a 13 h y 18:30 a 22:30 h». Falta el código postal **C1083 ABB** que pide el CA; el bundle lo tiene (`direccionPostal`) pero no lo usa. |
| CA-04-02 · Pie con dos franjas y sin leyenda «nocturno» | ✅ | «Lunes a viernes de 9:00 a 13:00 h y de 18:30 a 22:30 h». Sin «Exclusivamente nocturno · Presencial, Híbrida y a distancia». |
| CA-04-03 · Contacto con dos franjas | ✅ | Mismo texto en «Datos institucionales». |
| CA-04-04 · Tutoría sin tabla | ✅ | No hay tabla de días, horarios ni modalidades. |
| CA-04-05 · Correo, asunto, año y carrera, `mailto:` | ✅ | `mailto:clara.moroni@bue.edu.ar?subject=Sitio%20Web%20-%20Tutor%C3%ADas%20-%20Tu%20Nombre%20y%20Apellido`, con «No olvides indicar el año y la carrera» y botón «Copiar correo». |
| CA-04-06 · Sin asunto «Tutorías» | ✅ | Opciones del selector: «Consulta general» e «Ingreso». La página deriva al correo. |
| CA-04-07 · FAQ de tutorías | ✅ | «Tengo dificultades con la cursada, ¿cómo puedo comunicarme con el sector de Tutorías?», con correo y asunto oficiales. |
| CA-04-08 · Sin anotaciones | ✅ | Ninguna en Tutoría. |

Pendientes de la HU: la **presentación de 3 párrafos e imagen** ya está publicada
(`img/tutorias-edith.webp`), en línea con el Mapa V3 §7 (✅). El **material de apoyo**
muestra un estado vacío que deriva a la comunidad del campus (correcto mientras sea ⏳). Los
**eventos importantes** no se incluyen (⏳: la decisión sigue abierta).

### 3.3 HU-05 — Ingresantes y Alumnos

| CA | Estado | Evidencia |
|---|---|---|
| CA-05-01 · Sin listado de carreras | ✅ | No hay listado. Solo una de las fichas flotantes decorativas del encabezado nombra una carrera. |
| CA-05-02 · Sin Modalidad, Horarios, Equivalencias ni Pases | ✅ | No aparecen. |
| CA-05-03 · Sin Fechas clave | ✅ | No aparece. |
| CA-05-04 · Cómo, requisitos, dónde y validez | ✅ | Bloque «¿Qué necesito?» (título secundario o en trámite, convalidación, DNI o pasaporte) y 4 preguntas, incluida la de validez nacional. |
| CA-05-05 · Enlace e instructivo como pendientes | ⚠️ | «Link de preinscripción» apunta a `https://guarani-autogestionagencia.bue.edu.ar/preinscripcion/`. La documentación lo da como ⏳ `[INSERTAR]` y el registro de la FAQ dice «Se omitió [INSERTAR ENLACE A LA PREINSCRIPCIÓN] hasta recibirlo». El **instructivo** no aparece ni como pendiente. |
| CA-05-06 · Misma URL en barra y pie | ✅ | Barra superior, pie, accesos rápidos e Ingresantes usan la misma URL. Es coherente, pero hereda el problema de CA-05-05. |
| CA-05-07 · Calendario primero | ✅ | Índice: Calendario académico → Preguntas frecuentes → Otros trámites → Plataformas. |
| CA-05-08 · Desplegable, no tarjetas | 🟡 | Las preguntas son desplegables. Quedan tarjetas en «Otros trámites» (Becas, Boleto estudiantil, Trámite de títulos, las tres «A CONFIRMAR») y en «Plataformas». Es una forma razonable de no decidir por omisión, pero son tarjetas. |
| CA-05-09 · Los 10 temas de Edith | 🟡 | Están inscripción a materias, correlativas, finales, constancia de alumno regular, regularidad, horarios, modalidad y contacto con docentes. **Faltan** constancia de examen (hasta 7 días hábiles), pase a otro IFTS y contacto con Bedelía como pregunta propia (`otro IFTS` y `constancia de examen`: 0 apariciones en el bundle). |
| CA-05-10 · Mesas dentro del calendario, en negrita | ⏳ | No hay sección de mesas aparte (✅), pero el calendario viene vacío («Calendario pendiente de confirmación»), así que el destacado no se puede verificar. |
| CA-05-11 · Mensaje de proceso sin respuesta oficial | 🟡 | Las respuestas que en el original tenían `[INSERTAR RUTA]` se publican **recortadas**, sin aviso de que falta la ruta del SIU (lo dice solo el campo `fuente`, que no se ve). |

### 3.4 HU-06 — Ficha de carrera

| CA | Estado | Evidencia |
|---|---|---|
| CA-06-01 · Sin Programas | ✅ | Índice lateral: Presentación, Modalidad y horarios, Plan de estudios, Materias y correlatividades, Resoluciones y Cuerpo docente. |
| CA-06-02 · Turno desde el dato de la carrera | ✅ | Sale del campo `horario` de cada carrera en los datos de la API, no de un literal. |
| CA-06-03 · 4 vespertinas y GP matutina | ✅ | AP, Políticas Culturales, AS y CDIA: «Vespertino · 18:30 a 22:30 h». GP: «Matutino · 9:00 a 13:00 h». |
| CA-06-04 · Modalidad del dato; GP con mensaje de proceso | ✅ | GP: «A CONFIRMAR POR EL INSTITUTO», también en la tabla resumen de `/carreras`. Las otras cuatro: «Híbrida: presencial y virtual». |
| CA-06-05 · Número y PDF si está validado | 🟡 | AS muestra «6336/23» y GP «2408-SED-2005». AP, Políticas Culturales y CDIA muestran «Ver Resoluciones» en lugar del número. Las 5 enlazan un PDF. |
| CA-06-06 · No enlazar resoluciones sin validar | ⚠️ | Se enlazan los PDF de AP (EX-2025-42215383-GCABA-SSPIE), Políticas Culturales (2009), CDIA y AS. La documentación los da como pendientes de 0000081, y el registro de AS dice textualmente «Número 6336/23 a verificar (AF)». |
| CA-06-07 · Texto definitivo de Materias | 🟡 | AP, AS y CDIA usan el texto literal de Edith. Políticas Culturales y GP usan una variante («organizadas según el área formativa…») porque esas materias no tienen año. La variante es razonable, pero no es el texto validado. |
| CA-06-08 · Sin anotaciones | ✅ | Ninguna. |

## 4. Resto del Mapa del Sitio V3 (lo que no cubren las HU)

| § V3 | Elemento | Estado | Evidencia |
|---|---|---|---|
| §2 Inicio | Carrusel con fotos nuevas | ⏳ | Siguen 2 fotos «Visita CIPER» y 1 de «Eventos y actividades de cultura». El IFTS no envió fotos. La documentación escribe «CIPPER»: confirmar la grafía. |
| §2 Inicio | Novedades integradas | ✅ | Bloque «Novedades del último mes» con estado vacío y enlace «Ver todas las novedades». |
| §2 Inicio | Accesos rápidos según la nueva estructura | 🟡 | 7 accesos: Campus, SIU, Preinscripción, **Becas** («Información a confirmar»), Constancias, Mesas de examen (lleva al calendario) y Calendario. Becas sigue como acceso aunque su continuidad está ⏳. |
| §2 Inicio | FAQ destacadas con enlace | ✅ | 4 preguntas (2 de Ingresantes y 2 de Alumnos) + «Ver todas las preguntas». |
| §3 Instituto | Etiqueta «Instituto» | ❌ | Dice «Institucional» (menú, submenú, H1, breadcrumb y pie). |
| §3 Instituto | 5 subapartados en orden | ✅ | Nosotros, Autoridades, Plantel administrativo, Régimen de Estudios y Enseñanza, Régimen de Convivencia; también en el submenú del header. |
| §3 Instituto | Nosotros | ✅ (⏳) | Mensaje de proceso: «pendiente de envío por el instituto». |
| §3 Instituto | Autoridades: conducción y Consejo Directivo | 🟡 | Rectora, secretario académico y secretaria administrativa. **No hay Consejo Directivo** (el código tiene el grupo, los datos no). Los nombres se publican sin aviso visible de que su vigencia está «a confirmar», como dice su `fuente`. |
| §3 Instituto | Plantel en lugar de Bedelía por año | ✅ | Asesoría pedagógica y tutoría, JTP, ATP y Equipo de Bedelía; sin tabla por año. |
| §3 Instituto | Régimen de Estudios y Enseñanza | ✅ (⏳) | Mensaje de proceso y derivación a la FAQ de regularidad. |
| §3 Instituto | Régimen de Convivencia | ✅ | «Código de Convivencia del IFTS N.º 12» y «Resolución de Rectoría IFTS 12 N.º 3/2025», con fuente en el Drive. En la vista previa, el enlace cae en 404 (ART-05). |
| §3 Instituto | Enlaces de interés | ✅ (⏳) | Se conservan Ciudad Bilingüe y Centro de Simulación con «ENLACE OFICIAL A CONFIRMAR»: no se decide por omisión. |
| §4 Carreras | Cuerpo docente solo en la ficha | ✅ | AS (16 docentes, sin el de PPIV), AP (13 nombres, sin materia), Políticas Culturales (con materia). CDIA y GP con mensaje de proceso. No se publican correos. |
| §4 Carreras | Presentación faltante (AP, PC, GP) | ✅ (⏳) | Mensaje de proceso en las tres. |
| §8 FAQ | Respuestas de Edith en lugar de «pendiente de validación» | ✅ | 17 preguntas, todas con respuesta; ninguna «pendiente de validación». |
| §8 FAQ | Alcance por categoría | ⏳ | Filtros Todas, Alumnos e Ingresantes; no hay categoría Docentes. Como no existen preguntas para Docentes es coherente, pero resuelve por omisión una pregunta abierta. |
| §9 Docentes | Sin listado por carrera | ✅ | «El cuerpo docente de cada carrera está en su ficha». |
| §9 Docentes | Instructivo de Apto Médico | ❌ | No está. Buscar «apto» da «Sin resultados». |
| §9 Docentes | 4 contenidos nuevos | ✅ (⏳) | Cronograma, DDJJ, Licencias médicas y Oferta de cargos, los cuatro «A CONFIRMAR». |
| §9 Docentes | Comunicados, Concursos y Normativa | ⏳ | Comunicados y Concursos ya no están; queda «Normativas y documentación» vacío. La continuidad sigue abierta en 0000099. |
| §9 Novedades | Página con listado completo | ✅ (⏳) | `/noticias` existe con estado vacío. Ninguno de los 5 artículos está cargado; uno de los temas aparece como foto del carrusel. |
| §9 Contacto | Formulario | ✅ | Nombre y apellido, correo, asunto, mensaje y aceptación de privacidad, con validación. Al enviar avisa que la vista previa no guarda consultas. |
| §9 Contacto | Correo, responsable, plazo y teléfono | ⏳ | «Correo institucional: PRÓXIMAMENTE». |
| §9 Contacto | Mapa y transportes | ✅ | Esquema orientativo del barrio + «Abrir en Google Maps». 36 líneas de colectivo (las de Edith), subte A y H. Además agrega **subte B (Pueyrredón)**, que Edith no lista (ART-10). |
| §11 Contacto | Política de privacidad | ✅ | `/privacidad` existe, con texto provisorio y la aclaración de qué datos guarda el formulario. |
| §10 Pie | Isologotipos IFTS, GCBA y UPCN | ✅ | Los tres, en versión blanca. |
| §10 Pie | Leyenda de validación | ✅ | «Sitio en construcción · Los contenidos institucionales son validados por el instituto.» |
| §10 Pie | Domicilio | 🟡 | «Misiones 26, Ciudad de Buenos Aires»; el V3 §10 pide «Misiones 26, C1083 ABB, CABA». |
| §12 Admin | Contenidos editables | 🟡 | Solo por capturas (`panel.html`, 16/11/2026, backend local): Carreras (turno, horario, modalidad, duración), Planes, Materias, Docentes, Novedades, Carrusel, FAQ, Documentos con subida, Calendario, Autoridades y plantel, y Cuerpo docente. Faltan Eventos de Tutoría y Bandeja de consultas (ambos ⏳). |
| §12 Admin | Perfiles Administrador y Editor | ⏳ | El login dice «Acceso para Administrador y Editor»; la diferencia entre los dos roles sigue sin definirse. |

## 5. Reglas de negocio

| RN | Estado | Evidencia |
|---|---|---|
| RN-01 · Moodle visible desde la Home | ✅ | Barra superior, «Accesos destacados» y accesos rápidos. |
| RN-02 · Inscripción GCBA visible en la Home | ✅ | Enlace directo en la barra superior y en los accesos rápidos; el botón «Quiero inscribirme» del hero lleva a Ingresantes (sujeto a ART-02). |
| RN-03 · Novedades de la más reciente a la más antigua | ⏳ | Sin datos para verificarlo. |
| RN-05 · Login solo para el personal | ✅ | `/admin` redirige a `/admin/login`; el contenido es público. |
| RN-06 · «6 carreras» | — | El artefacto tiene 5, igual que el Mapa V3 y la devolución. **El texto de RN-06 quedó desactualizado** (corregir la documentación, no el sitio). |
| RN-07 · Dirección, dos franjas y modalidad híbrida | ✅ | Ver HU-04. Solo falta el código postal en la barra superior y el pie. |
| RN-08 · 3 accesos externos en la barra superior | ✅ | Campus, SIU Guaraní y Preinscripción GCBA (+ Preguntas frecuentes). |
| RN-09 · Sin asistente virtual | ✅ | No hay bot. |
| RN-10 · URLs externas solo si las provee la institución | ⚠️ | Publica Moodle (`ifts12online.com.ar/login/index.php`), SIU (`guarani-autogestionagencia.bue.edu.ar`) y la preinscripción. `project_state.md` sigue listando las «URLs oficiales de Moodle, inscripción y SIU» como bloqueo abierto. |
| RN-11 · No inventar contenido institucional | 🟡 | En general marca lo pendiente («A CONFIRMAR», «PENDIENTE», «se publica cuando…»). Excepciones: ART-02, ART-04 y ART-10. |
| RN-12 · Accesibilidad y responsive | 🟡 | Ver §7. |
| RN-14 · Navegación V3 | ❌ | Ver HU-03. |

## 6. Seguimiento de los hallazgos del 13/11 (PROTO-01 a PROTO-12)

| ID | Tema | Estado hoy | Qué cambió |
|---|---|---|---|
| PROTO-01 | Decisiones sin acta | 🟡 | Ahora **no** se resuelven por omisión: Novedades (página), Contacto (formulario), Enlaces de interés, Becas, Boleto y Títulos (A CONFIRMAR) y modalidad de GP (A CONFIRMAR). Siguen decididas sin acta: Docentes y Contacto como pestañas, FAQ sin categoría Docentes, fotos CIPER, Eventos de Tutoría fuera y el correo de Equivalencias en la respuesta de la FAQ. |
| PROTO-02 | Apto Médico | ❌ | Sigue sin estar. |
| PROTO-03 | Canal de contacto | ✅ | Formulario y página de privacidad; el correo institucional sigue ⏳. |
| PROTO-04 | Datos sin fuente | 🟡 | Los registros traen `fuente`, pero la UI no muestra la vigencia «a confirmar». Ya no se publica el Consejo Directivo. |
| PROTO-05 | Carrusel | 🟡 | Tiene botón «Pausar rotación» / «Reanudar rotación» (verificado: la rotación se detiene) y flechas anterior y siguiente, los tres de 44 × 44. El contador «Foto 1 de 3» es **solo para lector de pantalla**; los indicadores siguen en **4 px** de alto; el autoplay sigue activo por defecto. |
| PROTO-06 | H1 | ❌ | Empeoró: **92 px** en las páginas internas a 1440 (65,5 a 1024; 49,2 a 768; 42 a 375) y 77,8 px en la Home. El contrato pide 48/32. |
| PROTO-07 | Accesos rápidos | ✅ | Ahora son 7, como pide #0036 (la composición incluye Becas: ver §4). |
| PROTO-08 | Área táctil de 44 px | ❌ | Enlaces de la barra superior de 22 px, indicadores de 4 px, «Ingresar al campus» de 41 px y menú de escritorio de 42 px. |
| PROTO-09 | Responsive | 🟡 | 2 columnas a 768 px; **1 columna a 375 px** (339 px) en accesos destacados, carreras y accesos rápidos. Breakpoints propios (1020, 900, 640, 560, 520…), no 768/1024. |
| PROTO-10 | Tipografía del pie | ❌ | Mínimo de **11 px** en el pie, en los cuatro anchos. |
| PROTO-11 | Marcadores de contenido | 🟡 | Hay menos (12 «A CONFIRMAR», 3 «PENDIENTE», 2 «PRÓXIMAMENTE» y 6 «se publica cuando…», contando cada ruta una vez y el pie una sola vez), pero se usan cuatro formas distintas para el mismo estado. |
| PROTO-12 | Panel ausente | 🟡 | Login con aviso de vista previa y 11 capturas del panel real. No se puede navegar. |

## 7. Contrato visual, accesibilidad y responsive (mediciones)

| Medición | 1440 | 1024 | 768 | 375 | Contrato |
|---|---|---|---|---|---|
| Desborde horizontal | 0 | 0 | 0 | 0 | 0 ✅ |
| H1 de página interna | 92 px | 65,5 px | 49,2 px | 42 px | 48 / 32 ❌ |
| H1 de la Home | 77,8 px | 55,3 px | 41,5 px | 40 px | 48 / 32 ❌ |
| Tipografía mínima del pie | 11 px | 11 px | 11 px | 11 px | ≥ 12 px ❌ |
| Columnas de accesos rápidos | 4 | 4 | 2 | 1 | 2 en móvil ❌ |
| Menú | 9 ítems | hamburguesa 46 × 46 | hamburguesa | hamburguesa | 7 pestañas ❌ |

- **Tipografías:** `index.html` carga Plus Jakarta Sans (títulos), Source Sans 3 (texto) y
  JetBrains Mono (etiquetas), con el comentario «Tipografías del diseño aprobado». El
  contrato vigente fija **una sola familia, Source Sans 3**, y en la documentación no hay
  registro de esa aprobación (ART-08).
- **Lo que está bien:** enlace «Saltar al contenido», buscador con `aria-haspopup="dialog"`,
  Ctrl+K y Esc; menú móvil con foco inicial, bloqueo de scroll y Esc; carrusel con pausa;
  H1 con texto accesible (`.sr`) separado de la animación; 7 reglas
  `prefers-reduced-motion`.
- **Pantalla de entrada («telón»):** en la **primera carga de cualquier ruta**, un telón
  con los logos tapa el sitio unos **4,2 s**, sin botón para saltearlo. Con
  `prefers-reduced-motion` no aparece (ART-06).

## 8. Hallazgos nuevos ART-01 a ART-17

> Numeración nueva para no pisar PROTO-xx ni UX-Axx. Cada hallazgo se midió sobre el
> artefacto servido en local.

| ID | Severidad | Tipo | Hallazgo | Evidencia | Impacto |
|---|---|---|---|---|---|
| **ART-01** | Alta | Navegación | El artefacto no aplica el Mapa V3: 9 ítems, «Institucional» y «Tutorías», FAQ fuera del menú y Docentes, Novedades y Contacto como pestañas. | Header a 1440 y menú móvil a 375. | Quien vea el artefacto entiende que la navegación V3 no se implementó, aunque `project_state.md` la da por cerrada. Hay que aclarar desde qué rama se generó. |
| **ART-02** | Alta | Dato sin fuente | Se publica el enlace de preinscripción `…/preinscripcion/` mientras la documentación y el propio registro de la FAQ lo dan como no recibido. | Ingresantes, barra superior, pie y accesos rápidos. | Si la URL no es la oficial, el sitio deriva a los ingresantes a un destino no validado (RN-10, CA-05-05). |
| **ART-03** | Alta | Contenido validado omitido | Falta el instructivo de Apto Médico en Docentes. | `/docentes`; `/buscar?q=apto` da sin resultados. | Sigue abierto PROTO-02; es el contenido de Docentes con fuente primaria. |
| **ART-04** | Media | Documento sin validar | Se enlazan 4 resoluciones que la documentación da como pendientes de 0000081, incluida una que su registro marca «a verificar». | Fichas de AP, Políticas Culturales, AS y CDIA. | Contradice CA-06-06. Si el instituto ya las entregó, hay que actualizar HU-06 y el Mapa V3. |
| **ART-05** | Media | Enlace roto | Los 12 enlaces a PDF (10 en fichas y 2 en Instituto) se resuelven como `#/carreras/<slug>/pdf-no-incluido.html` y caen en el 404 del sitio, no en la página explicativa. | Clic en «Plan de estudios» de AS → «Página no encontrada». | En la vista previa parece que los documentos no existen. El dato trae `./pdf-no-incluido.html`; el `<Link>` lo vuelve relativo a la ruta. |
| **ART-06** | Media | Experiencia de carga | Telón de entrada de unos 4,2 s en la primera carga de cualquier ruta, sin forma de saltearlo. | Medido con Playwright; no aparece con `prefers-reduced-motion`. | Retrasa el acceso al contenido (también desde un enlace directo a una ficha); no figura en ningún documento. |
| **ART-07** | Media | Contrato visual | H1 de 92 px en las páginas internas. | Tabla del §7. | Cuarta medida distinta para el mismo token (#0043). |
| **ART-08** | Media | Contrato visual | Tres familias tipográficas en lugar de Source Sans 3 única, presentadas como «diseño aprobado» sin registro documental. | `index.html`. | Si hubo aprobación, falta documentarla en `figma_v2_contrato_visual.md`; si no, es un desvío. |
| **ART-09** | Media | Contenido incompleto | Faltan 3 temas de Alumnos: constancia de examen, pase a otro IFTS y contacto con Bedelía. | 0 apariciones en el bundle. | CA-05-09 queda abierto. |
| **ART-10** | Baja | Dato sin fuente | Contenido que no figura en la documentación: subte B (Pueyrredón) con indicación de combinación, y la ficha «UPCN · Entidad conveniante» en la Home. | Pie, Contacto y hero de la Home. | Menor, pero es contenido institucional sin fuente (RN-11). |
| **ART-11** | Baja | Respuesta incompleta | Las respuestas con `[INSERTAR RUTA]` se publican recortadas, sin aviso de que falta la ruta del SIU. | FAQ «¿Cómo me inscribo para cursar una materia?», finales y constancia de regular. | CA-05-11: el alumno no sabe que falta un paso. |
| **ART-12** | Baja | Enlace roto | En «¿Qué es el SIU?» el enlace incluye el punto final: `https://guarani-autogestionagencia.bue.edu.ar/.` | FAQ de Alumnos. | Puede fallar según el navegador. |
| **ART-13** | Baja | Calidad de datos | Nombres inconsistentes a la vista: Cristina Sabaz (AP) / Cristian Sabaz (PC); Javier Ezcurra (AP) / Javier Fernández Ezcurra (PC y JTP); Verónica Derderián / Derderian. | Fichas e Instituto. | La devolución ya pedía resolverlo (§4); hoy se publica la inconsistencia. |
| **ART-14** | Baja | Estados | Una ficha con slug inexistente muestra el 404 genérico, no el estado «carrera inexistente» que DB-14 da por resuelto. | `/carreras/no-existe`. | Diferencia con el comportamiento documentado del repo. |
| **ART-15** | Baja | Panel | En la captura 02 la tabla de Carreras muestra Turno y Estado, sin el nombre de la carrera. | `panel/02-academico-carreras.webp`. | No se distingue qué fila es cada carrera. |
| **ART-16** | Baja | Gobernanza | El pie muestra un botón «Administración». La decisión del 22/10 (I12) deja el panel solo por URL directa, pero «Decisiones activas» de `project_state.md` conserva la del 20/10 (link discreto). | Pie, todas las rutas. | La documentación se contradice; hay que dejar una sola decisión vigente. |
| **ART-17** | Baja | Accesos rápidos | «Becas» sigue como acceso rápido de la Home con «Información a confirmar». | Home › «Todo a un clic». | V3 §2: Becas deja de ser sección propia y su continuidad está ⏳. |

## 9. Datos que el artefacto publica y la documentación no da por validados

Esta lista no dice que los datos estén mal: dice que **la documentación no registra su
validación**. Si el instituto ya los confirmó, lo que hay que actualizar es la documentación.

| Dato | Dónde | Estado en la documentación | `fuente` en los datos del artefacto |
|---|---|---|---|
| URL de preinscripción | Ingresantes, barra, pie, Home | ⏳ `[INSERTAR]` (devolución §5 y §14.1) | La FAQ dice que se omitió hasta recibirla |
| URL de Moodle y SIU | Barra, Home, Alumnos, Docentes | Bloqueo abierto en `project_state.md` | «Carga inicial V1» |
| Resolución AS 6336/23 + PDF | Ficha AS | «Verificar con el Drive» | «Número 6336/23 a verificar (AF)» |
| Resoluciones de AP, PC y CDIA + PDF | Fichas | Números pendientes (§4, 0000081) | «Drive IFTS 12 · Info Carreras» |
| Autoridades y plantel | Instituto | «Edith confirma vigencia» | «Vigencia… a confirmar»; solo el secretario académico figura confirmado por Edith el 16/11 |
| Equivalencias por `equivalencias.ifts12@gmail.com` | FAQ de Alumnos | ⏳ (devolución §6) | «Carga inicial V1» |
| Subte B y combinación | Pie y Contacto | No figura | — |
| «Entidad conveniante» (UPCN) | Home | No figura | — |

## 10. Recomendaciones

### 10.1 Sobre el artefacto

1. **Republicarlo desde el HEAD de `fix/integracion-test-20261031`** (o declarar en
   `panel.html` o en el pie de qué rama y SHA sale el build). Hoy no coincide con lo que
   `project_state.md` da por implementado en HU-03 (ART-01).
2. Corregir los enlaces a PDF de la vista previa para que apunten a `./pdf-no-incluido.html`
   relativo al documento, no a la ruta hash (ART-05).
3. Agregar el **Apto Médico** a Docentes con el resumen de Edith, aunque sea con el PDF como
   pendiente (ART-03).
4. Sumar las preguntas de constancia de examen, pase a otro IFTS y contacto con Bedelía, con
   mensaje de proceso donde falte el dato (ART-09, ART-11).
5. Quitar el punto final de la URL del SIU (ART-12) y usar `direccionPostal` en la barra
   superior y el pie (CA-04-01).
6. Agregar un botón «Saltar» al telón de entrada o mostrarlo solo en la Home (ART-06).
7. Indicadores del carrusel a 44 × 44, contador visible y rótulos del pie a 12 px
   (PROTO-05, PROTO-08, PROTO-10).

### 10.2 Para validar con el instituto o con Análisis (antes de publicar el sitio)

1. URL oficial de preinscripción e instructivo: confirmar o retirar el enlace (ART-02).
2. Resoluciones de AP, PC, CDIA y la 6336/23: confirmar o volver al mensaje de proceso
   (ART-04).
3. Vigencia de autoridades y plantel; incluir o no el Consejo Directivo.
4. Grafía de «CIPER» / «CIPPER» y unificación de Sabaz, Ezcurra y Derderián (ART-13).
5. Si las tipografías nuevas están aprobadas, registrarlo en el contrato visual (ART-08).

### 10.3 Para la documentación del repo

1. Actualizar RN-06 (dice 6 carreras; son 5).
2. Dejar una sola decisión vigente sobre el acceso al panel (ART-16).
3. Si el instituto ya entregó enlaces o resoluciones, reflejarlo en el Mapa V3, HU-05 y HU-06
   para que esta auditoría deje de leerlos como desvío.

## 11. Checklist de cierre

- [ ] Republicar el artefacto con la navegación de 7 pestañas y los nombres Instituto y Tutoría.
- [ ] Confirmar o retirar la URL de preinscripción.
- [ ] Confirmar o retirar los PDF de resoluciones.
- [ ] Agregar Apto Médico en Docentes.
- [ ] Completar las 3 preguntas faltantes de Alumnos.
- [ ] Corregir los 12 enlaces a PDF de la vista previa y la URL del SIU.
- [ ] Ajustar H1, indicadores del carrusel, pie a 12 px y 2 columnas a 375 px.
- [ ] Resolver tipografías y telón de entrada.
- [ ] Reauditar cuando esté el nuevo build (v2 de este informe).

## 12. Referencias

IFTS N.º 12. (2026, 16 de noviembre). *Sitio web IFTS N.º 12 — vista previa del build*
[Artefacto web, versión `1794866524-026e`]. https://claude.ai/artifact/1u1GBH5ZWPkSu9xuC9zLWX

IFTS N.º 12. (2026, 13 de noviembre). *Mapa del Sitio V3*.
`docs/01_global/mapa_sitio_ifts12_v3.md`.

IFTS N.º 12. (2026, 13 de noviembre). *Devolución de Edith — pendientes del sitio TEST*.
`docs/01_global/devolucion_edith_2026_11_13.md`.

IFTS N.º 12. (2026, 16 de noviembre). *HU-03 a HU-06* [Historias de usuario].
`docs/04_user_stories/HU-03/` a `HU-06/`.

IFTS N.º 12. (2026). *Reglas de negocio transversales*. `docs/01_global/reglas_negocio.md`.

IFTS N.º 12. (2026, 13 de octubre). *Figma v2 — contrato visual de referencia*.
`docs/01_global/figma_v2_contrato_visual.md`.

IFTS N.º 12. (2026, 16 de noviembre). *Tickets operativos de la ronda TEST*.
`docs/02_technical/tickets_operativos_ronda_test_2026_11.md`.

IFTS N.º 12. (2026, 13 de noviembre). *Auditoría del prototipo navegable de Claude*.
`docs/06_audits/audit_2026-11-13-prototipo-claude-ux-ui.md`.

IFTS N.º 12. (2026). *Estado actual del proyecto* [Snapshot de Capa 2]. `docs/project_state.md`.
