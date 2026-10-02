# Análisis funcional — fuente única de verdad validada

> **Estado del documento:** validado por el cliente (18/09/2026).
> **Origen:** síntesis de los 3 documentos aprobados por Análisis Funcional en
> `documentacion/driveFrontend/01_analisis_funcional/`:
> 1. `Analisis funcional todo unificado IFTS 12 (2).pdf` — Documento Consolidado (8 partes).
> 2. `Respuesta de Analisis Funcional a Frontend.pdf` — respuesta punto por punto al feedback de Frontend.
> 3. `PP Analisis Funcional.pdf` — presentación ejecutiva.
>
> Este resumen es la referencia para auditar y adaptar la documentación anterior
> (ej. `documentacion/driveFrontend/01_analisis_funcional/grupo_1_analisis_funcional.md` y
> `docs/06_audits/audit_2026-09-18-analisis-funcional.md`). No reemplaza a los PDFs: si hay
> contradicción, mandan los PDFs aprobados.
>
> Regla anti-alucinación: el contenido real de la institución (textos definitivos, PDFs
> oficiales, fotos, logos, URLs) queda pendiente del instituto/Dirección y **no debe
> inventarse**.

---

## 1. Decisiones firmes confirmadas

- El nuevo sitio es **complementario al Campus Virtual Moodle, NO un reemplazo**. Son dos
  servicios independientes; el sitio se aloja en un servidor separado del Moodle (VPS, Plan B).
- Desde la Home debe existir un **acceso visible y directo al Campus Virtual (Moodle)**.
- Dirección institucional confirmada: **Misiones 26, C1083 ABB, CABA**, con horario de
  atención **solo nocturno**. Contenido fijo, a incluir en Contacto y pie de página.
- El **bot/asistente virtual queda fuera del alcance de la primera versión** (etapa C / futuro).
- **Login exclusivo para el personal que administra contenidos**, no para estudiantes ni
  público general. El contenido informativo del sitio es público.
- La institución debe poder administrar el sitio sin depender de un proveedor externo
  (panel de administración propio).
- Cantidad de carreras del instituto: **6**.
- Accesos rápidos de la Home: **7 confirmados** (Moodle, SIU, Inscripción oficial GCBA, Becas,
  Constancias, Mesas de examen, Calendario académico). La Respuesta aclara explícitamente que
  son **7, no 9**.
- Alcance por etapas (A: primera versión / B: segunda etapa / C: futuro) — ver §7.

---

## 2. Usuarios principales

| Perfil | Qué necesita encontrar / hacer en el sitio |
|---|---|
| Futuros ingresantes | Oferta de carreras, requisitos y fechas de inscripción, horarios y modalidad, cómo inscribirse (enlace oficial GCBA), FAQ de ingreso, ubicación/contacto. |
| Estudiantes actuales | Calendario académico, mesas de examen, constancias, becas, tutorías, acceso directo al Campus Virtual (Moodle), FAQ de trámites. |
| Docentes | Concursos docentes, calendario académico, acceso al Moodle, datos de contacto institucional. |
| Autoridades | Validar/aprobar contenidos publicados, visibilidad institucional (normativa, autoridades, historia). |
| Administradores del sitio (IFTS) | Panel de administración para cargar noticias y actualizar contenidos dinámicos sin depender de un proveedor externo. |

---

## 3. Requisitos funcionales v1 (RF-01…RF-34)

Requisitos concretos sin definir la solución técnica (fuente: Parte III del Consolidado).

### 3.1 Futuros ingresantes

| RF | Requisito |
|---|---|
| RF-01 | Listado completo de carreras con nombre y modalidad. |
| RF-02 | Requisitos y fechas de inscripción. |
| RF-03 | Acceso directo y visible al enlace oficial de inscripción del GCBA. |
| RF-04 | Horarios y modalidad (presencial/virtual, turno) de cada carrera. |
| RF-05 | Información sobre equivalencias y pases desde otros institutos terciarios. |
| RF-06 | Sección de preguntas frecuentes específica para futuros ingresantes. |

### 3.2 Estudiantes actuales

| RF | Requisito |
|---|---|
| RF-07 | Condiciones para mantener la regularidad. |
| RF-08 | Cómo se solicitan constancias. |
| RF-09 | Fechas y modalidad de las mesas de examen. |
| RF-10 | Tipos de becas, requisitos y procedimiento de solicitud. |
| RF-11 | Calendario académico actualizado. |
| RF-12 | Acceso directo y visible al Campus Virtual (Moodle). |
| RF-13 | Información sobre el boleto estudiantil. |
| RF-14 | Sección de preguntas frecuentes específica para estudiantes actuales. |

