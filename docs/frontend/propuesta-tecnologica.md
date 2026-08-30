# Propuesta Tecnológica — Frontend + Infraestructura (unificada)

Área: Frontend · Proyecto Sitio Web Institucional IFTS N.º 12 — 2026
Documento unificado: stack del frontend (según skill `fe-architect-scaffold`) + infraestructura
del Plan B (VPS independiente del Moodle).

> **Estado (cierre Fase 5, 30/08/2026):** las Fases 1-4 están implementadas y mergeadas a
> `develop` (tags `v1.0.0`…`v1.3.0`). Este documento refleja el estado real del código: stack,
> estructura de carpetas y componentes efectivamente creados, además de la propuesta de
> infraestructura del Plan B (pendiente de decisión de Dirección/Infra).

Fuentes de verdad:
- `docs/driveFrontend/Plan_B_Infraestructura_VPS_IFTS12_2026.docx` (relevamiento 28/08/2026).
- Skill `fe-architect-scaffold` (`.opencode/skills/fe-architect-scaffold/SKILL.md`).

## 1. Stack del frontend

| Categoría | Tecnología | Justificación |
|---|---|---|
| Build tool | Vite | Rápido, moderno, configuración mínima. |
| Framework | React 19 | Estándar de la industria. |
| Lenguaje | TypeScript (strict) | Tipado fuerte; prohibido `any`. |
| Router | React Router v7 | Sucesor de v6; rutas tipadas de frontend. |
| HTTP client | Axios | Interceptores y manejo de errores centralizado. |
| Estado API | TanStack Query v5 | Cache, refetch y estados de carga/error. |
| Estado global | Context API + useReducer | Simple, sin dependencias extra. |
| Validación | Zod | Esquemas de forms y validación de respuestas en el borde. |
| Estilos | Tailwind CSS v4 | Config en CSS nativo (`@theme`), base visual consistente. |
| Linting/Formato | Biome | Reemplaza ESLint + Prettier en un binario. |
| Testing | Vitest + React Testing Library | Alineado con Vite. |

La decisión se coordina con Backend e Infraestructura para no complicar el despliegue.

## 2. Estructura de carpetas (implementada)

```
src/
├── api/
│   ├── client.ts           # Instancia de Axios con interceptores (preparada)
│   ├── endpoints.ts        # Constantes de URLs del backend (sin endpoints inventados)
│   └── services/           # Servicios por dominio (a crear cuando haya contratos)
├── components/
│   ├── ui/                 # Button, CardCarrera, CardNoticia, FaqAcordeon, AccesosRapidos,
│   │                       # SliderNoticias, Comunidades
│   └── layout/             # Header, NavMenu, Footer, Portada
├── pages/                  # Home, Carreras, Ingresantes, Estudiantes, Docentes, Tutorías,
│                           # Institucional, Noticias, FAQ, Contacto, PaginaPlaceholder, 404
├── hooks/                  # Lógica reutilizable (vacío; se completa con los contratos)
├── contexts/               # AuthContext (vacío/preparado), ThemeContext
├── routes/                 # AppRouter.tsx, ProtectedRoute.tsx (preparado)
├── types/
│   ├── api/                # error.types.ts (espejo del backend; resto vacío hasta contratos)
│   └── domain/             # sitio.types.ts (Carrera, Noticia, FaqItem, AccesoRapido, Comunidad)
├── utils/                  # cn.ts (helper de clases condicionales)
├── constants/              # navegacion.ts, mock-data.ts, enlaces.ts (placeholders)
├── styles/                 # index.css (tokens @theme, regla 90/10)
├── __tests__/              # Suites de Vitest + React Testing Library
└── App.tsx
```

## 3. Componentes reutilizables (implementados)

### Layout (`components/layout/`)
- `Header` + `NavMenu` — encabezado y menú (máx. 5 items, logo enlazado a Home, menú fijo y
  hamburguesa mobile).
- `Footer` — pie institucional con secciones, enlaces y bloque de conexiones (campus/inscripción).
- `Portada` — bloque visual inicial parametrizable (titular, subtítulo, acciones).

### UI (`components/ui/`)
- `Button` — variantes tipadas y soporte de enlaces internos/externos.
- `CardCarrera` — tarjeta de carrera.
- `CardNoticia` — tarjeta de novedad.
- `SliderNoticias` — carrusel accesible de novedades (indicador de posición, anterior/siguiente,
  ARIA; sin librerías externas).
