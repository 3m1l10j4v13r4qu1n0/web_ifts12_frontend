# HU-02: Caso de Uso Expandido — Administración de contenidos del sitio

Fecha: 2026-10-20 · Estado: borrador

**Actor Principal**: Administrador de contenidos del IFTS N.º 12 (personal del instituto
encargado de gestionar el sitio; `docs/01_global/actores.md`).

**Precondición**: El sitio está operativo y el panel es de acceso restringido: el login es
exclusivo del personal que administra contenidos y el contenido informativo permanece
público (RN-05; RF-23).

## Flujo Principal (Éxito)

1. El administrador ingresa desde el enlace "Administración" de la top bar o por la URL
   `/admin/login` y el sistema renderiza el login con `AdminLayout` (sin header, menú ni
   pie públicos).
2. Ingresa email y contraseña válidos; el backend responde con token y usuario
   (`POST /api/auth/login`) y el frontend persiste la sesión.
3. El sistema lo redirige a `/admin` (panel, frame A2): sidebar de administración,
   encabezado con usuario y rol, filtros, tabla de noticias con sus columnas y badges de
   estado, paginación y la sección Carrusel.
4. El administrador filtra o busca en la tabla y el sistema muestra el estado vacío cuando
   no hay coincidencias, sin afectar el resto del panel.
5. Presiona "Nueva noticia" o "Editar" y el sistema abre el formulario del frame A3 con
   los campos, sus validaciones y la vista previa.
6. Completa los campos obligatorios (título y contenido) y confirma; el sistema muestra el
   estado de cargando y un mensaje de proceso mientras no exista endpoint de escritura
   (CA-10), sin alterar los datos existentes.
7. Para eliminar una noticia, elige la acción de baja y el sistema abre el modal del frame
   A3b; al confirmar, la baja se ejecuta (o muestra el mensaje de proceso mientras no
   exista endpoint) y el modal se cierra.
8. El administrador administra el carrusel: cada slide se carga con imagen en proporción
   16:9 y texto alternativo obligatorio.
9. Cierra la sesión desde el logout del panel y el frontend limpia la sesión local,
   volviendo al sitio público.

## Flujo Alternativo 1: Credenciales inválidas

1. (Pasos 1 y 2 del flujo principal, con datos incorrectos).
2. El backend responde `401 "Credenciales inválidas"` (o `400 "Email y contraseña
   requeridos"` si los campos están vacíos).
3. El frontend muestra el mensaje en el formulario, sin navegar fuera del login (CA-04,
   CA-05).

## Flujo Alternativo 2: Sin sesión, sesión ausente o expirada

1. El administrador intenta acceder directamente a una ruta `/admin/*`.
2. No existe token en `localStorage`; el `ProtectedRoute` redirige a `/admin/login` sin
   renderizar el panel (CA-06).
3. Alternativamente, con una sesión presente, el backend responde `401` en una llamada
   autenticada (token expirado o revocado): el frontend limpia la sesión local y redirige
   al login (CA-06b).

## Flujo Alternativo 3: Acción de escritura sin endpoint

1. (Pasos 1-5 del flujo principal).
2. El administrador confirma un alta, una edición o una baja; el endpoint correspondiente
   **no existe** en el backend (DB-03).
3. El botón entra en estado de cargando y se muestra un mensaje de proceso; no se
   simula un guardado exitoso ni se alteran los datos locales (CA-10).

## Flujo Alternativo 4: Tabla sin datos o con error de consulta

1. (Pasos 1-3 del flujo principal).
2. `GET /api/novedades` no devuelve noticias o falla.
3. La tabla muestra su estado vacío o su estado de error, y el resto del panel sigue
   operativo (CA-08; RN-13).

## Flujo Alternativo 5: Baja cancelada

1. (Pasos 1-7, hasta abrir el modal de baja).
2. El administrador presiona "Cancelar".
3. El modal se cierra sin ejecutar la baja y la noticia permanece en la tabla (CA-11).

## Postcondición

- El administrador accede, desde un solo panel, al alta, la edición y la baja de noticias
  y a la administración del carrusel institucional, sin tocar el sitio público (RN-04).
- Con endpoints de escritura pendientes, la UI del flujo completa queda verificada y las
  acciones quedan en mensaje de proceso hasta que Backend confirme el contrato (RF-27;
  DB-03).
- El contenido público no requiere autenticación y ninguna pantalla de administración
  queda expuesta sin sesión (RN-05).

## Referencias

IFTS N.º 12. (2026). Análisis funcional validado. `documentacion/frontend/analisis_funcional_validado.md`.

Equipo de Frontend. (2026). Reglas de negocio transversales. `docs/01_global/reglas_negocio.md`.

Equipo de Frontend. (2026). Actores del sitio. `docs/01_global/actores.md`.

Equipo de UX/UI. (2026). Correcciones de UX/UI — B1 (login) y B2 (panel). `docs/01_global/correcciones_ux_ui_frontend.md`.
