# Auditoría del prototipo navegable de Claude contra la devolución de Edith y los tickets UX/UI

> Fecha: 2026-11-13.
> Alcance: Capa 4 — verificación semántica. Se audita el **prototipo navegable** generado
> como artefacto de Claude (`https://claude.ai/artifact/1u1GBH5ZWPkSu9xuC9zLWX`, archivado
> como HTML el 13/11/2026), no el código de `src/`.
>
> Pregunta que responde este informe: **¿el prototipo resuelve lo que piden los 27 tickets
> UX/UI del 21/10/2026, los 4 tickets que no se resuelven en Figma y la devolución de Edith
> del 8/11/2026?**
>
> Fuentes auditadas: `docs/01_global/devolucion_edith_2026_11_13.md` (transcripción de la
> devolución), `inbox/_done/Pendientes + Devolución de Edith.pdf` (8 páginas, 8/11/2026),
> `docs/06_audits/audit_2026-10-22-ux-ui.md` (27 + 4 tickets), artefacto HTML archivado en
> `documentacion/driveFrontend/02_ux_ui/prototipo_claude_2026_11_13/` (carpeta no
> versionada).
>
> Medición: Firefox local sobre el HTML archivado (`file://`), a 1440, 1024, 768 y 375 px.
> Sin backend: el prototipo no hace llamadas de red.
>
> Los estados de este informe **no reemplazan** los de la auditoría del 22/10/2026: aquella
> mide lo que el frontend real demuestra; esta mide lo que el prototipo propone. Un ✅ acá
> significa "la maqueta resuelve el punto", no "el ticket está cerrado".

## Veredicto en una línea