- `FaqAcordeon` — preguntas frecuentes accesibles (un ítem abierto a la vez).
- `AccesosRapidos` — accesos directos en Home, con ítems pendientes deshabilitados.
- `Comunidades` — grilla de cards enlazadas (tutoría, alumnos, docentes).

Todos son **presentacionales**: solo reciben props tipadas, no hacen llamadas HTTP ni manejan
estado global. La única excepción es el estado local de UI (menú móvil, acordeón y slider).

## 4. Reglas de implementación (anti-alucinación)

- Solo se consumen los endpoints documentados en la tabla oficial del backend
  (actualmente vacía → el frontend no consume API real en esta etapa).
- Prohibido `any`; `tsconfig` en strict.
- Errores HTTP se manejan en un interceptor global de Axios, no con `try/catch` dispersos.
- Autenticación real no se implementa hasta que el backend la soporte; se deja la estructura
  (`AuthContext`, `ProtectedRoute`) preparada.
- La Home se arma con datos simulados y sin afirmaciones institucionales definitivas.

## 5. Scripts (implementados)

- `npm run dev` — servidor de desarrollo (Vite).
- `npm run build` — TypeScript + build estático de producción (para servir desde Nginx).
- `npm run lint` — Biome (check sobre `src`).
- `npm run lint:fix` — Biome con auto-formateo.
- `npm run test` — Vitest + React Testing Library.

Checklist previa a mergear: `npm run lint` · `npm run build` · `npm run test` (en verde).

## 6. Infraestructura del Plan B (VPS)

### 6.1. Principios
- El **Moodle actual no se migra ni se reemplaza**. El VPS es exclusivo de la nueva web.
- Alojamiento **VPS real con SSH administrativo**, no hosting compartido.
- Registro del dominio en **NIC Argentina**, independiente del proveedor del VPS.
- Frontend se entrega como **build estático servido por Nginx**.

### 6.2. Arquitectura (una sola máquina en la primera etapa)
```
Internet
   │
   ▼
[ Nginx ]  reverse proxy + terminación HTTPS (Let's Encrypt/Certbot)
   │
   ├──► build estático del Frontend (HTML/CSS/JS)
   │
   └──► [ Gunicorn ] → aplicación Python/Flask (REST)
                │
                ▼
          [ PostgreSQL ]  usuarios, roles, noticias, carreras,
                          horarios, FAQ y contenidos dinámicos
```

