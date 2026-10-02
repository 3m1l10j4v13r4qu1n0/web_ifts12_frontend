# Documento de Alcance — Sitio Web Institucional IFTS N.º 12

Fecha: 2026-09-18 · Estado: borrador

## Resumen

El alcance define qué se construye en cada etapa del sitio web institucional del IFTS N.º
12, una aplicación web pública con panel de administración de contenidos, complementaria al
Campus Virtual Moodle. Fuera del alcance quedan el asistente virtual (etapa C), el login
público (privativo del personal administrativo) y la gestión online de títulos y traspasos
(informativa en v1). La fuente de verdad funcional es el análisis funcional validado de
18/09/2026, cuyos requisitos RF-01…RF-34 se mapean por sección.

## 1. Descripción general

El sistema es un sitio web público que muestra información institucional de carreras,
ingreso, trámites para estudiantes, cuerpo docente, novedades, FAQ y contacto, con acceso
directo al Campus Virtual (Moodle) y enlace oficial de inscripción del GCBA. El contenido
dinámico (noticias, carrusel, calendarios, autoridades, docentes, becas, tutorías) se
administra mediante un panel de administración que persiste los datos en una base de datos
gestionada por el backend (Análisis Funcional, 2026).

## 2. Funcionalidades incluidas (etapa A / primera versión)

| Sección | Funcionalidades | Requisitos |
|---|---|---|
| Futuros ingresantes | Listado de las 6 carreras con modalidad y horarios; requisitos y fechas de inscripción; enlace oficial GCBA visible; equivalencias y pases informativos; FAQ de ingreso | RF-01…RF-06 |
| Estudiantes actuales | Condiciones de regularidad; constancias; mesas de examen; becas; calendario académico; acceso visible al Campus Virtual (Moodle); boleto estudiantil informativo; FAQ de trámites | RF-07…RF-14 |
| Docentes | Concursos docentes; cuerpo docente por carrera; accesos de interés docente | RF-15…RF-17 |
| Institucional | Historia, autoridades, normativa, logos; contacto con dirección y horario nocturno (Misiones 26, C1083 ABB, CABA); bedeles; acceso visible a SIU (pendiente de confirmación); títulos y traspasos informativos; enlaces de interés (Ciudad Bilingüe, Centro de Simulación) | RF-18…RF-22, RF-29…RF-33 |
| Home | Portada/slider institucional; noticias recientes (último mes visible); FAQ destacadas; accesos destacados y rápidos (7 confirmados) | RF-25, RF-28, RF-34 |
| Administración | Login exclusivo para el personal que administra contenidos; roles y permisos por tipo de contenido; CRUD de noticias/novedades; actualización de calendario, horarios, autoridades, docentes, información de carreras y concursos; contenidos persistidos en base de datos; actualización de imágenes del slider | RF-23…RF-27, RF-34 |

> Tabla 1. Funcionalidades incluidas por sección y requisitos asociados (fuente: Análisis
> Funcional, 2026).

## 3. Funcionalidades fuera de alcance

- **Asistente virtual (bot):** queda fuera de la primera versión (etapa C / futuro).
- **Login público:** el acceso al panel es exclusivo del personal que administra contenidos;
  el contenido informativo es público (RF-23).
- **Gestión online de títulos y traspasos entre IFTS:** en v1 solo versiones informativas;
  la gestión como trámite online se prevé en la etapa B.
- **Integraciones profundas con SIU:** etapa C.
- **Diseño de identidad visual definitivo:** responsabilidad del equipo de UX/UI (wireframes,
  paleta y sistema de diseño); el sitio sigue la navegación del Mapa del Sitio V2.

## 4. Límites del sistema

- El sitio consume datos provistos por el backend (carreras, noticias, FAQ, slider,
  calendario, horarios, docentes, autoridades, bedeles, becas y tutorías) y las URLs
  oficiales externas (Moodle, inscripción GCBA, SIU) definidas por el instituto.
- Los contenidos reales (textos definitivos, logos, URLs, datos de bedeles y SIU) dependen
  del instituto/Dirección y **no se inventan** (🔵/⏳ hasta que se confirmen).
- El frontend se despliega como build estático servido por Nginx en un VPS independiente del
  Moodle (Plan B de infraestructura).

## 5. Criterios de aceptación del alcance

El alcance de la etapa A se considerará cumplido cuando:

- La Home muestre portada/slider, accesos directos a Moodle, SIU e inscripción GCBA, los 7
  accesos rápidos confirmados, noticias recientes, carreras y FAQ.
- El listado de carreras incluya las 6 carreras con modalidad y horarios.
- Las noticias se muestren de la más reciente a la más antigua, con el último mes visible.
- El panel de administración permita gestionar noticias y otros contenidos dinámicos con
  login y roles.
- No se publiquen textos, URLs ni datos institucionales inventados; lo no confirmado queda
  marcado como pendiente.

## Referencias

IFTS N.º 12. (2026). Análisis funcional validado. `documentacion/frontend/analisis_funcional_validado.md`.

Equipo de Backend. (2026). Respuesta a definiciones técnicas formales. `documentacion/driveFrontend/04_backend/respuesta.md`.