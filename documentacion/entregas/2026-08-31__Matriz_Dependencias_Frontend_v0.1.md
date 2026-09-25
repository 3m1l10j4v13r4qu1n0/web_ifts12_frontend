# Matriz de Dependencias - Equipo Frontend

Área: Frontend (enlace transversal: Emilio Aquino) · Proyecto Sitio Web Institucional IFTS N.º 12 — 2026 Consolidación de las dependencias de la Tarea Inicial y del Plan B de Infraestructura. Fuentes: `documentacion/frontend/dependencias-equipos.md`, `documentacion/driveFrontend/` (minuta 27/08, Tarea Inicial, Plan B, PAUTAS), `docs/06_audits/audit_2026-09-09-infraestructura.md` (09/09/2026), `documentacion/driveFrontend/05_infraestructura/bloqueo_infra.md`.

> Regla: los bloqueos se comunican al enlace del área correspondiente; **no se resuelven unilateralmente**.

------------------------------------------------------------------------

## Dependencias que Frontend Necesita de Otros Equipos

| Debe entregar | Necesidad | Fecha requerida (aprox.) | Responsable | Estado |
|----|----|----|----|----|
| **Análisis** | Minuta de Correcciones y Aclaraciones (V2) | Referencia obligatoria de la tarea inicial | Análisis | Bloqueado |
| **Análisis** | Mapa inicial del sitio validado | Estructura de navegación definitiva; hoy se usa el mapa inicial | Análisis | Bloqueado |
| **Análisis** | Contenidos institucionales (normativa, autoridades, planes, horarios) | No se inventan afirmaciones institucionales | Análisis | Bloqueado |
| **UX/UI** | Wireframes y mapa de navegación | Jerarquía visual, menú, componentes y criterios responsive | UX/UI | Bloqueado |
| **UX/UI** | Criterios visuales y paleta de colores | Regla 90/10; paleta por carrera si corresponde | UX/UI | Bloqueado |
| **UX/UI** | Flujo de las secciones (carreras, ingreso, etc.) | Navegación y recorridos | UX/UI | Bloqueado |
| **Backend** | Contratos de API (tabla oficial de endpoints) | Tabla vacía; prohibido inventar endpoints | Backend | Bloqueado |
| **Backend** | Esquemas de datos (types/api) | Reflejar exactamente los esquemas del backend | Backend | Bloqueado |
| **Backend** | Códigos de error y mensajes | Manejo en interceptor global de Axios | Backend | Bloqueado |
| **Backend** | Autenticación y permisos | No se implementa auth real hasta soportarla | Backend | Bloqueado |
| **Backend** | Datos de prueba | Para etapas de integración | Backend | Bloqueado |
| **Backend** | URL definitiva de la API (`VITE_API_BASE_URL`) y endpoints `/api/` | Definir `API_BASE_URL` real en `.env.production` | Backend + Infra | Pendiente |
| **Infraestructura** | Aprobación del VPS independiente del Moodle | Habilita contratar/desplegar | Infra + Dirección | Pendiente |
| **Infraestructura** | Restricciones de build/despliegue | Define si el frontend se sirve estático desde Nginx | Infra | Parcialmente definido |
| **Infraestructura** | Cotizaciones formales de VPS (al menos 3 proveedores) | Precios orientativos a validar | Infra | Pendiente |
| **Infraestructura** | Lista final de variables `VITE_*` (¿3 o 6 keys?) (INF-G2) | Habilitar `.env.example` y migrar a `import.meta.env` | Infra + Frontend | Pendiente (recordatorio: `documentacion/driveFrontend/05_infraestructura/bloqueo_infra.md`) |
| **Infraestructura** | Aplicar cabeceras de seguridad + `client_max_body_size 15m` en Nginx del servidor (INF-E1/E2) | Config real del VPS; el ejemplo ya está completo | Infra | Pendiente |
| **Infraestructura** | Resultado de la reunión con Oscar (Moodle): Plan B, subdominio `campus`, redirecciones 301 (INF-J1) | Ajustar `enlaces.ts` y decisiones de build | Infra | Pendiente |
| **IFTS N.º 12 / Dirección** | URLs oficiales (Moodle, inscripción, SIU, constancias, mesas, calendario) | Placeholders hasta recibirlas; completar `.env.production` | IFTS | Pendiente |
| **IFTS N.º 12 / Dirección** | Dominio y aprobación de hosting separado | Precondición para NIC Argentina y VPS | Dirección | Pendiente |
| **QA** | Ambiente de testing y criterios de aceptación | Validación previa a cada liberación | QA | Pendiente |

