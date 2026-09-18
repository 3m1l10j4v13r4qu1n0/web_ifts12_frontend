# HU-01: Especificación de API — Home institucional pública

Fecha: 2026-09-18 · Estado: borrador

## Resumen

Los endpoints de la Home se deducen de las rutas públicas confirmadas por el backend el
15/09/2026 (`docs/driveFrontend/04_backend/respuesta.md` y auditoría
`docs/sdd/06_auditorias/auditoria-backend.md`). Todos usan el prefijo `/api/` (sin
`/api/v1/`, hallazgo BE-A1). Los DTOs exactos (bodies y esquemas) llegan con la tabla
Swagger/OpenAPI (entrega 2 de Backend); mientras tanto, los campos ilustrativos se basan en
los mocks actuales y se marcan ⏳.

## 1. Endpoints de la Home

| Método | Ruta | Propósito en la Home |
|---|---|---|
| GET | `/api/slider` | Carrusel/slider institucional activo de la Home |
| GET | `/api/noticias` | Noticias para el slider y listado reciente→antigua |
| GET | `/api/carreras` | Listado de las 6 carreras para la sección Carreras de la Home |
| GET | `/api/faqs?segmento=X` | FAQ destacadas de la Home filtradas por segmento (`ingresantes`, `estudiantes`, `docentes`, `institucional`) |

> Tabla 1. Endpoints públicos consumidos por la Home (fuente: Respuesta del Backend, 2026).

## 2. Respuestas ilustrativas (basadas en mocks, DTO ⏳)

> Los contratos definitivos de request/response los define la tabla Swagger/OpenAPI del
> backend. Las estructuras de abajo ilustran el formato esperado a partir de los datos
> simulados actuales (`src/constants/mock-data.ts`) y **no reemplazan** el contrato oficial.

### 2.1 `GET /api/carreras`

```json
{
  "id": "c1",
  "nombre": "Desarrollo Web",
  "descripcionBreve": "Descripción breve de la carrera",
  "modalidad": "Presencial",
  "horarios": "Turno nocturno"
}
```

### 2.2 `GET /api/noticias`

```json
{
  "id": "n1",
  "titulo": "Título de la novedad",
  "resumen": "Resumen de la novedad",
  "fecha": "2026-09-01",
  "imagenUrl": null,
  "enlace": null
}
```

### 2.3 `GET /api/faqs?segmento=ingresantes`

```json
{
  "id": "f1",
  "categoria": "ingresantes",
  "pregunta": "¿Cuándo comienza la inscripción?",
  "respuesta": "Respuesta institucional pendiente de validación"
}
```

## 3. Manejo de errores

- Todas las respuestas de error usan la estructura estandarizada
  `{ "error": { "code", "message", "details" } }` y se gestionan en el interceptor global
  de Axios (RN-13; `src/types/api/error.types.ts`).
- Estados de UI obligatorios en la Home: loading, error y empty state por sección.

## 4. Notas del contrato

- Los enlaces externos (Moodle, inscripción del GCBA y SIU) **no son endpoints** del
  backend: son URLs de variables de entorno (`VITE_MOODLE_URL`, `VITE_INSCRIPCION_URL`) que
  el frontend resuelve desde `src/constants/enlaces.ts` (RN-10).
- `/api/contacto` (POST) no fue confirmado por el backend (BE-A6); la búsqueda global
  tampoco tiene endpoint (el buscador actual filtra contenido local).

## Referencias

Equipo de Backend. (2026). Respuesta a definiciones técnicas formales. `docs/driveFrontend/04_backend/respuesta.md`.

Equipo de Frontend. (2026). Auditoría de Backend. `docs/sdd/06_auditorias/auditoria-backend.md`.