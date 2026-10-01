# Evidencia Ticket 0000010 — Primera versión navegable v0.1

## Datos de la entrega

| Campo | Contenido |
|:---|:---|
| **Ticket** | 0000010 — Preparar primera versión navegable a partir de UX/Análisis |
| **Área** | Frontend |
| **Fecha de captura** | 01/10/2026 |
| **Rama de trabajo** | `feature/evidencia-ticket-0000010` (desde `develop`) |
| **Versión de referencia** | `develop` en `22d63a7` |
| **Datos** | Simulados (`src/constants/mock-data.ts`). Sin consumo de API real |
| **Entorno de captura** | Firefox (DevTools MCP) · desktop 1680×900 · mobile 390×844 |

## Criterios de cierre y estado

| Criterio del ticket | Estado | Evidencia |
|:---|:---|:---|
| Existe una primera versión navegable | ✅ Cumple | 13 rutas registradas en `src/routes/AppRouter.tsx`, navegables sin errores de consola |
| Las pantallas principales respetan UX/UI | 🟡 Parcial | 11 de 15 wireframes con equivalente implementado; ver brecha |
| Las dudas funcionales pendientes están registradas | ✅ Cumple | Sección «Dudas funcionales pendientes» de este documento |
| La versión está lista para coordinar integración con Backend | 🟡 Parcial | Requiere cerrar dudas funcionales y definir contrato de endpoints |

## Listado de pantallas implementadas

Rutas verificadas una por una en navegador el 01/10/2026. El `h1` reportado es el real
de la página renderizada.

| # | Ruta | Componente | `h1` renderizado | Wireframe | Captura |
|:---|:---|:---|:---|:---|:---|
| 1 | `/` | `HomePage` | Instituto de Formación Técnica Superior N.º 12 | WF 01 | `01-home.png` |
| 2 | `/carreras` | `CarrerasPage` | (listado de carreras) | WF 02 | `02-carreras.png` |
| 3 | `/carreras/:id` | `CarreraDetallePage` | Gestión parlamentaria | WF 03 | `03-carrera-detalle.png` |
| 4 | `/ingresantes` | `IngresantesPage` | (orientación a ingresantes) | WF 04 | `04-ingresantes.png` |
| 5 | `/estudiantes` | `EstudiantesPage` | (servicios para estudiantes) | WF 05 | `05-estudiantes.png` |
| 6 | `/docentes` | `DocentesPage` | (información docente) | WF 07 | `06-docentes.png` |
| 7 | `/tutorias` | `TutoriasPage` | (tutorías) | WF 06 | `07-tutorias.png` |
| 8 | `/institucional` | `InstitucionalPage` | (información institucional) | WF 08 | `08-institucional.png` |
| 9 | `/noticias` | `NoticiasPage` | (listado de novedades) | WF 09 | `09-noticias.png` |
| 10 | `/noticias/:id` | `NotaCompletaPage` | (nota completa) | WF 10 | `10-nota-completa.png` |
| 11 | `/faq` | `FaqPage` | (preguntas frecuentes) | — (sin wireframe) | `11-faq.png` |
| 12 | `/contacto` | `ContactoPage` | (formulario de contacto) | WF 11 | `12-contacto.png` |
| 13 | `*` (catch-all) | `PaginaNoEncontrada` | Pagina no encontrada | — (sin wireframe) | `13-404.png` |

### Estados visuales capturados

| Estado | Descripción | Captura |
|:---|:---|:---|
| Menú móvil abierto | Botón «Abrir menú» desplegado en viewport desktop | `14-estado-menu-abierto.png` |
| Home responsive | Home en viewport mobile 390×844 | `15-home-mobile-390.png` |

### Componentes de layout compartidos

Verificados en el `header` renderizado: franja de accesos directos (Campus virtual,
SIU, Inscripción), logo enlazado a home, logos IFTS/Gobierno de la Ciudad, buscador
global (`BuscadorGlobal`) y botón de menú. El `footer` expone «Mapa del sitio»,
«Servicios» y «Plataformas externas».

## Cobertura frente a wireframes

| Resultado | Cantidad | Detalle |
|:---|:---|:---|
| Wireframes con equivalente implementado | 11 de 15 | WF 01 a WF 11 |
| Wireframes sin equivalente | 4 de 15 | WF 12 (Búsqueda global), WF 13 (Login admin), WF 14 (Panel admin), WF 15 (Formulario admin) |
| Pantallas implementadas sin wireframe | 2 | `/faq`, catch-all 404 |

La carpeta `documentacion/wireframes/` contiene 16 archivos HTML: los 15 wireframes
(`WF 01` a `WF 15`) más `index.html`, que es el índice navegable de la colección y no
cuenta como pantalla.

