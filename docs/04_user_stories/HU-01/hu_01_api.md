---
tags: [hu-01, api, backend]
---

# HU-01: API pública verificada en el primer despliegue

Fecha: 31 de octubre de 2026. Estado: integrado en TEST; QA pendiente.

## Fuente de verdad

Código del Git central del ODROID, rama `fix/integracion-test-20261031`.
El prefijo real es `/api/v1`. Las referencias históricas a `/api` sin versión y
a una base de ejemplos anterior no describen este primer despliegue.

## Recursos consumidos

| Recurso | Uso y contrato |
|---|---|
| GET `/carreras` | Lista paginada de carreras activas con planes activos; todas las páginas |
| GET `/carreras/:id` | Detalle del recurso existente |
| GET `/planes-estudio/:id` | Materias ordenadas del plan; anio, cuatrimestre, materia |
| GET `/materias` | Programas y docentes de cada materia; filtrado por los IDs del plan en la vista |
| GET `/novedades` | Paginación; cuerpo y fecha se adaptan a contenido y fecha_publicacion |
| GET `/slider` | Fotografías de portada activas y su orden |
| POST `/contacto` | nombre (100), email (120), mensaje; registro persistente, respuesta 201 |
| GET `/faqs` | Existe, pero la vista segmentada todavía utiliza el catálogo local |

Tabla 1. Recursos contrastados con rutas y modelos del Backend actual.

Las colecciones responden `{data, page, size, total, total_pages}`. Detalle:
`{data: objeto}`. Error: `{error: mensaje}`. `page` y `size` comienzan en 1.
La API no devuelve categoría en novedades. No se infieren fechas de noticias ni
categorías para las fotografías institucionales.

## Contenidos y límites

Se incorporaron cinco carreras y planes, cincuenta materias, treinta y cinco
docentes, veinticuatro relaciones de plan y cuarenta y nueve relaciones docentes,
cinco FAQ y dos imágenes de portada a la base creada desde los modelos del Git.
No se ejecutó el seed antiguo que borra tablas y agrega ejemplos.

Los cinco PDF, dos fotos y logos originales tienen procedencia y SHA-256 en
`deploy/fuentes.json`. La duración de cinco cuatrimestres se conserva en la
presentación cuando consta en el material: el modelo actual solo admite años
enteros y no se cargó un valor falso para representar dos años y medio.

El formulario confirma que la consulta quedó registrada; no promete envío de
correo. La web tiene contenido institucional pendiente y controles deshabilitados
cuando falta el destino real. No hay enlace validado de inscripción GCBA.
El buscador opera sobre carreras/novedades de la API y secciones/FAQ locales;
no existe un endpoint remoto de búsqueda.

## Verificación

Pruebas HTTPS y navegador: portada, carrusel, carreras y ficha con materias y
docentes reales, PDFs, buscador, acordeones y filtros de FAQ, contacto, navegación
móvil y tablet. Se corrigió el buscador para permitir seleccionar con teclado y
abrir todos los resultados sin desmontar el enlace antes del clic.

## Referencias

- `src/api/services/carrera.service.ts`, `novedad.service.ts`, `contenido.service.ts` y `contacto.service.ts`.
- `src/types/api/despliegue.schema.ts`, `src/types/api/contenido.schema.ts`.
- `deploy/fuentes.json`, `deploy/test.env`.