### 6.3. Requisitos técnicos mínimos del VPS
- Ubuntu Server LTS o distribución equivalente soportada.
- SSH completo y privilegios administrativos (root o sudo).
- Python 3.x + Flask/REST (u otra alternativa acordada por Backend) con Gunicorn.
- Nginx como reverse proxy y terminación HTTPS (Let's Encrypt/Certbot).
- PostgreSQL (recomendado) / MySQL-MariaDB como alternativa.
- Docker + Docker Compose opcionales pero recomendables (confirmar metodología).
- Firewall, SSH con claves, root deshabilitado cuando corresponda, actualizaciones.
- Backups automáticos y snapshot del VPS si el proveedor lo permite.
- Escalabilidad de RAM/CPU/disco sin migración compleja.

### 6.4. Dimensionamiento
| Escenario | CPU | RAM | Disco | Uso |
|---|---|---|---|---|
| Desarrollo / pruebas | 1-2 vCPU | 2 GB | 25-50 GB | Prototipos, integración, baja concurrencia. |
| **Recomendado (producción inicial)** | **2 vCPU** | **4 GB** | **50-80 GB** | Flask + PostgreSQL + Nginx + tráfico moderado. |
| Con margen de crecimiento | 4 vCPU | 8 GB | 80-160 GB | Mayor concurrencia y margen operativo. |

Baseline para evaluar: **2 vCPU / 4 GB RAM**. No se dimensiona para Moodle.

### 6.5. Dominio
- Extensión recomendada: `.com.ar` (salvo que la institución determine otra).
- Registro directo en NIC Argentina: ARS 8.500/año (alta, 28/08/2026).
- Renovación anual presupuestada; dominio a nombre del IFTS.
- DNS del dominio apuntando a la IP pública del VPS (A/AAAA y, si corresponde, CNAME).

### 6.6. Proveedores relevados (fecha 28/08/2026)
Rangos de precios mensuales (promo/renovación donde aplica y equivalencias aproximadas).
**Todos los importes deben revalidarse en la página oficial antes de contratar.**

| Proveedor | Plan relevado | Mensual ARS (ref. 28/08/2026) | Comentario |
|---|---|---|---|
| Hostinger | 2 vCPU / 8 GB | 17.699 promo / 31.399 renovación | Operación simple, buena RAM promocional. |
| DonWeb | Cloud configurable | Desde ~7.200 (cotizar 2 vCPU / 4 GB) | Proveedor local; facturación adaptada. |
| DigitalOcean | 2 vCPU / 4 GB | ~47.892 (eq.) | Ecosistema maduro; factura en USD. |
| Vultr | 2 vCPU / 4 GB | ~55.874 (eq.) | Costo cercano a referencia actual (64.000). |
| Akamai / Linode | 2 vCPU / 4 GB | ~39.910 (eq.) | Buen equilibrio costo/recursos. |
| Hetzner | 2 vCPU / 4 GB | ~9.650 (eq.) | Muy competitivo; datacenter europeo, factura en EUR. |

Costo de referencia del servicio actual (incluye Moodle): ARS 64.000/mes — solo como
referencia presupuestaria. Tipo de cambio de referencia: dólar tarjeta ARS 1.995,50/USD
(28/08/2026); en EUR recalcular al contratar.

Recomendación del informe para evaluación con Dirección: pedir cotización final de dos
opciones de operación simple y facturación previsible (p. ej. Hostinger y DonWeb), manteniendo
DigitalOcean, Akamai/Linode y Hetzner como referencia técnico-económica.

### 6.7. Seguridad y operación
- Autenticación SSH por clave; evitar contraseñas débiles.
- Usuarios operativos con sudo; restringir root directo cuando sea viable.
- Firewall con solo los puertos necesarios; SO y dependencias actualizados.
- HTTPS obligatorio con Let's Encrypt.
- Secretos en variables de entorno o gestor; nunca en el repositorio.
- Backups en destino diferente del VPS; responsables de restauración y verificación.
- Logs y alertas mínimas de disponibilidad, CPU, RAM y disco.

### 6.8. Estrategia de ambientes
| Ambiente | Objetivo | Propuesta |
|---|---|---|
| Desarrollo | Trabajo diario de los equipos | Local en los equipos; preferentemente Docker Compose. |
| Testing | Integración y validación QA | Subdominio o instancia separada; si el presupuesto no permite segundo VPS, aislar servicios y datos de prueba. |
| Producción | Sitio institucional público | VPS principal con datos reales, backups, HTTPS y acceso restringido. |

### 6.9. Flujo de despliegue recomendado
1. Registrar el dominio `.com.ar` en NIC Argentina.
2. Contratar el VPS; obtener IP pública y acceso SSH.
3. Configurar DNS del dominio hacia la IP del VPS.
4. Instalar y asegurar Ubuntu Server LTS.
5. Instalar Docker Engine y Compose si la arquitectura acordada los usa.
6. Configurar Nginx como reverse proxy.
7. Desplegar la aplicación Python/Flask y servicios asociados.
8. Crear/configurar PostgreSQL y usuarios de BD.
9. Configurar HTTPS con Let's Encrypt.
10. Implementar backups automáticos.
11. Habilitar ambiente de testing y proceso de promoción.
12. Pruebas de QA antes de liberar cada versión.

## 7. Pendientes a validar antes de contratar el VPS

- Confirmar metodología Docker + Compose con el equipo.
- Cotizaciones formales y preguntas técnicas a proveedores (ver `dependencias-equipos.md`).
- Definir presupuesto anual (dominio + VPS + renovación).
- Confirmar región/datacenter y posible latencia.

## 8. Responsive y accesibilidad (estado)

- Estrategia mobile-first con breakpoints móvil/tablet/desktop (grids `sm:`/`lg:` en la Home y en
  los componentes de grilla).
- ARIA, navegación por teclado (foco visible en botones y enlaces), `alt`/textos alternativos y
  `aria-live` en el slider de novedades.
- Menú con hamburguesa mobile y enlaces accesibles por teclado.
- Coordinación con UX/UI para wireframes y criterios visuales definitivos (regla 90/10 de color).