### 3.3 Docentes

| RF | Requisito |
|---|---|
| RF-15 | Información sobre concursos docentes. |
| RF-16 | Cuerpo docente por carrera. |
| RF-17 | Información y accesos de interés específicos para docentes. |

### 3.4 Institucional

| RF | Requisito |
|---|---|
| RF-18 | Historia del IFTS N.º 12. |
| RF-19 | Autoridades del instituto. |
| RF-20 | Normativa institucional (reglamento orgánico, código de convivencia). |
| RF-21 | Logos institucionales (IFTS N.º 12, Gobierno de la Ciudad y UPCN). |
| RF-22 | Contacto: dirección (Misiones 26, C1083 ABB, CABA), horario de atención (solo nocturno) y correo electrónico. |
| RF-29 | Quiénes son los bedeles y cómo contactarlos. |
| RF-30 | Acceso visible al sistema SIU (enlace, nombre y público a confirmar). |
| RF-31 | Procedimiento para solicitar títulos (informativo en v1). |
| RF-32 | Procedimiento para traspasos entre institutos IFTS (informativo en v1). |
| RF-33 | Enlaces a páginas de interés institucional (Ciudad Bilingüe, Centro de Simulación). |

### 3.5 Administración

| RF | Requisito |
|---|---|
| RF-23 | Módulo de autenticación (login) para el personal que administra contenidos. |
| RF-24 | Roles y permisos de edición según el tipo de contenido. |
| RF-25 | CRUD de noticias/novedades, mostrándolas de la más reciente a la más antigua, con al menos las del último mes visibles en la vista principal. |
| RF-26 | Desde el panel: actualizar calendario académico, horarios, autoridades, docentes, información de carreras y concursos. |
| RF-27 | Contenidos administrables persistidos en una base de datos. |
| RF-28 | Acceso directo y visible al Campus Virtual Moodle desde la Home. |
| RF-34 | Desde el panel: actualizar las imágenes del carrusel/slider institucional. |

---

## 4. Mapa de contenidos y prioridades

Validación funcional sección por sección (fuente: Parte IV del Consolidado). Destinatario,
prioridad, tipo de contenido y ubicación funcional. La arquitectura visual definitiva queda a
cargo de UX/UI.

### Inicio / Home

| Contenido | Destinatario | Prioridad | Tipo | Ubicación funcional |
|---|---|---|---|---|
| Slider/carrusel de imágenes institucionales | Todos | Alta | Administrable | Bloque de Home |
| Noticias recientes (último mes visible) | Todos | Alta | Administrable | Bloque de Home |
| Preguntas frecuentes destacadas | Ingresantes / estudiantes | Alta | Administrable | Bloque de Home |
| Acceso al Campus Virtual (Moodle) | Estudiantes / docentes | Alta | Fijo (enlace) | Acceso rápido |
| Acceso a inscripción oficial (GCBA) | Ingresantes | Alta | Fijo (enlace) | Acceso rápido |
| Acceso a SIU | Estudiantes / docentes (a confirmar) | Alta | Fijo (enlace) | Acceso rápido |
| Accesos rápidos (tutorías, becas, constancias, mesas, calendario, carreras, contacto) | Estudiantes / ingresantes | Alta | Mixto | Acceso rápido |

### Carreras

| Contenido | Destinatario | Prioridad | Tipo | Ubicación funcional |
|---|---|---|---|---|
| Presentación de cada carrera | Ingresantes / público | Alta | Administrable | Menú principal |
| Modalidad y horarios | Ingresantes / estudiantes | Alta | Administrable | Submenú (ficha de carrera) |
| Plan de estudios | Ingresantes / estudiantes | Alta | Fijo (por plan vigente) | Submenú |
| Materias y correlatividades | Estudiantes | Media | Fijo | Submenú |
| Cuerpo docente por carrera | Estudiantes / público | Media | Administrable | Submenú |

### Institucional / Nosotros

| Contenido | Destinatario | Prioridad | Tipo | Ubicación funcional |
|---|---|---|---|---|
| Historia, autoridades, normativa, reglamentos, código de convivencia | Público general | Media | Fijo | Submenú |
| Bedeles | Estudiantes / ingresantes | Media | Administrable | Submenú |
| Dirección y horario de atención | Público general | Alta | Fijo | Contacto / pie de página |
| Logos institucionales (IFTS N.º 12, GCBA, UPCN) | — | Alta | Fijo | Pie de página / Home |

### Comunidad de alumnos / Tutoría / Docente

