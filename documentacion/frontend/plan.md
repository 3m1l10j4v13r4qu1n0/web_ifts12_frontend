# Plan de la Fase Frontend — Sitio Web Institucional IFTS N.º 12

Área: Frontend · Proyecto Sitio Web Institucional IFTS N.º 12 — 2026
Vigencia: 28/08/2026 → lunes 31/08/2026 (reunión de revisión) y Hito 1 del 21/09/2026
Documento unificado: consolida la Tarea Inicial de Frontend y el Plan B de Infraestructura.

## 1. Contexto del proyecto

El IFTS N.º 12 necesita reemplazar el espacio actual alojado en Moodle por un sitio web
institucional accesible, claro y fácilmente administrable por el propio instituto.

Fuentes de verdad (releídas el 29/08/2026):

- `documentacion/driveFrontend/Minuta Analisis Funcional IFTS 12 - 27-08-2026.pdf` — relevamiento
  con Edith Olmedo Carmona: Home atractiva, tres comunidades (tutoría, alumnos, docentes),
  FAQ, normativa, novedades tipo slider, accesos rápidos y contenidos institucionales.
- `documentacion/driveFrontend/Tarea Inicial - Frontend.docx` — objetivo, entregables y coordinación
  con otros equipos; reunión de revisión el lunes 31/08/2026.
- `documentacion/driveFrontend/Integrantes y Roles - Frontend.docx` — integrantes y roles del área
  (no se modifica; la asignación actualizada vive en `documentacion/rol_equipo.md`).
- `documentacion/driveFrontend/Plan_B_Infraestructura_VPS_IFTS12_2026.docx` — el Moodle no se migra;
  la nueva web se aloja en infraestructura independiente (VPS) y Frontend entrega un build
  estático servido desde Nginx.
- `documentacion/driveFrontend/PAUTAS_PRACTICA_PROFESIONAL_INTEGRADORA_IFTS12_2026.docx` — entregables
  obligatorios del área (sección 10.3) y plantillas de documentación (sección 16).

Nota: `documentacion/driveFrontend/` contiene los fuentes del Drive, no se versiona.

## 2. Objetivo de esta fase

Construir la base del frontend visible del sitio a partir de las definiciones funcionales y
de UX/UI, sin adelantarse a decisiones que dependen de Análisis y UX/UI, y dejando el
contexto de infraestructura del Plan B resuelto.

Alcance acordado:

- Estructura base del proyecto.
- Home inicial navegable con datos simulados.
- Lista de componentes reutilizables y dependencias con Backend/UX/Infra.
- Contexto del Plan B documentado y coordinado con Infraestructura (hosting separado del Moodle).

## 3. Decisiones tomadas

| Tema | Decisión |
|---|---|
| Stack | React 19 + Vite + TypeScript strict + Tailwind CSS v4 (según skill `fe-architect-scaffold`, fuente de verdad del repo). |
| Rama | Crear `develop` desde `main`; la tarea se trabaja en `feature/tarea-inicial-frontend`. Prohibido trabajar sobre `main` o `develop`. |
| Accesos Moodle e inscripción | URLs en `constants/` como placeholders hasta recibir las oficiales. |
| Datos de la Home | Mocks en `constants/` marcados como provisorios, sin afirmaciones institucionales definitivas. |
| Backend | Sin endpoints inventados: la tabla oficial de endpoints está vacía y el frontend no consume API real todavía. |
| Hosting | Plan B: la nueva web va en un VPS independiente del Moodle; Frontend entrega build estático servido por Nginx. Detalle en `propuesta-tecnologica.md`. |
| Roles | Asignación registrada en `documentacion/rol_equipo.md`. |
| Docx de roles | No se modifica; queda en `documentacion/driveFrontend/` (no versionado). |

## 4. Fases con responsables

Roles según `documentacion/rol_equipo.md`. Enlace transversal: Emilio Aquino.

### Fase 0 — Git (PM)
1. Commit inicial de la gobernanza sin trackear fuentes del Drive (`.opencode/`, `AGENTS.md`, `.gitignore`, `docs/`).
2. Crear `develop` desde `main`.
3. Crear `feature/tarea-inicial-frontend` desde `develop`.

### Fase 1 — Andamiaje (Nicole, referente técnico)
4. Vite + React 19 + TypeScript strict + Tailwind v4 + dependencias del skill.
5. Scripts `lint` / `build` / `test` (Biome + Vitest).
6. Estructura de carpetas: `api/`, `components/{ui,layout}`, `pages/`, `hooks/`, `contexts/`,
   `routes/`, `types/api`, `types/domain`, `constants/`, `styles/`, `utils/`.

### Fase 2 — Base (Nicole + Jesica)
7. `AppRouter` con rutas de las secciones identificadas: Home, Carreras, Ingresantes,
   Estudiantes, Docentes, Tutorías, Institucional, Noticias, FAQ, Contacto.
