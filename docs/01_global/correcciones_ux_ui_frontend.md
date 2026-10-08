---
# Tags del índice de memoria (D13): el CLI las scaffoldea, el Mentat ajusta.
tags:
  - correcciones
  - ux
  - ui
  - frontend
---

# Correcciones de UX/UI y Frontend

> Documento de Capa 1 — Especificación. Deriva de la auditoría UX/UI del 07/10/2026 y de la
> devolución de Coordinación del 08/10/2026. No agrega alcance nuevo al proyecto.

Fecha: 2026-10-08 · Estado: borrador

## Resumen

Coordinación del IFTS N.º 12 devuelve al grupo UX/UI y Frontend **9 correcciones bloqueantes
(B1–B9)**, **12 importantes (I1–I12)** y **7 mejoras (M1–M7)** detectadas por la auditoría del
07/10/2026, convertidas en acciones y criterios verificables. El objetivo es priorizar las
correcciones para que Frontend implemente sobre una referencia consistente: cada pantalla
corregida debe poder entregarse y revisarse sin esperar a que todo el sitio esté terminado. Una
corrección se considera realizada solo cuando se comparte el frame actualizado y se comprueba su
criterio de aceptación; los puntos de código se validan posteriormente en TEST.

## Fuente

- Origen archivado: `inbox/_done/IFTS12_Correcciones_UXUI_Frontend.md` (recibido el 2026-10-08).
- Autoría: Coordinación del IFTS N.º 12 (Lic. Ariel Trejo Vallejos), 08/10/2026.
- Insumo de origen: `Auditoria_UX_UI_IFTS12`, 07/10/2026 (resumen ejecutivo, estados de
  interfaz, preparación para Frontend, pendientes institucionales, lista priorizada y veredicto
  final). Las referencias RF y apartados citados aquí corresponden a las indicadas por ese
  informe.

## Qué establece

### Alcance

- Convierte los **9 bloqueantes, 12 puntos importantes y 7 mejoras** del informe de auditoría en
  acciones y criterios verificables. **No se agrega un nuevo alcance al proyecto.**
- Prioriza las correcciones para que Frontend implemente sobre una **referencia consistente**,
  con entregas y revisiones por pantalla, sin esperar al sitio completo.
- El sitio institucional **complementa el Campus Virtual Moodle**. Moodle y SIU son servicios
  externos; el **único login propio del sitio** es el del panel de administración de contenidos.
- El ambiente **TEST ya existe**; la gestión institucional del servidor pendiente corresponde a
  **PRODUCCIÓN**.
- La auditoría **registró hallazgos y no modificó Figma**. Una corrección se considera realizada
  cuando se comparte el frame actualizado y se comprueba su criterio de aceptación; los puntos de
  código se validan luego en TEST.

### Supuestos y límites

- UX/UI comparte la referencia de diseño (frames vigentes para PC, tablet y celular) y Frontend
  la convierte en código; el trabajo es conjunto, pantalla por pantalla.
- Las definiciones que dependen del instituto se gestionan por **Análisis Funcional con
  Edith/IFTS** y se registran como **dependencias institucionales**, no como defectos de UX por
  no disponer del dato (ver "Dependencias institucionales").
- UX puede diseñar la estructura y usar material oficial ya disponible; los campos no confirmados
  se identifican en el prototipo como **pendientes**, Front mantiene destinos configurables y **no
  se publican ejemplos como si fueran datos institucionales reales**.
- El informe **no habilita a implementar las pantallas contradictorias como referencia
  definitiva**.

### Prioridad y trabajo en paralelo

| Nivel | Qué significa | Cómo avanzar |
|---|---|---|
| BLOQUEANTE | Impide implementar correctamente la pantalla o función afectada. | Resolver primero; no programar como definitivo el diseño cuestionado. |
| IMPORTANTE | Completa flujos, contenido, estados o consistencia necesarios. | Resolver junto con la funcionalidad correspondiente antes de aceptarla. |
| MEJORA | Ajusta presentación y especificaciones según el informe. | Incorporar de forma coordinada; no usar esta etiqueta para omitir estados o controles necesarios. |

