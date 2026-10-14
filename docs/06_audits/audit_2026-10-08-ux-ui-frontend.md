# Auditoría UX/UI vs Código

**Fecha:** 2026-10-08  
**Origen de la especificación:** `docs/01_global/correcciones_ux_ui_frontend.md` (08/10/2026)  
**Alcance:** B1–B9 (bloqueantes), I1–I12 (importantes), M1–M7 (mejoras)  
**Tipo de auditoría:** Verificación semántica (Capa 4) — Solo lectura  
**Estado:** Informe de auditoría

## Resumen

La especificación de correcciones UX/UI fue comparada contra el estado real del código del frontend (React + Vite + TypeScript). Del total de 28 ítems auditados, se obtuvo el siguiente resultado:

| Marca | Cantidad | Porcentaje | IDs |
|---|---|---|---|
| ✅ CUMPLE | 6 | 21,4 % | B4, B6, B8, I4, I12, M2 |
| 🟡 PARCIAL | 17 | 60,7 % | B3, B5, B7, B9, I1, I2, I3, I5, I6, I7, I8, I10, M1, M3, M4, M5, M6 |
| 🔵 NO CUMPLE | 2 | 7,1 % | B1, B2 |
| ⏳ DEPENDENCIA EXTERNA | 3 | 10,7 % | I9, I11, M7 |
| **Total** | **28** | **100 %** | — |

## 1. Correcciones bloqueantes (B1–B9)

| ID | Estado | Evidencia (ruta:línea) | Hallazgo vs. criterio de aceptación | Falta |
|---|---|---|---|---|
| **B1** | 🔵 NO CUMPLE | `src/routes/AppRouter.tsx:18–31`, `src/routes/ProtectedRoute.tsx:5–11`, `src/contexts/AuthContext.tsx` | No existe pantalla de login administrativo ni ruta `/login`/`/admin`. El enlace a Moodle está presente como externo en header/footer, pero no hay flujo de panel de administración. | Crear `LoginPage`, definir ruta de login administrativo y flujo de acceso al panel (requiere contrato de auth). |
| **B2** | 🔵 NO CUMPLE | Sin páginas/componentes de admin en `src/pages/` (grep sin resultados para `admin`/panel CRUD). | No existen pantallas de listado/alta/edición/baja para Noticias/Carrusel. No hay patrón reutilizable de CRUD. | Diseños UX + endpoints CRUD confirmados. Luego scaffolding del panel de administración. |
| **B3** | 🟡 PARCIAL | `src/pages/EstudiantesPage.tsx:7–48` (estructura acorde a Mapa V2). `src/constants/mock-data.ts:247–252` (bloque `mockComunidades`). Render vía `src/components/home/Comunidades.tsx` en `HomePage`. | La sección Estudiantes está alineada con regularidad/constancias/mesas/calendario/becas/boleto/títulos/traspasos/FAQ. Persiste el bloque "Comunidad de alumnos" en Home, lo cual contradice lo solicitado (quitar perfiles/grupos sociales sin respaldo). | Retirar o renombrar el bloque `Comunidades` de Home según Mapa del Sitio V2. |
| **B4** | ✅ CUMPLE | `src/pages/NoticiasPage.tsx:16–96`, `src/pages/NotaCompletaPage.tsx:52–105`, `src/components/noticias/CardNoticia.tsx:10–12` | Listado ordenado, búsqueda local, detalle con breadcrumb/regreso, tarjeta con variantes con/sin imagen. | Validar comportamiento en PC/tablet/celular con frames UX (visual). |
| **B5** | 🟡 PARCIAL | `src/pages/CarreraDetallePage.tsx:93–114`, `src/pages/CarrerasPage.tsx:52–67` | Estructura base existe. Se aclara que backend no expone horarios. Falta plantilla completa con bloques oficiales (horario/turno, docentes, descargas, plan) y **correlatividades representadas como tabla/estructura de datos legible** (no imagen). | Completar bloques de ficha con placeholders identificados como "pendiente". Agregar tabla de correlatividades cuando exista estructura definida. |
| **B6** | ✅ CUMPLE | `src/components/layout/Header.tsx:8,55–93`, `src/components/layout/NavMenu.tsx:10–32` | Menú móvil con estado abierto/cerrado, `aria-expanded`/`aria-controls`, cierre al navegar. Opciones alcanzables. | Opcional: focus-trap y cierre con `Escape`. Validación responsive con UX. |
| **B7** | 🟡 PARCIAL | `src/pages/CarrerasPage.tsx:8`, `HomePage` (usan API real vía `useCarreras`). `src/pages/IngresantesPage.tsx:5,76` (usa `mockCarreras` de `mock-data.ts:17–61`). `src/pages/InstitucionalPage.tsx:4–34` (sin bloque de autoridades). | Divergencia activa entre páginas: Ingresantes muestra carreras de mocks (incluye ítems sin respaldo) mientras Carreras/Home muestran las 3 carreras reales del backend. Además falta bloque de autoridades/cargos con fuente verificable. | **Unificar `IngresantesPage` con `useCarreras()`**. Separar datos confirmados vs. pendientes institucionales (autoridades). No inventar carreras ni autoridades. |
| **B8** | ✅ CUMPLE | `src/components/layout/Header.tsx:43–48`, `src/components/layout/Footer.tsx:72–76,128–136`, `src/pages/InstitucionalPage.tsx:41–45`. Assets en `public/`: `IFTS12.jpg`, `logoCABA.png`, `logoUpcn.png` | Se usan archivos oficiales presentes en `public/`. No hay recreaciones SVG/escudo generado en `src/`. | Confirmar con UX que son las versiones exactas del Drive (origen/resolución). Reemplazar si difieren. |
| **B9** | 🟡 PARCIAL | `src/components/ui/Button.tsx`, `CardNoticia`, `CardCarrera`, `FaqAcordeon`, `AccesosRapidos`, `Header`, `Footer`, `FormularioConsulta.tsx:133–145`. `src/styles/index.css:5–13` (tokens de color). | Base de componentes reutilizables existe. Faltan escala de tipografía/espaciado (tokens), variantes (input/error/foco/deshabilitado) y unificación: varios botones nativos no usan `Button`. | Completar tokens en `@theme`. Unificar uso de `Button` en formularios. Documentar variantes responsive. |

