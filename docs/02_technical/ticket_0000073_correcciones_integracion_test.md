---
# Tags del índice de memoria (D13): el CLI las scaffoldea, el Mentat ajusta.
tags:
  - ticket
  - correcciones
  - integracion
  - test
---

# Ticket 0000073 — correcciones de integración publicadas en TEST

> Documento de Capa 1 — Especificación. Completa solo lo indispensable (spec §10).

Fecha: 2026-11-02 · Estado: borrador

## Resumen

Registra lo que entrega la rama `fix/integracion-test-20261031` (publicada y desplegada en
el sitio TEST por el ticket Mantis 0000073), cómo descargarla y verificarla, la restricción
de coordinación vigente desde el 02/11/2026 y los pendientes que el propio ticket marca como
NO terminados. No reemplaza el contrato de API: eso vive en las HU-01 y HU-02.

## Fuente

- Origen: `inbox/_done/ticket_ooooo73.md` (recibido el 2026-11-02)
- Evidencia adjunta del mismo ticket: `inbox/_done/frontend-correcciones.patch` (7,9 MB,
  57 archivos; verificado hoy 1:1 contra la rama, ver "Evidencia" más abajo)
- Relacionado: Mantis 0000075 (QA), 0000077 (diseño final del CRUD), 0000079 (coordinación
  de ramas), 0000072 (manual de despliegue de Infra)
- Credenciales del panel admin TEST: en la nota privada del ticket 0000073 en Mantis
  (no se replican acá)

## Qué establece

### Entrega: rama `fix/integracion-test-20261031`

| Dato | Valor |
|---|---|
| Rama (frontend y backend) | `fix/integracion-test-20261031` |
| SHA publicado (frontend) | `d1afcf8a30e7e070a6a1e5ae021b1006d7e27c9e` |
| Base entregada (develop) | `33f995448f31e94895db1f40497004a940848b8f` |
| Repositorio Git central | `/srv/git/frontend.git` |
| Estado | Commiteada, desplegada en TEST y **sin merge** a `main` ni `develop` |
| Verificación del equipo | 268 pruebas en 35 archivos, lint/TypeScript/build en verde; 117 pruebas integradas y 8 regresiones públicas correctas. Pendiente QA completo (0000075) |

Los fixes ya están commiteados y publicados: no son archivos sueltos por aplicar y **no hay
que aplicarles encima el parche**. La rama conserva el diseño y la estructura del equipo.

### Cambios principales que trae

- `src/api/endpoints.ts` y servicios/tipos: origen relativo `/api/v1`; login envuelto en
  `data.access_token`/`usuario`; novedades paginadas con cuerpo/fecha adaptados.
- `AdminCrudPanel`, `useAdminCrud`, `admin.service` y `constants/admin`: CRUD visual básico
  de carreras, planes, materias, docentes y dos relaciones (POST/PATCH/DELETE, baja y
  reactivación, claves compuestas, selecciones reales y actualización de consultas).
- `ContenidoAcademico`/`useContenidoPublico`: materias, programas y docentes desde la API;
  PDF de planes y material existente con fuente indicada.
- `FormularioConsulta`/`useConsulta`: envío real, confirmación después del guardado, los
  errores conservan los campos, IDs únicos entre formulario principal y pie, límites de
  nombre/correo iguales al modelo.
- Home: carrusel real, fotos provistas, enlaces "Ver carrera" y sin noticias inventadas.
- Header/Footer: tamaños ajustados, footer oscuro original, logos blancos/transparentes por
  CSS; botón "Administración" configurable por `VITE_MOSTRAR_ACCESO_ADMIN`.
- `BuscadorGlobal`: Enter/Tab corregidos en sugerencias y enlace "Ver todos los resultados"
  que se desmontaba antes del clic.
- `package-lock.json`: actualizaciones compatibles de Vite/Vitest/Zod y transitivas;
  auditoría de 5 alertas reducida a 0.

### Contrato de API

**No se documenta acá.** El contrato vigente de lo consumido en TEST está en
`docs/04_user_stories/HU-01/hu_01_api.md` (API pública) y
`docs/04_user_stories/HU-02/hu_02_api.md` (administración), ambos actualizados el
2026-10-31 sobre la misma rama. Este documento solo registra la entrega y su operativa.

### Restricción de coordinación (02/11/2026)

Por indicación del profesor:

1. Primero descargar y revisar la rama corregida. **No hacer merges a `main` ni `develop`**
   hasta la reunión prevista en el ticket 0000079.
2. Infra coordina con Front, Back y el profesor la elección de la rama oficial y cómo
   consolidar los fixes; ninguna rama de destino se da por aprobada.
3. QA coordina la revisión y el re-test por separado en 0000075; el TEST actual permanece
   publicado y QA arranca sin esperar la unificación.
4. Ante cambios locales, conflictos o divergencias: detenerse y coordinar; **no usar
   `reset --hard` ni `push --force`**. El SHA de la entrega se conserva en el historial de
   cualquier revisión posterior y queda informado en Mantis.

### Pendientes marcados por el propio ticket (NO terminados)

- 🔵 **CRUD provisional:** la pantalla es provisoria; el diseño final se coordina con
  UX/UI en 0000077.
- 🔵 **FAQ segmentada:** sigue usando el catálogo local (falta contrato de categorías).
- 🔵 **Contenidos y controles** pendientes de sus fuentes (fechas, enlaces, datos
  institucionales).
- 🟡 **Rendimiento:** paquete JS ~551 kB; evaluar división por rutas después.
- 🔵 **QA completo** pendiente (0000075). Estos puntos **no se presentan como terminados**.

## Cómo se valida

- **Identidad de la rama:**
  `git rev-parse HEAD` coincide con `d1afcf8a30e7e070a6a1e5ae021b1006d7e27c9e`.
- **Descarga (clon existente):** `git fetch origin` →
  `git checkout -b fix/integracion-test-20261031 origin/fix/integracion-test-20261031` →
  `git rev-parse HEAD`. Con cambios locales, primero conservarlos y revisar
  `git status --short` / `git remote -v`.
- **Clon nuevo:** `git clone -b fix/integracion-test-20261031 frontend@100.111.107.65:/srv/git/frontend.git ifts12-front`.
- **Revisión del alcance:** `git diff --stat 33f995448f31e94895db1f40497004a940848b8f..fix/integracion-test-20261031`
  y `git log --oneline` sobre el mismo rango.
- **Build:** `npm ci` · `npm run lint` · `npm run test -- --maxWorkers=2` · cargar
  `deploy/test.env` y `npm run build`.
- **Evidencia:** `inbox/_done/frontend-correcciones.patch` es el diff
  `33f9954..d1afcf8` como archivo único; verificado hoy (2026-11-02) en 1:1 contra la rama
  (57 archivos en ambos). Es regenerable con el `git diff` del punto anterior: el parche es
  evidencia, no un paso del flujo.
- **Smoke en TEST:** https://ifts12-test.tail5bd71a.ts.net/ (login/CRUD, búsqueda con
  teclado, contacto, PDF, FAQ, móvil y tablet). El panel es
  `https://ifts12-test.tail5bd71a.ts.net/admin/login`; el ingreso se hace con las
  credenciales de la nota privada del ticket 0000073 en Mantis (no se replican acá).
- **Coordinación:** mientras 0000079 no cierre la reunión, ningún merge a `main` ni
  `develop` (✅ respetado hasta hoy: ambas ramas conservan sus versiones anteriores).
- **Sin credenciales:** el usuario y la contraseña del panel no aparecen en este documento
  ni en ningún archivo de `docs/` (verificable con un `grep` sobre la contraseña del ticket).