### Brecha de funcionalidades

| Funcionalidad del wireframe | Estado en el código | Observación |
|:---|:---|:---|
| WF 12 · Búsqueda global | Parcial | Existe `BuscadorGlobal` como combobox dentro del `Header`, sin página de resultados dedicada ni ruta propia |
| WF 13 · Login admin | No implementado | No hay rutas ni componentes admin en `src/` |
| WF 14 · Panel admin | No implementado | Ídem |
| WF 15 · Formulario admin | No implementado | Ídem |
| `ProtectedRoute` | Existe en `src/routes/ProtectedRoute.tsx` | Sin uso: ninguna ruta lo referencia |

Los tres wireframes de administración dependen de autenticación real. El proyecto no
tiene autenticación implementada y el estándar vigente la prohíbe mientras el backend
no la soporte, por lo que quedan fuera del alcance navegable actual.

## Verificaciones ejecutadas

| Comando | Resultado |
|:---|:---|
| `npm run lint` | ✅ Sin errores. Biome chequea 55 archivos |
| `npm run build` | ✅ Sin errores. 102 módulos, bundle de 317,93 kB (92,80 kB gzip) |
| `npm run test` | ✅ 12 archivos de test, 29 tests, todos en verde |
| Recorrido de las 13 rutas en navegador | Sin errores de consola. `performance` sin recursos con estado HTTP ≥ 400 |
| Verificación de `h1` y enlaces de navegación | Coinciden con las rutas registradas en `AppRouter` |

## Dudas funcionales pendientes

Las siguientes dudas bloquean el cierre completo del ticket y necesitan definición de
Análisis Funcional o del equipo funcional. Están numeradas para poder referenciarlas
en la coordinación con Backend.

### Bloqueantes para integración con Backend

1. **Dudas endpoint inexistente en la documentación de HUs.** No hay `docs/04_user_stories/HU-02/`
   ni posteriores, y `docs/04_user_stories/HU-01/` no expone contrato de API. Según la regla
   de fuente de verdad por historia de usuario, hoy **no existe ningún endpoint documentado**.
   Hacen falta contratos para carreras, novedades,/faq, ingresos/contacto y administración.
2. **Autenticación y administración.** ¿WF 13, 14 y 15 entran en el alcance del sitio público
   o quedan para una etapa posterior? De la respuesta depende si el backend debe exponer
   login, roles y permisos desde ya.
3. **Búsqueda global (WF 12).** ¿El buscador es de resultados dentro del sitio y se persiste
   en una URL navegable (`/busqueda?q=`) o es un widget sin página propia? Ahora es un
   combobox embebido en el `Header`, sin ruta asociada.

### Contenido pendiente de validación

4. **Textos institucionales.** Todo el contenido proviene de `src/constants/mock-data.ts`, con
   textos provisorios. No se validó contra Análisis Funcional ni contra fuentes oficiales
   del IFTS 12. Incluye datos de carreras, comunitarias, novedades y datos de contacto.
5. **URLs oficiales pendientes.** Campus virtual (Moodle), SIU e Inscripción aparecen como
   enlaces sin destino confirmado en el código; los bloques correspondientes están comentados
   en los mockups por esta razón.
6. **Proveedor de imágenes.** Los logos del `Header` se sirven desde `public/`. No está
   definido si habrá logo definitivo ni sus modalidades accesibles (alto contraste, monocromo).

### Definiciones de alcance

7. **Mapa del sitio.** El `nav` renderizado expone 9 ítems (Inicio, Carreras, Ingresantes,
   Estudiantes, Tutorías, Docentes, Institucional, Novedades, Contacto) y coincide con el
   Mapa Sitio V2 aprobado el 15/09/2026. `/faq` no aparece en el `nav` aunque la ruta existe:
   hay que decidir si es intencional o si debe agregarse al menú.
8. **Detalle de carrera y nota.** Las rutas con parámetro (`/carreras/:id`, `/noticias/:id`)
   se verificaron solo con los primeros identificadores de los datos simulados
   (`gestion-parlamentaria`, `novedad-1`). Falta probar el comportamiento con un
   identificador inexistente, que actualmente cae en la página 404 genérica.

## Referencias

- Ticket de origen: `inbox/ticket_0000010.md`
- Wireframes UX/UI: `documentacion/wireframes/` (15 pantallas, Mapa Sitio V2)
- Mockups navegables: `documentacion/mockups/` (+ `README.md` con instructivo)
- Análisis funcional validado: `documentacion/frontend/analisis_funcional_validado.md`
- Rutas del frontend: `src/routes/AppRouter.tsx`
- Capturas: `documentacion/screenshots/` (15 archivos PNG)
