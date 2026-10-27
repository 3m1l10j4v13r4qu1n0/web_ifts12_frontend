import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import type { CarreraApi } from './types/api/carrera.types';
import type { PaginaApi } from './types/api/paginacion.types';

/**
 * Fixtures del DTO que devuelve el backend (`app.py:62-92`, `models.py:26-64`), con los
 * nombres de campo reales: `snake_case` y `id` numérico.
 *
 * Se declaran acá, y no se importan de `src/constants/mock-data.ts`, a propósito: los tests
 * de las páginas que ya consumen la API tienen que comprobar que el **DTO** real se renderiza
 * bien, no que el mock siga renderizándose. Los mocks de la app quedan para lo que sigue en
 * datos simulados.
 *
 * Las filas copian la DB sembrada (`instance/ifts12.db`): nombres, slugs derivados y fechas
 * reales, para que un test no valide un caso que el backend nunca produce.
 */
export const CARRERAS_API_FIJA: CarreraApi[] = [
  {
    id: 1,
    nombre: 'Tecnicatura Superior en Análisis de Sistemas',
    descripcion:
      'Formación profesional orientada al desarrollo de software, análisis funcional, bases de datos e infraestructura tecnológica.',
    titulo_otorgado: 'Técnico Superior en Análisis de Sistemas',
    activa: true,
    created_at: '2026-01-01T00:00:00',
    updated_at: '2026-01-01T00:00:00',
    planes: [
      {
        id: 1,
        carrera_id: 1,
        nombre: 'Plan 2023',
        codigo: 'AS-2023',
        resolucion: 'RS-2023-6336-GCABA-MEDGC',
        duracion_anios: 3,
        vigente_desde: '2023-03-01',
        vigente_hasta: null,
        activo: true,
        created_at: '2026-01-01T00:00:00',
        updated_at: '2026-01-01T00:00:00',
      },
    ],
  },
  {
    id: 2,
    nombre: 'Tecnicatura Superior en Administración Pública',
    descripcion: null,
    titulo_otorgado: null,
    activa: true,
    created_at: '2026-01-01T00:00:00',
    updated_at: '2026-01-01T00:00:00',
    planes: [
      {
        id: 2,
        carrera_id: 2,
        nombre: null,
        codigo: null,
        resolucion: null,
        duracion_anios: null,
        vigente_desde: null,
        vigente_hasta: null,
        activo: true,
        created_at: '2026-01-01T00:00:00',
        updated_at: '2026-01-01T00:00:00',
      },
    ],
  },
];

/** Respuesta paginada de `GET /api/carreras`, tal como la arma el apispec. */
export const PAGINA_CARRERAS_API_FIJA: PaginaApi<CarreraApi> = {
  items: CARRERAS_API_FIJA,
  page: 1,
  size: 100,
  total: CARRERAS_API_FIJA.length,
  totalPages: 1,
};

export const NOVEDADES_API_FIJA = [
  {
    id: 1,
    titulo: 'Inscripciones abiertas para el ciclo lectivo 2026',
    copete: 'Inicia el proceso de preingreso a las tecnicaturas superiores del IFTS N.º 12.',
    contenido:
      'Te invitamos a inscribirte en nuestras tecnicaturas superiores oficiales de la Ciudad de Buenos Aires. Modalidad gratuita y con títulos oficiales.',
    categoria: 'Ingresantes',
    imagen_url: null,
    destacado: true,
    fecha_publicacion: '2026-09-28T19:54:25.920870',
  },
  {
    id: 2,
    titulo: 'Inicio de Clases y Tutorías para Estudiantes',
    copete: 'Conocé el cronograma de acompañamiento y tutorías académicas.',
    contenido:
      'El equipo tutor del IFTS 12 puso a disposición los horarios de consulta para las materias de primer y segundo año.',
    categoria: 'Estudiantes',
    imagen_url: null,
    destacado: false,
    fecha_publicacion: '2026-09-28T19:54:25.920876',
  },
];

/**
 * `QueryClient` de test sin reintentos.
 *
 * Sin esto, los reintentos por defecto de TanStack Query (3 con backoff) ralentizan cada test
 * de error y el `findBy*` se queda esperando reintentos que no van a pasar.
 */
export function crearQueryClientDeTest() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0, staleTime: 0 },
    },
  });
}

interface OpcionesRender {
  /** Ruta inicial del `MemoryRouter`. Por defecto, la home. */
  ruta?: string;
  /** `QueryClient` a usar. Si no se pasa, se crea uno nuevo. */
  queryClient?: QueryClient;
  /** Envuelve con `AuthProvider` (login, ProtectedRoute, AdminLayout). */
  conAuth?: boolean;
}

/**
 * Envuelve un componente con lo que necesita una página que consume la API: router y
 * `QueryClientProvider`. Con `conAuth` agrega también `AuthProvider` (como en
 * `src/App.tsx`, por fuera del router).
 */
export function renderConRouter(
  ui: ReactElement,
  { ruta = '/', queryClient, conAuth = false }: OpcionesRender = {},
): ReturnType<typeof render> {
  const cliente = queryClient ?? crearQueryClientDeTest();

  function Envoltorio({ children }: { children: ReactNode }) {
    const contenido = (
      <MemoryRouter initialEntries={[ruta]}>
        <QueryClientProvider client={cliente}>{children}</QueryClientProvider>
      </MemoryRouter>
    );

    return conAuth ? <AuthProvider>{contenido}</AuthProvider> : contenido;
  }

  return render(<Envoltorio>{ui}</Envoltorio>);
}
