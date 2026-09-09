# Mockups de las vistas del proyecto

Mockups HTML autocontenidos (Tailwind CDN) que replican fielmente el diseño real del
frontend (componentes de `src/`), para visualizarlos y experimentar sin levantar el
proyecto.

Cada archivo usa los **colores reales del token `acento`** y el layout 90/10 del sitio,
y los **textos provisorios** de `src/constants/mock-data.ts` (pendientes de validación
por Análisis Funcional, igual que en el código).

## Cómo ver los mockups (instructivo paso a paso)

Cada mockup es un único archivo HTML **autocontenido** (usa Tailwind CDN y define los
colores del token `acento` en un `<script>`), así que no hay que instalar nada ni
levantar el proyecto.

1. **Abrí el archivo** del mockup que quieras ver en esta carpeta (`docs/mockups/`)
   con cualquier editor de texto. Por ejemplo: `home.html`.
2. **Copiá todo el contenido**: `Ctrl+A` y `Ctrl+C` (o `Cmd+A` / `Cmd+C` en Mac).
   Hay que copiar **el archivo completo**, incluyendo el `<script>` de Tailwind y la
   configuración de colores. Si te perdés alguna parte, el mockup se ve sin estilos.
3. **Entrá a** [https://play.tailwindcss.com/](https://play.tailwindcss.com/).
   Se abre con un ejemplo de Tailwind listo para editar.
4. **Pegalo reemplazando todo**: seleccioná todo el código que viene por defecto en el
   editor (el ejemplo inicial) con `Ctrl+A` y pegá el tuyo con `Ctrl+V`.
5. **Mirá el resultado** en el panel de vista previa: se renderiza al instante.
   Si no ves cambios, confirmá que pegaste el archivo entero y que el preview está
   visible (a veces hay que cerrar los paneles laterales apretando las teclas con la
   vista previa para verla más grande).

### Probar otras secciones y estados

- **Cambiar de sección placeholder**: en `pagina-seccion.html` tocá el `<h1>` del
  `<main>` (linea «CAMBIA EL TITULO ACA») y el item activo del menú en el `<header>`.
- **Activar estados comentados**: los bloques apagados están dentro de
  `<!-- ... -->` con una explicación de por qué no se muestran (en general, por
  estar pendientes de URLs oficiales). Quitá el comentario para verlos:
  - **Home**: CTA de "Inscripción" y banda de acceso al campus (Moodle) en la portada.
  - **Footer**: enlaces "Campus virtual" e "Inscripción".
  - Para volver al estado "sin URL oficial", volvé a comentarlos.
- **Responsive**: en el preview, achicá el ancho de la ventana o usá el selector de
  breakpoints de Tailwind Play (suele estar arriba del preview) para ver cómo el menú
  pasa a botón hamburguesa en pantallas chicas (`lg:hidden`).
- **Colores**: los tonos de azul del mockup se definen en `tailwind.config` (paleta
  `acento`). Si querés probar otro acento, cambiá los valores ahí y se actualizan
  todos los componentes que usan `bg-acento-*`, `text-acento-*`, etc.

## Archivos

| Archivo | Vista | Replica de | Cambios para explorar |
|---|---|---|---|
| `home.html` | Home completa | `src/pages/HomePage.tsx` + layout | CTA de inscripción, banda de Moodle, 11 accesos rápidos (5 deshabilitados), 6 carreras con modalidad, slider con fechas, 12 FAQs por 4 categorías, footer con dirección |
| `pagina-seccion.html` | Sección placeholder | `src/pages/PaginaPlaceholder.tsx` | Título de cada sección + item activo del menú + footer con dirección |
| `pagina-404.html` | Página no encontrada | `src/pages/PaginaNoEncontrada.tsx` | — + footer con dirección |

## Vistas cubiertas

- **Home** (portada, accesos rápidos con 5 deshabilitados, 6 carreras con modalidad,
  novedades/slider con fechas, comunidades, 12 FAQs por 4 categorías).
- **Secciones placeholder**: Carreras, Ingresantes, Estudiantes, Docentes, Tutorías,
  Institucional, Noticias, Contacto, Preguntas frecuentes — una misma estructura con
  distinto título.
- **Página 404**.

## Estados comentados (por qué están apagados)

- **CTA de "Inscripción"** y **banda de Moodle**: solo se renderizan cuando existan las URLs
  oficiales (`ENLACES.moodle` / `ENLACES.inscripcion`). Hoy son placeholders vacíos, así que
  están comentados. Al recibir las URLs, descomentar para verlos.
- **Enlaces "Campus virtual" / "Inscripción"** del footer: idem, se muestran recién con URLs.
- **Accesos deshabilitados**: Becas, Inscripción, SIU, Constancias, Mesas de examen, Calendario
  se muestran atenuados (opacity-60) porque sus `href` están vacíos (sin destino aún).

> Nota: estos mockups reflejan el estado Fase 6 (brechas de auditoría sin dependencias).
> Los textos son placeholders descriptivos pendientes de validación por Análisis Funcional.
> Las secciones placeholder se completan cuando lleguen los wireframes de UX/UI y los
> contratos de Backend.
