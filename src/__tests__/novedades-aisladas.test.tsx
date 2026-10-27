import { fireEvent, screen, waitFor } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { listarTodasLasCarreras } from '../api/services/carrera.service';
import { listarNovedades } from '../api/services/novedad.service';
import BuscadorGlobal from '../components/layout/BuscadorGlobal';
import { useNovedades } from '../hooks/useNovedades';
import HomePage from '../pages/HomePage';
import NotaCompletaPage from '../pages/NotaCompletaPage';
import NoticiasPage from '../pages/NoticiasPage';
import { PAGINA_CARRERAS_API_FIJA, NOVEDADES_API_FIJA, renderConRouter } from '../test-utils';
import type { NovedadApi } from '../types/api/novedad.types';

vi.mock('../api/services/carrera.service');
vi.mock('../api/services/novedad.service');

const listarTodasLasCarrerasMock = vi.mocked(listarTodasLasCarreras);
const listarNovedadesMock = vi.mocked(listarNovedades);

/** Sonda mínima para leer el estado del hook sin depender del marcado de una página. */
function SondaNovedades() {
  const { habilitado, cargando, error, novedades } = useNovedades();

  return (
    <p>{`habilitado:${String(habilitado)} cargando:${String(cargando)} error:${error ?? 'null'} total:${novedades.length}`}</p>
  );
}

/**
 * Módulo de novedades aislado (BE-N03): `GET /api/novedades` no está en el apispec. Con la
 * bandera apagada no se dispara el request y las tres rutas muestran un aviso de proceso.
 */
describe('novedades aisladas por contrato', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_NOVEDADES_HABILITADAS', 'false');
    listarTodasLasCarrerasMock.mockReset();
    listarTodasLasCarrerasMock.mockResolvedValue(PAGINA_CARRERAS_API_FIJA);
    listarNovedadesMock.mockReset();
    listarNovedadesMock.mockResolvedValue(NOVEDADES_API_FIJA as NovedadApi[]);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('el hook no consulta el endpoint y devuelve el estado apagado', () => {
    renderConRouter(<SondaNovedades />);

    expect(
      screen.getByText('habilitado:false cargando:false error:null total:0'),
    ).toBeInTheDocument();
    expect(listarNovedadesMock).not.toHaveBeenCalled();
  });

  it('la Home conserva el carrusel y avisa que las novedades no están disponibles', async () => {
    renderConRouter(<HomePage />);

    expect(
      await screen.findAllByText(
        'Las novedades se publican cuando el recurso esté disponible en el contrato de API.',
      ),
    ).toHaveLength(2);
    expect(screen.queryByText('Ver todas las novedades')).not.toBeInTheDocument();
    expect(listarNovedadesMock).not.toHaveBeenCalled();
  });

  it('Novedades conserva encabezado y breadcrumb, y oculta los filtros', () => {
    renderConRouter(<NoticiasPage />, { ruta: '/noticias' });

    expect(screen.getByText('Contenido en preparación')).toBeInTheDocument();
    expect(screen.queryByLabelText('Buscar en novedades')).not.toBeInTheDocument();
    expect(screen.queryByText('Publicaciones')).not.toBeInTheDocument();
    expect(listarNovedadesMock).not.toHaveBeenCalled();
  });

  it('la nota completa muestra un aviso con salida a /noticias, no un 404', () => {
    renderConRouter(
      <Routes>
        <Route path="/noticias/:id" element={<NotaCompletaPage />} />
      </Routes>,
      { ruta: '/noticias/una-nota' },
    );

    expect(screen.getByText('Contenido en preparación')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Volver a novedades' })).toHaveAttribute(
      'href',
      '/noticias',
    );
    expect(screen.queryByText(/Página no encontrada/)).not.toBeInTheDocument();
  });

  it('el buscador global no indexa novedades', async () => {
    renderConRouter(<BuscadorGlobal />);

    const input = screen.getByRole('combobox');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'inscripciones' } });

    await waitFor(() => {
      expect(screen.getByText('Sin resultados para «inscripciones».')).toBeInTheDocument();
    });

    expect(screen.queryByText('Inscripciones abiertas para el ciclo lectivo 2026')).toBeNull();
    expect(listarTodasLasCarrerasMock).toHaveBeenCalled();
    expect(listarNovedadesMock).not.toHaveBeenCalled();
  });
});
