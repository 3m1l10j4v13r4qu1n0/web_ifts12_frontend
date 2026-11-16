---
# Tags del índice de memoria (D13): el CLI las scaffoldea, el Mentat ajusta.
tags:
  - ticket
  - operativos
  - qa
  - infra
  - responsive
---

# Tickets operativos de la ronda TEST — QA, Infra y BUG-004

> Documento de Capa 1 — Especificación. Registra los tres tickets de Mantis del lote del
> 11/11/2026 que **no** se convierten en historia de usuario, con su encuadre y su estado.
> No agrega alcance ni duplica la regla del modo test.

Fecha: 2026-11-16 · Estado: borrador

## Resumen

De los 11 tickets exportados de Mantis, ocho se convirtieron en las HU-03 a HU-06 (más las
observaciones transversales de la devolución de Edith). Los tres restantes no son
funcionalidad nueva: una ronda de QA, una coordinación de Infra y un defecto responsive. Se
registran acá para que no queden sin dueño documental ni se lean como requisitos sin
implementar.

| Ticket | Tipo | Dueño | Encuadre |
|---|---|---|---|
| 0000075 | QA · ronda completa | Ericka Carata | Proceso de prueba; no produce HUs |
| 0000079 | Infraestructura · ramas | Jimena Obella | Ya reflejado en la regla del modo test |
| 0000087 | Bug · responsive (BUG-004) | Emilio Aquino | Defecto con criterio de aceptación propio |

## 1. Ticket 0000075 — Ronda completa de QA

Abre las pruebas integrales del sitio TEST y del panel, no las cierra. Pide **una incidencia
por defecto**, asignada al área correspondiente, con pasos, esperado/obtenido, URL, datos de
prueba no sensibles, navegador y tamaño, evidencia y ambos SHA; vincularla a la ronda y
re-testear después de cada corrección publicada por Infra. Los faltantes de material van a
Análisis Funcional (0000076, Melina Gramajo), no a desarrollo.

- **No es una HU:** no define comportamiento del producto; define cómo se prueba.
- **Relación con este repo:** las incidencias que QA abra y toquen Frontend se convertirán
  en tickets propios (como los 0000087–0000096) y, si cambian comportamiento, en HUs.
- **Credenciales:** viven en la nota privada de Mantis. No se replican acá.
- **Estado:** en curso desde el 31/10/2026; la aceptación integral sigue pendiente.

## 2. Ticket 0000079 — Coordinación de ramas en Infra

Define la reunión del 02/11/2026 para acordar una única rama oficial por repositorio. La
regla operativa que salió de ese encuadre ya está documentada en
`.opencode/rules/integracion-test.md` y en `docs/02_technical/ticket_0000073_correcciones_integracion_test.md`;
este documento no la repite.

- **Restricción vigente:** `develop` y `main` congeladas; base y destino de merge
  `fix/integracion-test-20261031`; push al remoto `infra`; merge a `develop` solo con
  autorización escrita de Infra y aprobación del usuario.
- **Prohibido:** `reset --hard` y `push --force` sobre la rama de test.
- **Estado:** abierto. El push del frontend está bloqueado porque el host de Infra
  (`100.111.107.65`) no responde en Tailscale.

## 3. Ticket 0000087 — BUG-004: el botón «Enviar» queda oculto por el teclado virtual

**Problema.** En un dispositivo móvil, al usar el formulario de contacto el teclado virtual
tapa el botón «Enviar» y no se puede completar la operación.

**Resultado esperado.** El botón permanece accesible mientras el teclado virtual está
abierto.

**Criterios de aceptación**

- **CA-BUG-004-01.** Dado que uso el formulario en un celular, cuando enfoco el último campo
  y se abre el teclado virtual, entonces el botón «Enviar» es visible y clicable sin cerrar
  el teclado ni hacer scroll a ciegas.
- **CA-BUG-004-02.** Dado que el teclado virtual está abierto, cuando hago scroll dentro del
  formulario, entonces el campo activo y el botón no quedan tapados por el teclado.
- **CA-BUG-004-03.** Dado que el formulario está en un modal o en el pie, cuando se abre el
  teclado, entonces el contenedor se ajusta al viewport visible (unidades `dvh`/`svh` o
  `visualViewport`, sin `vh` fijo).
- **CA-BUG-004-04.** Dado que el envío se completa, cuando el formulario valida, entonces el
  mensaje de éxito o error se muestra por encima del teclado.

**Alcance técnico probable:** `src/components/ui/FormularioConsulta.tsx` y su contenedor en
`ContactoPage.tsx` y en el pie; estilos de alto del contenedor y `scroll-margin` del botón.
No cambia el contrato de `/api/v1/contacto`.

**Estado:** documentado por QA en la matriz Responsive v1.0; pendiente de reproducción en
TEST y de corrección. No se implementa en las HU-03…HU-06.

## Referencias

IFTS N.º 12. (2026). *Tickets 0000075, 0000079 y 0000087*. Mantis.
`documentacion/driveFrontend/matis_frontend/`.

Equipo de Infraestructura. (2026). *Regla del modo test*.
`.opencode/rules/integracion-test.md`.

Equipo de Frontend. (2026). *Ticket 0000073 — correcciones de integración publicadas en
TEST*. `docs/02_technical/ticket_0000073_correcciones_integracion_test.md`.
