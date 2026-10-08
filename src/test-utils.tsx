import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';

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
export const CARRERAS_API_FIJA = [
  {
    id: 1,
    nombre: 'Tecnicatura Superior en Análisis de Sistemas',
    codigo: 'AS-2023',
    resolucion: 'RS-2023-6336-GCABA-MEDGC',
    descripcion:
      'Formación profesional orientada al desarrollo de software, análisis funcional, bases de datos e infraestructura tecnológica.',
    duracion_anios: 3,
    titulo_otorgado: 'Técnico Superior en Análisis de Sistemas',
    modalidad: 'Híbrida / Presencial',
  },
  {
    id: 2,
    nombre: 'Tecnicatura Superior en Administración Pública',
    codigo: 'AP-2025',
    resolucion: null,
    descripcion: null,
    duracion_anios: null,
    titulo_otorgado: null,
    modalidad: null,
  },
];

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
}

/**
 * Envuelve un componente con lo que necesita una página que consume la API: router y
 * `QueryClientProvider`.
 *
 * El `QueryClientProvider` va **adentro** del `MemoryRouter`, igual que en `src/App.tsx`.
 */
export function renderConRouter(
  ui: ReactElement,
  { ruta = '/', queryClient }: OpcionesRender = {},
): ReturnType<typeof render> {
  const cliente = queryClient ?? crearQueryClientDeTest();

  function Envoltorio({ children }: { children: ReactNode }) {
    return (
      <MemoryRouter initialEntries={[ruta]}>
        <QueryClientProvider client={cliente}>{children}</QueryClientProvider>
      </MemoryRouter>
    );
  }

  return render(<Envoltorio>{ui}</Envoltorio>);
}
