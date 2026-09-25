# Auditoría de cumplimiento — Documentación UX/UI (V1 y Mapa V2)

> Fecha: 2026-09-21.
> Fuente auditada: `documentacion/driveFrontend/02_ux_ui/` —
> - `DocumentaciónDisenoUX(V1).md` — documento técnico de diseño UX/UI V1 (Home, login del
>   Campus, estructura por sección, esquema de navegación V1).
> - `mapa_sitio_ifts12_(V2).md` — Mapa General del Sitio V2 (índice de contenidos y estructura;
>   reemplaza al `mapa_inicial_sitio_web_ifts12_2026_v2.md` que dejó de existir).
> - `wireframe/` — 13 pantallas HTML de baja fidelidad (home, carreras, carrera-detalle,
>   contacto, docentes, estudiantes, ingresantes, institucional, novedades, nota-completa,
>   tutorias, busqueda, index).
>
> Cruzado contra: `documentacion/frontend/analisis_funcional_validado.md` (fuente única de análisis,
> 18/09/2026), `docs/06_audits/audit_2026-09-18-analisis-funcional.md` (v2), y el estado real
> del código (`src/`, ejecutado `lint`/`build`/`test` en verde).
>
> Documento vivo: se actualiza cuando UX/UI entregue nuevos artefactos (prototipos, paleta,
> tipografía, breakpoints) o Análisis resuelva la tensión de accesos.
>
> Archivo del grupo actualizado: `documentacion/driveFrontend/02_ux_ui/grupo_2_ux_ui.md`.

## Resumen ejecutivo

| Categoría | Cumplimiento |
|---|---|
| Mapa del sitio V2 (9 ítems + buscador global) | ✅ Implementado y alineado (`navegacion.ts`) |
| Accesos directos a plataformas externas en barra superior (Moodle, SIU, Inscripción GCBA) | 🟡 El V2 los pide en la cabecera; el frontend solo los muestra en Home/CTA/Footer, **SIU sin UI** |
| Cantidad de accesos rápidos de Home | 🟡 Tensión: 7 confirmados por Análisis vs. 9 del V2 (3 destacados + 6 rápidos) |
| Wireframes de todas las secciones | ✅ Entregados (13 pantallas HTML en `wireframe/`) |
| Paleta tipografía iconografía tokens | 🔵 Pendientes (V1 no define paleta formal) |
| Formulario de consulta directa con validación en el pie | 🔵 No implementado; depende de backend `/api/contacto` |
| Estados de UI obligatorios (V2 §5) | 🟡 Empty state del buscador ✅; loading y errores de validación 🔵 |
| Login | ✅ Aclarado: el login del Campus (V1) es externo; el del sitio es solo admin (RF-23) |
| Responsive | 🟡 Wireframes requieren Desktop/Mobile; frontend ya es mobile-first (Tailwind) |

## Hallazgos (IDs UX-A*)

| ID | Hallazgo | Estado real verificado | Acción |
|---|---|---|---|
| UX-A1 | **Header sin accesos directos a plataformas externas.** El V2 §1 pide en la barra superior accesos directos a Campus Moodle, SIU e Inscripciones (GCBA). | `Header.tsx` solo tiene logo + buscador + menú. Moodle/Inscripción están en Home (`AccesosDestacados`), `HomePage` (CTA) y `Footer`. `ENLACES.siu` (`enlaces.ts`) **no se usa en ninguna UI**. | 🟡 Implementar accesos directos en el `Header` cuando haya URLs oficiales; `ENLACES.siu` ya reservado para cuando se confirme nombre/público del SIU (RF-30). |
| UX-A2 | **Tensión de accesos de Home (7 vs 9).** Análisis confirma 7 accesos (Moodle, SIU, Inscripción, Becas, Constancias, Mesas, Calendario). El V2 implementa 3 destacados (Moodle, Inscripción, Carreras) + 6 rápidos (Tutorías, Becas, Constancias, Mesas, Calendario, Contacto) = 9, y SIU pasa a la barra superior. | `mock-data.ts`: `mockAccesosDestacados` (3) + `mockAccesosRapidos` (6). El V2 nuevo **sí incluye SIU** en la cabecera → ajusta la tensión AF-A6 de la auditoría de análisis (antes "V2 sin SIU"). | 🟡 Documentada. Queda **Carreras** y **Contacto** del V2 que Análisis no lista como rápidos, y SIU que Análisis lista y el V2 ubica en la barra. Resolver con Análisis/UX-UI. |
| UX-A3 | **Formulario de consulta directa con validación en el pie (V2 §1 y §5).** No existe. | `Footer.tsx` no tiene formulario. Contacto es página placeholder con correo/dirección/horario. El backend tiene pendiente confirmar `POST /api/contacto` (BE en auditoría-backend). | 🔵 Depende de Backend (`/api/contacto`) y de UX/UI (validaciones visuales). |
| UX-A4 | **Login del Campus Moodle (V1 §2.2) es EXTERNO al sitio.** El V1 maqueta una pantalla dividida 50/50 de login de Moodle para estudiantes. | El login del sitio según la fuente de análisis es **exclusivo para administradores de contenido** (RF-23…RF-28, RF-34); el login público del Campus vive en Moodle, no en este frontend. | ✅ Aclarado. No implementar el login del V1 en el frontend institucional. `AuthContext`/`ProtectedRoute` quedan solo para admin. |
| UX-A5 | **Menú V1 vs V2.** El esquema V1 (§4) lista 7 secciones (Inicio, Carreras, Ingresantes, Estudiantes, Institucional [con comunidades tutorías/docentes adentro], Novedades, Contacto); el esquema dice "9 cards" de accesos pero el texto (§2.1) enumera 7. El V2 define 9 ítems de menú. | El frontend implementa el **V2** (`MENU_PRINCIPAL`: Inicio, Carreras, Ingresantes, Estudiantes, Tutorías, Docentes, Institucional, Novedades, Contacto). V1 quedó superado. | ✅ V2 manda (fuente de navegación). V1 se conserva como referencia histórica de diseño. |
| UX-A6 | **Wireframes entregados.** Antes la sección 2 del grupo 2 decía "pendiente". | `documentacion/driveFrontend/02_ux_ui/wireframe/` tiene las 13 pantallas; `grupo_2_ux_ui.md` §2 actualizado a ✅. | ✅ Documentado en el grupo 2. |
| UX-A7 | **Estados de UI obligatorios (V2 §5):** loading en buscador y tablas admin; empty states; errores de validación en formulario de consulta y login admin. | `BuscadorGlobal.tsx` muestra **empty state** ("Sin resultados para «…»") ✅. No hay loading visual (búsqueda local síncrona) ni tablas admin (sin backend). Errores de validación 🔵 (sin formularios). | 🟡 Empty ✅; loading/validación 🔵 al llegar backend. |
| UX-A8 | **Buscador del hero y página de resultados.** El wireframe `home.html` incluye un buscador en el hero y `busqueda.html` es página de resultados; el V2 §4 pide búsqueda <1 s (materias, noticias, trámites). | El frontend tiene `BuscadorGlobal` en el header (dropdown de resultados locales, índice de mocks) pero **no una página de resultados** ni buscador en el hero. Búsqueda real (incl. PDFs/materias) pendiente de endpoint de Backend. | 🟡 Coherente con el V2 en el header; página de resultados depende de Backend/UX-UI. |
| UX-A9 | **Sistema visual (paleta, tipografía, iconografía, tokens) sigue sin entregar.** El V1 describe layout y colores de ejemplo (cyan en login) pero no define tokens. | `src/styles/index.css` usa la paleta provisional `acento` 90/10. | 🔵 Pendiente de UX/UI para actualizar `@theme`. |
| UX-A10 | **Sedes, horarios y modalidades en Home (V1 §3.1).** El V1 pide bloque de "Información destacada" con sedes/horarios/modalidades. | La Home muestra carreras con modalidad/horarios (`mockCarreras`) y el footer la dirección; no hay bloque consolidado de sedes. | 🟡 Cubierto parcialmente por Carreras/Footer; bloque de sedes depende de contenido real (Edith). |

