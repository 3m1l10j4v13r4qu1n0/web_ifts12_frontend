import { screen, within } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { listarTodasLasCarreras } from '../api/services/carrera.service';
import CarreraDetallePage from '../pages/CarreraDetallePage';
import { PAGINA_CARRERAS_API_FIJA, renderConRouter } from '../test-utils';

vi.mock('../api/services/carrera.service');

const listarTodasLasCarrerasMock = vi.mocked(listarTodasLasCarreras);

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
    listarTodasLasCarrerasMock.mockReset();
    listarTodasLasCarrerasMock.mockResolvedValue(PAGINA_CARRERAS_API_FIJA);
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
    // en `null`, así que se muestra PENDIENTE, sin inventar el dato.
    expect(screen.getByText('Modalidad: PENDIENTE')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Plan de estudios' })).toBeInTheDocument();
  });

  it('muestra la descripción que devuelve el backend', async () => {
    renderizarConRuta(`/carreras/${SLUG_ANALISIS}`);

    expect(await screen.findByText(/desarrollo de software/)).toBeInTheDocument();
  });

  it('muestra modalidad PENDIENTE porque no existe en el contrato', async () => {
    renderizarConRuta(`/carreras/${SLUG_ANALISIS}`);

    // El apispec del 22/10/2026 no expone `modalidad`: se muestra PENDIENTE sin inventar.
    expect(await screen.findByText('Modalidad: PENDIENTE')).toBeInTheDocument();
  });

  it('muestra los datos oficiales reales del backend', async () => {
    renderizarConRuta(`/carreras/${SLUG_ANALISIS}`);

    const datos = await screen.findByRole('region', { name: 'Datos oficiales' });
    expect(within(datos).getByText('Técnico Superior en Análisis de Sistemas')).toBeInTheDocument();
    expect(within(datos).getByText('3 años')).toBeInTheDocument();
    expect(within(datos).getByText('RS-2023-6336-GCABA-MEDGC')).toBeInTheDocument();
    expect(within(datos).getByText('Exclusivamente nocturno')).toBeInTheDocument();
  });

  it('marca PENDIENTE en los datos oficiales que el backend trae en null', async () => {
    renderizarConRuta(`/carreras/${SLOG_ADMINISTRACION}`);

    const datos = await screen.findByRole('region', { name: 'Datos oficiales' });
    // Sin título, duración, resolución ni modalidad no se inventa ningún valor oficial:
    // los cuatro campos quedan en PENDIENTE (el turno es institucional y siempre sale).
    expect(within(datos).getAllByText('PENDIENTE')).toHaveLength(4);
  });

  it('ofrece el índice "En esta carrera" con anclas a cada bloque', async () => {
    renderizarConRuta(`/carreras/${SLUG_ANALISIS}`);

    const indice = await screen.findByRole('navigation', { name: 'En esta carrera' });
    expect(within(indice).getByRole('link', { name: 'Presentación' })).toHaveAttribute(
      'href',
      '#presentacion',
    );
    expect(
      within(indice).getByRole('link', { name: 'Materias y correlatividades' }),
    ).toHaveAttribute('href', '#materias-y-correlatividades');
    expect(within(indice).getAllByRole('link')).toHaveLength(7);
  });

  it('muestra la tabla de materias con estado vacío (sin filas inventadas)', async () => {
    renderizarConRuta(`/carreras/${SLUG_ANALISIS}`);

    const tabla = await screen.findByRole('table', {
      name: /materias y correlatividades del plan/i,
    });
    expect(within(tabla).getByRole('columnheader', { name: 'Año' })).toBeInTheDocument();
    expect(
      within(tabla).getByRole('columnheader', { name: 'Correlativas para rendir' }),
    ).toBeInTheDocument();
    // Una sola fila de aviso: el plan vigente todavía no está validado.
    expect(within(tabla).getAllByRole('row')).toHaveLength(2);
  });

  it('deja los archivos descargables deshabilitados mientras no existan', async () => {
    renderizarConRuta(`/carreras/${SLUG_ANALISIS}`);

    // Plan de estudios, programas y resoluciones: los tres PDF siguen pendientes.
    const botones = await screen.findAllByRole('button', { name: 'Descargar' });
    expect(botones).toHaveLength(3);
    for (const boton of botones) {
      expect(boton).toBeDisabled();
    }
  });

  it('enlaza a la inscripción oficial atenuada mientras no haya URL', async () => {
    renderizarConRuta(`/carreras/${SLOG_ADMINISTRACION}`);

    expect(await screen.findByText('¿Querés inscribirte?')).toBeInTheDocument();
    expect(
      screen.getByText('El enlace oficial se publica cuando esté disponible.'),
    ).toBeInTheDocument();
  });

  it('lista las otras carreras', async () => {
    renderizarConRuta(`/carreras/${SLUG_ANALISIS}`);

    expect(
      await screen.findByRole('link', { name: 'Tecnicatura Superior en Administración Pública' }),
    ).toBeInTheDocument();
  });

  it('muestra la página 404 para un id inexistente', async () => {
    renderizarConRuta('/carreras/inexistente');

    expect(await screen.findByText(/página no encontrada/i)).toBeInTheDocument();
  });

  it('muestra el estado de carga antes de resolver la consulta', () => {
    listarTodasLasCarrerasMock.mockReturnValue(new Promise(() => undefined));

    renderizarConRuta(`/carreras/${SLUG_ANALISIS}`);

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('muestra el error normalizado con opción de reintentar', async () => {
    listarTodasLasCarrerasMock.mockRejectedValue({
      status: 0,
      mensaje: 'Ocurrió un error inesperado.',
    });

    renderizarConRuta(`/carreras/${SLUG_ANALISIS}`);

    expect(await screen.findByRole('alert')).toHaveTextContent('No pudimos cargar la carrera.');
    expect(screen.getByRole('button', { name: 'Reintentar' })).toBeInTheDocument();
  });
});