El prototipo es una base visual sólida y muy alineada con el Mapa V2: cierra el menú de 7
pestañas, la Home única, la salida del ícono de cuenta (#0040) y el overflow de tablet
(#0037). Pero **convierte preguntas abiertas de Edith en decisiones de diseño sin dejarlas
asentadas** (Docentes solo en el pie, sin página de Novedades, sin formulario de contacto, sin
categoría Docentes en FAQ), **omite el Apto Médico** que sí está validado, y sigue sin cumplir
el contrato de accesibilidad y de carrusel (#0041, #0045, #0046, #0038).

## 1. Resumen ejecutivo

Leyenda: ✅ la maqueta resuelve el punto · 🟡 parcial o divergencia verificable · 🔵 bloqueado
por una dependencia externa · ⏳ no evaluable en el prototipo.

| Estado | Tickets de Figma (27) | Tickets fuera de Figma (4) | Total |
|---|---:|---:|---:|
| ✅ | 9 | 1 | 10 |
| 🟡 | 15 | 0 | 15 |
| 🔵 | 1 | 0 | 1 |
| ⏳ | 2 | 3 | 5 |
| **Total** | **27** | **4** | **31** |

| Estado | Secciones de la devolución de Edith (14) |
|---|---:|
| ✅ | 1 |
| 🟡 | 11 |
| ⏳ | 2 |

**Lo que el prototipo resuelve y conviene reconocer**

- Menú de **7 pestañas** (Inicio, Instituto, Carreras, Ingresantes, Alumnos, Tutoría, FAQ),
  tal como lo pidió Edith, con numeración 01–07 y Docentes fuera de la barra principal (§1).
- **Sin ícono de persona ni menú de cuenta** en el header: cierra el punto que el repo tenía
  abierto desde el 20/10 (#0040 / I12).
- **Una sola Home**, con novedades integradas, y 404 para rutas inexistentes (#0039).
- **Sin overflow horizontal** a 1440, 1024, 768 y 375 px; el pie no se superpone en tablet
  (#0037, medido, no inferido).
- **Cinco carreras** con ficha completa: Presentación, Datos, Plan de estudios, Materias y
  correlatividades, Cuerpo docente y Resoluciones; **sin el apartado "Programas"** (§4).
- **Instituto con los 5 subapartados** que definió Edith (Nosotros, Autoridades, Plantel
  administrativo, Régimen de Estudios y Enseñanza, Régimen de Convivencia), con el Régimen
  de Estudios enlazado al **PDF del campus** y el de Convivencia señalado como pendiente
  (§3).
- **Tutoría** con los 3 párrafos institucionales, el canal único de Clara Moroni y el asunto
  exacto, y **sin tabla de horarios** (§7).
- **FAQ con pestaña propia**, 19 preguntas en 3 categorías y buscador que filtra en vivo
  (#0031, §8).
- **Docentes** sin listado por carrera y con los 4 contenidos nuevos (cronograma,
  DDJJ, licencias, oferta de cargos), con la oferta de cargos enlazada al sitio oficial (§9).
- **Pie** con domicilio, horario de atención y transportes completos, **sin** la leyenda de
  validación de UX/UI y **sin** "Exclusivamente nocturno" (§11).

**Lo que no se puede dar por resuelto**

1. Las **15 preguntas abiertas** de Edith aparecen respondidas por la maqueta sin decisión
   escrita (§6, PROTO-01).
2. Falta el instructivo de **Apto Médico** en Docentes, con documento validado de por medio
   (PROTO-02).
3. No hay **formulario de contacto** ni correo institucional: el sitio queda sin canal de
   consultas (§11, PROTO-03).
4. El **carrusel** tiene autoplay de 6 s sin pausa ni contador visible, con indicadores de
   4 px de alto (#0041, #0046, PROTO-05).
5. **20 de 55 controles** no llegan a 44 px de alto y los accesos rápidos siguen en **1
   columna a 375 px** (#0045, #0046, PROTO-08, PROTO-09).
6. El **panel de administración** (§13) no existe en el prototipo: 11 contenidos editables y
   los 2 perfiles no se pueden evaluar (PROTO-12).

## 2. Método y límites

1. Se archivó el artefacto completo antes de auditar, en la carpeta no versionada
   `documentacion/driveFrontend/02_ux_ui/prototipo_claude_2026_11_13/`
   (`prototipo_claude_2026_11_13.html`, 611 KB). El link de Claude exige sesión; el contenido
   real se sirve en un iframe `*.claudeusercontent.com`. La copia local permite repetir cada
   medición.
2. El prototipo es una SPA con templates JavaScript: el router usa `hashchange` y
   `render()`. Cada pantalla se midió después de forzar `location.hash` + `render()`, no por
   lectura inmediata tras un click.
3. Se midió en Firefox a 1440, 1024, 768 y 375 px de ancho, con `innerWidth`,
   `scrollWidth`, `getComputedStyle` y `getBoundingClientRect`.
4. No se ejecutó backend ni panel: las secciones que dependen de API o de sesión se marcan
   ⏳, no se suponen.
5. Los textos institucionales del prototipo (autoridades, plantel, nómina docente) **no se
   validaron**: el informe solo verifica que estén o falten y que el prototipo no declare su
   fuente.
6. Los conteos de marcadores de contenido ("PRÓXIMAMENTE", "A CONFIRMAR") corresponden al
   texto renderizado de cada pantalla, no al HTML fuente.

## 3. Matriz de los 27 tickets de Figma

| Ticket | Tema | En el prototipo | Evidencia |
|---|---|---|---|
| **#0039** | Home única y frames renombrados | ✅ | Una sola Home; `#novedades` cae en 404. No hay Homes paralelas. |
| **#0038** | Tipografía mínima del footer móvil | 🟡 | 4 rótulos del pie a **11 px** ("CONTACTO", "PRÓXIMAMENTE", "CÓMO LLEGAR", "UBICACIÓN"); los números de colectivo, a 12,5 px. |
| **#0040** | Quitar ícono de usuario y "Solicitar Tutoría" | ✅ | Header con "Buscar Ctrl K", sin ícono ni menú de cuenta. Tutoría sin solicitud de turno. |
| **#0037** | Footer superpuesto y buscador recortado en Tablet | ✅ | `scrollWidth − innerWidth = 0` a 1440/1024/768/375; pie sin superposición a 768. |
| **#0036** | Widget de calendario y 7 accesos | 🟡 | **4 accesos rápidos** (Campus, SIU, Preinscripción, Calendario), no 7; el calendario es una sección de Alumnos, no un widget. |
| **#0035** | Docentes en una sola pantalla | ✅ | Docentes sin listado por carrera; autoridades en Instituto. |
| **#0034** | Institucional según Mapa V2 | 🟡 | 5 subapartados completos; autoridades y plantel con nombres; Régimen de Estudios con PDF real; "Nosotros" y Convivencia en PRÓXIMAMENTE. |
| **#0033** | Ingresantes y conexión con GCBA | 🟡 | Requisitos y las 3 preguntas respondidas; el enlace dice "ENLACE OFICIAL PRÓXIMAMENTE". |
| **#0032** | Buscador global, resultados y sin coincidencias | ✅ | Overlay con input, resultados por `href`, cierre con Esc y atajo Ctrl/Cmd+K; probado con "tutoria" (3 resultados). |
| **#0031** | FAQ por segmentos | ✅ | Pestañas Todas / Ingresantes / Alumnos y buscador que filtra en vivo ("regularidad"). |
| **#0030** | Estados de interfaz globales | 🟡 | 404 y "sin resultados" existen; no hay loading/error de red ni sesión expirada porque no hay red. |
| **#0029** | Formulario de contacto con API | 🟡 | `document.forms.length === 0`: el prototipo **quita** el formulario. Se elimina el éxito falso, pero también el canal. |
| **#0047** | Specs, tokens y breakpoints | 🟡 | Breakpoints propios: 1180/1100/1020/900/640/560/520. Ninguno coincide con 768/1024/1200; el menú de escritorio llega hasta 1020. |
| **#0046** | Área táctil mínima de 44×44 | 🟡 | **20 de 55** controles por debajo de 44 px de alto; indicadores del carrusel de **4 px**; enlaces del topbar de 22 px. |
| **#0045** | Accesos rápidos a dos columnas en móvil | 🟡 | A 375 px: **1 columna** (339 px). A 768: 2 columnas. A 1024/1440: 4. |
| **#0044** | Set de íconos con etiquetas accesibles | ✅ | Íconos SVG inline; "Buscar", "Menú" y "Foto 1–3" con `aria-label`. Sin glifos `→`/`‹`/`›` en controles. |
| **#0043** | Jerarquía, colores y márgenes de internas | 🟡 | H1 de **77,75 px** a 1440; 55,3 a 1024; 41,4 a 768; 40 a 375. El contrato pide 48/32. |
| **#0042** | Ortografía, tildes y nombre oficial | ✅ | "IFTS N.º 12" consistente, 5 carreras, sin errores visibles en las pantallas recorridas (revisión no exhaustiva). |
| **#0041** | Especificaciones del carrusel | 🟡 | 3 fotos, autoplay de **6000 ms**, flechas de 44×44, indicadores de 4 px, **sin botón Pausar** y **sin contador visible**. |
| **#0028** | Logos oficiales | 🟡 | Header con escudo de CABA (45 px) y UPCN (110 px); el isologo IFTS es texto, no archivo. |
| **#0027** | Menú móvil y navegación en Tablet | ✅ | Burger con 11 ítems (7 + Docentes + Contacto + Campus + SIU); cierra con Esc. Foco no verificado por teclado. |
| **#0026** | Ficha de carrera con correlatividades | 🟡 | Sección con el texto definitivo de Edith y materias con año/cuatrimestre (AP); las correlatividades se derivan al PDF del plan, no se listan. |
| **#0025** | Novedades: listado, filtros y detalle | 🟡 | 5 artículos en el bloque de Inicio, todos "ARTÍCULO EN PREPARACIÓN"; **no hay listado propio** (`#novedades` → 404) ni filtros. |
| **#0024** | Prototipo del Panel Admin (CRUD) | ⏳ | No existe el panel en el prototipo. |
| **#0023** | Login del Panel Admin | ⏳ | No existe el login en el prototipo. |
| **#0016** | Coordinar definiciones con Backend | 🔵 | El prototipo asume carga desde administrador para novedades, fotos, documentos y calendario; no hay contrato de API que lo respalde. |
| **#0009** | Diseño responsive completo | 🟡 | Cuatro anchos sin overflow, pero breakpoints y grilla móvil propios (#0045, #0047) y H1 fuera de escala. |

### 3.1 Los 4 tickets que no se resuelven en Figma

| Ticket | Tema | En el prototipo | Evidencia |
|---|---|---|---|
| **#0020** | Credenciales y SSH de Git Bash | ⏳ | Fuera del artefacto. Dueño: UX/UI + Infraestructura. |
| **#0002** | Actualización del ticket de tareas | ⏳ | Fuera del artefacto. Hay que reflejar el prototipo en Mantis. |
| **#0001** | Diseño de pantallas | ✅ | El prototipo cubre las 8 rutas del menú, las 5 fichas de carrera y el 404. |
| **#0008** | Handoff de Figma | ⏳ | Un artefacto HTML no es handoff: no hay frames, tokens ni specs editables. |

## 4. Matriz de las 14 secciones de la devolución de Edith

| § | Sección | Estado | Qué muestra el prototipo | Qué queda abierto |
|---|---|---|---|---|
| 1 | Nueva estructura del menú | 🟡 | 7 pestañas con numeración; Docentes y Contacto en topbar y pie; Campus y SIU como enlaces externos. | Docentes ¿pestaña o pie? Novedades ¿con listado? Contacto ¿con formulario? Las tres se resolvieron por omisión. |
| 2 | Inicio | 🟡 | Novedades integradas con los 5 temas de Edith; carrusel de 3 fotos (2 "Visita CIPPER", 1 "Cultura"). | Fotos nuevas del IFTS; si las 2 de CIPPER se quitan; 4 accesos rápidos vs 7. |
| 3 | Instituto | 🟡 | 5 subapartados; Autoridades con rectora, secretario, secretaria y 5 integrantes del Consejo; Plantel con asesora, tutora, JTP, ATP y bedelía; Régimen de Estudios con PDF del campus. | Nosotros y Convivencia en PRÓXIMAMENTE; vigencia y fuente de los nombres. |
| 4 | Carreras | 🟡 | Turnos y modalidad de Edith; sin Programas; resoluciones por carrera; materias con año/cuatrimestre y texto definitivo. | Nóminas de CDIA y GP; materia y correo de AP; año de Políticas Culturales; duración "A CONFIRMAR". |
| 5 | Ingresantes | 🟡 | Sin listado de carreras; requisitos y 3 preguntas respondidas. | Enlace de preinscripción y del instructivo: "PRÓXIMAMENTE". |
| 6 | Alumnos | 🟡 | Orden calendario → FAQ; las tarjetas pasaron a preguntas; mesas destacadas dentro del calendario. | 6 fechas "A CONFIRMAR"; rutas de SIU, archivo de constancia, formulario de pase y correos de Bedelía en "próximamente". |
| 7 | Tutoría | ✅ | 3 párrafos, canal único con asunto exacto, sin tabla de horarios, materiales y eventos. | Ninguno de contenido; materiales y eventos quedan "PRÓXIMAMENTE" por dependencia del campus. |
| 8 | Preguntas frecuentes | 🟡 | Pestaña propia, 19 preguntas, buscador, categorías Ingresantes y Alumnos. | **Categoría Docentes eliminada** sin decisión escrita; "Títulos y validez" quedó en Alumnos. |
| 9 | Docentes | 🟡 | Sin listado por carrera; cronograma, DDJJ, licencias y oferta de cargos; Comunicados y Concursos ya no figuran. | **Falta Apto Médico**; faltan los 4 enlaces/archivos; la salida de Comunicados y Concursos no está confirmada. |
| 10 | Novedades | 🟡 | Los 5 temas de Edith en el bloque de Inicio. | No hay página con listado completo ni detalle de artículo. |
| 11 | Contacto y pie | 🟡 | Domicilio, horario de atención ampliado, mapa enlazado a Google Maps, 35 colectivos y subte A/H. | **Sin formulario**, sin correo institucional, sin política de privacidad, sin teléfono. |
| 12 | General, diseño e imágenes | 🟡 | Paleta azul/celeste/verde azulado/blanco/gris, degradados y collage; tipografía y grilla propias. | Manual de marca UPCN (Pantone), fotos nuevas, escala tipográfica. |
| 13 | Qué edita el instituto en el admin | ⏳ | No existe el panel: no se puede verificar ninguno de los 11 contenidos ni los 2 perfiles. | Diferencia Administrador/Editor; campos editables por carrera; PDFs; novedades; fotos; documentos; calendario; FAQ; autoridades. |
| 14 | Lo que hay que pedir al instituto | ⏳ | El prototipo marca 16 "PRÓXIMAMENTE", 6 "A CONFIRMAR" y 5 "ARTÍCULO EN PREPARACIÓN". | Los 15 pedidos siguen abiertos; ver §7 de este informe. |

## 5. Hallazgos PROTO-01 a PROTO-12

> Numeración nueva para no pisar UX-A1…UX-A24. Cada hallazgo se mide sobre el prototipo
> archivado; no se extrapola al código de `src/`.

| ID | Severidad | Tipo | Hallazgo | Evidencia | Impacto |
|---|---|---|---|---|---|
| **PROTO-01** | Alta | Gobernanza de decisiones | Seis de las preguntas con más impacto aparecen resueltas por la maqueta sin acta —Docentes solo en pie/topbar, Novedades sin listado, Contacto sin formulario, FAQ sin categoría Docentes, Instituto sin "Enlaces de interés" y Eventos de Tutoría en la v1—; la tabla completa suma 15 posturas tomadas. | Menú, `#novedades` → 404, `forms = 0`, pestañas Todas/Ingresantes/Alumnos, ausencia de "Ciudad Bilingüe"/"Centro de Simulación", bloque "Eventos importantes"; §6. | Si el prototipo se presenta como propuesta cerrada, el instituto cree aprobado lo que nunca decidió. |
| **PROTO-02** | Alta | Contenido validado omitido | No hay instructivo de **Apto Médico** en Docentes, pese a que Edith adjuntó el documento de 2 páginas y a que es el único contenido nuevo con fuente primaria. | Página Docentes: 4 tarjetas (cronograma, DDJJ, licencias, oferta de cargos), sin apto médico. | Se pierde el trámite con más detalle operativo de toda la devolución. |
| **PROTO-03** | Alta | Canal de contacto | El prototipo elimina el formulario y deja el correo institucional en "PRÓXIMAMENTE": no hay forma de enviar una consulta. | `document.forms.length === 0`; pie: "Correo institucional · PRÓXIMAMENTE"; sin política de privacidad. | El sitio queda incomunicado y desaparece la deuda de #0029 en lugar de resolverse. |
| **PROTO-04** | Alta | Datos sin fuente declarada | Autoridades, Consejo Directivo, plantel y nómina de Análisis de Sistemas se muestran con nombres y apellidos, sin indicar origen ni fecha de vigencia. | Instituto: rectora, secretario académico, secretaria administrativa, 5 consejeros, asesora, tutora; AS con 16 docentes. | Riesgo de publicar datos vencidos o de confundir el prototipo con contenido validado. |
| **PROTO-05** | Media | Contrato de carrusel | Autoplay de 6000 ms, pausa solo al pasar el mouse, sin botón Pausar y sin contador visible; indicadores de 4 px. | `setInterval(..., 6000)` con `paused`; `.fbar button` de 170×4 px; `aria-label` "Foto 1–3". | Reabre #0041/#0046 y contradice el acuerdo del 22/10 de no usar autoplay sin control. |
| **PROTO-06** | Media | Contrato visual | H1 de 77,75 px en escritorio: tercera medida distinta para el mismo token. | 1440 → 77,75 px; 1024 → 55,3; 768 → 41,4; 375 → 40. Contrato: 48/32; repo: 36. | La jerarquía sigue sin contrato único (UX-A16, #0043). |
| **PROTO-07** | Media | Navegación | Cuatro accesos rápidos en la Home, con una lista que no coincide ni con el ticket ni con el repo. | Home: Campus, SIU, Preinscripción, Calendario. #0036 y el repo: 7. | Tercera lista incompatible para el mismo componente (#0036). |
| **PROTO-08** | Media | Accesibilidad táctil | 20 de 55 controles por debajo de 44 px de alto; los indicadores del carrusel tienen 4 px. | Medición a 1440: topbar 22 px, indicadores 4 px, tarjetas 41 px. | #0046 sigue abierto en la propuesta nueva. |
| **PROTO-09** | Media | Responsive | A 375 px los accesos rápidos quedan en 1 columna; a 768 pasan a 2; los breakpoints no coinciden con el corte acordado (768/1024). | `grid-template-columns: 339px` a 375; `349px 349px` a 768; media queries 1180/1100/1020/900/640/560/520. | #0045 y #0047 se arrastran a la nueva propuesta. |
| **PROTO-10** | Baja | Tipografía del pie | Cuatro rótulos del pie a 11 px. | CONTACTO, PRÓXIMAMENTE, CÓMO LLEGAR y UBICACIÓN. | Roza el mínimo de 12 px de #0038. |
| **PROTO-11** | Baja | Estados de contenido | 27 marcadores de contenido no disponible visibles en pantalla (16 PRÓXIMAMENTE, 6 A CONFIRMAR, 5 ARTÍCULO EN PREPARACIÓN), más los "próximamente" internos de las respuestas de Alumnos. | Medición por pantalla. | Correcto como freno anti-invención, pero en producción no puede quedar un sitio sembrado de "PRÓXIMAMENTE". |
| **PROTO-12** | Baja | Alcance ausente | La §13 de la devolución (panel de administración, 11 contenidos editables, 2 perfiles y roles) no tiene representación en el prototipo. | No hay rutas de admin ni pantallas de gestión. | La parte más costosa de la devolución queda sin evaluar y sin estimar. |

## 6. Preguntas de Edith que el prototipo contestó por su cuenta

Esta tabla es la más importante para la reunión con el instituto: **no son hallazgos de
diseño, son decisiones que necesitan acta**. El prototipo eligió una opción; ninguna está
confirmada por Edith.

| Pregunta de la devolución | Lo que hizo el prototipo | Estado |
|---|---|---|
| ¿Docentes es pestaña aparte o acceso desde el pie? | Solo en el pie y en la barra superior; no entre las 7 pestañas. | Sin confirmar |
| ¿Se mantiene la página con el listado completo de Novedades? | No: se eliminó; `#novedades` devuelve 404 y solo queda el bloque de Inicio. | Sin confirmar |
| ¿Se mantiene la pestaña Contacto con el formulario? | No: se eliminó el formulario y la pestaña; Contacto es el pie. | Sin confirmar |
| ¿Se elimina la categoría Docentes de FAQ? | Sí: quedan Todas / Ingresantes / Alumnos. | Sin confirmar |
| ¿Se quitan los enlaces Ciudad Bilingüe y Centro de Simulación? | Sí: no aparecen en Instituto. | Sin confirmar |
| ¿Eventos de Tutoría entran en la primera versión? | Sí: bloque "Eventos importantes" con dos tarjetas en preparación. | Sin confirmar |
| ¿Se quitan Becas y Boleto estudiantil? | Sí: no aparecen en Alumnos ni en FAQ. | Sin confirmar |
| ¿Equivalencias usa `equivalencias.ifts12@gmail.com`? | Sí: es el correo que muestra la respuesta. | Sin confirmar |
| ¿Las 2 fotos "Visita CIPPER" se quitan? | No: 2 de las 3 fotos del carrusel son CIPPER. | Sin confirmar |
| ¿Siguen Comunicados, Concursos y Normativa docente? | Se quitaron de Docentes; solo quedan los 4 ítems nuevos. | Sin confirmar |
| ¿Los regímenes van como texto en la página o PDF descargable? | Régimen de Estudios: PDF del campus enlazado desde Instituto y desde la FAQ de regularidad. Convivencia: "PRÓXIMAMENTE". | Parcial, sin confirmar |
| ¿El calendario va como tabla, PDF o ambos? | Tabla con 6 filas y fechas "A CONFIRMAR". | Sin confirmar |
| ¿La modalidad híbrida aplica también a Gestión Parlamentaria? | Sí: las 5 fichas y las FAQ la declaran híbrida. | Sin confirmar |
| ¿Los correos de docentes se publican? | Sí, en la ficha de Análisis de Sistemas. | Sin confirmar |
| ¿El título de validez nacional va en Ingresantes o FAQ? | Quedó en **Alumnos**, bajo "Títulos y validez oficial". | Divergencia menor con la propuesta de Edith (FAQ › Ingresantes) |

## 7. Lo que el prototipo no puede resolver

| Bloqueo | Por qué | Dueño |
|---|---|---|
| Enlace de preinscripción y del instructivo | Dato del GCBA que Edith marcó `[INSERTAR]`; el prototipo no puede inventarlo. | Análisis + Instituto |
| Correos de Bedelía de las 5 carreras | El prototipo muestra "próximamente" en las 5. | Instituto |
| Correo institucional, responsable, plazo y teléfono | Sin circuito definido no hay formulario posible. | Análisis + Backend |
| Rutas de SIU-Guaraní y archivo de constancia | Requieren captura o documento oficial. | Instituto |
| Calendario académico final | 6 fechas "A CONFIRMAR". | Instituto |
| Resoluciones de AP, Políticas Culturales y CDIA | Solo AS tiene número (RS-2023-6336). | Análisis + Backend |
| Nóminas docentes faltantes | CDIA y GP sin nómina; AP sin materia ni correo; año de Políticas Culturales. | Instituto |
| Texto de Nosotros y archivo de Convivencia | "PRÓXIMAMENTE" en Instituto. | Instituto |
| 5 artículos de Novedades con foto y fecha | Los 5 están "ARTÍCULO EN PREPARACIÓN". | Instituto |
| Fotos institucionales nuevas | Las del carrusel son las existentes (base64). | Instituto |
| Enlaces de Docentes y URL oficial de MiBA | El prototipo no los incluye; el apto médico falta. | Análisis |
| Material de Comunidad Tutorías | 7 "PRÓXIMAMENTE" en Tutoría. | Instituto + Backend |
| Panel de administración | No existe en el prototipo. | Backend + Frontend |
| Política de privacidad | No existe. | Análisis |

## 8. Recomendaciones

### 8.1 Para la reunión con Edith (antes de diseñar más)

1. Llevar la tabla de §6 como planilla de decisiones: 15 preguntas, una casilla por respuesta.
   Sin eso, el prototipo se convierte en un contrato que nadie firmó.
2. Confirmar si el sitio **mantiene o no** el formulario de contacto. Si se mantiene, definir
   correo, responsable, plazo y privacidad; si se quita, dejarlo escrito y actualizar #0029.
3. Confirmar si **Docentes** es pestaña, acceso del pie o las dos cosas; hoy el prototipo
   eligió pie + topbar y el mapa aprobado dice 9 ítems.
4. Confirmar si **Novedades** conserva listado y detalle o queda solo el bloque de Inicio.
5. Pedir el documento de **Apto Médico** como contenido obligatorio de la v1.

### 8.2 Para el prototipo (si se itera)

1. Agregar Apto Médico con el resumen de Edith y enlace oficial de MiBA (PROTO-02).
2. Llevar los indicadores del carrusel a 44×44, sumar botón Pausar y contador "1 de 3"
   visible, y quitar el autoplay o frenarlo al perder foco (PROTO-05, #0041, #0046).
3. Pasar los accesos rápidos a 2 columnas desde 360 px (PROTO-09, #0045).
4. Unificar el H1 con el contrato de 48/32 y dejar una sola escala (PROTO-06, #0043).
5. Subir los 4 rótulos del pie a 12 px (PROTO-10, #0038).
6. Alinear los breakpoints con el corte acordado 768/1024 (PROTO-09, #0047).
7. Reemplazar los "PRÓXIMAMENTE" por un estado único y explícito ("Contenido pendiente de
   validación institucional"), para que no se confunda con diseño terminado (PROTO-11).

### 8.3 Para el repositorio (cuando se implemente)

1. El prototipo **no reemplaza** el Figma ni el contrato visual: es una referencia de
   intención. Cualquier diferencia con `figma_v2_contrato_visual.md` se resuelve en Figma.
2. Las decisiones de §6, una vez firmadas, entran a `docs/01_global/` como corrección de
   alcance y se reflejan en el Mapa del Sitio V2.
3. El panel de administración (§13) necesita su propia HU: 11 contenidos editables y una
   diferencia de roles que hoy no existe en el backend.

## 9. Checklist de cierre

- [ ] Llevar las 15 decisiones de §6 al instituto y registrar la respuesta por escrito.
- [ ] Definir el destino de Docentes, Novedades y Contacto en el Mapa V2.
- [ ] Incorporar el Apto Médico al prototipo y a la especificación de Docentes.
- [ ] Resolver el canal de contacto (formulario + correo + privacidad) o formalizar su baja.
- [ ] Corregir carrusel (pausa, contador, 44×44) y accesos rápidos (2 columnas).
- [ ] Unificar H1 y breakpoints entre contrato, repo y prototipo.
- [ ] Abrir la HU del panel de administración o recortar su alcance para la v1.
- [ ] Reauditar el prototipo cuando existan las respuestas del instituto.

## 10. Referencias

IFTS N.º 12. (2026, 13 de noviembre). *Devolución de Edith — pendientes del sitio TEST*
[Documento de Capa 1]. `docs/01_global/devolucion_edith_2026_11_13.md`.

IFTS N.º 12. (2026, 8 de noviembre). *Pendientes + devolución de Edith* [PDF, 8 páginas].
`inbox/_done/Pendientes + Devolución de Edith.pdf`.

IFTS N.º 12. (2026, 13 de noviembre). *Prototipo navegable del sitio — artefacto de Claude*
[Artefacto web]. https://claude.ai/artifact/1u1GBH5ZWPkSu9xuC9zLWX

IFTS N.º 12. (2026, 13 de noviembre). *Copia archivada del prototipo*
[HTML y texto extraído, carpeta no versionada].
`documentacion/driveFrontend/02_ux_ui/prototipo_claude_2026_11_13/`.

IFTS N.º 12. (2026, 22 de octubre). *Auditoría semántica UX/UI — Frontend, Mantis y Figma v2*.
`docs/06_audits/audit_2026-10-22-ux-ui.md`.

IFTS N.º 12. (2026, 21 de octubre). *Correcciones pendientes en Figma según Mantis*
[Documento de trabajo, revisión 21/10/2026].
`inbox/IFTS12_Correcciones_UXUI_pendientes_Mantis.md`.

IFTS N.º 12. (2026, 13 de octubre). *Figma v2 — contrato visual de referencia*.
`docs/01_global/figma_v2_contrato_visual.md`.

IFTS N.º 12. (2026, 8 de octubre). *Correcciones UX/UI del frontend: B1–B9, I1–I12 y M1–M7*.
`docs/01_global/correcciones_ux_ui_frontend.md`.

IFTS N.º 12. (2026, 15 de septiembre). *Mapa del sitio IFTS N.º 12 — V2*.
`documentacion/driveFrontend/02_ux_ui/mapa_sitio_ifts12_(V2).md`.

IFTS N.º 12. (2026). *Estado actual del proyecto* [Snapshot de Capa 2].
`docs/project_state.md`.

IFTS N.º 12. (2026). *Código fuente del frontend* [Repositorio `web_ifts12_frontend`].
`src/`.

## Actualización para `grupo_2_ux_ui.md`

> Copiar el bloque siguiente al final de
> `documentacion/driveFrontend/02_ux_ui/grupo_2_ux_ui.md`. No se commitea: ese directorio
> está en `.gitignore`.

### Actualización 13/11/2026 — Prototipo de Claude vs. devolución de Edith

Se auditó el prototipo navegable de Claude contra los 27 tickets de Figma, los 4 fuera de
Figma y la devolución de Edith del 8/11/2026. Informe completo:
`docs/06_audits/audit_2026-11-13-prototipo-claude-ux-ui.md`.

El prototipo **mejora** la propuesta del repo en: menú de 7 pestañas, Home única, salida del
ícono de cuenta (#0040), ausencia de overflow en tablet (#0037) y ficha de carrera sin
"Programas". **No cumple todavía**: carrusel con autoplay sin pausa ni contador (#0041),
indicadores de 4 px y 20 de 55 controles bajo 44 px (#0046), 1 columna a 375 px (#0045),
H1 de 77,75 px (#0043) y 4 rótulos de pie a 11 px (#0038).

**Riesgo principal:** el prototipo tomó postura sobre las 15 preguntas de la devolución (§6):
en 14 eligió una opción sin acta y en la restante se apartó de la propuesta de Edith
(Docentes solo en el pie, sin página de Novedades, sin formulario de contacto, sin categoría
Docentes en FAQ, sin Becas/Boleto, con Eventos de Tutoría en la v1, entre otras). Esas
decisiones necesitan acta antes de convertirse en especificación.

**Contenido validado omitido:** el instructivo de Apto Médico que Edith adjuntó no está en
la página Docentes.

**Fuera de alcance del prototipo:** el panel de administración de la §13 (11 contenidos
editables, 2 perfiles y la diferencia Administrador/Editor) no está representado.
