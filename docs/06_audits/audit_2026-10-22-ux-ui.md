# Auditoría semántica UX/UI — Frontend, Mantis y Figma v2

> Fecha: 2026-10-22.
> Alcance: Capa 4 — verificación semántica. No se audita solo que compile: se compara lo
> construido contra el contrato UX/UI vigente y contra los 27 tickets abiertos del cuadro
> Mantis del 21/10/2026, más los 4 tickets que no se resuelven en Figma.
>
> Fuente auditada: `inbox/IFTS12_Correcciones_UXUI_pendientes_Mantis.md` (revisión
> 21/10/2026), `docs/01_global/figma_v2_contrato_visual.md` (2026-10-13),
> `docs/01_global/correcciones_ux_ui_frontend.md` (B1–B9, I1–I12, M1–M7),
> `docs/01_global/plan_correcciones_uxui_frontend.md`,
> `documentacion/driveFrontend/02_ux_ui/grupo_2_ux_ui.md`,
> `documentacion/driveFrontend/02_ux_ui/mapa_sitio_ifts12_(V2).md` y
> `documentacion/frontend/analisis_funcional_validado.md` (2026-09-18).
>
> Código real leído en `src/` y verificado con `npm run lint`, `npm run build` y
> `npm run test` (226 tests, 29 archivos, en verde, 22/10/2026).
> `logsayer check` y `logsayer process check` dieron **sano con 1 aviso cada uno**
> (bandeja con 3 archivos sin ubicar; índice de Capa 1 desactualizado). No bloquean esta
> auditoría.
>
> Archivo del grupo a actualizar: `documentacion/driveFrontend/02_ux_ui/grupo_2_ux_ui.md`
> (no versionado; el bloque de actualización va al final de este informe).

## Veredicto en una línea

El sitio **no está roto**: los 226 tests pasan y la arquitectura es coherente. Pero hay
**tres divergencias altas que ningún check mecánico detecta**: el header volvió a mostrar un
ícono de cuenta que el ticket #0040 da por eliminado, el formulario de contacto no consume un
endpoint que sí existe y que está documentado, y el contrato de breakpoints tiene tres
versiones incompatibles (código, Figma y ticket). A eso se suman una grilla móvil de una
columna donde el ticket pide dos y un carrusel sin los controles que el propio ticket exige.

## 1. Resumen ejecutivo

Leyenda: ✅ cumple en el repositorio · 🟡 parcial o divergencia verificable · 🔵 bloqueado
por una dependencia externa · ⏳ no verificable en el repositorio (Figma, Mantis o
infraestructura).

| Estado | Tickets de Figma (27) | Tickets fuera de Figma (4) | Total |
|---|---:|---:|---:|
| ✅ | 10 | 2 | 12 |
| 🟡 | 14 | 0 | 14 |
| 🔵 | 1 | 0 | 1 |
| ⏳ | 2 | 2 | 4 |
| **Total** | **27** | **4** | **31** |

**Lectura por tipo**

| Tipo | Tickets | Qué significa |
|---|---|---|
| Contrato visual y responsive | #0009, #0037, #0041, #0043, #0045, #0046, #0047 | El código no coincide con las medidas, los breakpoints o los controles del Figma v2. |
| Contenido institucional pendiente | #0026, #0028, #0033, #0034, #0035, #0038, #0042 | La estructura está; falta el dato oficial o el archivo de alta resolución. |
| Funcionalidad y estados | #0023, #0024, #0025, #0029, #0030, #0031, #0032, #0036 | Hay implementación real, parcial o UI-only. |
| Gobernanza y artefactos | #0016, #0020, #0027, #0039, #0001, #0002, #0008 | Se cierran en Figma, Mantis o Infraestructura, no en `src/`. |

**Lo que sí está resuelto y conviene no reabrir**

