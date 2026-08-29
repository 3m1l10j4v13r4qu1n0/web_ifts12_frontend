# Reglas de buenas prácticas para generar código Frontend (HTML, CSS, JavaScript)

## Principios generales
- Cada componente/módulo/función debe tener **una única responsabilidad** bien definida. Si mezcla estructura, estilo, estado y lógica de negocio sin necesidad, separalo.
- Antes de escribir código, pensá en el **contrato**: qué recibe (props/inputs/atributos), qué devuelve o emite (eventos, callbacks, valores), y qué efectos secundarios tiene.
- Preferí **composición sobre herencia** (componentes pequeños combinados, no jerarquías profundas de clases o mixins).
- Separá **estructura (HTML), presentación (CSS) y comportamiento (JS)**. Evitar estilos inline y lógica de negocio embebida en el markup salvo casos triviales.
- Toda dependencia externa (fetch/API, localStorage, fecha/hora, random, DOM global, librerías de terceros) debe inyectarse o encapsularse detrás de una función/módulo propio, nunca usarse directamente y disperso por toda la lógica de negocio.
- No aplicar estos principios a rajatabla en todos lados: ver sección "Cuándo NO aplicar esto a rajatabla" al final.

## Estructura y organización (equivalente a SRP)
- Un archivo/componente = una responsabilidad. No mezclar fetching de datos, transformación de datos y renderizado en la misma función.
- Separar capas típicas: `components` (UI pura/presentacional), `hooks` o `composables` (lógica de estado reutilizable), `services` o `api` (llamadas HTTP/fetch), `utils` (helpers puros sin estado), `styles` (CSS/tokens de diseño).
- Los componentes "smart"/contenedores (que orquestan datos y estado) deben delegar el renderizado a componentes "dumb"/presentacionales cuando la UI es reutilizable o compleja.
- El `main.js`/`index.js`/punto de entrada debe inicializar y orquestar, no contener lógica de negocio.

## Abierto a extensión, cerrado a modificación
- Preferir agregar comportamiento nuevo vía **props, slots, composición o nuevas funciones**, en vez de modificar un componente existente y estable agregándole condicionales (`if tipo === 'x'`) que crecen sin límite.
- En CSS, extender estilos con clases modificadoras (BEM, variantes de utilidades) en vez de sobreescribir reglas existentes con selectores más específicos o `!important`.
- Usar patrones como render props, slots, `children`, o funciones de orden superior para variantes, en vez de duplicar componentes casi iguales.

## Sustitución de componentes/contratos (equivalente a LSP)
- Un componente que implementa una interfaz esperada (por ejemplo, un `Input` custom que reemplaza a un `<input>` nativo, o cualquier implementación de un tipo/interfaz TS) debe comportarse de forma consistente con lo que el consumidor espera: mismos eventos, mismo tipo de valor, mismos casos de error.
- No cambiar la semántica de un evento o prop heredado/estandarizado (ej. que `onClick` no dispare un submit de formulario si no corresponde).
- Respetar los tipos declarados (TypeScript/JSDoc): no devolver `undefined` donde se espera un valor, no mutar props recibidas.

## Interfaces pequeñas (equivalente a ISP)
- Preferir **props/parámetros pequeños y específicos** antes que un componente/función con 15 props opcionales que cubre demasiados casos.
- Si una función/hook expone métodos o valores que la mayoría de sus consumidores no usa, dividirla en varias más chicas y específicas.
- En TypeScript, preferir interfaces chicas y composables (`Pick`, `Omit`, intersección de tipos) antes que una interfaz gigante que todos implementan parcialmente.

## Inversión de dependencias
- La lógica de negocio y los componentes de UI no deben depender directamente de detalles de implementación (fetch específico, SDK de un proveedor, localStorage) sino de una abstracción propia (una función/servicio con una firma clara).
- Encapsular llamadas a APIs externas en un módulo `services/` o `api/` con funciones bien tipadas; los componentes consumen esas funciones, nunca llaman `fetch`/`axios` directo desde el JSX/template salvo prototipos rápidos.
- Inyectar dependencias vía parámetros, contexto (Context API, provide/inject, DI de Angular) o inicialización explícita, no acceder a variables globales o singletons ocultos dentro de la lógica.
- El punto de ensamblaje (bootstrap de la app, providers en el árbol raíz, configuración) es el único lugar permitido para instanciar clientes concretos (instancia de cliente HTTP, SDK de terceros, store global).

## Reglas específicas de CSS
- Evitar selectores globales agresivos (`*`, tags sin scope) fuera de un reset/normalize documentado.
- Preferir una convención de nombres consistente (BEM, utilidades tipo Tailwind, o CSS Modules/scoped) y no mezclar varias convenciones en el mismo proyecto sin razón.
- Variables de diseño (colores, spacing, tipografía) centralizadas en tokens/custom properties, no valores mágicos repetidos por todo el código.
- Mobile-first y uso de unidades relativas (`rem`, `%`, `fr`) por defecto; usar `px` solo cuando hay una razón concreta (bordes, sombras).

## Reglas específicas de HTML
- HTML semántico: usar el tag que corresponde (`button`, `nav`, `main`, `section`, `article`, `label`) en vez de `div`/`span` con JS pegado.
- Accesibilidad no opcional: atributos `alt`, `aria-*` cuando corresponda, orden lógico de foco, contraste adecuado, formularios con `label` asociado.
- No duplicar estructura repetitiva a mano; generarla desde datos/plantillas/componentes.

## Cuándo NO aplicar esto a rajatabla
- No crear una capa de servicio/abstracción para un fetch que se usa una sola vez en todo el proyecto y no hay plan de reutilizarlo o testearlo por separado.
- No dividir un componente chico (pocas líneas, alta cohesión) solo por "separación de responsabilidades" si no hay motivo de cambio independiente.
- Scripts únicos, prototipos, POCs o código de un solo uso no necesitan la misma rigurosidad que código de producción reutilizable.
- Helpers puros y triviales (`formatDate`, `capitalize`) no necesitan interfaz propia ni inyección de dependencias.

## Señales de alerta (smells)
- Componente con cientos de líneas mezclando fetch, estado, validación y render → candidato a partir.
- Uso de `document.querySelector` o manipulación directa del DOM dentro de un framework declarativo (React/Vue/Angular) → smell, salvo casos justificados (integraciones puntuales).
- Nombres genéricos tipo `Utils.js`, `Helper.js`, `Manager.js` que terminan acumulando de todo → posible God Object.
- CSS con `!important` repetido o especificidad creciente para "ganarle" a otra regla → smell de arquitectura de estilos rota.
- Un componente/hook que la mayoría de sus consumidores usa parcialmente (ignorando props/retornos) → violación de interfaces pequeñas, dividir.
- Un componente de UI que importa directamente un SDK de un proveedor (Stripe, Firebase, etc.) en vez de recibirlo inyectado o pasar por un servicio propio → violación de inversión de dependencias.

## Verificación
- Al terminar de escribir código, revisar explícitamente: responsabilidad única, extensibilidad sin tocar lo existente, contratos consistentes, interfaces chicas, dependencias invertidas.
- Validar antes de dar por terminada una tarea:
  ```bash
  npm run lint
  npm run typecheck   # si el proyecto usa TypeScript
  npm run test
  npm run build
  ```