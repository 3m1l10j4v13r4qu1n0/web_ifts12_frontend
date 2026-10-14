# Auditoría — Figma vs. documentación (IFTS N.º 12)

**Fecha:** 2026-10-09
**Archivo Figma:** `r3OmvrMfGmi2rKjK9TuC7j` — "IFTS 12 PC" (lastModified 2026-10-09T06:28:39Z)
**Fuentes comparadas:** `documentacion/frontend/analisis_funcional_validado.md`,
`documentacion/driveFrontend/01_analisis_funcional/*.pdf`,
`documentacion/driveFrontend/02_ux_ui/mapa_sitio_ifts12_(V2).md`,
`docs/01_global/correcciones_ux_ui_frontend.md`, `docs/project_state.md`,
`docs/02_technical/estado_implementacion.md`,
`docs/06_audits/audit_2026-10-08-ux-ui-frontend.md`,
`src/constants/navegacion.ts`, `src/routes/AppRouter.tsx`, `src/constants/enlaces.ts`.

> **Nota de método:** datos obtenidos de la API REST de Figma (`GET /v1/files/{key}`) con credencial del MCP configurado. Se analizó árbol de nodos, frames y textos reales.

## 1. Inventario de pantallas en Figma (Page 1)

Page 1 contiene todo; Page 2 y Page 3 están vacías. Todos los frames miden ~1440 px (PC).

| Frame Figma | ID | Qué es realmente | vs. plan |
|---|---|---|---|
| `Comunidad de alumnos` | 260:940 | Red social estudiantil (perfiles, grupos, métricas) | ❌ fuera de alcance (B3/I12) |
| `05 · Inicio guiado` | 213:2656 | Home alternativa (carrusel, accesos, novedades, FAQ) | ⚠️ Home duplicada (I11) |
| `inicio home` | 213:2539 | Home alternativa | ⚠️ Home duplicada (I11) |
| `carreras disponibles` | 34:3 | Listado de carreras (5) | ⚠️ Faltan 1 de 6 |
| `seleccion de carrera` | 59:14 | Estado de selección de carrera | ⚠️ redundante |
| `carrera seleccionada` | 59:39 | Detalle de carrera | ⚠️ incompleto |
| `login` | 46:5 | Login de **Campus/Moodle**, no admin | ❌ B1 / RF-23 |
| `Frame 10` | 60:149 | Ficha: Administración Pública | ✅ estructura |
| `Frame 15` | 101:21 | Ficha: Análisis de Sistemas | ✅ estructura |
| `Frame 16` | 101:41 | Ficha: Ciencia de Datos e IA | ✅ estructura |
| `Frame 17` | 101:61 | Ficha: Políticas Culturales | ✅ estructura |
| `Frame 19` | 175:36 | Ficha: Gestión Parlamentaria | ✅ estructura |
| `tutorias-page` | 102:225 | Tutorías (con CTA "Solicitar Tutoría") | ⚠️ CTA fuera de alcance |
| `ingresantes-page` | 202:39 | Ingresantes (copiado de Tutorías) | ❌ contenido incorrecto (I5) |
| `tutorias-page` | 116:142 | **Institucional**: Historia + Normativas | ⚠️ mal nombrada (I11) |
| `Frame 18` | 131:32 | Docentes/Autoridades/Equipo | ⚠️ autoridades mal ubicadas (I7) |
| `docentes-page` | 214:128 | Docentes/Autoridades/Equipo | ⚠️ sin concursos (RF-15) |
| `Pie institucional` / `Footer IFTS12` | 449:532 / 449:544 | Componentes de footer | ⚠️ B8 |

**Componentes:** `Header IFTS12`, `Footer IFTS12`, `person`, `search`. No hay `componentSets`.

**Pantallas faltantes:** Estudiantes (real), Novedades (listado+detalle), Contacto, FAQ (página segmentada), panel de administración (CRUD), buscador de resultados, 404, Bedeles / títulos / traspasos.

## 2. Checklist por requisito funcional (RF-01…RF-34)

