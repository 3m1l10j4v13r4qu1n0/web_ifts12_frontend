import { screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { listarTodasLasCarreras } from '../api/services/carrera.service';
import CarrerasPage from '../pages/CarrerasPage';
import { PAGINA_CARRERAS_API_FIJA, renderConRouter } from '../test-utils';

vi.mock('../api/services/carrera.service');

const listarTodasLasCarrerasMock = vi.mocked(listarTodasLasCarreras);

describe('CarrerasPage', () => {
  beforeEach(() => {
    listarTodasLasCarrerasMock.mockReset();
    listarTodasLasCarrerasMock.mockResolvedValue(PAGINA_CARRERAS_API_FIJA);
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
      await screen.findByText(/Oferta académica del IFTS N\.º 12: 2 carreras\./),
    ).toBeInTheDocument();
    expect(screen.queryByText(/exclusivamente nocturno/i)).not.toBeInTheDocument();
  });

  it('muestra turno, modalidad y horario por carrera en el resumen', async () => {
    renderConRouter(<CarrerasPage />, { ruta: '/carreras' });

    const tabla = await screen.findByRole('table', {
      name: /Turno, modalidad y horarios por carrera/,
    });
    expect(within(tabla).getAllByText('Vespertino')).toHaveLength(2);
    expect(within(tabla).getAllByText('Híbrida')).toHaveLength(2);
    expect(within(tabla).getAllByText('18:30 a 22:30')).toHaveLength(2);
    expect(within(tabla).queryByText('Nocturno')).not.toBeInTheDocument();
  });
});