| Contenido | Destinatario | Prioridad | Tipo | Ubicación funcional |
|---|---|---|---|---|
| Constancias, mesas de examen, becas, calendario | Estudiantes | Alta | Administrable | Acceso rápido |
| Solicitud de títulos (informativo) | Estudiantes | Media | Fijo en v1 | Submenú |
| Traspasos entre IFTS (informativo) | Ingresantes / estudiantes | Media | Fijo en v1 | Submenú |
| Espacio de tutorías | Ingresantes / estudiantes | Alta | Administrable | Bloque destacado / menú |
| Concursos docentes | Docentes | Media | Administrable | Bloque destacado |

### Noticias / Novedades

| Contenido | Destinatario | Prioridad | Tipo | Ubicación funcional |
|---|---|---|---|---|
| Listado de la más reciente a la más antigua | Todos | Alta | Administrable (CRUD) | Menú principal / bloque Home |
| Historial de noticias | Todos | Media | Administrable | Submenú |

### Enlaces de interés

| Contenido | Destinatario | Prioridad | Tipo | Ubicación funcional |
|---|---|---|---|---|
| Ciudad Bilingüe, Centro de Simulación y otros que sume Edith | Público general | Baja | Fijo (enlaces externos) | Bloque / pie de página |

---

## 5. Menú propuesto y accesos

### 5.1 Menú principal (propuesta de Análisis, Parte VI)

Home · Nosotros (autoridades, bedeles, ubicación, normativa, reglamentos, código de convivencia,
historia) · Carreras · Comunidad docente · Comunidad alumnos · Comunidad tutoría · Preguntas
Frecuentes · Noticias · Contacto.

> Nota de navegación: la arquitectura visual y el menú definitivo los define **UX/UI** (el Mapa
> del Sitio V2 del 15/09/2026 propone otro orden/nomenclatura: Inicio, Carreras, Ingresantes,
> Estudiantes, Tutorías, Docentes, Institucional, Novedades, Contacto). Este documento no
> resuelve esa tensión; ambas son fuente de verdad en sus respectivos alcances
> (Análisis = contenidos/requisitos; UX/UI = navegación).

### 5.2 Accesos rápidos de Home (7 confirmados)

1. Campus Virtual (Moodle)
2. SIU
3. Inscripción oficial (GCBA)
4. Becas
5. Constancias
6. Mesas de examen
7. Calendario académico

Accesos destacados/prioritarios (Parte IV): Moodle, inscripción oficial y SIU como enlaces
fijos de acceso rápido con prioridad Alta.

---

## 6. Matriz de contenido fijo vs. administrable (Parte V)

### Fijos

| Contenido | Motivo |
|---|---|
| Historia, normativa institucional, reglamento orgánico, código de convivencia | Documentos formales, cambian solo ante actualización normativa. |
| Planes de estudio vigentes, materias, correlatividades, resoluciones | Ligados al plan de estudios vigente, no se editan con frecuencia. |
| Logos institucionales (IFTS N.º 12, GCBA, UPCN) | Identidad institucional. |
| Enlaces oficiales (inscripción GCBA, Moodle, SIU, enlaces de interés) | Enlaces externos administrados por otros organismos. |
| Condiciones de regularidad, equivalencias y pases entre institutos | Normativa académica, cambia solo por resolución. |
| Dirección y horario de atención (Misiones 26, C1083 ABB, CABA — nocturno) | Dato institucional confirmado. |

### Administrables

| Contenido | Motivo / frecuencia de cambio |
|---|---|
| Noticias/novedades e imágenes del carrusel | Se publican periódicamente; requieren CRUD. |
| Calendario académico, horarios de cursada, modalidad | Cambian por ciclo lectivo o cuatrimestre. |
| Autoridades, docentes por carrera, bedeles, concursos docentes | Rotan según gestión y designaciones. |
| Fechas de inscripción y de mesas de examen | Se actualizan por ciclo. |
| Becas (tipos, requisitos, procedimiento) e información de tutorías | Pueden cambiar según política institucional. |
| Información de contacto y preguntas frecuentes (FAQ) | Se actualizan y amplían según consultas reales. |

### Casos a confirmar

| Contenido | Duda |
|---|---|
| Boleto estudiantil | ¿Solo informativo (fijo) o requiere trámite/gestión desde el sitio (administrable)? |
| Constancias | ¿El sitio solo informa el trámite (fijo) o permite generarlas/solicitarlas (administrable)? |
| Solicitud de títulos y traspasos entre IFTS | Fijos (informativos) en v1; pasan a administrables si se gestionan como trámite online en una segunda etapa. |

---

## 7. Propuesta de alcance (Parte VI)