## 2. Correcciones importantes (I1–I12)

| ID | Estado | Evidencia (ruta:línea) | Hallazgo vs. criterio de aceptación | Falta |
|---|---|---|---|---|
| **I1** | 🟡 PARCIAL | `src/components/contacto/FormularioConsulta.tsx:24–52,148–156` | Validación client-side, `noValidate`, errores con `role="alert"`, mensaje de éxito honesto (indica que el envío real depende del backend). | Agregar estados `enviando`/`fallo`. Conectar a `/api/contacto` cuando se confirme alcance. Aclarar qué confirma la respuesta real. |
| **I2** | 🟡 PARCIAL | `src/components/common/AvisoCarga.tsx`, `AvisoError.tsx` (con reintento), vacíos (`CarrerasPage.tsx:32–35`, `NoticiasPage.tsx:87–93`), `PaginaNoEncontrada.tsx` (404), imagen ausente (`CardNoticia.tsx:10`), `aria-disabled` donde aplica. | Estados cargando/vacío/fallo/404/imagen ausente/validación presentes. | Faltan `sesión expirada`, `sin permisos`. Documentar estados por componente/disparador. |
| **I3** | 🟡 PARCIAL | `src/pages/IngresantesPage.tsx:7`, `EstudiantesPage.tsx:5`, `DocentesPage.tsx:4` (filtrado por categoría). `src/pages/FaqPage.tsx:21` (muestra todos los `mockFaqs`). | Filtrado existe por página de segmento, pero `/faq` no tiene UI para filtrar/navegar por segmentos (ingresantes/estudiantes/docentes). | Agregar filtro por segmento en `FaqPage`. Usar preguntas/respuestas oficiales cuando estén disponibles. |
| **I4** | ✅ CUMPLE | `src/components/layout/BuscadorGlobal.tsx:20–23,73–74` | Indexa carreras y novedades reales. Muestra estado "Sin resultados". | Registrar dependencia de alcance con Análisis Funcional. Validar adaptación en 3 tamaños. |
| **I5** | 🟡 PARCIAL | `src/pages/IngresantesPage.tsx:40–121` | Estructura completa (inscripción, carreras, modalidad/horarios/equivalencias, pases, FAQ). | Fechas como estructura pendiente (sin inventar). Migrar carreras a `useCarreras()` (coincidir con API real). |
| **I6** | 🟡 PARCIAL | `src/pages/InstitucionalPage.tsx:4–39` | Historia, misión/visión, bedelía, reglamento, convivencia, enlaces de interés. | Agregar autoridades/cargos, normativa descargable. Separar confirmados vs. dudas abiertas. Datos con fuente oficial. |
| **I7** | 🟡 PARCIAL | `src/pages/DocentesPage.tsx:6–32` | Una sola referencia de pantalla. Secciones: información general, docentes por carrera, concursos, normativas, documentación, FAQ. | Completar con contenido real cuando exista (concursos/docentes). Traslado de autoridades a Institucional según revisión UX. |
| **I8** | 🟡 PARCIAL | `src/pages/EstudiantesPage.tsx:116–127` (calendario como placeholder). Accesos en `mock-data.ts:200–237` | Estructura presente. | Componente de calendario real cuando haya datos (sin inventar fechas). Cerrar tensión AF-A6 (7 vs 9 accesos). |
| **I9** | ⏳ DEPENDENCIA EXTERNA | No verificable en código estático. | Superposiciones/recortes (footer sobre FAQ en PC, buscador cortado en tablet) son visuales. | Validación en frames UX + comprobación en navegador (TEST). No resoluble solo con lectura de código. |
| **I10** | 🟡 PARCIAL | `src/components/layout/Footer.tsx:21,30,85–88`. `src/pages/ContactoPage.tsx:56–58` | Pie legible (≥12 px). Enlaces funcionales/atenuados. | Correo institucional pendiente de confirmación (IFTS). Validar lectura real con UX. No rellenar con dato inventado. |
| **I11** | ⏳ DEPENDENCIA EXTERNA | Código tiene una sola `HomePage.tsx`. | Unificación de Home de referencia (elegir frame vigente, renombrar frames según sitemap) es decisión de UX/Figma. | UX define frame único de referencia. Código ya mantiene una única Home. |
| **I12** | ✅ CUMPLE | `src/components/layout/Header.tsx` (sin ícono de persona). `src/pages/TutoriasPage.tsx` (informativa). Grep sin `Solicitar Tutoría`/icono persona. | Se quitó lo fuera de alcance. No sugiere funciones no implementables (reserva de turnos/cuentas sociales). | Mantener este criterio. |

