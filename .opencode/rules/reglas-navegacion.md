# Reglas de navegación web

Fuente: "Simple Ways to Improve Website Navigation" 

## Menú

- **Menú definido por el Mapa del Sitio V3** (`docs/01_global/mapa_sitio_ifts12_v3.md`,
  13/11/2026): 7 pestañas (Inicio, Instituto, Carreras, Ingresantes, Alumnos, Tutoría y FAQ)
  más buscador. Docentes, Novedades y Contacto quedan ⏳ (ticket 0000099). Reemplaza al menú
  de 9 items de la V2 (15/09/2026); si el menú cambia, coordinar con UX/UI antes de implementar
- Usar botón "hamburger" si hay más items
- Logo enlazado a home — el item "Inicio" lo define el mapa V3 (se mantiene además del logo)
- Menú fijo: siempre visible al hacer scroll
- Item activo resaltado: cambiar peso/opacidad/color

## Navegación en páginas largas

- **Navegación por puntos** para páginas largas con secciones
- **Navegación por puntos** (dot navigation) con tooltips de los nombres de sección
- **Barra de progreso de scroll** — solo tiene sentido en páginas de más de 3-4 pantallas; color contrastante
- **Botón "Volver arriba"** para páginas largas
- **Menú en páginas de una sola página** (landing/long-form): enlazar a las secciones de la página
- Breadcrumb navigation para mostrar jerarquía (ideal en sitios grandes como tiendas con muchas categorías)

## Feedback al usuario

- **Barra de carga** para informar que el contenido se está cargando
- **Resaltar botones CTA**: color brillante vs. botón secundario transparente

## Contenido

- **Ocultar contenido** con botón "Show more", dropdowns, tabs
- **No dead-ends al fondo**: repetir CTA o enlazar a artículos similares

## URLs

- **URLs limpias**: usar nombres descriptivos, no códigos del sistema (`/page4652188.html` es confuso)
- Separar palabras en URLs con guiones: `/about-us`
- Usar **anchor links** con nombres claros (`#about`, `#contacts`) en landing pages

