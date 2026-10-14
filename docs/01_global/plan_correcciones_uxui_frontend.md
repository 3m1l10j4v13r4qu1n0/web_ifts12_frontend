---
# Tags del índice de memoria (D13): el CLI las scaffoldea, el Mentat ajusta.
tags:
  - plan
  - correcciones
  - ux
  - ui
  - frontend
---

# Plan de correcciones UX/UI y Frontend

> Documento de Capa 1 — Especificación. Complementa `correcciones_ux_ui_frontend.md`, que
> especifica los hallazgos B1–B9, I1–I12 y M1–M7; este documento define **el orden, las fases y
> los criterios de verificación** en modo feedback. No agrega alcance nuevo al proyecto.

Fecha: 2026-10-08 · Estado: borrador

## Resumen

Convierte los hallazgos de la auditoría UX/UI en acciones verificables, separando lo que puede
resolverse en código del trabajo de UX/UI y de las dependencias institucionales. El avance puede
ser pantalla por pantalla, respetando dos principios: **no inventar datos institucionales** y
**marcar dependencias como pendientes**. Es un plan para implementar a futuro: no bloquea la
iteración actual.

## Fuente

- Origen: `inbox/_done/feedback_plan_correcciones_uxui_frontend_2026-10-08.md` (recibido el
  2026-10-08).
- Insumo de origen: Auditoría `documentacion/auditoria_uxui_frontend_vs_codigo_2026-10-08.md`.
- Destinatarios sugeridos: Frontend (implementación), UX/UI (validación de frames),
  Análisis Funcional/IFTS (dependencias institucionales).
- Relacionado: `docs/01_global/correcciones_ux_ui_frontend.md` (mismos IDs B/I/M, criterios de
  aceptación por corrección).

## Qué establece

### Objetivo

Convertir los hallazgos en acciones verificables, separando lo que puede resolverse en código del
trabajo de UX/UI y de las dependencias institucionales. El avance puede ser pantalla por pantalla,
respetando el principio: **no inventar datos institucionales** y **marcar dependencias como
pendientes**.

### Principios

- **Anti-invención:** lo no confirmado queda marcado como "pendiente de definir por
  UX/Institucional". No publicar ejemplos como datos reales.
- **Entrega por pantalla:** cada corrección cerrada requiere frame/componente actualizado
  (PC/tablet/celular) + criterio de aceptación.
- **Validación en TEST:** puntos de código se validan en ambiente TEST (ya existe). Producción
  queda fuera de este plan.
- **Separación de responsabilidades:** código solo resuelve lo verificable en repo; lo
  visual/de diseño queda como dependencia externa cuando corresponda.

### 1. Fase 0 — Dependencias externas (bloqueantes para B1–B2)

| Ítem | Responsable | Acción requerida | Estado a registrar |
|---|---|---|---|
| **B1 – Login admin** | UX/UI + Backend/AF | Entregar frames login admin (PC/tablet/celular), campos/estados (cargando/error/sesión expirada) y contrato de auth (endpoint/método/roles). | "Pendiente: frame login admin + contrato auth". |
| **B2 – Panel admin (CRUD)** | UX/UI + Backend/AF | Entregar frames mínimo: listado/alta/edición/baja (Noticias/Carrusel), navegación, confirmación de baja, estados vacío/cargando/error. Definir endpoints CRUD confirmados. | "Pendiente: frames CRUD admin + endpoints confirmados". |
| **I11 – Home de referencia** | UX/UI | Definir un único frame de Home vigente por tamaño. Señalar alternativas y renombrar según sitemap (sin mover archivos de Drive). | "Pendiente: Home de referencia única (Figma)". |
| **M7 – Specs responsive** | UX/UI | Publicar página Specs: breakpoints, anchos, contenedor, columnas, separación y espaciados. Alinear con Tailwind. | "Pendiente: Specs responsive en Figma". |
| **I9 – Superposiciones/recortes** | UX/UI + Frontend (validación) | Revisar footer sobre FAQ (PC), buscador cortado (tablet), texto largo. Validar en frames + en navegador (TEST). | "Pendiente de validación visual (navegador + frames)". |
| **B8 – Logos (origen/alta resolución)** | UX/UI/IFTS | Confirmar archivos oficiales del Drive usados en header/footer (versión/alta resolución). | "Pendiente: confirmación origen/logos". |
| **Contenidos institucionales (B7,I5,I6,I7,I8,M2)** | AF/IFTS + UX/UI | Autoridades/cargos, normativa, fechas/horarios, calendario, correos, URLs (Moodle/SIU/Inscripción), nombre oficial. Marcar cada campo como confirmado/pendiente. | "Dependencia institucional registrada por ítem". |
| **I1 – Alcance `/api/contacto`** | Backend/AF | Confirmar si el formulario registra consulta o envía correo (comportamiento real). | "Pendiente: comportamiento real de contacto". |
| **Alcance buscador (I4)** | AF | Confirmar datos buscables y alcance (global vs. secciones). | "Pendiente: alcance buscador". |

