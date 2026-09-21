# Auditoría de cumplimiento — Análisis funcional (fuente única validada)

> Fecha: 2026-09-18 (v2, regenerada contra la fuente validada por el cliente).
> Fuente auditada: `docs/frontend/analisis_funcional_validado.md` — síntesis validada de los
> 3 PDFs aprobados de Análisis (`docs/driveFrontend/01_analisis_funcional/`: Documento
> Consolidado, Respuesta a Frontend y PP Análisis).
> Objeto auditado: documentación del proyecto (archivos de grupo y `docs/frontend/`) y estado
> del frontend (rama `develop` + Fase 6 + refactor Mapa Sitio V2).
> Documento vivo: actualizado en cada entrega relevante del instituto (Drive de Edith, URLs
> oficiales) o de Backend (contratos).
> Esta v2 reemplaza a la v1 del 08/09/2026 (que auditaba el PDF unificado sin la validación y
> reflejaba un estado pre–Fase 6 / pre–refactor V2).

## Resumen ejecutivo

| Categoría | Cumplimiento |
|---|---|
| Complementariedad con Moodle (servicio independiente, VPS separado, acceso visible desde Home) | ✅ Alineado |
| Home con accesos rápidos, novedades y comunidades | 🟡 Estructura lista con **7 accesos rápidos confirmados**; faltan URLs oficiales e imágenes |
| Comunidades (tutoría / alumnos / docentes) | ✅ Implementado |
| Página institucional (historia, autoridades, normativa, bedeles, contacto, logos) | 🟡 Contacto con dirección/horario confirmados (RF-22) ✅; resto de secciones placeholder |
| Carreras (modalidad, horarios, plan de estudios) | 🟡 6 carreras mock con `modalidad`/`horarios`; falta contenido real del instituto |
| Noticias / novedades (CRUD, historial, imagen, último mes) | 🔵 Bloqueado por Backend + contenido (CRUD); slider visual sin imágenes |
| Autenticación / roles / panel de administración | 🔵 Bloqueado por Backend; confirmado que el login es solo para administradores de contenido |
| Enlaces externos (Moodle, inscripción GCBA, SIU) | 🟡 Placeholders vacíos hasta recibir URLs oficiales (SIU: nombre/público a confirmar) |

## Alcance de esta v2

- **Documentación auditada:** `grupo_1_analisis_funcional.md`, `grupo_3_frontend.md`,
  `docs/frontend/{dependencias-equipos,acta-decisiones}.md`, `docs/entregas/`, memoria
  (`estado_actual_proyecto.md`, `bitacora_agentica.md`).
- **Código auditado (estado real):** Fase 6 (RF-22, accesos rápidos, tipos `Carrera`/`Noticia`,
  FAQ, fechas) y Refactor Mapa Sitio V2 (menú 9 ítems, buscador global, accesos destacados/
  rápidos) — ver `estado_actual_proyecto.md` §2-4.

## Hallazgos de consistencia documental (IDs AF-*)