| RF | Requisito | Evidencia en Figma | Estado |
|---|---|---|---|
| RF-01 | Listado de carreras con nombre y modalidad | `carreras disponibles` lista 5; modalidad no visible en listado | ⚠️ |
| RF-02 | Requisitos y fechas de inscripción | Ingresantes tiene requisitos parciales, **sin fechas** | ⚠️ |
| RF-03 | Acceso visible a inscripción GCBA | "Inscripciones" en top bar + URL SIU Guaraní en Ingresantes | ⚠️ |
| RF-04 | Horarios y modalidad por carrera | Fichas: "Modalidad Híbrida"; horarios no siempre | ⚠️ |
| RF-05 | Equivalencias y pases | Ingresantes copió Tutorías; no desarrolla | ❌ |
| RF-06 | FAQ ingresantes | FAQ en Home (3), no segmentada | ⚠️ |
| RF-07 | Condiciones de regularidad | Sin pantalla Estudiantes | ❌ |
| RF-08 | Solicitud de constancias | Acceso rápido; sin contenido | ⚠️ |
| RF-09 | Mesas de examen | Acceso rápido; sin contenido | ⚠️ |
| RF-10 | Becas | Acceso rápido; sin detalle | ⚠️ |
| RF-11 | Calendario académico | **No aparece** | ❌ |
| RF-12 | Acceso Moodle visible | "Campus Virtual" en header + Home | ✅ |
| RF-13 | Boleto estudiantil | Ausente | ❌ |
| RF-14 | FAQ estudiantes | Sin página; Home genérica | ⚠️ |
| RF-15 | Concursos docentes | Docentes no los muestra | ❌ |
| RF-16 | Cuerpo docente por carrera | "Nuestro Equipo" plano, no por carrera | ⚠️ |
| RF-17 | Info/accesos docentes | Existe pero mezcla autoridades | ⚠️ |
| RF-18 | Historia del instituto | En frame Institucional (mal nombrado) | ✅ |
| RF-19 | Autoridades | En Docentes/Frame 18 (debería ir a Institucional, I7) | ⚠️ |
| RF-20 | Normativa | "Regalamento organico link", "Codigo de convivencia" (typos) | ⚠️ |
| RF-21 | Logos IFTS/GCBA/UPCN | `image 2` + recreación "BA Ciudad"; falta IFTS y UPCN | ❌ |
| RF-22 | Contacto dirección/horario/email | Misiones 26 + nocturno ✅; email solo `tutorias@…` | ⚠️ |
| RF-23 | Login administrador | Login es de Campus/Moodle | ❌ |
| RF-24 | Roles y permisos | Sin panel | ❌ |
| RF-25 | CRUD noticias / último mes | Home muestra cartelera; sin CRUD | ⚠️ |
| RF-26 | Panel de actualización | Sin panel | ❌ |
| RF-27 | Persistencia en BD | No visualizable | ⏳ |
| RF-28 | Acceso Moodle desde Home | Sí | ✅ |
| RF-29 | Bedeles | No visible | ❌ |
| RF-30 | Acceso SIU | "SIU Guaraní" como acceso rápido; **no en header** | ⚠️ |
| RF-31 | Solicitud de títulos | No visible | ❌ |
| RF-32 | Traspasos entre IFTS | No visible | ❌ |
| RF-33 | Enlaces de interés institucional | "Links y documentos de la carrera" genérico | ❌ |
| RF-34 | Actualizar imágenes del carrusel | Sin panel | ❌ |

## 3. Mapa del Sitio V2 (9 ítems aprobados 15/09/2026)

| Ítem de menú | ¿Pantalla en Figma? | Estado |
|---|---|---|
| Inicio | Sí (×3 variantes) | ⚠️ duplicado, fuera de nav |
| Carreras | Sí (listado + 5 fichas) | ✅ |
| Ingresantes | Sí (contenido incorrecto) | ⚠️ |
| Estudiantes | Solo "Comunidad de alumnos" (rechazada) | ❌ |
| Tutorías | Sí (+ CTA fuera de alcance) | ⚠️ |
| Docentes | Sí (sin concursos, con autoridades) | ⚠️ |
| Institucional | Sí (mal nombrado `tutorias-page` 116:142) | ⚠️ |
| Novedades | **No** (solo bloque en Home) | ❌ |
| Contacto | **No** (solo formulario footer) | ❌ |

## 4. Header y Footer

**Header (`Header IFTS12`):**
- `Nav_Links`: **CARRERAS, INGRESANTES, ESTUDIANTES, INSTITUCIONAL** (4 de 9). Faltan Inicio, Tutorías, Docentes, Novedades, Contacto.
- Top bar: `Campus_Virtual_Link`, `Inscripciones_Link` y `person` (ícono de perfil) — fuera de alcance (I12).
- **Falta SIU** (Mapa V2 pide Moodle + SIU + Inscripción).
- Placeholders: `Main_Title`/`Marca`/secciones "Sección".