## 3. Mejoras y especificaciones (M1–M7)

| ID | Estado | Evidencia (ruta:línea) | Hallazgo vs. criterio de aceptación | Falta |
|---|---|---|---|---|
| **M1** | 🟡 PARCIAL | `src/components/home/CarruselInstitucional.tsx:19–116`, `src/pages/HomePage.tsx:54–62` | Controles ‹ ›, puntos, sin autoplay, `aria-label`/`aria-live`, accesible. | Incorporar fotos institucionales (con `alt`, proporción, recorte, punto focal). Definir comportamiento con 1+ slides cuando haya assets. |
| **M2** | ✅ CUMPLE | Grep sin `ITFS`, `A trves`, `Regalamento`, `¡Ha olvidado`. `Footer.tsx:12` usa "IFTS N.º 12". Carreras con "Tecnicatura Superior en...". | Ortografía y nombre consistentes en `src/`. | Validación del nombre oficial con AF/Edith (dependencia institucional). |
| **M3** | 🟡 PARCIAL | Header internos `bg-slate-50`, cards y componentes reutilizados en páginas internas. | Se busca unificar páginas internas con Home vigente. | Derivar reglas de lenguaje visual del frame Home y documentarlas (tokens/espaciados). |
| **M4** | 🟡 PARCIAL | Hamburguesa SVG (`Header.tsx:63–75`), flechas/puntos (`CarruselInstitucional.tsx:77,86,95–105`), +/− (`FaqAcordeon.tsx:48`). Con `aria-label`/`aria-hidden`. | Iconografía funcional y accesible. Algunos usos son soluciones puntuales. | Acordar set de iconos con UX. Mantener etiquetas accesibles. |
| **M5** | 🟡 PARCIAL | `src/components/home/AccesosRapidos.tsx:10` → `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` | En móvil (< 640 px) queda **1 columna**, no 2 (propuesta del informe). | Probar propuesta de 2 columnas con textos reales, coordinado con UX (evitar romper títulos/controles). |
| **M6** | 🟡 PARCIAL | Hamburguesa `p-2` + ícono `h-6 w-6` (~40×40 px efectivo) (`Header.tsx:60–65`). Botones carrusel `h-9 w-9` (36×36 px) (`CarruselInstitucional.tsx:75,84`). | Áreas táctiles cercanas al objetivo. No alcanzan **44×44 px** recomendado. | Agrandar área interactiva a 44×44 px (padding/size), manteniendo dibujo del ícono. Verificar separación y foco. |
| **M7** | ⏳ DEPENDENCIA EXTERNA | `src/styles/index.css` sin breakpoints/medidas documentadas como Specs. | Página "Specs" (anchos, breakpoints acordados, contenedor, columnas, espaciados) corresponde a Figma/documentación UX. | UX publica Specs. Front alinea a Tailwind/breakpoints acordados. |