| ID | Hallazgo | Fuente de verdad vs. doc viejo | Acción tomada |
|---|---|---|---|
| AF-A1 | "Minuta V2 bloqueada / por entregar" | Resuelta — Parte I del Consolidado (§10 fuente) | ✅ `grupo_1` §1.1, `dependencias-equipos.md` §1, `grupo_3` nota interna |
| AF-A2 | "Mapa del sitio pendiente de validación" | Resuelto — Parte IV del Consolidado | ✅ `grupo_1` §1.2 y §5, `grupo_3` §2.1 |
| AF-A3 | "Confirmar los 9 accesos rápidos" | **7 confirmados** (Moodle, SIU, Inscripción GCBA, Becas, Constancias, Mesas, Calendario) — Parte VI | ✅ `grupo_1` §2.1 corregido a 7 |
| AF-A4 | Menú de 5 ítems / regla "máx. 4-5" como vigente | Reemplazado por Mapa V2 de UX/UI (9 ítems + buscador, 15/09/2026) | ✅ `grupo_3` §1/§5, `acta-decisiones.md` §3 marcada reemplazada, DEC-003 a actualizar |
| AF-A5 | Dirección/horario de contacto "pendientes" | Confirmados (Misiones 26, C1083 ABB, CABA — nocturno), contenido fijo (RF-22) | ✅ `grupo_1` §2.8 |
| AF-A6 | Tensión de accesos: Análisis 7 (con SIU) vs. Mapa V2 UX/UI 9 (ver nota) | La fuente **no resuelve** la tensión: navegación la define UX/UI; ambas son fuente de verdad en su alcance (§5 nota y §11.2). **Nota 21/09:** el `mapa_sitio_ifts12_(V2).md` nuevo (reemplazo del mapa V2 del 15/09) **sí incluye SIU** como acceso directo externo en la barra superior → afina el hallazgo (ver `auditoria-ux-ui.md` UX-A1/UX-A2) | 🟡 Documentada en `grupo_1`, `grupo_3`, `acta-decisiones` §12, `auditoria-ux-ui.md` y este informe. **Pendiente de decisión de UX/UI** — no se sobrescribió |
| AF-A7 | Login alcance ambiguo en docs viejos | **Login exclusivo para personal que administra contenidos**; contenido público (Parte III, §11.3) | ✅ Reflejado en `grupo_1` §4 |
| AF-A8 | Carreras cantidad ambigua (3 mocks vs. documento) | **6 carreras** (Parte IV, RF-01/RF-04) | ✅ Ya alineado en Fase 6 (6 mocks con modalidad/horarios) |
| AF-A9 | Bot/asistente virtual tema abierto | **Fuera de v1** (etapa C), no inventarlo | ✅ Reflejado en `grupo_1` §4 y decisiones |
| AF-A10 | Auditoría v1 (08/09) con estados desactualizados | Reflejaba pre–Fase 6 y pre–refactor V2 (menú 5 ítems, accesos SIU/constancias/mesas/calendario "faltaban", contacto "placeholder") | ✅ Esta v2 reemplaza a la v1 |

## Matriz de cumplimiento RF-01 → RF-34 (estado actual)

### Futuros ingresantes

| RF | Requisito | Estado | Detalle |
|---|---|---|---|
| RF-01 | Listado completo de carreras con nombre y modalidad | 🟡 | 6 mocks con `modalidad`/`horarios` (Fase 6); falta contenido real y confirmación de nombres exactos |
| RF-02 | Requisitos y fechas de inscripción | 🔵 | Falta sección y contenido (Análisis/Dirección — Drive de Edith) |
| RF-03 | Acceso directo y visible al enlace oficial de inscripción GCBA | 🟡 | CTA de portada condicional implementado; URL en placeholder vacío hasta recibirla |
| RF-04 | Horarios y modalidad de cada carrera | 🟡 | Campo `modalidad`/`horarios` en tipo `Carrera` y mocks; falta vínculo con contenido real |
| RF-05 | Equivalencias y pases desde otros institutos | 🔵 | Falta contenido (caso a confirmar en la fuente §6) |
| RF-06 | FAQ específica para futuros ingresantes | 🟡 | Categoría `ingresantes` con 12 FAQs descriptivas; textos pendientes de validación |

### Estudiantes actuales

| RF | Requisito | Estado | Detalle |
|---|---|---|---|
| RF-07 | Condiciones para mantener la regularidad | 🔵 | Falta contenido real |
| RF-08 | Cómo se solicitan constancias | 🔵 | Acceso rápido "Constancias" atenuado; falta contenido y URL (caso a confirmar: ¿solo informativo?) |
| RF-09 | Fechas y modalidad de mesas de examen | 🔵 | Acceso rápido "Mesas" atenuado; falta contenido |
| RF-10 | Becas: tipos, requisitos, procedimiento | 🔵 | Acceso rápido "Becas" atenuado; falta contenido |
| RF-11 | Calendario académico actualizado | 🔵 | Acceso rápido "Calendario" atenuado; falta contenido |
| RF-12 | Acceso directo y visible al Campus Virtual (Moodle) | 🟡 | Banda + CTA condicionales en Home; URL en placeholder vacío |
| RF-13 | Boleto estudiantil | 🔵 | Caso a confirmar (informativo vs. trámite, fuente §6); falta contenido |
| RF-14 | FAQ específica para estudiantes actuales | 🟡 | Categoría `estudiantes` de mocks; textos a validar |

### Docentes

