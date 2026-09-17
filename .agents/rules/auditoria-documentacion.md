# Auditoría de documentación — actualizar siempre el archivo del grupo

Regla dura. Aplica a agentes y humanos por igual.

## 1. Contexto y por qué existe

Cuando se audita documentación del proyecto (requerimientos, especificaciones, planes), el
resultado no puede quedarse solo en un informe aparte: el documento fuente del grupo/área
afectada debe quedar **actualizado** para seguir siendo la fuente de verdad. Ejemplo real:
la auditoría de infraestructura (09/09/2026) generó `docs/frontend/auditoria-infraestructura.md`
**y además** se actualizó `docs/driveFrontend/05_infraestructura/grupo_5_infraestructura.md`
marcando con ✅ lo ya cubierto y aplicando las correcciones detectadas.

## 2. Alcance

- Aplica a auditorías de cualquier documento de `docs/driveFrontend/` (análisis funcional,
  UX/UI, frontend, backend, infraestructura, QA).
- Aplica también a auditorías de documentación interna que afecten a un grupo (`docs/frontend/`,
  `docs/backend/`, etc.).
- No aplica a cambios triviales (typos sueltos sin auditar, formateo, renames cosméticos).

## 3. Pasos obligatorios

1. **Identificar** el grupo/área del documento auditado (1=Análisis, 2=UX/UI, 3=Frontend,
   4=Backend, 5=Infraestructura, 6=QA).
2. **Localizar** el archivo del grupo en `docs/driveFrontend/`: `grupo_1_analisis_funcional.md`,
   `grupo_2_ux_ui.md`, `grupo_3_frontend.md`, `grupo_4_backend.md`,
   `grupo_5_infraestructura.md`, `grupo_6_qa.md`.
3. **Leer completo** el archivo del grupo antes de editarlo (nunca editar sin releer).
4. **Marcar** con la leyenda de la sección 4 cada ítem según el estado verificado en la sesión.
5. **Aplicar** en el archivo del grupo las correcciones que surjan de la auditoría y estén
   verificadas (typos, valores, configs de ejemplo, estados).
6. **No commitear** los cambios del archivo del grupo: `docs/driveFrontend/` está en
   `.gitignore` (fuente de verdad compartida, no se versiona). Solo se versiona el informe de
   auditoría en `docs/frontend/`.

## 4. Leyenda de estados (consistente con las auditorías existentes)

| Símbolo | Significado |
|---|---|
| ✅ | listo / ya cubierto por el proyecto (verificado en la sesión) |
| 🟡 | parcial: difiere levemente entre documentos o falta alinear |
| 🔵 | pendiente externo: depende de otro equipo / Dirección / Backend |
| ⏳ | en proceso / bloqueado temporalmente |

## 5. Anti-alucinación

- Marcar ✅ **solo** lo verificado en la sesión actual (archivo leído, comando corrido).
- No cambiar estados que dependan de decisiones externas no confirmadas (ej. "VPS contratado"
  no se marca ✅ porque lo diga una propuesta: hay que confirmarlo con Infra/Dirección).
- Releer el archivo del grupo tras editarlo (`.opencode/rules/Reglas-anti-alucinacion.md` §4).

## 6. Cierre de la auditoría

1. Generar o actualizar el informe versionado en `docs/frontend/auditoria-*.md`, referenciando
   el archivo del grupo modificado.
2. Actualizar `docs/estado_actual_proyecto.md` (sección correspondiente, in-place).
3. Agregar entrada en `docs/bitacora_agentica.md` (append-only) con fecha, qué se hizo,
   decisiones, archivos tocados y estado resultante.