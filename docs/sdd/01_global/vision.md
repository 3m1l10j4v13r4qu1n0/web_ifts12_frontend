# Visión del Proyecto — Sitio Web Institucional IFTS N.º 12

Fecha: 2026-09-18 · Estado: borrador

## Resumen

El proyecto consiste en el desarrollo del sitio web institucional del Instituto de
Formación Técnica Superior (IFTS) N.º 12, como **complemento del Campus Virtual Moodle
existente y no como reemplazo** (Análisis Funcional, 18/09/2026). El nuevo sitio debe
ofrecer una presencia institucional pública con información de carreras, vías de ingreso,
trámites para estudiantes, novedades y preguntas frecuentes, y garantizar el acceso
visible y directo al Campus Virtual (Moodle) y al enlace oficial de inscripción del GCBA.
El contenido informativo es público; el login queda reservado, en una primera versión, al
personal que administra contenidos. La institución debe poder gestionar el sitio sin
depender de un proveedor externo, para lo cual se prevé un panel de administración propio.
La implementación se organiza por etapas (A: primera versión, B: segunda etapa, C:
futuro/evolución), dejando fuera de la versión inicial el asistente virtual (bot). El
contenido institucional real (textos definitivos, URLs oficiales, logos) queda pendiente
del instituto y no debe inventarse.

## 1. Contexto

### 1.1 Situación actual

El IFTS N.º 12 cuenta con un Campus Virtual basado en Moodle. La información institucional
relativa a carreras, modalidades, horarios, trámites y novedades no tiene un canal público
centralizado acorde (Análisis Funcional, 2026).

### 1.2 Relación con el Campus Virtual

Dotar al sitio de un acceso visible y directo al Campus Virtual (Moodle) desde la Home
(RF-12, RF-28) y mantener ambos servicios independientes y alojados en servidores
distintos (Plan B de infraestructura).

## 2. Visión

Modernizar y centralizar la comunicación institucional del IFTS N.º 12, ofreciendo un
sitio público donde futuros ingresantes, estudiantes, docentes y público general
encuentren carreras, requisitos de inscripción, calendario, mesas de examen, becas,
constancias, tutorías, FAQ y novedades actualizadas, con acceso directo al Campus Virtual
(Moodle) y al enlace oficial de inscripción del GCBA.

## 3. Objetivos

1. Publicar la oferta académica (6 carreras) con modalidad y horarios (RF-01, RF-04).
2. Garantizar accesos directos y visibles al Campus Virtual (Moodle) y a la inscripción
   oficial (RF-03, RF-12, RF-28).
3. Exponer los 7 accesos rápidos confirmados de la Home (Moodle, SIU, inscripción GCBA,
   becas, constancias, mesas de examen y calendario académico).
4. Presentar noticias/novedades de la más reciente a la más antigua, con al menos el
   último mes visible en la Home (RF-25).
5. Ofrecer FAQ por segmento (ingresantes, estudiantes, docentes, institucional)
   (RF-06, RF-14).
6. Permitir a la institución administrar el contenido dinámico mediante un panel propio
   con login para administradores (RF-23, RF-27).

## 4. Alcance temporal (etapas)

Seguir la propuesta de alcance por etapas del análisis funcional validado
(`docs/frontend/analisis_funcional_validado.md`, 18/09/2026):

| Etapa | Contenido | Estado |
|---|---|---|
| A — Primera versión | Home con carrusel/slider, accesos directos y noticias; Carreras; comunidades; institucional (incluye bedeles); FAQ por segmento; noticias con CRUD; accesos externos visibles; títulos y traspasos informativos; login y panel de administración básico | ⏳ En curso |
| B — Segunda etapa | Solicitud de títulos y traspasos como trámites gestionables online; mejoras de interactividad en el carrusel; ampliación de roles y permisos | 🔵 Pendiente (bloqueado por etapas) |
| C — Futuro / evolución | Bot/asistente virtual institucional (fuera de v1); integraciones más profundas con SIU | 🔵 Fuera de v1 |

> Tabla 1. Etapas de implementación del sitio (fuente: Análisis Funcional, 2026).

## Referencias

IFTS N.º 12. (2026). Análisis funcional validado. `docs/frontend/analisis_funcional_validado.md`.