> Tabla 1. Niveles de prioridad definidos por el informe.

**Orden recomendado del informe:** B1+B3 (alcance y navegación), B7+B8 (contenido y logos), B9
(base reutilizable), luego B2/B4/B5/B6. Pueden trabajar en paralelo cuando no compartan una
decisión pendiente. **No hay una fecha nueva impuesta** en este documento: el grupo informa qué
pudo cerrar, qué está trabajando y qué lo bloquea.

Frontend puede avanzar con la Home, contenedores, header/footer dentro del alcance revisado,
tarjetas comunes y estructura inicial de rutas. UX acompaña y revisa ese avance parcial.

## Correcciones bloqueantes (B1–B9)

**Evidencia de corrección (aplica a toda corrección bloqueante):** enlace o frame actualizado en
PC, tablet y celular, fecha de revisión y breve descripción del cambio. Cuando existan datos,
permisos o API, documentar qué necesita implementar Frontend y qué dependencia queda pendiente.

### B1. Login de administrador

- **Hallazgo:** el frame login presenta acceso a Campus Virtual Moodle, mientras la minuta V2
  exige acceso al administrador del sitio.
- **Qué debe corregir UX/UI:**
  - Revisar el frame login en PC, tablet y celular y reemplazar su propósito por ingreso al panel
    de administración.
  - Diseñar campos con etiquetas visibles, botón de ingreso y estados de validación, error,
    cargando y sesión expirada cuando corresponda.
  - Mantener Campus/Moodle como enlace externo del sitio público, con destino institucional
    configurable. No pedir credenciales Moodle ni crear registro/login de estudiantes.
  - Actualizar también la documentación UX V1 que describía el acceso a Moodle para que no siga
    contradiciendo la minuta y el mapa V2.
- **Criterio de aceptación:** los tres tamaños presentan un login administrativo; el enlace a
  Moodle es externo y no se confunde con esa pantalla. Front y Backend reconocen el mismo flujo.
- **Referencia:** Minuta V2 §1 y §12; RF-23, según auditoría.

### B2. Panel de administración de contenidos

- **Hallazgo:** no hay pantallas de administración en los Figma auditados.
- **Qué debe corregir UX/UI:**
  - Diseñar el mínimo previsto: listado, alta, edición y baja de Noticias/Novedades y Carrusel.
  - Mostrar navegación del panel, formularios, confirmación de baja, mensajes de éxito/error y
    estados vacío/cargando.
  - Definir un patrón reutilizable para los otros recursos del alcance ya acordado; no inventar
    módulos o perfiles de usuario nuevos.
  - UX/UI documenta las operaciones y permisos previstos. Frontend implementa solamente los
    comportamientos respaldados por datos o endpoints confirmados y deja visibles las
    dependencias pendientes.
- **Criterio de aceptación:** el prototipo permite recorrer listado → alta/edición →
  confirmación/resultado y baja de los recursos mínimos; identifica estados y permisos acordados.
- **Referencia:** RF-24 a RF-26 y RF-34, según la auditoría.

### B3. Estudiantes institucionales

- **Hallazgo:** Comunidad de alumnos introduce perfiles, grupos y una red social no relevada.
- **Qué debe corregir UX/UI:**
  - Reemplazar esa propuesta por **Estudiantes** conforme al Mapa del Sitio V2.
  - Organizar acceso a regularidad, constancias, mesas, calendario, becas, boleto,
    títulos/traspasos y FAQ según el relevamiento.
  - Quitar perfiles sociales, grupos, cifras sin respaldo y funciones que nadie solicitó.
  - Distinguir información del propio sitio y trámites/enlaces externos. Los destinos sin
    confirmar quedan identificados como pendientes institucionales.
- **Criterio de aceptación:** la sección responde al mapa V2 y no propone una comunidad social ni
  autenticación estudiantil propia.
- **Referencia:** Mapa del Sitio V2, según auditoría.

### B4. Novedades: listado, detalle y tarjetas