### 2. Fase 1 — Correcciones de coherencia de datos (críticas)

| ID | Prioridad | Impacto | Archivos | Acción | Criterio de aceptación | Verificación (TEST) |
|---|---|---|---|---|---|---|
| **B7 + I5** | Alta | Alto | `src/pages/IngresantesPage.tsx:5,76` | Reemplazar `mockCarreras` por `useCarreras()`. Eliminar import de `mockCarreras`. Ajustar render al shape devuelto por API. | Ingresantes muestra las mismas carreras que Carreras/Home (API real). Sin datos de mocks. | Navegar a `/ingresantes` → carreras coinciden con `/carreras`. |
| **B3** | Alta | Alto | `src/constants/mock-data.ts:247–252`, `src/components/home/Comunidades.tsx`, `src/pages/HomePage.tsx` | Retirar/render condicional del bloque "Comunidad de alumnos" según Mapa V2. Si UX no define reemplazo, eliminarlo (sin inventar). | Home no muestra perfiles/grupos sociales. Sección Estudiantes sigue coherente con mapa. | Home render sin bloque Comunidades. No hay texto de comunidad sin respaldo. |

### 3. Fase 2 — Plantilla de ficha y componentes base

| ID | Prioridad | Impacto | Archivos | Acción | Criterio de aceptación | Verificación (TEST) |
|---|---|---|---|---|---|---|
| **B5** | Alta | Alto | `src/pages/CarreraDetallePage.tsx:93–114` | Crear bloques reutilizables: datos oficiales, horario/turno, docentes, descargas, plan. Agregar **tabla de correlatividades** (legible, datos). Usar placeholders `Pendiente de definir por UX/Institucional` cuando falte dato. | Ficha estructurada, correlatividades en tabla (no imagen). Se lee bien en móvil. Datos no confirmados marcados como pendientes. | `/carreras/:id` → secciones visibles, tabla legible, responsive OK. |
| **B9** | Alta | Alto | `src/styles/index.css`, `src/components/ui/Button.tsx`, `src/components/contacto/FormularioConsulta.tsx:133–145` | Completar tokens (tipografía/espaciado) en `@theme`. Unificar uso de `<Button>` (reemplazar botones nativos). Definir variantes relevantes (tamaños, error/foco/deshabilitado). | Componentes reutilizables con mismas reglas. Botones del formulario usan `Button`. Tokens aplicados consistentemente. | Inspección visual + CSS vars coherentes. Sin botones nativos dispersos. |

### 4. Fase 3 — Formularios, FAQ y estados

| ID | Prioridad | Impacto | Archivos | Acción | Criterio de aceptación | Verificación (TEST) |
|---|---|---|---|---|---|---|
| **I1** | Alta | Medio-Alto | `src/components/contacto/FormularioConsulta.tsx` | Agregar estados `enviando`/`fallo`. Deshabilitar botón durante envío. Mostrar mensaje de error con `role="alert"`. Mantener mensaje de éxito honesto. Dejar preparado para `POST /api/contacto` (solo habilitar conexión cuando Fase 0 confirme alcance). | Estados cubiertos. Accesible. No promete envío real si no hay backend confirmado. | Enviar formulario → botón deshabilitado, feedback claro (éxito o error). |
| **I3** | Media-Alta | Medio | `src/pages/FaqPage.tsx` | Agregar filtro por segmento (Ingresantes/Estudiantes/Docentes). Reutilizar patrón de filtrado de otras páginas. Usar datos oficiales cuando estén disponibles. | `/faq` permite filtrar por segmento. Estado vacío documentado. | Filtrar por cada segmento → resultados correctos. Sin resultados → estado vacío. |
| **I2** | Media | Medio | Componentes comunes + páginas con estados dinámicos | Añadir estados `sesión expirada` y `sin permisos` cuando exista auth real. Documentar disparador de cada estado por componente. | Estados definidos y listos para activarse al conectar auth/permisos. | Verificación estructural (componentes existen). Activación queda pendiente de auth. |

### 5. Fase 4 — Páginas institucionales y calendario

| ID | Prioridad | Impacto | Archivos | Acción | Criterio de aceptación | Verificación (TEST) |
|---|---|---|---|---|---|---|
| **I6** | Media-Alta | Medio | `src/pages/InstitucionalPage.tsx` | Agregar bloques de autoridades/cargos y normativa descargable. Marcar campos no confirmados con placeholder "Pendiente de definir por IFTS/UX". No inventar nombres/cargos. | Estructura coincide con mapa V2. Datos presentes tienen origen o están marcados como pendientes. | Render de bloques con pendientes visibles, sin datos inventados. |
| **I7** | Media | Medio | `src/pages/DocentesPage.tsx` | Completar estructura (concursos, docentes por carrera, documentación). Mantener una sola referencia de pantalla. | Una sola referencia vigente. Secciones presentes, contenido pendiente marcado. | Navegación/estructura correcta. |
| **I8** | Media | Medio | `src/pages/EstudiantesPage.tsx` | Extraer calendario a componente reutilizable (estructura, sin fechas inventadas). Cerrar tensión AF-A6 (7 vs 9 accesos) coordinando con UX/AF. Usar placeholders para fechas pendientes. | Calendario con estructura definida. Accesos acordados reflejados o pendientes documentados. | Render estructural OK. Sin fechas hardcodeadas no confirmadas. |

