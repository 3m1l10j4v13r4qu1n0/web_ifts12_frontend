# web_ifts12_frontend

Frontend del sitio web institucional del IFTS N.º 12 (2026).

Reemplaza el espacio actual alojado en Moodle por un sitio web institucional accesible,
claro y fácilmente administrable por el propio instituto. El backend se integra luego
con APIs y la web se despliega como build estático en un VPS independiente del Moodle.

> **Estado:** completadas las 5 fases del plan inicial del frontend (tags `v1.0.0`…`v1.4.0` en
> `develop`). La Home es navegable con datos simulados; aún no hay consumo de API real.

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

## Estructura del proyecto

```
src/
├── api/                     # client (Axios+interceptor), endpoints, services (a crear)
├── components/
│   ├── ui/                  # Button, CardCarrera, CardNoticia, FaqAcordeon,
│   │                        # AccesosRapidos, SliderNoticias, Comunidades
│   └── layout/              # Header, NavMenu, Footer, Portada
├── pages/                   # Home, Carreras, Ingresantes, Estudiantes, Docentes,
│                            # Tutorías, Institucional, Noticias, FAQ, Contacto
├── contexts/                # AuthContext (preparado)
├── routes/                  # AppRouter, ProtectedRoute (preparado)
├── types/
│   ├── api/                 # espejo de esquemas del backend
│   └── domain/              # modelo de dominio (sitio.types)
├── constants/               # navegacion, mock-data (provisorios), enlaces (placeholders)
├── hooks/, utils/, styles/  # helpers y tema Tailwind
└── __tests__/               # suites de pruebas
```

## Estado del frontend

- Home navegable con datos simulados en `constants/mock-data.ts` (marcados como provisorios).
- URLs de Moodle e inscripción como placeholders en `constants/enlaces.ts`; los enlaces externos
  se muestran solo cuando existe URL oficial.
- Sin consumo de API real todavía: la tabla oficial de endpoints del backend está vacía
  (regla anti-alucinación).
- Componentes presentacionales, accesibles y responsive (mobile-first).

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

En `docs/frontend/`:

- `plan.md` — plan de la fase frontend (5 fases, cronograma y entregables).
- `propuesta-tecnologica.md` — stack, estructura, componentes e infraestructura del Plan B (VPS).
- `acta-decisiones.md` — decisiones tomadas en las fases 1-5.
- `dependencias-equipos.md` — bloqueos y dependencias por equipo.
- `agenda-reunion-lunes.md` — agenda de la reunión de revisión del 31/08/2026.

Memoria del proyecto y vitácora del agente en `docs/`.