- **A — Primera versión:** Home con carrusel/slider, accesos directos y noticias destacadas;
  Carreras; comunidades de alumnos/tutoría/docente; institucional (incluye bedeles); FAQ por
  segmento; noticias con CRUD; accesos externos visibles (Moodle, SIU, inscripción GCBA,
  enlaces de interés); solicitud de títulos y traspasos en versión informativa; login,
  roles/permisos y panel de administración básico.
- **B — Segunda etapa:** solicitud de títulos y traspasos como trámites gestionables online;
  mejoras de interactividad en el carrusel/slider; ampliación de roles/permisos.
- **C — Futuro / evolución:** bot/asistente virtual institucional (fuera del alcance de v1, sin
  bloquear integración futura); integraciones más profundas con SIU.

---

## 8. Contenido pendiente del instituto (no inventable)

Depende del Drive de Edith / Dirección (la Respuesta aclara que Análisis entrega estructura y
prioridad; el contenido real lo define el instituto):

- Detalle completo por carrera (plan, correlatividades, programa, resolución, horarios, cuerpo
  docente) compatibilizado con el material del Drive.
- Nombres y contacto de bedeles (y si se publican datos individuales o información genérica).
- Enlace y nombre exacto de SIU, y público destinatario.
- Procedimiento de solicitud de títulos y de traspasos entre IFTS.
- Reglamentos completos y material gráfico para el carrusel/slider.
- Logos institucionales en alta resolución (IFTS N.º 12, GCBA, UPCN).
- URL oficial del Campus Virtual Moodle y URL oficial de inscripción del GCBA. Mientras no
  lleguen, usar **placeholder vacío** en el frontend.
- Textos definitivos de slider, noticias y FAQ destacadas.

---

## 9. Dudas abiertas y decisiones a validar

### Dudas funcionales

- SIU: sistema exacto, público destinatario y nombre visible.
- Bedeles: ¿datos individuales o información genérica del rol?
- Solicitud de títulos y traspasos: ¿informativo vs. gestionable?
- Login: ¿solo administradores de contenido u otros perfiles? (por defecto: solo administradores).

### Decisiones que necesitan validación institucional

- Aprobación del alcance por etapas (A, B, C).
- Confirmación de que el bot queda fuera de la primera versión.
- Confirmación del menú/botonera propuesto por Análisis.

---

## 10. Corroboraciones clave de la Respuesta al feedback de Frontend

Respuestas punto por punto al documento `grupo_1_analisis_funcional.md`:

- **Minuta V2:** resuelta — está unificada en la Parte I del Consolidado.
- **Mapa del sitio validado:** resuelto — Parte IV del Consolidado; Frontend debe trabajar sobre
  esta versión, no sobre el mapa inicial original.
- **Accesos rápidos:** **7 confirmados (no 9)**, listados en la Parte VI.
- **Dirección física:** confirmada, no pendiente (Misiones 26, C1083 ABB, CABA — nocturno).
- **Criterios de priorización:** resuelto — Parte IV (qué se muestra primero en Home), Parte III
  (público vs. login: solo personal que administra), Parte V (fijo vs. administrable), Parte VI
  (orden de implementación: A → B → C).
- **URLs oficiales (Moodle e inscripción):** pendientes de Dirección/Edith; el uso de placeholder
  vacío por parte de Frontend es correcto mientras tanto.
- **Contenido real:** en curso de procesar el Drive de Edith; se irá entregando por sección.
- **Quién entrega qué:** Análisis entrega minuta, mapa validado y estructura/prioridad (ya
  entregados); los contenidos reales los coordina con Dirección/Edith.

---

## 11. Referencias cruzadas para la auditoría

Al auditar documentación vieja contra esta fuente, verificar especialmente:

1. **Número de accesos rápidos de Home: 7** (corregir cualquier doc que diga 9).
2. **Menú:** la propuesta de Análisis usa "Nosotros" y "Comunidad X"; el Mapa V2 de UX/UI usa
   "Institucional", "Ingresantes", "Estudiantes", "Tutorías", "Docentes". Marcar 🟡 y no
   sobrescribir la fuente de navegación (UX/UI).
3. **Login solo para administradores de contenido** (los RF de admin: RF-23…RF-28, RF-34).
4. **Carreras: 6** (RF-01/RF-04, parte IV).
5. **Bot fuera de v1** (etapa C), no inventarlo.
6. **Boleto estudiantil / constancias / títulos / traspasos:** casos a confirmar, informativos
   en v1.
7. Todo contenido real no recibido del instituto se marca 🔵/⏳ y NO se inventa.