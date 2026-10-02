# Auditoría de Infraestructura — Requerimientos vs. Proyecto

Área: Frontend (enlace transversal: Emilio Aquino) · Proyecto Sitio Web Institucional IFTS N.º 12 — 2026
Fecha: 09/09/2026 · Rama: `feature/requerimientos-infraestructura`

> **Objetivo:** verificar que los documentos de `documentacion/driveFrontend/05_infraestructura/`
> (especificación técnica, cuestionario Moodle y checklist del grupo 5) sean consistentes
> con el estado real del proyecto frontend y con la documentación interna del Frontend.

## 1. Documentos auditados

| # | Documento fuente de Infra | Proyecto comparado |
|---|---|---|
| D1 | `espesificacion_tecnica_requerimientos_infraestructura.md` | `documentacion/frontend/propuesta-tecnologica.md` §6-7 |
| D2 | `cuestionario_moodle_hosting.md` | `documentacion/frontend/dependencias-equipos.md` §4-5 |
| D3 | `grupo_5_infraestructura.md` | `documentacion/frontend/propuesta-tecnologica.md`, `src/` (código) |

Verificado en sesión actual: archivos leídos y código inspeccionado (`vite.config.ts`,
`package.json`, `src/api/endpoints.ts`, `src/constants/enlaces.ts`, `index.html`).

## 2. Resultado general

| Área | Estado |
|---|---|
| Hardware y dimensionamiento | 🟡 Parcialmente consistente |
| Software, runtime y stack | ✅ Consistente |
| Build estático y SPA | ✅ Consistente |
| Dominio, DNS y SSL | ⚠️ Inconsistencia menor (typo en dominio) |
| Seguridad y hardening | 🟡 Parcialmente consistente |
| Estrategia de ambientes | ✅ Consistente |
| Variables de entorno | 🟡 Brecha de coordinación |
| Configuración Nginx | ✅ Consistente |
| Backups y monitoreo | ✅ Consistente |

## 3. Detalle por área

### 3.1. Hardware y dimensionamiento

| Nivel | Especificación (D1 §2) | Propuesta tecnológica (§6.4) | Verdict |
|---|---|---|---|
| Mínimo (Dev/Testing) | 1 vCPU · 2 GB · 25-30 GB · 1 TB/100 Mbps | 1-2 vCPU · 2 GB · 25-50 GB | 🟡 Difiere en vCPU y disco |
| **Recomendado (Prod inicial)** | **2 vCPU · 4 GB · 50-80 GB · 4 TB/1 Gbps** | **2 vCPU · 4 GB · 50-80 GB** | ✅ Igual |
| Ideal (Escalado) | 4 vCPU · 8 GB · 100-160 GB · 8 TB/1 Gbps | 4 vCPU · 8 GB · 80-160 GB | 🟡 Difiere en disco |

- **Hallazgo INF-A1:** el ancho de banda/red (1 TB, 4 TB, 8 TB) figura solo en la
  especificación técnica; la propuesta tecnológica no lo documenta.
- **Hallazgo INF-A2:** los rangos de disco del nivel mínimo (25-30 vs 25-50) e ideal
  (100-160 vs 80-160) difieren levemente entre ambos documentos. No es bloqueante, pero
  conviene unificar la tabla de referencia en un solo lugar.

### 3.2. Software, runtime y stack

| Componente | Especificación (D1 §3) | Propuesta (§6.2-6.3) | Verdict |
|---|---|---|---|
| SO | Ubuntu Server 22.04/24.04 LTS | Ubuntu Server LTS o equivalente | ✅ |
| Servidor web | Nginx ≥ 1.18 (reverse proxy + TLS) | Nginx como reverse proxy | ✅ |
| Aplicación | Gunicorn o Uvicorn (systemd/Supervisor) | Gunicorn → Python/Flask | ✅ |
| Python | 3.10+ (ideal 3.11/3.12) | "Python 3.x + Flask/REST" | 🟡 Propuesta menos precisa |
| BD | PostgreSQL 14+ (alternativa MySQL 8/MariaDB 10.6+) | PostgreSQL recomendado / MySQL-MariaDB | ✅ |
| Contenedores | Docker Engine 24.0+ y Compose v2.x | Docker + Compose (a confirmar) | ✅ |
| Variables de entorno | `.env` obligatorio; prohibido credenciales en el repo | Secrets en env vars, nunca en repo | ✅ |

