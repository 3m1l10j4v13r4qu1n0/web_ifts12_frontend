# Actores del Sistema — Sitio Web Institucional IFTS N.º 12

Fecha: 2026-09-18 · Estado: borrador

## Resumen

El sitio web institucional del IFTS N.º 12 es público: el contenido informativo no
requiere autenticación. Los actores del sistema se deducen de los perfiles de usuario
definidos en el análisis funcional validado: visitantes anónimos (público general, futuros
ingresantes, estudiantes, docentes y autoridades) y administradores de contenido, cuyo
acceso es el único que requiere login en la primera versión.

## 1. Descripción de actores

| Actor | Descripción | Qué necesita encontrar / hacer en el sitio |
|---|---|---|
| Visitante anónimo | Público en general que consulta el sitio sin identificarse | Navegar secciones públicas: carreras, institucional, novedades, FAQ y contacto |
| Futuro ingresante | Persona interesada en inscribirse en el instituto | Oferta de carreras con modalidad y horarios, requisitos y fechas de inscripción, enlace oficial GCBA, FAQ de ingreso, ubicación y contacto |
| Estudiante actual | Alumno regular del instituto | Calendario académico, mesas de examen, constancias, becas, tutorías, acceso directo al Campus Virtual (Moodle), FAQ de trámites |
| Docente | Cuerpo docente del instituto | Concursos docentes, calendario académico, acceso al Moodle, datos de contacto institucional |
| Autoridad | Directivos y responsables institucionales | Validar/aprobar contenidos publicados y visibilidad institucional (normativa, autoridades, historia) |
| Administrador de contenidos (IFTS) | Personal del instituto encargado de gestionar el sitio | Acceder al panel de administración (login exclusivo) para cargar noticias y actualizar contenidos dinámicos sin depender de un proveedor externo |

> Tabla 1. Perfiles de usuario del sitio (fuente: Análisis Funcional, 2026, §2).

## 2. Roles de acceso

- **Público (sin login):** toda la navegación informativa del sitio (etapas A, B y C).
- **Administrador de contenidos:** único perfil con acceso al panel en la primera versión
  (RF-23); el login no aplica a estudiantes ni al público general.

## 3. Sistema externo vinculado

- **Campus Virtual (Moodle):** sistema externo al cual el sitio deriva a estudiantes y
  docentes mediante acceso visible desde la Home (RF-12, RF-28). URL oficial pendiente
  (🔵 IFTS/Dirección); mientras tanto se usan placeholders vacíos.
- **Inscripción del GCBA:** servicio externo oficial al que el sitio enlaza para el
  trámite de inscripción (RF-03). URL oficial pendiente (🔵).

## Referencias

IFTS N.º 12. (2026). Análisis funcional validado. `docs/frontend/analisis_funcional_validado.md`.