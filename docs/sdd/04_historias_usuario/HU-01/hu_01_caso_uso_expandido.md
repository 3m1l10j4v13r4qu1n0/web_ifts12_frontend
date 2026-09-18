# HU-01: Caso de Uso Expandido — Home institucional pública

Fecha: 2026-09-18 · Estado: borrador

**Actor Principal**: Visitante anónimo (futuro ingresante, estudiante o público general).

**Precondición**: El sitio se encuentra operativo y la Home responde al recorrido público
sin requerir autenticación (RN-05).

## Flujo Principal (Éxito)

1. El visitante ingresa a la URL principal del sitio y el sistema renderiza la Home.
2. La Home muestra la portada con el menú principal del Mapa del Sitio V2 (9 ítems) y el
   buscador global persistente.
3. La Home presenta los accesos destacados (Campus Virtual Moodle, inscripción oficial del
   GCBA y carreras) cuando existen URLs oficiales (RF-03, RF-12, RF-28; RN-01, RN-10).
4. La Home presenta los accesos rápidos confirmados (7: Moodle, SIU, inscripción GCBA,
   becas, constancias, mesas de examen y calendario académico) (RN-08).
5. La Home lista las carreras (6) con nombre, modalidad y horarios cuando existen (RF-01,
   RF-04).
6. La Home muestra el slider de novedades con las noticias ordenadas de la más reciente a
   la más antigua, con el último mes visible (RF-25; RN-03).
7. La Home muestra las comunidades (tutoría, alumnos y docentes) y las preguntas
   frecuentes organizadas por segmento (RF-06, RF-14).
8. El visitante navega hacia la sección o el enlace externo que le interesa.

## Flujo Alternativo 1: Sin URL oficial de un servicio externo

1. (Pasos 1-2 del flujo principal).
2. El sistema detecta que la URL oficial (Moodle o inscripción GCBA) está vacía
   (placeholder en `src/constants/enlaces.ts`).
3. El CTA externo correspondiente se oculta o se atenúa.
4. El resto de las secciones de la Home se renderiza con normalidad (RN-10).

## Flujo Alternativo 2: Sin noticias o sin contenidos de una sección

1. (Pasos 1-4 del flujo principal).
2. El sistema no recibe datos de una sección (ej. slider/noticias vacío).
3. La sección muestra su estado vacío (empty state) sin romper el resto de la Home.

## Flujo Alternativo 3: Error al consultar la API

1. (Pasos 1-2 del flujo principal).
2. Una o más consultas a la API fallan.
3. El interceptor global de Axios normaliza el error con la estructura
   `{ error: { code, message, details } }` y la Home muestra el estado de error de la
   sección afectada (RN-13).

## Postcondición

- El visitante accede, desde la Home, al Campus Virtual (Moodle), a la inscripción oficial
  del GCBA, a carreras, noticias, comunidades, FAQ y al resto de las secciones del sitio.
- No se muestran enlaces externos sin URL oficial confirmada (RN-10).

## Referencias

IFTS N.º 12. (2026). Análisis funcional validado. `docs/frontend/analisis_funcional_validado.md`.

Equipo de UX/UI. (2026). Mapa del Sitio V2. `docs/driveFrontend/02_ux_ui/mapa_inicial_sitio_web_ifts12_2026_v2.md`.