| RF | Requisito | Estado | Detalle |
|---|---|---|---|
| RF-15 | Concursos docentes | 🔵 | Falta contenido |
| RF-16 | Cuerpo docente por carrera | 🔵 | Falta contenido real |
| RF-17 | Información y accesos específicos para docentes | 🟡 | Sección `/docentes` placeholder (mapa V2); falta contenido |

### Institucional

| RF | Requisito | Estado | Detalle |
|---|---|---|---|
| RF-18 | Historia del IFTS N.º 12 | 🔵 | Placeholder; falta contenido del instituto |
| RF-19 | Autoridades | 🔵 | Placeholder; falta contenido |
| RF-20 | Normativa (reglamento orgánico, código de convivencia) | 🔵 | Placeholder; falta contenido |
| RF-21 | Logos institucionales (IFTS N.º 12, GCBA, UPCN) | 🔵 | Falta material oficial en alta resolución |
| RF-22 | Contacto: dirección, horario nocturno, correo | 🟡 | Dirección y horario **confirmados e implementados** en Contacto y footer (Fase 6); falta correo real |
| RF-29 | Bedeles: quiénes son y cómo contactarlos | 🔵 | No existe (informativo v1); falta decisión datos individuales vs. genérico |
| RF-30 | Acceso visible al sistema SIU | 🟡 | Confirmado como acceso rápido 7; falta URL, nombre y público destinar a confirmar |
| RF-31 | Solicitud de títulos (informativo v1) | 🔵 | No existe; falta procedimiento del instituto |
| RF-32 | Traspasos entre IFTS (informativo v1) | 🔵 | No existe; falta procedimiento |
| RF-33 | Enlaces de interés (Ciudad Bilingüe, Centro de Simulación) | 🔵 | No existe (baja prioridad); dependen de contenidos |

### Administración

| RF | Requisito | Estado | Detalle |
|---|---|---|---|
| RF-23 | Módulo de autenticación (login) para administración | 🔵 | `AuthContext`/`ProtectedRoute` preparados; backend no soporta auth todavía. Confirmado: login solo para administradores de contenido |
| RF-24 | Roles y permisos de edición | 🔵 | No existe; depende del modelo de Backend (roles a validar con el Grupo 1) |
| RF-25 | CRUD de noticias, reciente→antigua, último mes en Home | 🔵 | Noticias con fechas y orden reciente→antigua en Home (Fase 6); CRUD depende de Backend |
| RF-26 | Panel de administración (calendario, horarios, autoridades, carreras, concursos) | 🔵 | No existe; Backend |
| RF-27 | Contenidos administrables persistidos en BD | 🔵 | Backend; no se inventan endpoints |
| RF-28 | Acceso directo y visible a Moodle desde Home | 🟡 | Condicional implementado (`ENLACES.moodle`, banda + CTA) |
| RF-34 | Administrar imágenes del carrusel/slider desde panel | 🔵 | `SliderNoticias` sin imágenes y sin panel; Backend + material gráfico |

## Accesos rápidos de Home (verificación)

Confirmados por Análisis (Parte VI): **7**.

| Acceso | Confirmado | Presente en Home |
|---|---|---|
| Campus Virtual (Moodle) | ✅ | ✅ CTA/banda condicional (placeholder URL) |
| SIU | ✅ | ❌ como acceso visible (tensión V2 AF-A6); falta URL |
| Inscripción oficial GCBA | ✅ | 🟡 CTA de portada condicional |
| Becas | ✅ | ✅ atenuado (sin URL) |
| Constancias | ✅ | ✅ atenuado (sin URL) |
| Mesas de examen | ✅ | ✅ atenuado (sin URL) |
| Calendario académico | ✅ | ✅ atenuado (sin URL) |

> ⚠️ Mapa V2 de UX/UI (15/09/2026) lista **9 accesos** (Campus, Tutorías, Becas, Constancias,
> Mesas, Calendario, Inscripción, Carreras, Contacto) sin SIU. El Mapa V2 **nuevo**
> (`mapa_sitio_ifts12_(V2).md`, 21/09/2026) **incluye SIU** en la barra superior, lo que ajusta
> AF-A6. La fuente validada aclara que son **7, no 9**, pero delega la navegación a UX/UI.
> Tensión **🟡 AF-A6 / UX-A2**: a resolver por UX/UI y Análisis.

