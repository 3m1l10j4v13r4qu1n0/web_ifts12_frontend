---
# Tags del índice de memoria (D13): el CLI las scaffoldea, el Mentat ajusta.
tags:
  - revision
  - consumo
  - api
  - novedades
---

# Revisión del consumo de API

> Documento de Capa 2 — Técnico. Detalle de implementación y decisión pendiente surgidos de la
> revisión de la rama `feature/consumo-api-carreras-novedades` (observación 2), 08/10/2026.

Fecha: 2026-10-08 · Estado: borrador

## Resumen

Registra el único punto pendiente de la revisión del consumo de API: el **guard de `contenido`
en `NotaCompletaPage`**. Hoy no hay defecto observable porque el contrato garantiza el campo, pero
la decisión de mantener la confianza en el schema o agregar un guard defensivo — y el formato
exacto de `contenido` — queda pendiente de validar con Backend y Contenidos/Coordinación.

## Fuente

- Origen: `inbox/_done/feedback_review_consumo_api_2026-10-08.md` (recibido el 2026-10-08).
- Origen de la revisión: rama `feature/consumo-api-carreras-novedades`, observación 2
  (08/10/2026).
- Relacionado: `docs/02_technical/contrato_api_backend.md`,
  `docs/02_technical/estado_implementacion.md`.

## Qué establece

### Pendiente: guard de `contenido` en `NotaCompletaPage`

- **Archivo:** `src/pages/NotaCompletaPage.tsx:74` — `{noticia.contenido}` se renderiza sin guard.
- **Estado actual:** el contrato garantiza el campo (`src/types/api/novedad.schema.ts:17`,
  `z.string().min(1)`; `models.py:56`, `nullable=False`), así que hoy no hay defecto observable.
- **Decisión pendiente (requiere fuente de verdad de Backend/Contenidos):** ¿se mantiene la
  confianza en el schema (sin guard) o se agrega un guard defensivo ante futuros cambios del
  contrato? Sumado a eso, queda por definir el formato exacto de `contenido` (texto plano con
  saltos de línea, HTML o Markdown) para validar cómo se renderiza.

> Destino sugerido: planificar cuando se valide contenido real con el equipo de Backend y de
> Contenidos/Coordinación (los textos institucionales son fuente de verdad externa).

## Cómo se valida

- El pendiente se cierra cuando Backend/Contenidos confirme el formato de `contenido`, momento en
  que se decide si corresponde un guard defensivo y cómo se renderiza el campo.
- Mientras la fuente de verdad externa no responda, el contrato vigente
  (`novedad.schema.ts` + `models.py`) sigue garantizando el campo, por lo que no se introduce
  cambio de código sin confirmación.
