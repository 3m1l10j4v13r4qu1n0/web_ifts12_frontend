# HU-01: Modelos de Datos — Home institucional pública

Fecha: 2026-09-18 · Estado: borrador

## Resumen

Esta historia de usuario impacta las entidades base que la Home consume y muestra. Los
campos se deducen del modelo de datos global y de los tipos de dominio implementados en el
frontend (`src/types/domain/sitio.types.ts`). Salvo indicación, los DTOs exactos del
backend dependen de la tabla Swagger/OpenAPI (entrega 2) y se marcan ⏳.

## 1. Entidades involucradas

| Entidad | Campos deducidos | Estado |
|---|---|---|
| `Slider` | Imágenes/textos del carrusel activo de la Home | ⏳ Ruta `/api/slider` confirmada; DTO pendiente |
| `Noticia` | `id`, `titulo`, `resumen`, `fecha` (ISO), `imagenUrl` (opcional), `enlace` (opcional) | 🟡 Mocks; DTO ⏳ |
| `Carrera` | `id`, `nombre`, `descripcionBreve`, `modalidad`, `horarios` (opcional) | 🟡 Mocks (6); DTO ⏳ |
| `FaqItem` | `id`, `categoria`/`segmento` (`ingresantes`, `estudiantes`, `docentes`, `institucional`), `pregunta`, `respuesta` | 🟡 Mocks; API `?segmento=X` |
| `AccesoRapido` | `id`, `titulo`, `descripcion`, `href` | 🟡 Mocks; URLs externas 🔵 |
| `Comunidad` | `id`, `titulo`, `descripcion`, `href` (tutoría, alumnos, docentes) | 🟡 Mocks |

> Tabla 1. Entidades de la Home y estado de confirmación (fuente:
> `src/types/domain/sitio.types.ts`; Modelo de Datos Global, 2026).

## 2. Reglas de integridad y datos

- Las noticias se ordenan de la más reciente a la más antigua y el último mes permanece
  visible (RN-03).
- Las FAQ se organizan por segmento/categoría (RN-14).
- El listado de carreras contiene las 6 carreras confirmadas, con modalidad obligatoria y
  horarios opcionales (RF-01, RF-04).
- Los `href` de los accesos externos (Moodle, inscripción GCBA, SIU, constancias, mesas,
  calendario) son placeholders vacíos hasta recibir las URLs oficiales (RN-10).
- El frontend tipa las respuestas de API en `src/types/api/` como espejo de los DTOs del
  backend; no persiste datos.

## Referencias

Equipo de Frontend. (2026). Tipos de dominio del sitio. `src/types/domain/sitio.types.ts`.

Equipo de Frontend. (2026). Enlaces institucionales (placeholders). `src/constants/enlaces.ts`.

Equipo de Frontend. (2026). Modelo de Datos Global. `docs/02_technical/modelo_datos_global.md`.