## Alcance funcional del V1 vs. RF auditadas

El V1 no aporta requisitos funcionales nuevos: sus secciones 3.1-3.6 (Home, Carreras, Ingresantes,
Estudiantes, Institucional, Noticias) coinciden con los RF-01…RF-34 ya auditados en
`audit_2026-09-18-analisis-funcional.md` (matriz RF en verde/🟡/🔵). El V1 refuerza:

- El **complemento con Moodle** (no reemplazo): acceso directo y visible desde Home. ✅.
- **Carreras** con ficha completa (plan, materias, correlatividades, programas, resoluciones,
  cuerpo docente) — RF-01/04/16, contenido 🔵 del instituto.
- **Bedeles** dentro de Institucional (V1 §3.5) — RF-29, confirmado en el V2 §1 Institucional.
- **Noticias** con historial, vistas de tarjeta, último mes en portada y CRUD — RF-25/34, 🔵 backend.

## Requisitos de infraestructura del V2 (§4) vs. estado real

| Requisito V2 | Estado |
|---|---|
| Sitio en servidor independiente del Moodle | ✅ Plan B VPS separado (`propuesta-tecnologica.md`) |
| Capacidad y rendimiento ante picos | ✅ Plan B con dimensionamiento; sin evidencia de carga real |
| Seguridad/cifrado/certificados y accesos restringidos | 🟡 Build estático servido por Nginx + TLS; autenticación 🔵 backend |
| Buscador <1 s (materias, noticias o trámites) | 🟡 Buscador local instantáneo sobre mocks; búsqueda real 🔵 backend |
| Copias de seguridad automáticas | ✅ Documentado en plan de respaldos (infraestructura) |
| Dominio oficial `.com.ar` a nombre de la institución | 🔵 Pendiente Infra/Dirección |

## Checklist accionable

- [ ] `grupo_2_ux_ui.md` actualizado con ✅/🟡/🔵 (wireframes ✅, mapa V2 ✅, accesos 🟡, sistema visual 🔵).
- [ ] Resolver con Análisis/UX-UI la tensión de accesos de Home (7 vs 9) — **UX-A2** (hereda AF-A6).
- [ ] Agregar accesos directos Moodle/SIU/Inscripción al `Header` cuando haya URLs oficiales — **UX-A1** (RF-03/12/30).
- [ ] Formulario de consulta con validación en el footer — **UX-A3** (requiere `POST /api/contacto` backend).
- [ ] Definir paleta/tipografía/tokens — **UX-A9** para reemplazar la paleta provisional.
- [ ] Re-auditar cuando lleguen: Drive de Edith (contenidos), URLs oficiales, wireframes de alta fidelidad, Swagger de Backend.

## Referencias

- Fuente de análisis: `documentacion/frontend/analisis_funcional_validado.md` (validada 18/09/2026).
- Auditoría de análisis: `docs/06_audits/audit_2026-09-18-analisis-funcional.md` (v2, AF-A1…AF-A10).
- Auditoría de backend: `docs/06_audits/audit_2026-09-15-backend.md` (BE-A*).
- Artefactos UX/UI: `documentacion/driveFrontend/02_ux_ui/{DocumentaciónDisenoUX(V1).md, mapa_sitio_ifts12_(V2).md, wireframe/}`.