- **Hallazgo:** no existe un flujo completo de novedades con historial y detalle.
- **Qué debe corregir UX/UI:**
  - Diseñar listado ordenado por fecha, acceso al historial y filtros del alcance acordado.
  - Diseñar detalle de novedad y navegación de regreso al listado.
  - Crear tarjeta reutilizable con variantes con imagen y sin imagen; probar título/copete largos.
  - Indicar qué datos necesita la pantalla y cuál es el endpoint confirmado. Frontend debe usar un
    único contrato vigente y documentado para Novedades.
- **Criterio de aceptación:** se recorre listado/filtro → detalle → regreso y ambas variantes de
  tarjeta funcionan en PC, tablet y celular.
- **Referencia:** Mapa V2; RF-25, según auditoría.

### B5. Ficha de carrera estructurada

- **Hallazgo:** la información aparece como texto corrido y las correlatividades como imagen o
  bloques ilegibles.
- **Qué debe corregir UX/UI:**
  - Crear una plantilla común con bloques para datos oficiales, horario/turno, docentes,
    descargas, plan y correlatividades.
  - Representar correlatividades como tabla/estructura de datos legible y accesible, no como una
    captura incrustada.
  - Diseñar explícitamente cómo se reorganiza la ficha en móvil; no reducir todo el texto para
    hacerlo entrar.
  - Usar exclusivamente nombres, títulos, modalidad y datos respaldados. Si faltan horarios o
    datos, conservar estructura y señalar pendiente institucional.
- **Criterio de aceptación:** la misma plantilla sirve para las carreras oficiales, se lee en
  móvil y permite acceder a los documentos sin depender de una imagen de texto.
- **Referencia:** Mapa V2 y fichas oficiales, según auditoría.

### B6. Menú móvil y navegación

- **Hallazgo:** los tres tamaños no resuelven el comportamiento del menú; faltan opciones o quedan
  cortadas.
- **Qué debe corregir UX/UI:**
  - Diseñar menú móvil abierto y cerrado, controles, navegación y cierre al elegir una opción.
  - Resolver acceso a Campus, SIU, Inscripción y buscador; definir ubicación de Novedades, FAQ y
    Contacto conforme al mapa.
  - Revisar tablet como diseño propio y no como escritorio reducido; comprobar buscador y
    submenús.
  - Documentar qué cambia entre tamaños, orden de elementos, foco y comportamiento cuando el texto
    crece.
- **Criterio de aceptación:** todas las opciones acordadas son alcanzables en los tres tamaños, el
  menú puede abrirse/cerrarse y ningún control queda recortado.
- **Referencia:** Mapa V2 y auditoría responsive.

### B7. Datos institucionales y carreras

- **Hallazgo:** hay autoridades/cargos que contradicen Nosotros y carreras inexistentes en
  Ingresantes/Tutorías.
- **Qué debe corregir UX/UI:**
  - Comparar autoridades, cargos y roles con el material oficial de Nosotros, dejando registro de
    la fuente.
  - Corregir lo que contradice esa fuente y retirar carreras sin respaldo institucional.
  - Revisar consistencia entre Home, Institucional, Docentes, Ingresantes, Tutorías y fichas.
  - Si dos documentos oficiales se contradicen, pedir a Análisis que gestione confirmación de
    Edith; no resolver por intuición ni atribuir esa espera a UX.
- **Criterio de aceptación:** cada dato publicado tiene fuente verificable; las dudas
  institucionales están separadas y no hay carreras o autoridades inventadas.
- **Referencia:** Nosotros y material institucional del Drive, según auditoría.

### B8. Logos oficiales

- **Hallazgo:** el diseño incluye un escudo generado y una recreación BA en lugar de los archivos
  entregados.
- **Qué debe corregir UX/UI:**
  - Reemplazar por los logos oficiales IFTS 12, Ciudad y UPCN disponibles en Drive.
  - Conservar proporciones, nitidez y uso coherente en header y footer.
  - No dibujar una marca nueva para sustituir un archivo de baja resolución.
  - Si falta una versión de alta resolución o confirmación institucional, identificarla como
    pendiente y trabajar con el archivo oficial disponible.
- **Criterio de aceptación:** header y footer usan los archivos institucionales de referencia; se
  conoce el origen de cada asset y no quedan recreaciones.
- **Referencia:** RF-21; Mapa V2 §5, según auditoría.

