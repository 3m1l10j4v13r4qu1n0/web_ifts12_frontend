# Dependencias y decisiones pendientes por equipo — Frontend

Área: Frontend (enlace transversal: Emilio Aquino) · Proyecto Sitio Web Institucional IFTS N.º 12 — 2026
Documento unificado: consolidación de las dependencias de la Tarea Inicial y del Plan B de
Infraestructura. Los bloqueos se comunican al enlace del área correspondiente;
**no se resuelven unilateralmente**.

Fuentes de verdad: `docs/driveFrontend/` (minuta 27/08/2026, Tarea Inicial, Plan B, PAUTAS).
Fecha de relevamiento: 28/08/2026; releído 29/08/2026. **Actualizado 18/09/2026** contra
`docs/frontend/analisis_funcional_validado.md` (fuente única de verdad de Análisis, validada por el cliente).

## 1. Análisis funcional y relevamiento

> **Actualizado 18/09/2026:** la minuta V2 y el mapa del sitio validado fueron **entregados por
> Análisis** (Documento Consolidado, Partes I y IV — ver `analisis_funcional_validado.md` §10).

| Pedido | Por qué lo necesita Frontend | Estado |
|---|---|---|
| Minuta de Correcciones y Aclaraciones (V2) | Documento de referencia obligatorio de la tarea inicial; no está disponible. | ✅ **Entregada** — unificada en la Parte I del Consolidado (18/09/2026) |
| Mapa inicial del sitio validado | Estructura de navegación definitiva; hoy se trabaja con las secciones identificadas. | ✅ **Entregado** — Parte IV del Consolidado (18/09/2026). La navegación la define UX/UI (Mapa V2) |
| Contenidos institucionales (normativa, autoridades, planes, horarios) | No se inventan afirmaciones institucionales; la Home usa mocks mientras tanto. | 🔵 Pendiente del instituto (Drive de Edith) — ver fuente validada §8 |

## 2. UX/UI y arquitectura de información

| Pedido | Por qué lo necesita Frontend | Estado |
|---|---|---|
| Wireframes y mapa de navegación | Jerarquía visual, menú, componentes esperados y criterios responsive. | Bloqueado |
| Criterios visuales y paleta de colores | Regla 90/10 de color; paleta por carrera si corresponde. | Bloqueado |
| Flujo de las secciones (carreras, ingreso, etc.) | Navegación y recorridos de usuario. | Bloqueado |

Nota: Frontend informa rápido si una propuesta visual presenta dificultades de implementación.

## 3. Backend, datos y APIs

> Actualizado 15/09/2026: Backend respondió con definiciones técnicas formales
> (`docs/driveFrontend/04_backend/respuesta.md`). Ver informe `docs/sdd/06_auditorias/auditoria-backend.md`.

| Pedido | Por qué lo necesita Frontend | Estado |
|---|---|---|
| Contratos de API (tabla oficial de endpoints) | Mapa de rutas confirmado; falta la tabla oficial con parámetros/body/esquemas (Swagger/OpenAPI, entrega 2: 1 semana). | Parcial — 1 semana |
| Esquemas de datos | Tipos `types/api` a alinear con los DTOs exactos (entrega 3: 2 semanas). | Parcial — 2 semanas |
| Códigos de error y mensajes | Estructura `{ error: { code, message, details } }` confirmada; falta tabla de códigos. Tipo `ApiErrorResponse` ya corregido. | Parcial — 3 semanas |
| Autenticación y permisos | JWT + token `{ sub, email, rol, exp }` confirmados; roles a validar con Grupo 1; login real en entrega 3. | Parcial — 2 semanas |
| Datos de prueba | Seeders comprometidos en la entrega 4. | Comprometido — 3 semanas |
| Confirmar tecnología de backend en el VPS | Confirmado: Python/Flask + PostgreSQL + Gunicorn + Docker Compose; host final a cargo de Infra. | ✅ Confirmado |

## 4. Infraestructura / DevOps (Plan B)

| Pedido / decisión | Por qué lo necesita el proyecto | Estado |
|---|---|---|
| Cotizaciones formales (al menos 3 proveedores) | Los precios publicados son orientativos y pueden variar. | Pendiente |
| Selección del proveedor y plan del VPS | Baseline sugerido: 2 vCPU / 4 GB RAM, Linux, SSH, Docker, IPv4, SSD/NVMe, HTTPS. | Pendiente |
| Preguntas técnicas antes de contratar (ver sección 7) | Deciden el costo real (impuestos, backups, IPv4, restricciones, escalado). | Pendiente |
| Configuración del VPS (Ubuntu, firewall, Nginx, Docker, HTTPS) | Operación del ambiente de producción. | Pendiente |
| Estrategia de ambientes (dev/testing/prod) y presupuesto para testing | Definir si testing va en subdominio/instancia separada. | En evaluación |
| Restricciones de build/despliegue | Define si el frontend se sirve estático desde Nginx. | Parcialmente definido |
| Backups automáticos y responsables de restauración | Mitigación de pérdida de datos. | Pendiente |
| Confirmar metodología Docker + Docker Compose | Estandariza despliegues; requiere confirmación del equipo. | A confirmar |

## 5. Dirección / IFTS N.º 12

