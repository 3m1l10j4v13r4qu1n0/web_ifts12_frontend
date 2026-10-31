---
tags: [hu-02, api, backend, admin]
---

# HU-02: API verificada para la administración

Fecha de verificación: 31 de octubre de 2026. Estado: implementado en TEST; revisión de QA pendiente.

## Alcance vigente

Se verificó el código del Git central `/srv/git/backend.git`, base
`dff587c1a716008d5c8149cb98d07a7b0dc88a2e`, y la rama
`fix/integracion-test-20261031`. Este documento reemplaza el contrato histórico
basado en otro `app.py`. No establece fechas de entrega para los equipos.

El profesor autorizó un CRUD académico visual básico. Administrador y Editor
tienen temporalmente las mismas operaciones de contenido. La autorización se
valida en Backend con el usuario activo y su rol actual en la base, no con el
valor guardado por el navegador.

## Endpoints reales

Prefijo del cliente: `/api/v1`, en el mismo origen público. Colecciones paginadas:
`{data: [], page, size, total, total_pages}`. Objeto individual: `{data: {}}`.
Error: `{error: "mensaje"}`. El panel recorre todas las páginas con `size=100`.

| Recurso | Métodos | Clave de detalle | Baja |
|---|---|---|---|
| `/carreras` | GET, POST; GET, PUT, PATCH, DELETE en detalle | `/:id` | `activa=false` |
| `/planes-estudio` | Ídem | `/:id` | `activo=false` |
| `/materias` | Ídem | `/:id` | `activa=false` |
| `/docentes` | Ídem | `/:id` | `activo=false` |
| `/planes-materias` | Ídem | `/:id` | Quita la relación |
| `/docentes-materias` | Ídem | `/:docente_id/:materia_id` | Quita la relación |

Tabla 1. Operaciones verificadas en `apps/careers/routes.py` y `apps/academic/routes.py` del Backend.

Escrituras y lecturas con `incluir_inactivas=true` requieren
`Authorization: Bearer <token>`. Sin sesión: 401. Rol ajeno a admin/editor: 403.
Validación: 400; inexistente: 404; conflicto de integridad: 409.
El panel usa POST para altas, PATCH para cambios y DELETE para bajas. Los primeros
cuatro recursos se reactivan editando la casilla Activo.

## Campos editables

- Carrera: nombre, titulo_otorgado, descripcion, activa.
- Plan: carrera_id, nombre, codigo, resolucion, duracion_anios (entero), vigente_desde, vigente_hasta, activo.
- Materia: nombre, descripcion, programa_url, activa.
- Docente: nombre, apellido, email, foto_url, descripcion, activo.
- Materia por plan: plan_estudio_id, materia_id, anio, cuatrimestre, orden.
- Docente por materia: docente_id, materia_id.

Los límites, obligatoriedad y tipos del formulario están en `src/constants/admin.ts`,
contrastados con los validadores del Backend. Los campos opcionales vacíos se
envían como null. No se inventaron campos de modalidad, horarios o correlatividades.

## Autenticación

`POST /api/v1/auth/login` recibe `{email, password}` y devuelve
`{data: {access_token, usuario: {id, nombre, email, rol}}}`. El servicio
`src/api/services/auth.service.ts` lo adapta al modelo de sesión existente.
El token dura ocho horas según la configuración actual. El cierre de sesión es
local; no hay endpoint de revocación ni `/auth/me`. Una sesión vencida debe
iniciarse nuevamente. Las contraseñas nunca se guardan en el repositorio.

## Funciones que todavía no existen

Novedades, FAQ y slider exponen GET, sin CRUD de escritura. No hay gestión de
consultas recibidas desde el panel, administración de cuentas, recuperación de
contraseña, carga de archivos ni permisos diferenciados del Editor. Son pendientes
para continuar el desarrollo, no operaciones ofrecidas por este panel básico.

## Verificación

Ambos roles se probaron por HTTPS: alta, lectura, edición, baja, reactivación y
relaciones. En navegador se completaron los seis formularios, confirmaciones,
cierre de sesión y redirección al login; materia y docente creados aparecieron en
la ficha pública. Los datos temporales se retiraron después de respaldar la base.
Los borradores de Mantis y la matriz de pruebas se entregan al profesor por separado.

## Referencias

- Backend: `apps/users/routes.py`, `common/authorization.py`, `apps/academic/routes.py`, `apps/careers/routes.py`.
- Frontend: `src/pages/AdminCrudPanel.tsx`, `src/hooks/useAdminCrud.ts`, `src/api/services/admin.service.ts`.