### 6. Fase 5 — Detalles UX (accesibilidad/táctiles/visual)

| ID | Prioridad | Impacto | Archivos | Acción | Criterio de aceptación | Verificación (TEST) |
|---|---|---|---|---|---|---|
| **M6** | Media | Bajo-Medio | `src/components/layout/Header.tsx:60–65`, `src/components/home/CarruselInstitucional.tsx:75,84` | Agrandar área interactiva a **44×44 px** (padding/size). Mantener dibujo del ícono SVG. Verificar separación, foco visible y `aria-label`. | Zona táctil ≥ 44×44 px. Accesible por teclado. Sin romper layout. | Inspección de hitbox (devtools). Focus visible OK. |
| **M5** | Baja-Media | Bajo | `src/components/home/AccesosRapidos.tsx:10` | Probar grid `sm:grid-cols-2` con textos reales (coordinado con UX). Evaluar si rompe títulos/controles; ajustar si es necesario. | Decisión documentada (2 columnas en móvil-sm o mantener 1). Justificar cambio en commit. | Probar viewport móvil (≤ 640 px). Legibilidad OK. |
| **M1** | Baja | Bajo | `src/components/home/CarruselInstitucional.tsx`, `src/pages/HomePage.tsx` | Cuando UX entregue fotos institucionales: agregar `alt`, definir recorte/punto focal, mantener sin autoplay. Documentar origen de assets. | Carrusel con fotos + alt accesible. Proporción/recorte acordados con UX. | Accesibilidad (alt), navegación por teclado, puntos/controles OK. |
| **M3/M4** | Baja | Bajo | `src/styles/index.css`, componentes UI | Unificar lenguaje visual + adoptar set de iconos acordado por UX. Mantener `aria-label`/`aria-hidden` en iconos decorativos/semánticos. | Consistencia visual con Home vigente. Set documentado. | Revisión cross-página (internas vs Home). |
| **I10** | Baja | Bajo | `src/components/layout/Footer.tsx`, `src/pages/ContactoPage.tsx:56–58` | Agregar correo institucional **solo cuando IFTS lo confirme**. No inventar. Mantener tamaño ≥ 12 px. | Correo con fuente o sigue marcado como pendiente. Legibilidad verificada. | Footer legible. Dato no confirmado no aparece. |

### 7. Criterios de cierre por bloque

| Bloque | Condición para darlo por cerrado | Evidencia a registrar |
|---|---|---|
| **Código (Fases 1–5)** | Criterio de aceptación de cada ID cumplido + `npm run lint · npm run build · npm run test` OK. | Rama + SHA del commit. Archivos tocados. Bitácora (`logsayer log add`). |
| **UX/UI (Fase 0)** | Frames PC/tablet/celular compartidos + componentes + estados + pendientes documentados. | Enlace a Figma + fecha de revisión + breve descripción de cambio. |
| **Institucional (Fase 0)** | Confirmaciones por ítem (confirmado/pendiente) registradas (sin asumir). | Registro de dependencia (Análisis Funcional). |
| **Auditoría/validación** | Comparación diseño vs. implementación en navegador (UX+Frontend). Diferencias corregidas. | Versión revisada identificada (rama + SHA). Checklist de validación completado. |

### 8. Notas de implementación

- **Trabajar por pantalla, no por todo el sitio.** Cada ítem puede mergearse por separado cuando
  cumple su criterio.
- **Marcar dependencias explícitas.** Usar texto `"Pendiente de definir por UX/Institucional"` en
  UI cuando el dato no esté confirmado (evita alucinación).
- **No bloquear TEST por Fase 0.** Los ítems con dependencias externas pueden quedar en estado
  🟡 PARCIAL con placeholders, mientras UX/AF resuelven confirmaciones.
- **Orden recomendado de ejecución:** **Fase 1 → Fase 2 → Fase 3 → Fase 4 → Fase 5**. Fase 0 puede
  correr en paralelo con Fase 1 (coordinación entre grupos).

## Cómo se valida

- Cada ítem se da por cerrado cuando cumple su **criterio de aceptación** y su **verificación
  (TEST)** de la tabla correspondiente.
- Los ítems de código (Fases 1–5) además exigen `npm run lint · npm run build · npm run test` en
  verde, con rama + SHA y entrada de bitácora.
- Las dependencias institucionales y de UX/UI (Fase 0) se registran como pendientes con
  responsable y estado, no se resuelven por intuición.
- Ningún dato, logo, URL o texto institucional se publica sin fuente: lo no confirmado queda
  marcado como pendiente.