## Menú principal

- **Implementado (refactor V2, 15/09/2026):** 9 ítems (Inicio, Carreras, Ingresantes, Estudiantes,
  Tutorías, Docentes, Institucional, Novedades, Contacto) + buscador global en header.
- **Propuesto por Análisis (Parte VI):** Home, Nosotros, Carreras, Comunidad docente, Comunidad
  alumnos, Comunidad tutoría, Preguntas Frecuentes, Noticias, Contacto — orden/nomenclatura
  distinta. La fuente validada **no resuelve** la tensión (§11.2): la navegación la define UX/UI.
  Marcado 🟡 sin sobrescribir.

## Contenido fijo vs. administrable (Parte V)

- **Fijos:** dirección/horario (✅ implementado), logos, planes, normativa, enlaces oficiales —
  en gran parte 🔵 hasta recibir material oficial.
- **Administrables:** noticias/carrusel, calendario, autoridades, docentes, bedeles, concursos,
  fechas, becas, tutorías, FAQ, contacto — todos 🔵 Backend (CRUD/panel).
- **Casos a confirmar (§6 fuente):** boleto estudiantil, constancias, títulos y traspasos
  (informativo v1 → gestionable en etapa B). No se inventan.

## Cumplimientos positivos detectados

1. **Complementariedad con Moodle** respetada (servicio independiente, acceso visible, VPS propio).
2. **7 accesos rápidos confirmados** registrados y corregidos en la documentación (se eliminó el
   "confirmar 9").
3. **RF-22** dirección/horario nocturno implementado en Contacto y footer.
4. **6 carreras** con `modalidad`/`horarios` en mocks (antes 3, sin modalidad).
5. **Noticias con fechas** y orden reciente→antigua en Home.
6. **Login acotado** a administradores de contenido (documentado, sin implementar hasta que Backend
   lo soporte).
7. **Anti-alucinación respetada:** no hay URLs, textos ni endpoints inventados; pendientes como
   placeholder/atenuado.
8. **Bot/asistente virtual** fuera de v1 (etapa C), no inventado.

## Bloqueos externos (dependen de otros equipos)

- **Análisis / Dirección (Edith):** Drive con contenidos, URL oficial de inscripción GCBA,
  enlace/nombre/público de SIU, datos de bedeles, procedimientos de títulos/traspasos, material del
  carrusel, logos en alta resolución.
- **UX/UI:** wireframes/prototipos; resolver tensión de accesos (AF-A6, 7 vs. 9) y validar menú V2.
- **Backend:** endpoints, DTOs, login/roles (solo administradores), panel, CRUD de noticias.
- **IFTS N.º 12:** URL oficial del Campus Moodle y de inscripción; lugar donde se usa placeholder vacío.

## Checklist accionable

- [x] `grupo_1_analisis_funcional.md` actualizado con ✅/🟡/🔵 (minuta, mapa, accesos 7, dirección, priorización).
- [x] `grupo_3_frontend.md` actualizado (Fase 6 + refactor V2, menú 9 ítems, mapa resuelto).
- [x] `dependencias-equipos.md` §1 (minuta/mapa entregados).
- [x] `acta-decisiones.md` §3 reemplazada + decisión 12 (fuente validada, accesos 7, login, etapas).
- [ ] Acordar con UX/UI los accesos de Home (7 de Análisis vs. 9 del Mapa V2) — AF-A6.
- [ ] Re-auditar cuando lleguen: Drive de Edith, URLs oficiales, contratos de Backend.

## Archivo de grupo actualizado

Se actualizó el archivo del grupo correspondiente:
`docs/driveFrontend/01_analisis_funcional/grupo_1_analisis_funcional.md` (gitignored, no versionado).
Además se actualizó `docs/driveFrontend/03_frontend/grupo_3_frontend.md`.

## Referencias

- Fuente auditada: `docs/frontend/analisis_funcional_validado.md` (validada 18/09/2026).
- PDFs aprobados: `docs/driveFrontend/01_analisis_funcional/` (Documento Consolidado, Respuesta a
  Frontend, PP Análisis).
- Informes relacionados: `docs/sdd/06_auditorias/auditoria-infraestructura.md`,
  `docs/sdd/06_auditorias/auditoria-backend.md`.