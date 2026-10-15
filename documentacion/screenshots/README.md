# Capturas de pantalla — Evidencia Ticket 0000010

Capturas de la primera versión navegable del sitio del IFTS N.º 12, tomadas el
**01/10/2026** sobre `develop` en `22d63a7`, con datos simulados
(`src/constants/mock-data.ts`), sin consumo de API real.

## Cómo se tomaron

Las capturas se obtuvieron con Firefox vía DevTools MCP sobre el dev server de Vite
(`npm run dev`, `http://localhost:5173/`). Para reproducir cualquier pantalla:

```bash
npm run dev
```

Luego abrir la ruta correspondiente en el navegador.

## Configuración de captura

| Contexto | Viewport | Uso |
|:---|:---|:---|
| Desktop | 1680 × 900 | Todas las pantallas, salvo la indicated en móvil |
| Mobile | 390 × 844 | Solo Home, como verificación de responsive |

## Índice de capturas

### Pantallas por ruta

| Archivo | Ruta | `h1` renderizado | Wireframe |
|:---|:---|:---|:---|
| `01-home.png` | `/` | Instituto de Formación Técnica Superior N.º 12 | WF 01 |
| `02-carreras.png` | `/carreras` | Listado de carreras | WF 02 |
| `03-carrera-detalle.png` | `/carreras/gestion-parlamentaria` | Gestión parlamentaria | WF 03 |
| `04-ingresantes.png` | `/ingresantes` | Orientación a ingresantes | WF 04 |
| `05-estudiantes.png` | `/estudiantes` | Servicios para estudiantes | WF 05 |
| `06-docentes.png` | `/docentes` | Información docente | WF 07 |
| `07-tutorias.png` | `/tutorias` | Tutorías | WF 06 |
| `08-institucional.png` | `/institucional` | Información institucional | WF 08 |
| `09-noticias.png` | `/noticias` | Listado de novedades | WF 09 |
| `10-nota-completa.png` | `/noticias/novedad-1` | Nota completa | WF 10 |
| `11-faq.png` | `/faq` | Preguntas frecuentes | — |
| `12-contacto.png` | `/contacto` | Formulario de contacto | WF 11 |
| `13-404.png` | `/ruta-inexistente` | Pagina no encontrada | — |

### Estados visuales

| Archivo | Estado | Viewport |
|:---|:---|:---|
| `14-estado-menu-abierto.png` | Botón «Abrir menú» desplegado | 1680 × 900 |
| `15-home-mobile-390.png` | Home responsive | 390 × 844 |

### Alineación al diseño del avance (Fase 10)

Capturas de revisión de la tarea **T4 (ficha de carrera)**, tomadas el **15/10/2026**
sobre `develop`, con el mock local que replica `app.py:62-92` (`localhost:5000`) y el dev
server de Vite (`localhost:5173`), a 1440 × 900.

| Archivo | Pantalla | Estado |
|:---|:---|:---|
| `t4_ficha_carrera_analisis.png` | `/carreras/analisis-de-sistemas` | **Pre-merge**: muestra los textos de anotación que después se quitaron (rama basada en `1b40ec3`, anterior al fix `dca04ed`) |
| `t4_ficha_carrera_administracion.png` | `/carreras/administracion-publica` | **Pre-merge**: idem anterior |
| `t4_revision_home.png` | `/` | Post-merge: sin "Contenidos provisorios pendientes de validación." |
| `t4_revision_carreras.png` | `/carreras` | Post-merge: sin el `descripcion` del encabezado |
| `t4_revision_ficha.png` | `/carreras/analisis-de-sistemas` | Post-merge: ficha alineada al export "02.1 · Carrera · detalle" |

### Alineación al diseño del avance — T5 (novedades)

Capturas de la tarea **T5 (novedades)** y de los fixes de encabezado que salieron de la
revisión, tomadas el **15/10/2026** sobre `feature/alineacion-disenio-t05-novedades`, con el
mock local que replica `app.py:62-92` (`localhost:5000`) y Vite (`localhost:5173`), a
1440 × 900.

| Archivo | Pantalla | Estado |
|:---|:---|:---|
| `t5_novedades_render.png` | `/noticias` | Hero + breadcrumb "Inicio / Novedades", filtros (palabra clave/Año/Mes/Filtrar), chips de categoría, contador "N de N resultados", grilla y paginación |
| `t5_carreras_bajada_breadcrumb.png` | `/carreras` | Fix de encabezado: breadcrumb "Inicio / Carreras" + bajada con la cantidad real de carreras del backend |

## Alcance de la evidencia

Estas capturas cubren las 13 rutas registradas en `src/routes/AppRouter.tsx` más dos
estados visuales. **No** incluyen las pantallas de administración (WF 13 Login admin,
WF 14 Panel admin, WF 15 Formulario admin) porque no están implementadas: dependen de
autenticación real, que el estándar del proyecto prohíbe hasta que el backend la soporte.
La búsqueda global (WF 12) tampoco tiene página de resultados propia; el buscador
existe como combobox dentro del `Header`.

El detalle de brechas y las dudas funcionales pendientes están en
`documentacion/entregas/2026-10-01__Evidencia_Ticket_0000010_Version_Navegable_v0.1.md`.

## Nota sobre contenido

Todos los textos visibles provienen de datos simulados y son **provisorios**. No están
validados contra el Análisis Funcional ni contra fuentes oficiales del IFTS 12. Los
enlaces a Campus virtual, SIU e Inscripción aparecen sin destino confirmado.

## Referencias

- Ticket de origen: `inbox/ticket_0000010.md`
- Wireframes UX/UI: `documentacion/wireframes/`
- Mockups navegables: `documentacion/mockups/` (+ `README.md` con instructivo)