- **Hallazgo INF-B1:** la propuesta tecnológica no fija versiones mínimas (Python 3.10+,
  PostgreSQL 14+, Docker 24.0+, Nginx ≥ 1.18). Recomendable alinearla con la especificación.

### 3.3. Build estático y SPA routing

| Requisito (D1 §3.3 y D3 §3.1) | Estado real del proyecto | Verdict |
|---|---|---|
| Build compilado y optimizado (`dist/`) | `npm run build` = `tsc -b && vite build` ✅ | ✅ |
| Regla de fallback SPA | Prevista en bloque Nginx de D3 (`try_files → /index.html`) ✅ | ✅ |
| Imágenes WebP/SVG ≤ 500 KB | Sin política implementada ni documentada | 🔵 Pendiente |

- **Hallazgo INF-C1:** el frontend no tiene aún criterio de optimización de assets
  (formatos WebP/SVG y peso máximo por imagen). La especificación lo exige; no hay nadie
  documentándolo en `propuesta-tecnologica.md` ni en la estructura actual (`public/` solo
  tiene `vite.svg`).

### 3.4. Dominio, DNS y SSL

| Tema | Especificación (D1 §4) / Grupo 5 (D3 §2) | Propuesta (§6.5) | Verdict |
|---|---|---|---|
| Extensión de dominio | .com.ar (o .edu.ar) | .com.ar recomendado | ✅ |
| Registro | NIC Argentina | NIC Argentina, ARS 8.500/año | ✅ |
| Registros DNS | A, CNAME, subdominio campus | A/AAAA + CNAME | ✅ |
| HTTPS | Let's Encrypt/Certbot, redir 80→443, TLS 1.2/1.3, HSTS | Let's Encrypt | 🟡 Propuesta no detalla TLS/HSTS |
| Subdominio QA | `test.ifts12.edu.ar` | Subdominio o instancia separada | ✅ |
| Subdominio Moodle | `campus.ifts12.edu.ar` | No documentado en propuesta | 🟡 |

- **Hallazgo INF-D1 (typo):** D3 (`grupo_5_infraestructura.md`) usa `iffts12.edu.ar`
  **con doble "f"** de forma consistente (líneas 66, 67, 72, 96, 100, 103). El dominio
  correcto es `ifts12.edu.ar` (una sola f). Este typo es peligroso porque puede
  propagarse a la config real de Nginx/DNS.
- **Hallazgo INF-D2:** la propuesta tecnológica no menciona el subdominio `campus` para
  Moodle ni los requisitos TLS/HSTS que sí fija la especificación.

### 3.5. Seguridad y hardening

| Medida | Especificación (D1 §5) | Propuesta (§6.7) / Grupo 5 | Verdict |
|---|---|---|---|
| SSH solo con claves (RSA 4096/Ed25519) | ✅ | ✅ (claves) | ✅ |
| Root deshabilitado SSH | ✅ | ✅ | ✅ |
| Firewall solo 80/443/22 | ✅ | ✅ | ✅ |
| Cabeceras de seguridad Nginx | ✅ (X-Frame-Options, X-Content-Type, X-XSS, CSP) | ❌ No documentado | 🔵 Brecha |
| `client_max_body_size` 15 MB | ✅ | ❌ No documentado | 🔵 Brecha |
| Actualizaciones de seguridad | No mencionado | ✅ (grupo_5 §6) | ✅ |

- **Hallazgo INF-E1:** la especificación exige cabeceras de seguridad HTTP servidas por
  Nginx. Ni la propuesta tecnológica ni el bloque Nginx de D3 las incluyen.
- **Hallazgo INF-E2:** el límite de 15 MB para subidas (`client_max_body_size`) está solo
  en la especificación; no está reflejado en el bloque Nginx propuesto por D3.

### 3.6. Estrategia de ambientes

| Ambiente | Especificación (D1 §6) | Propuesta (§6.8) / Grupo 5 | Verdict |
|---|---|---|---|
| Desarrollo | Local (Docker Compose, seeders) | Local (Docker Compose sugerido) | ✅ |
| Testing/QA | Contenedor aislado o `test.ifts12.edu.ar` | Subdominio o instancia separada | ✅ |
| Producción | VPS principal, datos reales, HTTPS | VPS principal con backups | ✅ |

- **Hallazgo INF-F1:** consistente. La propuesta agrega el criterio "si el presupuesto no
  permite segundo VPS, aislar servicios de prueba", que enriquece la especificación.

