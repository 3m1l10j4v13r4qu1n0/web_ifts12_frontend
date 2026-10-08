import { screen } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { listarCarreras } from '../api/services/carrera.service';
import CarreraDetallePage from '../pages/CarreraDetallePage';
import { CARRERAS_API_FIJA, renderConRouter } from '../test-utils';
import type { CarreraApi } from '../types/api/carrera.types';

vi.mock('../api/services/carrera.service');

const listarCarrerasMock = vi.mocked(listarCarreras);

/** El slug sale del nombre real de la fila 1: `Tecnicatura Superior en Análisis de Sistemas`. */
const SLUG_ANALISIS = 'analisis-de-sistemas';
/** La fila 2 trae todos los opcionales en `null`, como el backend. */
const SLOG_ADMINISTRACION = 'administracion-publica';

function renderizarConRuta(ruta: string) {
  return renderConRouter(
    <Routes>
      <Route path="/carreras/:id" element={<CarreraDetallePage />} />
    </Routes>,
    { ruta },
  );
}

describe('CarreraDetallePage', () => {
  beforeEach(() => {
    listarCarrerasMock.mockReset();
    listarCarrerasMock.mockResolvedValue(CARRERAS_API_FIJA as CarreraApi[]);
  });

  it('muestra la ficha de la carrera solicitada', async () => {
    renderizarConRuta(`/carreras/${SLOG_ADMINISTRACION}`);

    expect(
      await screen.findByRole('heading', {
        level: 1,
        name: 'Tecnicatura Superior en Administración Pública',
      }),
    ).toBeInTheDocument();
    // La modalidad viene del backend, no de una etiqueta fija: la fila 2 tiene `modalidad`
    // en `null`, así que no se debe renderizar ninguna.
    expect(screen.queryByText(/^Modalidad:/)).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Plan de estudios' })).toBeInTheDocument();
  });

  it('muestra la descripción que devuelve el backend', async () => {
    renderizarConRuta(`/carreras/${SLUG_ANALISIS}`);

    expect(await screen.findByText(/desarrollo de software/)).toBeInTheDocument();
  });

  it('muestra la modalidad real del backend', async () => {
    renderizarConRuta(`/carreras/${SLUG_ANALISIS}`);

    // La fila 1 declara "Híbrida / Presencial". Antes esta etiqueta decía "exclusivamente
    // nocturno" para todas, lo que contradecía las filas que dicen "A Distancia / Híbrida".
    expect(await screen.findByText('Modalidad: Híbrida / Presencial')).toBeInTheDocument();
  });

  it('enlaza a la inscripción oficial atenuada mientras no haya URL', async () => {
    renderizarConRuta(`/carreras/${SLOG_ADMINISTRACION}`);

    expect(await screen.findByText('Inscripción oficial (GCBA)')).toBeInTheDocument();
  });

  it('lista las otras carreras', async () => {
    renderizarConRuta(`/carreras/${SLUG_ANALISIS}`);

    expect(
      await screen.findByRole('link', { name: 'Tecnicatura Superior en Administración Pública' }),
    ).toBeInTheDocument();
  });

  it('muestra la página 404 para un id inexistente', async () => {
    renderizarConRuta('/carreras/inexistente');

    expect(await screen.findByText('Pagina no encontrada')).toBeInTheDocument();
  });

  it('muestra el estado de carga antes de resolver la consulta', () => {
    listarCarrerasMock.mockReturnValue(new Promise(() => undefined));

    renderizarConRuta(`/carreras/${SLUG_ANALISIS}`);

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('muestra el error normalizado con opción de reintentar', async () => {
    listarCarrerasMock.mockRejectedValue({ status: 0, mensaje: 'Ocurrió un error inesperado.' });

    renderizarConRuta(`/carreras/${SLUG_ANALISIS}`);

    expect(await screen.findByRole('alert')).toHaveTextContent('No pudimos cargar la carrera.');
    expect(screen.getByRole('button', { name: 'Reintentar' })).toBeInTheDocument();
  });
});
