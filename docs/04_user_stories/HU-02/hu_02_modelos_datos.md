# HU-02: Modelos de Datos — Administración de contenidos del sitio

Fecha: 2026-10-20 · Estado: borrador

## Resumen

Esta historia de usuario toca la sesión de administración y las dos entidades
administrables de esta versión (noticias y carrusel). Los DTOs del login y de
`GET /api/novedades` están **verificados contra el código fuente del backend**; el resto
se marca con su estado real (🟡/🔵) y no se inventa. Los tipos del frontend viven en
`src/types/` y `src/contexts/`, con espejo de lo que hoy existe en `src/`.

## 1. Entidades involucradas

| Entidad | Campos | Estado |
|---|---|:---|
| `Usuario` (backend) | `id`, `nombre`, `apellido`, `email`, `rol` | ✅ Login verificado; valores de `rol` 🟡 propuestos (`ADMIN`, `EDITOR`, `EDITOR_NOTICIAS`), pendientes BE-A7 |
| `UsuarioSesion` (frontend) | `id`, `nombre` (compuesto "nombre apellido"), `email`, `rol: string \| null` | ✅ `src/contexts/AuthContext.tsx:10`; derivada del login y reconstruida desde `localStorage` (sin `/auth/me`) |
| `Noticia` (`novedades`) | `id`, `titulo`, `copete`, `contenido`, `categoria`, `imagen_url`, `destacado`, `fecha_publicacion` | ✅ DTO verificado (HU-01 §2.2) |
| `SlideCarrusel` (UI) | `id` (string de navegación), `titulo`, `resumen`, `fecha?`, `enlace?` | 🟡 Tipo local en `src/components/ui/CarruselInstitucional.tsx:4`: arma slides **desde noticias**, no es el modelo administrable |
| Modelo administrable del carrusel | imagen, texto alternativo, orden, activo | 🔵 No existe en frontend ni en backend; definir con Backend/UX (RF-34; M1) |

> Tabla 1. Entidades de la administración y su estado de confirmación (fuentes:
> `hu_02_api.md` §2, `src/contexts/AuthContext.tsx`, `src/components/ui/CarruselInstitucional.tsx`).

## 2. Reglas de integridad y datos

- El contenido se clasifica como **fijo** o **administrable**; esta HU administra solo
  noticias y carrusel (RN-04; RF-26 fuera de alcance).
- El login es exclusivo del personal administrador; la sesión (token + usuario) vive en
  `localStorage` y se limpia en el logout local, sin endpoint de cierre en servidor
  (RN-05; `hu_02_api.md` §1).
- El `rol` de `UsuarioSesion` puede ser `null`: mientras los roles no estén definidos
  (RF-24 🟡) la UI no lo interpreta ni deriva permisos de él (CA-13).
- Las noticias se listan de la más reciente a la más antigua, con el último mes visible
  (RN-03): `GET /api/novedades` ya ordena por `fecha_publicacion DESC`; el orden del
  panel no se re-ordena en cliente.
- En el formulario, `titulo` y `contenido` son obligatorios; `contenido` además es
  obligatorio en el modelo del backend (`models.py:56`). Los demás campos del body
  propuesto son opcionales (`hu_02_api.md` §3.1.1).
- Toda imagen de carrusel exige texto alternativo y respeta la proporción 16:9 del frame
  (CA-12; M1).
- **Sin persistencia simulada:** mientras RF-27/DB-03 sigan abiertos, el frontend no
  escribe en locales de dominio (no `localStorage` de noticias ni stores) ni muestra
  confirmaciones falsas: la tabla solo refleja lo que devuelve la API y las acciones de
  escritura terminan en mensaje de proceso (CA-10).
- El frontend no persiste credenciales ni tokens en repositorio ni en logs; el token solo
  vive en `localStorage` y se adjunta a las llamadas cuando el backend lo requiera.

## Referencias

Equipo de Frontend. (2026). Especificación de API — HU-02. `docs/04_user_stories/HU-02/hu_02_api.md`.

Equipo de Frontend. (2026). Especificación de API — HU-01 (DTO de novedades). `docs/04_user_stories/HU-01/hu_01_api.md`.

Equipo de Frontend. (2026). Modelo de datos global. `docs/02_technical/modelo_datos_global.md`.

Equipo de Frontend. (2026). Sesión de administración (AuthContext). `src/contexts/AuthContext.tsx`.

Equipo de Frontend. (2026). Reglas de negocio transversales. `docs/01_global/reglas_negocio.md`.