### 3.7. Variables de entorno

| Variable requerida (D3 §3.3) | Estado en el código | Verdict |
|---|---|---|
| `VITE_API_BASE_URL` | `src/api/endpoints.ts` → `API_BASE_URL = ''` (placeholder) | 🔵 Sin valor |
| `VITE_MOODLE_URL` | `src/constants/enlaces.ts` → `moodle: ''` | 🔵 Sin valor |
| `VITE_INSCRIPCION_URL` | `src/constants/enlaces.ts` → `inscripcion: ''` | 🔵 Sin valor |

- **Hallazgo INF-G1:** el código no usa `import.meta.env` ni ninguna variable `VITE_*`
  (verificado con grep de `import.meta.env|VITE_` en `src/`). Las URLs viven como
  constantes vacías en `enlaces.ts` y `endpoints.ts`. Falta el `.env.production` que
  D3 requiere y no existe `.env.example` en el repo.
- **Hallazgo INF-G2:** D3 solo define 3 variables pero el frontend tiene 6 placeholders de
  URLs (`moodle`, `inscripcion`, `siu`, `constancias`, `mesasExamen`, `calendario`).
  Hay que acordar con Infra si cada una va como variable de entorno o como constante que
  Infra copie al hacer deploy.

### 3.8. Configuración Nginx

| Aspecto | Bloque Nginx (D3 §3.2) | Requerimiento real | Verdict |
|---|---|---|---|
| Redir HTTP → HTTPS | ✅ (`return 301 https://…`) | ✅ | ✅ |
| SPA fallback | ✅ (`try_files $uri $uri/ /index.html`) | ✅ | ✅ |
| Proxy `/api/` → Gunicorn | ✅ (`proxy_pass http://127.0.0.1:5000`) | ✅ | ✅ |
| Cache de assets | ✅ (`expires 30d`) | ✅ | ✅ |
| Cabeceras de seguridad | ❌ ausente | D1 §5 las exige | 🔵 Brecha |
| Límite de subida | ❌ ausente | D1 §5 fija 15 MB | 🔵 Brecha |

- **Hallazgo INF-H1:** el bloque Nginx de D3 sirve el SPA correctamente, pero no incluye
  las cabeceras de seguridad ni el `client_max_body_size` que la especificación exige.
  El ejemplo debe completarse.

### 3.9. Backups y monitoreo

| Tema | Especificación (D1 §7) | Grupo 5 (D3 §5/§7) y propuesta | Verdict |
|---|---|---|---|
| Dump diario BD (retención 30 días) | ✅ | ✅ (estrategia a definir) | ✅ |
| Backup semanal archivos cargados | ✅ | ✅ | ✅ |
| Prueba de restauración trimestral | ✅ | ✅ (responsables de verificación) | ✅ |
| Backups fuera del VPS | ✅ | ✅ | ✅ |
| Snapshot del VPS | No mencionado | ✅ (D3 §5.2) | ✅ |
| Monitoreo (CPU/disco/logs) | ✅ (UptimeRobot/Grafana Agent) | ✅ (alertas email/Telegram) | ✅ |

- **Hallazgo INF-I1:** consistente. La especificación es más concreta (frecuencia,
  retención), la propuesta y D3 lo complementan con responsabilidades y snapshots.

### 3.10. Cuestionario Moodle (D2)

Documento de relevamiento para la reunión con Oscar (hosting actual del Moodle).
No es un requerimiento directo del frontend, pero sus resultados condicionan:

- Confirmación del Plan B (VPS) si el hosting Moodle es exclusivo.
- Estrategia de subdominios (`campus.ifts12.edu.ar`) y redirecciones 301.
- Gestión de SSL y DNS existentes.
- Límites de servidor (upload, usuarios concurrentes) para parametrizar el nuevo VPS.

- **Hallazgo INF-J1:** no hay conflictos con el proyecto. 📋 La hoja de trabajo de D2
  (§2) sigue vacía — se completa en la reunión; el frontend debe recibir el resultado
  para ajustar `enlaces.ts` y las decisiones de build.

## 4. Brechas detectadas (resumen accionable)

