import { screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { listarCarreras } from '../api/services/carrera.service';
import CarrerasPage from '../pages/CarrerasPage';
import { CARRERAS_API_FIJA, renderConRouter } from '../test-utils';
import type { CarreraApi } from '../types/api/carrera.types';

vi.mock('../api/services/carrera.service');

const listarCarrerasMock = vi.mocked(listarCarreras);

describe('CarrerasPage', () => {
  beforeEach(() => {
    listarCarrerasMock.mockReset();
    listarCarrerasMock.mockResolvedValue(CARRERAS_API_FIJA as CarreraApi[]);
  });

  it('muestra el breadcrumb Inicio / Carreras', () => {
    renderConRouter(<CarrerasPage />, { ruta: '/carreras' });

    const nav = screen.getByRole('navigation', { name: 'Ruta de navegación' });
    expect(within(nav).getByRole('link', { name: 'Inicio' })).toHaveAttribute('href', '/');
    expect(within(nav).getByText('Carreras')).toBeInTheDocument();
    expect(within(nav).queryByRole('link', { name: 'Carreras' })).not.toBeInTheDocument();
  });

  it('arma la bajada con la cantidad real de carreras del backend', async () => {
    renderConRouter(<CarrerasPage />, { ruta: '/carreras' });

    // El número no se fija en el copy: sale de la cantidad publicada (fixture con 2).
    expect(
      await screen.findByText(/Oferta académica del IFTS N\.º 12: 2 carreras en turno/),
    ).toBeInTheDocument();
  });
});
