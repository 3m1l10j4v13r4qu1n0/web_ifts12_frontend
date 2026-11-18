import { screen, within } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { listarTodasLasCarreras } from '../api/services/carrera.service';
import CarreraDetallePage from '../pages/CarreraDetallePage';
import { PAGINA_CARRERAS_API_FIJA, renderConRouter } from '../test-utils';
import type { CarreraApi } from '../types/api/carrera.types';

vi.mock('../api/services/carrera.service');
vi.mock('../api/services/contenido.service', () => ({
  listarMateriasPublicas: vi.fn().mockResolvedValue([]),
  obtenerPlanPublico: vi.fn().mockResolvedValue({ id: 1, materias: [] }),
}));

const listarTodasLasCarrerasMock = vi.mocked(listarTodasLasCarreras);

/** El slug sale del nombre real de la fila 1: `Tecnicatura Superior en Análisis de Sistemas`. */
const SLUG_ANALISIS = 'analisis-de-sistemas';
/** La fila 2 trae todos los opcionales en `null`, como el backend. */
const SLOG_ADMINISTRACION = 'administracion-publica';

/** Gestión Parlamentaria: la única carrera matutina y con modalidad sin confirmar (V3 §4). */
const GESTION_PARLAMENTARIA_API: CarreraApi = {
  id: 3,
  nombre: 'Tecnicatura Superior en Gestión Parlamentaria',
  descripcion: null,
  titulo_otorgado: null,
  activa: true,
  created_at: '2026-01-01T00:00:00',
  updated_at: '2026-01-01T00:00:00',
  planes: [],
};

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
    // La modalidad sale del dato validado de la carrera (V3 §4), no de una etiqueta fija.
    expect(screen.getByText('Modalidad: Híbrida')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Plan de estudios' })).toBeInTheDocument();
  });

  it('muestra la descripción que devuelve el backend', async () => {
    renderizarConRuta(`/carreras/${SLUG_ANALISIS}`);

    expect(await screen.findByText(/desarrollo de software/)).toBeInTheDocument();
  });

  it('muestra el turno y el horario propios de Análisis de Sistemas', async () => {
    renderizarConRuta(`/carreras/${SLUG_ANALISIS}`);

    expect(await screen.findByText('Turno: Vespertino')).toBeInTheDocument();
    expect(screen.getByText('Modalidad: Híbrida')).toBeInTheDocument();
    expect(screen.getByText('Horario: 18:30 a 22:30')).toBeInTheDocument();
    expect(screen.queryByText(/exclusivamente nocturno/i)).not.toBeInTheDocument();
  });

  it('muestra los datos oficiales reales del backend', async () => {
    renderizarConRuta(`/carreras/${SLUG_ANALISIS}`);

    const datos = await screen.findByRole('region', { name: 'Datos oficiales' });
    expect(within(datos).getByText('Técnico Superior en Análisis de Sistemas')).toBeInTheDocument();
    expect(within(datos).getByText('3 años')).toBeInTheDocument();
    expect(within(datos).getByText('RS-2023-6336-GCABA-MEDGC')).toBeInTheDocument();
    expect(within(datos).getByText('Vespertino (18:30 a 22:30)')).toBeInTheDocument();
  });

  it('marca PENDIENTE en los datos oficiales que el backend trae en null', async () => {
    renderizarConRuta(`/carreras/${SLOG_ADMINISTRACION}`);

    const datos = await screen.findByRole('region', { name: 'Datos oficiales' });
    // Sin título ni resolución no se inventa ningún valor oficial: quedan en PENDIENTE. El
    // turno, el horario y la modalidad salen del dato validado de la carrera.
    expect(within(datos).getAllByText('PENDIENTE')).toHaveLength(2);
    expect(within(datos).getByText('5 cuatrimestres')).toBeInTheDocument();
    expect(within(datos).getByText('Vespertino (18:30 a 22:30)')).toBeInTheDocument();
  });

  it('ofrece el índice "En esta carrera" sin el enlace Programas', async () => {
    renderizarConRuta(`/carreras/${SLUG_ANALISIS}`);

    const indice = await screen.findByRole('navigation', { name: 'En esta carrera' });
    expect(within(indice).getByRole('link', { name: 'Presentación' })).toHaveAttribute(
      'href',
      '#presentacion',
    );
    expect(
      within(indice).getByRole('link', { name: 'Materias y correlatividades' }),
    ).toHaveAttribute('href', '#materias-y-correlatividades');
    expect(within(indice).queryByRole('link', { name: 'Programas' })).not.toBeInTheDocument();
    expect(within(indice).getAllByRole('link')).toHaveLength(6);
  });

  it('no renderiza el apartado Programas', async () => {
    renderizarConRuta(`/carreras/${SLUG_ANALISIS}`);

    expect(
      await screen.findByRole('heading', { level: 1, name: /Análisis de Sistemas/ }),
    ).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Programas' })).not.toBeInTheDocument();
    expect(
      screen.queryByText('Los programas individuales se publican cuando estén disponibles.'),
    ).not.toBeInTheDocument();
  });

  it('usa el texto definitivo de Materias y correlatividades', async () => {
    renderizarConRuta(`/carreras/${SLUG_ANALISIS}`);

    expect(
      await screen.findByText(/A continuación encontrarás el listado de asignaturas/),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(
        'Para consultar las correlatividades, revisá la documentación de la carrera.',
      ),
    ).not.toBeInTheDocument();
  });

  it('informa un plan sin materias cargadas sin inventar filas', async () => {
    renderizarConRuta(`/carreras/${SLUG_ANALISIS}`);
    expect(
      await screen.findByText(/Las materias se publican cuando estén cargadas/),
    ).toBeInTheDocument();
  });

  it('permite descargar el plan oficial y deja la resolución pendiente de validación', async () => {
    renderizarConRuta(`/carreras/${SLUG_ANALISIS}`);
    expect(await screen.findByRole('link', { name: 'Descargar plan (PDF)' })).toHaveAttribute(
      'href',
      '/documentos/plan-as.pdf',
    );
    expect(screen.getByRole('button', { name: 'Descargar' })).toBeDisabled();
    expect(
      screen.getByText(
        'La descarga de la resolución se publica cuando el instituto valide el archivo.',
      ),
    ).toBeInTheDocument();
  });

  it('muestra turno matutino y modalidad pendiente en Gestión Parlamentaria', async () => {
    listarTodasLasCarrerasMock.mockResolvedValue({
      items: [...PAGINA_CARRERAS_API_FIJA.items, GESTION_PARLAMENTARIA_API],
      page: 1,
      size: 100,
      total: 3,
      totalPages: 1,
    });

    renderizarConRuta('/carreras/gestion-parlamentaria');

    expect(await screen.findByText('Turno: Matutino')).toBeInTheDocument();
    expect(screen.getByText('Horario: 9:00 a 13:00')).toBeInTheDocument();
    expect(screen.getByText('Modalidad: PENDIENTE')).toBeInTheDocument();
    expect(
      screen.getByText('La modalidad de esta carrera se publica cuando el instituto la confirme.'),
    ).toBeInTheDocument();
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
