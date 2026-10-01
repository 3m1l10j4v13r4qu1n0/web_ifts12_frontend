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