**Footer (`Footer IFTS12` / `Pie institucional`):**
- Dirección "Misiones 26, C1083 ABB, CABA", horario "Exclusivamente Nocturno", formulario placeholder "Con validación de campos" (sin diseño).
- **Faltan** logos IFTS N.º 12 y UPCN; GCBA es recreación → **B8/RF-21**.

## 5. Provisorio vs Definitivo (anti-invención)

**Usables:** nombres 5 tecnicaturas, planes/resoluciones, "Modalidad Híbrida (Presencial y Virtual Sincrónico)", dirección/horario.

**Inventados / no confirmados (violan anti-invención):**
- Red social: perfiles, "+420 estudiantes", grupos, redes sociales.
- "Cinco tecnicaturas" — **Análisis validado habla de 6 carreras** (B7).
- `tutorias@ifts12online.com.ar` — no confirmado.
- Autoridades/Consejo Directivo — a verificar (B7).
- URL inscripción GCBA (`guarani-autogestionagencia.bue.edu.ar/...`) — confirmar oficialidad.
- Typos: "ITFS 12", "A trves", "Regalamento", "infomración", "¡Ha olvidado" (M2).

**Bueno:** tabla de correlatividades estructurada (413:539) atiende **B5** (legible, no imagen), aunque con celdas placeholder.

## 6. Desvíos vs correcciones UX/UI (B1–B9, I1–I12, M1–M7)

| ID | Hallazgo | Estado |
|---|---|---|
| B1 | `login` = Campus/Moodle (debe ser admin RF-23) | ❌ |
| B2 | Sin panel/CRUD administración | ❌ |
| B3 | "Comunidad de alumnos" con perfiles/grupos/métricas | ❌ |
| B4 | Sin listado+detalle de Novedades | ❌ |
| B5 | Correlatividades estructuradas (parcial) | ⚠️ |
| B6 | Solo PC (1440px); sin tablet/mobile | ❌ |
| B7 | Métricas/perfiles/autoridades sin fuente; 5 vs 6 carreras | ❌ |
| B8 | Recreación BA; faltan logos IFTS/UPCN; escudo generado | ❌ |
| I8 | Falta Calendario académico + acceso | ❌ |
| I11 | 3 Home; Institucional mal nombrada | ❌ |
| I12 | Ícono persona + "Solicitar Tutoría" | ❌ |

## 7. Respuestas directas

- **¿Agrega pantallas/rutas no previstas?** Sí. "Comunidad de alumnos", login Moodle, "05 · Inicio guiado" (Home duplicada) — todas rechazadas por `correcciones_ux_ui_frontend.md`.
- **¿Falta alguna prevista?** Sí. Estudiantes (real), Novedades (listado+detalle), Contacto, FAQ (página segmentada), panel admin CRUD, buscador resultados, 404, Bedeles/títulos/traspasos.
- **¿Respeta menú 9 ítems?** **No.** Header solo 4 ítems. Falta Inicio, Tutorías, Docentes, Novedades, Contacto. Tampoco incluye SIU en header.
- **¿Header/Footer coinciden con requerimientos?** **Parcial/no.** Faltan SIU, logos IFTS/UPCN correctos, menú completo. Footer tiene datos pero formulario sin diseño y logos recreados.
- **¿Tomar Figma como contrato visual?** **No, aún no.**

## 8. Recomendación

**No tomar Figma como contrato visual.** Es referencia útil (fichas de carrera + estructura), pero tiene desvíos bloqueantes (B1–B4,B6–B8,I8,I11,I12) + menú incompleto + solo PC.

**Condiciones mínimas antes de aprobarlo como contrato:**
1. **Una sola Home** de referencia con menú completo de 9 ítems.
2. **Header** con Moodle + SIU + Inscripción, sin ícono de persona.
3. **Footer** con logos oficiales IFTS/GCBA/UPCN + redes + legales + formulario con validación diseñada.
4. **Pantallas faltantes:** Estudiantes real, Novedades (listado+detalle), Contacto, FAQ segmentada, panel admin, 404, resultados búsqueda.
5. **Corregir**: login admin (no Moodle), eliminar "Comunidad de alumnos", contenido Ingresantes, autoridades en lugar correcto, concursos docentes.
6. **Responsive**: frames tablet/mobile (1440px solo no basta).
7. **Fuente de verdad:** validar autoridades, emails, URLs oficiales; corregir typos; 6 carreras (no 5).
