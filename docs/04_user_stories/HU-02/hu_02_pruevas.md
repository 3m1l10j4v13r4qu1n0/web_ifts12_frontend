# HU-02: Plan de Pruebas — Administración de contenidos del sitio

Fecha: 2026-10-20 · Estado: borrador

## Resumen

El plan de pruebas traduce los criterios de aceptación CA-01 a CA-14 a escenarios
verificables (Specification by Example) en formato Gherkin y a casos de prueba TDD para el
frontend (Vitest + React Testing Library, alineado con `fe-architect-scaffold`). Cubre el
flujo de éxito login → panel → formulario → baja, y los casos negativos de credenciales,
sesión ausente, acciones sin endpoint y datos vacíos o con error.

## 1. Escenarios por criterio de aceptación

### Escenario 1: Ingreso al login administrativo (Caso de Éxito)

- **Dado** que navego a `/admin/login`.
- **Cuando** se renderiza la pantalla.
- **Entonces** el login del frame A1 se muestra con `AdminLayout`, sin header, menú ni pie
  públicos (CA-01) y con el menú de cuenta de la top bar pública (ícono de persona →
  "Panel de administración") (CA-02).

### Escenario 2: Autenticación con credenciales válidas (Caso de Éxito)

- **Dado** que el backend responde 200 con token y usuario.
- **Cuando** envío el formulario con email y contraseña correctos.
- **Entonces** la sesión se guarda y llego al panel en `/admin` (CA-03).

### Escenario 3: Credenciales inválidas (Caso Negativo)

- **Dado** que el backend responde `401 "Credenciales inválidas"` o
  `400 "Email y contraseña requeridos"`.
- **Cuando** se procesa la respuesta.
- **Entonces** el mensaje se muestra en el formulario, sin navegar fuera del login
  (CA-04).

### Escenario 4: Campos vacíos (Caso de Validación)

- **Dado** que dejo campos obligatorios sin completar.
- **Cuando** intento enviar el formulario.
- **Entonces** aparecen los errores inline de cada campo y no se realiza el envío
  (CA-05).

### Escenario 5: Ruta protegida sin sesión o con sesión expirada (Caso Negativo)

- **Dado** que no hay token en `localStorage`.
- **Cuando** ingreso directamente a `/admin` o a una ruta protegida.
- **Entonces** el `ProtectedRoute` redirige a `/admin/login` (CA-06).
- **Dado** que existe una sesión, pero el backend responde `401` en una llamada
  autenticada.
- **Cuando** se procesa la respuesta.
- **Entonces** la sesión local se limpia y se redirige al login (CA-06b).

### Escenario 6: Panel con noticias (Caso de Éxito)

- **Dado** que estoy autenticado y `GET /api/novedades` devuelve noticias.
- **Cuando** se renderiza el panel.
- **Entonces** se ven sidebar, encabezado, filtros, tabla con columnas y badges
  Publicada/Borrador, paginación y la sección Carrusel (CA-07).

### Escenario 7: Tabla vacía o con error (Caso de Borde)

- **Dado** que `GET /api/novedades` devuelve un array vacío o falla.
- **Cuando** se resuelve la consulta.
- **Entonces** la tabla muestra su estado vacío o su estado de error y el resto del panel
  sigue operativo (CA-08).

### Escenario 8: Alta/edición en el formulario (Caso de Éxito con dependencia)

- **Dado** que abro "Nueva noticia" o "Editar".
- **Cuando** se carga el formulario del frame A3.
- **Entonces** se muestran los campos con sus validaciones y la vista previa (CA-09);
  **y** al confirmar con datos válidos, mientras no exista endpoint de escritura, el botón
  muestra cargando y un mensaje de proceso sin alterar datos reales (CA-10).

### Escenario 9: Baja con confirmación (Caso de Éxito y Cancelación)

- **Dado** que elijo eliminar una noticia.
- **Cuando** se abre el modal del frame A3b.
- **Entonces** la baja requiere confirmación explícita; al presionar "Cancelar", el modal
  se cierra y la noticia sigue en la tabla (CA-11).

### Escenario 10: Carrusel con texto alternativo (Caso de Regla de Negocio)

- **Dado** que administro una slide del carrusel.
- **Cuando** cargo la imagen sin texto alternativo.
- **Entonces** el formulario lo exige y valida la proporción 16:9 del frame (CA-12;
  M1).

### Escenario 11: Rol de usuario (Caso de Pendiente Institucional)

- **Dado** que el login devuelve un usuario con rol todavía no definido (RF-24 🟡).
- **Cuando** se renderiza el encabezado del panel.
- **Entonces** se muestra un mensaje de proceso en lugar de un rol inventado (CA-13).

### Escenario 12: Anotaciones de diseño no renderizadas (Caso de Regla)

- **Dado** que los exports del Figma contienen anotaciones de diseño.
- **Cuando** se renderiza cualquier pantalla de administración.
- **Entonces** ninguna anotación aparece en pantalla y, en su lugar, se muestra un
  mensaje de proceso cuando corresponde (CA-14).

## 2. Casos de Prueba TDD (checklist para desarrolladores)

- [ ] `test_admin_login_renderiza_con_admin_layout_sin_chrome_publico()`
- [ ] `test_login_exitoso_guarda_sesion_y_redirige_al_panel()`
- [ ] `test_login_401_muestra_error_inline_sin_navegar()`
- [ ] `test_login_campos_vacios_muestra_errores_inline()`
- [ ] `test_ruta_protegida_sin_sesion_redirige_al_login()`
- [ ] `test_sesion_expirada_401_limpia_sesion_y_redirige()`
- [ ] `test_panel_muestra_tabla_filtros_badges_paginacion_y_carrusel()`
- [ ] `test_tabla_vacia_muestra_estado_vacio()`
- [ ] `test_tabla_con_error_muestra_estado_de_error()`
- [ ] `test_formulario_alta_valida_campos_obligatorios_y_muestra_vista_previa()`
- [ ] `test_formulario_sin_endpoint_muestra_proceso_sin_alterar_datos()`
- [ ] `test_modal_baja_requiere_confirmacion()`
- [ ] `test_modal_baja_cancelar_no_elimina_la_noticia()`
- [ ] `test_carrusel_exige_texto_alternativo()`
- [ ] `test_rol_no_definido_muestra_mensaje_de_proceso()`
- [ ] `test_anotaciones_de_diseno_no_se_renderizan()` (guard existente
      `anotaciones-no-renderizadas.test.tsx`)

Archivos de test previstos: ajustes en `src/__tests__/admin-login-page.test.tsx` y
`auth-sesion.test.tsx`; nuevos `admin-panel-page.test.tsx` y `admin-noticia-form.test.tsx`.

## Referencias

Equipo de Frontend. (2026). Historia de usuario HU-02 (criterios CA-01 a CA-14). `docs/04_user_stories/HU-02/README.md`.

Equipo de Frontend. (2026). Propuesta tecnológica — Frontend e Infraestructura (sección Testing). `documentacion/frontend/propuesta-tecnologica.md`.

IFTS N.º 12. (2026). Análisis funcional validado. `documentacion/frontend/analisis_funcional_validado.md`.
