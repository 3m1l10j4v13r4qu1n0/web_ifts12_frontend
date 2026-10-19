# web_ifts12_frontend

Frontend del sitio web institucional del IFTS N.º 12 (2026).

Reemplaza el espacio actual alojado en Moodle por un sitio web institucional accesible,
claro y fácilmente administrable por el propio instituto. El backend se integra luego
con APIs y la web se despliega como build estático en un VPS independiente del Moodle.

> **Estado:** completadas las 10 fases (`develop` cierra la Fase 10 con `v1.11.0`): las 5
> fases iniciales del plan (`v1.0.0`…`v1.4.0`), la Fase 6 de brechas de auditoría (`v1.5.0`),
> el refactor del Mapa del Sitio V2 (menú de 9 ítems + buscador global, `v1.6.0`), la
> infraestructura y la adopción del sistema documental **logsayer** de 5 capas, el cierre del
> ticket 0000010 (`v1.10.0`), la Fase 9 de **consumo real de API** de carreras y novedades y la
> Fase 10 de **alineación del frontend a los exports Desktop 1440** del avance de diseño
> (T1–T16). El sitio tiene **16 rutas** (14 del sitio + 2 de administración solo-UI), consumo
> real de API para carreras/novedades y **206 tests** en verde. El resto del sitio sigue con
> datos simulados. La evidencia de navegación está en `documentacion/screenshots/`.

## Tecnología

React 19 + Vite + TypeScript (strict) + Tailwind CSS v4 · Axios · TanStack Query · Zod · Biome · Vitest + React Testing Library

## Requisitos

- Node.js (versión compatible con Vite 8).
- npm.

## Puesta en marcha

```bash
npm install       # instala dependencias
npm run dev       # levanta el servidor de desarrollo
```

Scripts disponibles:

| Script | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo (Vite). |
| `npm run build` | TypeScript + build estático de producción (para Nginx en el VPS). |
| `npm run lint` | Check de estilo y formato con Biome. |
| `npm run lint:fix` | Auto-formatea con Biome. |
| `npm run test` | Tests unitarios (Vitest + React Testing Library). |
| `npm run test:watch` | Tests en modo watch. |

Checklist previa a mergear: `npm run lint` · `npm run build` · `npm run test` en verde.

## Build de producción

```bash
npm install
npm run build    # produce dist/ listo para servir desde Nginx
```

El `dist/` resultante es estático: requiere la regla de fallback SPA (`try_files ... /index.html`)
en Nginx. Las variables de entorno del build (`VITE_*`) se están coordinando con Infra; al
cerrarse esa definición se documentarán acá los valores y el `.env.example` correspondiente.

## Estructura del proyecto

```
src/
├── api/                     # client (Axios+interceptor), endpoints, mappers y services
│                            # (carrera, novedad)
├── components/
│   ├── ui/                  # Button, CardCarrera, CardNoticia, FaqAcordeon, FormularioConsulta,
│   │                        # Estado, Tabs, Paginacion, Toast, TablaAdmin, etc.
│   └── layout/              # Header, NavMenu, MobileMenu, BuscadorGlobal, EncabezadoPagina,
│                            # Footer
├── pages/                   # Home, Carreras, CarreraDetalle, Ingresantes, Estudiantes, Docentes,
│                            # Tutorías, Institucional, Noticias, NotaCompleta, Búsqueda, FAQ,
│                            # Contacto, 404 y admin (login/panel solo-UI)
├── contexts/                # AuthContext (preparado)
├── routes/                  # AppRouter
├── types/
│   ├── api/                 # DTOs + esquemas Zod (carrera, novedad, error)
│   └── domain/              # modelo de dominio (sitio.types)
├── constants/               # navegacion, mock-data (provisorios), enlaces (placeholders)
├── hooks/                   # useCarreras, useNovedades (TanStack Query)
├── utils/, styles/          # helpers y tema Tailwind
└── __tests__/               # suites de pruebas

docs/                        # sistema documental logsayer (5 capas)
├── 00_memory_index.md       # índice generado (logsayer memory index)
├── project_state.md         # snapshot de estado (Capa 2)
├── 01_global/, 02_technical/, 03_process/, 04_user_stories/, 05_agile_methodology/
├── 06_audits/               # informes de auditoría
└── logbooks/                # bitácora append-only

documentacion/               # documentación institucional y de la cátedra
├── frontend/                # plan, propuesta tecnológica, actas, dependencias, análisis validado
├── entregas/                # entregables de cierre de fases
├── driveFrontend/           # requisitos fuente de verdad (no versionado, en .gitignore)
├── mockups/                 # mockups HTML de las vistas
├── wireframes/, screenshots/
└── rol_equipo.md
```

## Mockups de las vistas

En `documentacion/mockups/` hay mockups HTML autocontenidos que replican el diseño real de las
vistas (Home, secciones placeholder y página 404) para verlos renderizados al instante
en Tailwind Play sin levantar el proyecto.

Las instrucciones completas de cómo abrirlos, pegarlos y experimentar con los estados
comentados están en el [instructivo de mockups](documentacion/mockups/README.md).

## Estado del frontend

- **Consumo real de API** para carreras y novedades (`GET /api/carreras`, `GET /api/novedades`):
  listados, fichas, notas completas, buscador global y secciones de la Home, con estados de
  carga, error y vacío. El resto del sitio sigue con datos simulados en
  `constants/mock-data.ts`.
- URLs de Moodle e inscripción como placeholders en `constants/enlaces.ts`; los enlaces externos
  se muestran solo cuando existe URL oficial.
- Endpoints documentados por historia de usuario (`docs/04_user_stories/HU-XX/hu_xx_api.md`,
  regla anti-alucinación); la HU-01 Home ya tiene su `hu_01_api.md` con los endpoints GET
  públicos.
- Componentes presentacionales, accesibles y responsive (mobile-first), alineados a los tokens
  del contrato visual `docs/01_global/figma_v2_contrato_visual.md`.

## Equipo y roles

| Integrante | Rol |
|---|---|
| Emilio Aquino | Coordinador / PM + enlace transversal |
| Nélida Fernández | Responsable de documentación |
| Nicole Vargas Callejas | Referente técnico Frontend + integración con Backend |
| Camila González | HTML/CSS/Tailwind |
| Jesica Hinojosa Guevara | JavaScript e interacción |
| Sofía López Portela | Accesibilidad y responsive |

## Documentación

En `documentacion/frontend/`:

- `plan.md` — plan de la fase frontend (5 fases, cronograma y entregables).
- `propuesta-tecnologica.md` — stack, estructura, componentes e infraestructura del Plan B (VPS).
- `acta-decisiones.md` — decisiones tomadas en las fases 1-5.
- `dependencias-equipos.md` — bloqueos y dependencias por equipo.
- `agenda-reunion-lunes.md` — agenda de la reunión de revisión del 31/08/2026.
- `analisis_funcional_validado.md` — **fuente única de verdad** del análisis funcional (18/09/2026).

Sistema documental **logsayer** (5 capas) en `docs/`: `01_global`, `02_technical`,
`03_process`, `04_user_stories/HU-01`, `05_agile_methodology`, `06_audits` y
`logbooks/`, con el snapshot de estado en `docs/project_state.md` y el índice de
navegación generado en `docs/00_memory_index.md` (`logsayer memory index`).
Verificación con `logsayer check` y `logsayer process check`. La documentación
institucional y de la cátedra (entregas, wireframes, mockups, Drive compartido) vive en
`documentacion/`.