## 4. Brechas que el Frontend SÍ puede resolver en código (orden sugerido)

1. **B7 + I5 — Unificar `IngresantesPage` con `useCarreras()`** (1 archivo). Elimina contradicción entre mocks y API real.
2. **B3 — Quitar bloque "Comunidad de alumnos" de Home** (`mockComunidades` + `Comunidades.tsx` render). Alinea con Mapa V2.
3. **B5 — Plantilla de ficha de carrera + tabla de correlatividades.** Estructura bloques con placeholders claros ("pendiente de definir por UX/Institucional").
4. **B9 — Completar tokens + unificar `Button`.** Escala tipográfica/espaciado en `@theme` y reemplazar botones nativos.
5. **I1 — Estados `enviando`/`fallo` en `FormularioConsulta`.** Preparar conexión a `/api/contacto` cuando se confirme.
6. **I3 — Filtro por segmento en `/faq`.** Reutilizar patrón ya usado en otras páginas.
7. **I6 — Autoridades + normativa descargable en `InstitucionalPage`.** Solo estructura + marcar pendientes (sin inventar datos).
8. **I7 — Completar estructura en `DocentesPage`.** Mantener una sola referencia.
9. **I8 — Componente de calendario (estructura sin fechas inventadas).** Cerrar tensión AF-A6.
10. **M6 — Zonas táctiles 44×44 px** (header + carrusel).
11. **M1 — Integrar fotos del carrusel** cuando UX entregue assets (alt + recorte + punto focal).
12. **M3/M4 — Unificar lenguaje visual + set de iconos** (coordinado con UX).
13. **I10 — Correo institucional en pie** cuando IFTS lo confirme.
14. **I2 — Estados `sesión expirada`/`sin permisos`** cuando exista auth real.

## 5. Dependencias que NO son de código (UX/UI o institucionales)

- **B1 (login admin) y B2 (panel de administración):** frames UX + endpoints auth/CRUD (inexistentes hoy).
- **I9 (superposiciones/recortes), I11 (Home de referencia), M7 (Specs responsive):** validación/especificación en Figma, no estática en repo.
- **B8 (logos alta resolución/origen):** confirmación de archivos oficiales del Drive.
- **Contenidos institucionales reales (B7, I5, I6, I7, I8):** autoridades, normativa, fechas, horarios, calendario, correos, URLs oficiales (Moodle/SIU/Inscripción).
- **M2 (nombre oficial):** validación con AF/Edith.
- **I4 (alcance buscador), I1 (alcance `/api/contacto`), auth real (I2):** decisiones de Análisis Funcional/Backend.

## Notas

- El código existente muestra una base sólida y reutilizable. La mayor brecha es **coherencia de datos** (mocks vs. API real) en `IngresantesPage`.
- Muchas correcciones son **UX-owned** (frames/estados visuales). El Frontend puede avanzar con placeholders claros y marcar dependencias, sin inventar datos institucionales.