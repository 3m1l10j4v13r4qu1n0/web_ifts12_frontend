# HU-02: Historia de Usuario — Administración de contenidos del sitio

Fecha: 2026-10-20 · Estado: borrador

## Historia

**Como** administrador de contenidos del IFTS N.º 12 (personal del instituto),
**quiero** ingresar con mi cuenta al panel de administración y gestionar las noticias y
las imágenes del carrusel institucional,
**para** mantener el sitio actualizado sin depender de un proveedor externo ni de cambios
de código (RF-23, RF-25, RF-34; RN-04, RN-05).

## Tarjeta

La administración encadena cuatro pantallas: login (WF 13), panel con listado de Noticias
y Carrusel (WF 14), formulario de alta/edición (WF 15) y modal de confirmación de baja.
El alcance de esta versión cubre Noticias y Carrusel (RF-25, RF-34); el resto de recursos
del RF-26 (calendario, horarios, autoridades, docentes, concursos) queda fuera por ahora.

- **Fuente visual:** Figma v2, archivo `MHBgrLD9g8ka6sX6ezkO1l`, canvas Desktop 1440:
  A1 · Login `#1:22839`, A2 · Panel `#1:23268`, A3 · Formulario `#1:23960`,
  A3b · Modal de baja `#1:24274`, más los estados `#1:28732` (login),
  `#1:28780` (tabla de administración) y `#1:28819` (mensajes toast/inline).
  Contrato de equivalencia: `docs/01_global/figma_v2_contrato_visual.md`.
- **Fuente de negocio:** RF-23 a RF-27 y RF-34 del análisis funcional validado;
  correcciones bloqueantes B1 (login) y B2 (panel); RN-04, RN-05 y RN-03.
- **Estado de implementación (verificado 20/10/2026):** el login existe y consume
  `POST /api/auth/login` real (`AdminLoginPage.tsx`, `AdminLayout.tsx`,
  `auth.service.ts`, sesión en `src/contexts/AuthContext.tsx`); el acceso
  "Administración" está en la top bar del `Header` público. El panel es una cáscara
  (`AdminPanelPage.tsx`), `ModalBaja.tsx` existe sin consumidor, y el formulario de
  noticias aún no existe. **Toda acción de escritura es UI-only** hasta que Backend
  confirme los endpoints CRUD (deuda DB-03, Grupo 1). Los roles del RF-24 siguen 🟡
  pendientes de validación (BE-A7).
- **Fuera de alcance:** responsive de admin solo Desktop 1440 (decisión 20/10/2026;
  tablet y celular con el patrón estándar del sitio), persistencia real de escrituras,
  endpoints `/auth/logout` y `/auth/me` (la sesión es local mientras no existan),
  y la administración de los recursos del RF-26.

## Criterios de Aceptación

- **CA-01.** Dado que soy personal administrador, cuando ingreso a `/admin/login`, entonces
  veo el login del frame A1 con `AdminLayout` (sin header, menú ni pie públicos) (RF-23;
  RN-05).
- **CA-02.** Dado que estoy en cualquier página pública, cuando miro la top bar, entonces
  el botón de cuenta (ícono de persona) está visible y su menú muestra "Panel de
  administración" como única opción por ahora (excepción a I12, 20/10/2026: menú
  escalable para futuros perfiles con login; sin ítems inventados).
- **CA-03.** Dado que envío email y contraseña correctos, cuando el backend responde 200
  con token y usuario, entonces la sesión se guarda y entro al panel en `/admin` (RF-23).
- **CA-04.** Dado que el backend responde 401 "Credenciales inválidas" o 400 "Email y
  contraseña requeridos", cuando se procesa la respuesta, entonces el mensaje se muestra
  en el formulario y no se navega fuera del login.
- **CA-05.** Dado que el formulario tiene campos vacíos, cuando intento enviarlo, entonces
  aparecen los errores inline de cada campo y el envío no se realiza.
- **CA-06.** Dado que existe una sesión válida en `localStorage`, cuando ingreso a
  `/admin` o a cualquier ruta protegida, entonces el panel se renderiza; sin sesión o con
  token ausente, entonces el `ProtectedRoute` redirige a `/admin/login`.