8. `api/client.ts` con interceptor de Axios preparado (sin endpoints reales), `AuthContext`
   vacío, `ProtectedRoute`.
9. `constants/mock-data.ts` (mocks provisionales) y placeholders de Moodle/inscripción en `constants/`.

### Fase 3 — Componentes reutilizables (Camila + Jesica)
10. `layout/`: Header + Nav, Footer, portada.
11. `ui/`: CardCarrera, CardNoticia, FaqAcordeón, AccesosRapidos, Button. Presentacionales
    (solo props tipadas, sin llamadas HTTP).

### Fase 4 — Home navegable (equipo + Sofía)
12. Home con: portada, accesos rápidos, carreras, noticias (slider), FAQ, comunidades
    (tutoría/alumnos/docentes), acceso visible a Moodle, enlace de inscripción oficial y pie.
13. Accesibilidad (ARIA, foco, alt) y responsive móvil/tablet/desktop.

### Fase 5 — Cierre y documentación (Nélida + Emilio)
14. `npm run lint` · `npm run build` · `npm run test` en verde.
15. Documentar propuesta tecnológica, estructura y componentes; acta de decisiones.
16. Lista de dependencias y bloqueos + agenda de la reunión del lunes.

## 5. Cronograma hacia la entrega

### Viernes 28/08 — Relevamiento (Emilio + Nélida)
- Leer y extraer el informe del Plan B y los documentos de referencia.
- Confirmar alcance de la fase (documentación + base del proyecto, sin decisiones ajenas).

### Sábado 29/08 — Borradores (Nélida + Emilio, aportes técnicos del equipo)
- Borrador de `plan.md`, `propuesta-tecnologica.md` y `dependencias-equipos.md`.
- Nicole valida el stack; Camila, Jesica y Sofía revisan impacto en frontend/accesibilidad/responsive.

### Domingo 30/08 — Revisión y consistencia (todo el equipo)
- Revisión cruzada; chequeo anti-alucinación de cada dato (proveedor, monto, aspecto técnico).
- Verificar montos con fecha y advertencia de revalidar.

### Lunes 31/08 — Reunión y cierre (el equipo)
- Presentar propuesta tecnológica, estructura, dependencias y decisiones bloqueadas.
- Coordinar con Infraestructura (VPS), Dirección (hosting separado, dominio) y Backend (contratos).

## 6. Entregables mínimos al lunes 31/08

1. Home navegable con datos simulados (acceso visible a Moodle e inscripción).
2. Estructura del proyecto + propuesta tecnológica + lista de componentes.
3. Lista explícita de dependencias y bloqueos con UX/UI, Backend, Infra y QA.
4. `npm run lint` · `npm run build` · `npm run test` en verde.
5. Asignación de roles registrada en `rol_equipo.md`.

## 7. Entregables obligatorios de Frontend según PAUTAS (sección 10.3)

Referencia de cumplimiento del área a lo largo de la práctica:

- Estructura frontend versionada.
- HTML semántico y componentes reutilizables.
- CSS/Tailwind organizado y responsive.
- Interacciones JavaScript necesarias.
- Integración con datos/API o mocks documentados.
- Estados de carga, error, vacío y éxito cuando correspondan.
- Evidencia responsive.
- README de ejecución y estructura.
- Lista de decisiones técnicas frontend.
- Versión estable para demo y respaldo.

## 8. Dependencias y pendientes multi-equipo

- **Análisis funcional**: minuta V2 de correcciones y mapa del sitio validado.
- **UX/UI**: mapa del sitio, wireframes, navegación y criterios visuales.
- **Backend**: contratos de API, estructura de datos, autenticación y endpoints.
- **Infraestructura**: restricciones de build/despliegue (frontend estático en VPS/Nginx) y
  confirmaciones del Plan B.
- **QA**: versiones navegables tempranas para responsive, enlaces y accesibilidad.
- **IFTS N.º 12**: URLs oficiales de Moodle e inscripción.

El detalle por área con responsables y estados está en `documentacion/frontend/dependencias-equipos.md`.
Los bloqueos se comunican al enlace del área correspondiente; no se resuelven unilateralmente.

## 9. Criterios de aceptación de la documentación

- Toda afirmación proviene de una fuente leída en la sesión actual; nada inventado.
- Los montos están fechados (28/08/2026) y señalados como revisables antes de contratar.
- Cada dependencia tiene dueño y equipo al que se le comunica.
- Los documentos son consistentes entre sí (plan, propuesta tecnológica, dependencias, roles).
- `documentacion/driveFrontend/` no se versiona.

## 10. Antecedentes y documentos relacionados

- `documentacion/driveFrontend/*.docx` y `*.pdf` — fuentes de verdad (no versionadas).
- `documentacion/frontend/propuesta-tecnologica.md` — stack frontend + infraestructura del VPS.
- `documentacion/frontend/dependencias-equipos.md` — bloqueos y decisiones por área.
- `documentacion/rol_equipo.md` — asignación de roles del equipo Frontend.