------------------------------------------------------------------------

## Lo que Frontend Debe Entregar a Otros Equipos

| Debe entregar | A quién | Necesidad | Fecha comprometida (aprox.) | Responsable | Estado |
|----|----|----|----|----|----|
| Home navegable con datos simulados | Análisis, UX/UI | Validación de estructura y contenidos | 07/09/2026 | Camila González | Listo |
| Versión navegable temprana | QA | Pruebas de responsive, enlaces, accesibilidad e integración | 14/09/2026 | Jesica Hinojosa Guevara | Pendiente |
| Estructura del proyecto + propuesta tecnológica | Infra, Backend | Configuración de entorno y despliegue | 31/08/2026 | Nicole Vargas Callejas | Listo |
| Lista de componentes reutilizables | UX/UI, QA | Implementación y pruebas | 14/09/2026 | Nicole Vargas Callejas | En curso |
| Build estático del frontend | Infra | Publicación en el VPS con Nginx | A definir con Infra | Nicole Vargas Callejas | Pendiente |
| Propuesta tecnológica alineada a la especificación infra (§6 versiones, dimensionamiento, subdominios, TLS/HSTS) | Infra | Config real del VPS sin ambigüedades | 09/09/2026 | Emilio Aquino | Listo |
| Política de optimización de imágenes (WebP/SVG ≤ 500 KB) | Infra | Criterio de assets (INF-C1) en `propuesta-tecnologica.md` §9 | 09/09/2026 | Emilio Aquino | Listo |
| `.env.example` + migración a `import.meta.env` | Infra | Cerrar INF-G1 al definirse la lista de variables | Al confirmar lista `VITE_*` | Nicole Vargas Callejas | Pendiente (bloqueado por INF-G2) |
| Bloque Nginx de ejemplo completo (cabeceras + `client_max_body_size 15m`) | Infra | Base para la config real (INF-H1) | 09/09/2026 | Emilio Aquino | Listo |

## Dependencias Transversales (no se resuelven unilateralmente)

| Descripción | Áreas involucradas | Estado |
|----|----|----|
| Validación del stack tecnológico | Frontend, Backend, Infra | A validar |
| Paleta / criterios visuales oficiales | UX/UI, Frontend | A validar |
| Mapa del sitio y navegación definitiva | Análisis, UX/UI, Frontend | Bloqueado |
| Contratos de API y esquemas | Backend, Frontend | Bloqueado |
| Aprobación del VPS y estrategia de despliegue | Dirección, Infra, Frontend | Pendiente |
| URLs oficiales (Moodle, inscripción, SIU, constancias, mesas, calendario) | IFTS N.º 12, Frontend | Pendiente |
| Definición de variables de entorno del build | Infra, Frontend | Pendiente (INF-G2) |

------------------------------------------------------------------------

## Historial de Cambios

| Fecha | Cambio | Motivo |
|----|----|----|
| 31/08/2026 | Se consolida la matriz con las dependencias reales del equipo | Formalización en docs/entregas para la reunión |
| 09/09/2026 | Se agregan dependencias de la auditoría de infra (INF-E1/E2, INF-G2, INF-J1, reunión Oscar, URLs oficiales) y se marcan Listo los entregables resueltos | Actualización por auditoría de infraestructura y rama `feature/implementacion-infra` |

------------------------------------------------------------------------

**Elaborado por:** Nélida Fernández (Responsable de documentación) **Fecha de emisión:** 31/08/2026 **Revisado por:** Emilio Aquino (Coordinador/PM)
