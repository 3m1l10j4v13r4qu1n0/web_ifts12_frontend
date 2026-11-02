---
# Tags del índice de memoria (D13): el CLI las scaffoldea, el Mentat ajusta.
tags:
  - ticket
  - uxui
  - crud
  - diseno
---

# Ticket 0000077 — diseño definitivo de las pantallas del CRUD administrativo

> Documento de Capa 1 — Especificación. Completa solo lo indispensable (spec §10).

Fecha: 2026-11-02 · Estado: borrador

## Resumen

Alcance que el ticket Mantis 0000077 le asigna a UX/UI: diseñar las pantallas
definitivas de los seis apartados del CRUD administrativo (hoy provisionales) para
escritorio, tablet y móvil, con todos los estados. **El diseño está pendiente**: este
documento registra qué se pide, qué se recibe y con qué se valida; no presenta ningún
entregable como hecho.

## Fuente

- Origen: `inbox/_done/0000077_uxui_crud_pantallas.md` (ticket Mantis 0000077,
  recibido el 2026-11-02)
- Ticket: 0000077 · categoría UX/UI · estado "asignada" (abierta) · prioridad normal ·
  enviado el 2026-10-31 · asignado a Manuk Meneses
- Credenciales de la cuenta de TEST: en la nota privada del ticket 0000077 en Mantis
  (no se replican acá)
- Relacionados: Front 0000073, Back 0000074, QA 0000075, Infra 0000072 (manual),
  Análisis 0000076 y coordinación 0000079

## Qué establece

### Qué pide el ticket

Diseñar las pantallas finales de los seis apartados —Carreras, Planes de estudio,
Materias, Docentes, Materias por plan y Docentes por materia— para escritorio, tablet y
móvil, cubriendo:

- listados y búsqueda/filtros;
- formularios y referencias entre entidades;
- estados de carga, error, éxito y vacío;
- validación por campo;
- confirmación de baja y reactivación;
- navegación entre secciones, identidad del usuario y cierre de sesión.

Flujo previsto (pasos del ticket): entrar al panel con la cuenta de TEST de la nota
privada → recorrer los formularios existentes y anotar problemas de uso → diseñar las
variantes responsive y todos los estados → acordar con Front/Back que campos y
operaciones coincidan con la API vigente → entregar diseños revisables y acompañar la
implementación y la validación con QA.

### Qué recibe UX/UI

- Cuenta de TEST (rol Administrador) informada en la nota privada del ticket 0000077 en
  Mantis. Panel: https://ifts12-test.tail5bd71a.ts.net/admin/login
- Registros de prueba con prefijo `UXUI`, sin alterar datos institucionales: probar
  alta, edición, baja/reactivación y relaciones en los seis apartados.
- El panel corre sobre la rama `fix/integracion-test-20261031`; el detalle de esa
  entrega y su operativa está en
  `docs/02_technical/ticket_0000073_correcciones_integracion_test.md`.

### Qué debe entregar a Frontend

- Diseños, estados, medidas, componentes y criterios de accesibilidad.
- Revisión de proporciones, legibilidad y consistencia general del sitio, conservando
  la identidad oficial (el pie mantiene el fondo oscuro con los logos del UPCN oficial
  indicado por el profesor; el botón "Administración" es provisional/configurable).

### Restricciones

- Respetar las operaciones reales del panel: cualquier ampliación se coordina con
  Análisis/Backend.
- No cambiar por cuenta propia los permisos definitivos del Editor: siguen pendientes.

### Estado actual de las pantallas

- Las pantallas actuales son **PROVISIONALES**: no constituyen el diseño final
  solicitado a UX/UI.
- Los primeros cuatro recursos (carreras, planes de estudio, materias y docentes) tienen
  baja lógica y se reactivan desde Editar > Activo.
- Los últimos dos (materias por plan y docentes por materia) quitan solo relaciones.
- Admin y Editor tienen temporalmente las mismas operaciones.

### Límites de este documento

- **No duplica el contrato de API:** campos y endpoints de la administración viven en
  `docs/04_user_stories/HU-02/hu_02_api.md`; el estado actual de la rama, en
  `docs/02_technical/ticket_0000073_correcciones_integracion_test.md`.
- **El diseño definitivo está pendiente** (ticket 0000077 abierto): nada de lo descrito
  acá se presenta como entregado.
- La implementación posterior de lo diseñado depende de la reunión de coordinación del
  ticket 0000079.

## Cómo se valida

- **Cobertura de diseño:** para cada uno de los seis apartados existe una variante para
  escritorio, tablet y móvil con listado/búsqueda, formulario, estados (carga, error,
  éxito, vacío), validación por campo, confirmación de baja, reactivación, navegación,
  identidad de usuario y cierre de sesión.
- **Entregables a Frontend:** diseños + estados + medidas + componentes + criterios de
  accesibilidad, revisables y acompañando la implementación y la validación con QA
  (0000075).
- **Restricciones respetadas:** sin cambios de permisos del Editor y sin ampliaciones no
  coordinadas con Análisis/Backend; operaciones y campos coinciden con la API vigente
  (HU-02).
- **Estado del ticket:** mientras 0000077 siga abierta, el diseño se considera
  pendiente; la implementación espera la reunión de 0000079.
- **Sin credenciales:** el usuario y la contraseña de la cuenta TEST no aparecen en este
  documento ni en ningún archivo de `docs/` (grep con 0 hits sobre ambos).
