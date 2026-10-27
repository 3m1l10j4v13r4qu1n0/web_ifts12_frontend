import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { listarTodasLasCarreras } from '../api/services/carrera.service';
import { listarNovedades } from '../api/services/novedad.service';
import BusquedaPage from '../pages/BusquedaPage';
import { PAGINA_CARRERAS_API_FIJA, NOVEDADES_API_FIJA, renderConRouter } from '../test-utils';
import type { NovedadApi } from '../types/api/novedad.types';

vi.mock('../api/services/carrera.service');
vi.mock('../api/services/novedad.service');

const listarTodasLasCarrerasMock = vi.mocked(listarTodasLasCarreras);
const listarNovedadesMock = vi.mocked(listarNovedades);

function renderizar(ruta = '/buscar') {
  return renderConRouter(<BusquedaPage />, { ruta });
}

describe('BusquedaPage', () => {
  beforeEach(() => {
    listarTodasLasCarrerasMock.mockReset();
    listarTodasLasCarrerasMock.mockResolvedValue(PAGINA_CARRERAS_API_FIJA);
    listarNovedadesMock.mockReset();
    listarNovedadesMock.mockResolvedValue(NOVEDADES_API_FIJA as NovedadApi[]);
  });

  it('muestra breadcrumb y título del diseño', () => {
    renderizar();

    expect(screen.getByRole('link', { name: 'Inicio' })).toHaveAttribute('href', '/');
    expect(
      screen.getByRole('heading', { level: 1, name: 'Resultados de búsqueda' }),
    ).toBeInTheDocument();
  });

  it('invita a ingresar un término cuando no hay consulta', () => {
    renderizar();

    expect(screen.getByText('Ingresá un término de búsqueda')).toBeInTheDocument();
  });

  it('muestra el resumen y los chips de las secciones con resultados', async () => {
    renderizar('/buscar?q=carreras');

    expect(await screen.findByText(/3 resultados para «carreras»/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Todo el sitio' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Carreras' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Preguntas frecuentes' })).toBeInTheDocument();
  });

  it('filtra los resultados al tocar un chip de sección', async () => {
    const usuario = userEvent.setup();
    renderizar('/buscar?q=carreras');

    await screen.findByRole('button', { name: 'Preguntas frecuentes' });
    await usuario.click(screen.getByRole('button', { name: 'Preguntas frecuentes' }));

    expect(screen.getByText('¿Qué carreras ofrece el instituto?')).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Carreras' })).not.toBeInTheDocument();
  });

  it('al buscar desde el formulario navega a la consulta nueva', async () => {
    const usuario = userEvent.setup();
    renderizar();

    await usuario.type(screen.getByLabelText('Buscar en el sitio'), 'sistemas');
    await usuario.click(screen.getByRole('button', { name: 'Buscar' }));

    expect(
      await screen.findByText('Tecnicatura Superior en Análisis de Sistemas'),
    ).toBeInTheDocument();
  });

  it('muestra el estado sin resultados con accesos directos', async () => {
    renderizar('/buscar?q=textoquenoexiste');

    expect(await screen.findByText('Sin resultados para «textoquenoexiste»')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Carreras' })).toHaveAttribute('href', '/carreras');
    expect(screen.getByRole('link', { name: 'Contacto' })).toHaveAttribute('href', '/contacto');
    expect(screen.getByRole('button', { name: 'Limpiar filtros' })).toBeInTheDocument();
  });

  it('pagina cuando hay más resultados que el tamaño de página', async () => {
    renderizar('/buscar?q=a');

    expect(await screen.findByRole('navigation', { name: 'Paginación' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Página siguiente' })).toBeInTheDocument();
  });
});
