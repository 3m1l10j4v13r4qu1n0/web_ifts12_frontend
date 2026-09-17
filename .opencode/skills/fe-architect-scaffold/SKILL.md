---
name: fe-architect-scaffold
description: Estandarizar la implementación del frontend en React.js + Vite + TypeScript, garantizando arquitectura escalable, bajo acoplamiento con la UI y alineación estricta con el backend existente. Usar cuando el usuario pida crear una pantalla, componente, hook, servicio o funcionalidad nueva en el frontend, o conectar el frontend a un endpoint del backend.
disable-model-invocation: true
---

# FE Architect Scaffold

Este skill actúa como un **contrato de no-alucinación**: el agente NO puede inventar endpoints, tipos ni comportamientos que no estén documentados en el backend real.

## 📜 Reglas inquebrantables del frontend

### 1. Fuente única de verdad: el backend
- Prohibido inventar endpoints: solo se pueden consumir los documentados en la tabla oficial más abajo.
- Prohibido inventar campos en las respuestas: los tipos TypeScript deben reflejar **exactamente** los esquemas del backend `caja_negra.md`.
- Prohibido inventar códigos de error: solo se manejan los que el backend devuelve vía `caja_negra.md`.

### 2. Separación de responsabilidades
- **Componentes presentacionales (UI)**: solo reciben props y renderizan. No hacen llamadas HTTP ni manejan estado global.
- **Componentes contenedores (Pages/Containers)**: orquestan datos, llaman a servicios/API y pasan props a los presentacionales.
- **Custom Hooks**: encapsulan lógica reutilizable (llamadas HTTP, estado local complejo).
- **Servicios/API Client**: única capa que conoce los endpoints y formatos del backend.

### 3. Manejo centralizado de errores HTTP
- Prohibido usar `try/catch` dispersos en componentes para errores de API.
- Todos los errores HTTP (400, 403, 404, 409, 500) se manejan en un **interceptor global de Axios** o un **ErrorBoundary** de React.
- Los errores de negocio del backend se mapean a mensajes amigables para el usuario.

### 4. Tipado estricto con TypeScript
- `tsconfig.json` con `"strict": true`.
- Prohibido usar `any`. Si un tipo no está claro, definirlo explícitamente.
- Los tipos de respuesta de API viven en `src/types/api/` y reflejan los esquemas Pydantic.

### 5. Estructura de carpetas estricta

```
src/
├── api/
│   ├── client.ts           # Instancia de Axios con interceptores
│   ├── endpoints.ts        # Constantes de URLs (evita strings mágicos)
│   └── services/
│       ├── venta.service.ts
│       ├── producto.service.ts
│       └── cambio.service.ts
├── components/
│   ├── ui/                 # Botones, inputs, modales, cards
│   └── layout/              # Header, Footer, Sidebar
├── pages/
│   ├── ventas/
│   ├── productos/
│   └── cambios/
├── hooks/                   # useVentas, useProductos, etc.
├── contexts/                # AuthContext, ThemeContext
├── routes/
│   ├── AppRouter.tsx
│   └── ProtectedRoute.tsx   # Preparado para autenticación futura
├── types/
│   ├── api/                 # Espejo de los esquemas Pydantic
│   └── domain/
├── utils/
├── constants/
├── styles/
└── App.tsx
```

### 6. Estado global (YAGNI)
- No usar Redux a menos que sea estrictamente necesario.
- Estado global simple: Context API + `useReducer`.
- Estado global complejo futuro: considerar Zustand.
- Datos de API: TanStack Query (React Query) para cache, refetch y estados de carga/error.

### 7. Preparación para autenticación (fase futura)
- Crear un `AuthContext` vacío con estructura básica (user, token, login, logout).
- Crear un `ProtectedRoute` que redirija a `/login` si no hay token.
- Configurar el interceptor de Axios para inyectar `Authorization: Bearer <token>` cuando exista.
- **NO implementar login real todavía** (YAGNI): solo dejar la estructura lista.

## 🔄 Flujo de trabajo estándar (6 pasos)

Seguir este orden y **esperar confirmación explícita antes de avanzar al siguiente paso**.

### Paso 1: Definición de Tipos y Contratos (API Layer)
**Ubicación**: `src/types/api/` y `src/api/services/`
- Crear los tipos TypeScript que reflejen los esquemas Pydantic del backend (Request y Response).
- Crear la función del servicio que consumirá el endpoint correspondiente.
- **Validación**: comparar línea por línea con el esquema Pydantic del backend. Si hay discrepancia, DETENER y consultar.