- **CA-06b.** Dado que el backend responde 401 en una llamada autenticada (token
  expirado o revocado), cuando se procesa la respuesta, entonces la sesión local se limpia
  y se redirige al login, sin dejar el panel en un estado inconsistente.
- **CA-07.** Dado que estoy autenticado, cuando entro al panel, entonces se ve el frame A2:
  sidebar, encabezado, filtros, tabla de noticias con sus columnas y badges de estado
  (Publicada/Borrador), paginación y la sección Carrusel (RF-25).
- **CA-08.** Dado que la tabla carga datos, cuando termina la carga, entonces se muestra
  el estado vacío si no hay noticias y el estado de error si la consulta falla, sin romper
  el resto del panel.
- **CA-09.** Dado que presiono "Nueva noticia" o "Editar", cuando se abre el formulario
  del frame A3, entonces aparecen los campos del frame con validación obligatoria y vista
  previa, y el campo "Estado" refleja Publicada/Borrador (RF-25).
- **CA-10.** Dado que confirmo el alta o la edición con datos válidos, mientras no exista
  endpoint de escritura, entonces el botón muestra el estado de cargando y un mensaje de
  proceso, sin alterar datos reales (RF-27; DB-03).
- **CA-11.** Dado que elijo eliminar una noticia, cuando se abre el modal del frame A3b,
  entonces la baja requiere confirmación explícita; "Cancelar" cierra el modal sin
  efectos (RF-25).
- **CA-12.** Dado que administro el carrusel, cuando cargo una imagen, entonces se exige
  texto alternativo y se respeta la proporción 16:9 indicada en el frame (RF-34; M1).
- **CA-13.** Dado que el panel muestra el usuario, cuando se conoce el rol, entonces
  aparece en el encabezado; mientras los roles no estén definidos (RF-24 🟡), se muestra
  un mensaje de proceso en lugar de un rol inventado.
- **CA-14.** Dado que los exports del Figma contienen anotaciones de diseño (RF-xx, WF xx,
  "PENDIENTE INSTITUCIONAL", "se cargan desde el panel admin", "sin datos inventados"),
  cuando se renderiza cualquier pantalla de admin, entonces ninguna anotación aparece en
  pantalla y, si ocupa el lugar de un dato, se reemplaza por un mensaje de proceso
  (guard `src/__tests__/anotaciones-no-renderizadas.test.ts`).

## Specification by Example

- Administrador con credenciales válidas: entra por el enlace de la top bar, se autentica
  y llega al panel con la lista de noticias y la sección Carrusel.
- Administrador con credenciales inválidas: recibe el error 401 en el formulario y sigue
  en la pantalla de login.
- Alta de noticia sin backend de escritura: el formulario valida, muestra el estado de
  cargando y un mensaje de proceso; los datos de la tabla quedan intactos.
- Baja de una noticia: el modal de confirmación pide confirmar; al cancelar, la noticia
  sigue en la tabla.
- Sesión ausente o expirada: cualquier ruta `/admin/*` redirige al login.

## Acceptance TDD

- Verificar que `/admin/login` renderiza con `AdminLayout` y sin el chrome público.
- Verificar el login exitoso (200 → redirección al panel) y los errores 400/401 inline.
- Verificar los estados de la tabla del panel: cargando, vacío y error.
- Verificar validación y vista previa del formulario de noticias.
- Verificar que el modal de baja requiere confirmación y que cancelar no altera datos.
- Verificar que ninguna anotación de diseño se renderiza (guard existente).

## Referencias

IFTS N.º 12. (2026). Análisis funcional validado. `documentacion/frontend/analisis_funcional_validado.md`.

Equipo de Frontend. (2026). Reglas de negocio transversales. `docs/01_global/reglas_negocio.md`.

Equipo de Frontend. (2026). Actores del sitio. `docs/01_global/actores.md`.

Equipo de UX/UI. (2026). Correcciones de UX/UI — bloqueantes B1 y B2 y mejoras M1–M7. `docs/01_global/correcciones_ux_ui_frontend.md`.

Equipo de Frontend. (2026). Contrato visual del Figma v2. `docs/01_global/figma_v2_contrato_visual.md`.

Equipo de UX/UI. (2026). Wireframes HTML de las 15 pantallas (WF 13–15 de administración). `documentacion/wireframes/`.

Equipo de Frontend. (2026). Estado de implementación. `docs/02_technical/estado_implementacion.md`.