- Buscador global con página de resultados, paginado y estado sin coincidencias (#0032).
- FAQ por segmentos con buscador y acordeón accesible (#0031).
- Ocho estados de interfaz definidos (#0030).
- Login de administración real contra `POST /api/auth/login` (#0023).
- Novedades con filtros por año, mes y categoría, paginado, detalle e historial (#0025).
- Docentes en una sola pantalla, con autoridades derivadas a Institucional (#0035).
- Pie a 12 px como mínimo tipográfico (#0038).

## 2. Método y límites

1. Se cruzaron los 27 tickets del cuadro Mantis con el código, no con la memoria del
   proyecto.
2. Se usó como fuente de verdad visual el Figma v2 (`MHBgrLD9g8ka6sX6ezkO1l`), no el
   Figma viejo "IFTS 12 PC".
3. Se respetó la regla de endpoints: `POST /api/contacto` **existe** y está documentado en
   `docs/04_user_stories/HU-01/hu_01_api.md:159`; no es un endpoint inventado. El hallazgo
   es que el frontend no lo consume.
4. Se midió el layout en Firefox a 1020 px de ancho. **No se pudo fijar 375 px ni 768 px**:
   la ventana del navegador disponible no baja de 1020 px. Por eso #0037, #0045 y #0046 se
   resuelven por clases CSS y por medición de componentes, no por captura a 375/768. Queda
   registrado como límite, no como aprobación.
5. No se ejecutó el backend. Los estados de error/servidor se verificaron por código y por
   los tests, no contra una API levantada.

## 3. Tabla completa: los 27 tickets de Figma

> La columna "Estado repo" mide lo que el frontend puede demostrar. No reemplaza el estado
> del ticket en Mantis ni el estado del frame en Figma.

| Ticket | Tema | Estado repo | Evidencia | Qué falta / dueño |
|---|---|---|---|---|
| **#0039** | Home única y frames renombrados | ⏳ | Una sola ruta de Home: `src/routes/AppRouter.tsx:23`; el resto cae en `*` (`:45`). Los frames no viven en el repo. | Declarar vigentes las páginas 04 y 05 del v2 y archivar "IFTS 12 – Tablet"/"Celular". Dueño: UX/UI. |
| **#0038** | Tipografía mínima del footer móvil | ✅ | `Footer.tsx:140,144` usan `text-xs` (12 px); datos oficiales en `Footer.tsx:8-11`. | Validar teléfonos y correo con fuente oficial. Dueño: Instituto/UX. |
| **#0040** | Quitar ícono de usuario y "Solicitar Tutoría" | 🟡 | El header público muestra `UserRound` y menú de cuenta: `Header.tsx:1,88-90`; `navegacion.ts:34-46`. Tutorías ya no solicita turnos: `TutoriasPage.tsx:95-130`. | Decidir la excepción del 20/10 y actualizar #0040/Figma. Dueño: Producto + UX/UI. |
| **#0037** | Footer superpuesto y buscador recortado en Tablet | ⏳ | A 1020 px no hay overflow horizontal (`scrollWidth = innerWidth = 1020`). 768 px no se pudo medir. | Medir 768/375 y corregir los frames Tablet. Dueño: UX/UI + Frontend. |
| **#0036** | Widget de calendario y 7 accesos | 🟡 | Hay 7 accesos en `mock-data.ts:197-240` y se renderizan en `HomePage.tsx:192`; el calendario es un enlace, no un widget. La lista no coincide con la del ticket. | Definir la lista oficial con Análisis y diseñar el widget sin fechas. Dueño: AF + UX/UI. |
| **#0035** | Docentes en una sola pantalla | ✅ | `DocentesPage.tsx:83,98,137` (concursos, cuerpo docente, repositorio); autoridades en `InstitucionalPage.tsx:108`. | Cargar nómina y PDFs oficiales. Dueño: Instituto. |
| **#0034** | Institucional según Mapa V2 | 🟡 | Estructura completa en `InstitucionalPage.tsx:10,27-43,180`; autoridades, bedelía y normativa en `PENDIENTE`. | Cargar datos verificados contra el Drive. Dueño: Instituto/UX. |
| **#0033** | Ingresantes y conexión con GCBA | 🟡 | Requisitos, fechas `PENDIENTE`, modalidad, equivalencias y pases en `IngresantesPage.tsx`; el CTA a GCBA queda oculto porque `ENLACES.inscripcion` está vacío (`:51,150-162`). | Confirmar URL oficial de inscripción. Dueño: Infra/Instituto. |
| **#0032** | Buscador global, resultados y sin coincidencias | ✅ | `BuscadorGlobal.tsx` en el header; `BusquedaPage.tsx:100,221,228` con resultados, paginado y estado sin coincidencias. Alcance local sobre carreras y novedades. | Cerrar alcance con AF (DB-04). Dueño: AF/Backend. |
| **#0031** | FAQ por segmentos | ✅ | `FaqPage.tsx` con tres segmentos, búsqueda y `FaqAcordeon.tsx:35-68`. La FAQ institucional solo aparece por búsqueda global. | Cargar respuestas oficiales. Dueño: Instituto. |
| **#0030** | Estados de interfaz globales | ✅ | `Estado.tsx:14-22,33-96`: loading, empty, error, success, sesión expirada, 403, imagen ausente y 404. | Aplicarlos en Tablet/Mobile. Dueño: UX/UI + Frontend. |
| **#0029** | Formulario de contacto con API | 🟡 | Validación local y éxito en `FormularioConsulta.tsx:72-80,218-241`; **no hay estados "enviando"/"fallo" ni llamada**. El endpoint existe y está documentado: `endpoints.ts:54`, `hu_01_api.md:159`. | Implementar servicio y estados. Dueño: Frontend. |
| **#0047** | Specs, tokens y breakpoints | 🟡 | El código usa los defaults de Tailwind: 640/1024/1280 (`NavMenu.tsx:16,24`; `MobileMenu.tsx:47`; `AccesosRapidos.tsx:10`). Figma define 768/1200; el ticket pide 768/1024. | Acordar un rango único y corregir Specs o ticket. Dueño: UX/UI + Frontend. |
| **#0046** | Área táctil mínima de 44×44 | 🟡 | Header y paginación cumplen (`Header.tsx:137`; `Paginacion.tsx:18`). No cumplen: carrusel 36×36 (`CarruselInstitucional.tsx:84,93`), puntos de 10 px (`:110`), ítems del menú de cuenta de 36 px (`Header.tsx:99-106`) y submit de 41 px medido en runtime (`FormularioConsulta.tsx:216`). | Llevar todos los controles a 44×44 con separación. Dueño: Frontend. |
| **#0045** | Accesos rápidos a dos columnas en móvil | 🟡 (no cumple en móvil) | `AccesosRapidos.tsx:10`: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`. Por debajo de 640 px hay **una** columna, no dos. | Grilla de 2 columnas y 1 por debajo de 360 px. Dueño: Frontend. |
| **#0044** | Set de íconos con etiquetas accesibles | 🟡 | Flechas y signos textuales: `AccesosRapidos.tsx:40,49`; `AccesosDestacados.tsx:30`; `CarruselInstitucional.tsx:86,95`; `FaqAcordeon.tsx:60`. El carrusel sí tiene `aria-label`; los "Ver más" son decorativos dentro de un enlace. | Reemplazar por Lucide y revisar aria-label. Dueño: Frontend. |
| **#0043** | Jerarquía, colores y márgenes de internas | ✅ | `EncabezadoPagina.tsx:28-40` y los mismos tokens/layout en las internas. La diferencia de H1 se trata en UX-A16, no como excepción de esta pantalla. | Unificar H1 con Figma. Dueño: Frontend/UX. |
| **#0042** | Ortografía, tildes y nombre oficial | ✅ | No se encontraron los errores de Tablet/Celular. El conteo sale del backend (`CarrerasPage.tsx:11-17`); queda un comentario "6 carreras" no renderizado en `CarreraDetallePage.tsx:108`. | Definir 5 vs 6 y nombres oficiales en Figma. Dueño: UX/UI. |
| **#0041** | Especificaciones del carrusel | 🟡 | No hay autoplay (correcto), pero tampoco pausa, "Slide 1 de 3" visible ni imágenes/alt; los controles son de 36 px (`CarruselInstitucional.tsx:50,84,93,110`). | Definir recorte, punto focal y controles. Dueño: UX/UI + Frontend. |
| **#0028** | Logos oficiales | 🟡 | Se usan `logoCABA.png`, `IFTS12.jpg` y `logoUpcn.png` (`Footer.tsx:73-75`), pero header y admin usan `apple-touch-icon.png` a 40 px (`Header.tsx:125`; `AdminLayout.tsx:22`). | Entregar logo IFTS en alta resolución. Dueño: UX/UI/Instituto. |
| **#0027** | Menú móvil y navegación en Tablet | ✅ | `MobileMenu.tsx:47-75`: 9 ítems, buscador, X, Esc y scroll-lock. En Tablet se resuelve con #0047. | Falta focus trap (UX-A20). Dueño: Frontend. |
| **#0026** | Ficha de carrera con correlatividades | 🟡 | La sección y la tabla existen, pero están vacías: `CarreraDetallePage.tsx:239-277`. No hay endpoint de correlatividades. | Backend y plan oficial. Dueño: Backend + Instituto. |
| **#0025** | Novedades: listado, filtros y detalle | ✅ | `NoticiasPage.tsx:41-99` (año, mes, categoría, paginado); `NotaCompletaPage.tsx` (detalle e historial). | Cargar novedades reales. Dueño: Backend/Instituto. |
| **#0024** | Prototipo del Panel Admin (CRUD) | 🟡 | Login real y panel con tabs/empty: `AdminPanelPage.tsx:37-60`; no hay listado, alta, edición ni baja. | Implementar CRUD cuando existan endpoints. Dueño: Frontend + Backend. |
| **#0023** | Login del Panel Admin | ✅ | `AdminLoginPage.tsx:52` consume `POST /api/auth/login`; Moodle queda como enlace externo. | Smoke con backend real. Dueño: Backend. |
| **#0016** | Coordinar definiciones con Backend | 🔵 | Los endpoints de escritura siguen sin existir: `hu_02_api.md:31-45`. | Registrar acuerdos y dudas en Mantis. Dueño: UX/UI + Backend. |
| **#0009** | Diseño responsive completo | 🟡 | Desktop y mobile están implementados, pero breakpoints y grilla móvil no coinciden (#0045/#0047). | Cerrar con Specs y prueba 375/768. Dueño: UX/UI + Frontend. |

### 3.1 Tickets que no se resuelven en Figma

| Ticket | Tema | Estado repo | Evidencia / lectura |
|---|---|---|---|
| **#0020** | Credenciales y SSH de Git Bash | ⏳ | Fuera del repositorio. Dueño: UX/UI + Infraestructura. |
| **#0002** | Actualización del ticket de tareas | ⏳ | Fuera del repositorio. El Desktop v2 cubre el punto 5; hay que actualizar Mantis. Dueño: UX/UI. |
| **#0001** | Diseño de pantallas | ✅ | Cubierto por el Figma v2 y el contrato visual. |
| **#0008** | Handoff de Figma | ✅ | Registrado en `docs/01_global/figma_v2_contrato_visual.md`; el v2 es la referencia vigente. |

## 4. Hallazgos UX-A11 a UX-A24

> Se continúa la numeración de la auditoría UX/UI del 21/09/2026 (UX-A1…UX-A10) para no
> pisar identificadores ya citados en el historial.

| ID | Severidad | Tipo | Hallazgo | Evidencia | Impacto | Criterio | Dueño |
|---|---|---|---|---|---|---|---|
| **UX-A11** | Alta | Contradicción de alcance | El header público muestra un ícono de persona y un menú de cuenta, aunque #0040 e I12 piden quitarlo. La excepción del 20/10 está documentada en una parte del estado y negada en otra. | `Header.tsx:1,88-90`; `navegacion.ts:34-46`; `project_state.md:102` vs `:407`. | La navegación sugiere una cuenta pública que no existe y el ticket #0040 no puede cerrarse. | #0040; I12. | Producto + UX/UI; Frontend según decisión. |
| **UX-A12** | Alta | Deuda funcional | El formulario de contacto valida y muestra "Consulta registrada", pero no envía nada: no hay servicio, ni estados "enviando"/"fallo", ni consumo de `POST /api/contacto`, que existe y está documentado. | `FormularioConsulta.tsx:72-80,218-241`; `endpoints.ts:54`; `hu_01_api.md:159`. | Se pierden consultas reales y se confirma un envío que no ocurrió. | I1; #0029. | Frontend; Backend para smoke. |
| **UX-A13** | Alta | Contrato responsive | Hay tres contratos de breakpoints: el código usa 640/1024/1280, el Figma v2 768/1200 y el ticket 768/1024. Entre 1024 y 1199 px se muestra el menú de escritorio, que el Figma considera Tablet. | `NavMenu.tsx:16,24`; `MobileMenu.tsx:47`; `AccesosRapidos.tsx:10`. | Layouts distintos según el ancho; #0047 y #0009 no pueden cerrarse. | M7; #0047. | UX/UI + Frontend. |
| **UX-A14** | Media | Contrato responsive | En móvil, los accesos rápidos quedan en una columna; el ticket pide dos (y una solo por debajo de 360 px). | `AccesosRapidos.tsx:10`. | Scroll innecesario y desvío del acuerdo M5. | M5; #0045. | Frontend. |
| **UX-A15** | Media | Accesibilidad táctil | Varios controles no llegan a 44×44: flechas del carrusel (36), puntos (10), ítems del menú de cuenta (36) y submit del formulario (41 medido en runtime). | `CarruselInstitucional.tsx:84,93,110`; `Header.tsx:99-106`; `FormularioConsulta.tsx:216`. | Dificultad de uso en móvil y desvío de #0046/M6. | M6; #0046. | Frontend. |
| **UX-A16** | Media | Contrato visual | El H1 global se renderiza a 36 px (`text-4xl`), no a los 48 px de escritorio ni 32 px de móvil que declara el Figma v2. El token `text-5xl` (48 px) está definido pero no se usa. El hero baja a 30/36 px. | `EncabezadoPagina.tsx:36`; `CarruselInstitucional.tsx:50`; `index.css:32-33`. | La jerarquía tipográfica no coincide con el handoff. | Fundaciones/Specs del v2. | Frontend + UX/UI. |
| **UX-A17** | Media | Componente incompleto | El carrusel no tiene botón Pausar, no muestra "Slide 1 de 3" visible (solo "1 / N" con `aria-hidden`) y no define imágenes ni texto alternativo; los controles son textuales. | `CarruselInstitucional.tsx:50,84,93,110`. | #0041 queda a mitad de camino y el componente no es reutilizable con imágenes. | M1; #0041. | UX/UI + Frontend. |
| **UX-A18** | Media | Iconografía | Persisten flechas y signos de texto (`→`, `‹`, `›`, `+`, `−`) en tarjetas, carrusel y acordeón, contra el set Lucide del v2. | `AccesosRapidos.tsx:40,49`; `AccesosDestacados.tsx:30`; `CarruselInstitucional.tsx:86,95`; `FaqAcordeon.tsx:60`. | Inconsistencia visual y controles que dependen de la fuente. | M4; #0044. | Frontend. |
| **UX-A19** | Media | Marca | Header y admin usan `apple-touch-icon.png` como logo del IFTS a 40 px; el footer usa `IFTS12.jpg`. No hay isologo institucional en alta resolución. | `Header.tsx:125`; `AdminLayout.tsx:22`; `Footer.tsx:73-75`. | Marca pixelada o recortada en el primer punto de contacto. | B8; #0028. | UX/UI + Instituto. |
| **UX-A20** | Media | Accesibilidad | El menú móvil cierra con Esc y bloquea el scroll, pero no atrapa el foco ni lo devuelve al disparador. El menú de cuenta tampoco gestiona foco. | `MobileMenu.tsx:17-38`; `Header.tsx:80-108`. | El foco puede irse al contenido de atrás; desvío de Specs 07. | Specs 07 del Figma v2. | Frontend. |
| **UX-A21** | Media | Documentación desactualizada | `docs/02_technical/estado_implementacion.md` sigue describiendo 6 mocks, 11 accesos, "Comunidad" y ausencia de API real. El código ya consume carreras, novedades y login. | `estado_implementacion.md:5,21,80,85,87,102` vs `src/api/services/`. | Quien lea ese documento toma decisiones con un estado que ya no existe. | Capa 2/4. | Documentación. |
| **UX-A22** | Baja | Documentación contradictoria | `project_state.md` dice 225 tests y el comando actual da 226; además se contradice sobre el ícono de persona (ver UX-A11). | `project_state.md:486`; salida de `npm run test` del 22/10/2026. | Pérdida de confianza en el snapshot. | Capa 2. | Documentación. |
| **UX-A23** | Baja | Navegación | El footer no incluye "Preguntas frecuentes" en `NAV_FOOTER_MAPA`, aunque la página existe y la DB-13 sigue abierta. | `navegacion.ts:49-56`; `FaqPage.tsx`. | FAQ queda alcanzable solo por búsqueda o URL directa. | DB-13; Mapa V2. | UX/UI + Frontend. |
| **UX-A24** | Baja | Contrato visual | El botón primario usa `acento-600` (#2563EB), no el token `acento-700` (#1D4ED8) que declara el contrato; la paleta sigue marcada `PROVISIONAL`. | `index.css:9,58-59`; `Button.tsx:23`; `FormularioConsulta.tsx:216`. | Diferencia de color en el CTA principal y deuda B9/M7. | B9; M7. | UX/UI + Frontend. |

## 5. Inconsistencias documentación ↔ código

| Documento | Lo que dice | Lo que hace el código | Lectura |
|---|---|---|---|
| `docs/project_state.md:102` | El acceso al panel es un menú de cuenta con ícono de persona. | Es exactamente eso (`Header.tsx:88-90`). | Coincide con el código, pero contradice #0040 e I12. |
| `docs/project_state.md:407` | "sin ícono de persona (I12)". | El header muestra `UserRound`. | Contradicción interna del mismo snapshot. |
| `docs/project_state.md:486` | 225 tests. | 226 tests en 29 archivos (22/10/2026). | Snapshot desactualizado. |
| `docs/02_technical/estado_implementacion.md:21,80,85,87,102` | Home con mocks, 6 carreras, 11 accesos, "Comunidad", sin API real. | Home consume carreras/novedades; 7 accesos; `Comunidad` eliminada; login real. | Documento de septiembre: no debe usarse como estado vigente. |
| `src/components/ui/FormularioConsulta.tsx:232,239` | "El envío real estará disponible cuando el backend habilite el canal oficial". | `POST /api/contacto` ya existe y está documentado. | El comentario y el mensaje de éxito quedaron viejos: el bloqueo es del frontend, no del backend. |
| `src/pages/CarreraDetallePage.tsx:108` | "Plantilla común para las 6 carreras". | La cantidad sale del backend; la base real tiene 3 carreras. | Comentario no renderizado, pero alimenta la confusión 5/6 de #0042. |
| `documentacion/driveFrontend/02_ux_ui/grupo_2_ux_ui.md` (§7 y §9) | El footer no tiene formulario (UX-A3) y los estados de UI siguen pendientes. | `Footer.tsx:125` monta `FormularioConsulta`; `Estado.tsx:14-22` define 8 estados. | El documento del grupo quedó desactualizado: se corrige con el bloque final. |
| `docs/project_state.md:464` | 7 accesos confirmados y 5–6 carreras según pantalla. | 7 accesos en `mockAccesosRapidos`; carreras dinámicas. | Coherente con el código; la tensión 7 vs. lista del ticket sigue abierta. |

## 6. Qué reabrir o actualizar en Mantis

| Ticket | Acción | Dueño | Criterio de cierre |
|---|---|---|---|
| **#0039** | Reabrir: en Tablet/Celular siguen conviviendo Homes viejas. Declarar vigentes las páginas 04/05 del v2 o archivar los dos archivos. | UX/UI | Un frame vigente por tamaño; el resto en Archivo. |
| **#0040** | Reabrir o actualizar: el código muestra ícono de persona por una excepción del 20/10 que no está en Figma. | Producto + UX/UI | Decisión escrita: se quita el ícono o se aprueba la excepción y se actualiza el frame. |
| **#0047** | Acordar el corte de breakpoints (tablet desde 768; escritorio desde 1024 o 1200) y asentarlo en Specs y en el ticket. | UX/UI + Frontend | Un breakpoint documentado y usado por ambos. |
| **#0036** | Definir la lista oficial de 7 accesos (la del ticket y la del Figma no coinciden) y el widget de calendario. | AF + UX/UI | Lista aprobada y widget sin fechas inventadas. |
| **#0029** | Reasignar al frontend: el endpoint existe; falta el consumo y los estados. | Frontend | Formulario con enviando/éxito/fallo contra `POST /api/contacto`. |
| **#0042** | Definir 5 o 6 carreras y los nombres oficiales; corregir el comentario "6 carreras". | UX/UI + Instituto | Copy único y nombres validados. |
| **#0016** | Agregar notas de los acuerdos con Backend y los endpoints que faltan. | UX/UI + Backend | Tabla de acuerdos y pendientes en el ticket. |
| **#0002** | Actualizar el punto 5: el Desktop v2 ya cubre responsive, guía de estilos y estados. | UX/UI | Ticket en estado coherente con el v2. |
| **#0009** | Cerrar solo después de unificar Tablet/Celular con el v2 y probar 375/768. | UX/UI + Frontend | Tres anchos verificados. |
| **#0038** | Validar teléfonos y correo; el mínimo de 12 px ya está. | Instituto | Datos con fuente oficial o PENDIENTE explícito. |
| **#0028** | Pedir el logo IFTS en alta resolución y reemplazar el `apple-touch-icon` del header. | UX/UI + Instituto | Archivo oficial en header, footer y admin. |
| **#0026** | Abrir dependencia de Backend/datos para correlatividades. | Backend + Instituto | Tabla con datos o estado vacío aprobado. |
| **#0024** | Mantener UI-only hasta que existan endpoints de escritura. | Frontend + Backend | CRUD contra API o alcance recortado. |

## 7. Figma vs. código: qué puede resolver cada uno

### 7.1 Lo que el código no puede resolver (Figma, Mantis o Instituto)

| Ticket | Qué falta | Por qué no se arregla en `src/` |
|---|---|---|
| #0039 | Frames viejos y Homes duplicadas en Tablet/Celular. | Es un artefacto de Figma. |
| #0009 | Archivos Tablet/Celular desactualizados. | ídem. |
| #0027 | Estado abierto/cerrado del menú en Tablet. | El código ya tiene menú móvil; falta el frame. |
| #0030 | Estados para Tablet/Celular. | El código ya tiene 8 estados; falta el diseño por tamaño. |
| #0037 | Overflow en frames Tablet. | El repo no reproduce los frames; hay que medirlos en Figma. |
| #0041 | Recorte y punto focal por tamaño. | Es una definición de diseño. |
| #0047 | Rango único de breakpoints. | Requiere acuerdo UX/UI–Frontend. |
| #0028 | Logo IFTS en alta resolución. | Es un activo institucional. |
| #0034 | Autoridades, bedelía y normativa. | Son datos oficiales. |
| #0036 | Lista oficial de 7 accesos. | Es una decisión de Análisis Funcional. |
| #0016 | Acuerdos con Backend. | Es gobernanza, no código. |
| #0020 | Credenciales y SSH. | Es infraestructura. |
| #0002 | Estado del ticket. | Es Mantis. |

### 7.2 Lo que el Frontend puede resolver en código

| Ticket | Acción concreta | Archivo |
|---|---|---|
| #0040 | Quitar `UserRound` y el menú de cuenta, o implementar la excepción aprobada. | `Header.tsx`, `navegacion.ts` |
| #0029 | Crear `contacto.service.ts`, estados `enviando/error` y consumir `POST /api/contacto`. | `src/api/services/`, `FormularioConsulta.tsx` |
| #0045 | Cambiar la grilla móvil a 2 columnas y 1 por debajo de 360 px. | `AccesosRapidos.tsx` |
| #0046 | Subir a 44×44 flechas, puntos, ítems de cuenta y submit. | `CarruselInstitucional.tsx`, `Header.tsx`, `FormularioConsulta.tsx` |
| #0044 | Reemplazar `→`, `‹`, `›`, `+`, `−` por Lucide y revisar `aria-label`. | `AccesosRapidos.tsx`, `AccesosDestacados.tsx`, `CarruselInstitucional.tsx`, `FaqAcordeon.tsx` |
| #0041 | Agregar pausa, contador visible y contrato de imagen/alt. | `CarruselInstitucional.tsx` |
| #0028 | Usar el logo oficial en header y admin cuando UX/UI lo entregue. | `Header.tsx`, `AdminLayout.tsx` |
| #0026 | Mantener el estado vacío y preparar el tipo para correlatividades. | `CarreraDetallePage.tsx`, `types/` |
| #0024 | Completar el CRUD cuando Backend exponga los endpoints. | `AdminPanelPage.tsx` |
| #0042 | Quitar el comentario "6 carreras" y dejar el conteo 100 % dinámico. | `CarreraDetallePage.tsx` |
| #0038 | Mantener 12 px y separar enlaces táctiles. | `Footer.tsx` |
| #0043 | Unificar H1 con el token de 48/32 px (UX-A16). | `EncabezadoPagina.tsx`, `index.css` |
| #0035 | Ya está: una sola pantalla y autoridades en Institucional. | — |
| #0033 | Ya está la estructura; el CTA se activa solo con URL oficial. | `IngresantesPage.tsx`, `enlaces.ts` |
| #0032 | Ya está el flujo; el alcance global depende de AF/Backend. | `BuscadorGlobal.tsx`, `BusquedaPage.tsx` |
| #0031 | Ya está; faltan respuestas oficiales. | `FaqPage.tsx` |
| #0025 | Ya está; faltan novedades reales. | `NoticiasPage.tsx`, `NotaCompletaPage.tsx` |
| #0023 | Ya está; falta smoke con backend. | `AdminLoginPage.tsx` |

## 8. Mapeo con las correcciones B / I / M

| Corrección | Ticket(s) | Estado repo |
|---|---|---|
| B1 Login de administrador | #0023 | ✅ |
| B2 Panel de administración | #0024 | 🟡 UI-only |
| B3 Estudiantes institucionales / Comunidad | #0039 | ✅ Comunidad eliminada; frames viejos ⏳ |
| B4 Novedades | #0025 | ✅ |
| B5 Ficha de carrera | #0026 | 🟡 estructura, datos pendientes |
| B6 Menú móvil | #0027 | ✅ (focus trap en UX-A20) |
| B7 Datos institucionales y carreras | #0034, #0042 | 🟡 |
| B8 Logos oficiales | #0028 | 🟡 |
| B9 Estilos y componentes | #0043 | ✅ con deuda de H1/acento |
| I1 Formulario de contacto | #0029 | 🟡 |
| I2 Estados de interfaz | #0030 | ✅ |
| I3 FAQ por segmentos | #0031 | ✅ |
| I4 Buscador | #0032 | ✅ local |
| I5 Ingresantes | #0033 | 🟡 |
| I6 Institucional | #0034 | 🟡 |
| I7 Docentes | #0035 | ✅ |
| I8 Calendario y accesos | #0036 | 🟡 |
| I9 Superposiciones y recortes | #0037 | ⏳ |
| I10 Pie móvil legible | #0038 | ✅ |
| I11 Una Home de referencia | #0039 | ⏳ |
| I12 Acciones fuera de alcance | #0040 | 🟡 |
| M1 Carrusel y fotos | #0041 | 🟡 |
| M2 Textos y ortografía | #0042 | ✅ |
| M3 Lenguaje visual | #0043 | ✅ |
| M4 Iconos | #0044 | 🟡 |
| M5 Accesos móviles | #0045 | 🟡 |
| M6 Zonas táctiles | #0046 | 🟡 |
| M7 Especificaciones responsive | #0047 | 🟡 |

## 9. Checklist de cierre

- [ ] Resolver #0040: quitar el ícono de persona o aprobar la excepción y actualizar Figma/Mantis.
- [ ] Implementar el consumo de `POST /api/contacto` con estados enviando/éxito/fallo (#0029, UX-A12).
- [ ] Acordar el rango único de breakpoints y aplicarlo en código y Specs (#0047, UX-A13).
- [ ] Llevar la grilla móvil de accesos rápidos a 2 columnas (#0045, UX-A14).
- [ ] Llevar carrusel, menú de cuenta y submit a 44×44 (#0046, UX-A15).
- [ ] Corregir H1 a 48/32 y decidir el token de acento primario (UX-A16, UX-A24).
- [ ] Completar el carrusel con pausa, contador visible e imágenes/alt (#0041, UX-A17).
- [ ] Reemplazar los glifos textuales por Lucide (#0044, UX-A18).
- [ ] Reemplazar `apple-touch-icon` e `IFTS12.jpg` por el logo oficial de alta resolución (#0028, UX-A19).
- [ ] Agregar focus trap al menú móvil y al menú de cuenta (UX-A20).
- [ ] Actualizar `estado_implementacion.md`, `project_state.md` (225 → 226) y el bloque de FAQ del footer (UX-A21, UX-A22, UX-A23).
- [ ] Reauditar con capturas a 375, 768 y 1440 px cuando el entorno permita fijar esos anchos.

## 10. Referencias

IFTS N.º 12. (2026, 21 de octubre). *Correcciones pendientes en Figma según Mantis* [Documento de trabajo, revisión 21/10/2026]. `inbox/IFTS12_Correcciones_UXUI_pendientes_Mantis.md`.

IFTS N.º 12. (2026, 13 de octubre). *Figma v2 — contrato visual de referencia*. `docs/01_global/figma_v2_contrato_visual.md`.

IFTS N.º 12. (2026, 8 de octubre). *Correcciones UX/UI del frontend: B1–B9, I1–I12 y M1–M7*. `docs/01_global/correcciones_ux_ui_frontend.md`.

IFTS N.º 12. (2026). *Plan de correcciones UX/UI del frontend*. `docs/01_global/plan_correcciones_uxui_frontend.md`.

IFTS N.º 12. (2026, 15 de septiembre). *Mapa del sitio IFTS N.º 12 — V2*. `documentacion/driveFrontend/02_ux_ui/mapa_sitio_ifts12_(V2).md`.

IFTS N.º 12. (2026, 18 de septiembre). *Análisis funcional validado*. `documentacion/frontend/analisis_funcional_validado.md`.

IFTS N.º 12. (2026). *Estado actual del proyecto* [Snapshot de Capa 2]. `docs/project_state.md`.

IFTS N.º 12. (2026, 30 de septiembre). *Estado de implementación*. `docs/02_technical/estado_implementacion.md`.

IFTS N.º 12. (2026). *HU-01 — Contrato de API*. `docs/04_user_stories/HU-01/hu_01_api.md`.

IFTS N.º 12. (2026). *HU-02 — Contrato de API*. `docs/04_user_stories/HU-02/hu_02_api.md`.

IFTS N.º 12. (2026). *Código fuente del frontend* [Repositorio `web_ifts12_frontend`]. `src/`.

## Actualización para `grupo_2_ux_ui.md`

> Copiar el bloque siguiente al final de
> `documentacion/driveFrontend/02_ux_ui/grupo_2_ux_ui.md`. No se commitea: ese directorio
> está en `.gitignore`.

### Actualización 22/10/2026 — Auditoría Mantis UX/UI

Se cruzaron los 27 tickets UX/UI del cuadro Mantis (revisión 21/10/2026) y los 4 tickets que
no se resuelven en Figma contra el código real y el Figma v2. Informe completo:
`docs/06_audits/audit_2026-10-22-ux-ui.md`.

Esta actualización corrige las filas de §7 y §9 que seguían marcando el formulario del pie y
los estados de interfaz como pendientes: el formulario existe (validación local, sin API) y
`Estado.tsx` ya define 8 estados.

| Estado | Tickets |
|---|---|
| ✅ Cumple en el repo | #0038, #0035, #0032, #0031, #0030, #0043, #0042, #0027, #0025, #0023, #0001, #0008 |
| 🟡 Parcial / divergencia | #0040, #0036, #0034, #0033, #0029, #0047, #0046, #0045, #0044, #0041, #0028, #0026, #0024, #0009 |
| 🔵 Bloqueado | #0016 |
| ⏳ No verificable en el repo | #0039, #0037, #0020, #0002 |

**Tres decisiones que no pueden seguir abiertas**

1. **#0040 / I12:** el header muestra ícono de persona por una excepción del 20/10 que no
   está en Figma. Hay que quitarlo o aprobar la excepción y actualizar el frame y Mantis.
2. **#0029 / I1:** el formulario de contacto no consume `POST /api/contacto`, que ya existe
   y está documentado. El mensaje "Consulta registrada" no tiene envío detrás.
3. **#0047 / M7:** código, Figma y ticket usan tres rangos de breakpoints distintos. Hay que
   acordar el corte (tablet desde 768 y escritorio desde 1024 o 1200) y aplicarlo en los tres
   lados.

**Deuda de accesibilidad y contrato visual:** grilla móvil de 1 columna donde se piden 2
(#0045), controles de carrusel/menú por debajo de 44×44 (#0046), H1 de 36 px en lugar de
48/32 (UX-A16) y carrusel sin pausa, contador visible ni alt (#0041).

**Contenido institucional pendiente:** autoridades y bedelía (#0034), URL de inscripción
GCBA (#0033), correlatividades (#0026), logo IFTS en alta resolución (#0028) y respuestas
oficiales de FAQ/contacto.

**Documentación:** `docs/02_technical/estado_implementacion.md` sigue describiendo un estado
de septiembre (6 mocks, 11 accesos, "Comunidad", sin API real). `docs/project_state.md`
contradice el ícono de persona y dice 225 tests cuando hay 226.

## Reconciliación con la auditoría de contrato de API (22/10/2026)

Esta auditoría y la de contrato de API (`audit_2026-10-22-backend.md`) se contradicen en tres
puntos. La decisión del 22/10/2026 es que **el apispec manda** sobre `hu_01_api.md` y
`hu_02_api.md` mientras el recurso no figure en el contrato:

| Tema | Auditoría de API | Esta auditoría | Resolución |
|---|---|---|---|
| Contacto | Fuera del apispec → aislar | #0029 pide implementar `POST /api/contacto` | **Aislar.** Se corrige igual el éxito falso. |
| Auth | Fuera del apispec → aislar | #0023 lo da por resuelto | **Aislar.** El código queda detrás de un flag. |
| Novedades | Fuera del apispec → aislar | #0025 lo da por resuelto | **Aislar.** |

Consecuencias para Mantis: #0029 y #0023 se reasignan a Backend mientras el recurso no esté
en el apispec; #0040 y #0047 se cierran con decisión de UX/UI (ver el plan de trabajo
`inbox/plan_aislamiento_apispec_2026-10-22.md`, §13).

Plan de trabajo derivado: 13 tareas, una rama por tarea. Orden completo en
`inbox/plan_aislamiento_apispec_2026-10-22.md`, §13 y §14.

IFTS N.º 12. (2026, 22 de octubre). *Auditoría de contrato de API — apispec OpenAPI vs.
frontend*. `docs/06_audits/audit_2026-10-22-backend.md`.

IFTS N.º 12. (2026, 22 de octubre). *Plan de aislamiento de superficies fuera del contrato de
API y unificación de estados de carga*. `inbox/plan_aislamiento_apispec_2026-10-22.md`.