### B9. Estilos y componentes reutilizables

- **Hallazgo:** faltan estilos/variables y componentes con variantes; Front debería medir y
  adivinar decisiones.
- **Qué debe corregir UX/UI:**
  - Crear estilos de color y texto o variables; acordar una escala de tipografía y espaciado.
  - Convertir botón, acceso rápido, tarjeta de novedad, acordeón FAQ, input, header y footer en
    componentes reutilizables.
  - Definir variantes relevantes: tamaños, imagen/sin imagen, abierto/cerrado, error, foco y
    deshabilitado.
  - Documentar tokens (nombres reutilizables para valores como color/espaciado), reglas responsive
    y assets para que Front traduzca el diseño a código.
- **Criterio de aceptación:** los componentes se reutilizan con las mismas reglas; Front puede
  identificar valores, variantes y comportamiento sin inventarlos.
- **Referencia:** Pedidos Frontend a UX/UI y auditoría §7.

## Correcciones importantes (I1–I12)

### I1. Formulario de contacto

- **Acción:** diseñar campos y etiquetas, obligatorios, formato inválido, envío, espera, éxito y
  fallo. Aclarar qué confirma la respuesta real de la API; no prometer envío de correo si la
  función solamente registra la consulta.
- **Criterio de aceptación:** se ve y puede recorrerse el formulario completo, incluyendo errores y
  confirmación.

### I2. Estados de interfaz

- **Acción:** agregar cargando, vacío/sin resultados, fallo de servidor, validación,
  deshabilitado, éxito, sesión expirada, sin permisos, imagen ausente y 404 donde corresponda.
  Identificar el componente y disparador de cada estado.
- **Criterio de aceptación:** cada función dinámica o formulario tiene estados documentados para
  que el grupo UX/UI y Frontend pueda implementarlos y revisarlos.

### I3. FAQ por segmentos

- **Acción:** diseñar página FAQ para ingresantes, estudiantes y docentes usando las
  preguntas/respuestas oficiales. Identificar las que todavía contienen una ruta por completar.
- **Criterio de aceptación:** se puede filtrar/navegar y leer la respuesta; no se inventan
  preguntas ni enlaces institucionales.

### I4. Buscador

- **Acción:** diseñar resultados, estado sin resultados y adaptación en los tres tamaños.
  Confirmar con Análisis Funcional el alcance y los datos buscables antes de presentar una
  búsqueda global.
- **Criterio de aceptación:** el flujo y su estado vacío están definidos; las dependencias de API
  quedan registradas.

### I5. Ingresantes

- **Acción:** completar estructura de fechas, equivalencias, pases, acceso a inscripción GCBA y
  FAQ conforme al alcance. No inventar fechas de inscripción.
- **Criterio de aceptación:** las funciones requeridas aparecen y sus contenidos/enlaces tienen
  fuente o pendiente institucional identificado.

### I6. Institucional

- **Acción:** completar historia como pendiente si falta, autoridades, bedelía, normativa
  descargable y enlaces de interés. Separar cargos confirmados de dudas abiertas.
- **Criterio de aceptación:** la estructura coincide con el mapa V2 y los datos presentes tienen
  fuente oficial.

### I7. Docentes

- **Acción:** conservar una sola referencia de pantalla y resolver concursos, docentes por carrera
  y documentación del alcance. Coordinar traslado de autoridades a Institucional según la
  revisión.
- **Criterio de aceptación:** Frontend recibe un único frame vigente y sabe qué contenido
  corresponde a cada sección.

### I8. Calendario y accesos

- **Acción:** incorporar calendario académico y acceso rápido; agregar Inscripción y comprobar los
  siete accesos confirmados por Análisis en el informe. Validar su listado en la referencia
  vigente.
- **Criterio de aceptación:** no se omiten accesos acordados; calendario tiene estructura sin
  fechas inventadas.

### I9. Superposiciones y recortes

- **Acción:** corregir footer superpuesto a FAQ en PC y buscador cortado en tablet. Revisar también
  texto largo y cambios de ancho.
- **Criterio de aceptación:** no hay controles ni contenido tapados o recortados en los frames
  revisados.