| Pedido / decisión | Por qué lo necesita el proyecto | Estado |
|---|---|---|
| Aprobar que la nueva web se aloje separada del Moodle | Definición central del Plan B; habilita contratar el VPS. | Pendiente de Dirección |
| Decidir y aprobar el nombre/dominio del sitio | Precondición para registrar en NIC Argentina. | Pendiente de Dirección |
| URLs oficiales de Moodle e inscripción | Se usan placeholders en `constants/` hasta recibir las oficiales. | Pendiente de IFTS |
| Método de pago y facturación a nombre del IFTS | Los proveedores facturan por cuenta. | Pendiente de Dirección |
| Autorización de gasto mensual (dominio + VPS + renovación) | Definir presupuesto anual antes de contratar. | Pendiente de Dirección |

## 6. QA / Testing e integración

| Pedido | Por qué lo necesita el proyecto | Estado |
|---|---|---|
| Ambiente de testing definido (subdominio o instancia separada) | QA valida antes de promoción sin afectar datos reales. | En evaluación |
| Datos de prueba y criterios de aceptación | Validación previa a cada liberación. | Pendiente |
| Pruebas pre-despliegue (HTTPS, enlaces, accesos, responsive) | El Plan B exige prueba de QA antes de liberar cada versión. | Pendiente |

Frontend entrega versiones navegables tempranas y comunica qué está listo para probar.

## 7. Preguntas que Infraestructura debe confirmar antes de contratar

Del informe del Plan B (sección 17), para transmitir a los proveedores:

1. ¿El precio publicado incluye IVA/impuestos o hay cargos adicionales?
2. ¿Cuánto dura la promoción y cuál es el costo exacto de renovación?
3. ¿El plan incluye IPv4 pública?
4. ¿Los backups están incluidos? ¿Frecuencia y retención?
5. ¿Se pueden generar snapshots manuales?
6. ¿Se puede escalar CPU/RAM sin reinstalar?
7. ¿Qué datacenter/región estará disponible?
8. ¿Qué SLA y soporte ofrece el proveedor?
9. ¿Hay restricciones para ejecutar Docker, PostgreSQL, Nginx o aplicaciones Python?
10. ¿El IFTS puede administrar directamente la cuenta y las credenciales?
11. ¿Cuál es el costo final en ARS con el método de pago elegido?

## 8. Frontend (este equipo)

| Tema | Detalle | Estado |
|---|---|---|
| Definir build y archivos a publicar en el VPS | Frontend entrega build estático servido desde Nginx. | En definición |
| URLs definitivas del sitio (dominio .com.ar) | Dependen de la aprobación de Dirección y del registro en NIC Argentina. | Bloqueado (Dirección) |
| URLs oficiales de Moodle e inscripción | Placeholders hasta recibir las oficiales. | Pendiente de IFTS |
| Integración con la API del backend | Depende de los contratos de Backend; no se consume API real aún. | Bloqueado (Backend) |
| Stack definitivo | React 19 + Vite + TS strict + Tailwind v4 propuesto y alineado con el skill; fases 1-4 implementadas con él. A validar en la reunión del lunes 31/08. | A validar |

## 9. Riesgos y mitigaciones (transversal)

| Riesgo | Impacto | Mitigación |
|---|---|---|
| Variación cambiaria | Planes en USD/EUR aumentan en ARS. | Priorizar proveedores que facturen en ARS o presupuestar margen. |
| Promociones temporales | Año 1 barato, renovación elevada. | Evaluar costo a 24 meses antes de contratar. |
| Pérdida de datos | Falla del VPS o error humano. | Backups externos y pruebas de restauración periódicas. |
| Acceso no autorizado | Exposición de SSH o credenciales. | Claves SSH, firewall, mínimos privilegios y actualizaciones. |
| Dependencia de una sola persona | Conocimiento concentrado. | Documentar procedimientos y compartir responsabilidades. |
| Falla de despliegue | Una versión puede afectar producción. | Testing previo y proceso de promoción controlado. |
| Latencia internacional | Proveedores europeos responden más lento desde Argentina. | Medir latencia y priorizar región cercana si es requisito. |

## 10. Qué se avanzó al cierre de la Fase 5 (30/08/2026)

- Estructura del proyecto y propuesta tecnológica documentada (válida y alineada con el skill).
- **Home navegable con datos simulados** (mocks marcados como provisorios en `mock-data.ts`).
- Componentes reutilizables presentacionales (incluye `SliderNoticias` y `Comunidades`),
  con accesibilidad y responsive implementado.
- Rutas de las secciones ya identificadas y navegables (`AppRouter`).
- Accesos a Moodle e inscripción con placeholders; enlaces externos visibles solo con URL.
- Documentación del contexto del Plan B (consolidada en `docs/frontend/`).
- Listado de preguntas para proveedores y para Dirección.
- Checklist `lint` · `build` · `test` en verde (7 suites, 11 pruebas).
- Roles de equipo registrados en `rol_equipo.md`.

**Pendiente que no se resuelve unilateralmente:** validación del stack/paleta con UX/UI y el
equipo (reunión del lunes), contratos de API con Backend, VPS con Infra/Dirección y URLs
oficiales de Moodle/inscripción con IFTS.
