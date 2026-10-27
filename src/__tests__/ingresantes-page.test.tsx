import { screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { listarTodasLasCarreras } from '../api/services/carrera.service';
import IngresantesPage from '../pages/IngresantesPage';
import { PAGINA_CARRERAS_API_FIJA, renderConRouter } from '../test-utils';

vi.mock('../api/services/carrera.service');

const listarTodasLasCarrerasMock = vi.mocked(listarTodasLasCarreras);

describe('IngresantesPage', () => {
  beforeEach(() => {
    listarTodasLasCarrerasMock.mockReset();
    listarTodasLasCarrerasMock.mockResolvedValue(PAGINA_CARRERAS_API_FIJA);
  });

  it('muestra breadcrumb, título y bajada del diseño', () => {
    renderConRouter(<IngresantesPage />, { ruta: '/ingresantes' });

    const nav = screen.getByRole('navigation', { name: 'Ruta de navegación' });
    expect(within(nav).getByRole('link', { name: 'Inicio' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('heading', { level: 1, name: 'Ingresantes' })).toBeInTheDocument();
    expect(
      screen.getByText(/Todo lo que necesitás para ingresar al IFTS N\.º 12/),
    ).toBeInTheDocument();
  });

  it('enlaza a /carreras con la cantidad real de carreras del backend', async () => {
    renderConRouter(<IngresantesPage />, { ruta: '/ingresantes' });

    expect(await screen.findByRole('link', { name: 'Ver las 2 carreras' })).toHaveAttribute(
      'href',
      '/carreras',
    );
    expect(screen.getByText('2 carreras · turno nocturno')).toBeInTheDocument();
  });

  it('lista las etapas de inscripción con fecha pendiente sin inventar fechas', () => {
    renderConRouter(<IngresantesPage />, { ruta: '/ingresantes' });

    const tabla = screen.getByRole('table', { name: /etapas y fechas/i });
    expect(within(tabla).getByText('Inscripción online')).toBeInTheDocument();
    expect(within(tabla).getByText('Presentación de documentación')).toBeInTheDocument();
    expect(within(tabla).getByText('Inicio de clases')).toBeInTheDocument();
    expect(within(tabla).getAllByText('PENDIENTE')).toHaveLength(3);
  });

  it('ofrece consultar por contacto desde el bloque de pases', () => {
    renderConRouter(<IngresantesPage />, { ruta: '/ingresantes' });

    expect(screen.getByRole('link', { name: 'Consultar por Contacto' })).toHaveAttribute(
      'href',
      '/contacto',
    );
  });

  it('muestra las FAQ de ingresantes sin etiqueta de categoría y el enlace a /faq', () => {
    renderConRouter(<IngresantesPage />, { ruta: '/ingresantes' });

    expect(screen.getByText('¿Qué carreras ofrece el instituto?')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Ver todas las preguntas' })).toHaveAttribute(
      'href',
      '/faq',
    );
  });
});