### I10. Pie móvil legible

- **Acción:** aplicar el mínimo de 12 px indicado por el informe para textos del pie, revisar
  lectura real y agregar correo institucional cuando esté confirmado. No rellenarlo con un correo
  inventado.
- **Criterio de aceptación:** el pie se lee, sus enlaces funcionan y el dato de contacto tiene
  fuente o está registrado como pendiente.

### I11. Una Home de referencia

- **Acción:** elegir la Home vigente; identificar 05 · Inicio guiado como antecedente en Figma y
  renombrar los frames conforme al sitemap. No mover ni renombrar carpetas/archivos de Drive.
- **Criterio de aceptación:** existe un frame de referencia por pantalla/tamaño y las alternativas
  están claramente señaladas.

### I12. Acciones fuera de alcance

- **Acción:** quitar Solicitar Tutoría y el icono de persona del header público según el informe;
  mantener la información institucional de tutorías que sí fue relevada. No inventar reserva de
  turnos o cuentas sociales.
- **Criterio de aceptación:** la navegación pública no sugiere funciones que el proyecto no
  implementará.

## Mejoras y especificaciones (M1–M7)

**Evidencia (aplica a toda mejora):** componente o frame actualizado y regla documentada. El grupo
UX/UI y Frontend compara el diseño con el comportamiento implementado cuando corresponda.

| ID | Qué incorporar |
|---|---|
| M1 | **Carrusel y fotos.** Usar fotos institucionales disponibles; indicar controles, proporción/recorte, punto focal, texto alternativo y si hay autoplay. Diseñar comportamiento con uno o varios slides. La elección editorial final no bloquea TEST. |
| M2 | **Textos y ortografía.** Corregir ITFS, A trves, Regalamento, ¡Ha olvidado, tildes y otros errores registrados. Validar con AF/Edith el nombre oficial del instituto y aplicarlo de manera consistente. |
| M3 | **Lenguaje visual.** Unificar páginas internas con los componentes, jerarquía y estilos de la Home vigente; evitar variantes de color/espaciado sin intención documentada. |
| M4 | **Iconos.** Acordar un conjunto de iconos consistente. Reemplazar flechas/puntos usados como soluciones improvisadas donde afecten el componente; documentar su sentido y etiquetas accesibles. |
| M5 | **Accesos móviles.** Probar la propuesta de dos columnas del informe con textos reales y verificar lectura y uso. Coordinar el resultado con Front; no fijar una grilla que rompa títulos o controles. |
| M6 | **Zonas táctiles.** Diseñar área interactiva de 44 × 44 px como objetivo recomendado por el informe para hamburguesa/botones del header, aunque el dibujo del icono sea menor. Comprobar separación y foco. |
| M7 | **Especificaciones responsive.** Agregar página Specs en Figma: anchos de referencia, breakpoints acordados, contenedor, columnas, separación entre columnas y espaciados. Un breakpoint es el ancho a partir del cual cambia el comportamiento del layout. |

> Tabla 2. Mejoras y especificaciones (M1–M7).

## Dependencias institucionales (Edith/IFTS)

Estas definiciones se gestionan por Análisis Funcional con Edith/IFTS. Se registran como
dependencias institucionales, **no como defectos de UX** por no disponer del dato:

- URLs oficiales Moodle, SIU, inscripción y rutas de trámites mencionadas en FAQ.
- Correos y horarios de bedelía/tutorías; qué datos personales de bedeles se pueden publicar.
- Historia, normativa faltante, horarios de cursada y procedimientos institucionales pendientes.
- Selección final del carrusel, versiones de logos en alta resolución y confirmaciones
  institucionales de cargos/nombre.
- Validación pendiente del menú/botonera y enlaces externos todavía no confirmados.

UX puede diseñar la estructura y usar material oficial ya disponible. Los campos aún no confirmados
se identifican en el prototipo como pendientes; Front mantiene destinos configurables. **No
publicar ejemplos como si fueran datos institucionales reales.**

## Trabajo interno del grupo UX/UI y Frontend

