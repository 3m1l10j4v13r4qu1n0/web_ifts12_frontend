# Modelo de Datos Global (Entidades Base) — Sitio Web Institucional IFTS N.º 12

Fecha: 2026-09-18 · Estado: borrador

## Resumen

El modelo de datos global describe las entidades base del sitio, que el backend persiste en
PostgreSQL y el frontend refleja en sus tipos (`src/types/domain/` y, a futuro,
`src/types/api/` como espejo de los DTOs). Se deducen de las entidades de dominio ya
implementadas con datos simulados y de las rutas públicas confirmadas por el backend
(15/09/2026). Los campos exactos de cada recurso dependen de la tabla Swagger/OpenAPI
(entrega 2 de Backend) y se marcan ⏳ donde aún no están confirmados.

## 1. Entidades base

| Entidad | Campos deducidos | Estado de confirmación |
|---|---|---|
| `Carrera` | `id`, `nombre`, `descripcionBreve`, `modalidad`, `horarios` (opcional) | 🟡 Mocks de Fase 4 (6 carreras); DTO ⏳ Swagger |
| `Noticia` | `id`, `titulo`, `resumen`, `fecha` (ISO), `imagenUrl` (opcional), `enlace` (opcional) | 🟡 Mocks; DTO ⏳ Swagger |
| `FaqItem` | `id`, `categoria`/`segmento` (`ingresantes`, `estudiantes`, `docentes`, `institucional`), `pregunta`, `respuesta` | 🟡 Mocks; API `/api/faqs?segmento=X` |
| `Slider` | Imágenes/textos del carrusel activo de la Home | ⏳ Solo ruta `/api/slider` |
| `Calendario` | Eventos del calendario académico | ⏳ Solo ruta `/api/calendario` |
| `Horario` | Horarios de cursada por carrera/cuatrimestre | ⏳ Solo ruta `/api/horarios` |
| `Docente` | Cuerpo docente | ⏳ Solo ruta `/api/docentes` |
| `Autoridad` | Autoridades del instituto | ⏳ Solo ruta `/api/autoridades` |
| `Bedel` | Bedeles y contacto | ⏳ Solo ruta `/api/bedeles` |
| `Beca` | Tipos, requisitos y procedimiento | ⏳ Solo ruta `/api/becas` |
| `Tutoria` | Espacio de tutorías | ⏳ Solo ruta `/api/tutorias` |
| `AccesoRapido` | `id`, `titulo`, `descripcion`, `href` (11 ítems en Home: 6 internos + 5 atenuados pendientes de URL) | 🟡 Mocks; URLs 🔵 instituto |
| `Comunidad` | `id`, `titulo`, `descripcion`, `href` (tutoría, alumnos, docentes) | 🟡 Mocks |
| `Usuario` / `Rol` | Usuario del panel con rol (`ADMIN`, `EDITOR`, `EDITOR_NOTICIAS` propuestos) | 🟡 Contrato de auth (entrega 3); roles a validar |
| `ApiErrorResponse` | `error: { code, message, details }` | ✅ Tipo espejo en `src/types/api/error.types.ts` |

> Tabla 1. Entidades base del modelo de datos global.

## 2. Reglas de integridad globales

- Las noticias se ordenan de la más reciente a la más antigua; el último mes queda visible
  en la vista principal (RN-03).
- Las FAQ se filtran por segmento/categoría (RN-14 / API `/api/faqs?segmento=X`).
- Las URLs oficiales externas (Moodle, inscripción GCBA, SIU) se representan como
  placeholders vacíos hasta que la institución las confirme (RN-10).
- Los valores controlados no se inventan: carreras (6), segmentos de FAQ y accesos (7
  confirmados) provienen del análisis funcional validado.
- El frontend no persiste datos: el modelo es espejo de la persistencia del backend
  (PostgreSQL).

## 3. Persistencia (backend)

La persistencia es responsabilidad del backend (Python/Flask + PostgreSQL). El frontend
recibe los datos por API y los tipa en `src/types/api/` reflejando los DTOs que el backend
entregará en la tabla Swagger/OpenAPI (entrega 2, 2026).

## Referencias

IFTS N.º 12. (2026). Análisis funcional validado. `docs/frontend/analisis_funcional_validado.md`.

Equipo de Backend. (2026). Respuesta a definiciones técnicas formales. `docs/driveFrontend/04_backend/respuesta.md`.

Equipo de Frontend. (2026). Propuesta tecnológica — Frontend e Infraestructura. `docs/frontend/propuesta-tecnologica.md`.

Equipo de Frontend. (2026). Estado actual del proyecto. `docs/sdd/estado_actual_proyecto.md`.