### Paso 2: Configuración de Rutas
**Ubicación**: `src/routes/`
- Agregar la nueva ruta en `AppRouter.tsx`.
- Si requiere autenticación (futuro), envolverla en `ProtectedRoute`.
- Definir la ruta en `endpoints.ts` si es un path del frontend.

### Paso 3: Componentes Presentacionales (UI)
**Ubicación**: `src/components/ui/`
- Crear los componentes visuales reutilizables (botones, formularios, tablas, cards).
- Deben recibir solo props tipadas, sin lógica de negocio.
- Aplicar estilos consistentes (Tailwind o CSS Modules).

### Paso 4: Custom Hooks (Lógica de UI)
**Ubicación**: `src/hooks/`
- Crear hooks como `useVentas`, `useProductos`, `useBuscarProductos`.
- El hook encapsula: estado de carga, estado de error, datos, y la llamada al servicio.
- Si se usa TanStack Query, el hook envuelve `useQuery` o `useMutation`.

### Paso 5: Página/Contenedor (Orquestación)
**Ubicación**: `src/pages/`
- Crear la página que consume el hook y renderiza los componentes presentacionales.
- Manejar los tres estados universales: Loading, Error, Success.
- NO hacer llamadas HTTP directamente acá; delegar al hook.

### Paso 6: Pruebas de Componentes
**Ubicación**: `src/__tests__/` o junto al componente (`*.test.tsx`)
- Usar Vitest + React Testing Library.
- Probar comportamiento, no implementación (ej. "al hacer clic se muestra el modal", no "se llama a setState").
- Mockear los servicios API con `vi.mock()`.

## 📋 Lista oficial de endpoints del backend (anti-alucinación)

⚠️ **Regla de oro**: solo se pueden consumir estos endpoints. Si necesitás uno que no está acá, DETENÉ la implementación y consultá al usuario.

> ⚠️ **Mantenimiento**: esta tabla debe actualizarse en el mismo commit que agrega un endpoint nuevo al backend antes de asumir que un endpoint no existe.

> Rutas confirmadas por Backend el 15/09/2026 (`docs/driveFrontend/04_backend/respuesta.md`,
> auditoría `docs/frontend/auditoria-backend.md`). Prefijo `/api/` (sin `/api/v1/`). La tabla
> oficial con parámetros, bodies y esquemas (Swagger/OpenAPI) llega como entrega 2 de Backend.

| Método | Endpoint | Propósito | HU asociada |
| :--- | :--- | :--- | :--- |
| GET | `/api/carreras` | Listado de carreras | — |
| GET | `/api/carreras/:id` | Detalle, plan y materias | — |
| GET | `/api/noticias` | Listado de noticias/novedades | — |
| GET | `/api/noticias/:id` | Detalle de noticia | — |
| GET | `/api/faqs?segmento=X` | FAQ filtradas por segmento | — |
| GET | `/api/slider` | Carrusel activo de la Home | — |
| GET | `/api/calendario` | Calendario académico | — |
| GET | `/api/horarios` | Horarios | — |
| GET | `/api/docentes` | Docentes | — |
| GET | `/api/autoridades` | Autoridades | — |
| GET | `/api/bedeles` | Bedeles | — |
| GET | `/api/becas` | Becas | — |
| GET | `/api/tutorias` | Tutorías | — |
| POST | `/api/auth/login` | Iniciar sesión (JWT) | — |
| POST | `/api/auth/logout` | Cerrar sesión | — |
| GET | `/api/auth/me` | Sesión actual | — |
| POST/PUT/DELETE | rutas administrables (`/api/noticias`, `/api/carreras`, `/api/faqs`, etc.) | CRUD admin con token | — |

> Nota: `/api/contacto` (POST) no fue confirmado por Backend (BE-A6); el endpoint de búsqueda
> global para el buscador de la V2 tampoco (pendiente de Backend — el buscador actual filtra
> contenido local).

### Estructura de respuestas de error del backend

Contrato confirmado 15/09/2026: error JSON estandarizado para 4xx/5xx.

```typescript
// src/types/api/error.types.ts
export interface ApiErrorBody {
  code: string;          // Codigo de error (ej. BAD_REQUEST)
  message: string;       // Mensaje amigable para el usuario
  details: unknown[];    // Detalles opcionales del error
}

export interface ApiErrorResponse {
  error: ApiErrorBody;
}
```


### Códigos HTTP y su significado

| Código | Significado | Acción en frontend |
| :--- | :--- | :--- |
| `200` | Éxito (GET, PUT) | Mostrar datos |
| `201` | Creado (POST) | Mostrar confirmación + redirigir si aplica |
| `400` | Error de validación / regla de negocio | Mostrar mensaje al usuario |
| `403` | No autorizado (ej. descuento sin gerente) | Mostrar mensaje específico |
| `404` | Recurso no encontrado | Mostrar "No encontrado" |
| `409` | Conflicto (ej. stock insuficiente) | Mostrar conflicto y ofrecer alternativa |
| `500` | Error interno del servidor | Mostrar "Error inesperado, contacte soporte" |

