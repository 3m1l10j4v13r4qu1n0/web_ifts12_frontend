---
fase: fase-10
---

# Estado del proyecto — IFTS N.º 12

Snapshot verificado el 31 de octubre de 2026. El histórico permanece en Git y bitácoras.

## Fase actual del roadmap

Primer despliegue TEST e integración autorizados por el profesor, sobre el trabajo
existente de la Fase 10. Rama `fix/integracion-test-20261031`, base Front
`33f995448f31e94895db1f40497004a940848b8f`; base Back
`dff587c1a716008d5c8149cb98d07a7b0dc88a2e`. Main/develop no se modificaron.

## Qué está construido

- Sitio publicado en https://ifts12-test.tail5bd71a.ts.net/ con Nginx y API Flask/Gunicorn en el ODROID.
- Login real y panel CRUD visual de carreras, planes, materias, docentes y dos relaciones; baja y reactivación.
- SQLite persistente creada desde los modelos actuales. No existía una base institucional desplegada; no se usó el seed destructivo de ejemplos.
- Carreras/planes/materias/docentes, novedades y carrusel consultan API real. Contacto registra en la base.
- Material institucional con fuente y checksum en `deploy/fuentes.json`; cinco PDF oficiales, dos fotos y logos originales.
- Footer conserva fondo oscuro original, logos blancos con fondo transparente por CSS, proporciones ajustadas; enlace Administración configurable.
- Buscador usable con teclado; contacto con IDs únicos entre formularios y límites del modelo.

## Decisiones activas (últimas 3-5)

1. Conservar el desarrollo de los estudiantes; cambios solamente en ramas de integración nuevas.
2. Usar código real del Git como contrato. API `/api/v1`, detalles en HU-01 y HU-02.
3. Admin y Editor tienen temporalmente el mismo CRUD; permisos finos pendientes de definición del profesor.
4. No inventar contenidos, fechas ni enlaces institucionales. El material de Drive complementa datos comprobados.
5. Respaldo y restauración de la página anterior comprobados; releases separados de la base y secretos.

## Bloqueos abiertos (no resolver sin fuente)

- QA debe completar la revisión funcional y visual de todas las áreas.
- CRUD de novedades/FAQ/slider, gestión de consultas y cuentas, recuperación de acceso y revocación de tokens no implementados en Backend.
- FAQ segmentada aún usa catálogo local; falta contrato de categorías para conectarla por completo.
- Faltan contenidos y destinos para inscripción, calendarios, trámites, reglamentos, tutorías y datos institucionales. Permanecen controles deshabilitados.
- Modelo de duración solo acepta años enteros; faltan migraciones versionadas y completar planes/materias de otras carreras con información validada.
- Infra: Ubuntu 18.04 ARMv7, estado dpkg interrumpido anterior a esta tarea y reloj desfasado unos dos minutos. Runtime Python aislado, sin reparar paquetes globales.

## Verificación

Pruebas de API pública: 117/117; ambos roles, los seis CRUD, archivos y persistencia
tras reiniciar Backend. Recorridos adicionales en navegador: seis formularios del
Editor, bajas, reactivación, login/logout, publicación de materia/docente, FAQ,
búsqueda, contacto y menú móvil. Datos temporales retirados con respaldo previo.
Suite Front: 268 pruebas en 35 archivos, lint y TypeScript correctos.
Backend: 17 pruebas. Dependencias: cinco alertas corregidas con
actualizaciones compatibles; auditoría posterior sin alertas.
Logsayer presenta un fallo de reconocimiento de rutas con separadores Windows;
se conserva la evidencia sin alterar la organización documental de los alumnos.
Estas pruebas técnicas no sustituyen QA ni cierran las HU pendientes.

## HUs cerradas desde la última auditoría

0