| ID | Brecha | Severidad | Área responsable |
|---|---|---|---|
| INF-D1 | Typo `iffts12.edu.ar` (doble f) en D3 | 🔴 Alta — puede propagarse a config real | Infra (Frontend corrige su doc interno) |
| INF-E1 | Cabeceras de seguridad Nginx ausentes en D3 y propuesta | 🟠 Media | Infra (copiar de D1 §5) |
| INF-E2 | `client_max_body_size` 15 MB ausente en D3 | 🟠 Media | Infra |
| INF-G2 | Las 3 variables no cubren los 6 placeholders de URLs | 🟠 Media | Infra + Frontend |
| INF-G1 | No hay `.env.example` ni uso de `import.meta.env` | 🟡 Baja | Frontend |
| INF-C1 | Sin política de optimización de imágenes (WebP ≤ 500 KB) | 🟡 Baja | Frontend + Infra |
| INF-A1 | Ancho de banda no documentado en propuesta tecnológica | 🟡 Baja | Frontend |
| INF-A2 | Rangos de disco divergentes entre D1 y propuesta | 🟡 Baja | Frontend + Infra |
| INF-B1 | Propuesta sin versiones mínimas de Python/PostgreSQL/Docker/Nginx | 🟡 Baja | Frontend |
| INF-D2 | Subdominio campus y TLS/HSTS no documentados en propuesta | 🟡 Baja | Frontend |

## 5. Checklist accionable para Frontend

> Qué debe preparar el Frontend para que el despliegue en el VPS salga sin fricción.
> Los ítems ✅ ya están resueltos; los pendientes son trabajo de este equipo o acuerdo
> con Infra.

### 5.1. Entrega del build

- [x] `npm run build` produce `dist/` listo para Nginx (verificado: `tsc -b && vite build`).
- [x] Aplicación SPA con ruteo de cliente (React Router v7) — requiere `try_files` en Nginx.
- [ ] Definir criterio de optimización de imágenes (WebP/SVG, máx. 500 KB) (INF-C1).
- [ ] Documentar el comando y las variables necesarias para el build de producción en README
      o en la propuesta tecnológica.

### 5.2. Variables de entorno

- [ ] Crear `.env.example` versionado con las variables documentadas (INF-G1).
- [ ] Migrar los placeholders de `enlaces.ts` y `API_BASE_URL` a `import.meta.env`.
- [ ] Acordar con Infra la lista final de variables: ¿3 (`VITE_MOODLE_URL`,
      `VITE_INSCRIPCION_URL`, `VITE_API_BASE_URL`) o 6 (sumando SIU, constancias,
      mesas de examen, calendario)? (INF-G2).
- [ ] Entregar `.env.production` (o la URL definitiva) cuando Infra/Dirección confirmen.

### 5.3. Coordinación con Infra

- [ ] Notificar el typo `iffts12.edu.ar` en D3 — pedir que corrijan a `ifts12.edu.ar` (INF-D1).
- [ ] Pedir a Infra que el bloque Nginx incluya: cabeceras de seguridad y
      `client_max_body_size 15m` (INF-E1, INF-E2).
- [ ] Pedir el resultado de la reunión con Oscar (D2) para confirmar Plan B, subdominio
      `campus` y redirecciones 301.
- [ ] Confirmar endpoints `/api/` y URL definitiva de la API (`VITE_API_BASE_URL`) con
      Backend + Infra.
- [ ] Coordinar estrategia de ambientes: ¿testing en subdominio o aislado en el mismo VPS?

### 5.4. Documentación interna

- [ ] Alinear la tabla de dimensionamiento de `propuesta-tecnologica.md` §6.4 con la
      especificación (INF-A1, INF-A2).
- [ ] Agregar versiones mínimas de software a `propuesta-tecnologica.md` §6.3 (INF-B1).
- [ ] Agregar subdominio `campus` + TLS/HSTS a `propuesta-tecnologica.md` §6.5 (INF-D2).
- [ ] Actualizar `docs/02_technical/estado_implementacion.md` §6 con los hallazgos de esta auditoría.

## 6. Conclusión

**El proyecto frontend está alineado con los requerimientos de infraestructura en lo
esencial**: arquitectura Plan B (VPS independiente), build estático servido por Nginx con
SPA fallback, stack Python/Flask/PostgreSQL/Docker, estrategia de ambientes y backups
coinciden entre la especificación técnica y la propuesta tecnológica.

Quedan 10 brechas, de las cuales solo **1 es severa** (typo de dominio en `grupo_5`) y el
resto son de alineación documental o coordinación con Infra. Ninguna bloquea la
implementación actual del frontend: todo lo pendiente depende de decisiones de
Infra/Dirección (VPS, dominio, URLs oficiales) que están fuera del alcance del equipo.