## 🛠️ Stack tecnológico recomendado

| Categoría | Tecnología | Justificación |
| :--- | :--- | :--- |
| Build Tool | Vite | Rápido, moderno, configuración mínima |
| Framework | React 19 | Estándar de la industria; trae `use()`, Actions y mejoras de Suspense out-of-the-box |
| Lenguaje | TypeScript (strict) | Tipado fuerte, evita bugs |
| Router | React Router v7 | Sucesor directo de v6 (misma API de rutas); si se quiere type-safety total en rutas, alternativa: TanStack Router |
| HTTP Client | Axios | Interceptores, fácil manejo de errores |
| Estado API | TanStack Query v5 | Cache, refetch, estados de carga — recomendado usar desde el día 1, no como "opcional", dado que el proyecto ya consume una API real |
| Estado Global | Context API + useReducer | Simple, sin dependencias extra; migrar a Zustand solo si el estado global crece en complejidad real |
| Validación de esquemas | Zod | Único esquema de validación tanto para forms como para tipar/validar respuestas de API en el borde |
| Estilos | Tailwind CSS v4 | Motor en Rust, config en CSS nativo (`@theme`), más rápido que v3 |
| Testing (unit/integración) | Vitest + React Testing Library | Rápido, alineado con Vite |
| Testing (e2e) | Playwright | Cubre flujos completos (login futuro, checkout de venta, etc.) que RTL no cubre |
| Linting/Formato | Biome | Reemplaza ESLint + Prettier en un solo binario mucho más rápido; usar ESLint + Prettier solo si el equipo ya tiene configs/plugins específicos que Biome no soporta |
| Formularios | React Hook Form + Zod | Validación tipada en el borde |

## 🌱 Cultura de Desarrollo

### Principios
- **Clean Code**: nombres descriptivos, componentes pequeños (<150 líneas).
- **SOLID**: SRP en componentes, DIP en servicios.
- **KISS**: no sobre-ingenierizar. Si un `div` basta, no crear un componente.
- **DRY**: extraer a componentes/hooks solo cuando hay duplicación real.
- **YAGNI**: no implementar autenticación real hasta que el backend la tenga.

### Convención de commits

**Usar la convención definida en [`AGENTS.md`] del proyecto** (español, prefijo + descripción breve). No usar Conventional Commits en inglés salvo indicación explícita.

### Checklist pre-commit

- [ ] `npm run lint` sin errores
- [ ] `npm run build` compila correctamente
- [ ] `npm run test` — todas las pruebas pasan
- [ ] No hay `console.log` de debug
- [ ] No hay código comentado innecesario
- [ ] Los tipos TypeScript reflejan exactamente los esquemas Pydantic del backend

## 📋 Lista de verificación anti-alucinación

Antes de generar código, verificar:

- [ ] ¿El endpoint que voy a consumir existe en la tabla oficial de arriba?
- [ ] ¿Los tipos TypeScript reflejan exactamente los esquemas Pydantic del backend?
- [ ] ¿Los códigos de error HTTP que voy a manejar están documentados en `caja_negra.md` del backend?
- [ ] ¿Estoy respetando la estructura de carpetas definida?
- [ ] ¿Estoy usando `any` en TypeScript? → Si es sí, DETENER y corregir.
- [ ] ¿Estoy poniendo lógica de negocio en un componente presentacional? → Si es sí, DETENER y mover a hook.
- [ ] ¿Estoy implementando autenticación real? → Si es sí, DETENER: el backend aún no la tiene.

Si detectás que se necesita un endpoint que **no existe** en el backend, **DETENÉ la implementación y notificá antes de continuar.**

## 🚫 Reglas prohibidas

- Trabajar directamente sobre `main`.
- Usar `any` en TypeScript.
- Inventar endpoints que no existen en el backend.
- Poner lógica de negocio en componentes presentacionales.
- Hacer llamadas HTTP directamente desde componentes (usar hooks/servicios).
- Manejar errores HTTP con `try/catch` dispersos (usar interceptor global).
- Implementar autenticación real sin que el backend la soporte.
- Instalar librerías sin justificación (YAGNI).
- Commits con mensajes vagos ("cambios", "arreglos", "update").

## 🎯 Objetivo

Construir un frontend mantenible, tipado, testeable y perfectamente alineado con el backend, aplicando Clean Architecture adaptada a React, y evitando alucinaciones del agente mediante reglas estrictas de validación contra la API existente.