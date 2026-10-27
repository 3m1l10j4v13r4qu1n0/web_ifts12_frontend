import { screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { listarTodasLasCarreras } from '../api/services/carrera.service';
import DocentesPage from '../pages/DocentesPage';
import { PAGINA_CARRERAS_API_FIJA, renderConRouter } from '../test-utils';

vi.mock('../api/services/carrera.service');

const listarTodasLasCarrerasMock = vi.mocked(listarTodasLasCarreras);

function renderizarPagina() {
  return renderConRouter(<DocentesPage />, { ruta: '/docentes' });
}

describe('DocentesPage', () => {
  beforeEach(() => {
    listarTodasLasCarrerasMock.mockReset();
    listarTodasLasCarrerasMock.mockResolvedValue(PAGINA_CARRERAS_API_FIJA);
  });

  it('muestra breadcrumb, título y bajada del diseño', () => {
    renderizarPagina();

    const nav = screen.getByRole('navigation', { name: 'Ruta de navegación' });
    expect(within(nav).getByRole('link', { name: 'Inicio' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('heading', { level: 1, name: 'Docentes' })).toBeInTheDocument();
    expect(
      screen.getByText(/Información y accesos de interés para el plantel docente/),
    ).toBeInTheDocument();
  });

  it('muestra el mensaje de proceso de comunicados', () => {
    renderizarPagina();

    expect(
      screen.getByText(
        'Los comunicados institucionales se publican cuando el instituto los cargue.',
      ),
    ).toBeInTheDocument();
  });

  it('muestra el estado vacío de concursos', () => {
    renderizarPagina();

    expect(screen.getByText('No hay convocatorias abiertas.')).toBeInTheDocument();
  });

  it('lista las carreras del backend con la nómina como mensaje de proceso', async () => {
    renderizarPagina();

    expect(
      await screen.findByRole('heading', {
        level: 3,
        name: 'Tecnicatura Superior en Análisis de Sistemas',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 3,
        name: 'Tecnicatura Superior en Administración Pública',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(
        'La nómina del cuerpo docente se publica cuando el instituto la confirme.',
      ),
    ).toHaveLength(2);
  });

  it('muestra el repositorio con las descargas deshabilitadas', () => {
    renderizarPagina();

    for (const titulo of [
      'Normativa docente',
      'Instructivo para docentes',
      'Documentación académica',
    ]) {
      expect(screen.getByText(titulo)).toBeInTheDocument();
    }
    const botones = screen.getAllByRole('button', { name: 'Descargar' });
    expect(botones).toHaveLength(3);
    for (const boton of botones) {
      expect(boton).toBeDisabled();
    }
  });

  it('muestra los accesos de interés y enlaza el calendario a Estudiantes', () => {
    renderizarPagina();

    expect(
      screen.getByRole('heading', { level: 3, name: 'Campus Virtual Moodle' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 3, name: 'SIU · Autogestión' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Ver el calendario' })).toHaveAttribute(
      'href',
      '/estudiantes',
    );
    // Moodle y SIU no tienen URL oficial todavía.
    expect(screen.getAllByText('Enlace oficial próximamente')).toHaveLength(2);
  });
});