UX/UI y Frontend trabajan como un solo grupo: quienes tienen la responsabilidad de diseño definen
y documentan la referencia, y quienes tienen la responsabilidad de implementación la convierten en
código funcional. Cada pantalla puede avanzar cuando cumple sus criterios de aceptación.

1. UX/UI comparte los frames vigentes para PC, tablet y celular, junto con componentes, medidas,
   textos, estados, interacciones y puntos pendientes.
2. Cuando una corrección esté revisada y aprobada, el grupo puede convertirla en código con apoyo
   de Claude, herramienta que Manuel y los integrantes de UX/UI ya están utilizando. El resultado
   debe ser revisado y probado por todo el grupo.
3. Frontend implementa la pantalla respetando responsive, navegación por teclado, foco visible,
   contraste, validaciones y estados de carga, vacío, éxito y error definidos.
4. Si la pantalla consume datos, Frontend registra el endpoint confirmado, los campos utilizados y
   el comportamiento ante respuestas correctas, vacías o con error. Las dependencias todavía no
   confirmadas quedan identificadas.
5. Los integrantes responsables de UX/UI revisan junto con Frontend la implementación real en el
   navegador y comparan estructura, jerarquía, espaciado, tipografía, colores, componentes,
   comportamiento responsive e interacciones con los frames vigentes.
6. Frontend corrige las diferencias detectadas y deja identificada la versión de código revisada
   mediante repositorio, rama y SHA. El SHA es el identificador único de un commit de Git y permite
   reconocer exactamente qué versión fue implementada.

## Generación del código completo

Una vez completadas y aprobadas las correcciones, Frontend debe generar y completar el código de
todo el sitio usando los diseños vigentes. El avance puede realizarse pantalla por pantalla, pero
la entrega final debe formar una aplicación coherente, navegable y preparada para integrarse:

- Todas las páginas y rutas aprobadas, con navegación completa entre ellas.
- Componentes reutilizables y sistema visual aplicados de manera consistente.
- Comportamiento responsive comprobado en PC, tablet y celular, incluyendo menú y demás
  interacciones.
- Formularios, validaciones, accesibilidad y estados de carga, vacío, éxito y error implementados.
- Consumo de los endpoints confirmados y registro visible de cualquier dato o integración todavía
  pendiente.
- Código revisado y probado localmente, publicado en el repositorio central con rama y SHA
  identificados.

## Cómo se valida

- **Cierre de cada corrección:** se comparte el frame o componente actualizado (PC, tablet y
  celular) con fecha de revisión y breve descripción del cambio, y se comprueba el criterio de
  aceptación indicado en su sección (B1–B9, I1–I12, M1–M7).
- **Puntos de código:** se validan posteriormente en el ambiente **TEST** (que ya existe). Las
  definiciones de servidor pendientes corresponden a **PRODUCCIÓN**.
- **Diseño vs. implementación:** UX/UI compara la implementación real en el navegador contra los
  frames vigentes; Frontend deja identificada la versión revisada por repositorio, rama y SHA.
- **Anti-invención:** ningún dato, logo, URL o texto institucional se publica sin fuente; lo no
  confirmado queda marcado como pendiente y las dependencias externas se registran, no se resuelven
  por intuición.

## Referencias

IFTS N.º 12. (2026). *Auditoria_UX_UI_IFTS12* (07/10/2026). Informe de auditoría: resumen
ejecutivo, estados de interfaz, preparación para Frontend, pendientes institucionales, lista
priorizada y veredicto final.

IFTS N.º 12. (2026). *Correcciones del grupo UX/UI y Frontend*. Coordinación (Lic. Ariel Trejo
Vallejos), 08/10/2026.

Continuidad de coordinación: correos del 25/08 (organización definitiva), 11/09 (próximos pasos),
15/09 (reuniones conjuntas UX/Frontend) y 05/10 (seguimiento del proyecto). Nóminas y roles
actuales consultados en los documentos de cada área.

- UX/UI: https://docs.google.com/document/d/1n2pujz0-UiQna4nDnPJU8BC5zHilTZidGm2ZSA9lX54/edit
- Frontend: https://docs.google.com/document/d/17Upljt14BxlPps06GeXjOmg4ZSMlcV6veql7ErSAWqY/edit
