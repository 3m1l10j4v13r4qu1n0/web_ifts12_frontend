import { fireEvent, screen } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { listarNovedades } from '../api/services/novedad.service';
import NotaCompletaPage from '../pages/NotaCompletaPage';
import NoticiasPage from '../pages/NoticiasPage';
import { NOVEDADES_API_FIJA, renderConRouter } from '../test-utils';
import type { NovedadApi } from '../types/api/novedad.types';

vi.mock('../api/services/novedad.service');

const listarNovedadesMock = vi.mocked(listarNovedades);

/** Slug derivado del `titulo` real de la fila 1. */
const SLUG_INSCRIPCIONES = 'inscripciones-abiertas-para-el-ciclo-lectivo-2026';
const SLUG_TUTORIAS = 'inicio-de-clases-y-tutorias-para-estudiantes';

function renderizarPagina() {
  return renderConRouter(<NoticiasPage />, { ruta: '/noticias' });
}

function renderizarNota(ruta: string) {
  return renderConRouter(
    <Routes>
      <Route path="/noticias/:id" element={<NotaCompletaPage />} />
    </Routes>,
    { ruta },
  );
}

describe('NoticiasPage', () => {
  beforeEach(() => {
    listarNovedadesMock.mockReset();
    listarNovedadesMock.mockResolvedValue(NOVEDADES_API_FIJA as NovedadApi[]);
  });

  it('lista las novedades del backend', async () => {
    renderizarPagina();

    expect(
      await screen.findByText('Inscripciones abiertas para el ciclo lectivo 2026'),
    ).toBeInTheDocument();
    expect(screen.getByText('Inicio de Clases y Tutorías para Estudiantes')).toBeInTheDocument();
  });

  it('filtra las novedades por palabra clave, sin distinguir acentos', async () => {
    renderizarPagina();

    await screen.findByText('Inscripciones abiertas para el ciclo lectivo 2026');

    // "Tutorías" con tilde tiene que matchear contra "tutorias" sin tilde.
    fireEvent.change(screen.getByLabelText('Buscar en novedades'), {
      target: { value: 'tutorias' },
    });

    expect(screen.getByText('Inicio de Clases y Tutorías para Estudiantes')).toBeInTheDocument();
    expect(
      screen.queryByText('Inscripciones abiertas para el ciclo lectivo 2026'),
    ).not.toBeInTheDocument();
  });

  it('muestra un estado vacío cuando no hay coincidencias', async () => {
    renderizarPagina();

    await screen.findByText('Inscripciones abiertas para el ciclo lectivo 2026');

    fireEvent.change(screen.getByLabelText('Buscar en novedades'), {
      target: { value: 'algo que no existe' },
    });

    expect(screen.getByText(/no se encontraron novedades/i)).toBeInTheDocument();
  });

  it('muestra la fecha que devuelve el backend', async () => {
    renderizarPagina();

    // 2026-09-28T19:54Z, con la `Z` agregada por el mapper: no debe correr de día.
    expect(await screen.findAllByText('2026-09-28')).not.toHaveLength(0);
  });

  it('muestra el estado vacío cuando el backend no tiene novedades', async () => {
    listarNovedadesMock.mockResolvedValue([]);

    renderizarPagina();

    expect(await screen.findByText('Todavía no hay novedades publicadas.')).toBeInTheDocument();
  });

  it('muestra el estado de carga antes de resolver la consulta', () => {
    listarNovedadesMock.mockReturnValue(new Promise(() => undefined));

    renderizarPagina();

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('muestra el error normalizado con opción de reintentar', async () => {
    listarNovedadesMock.mockRejectedValue({ status: 0, mensaje: 'Ocurrió un error inesperado.' });

    renderizarPagina();

    expect(await screen.findByRole('alert')).toHaveTextContent('No pudimos cargar las novedades.');
    expect(screen.getByRole('button', { name: 'Reintentar' })).toBeInTheDocument();
  });
});

describe('NotaCompletaPage', () => {
  beforeEach(() => {
    listarNovedadesMock.mockReset();
    listarNovedadesMock.mockResolvedValue(NOVEDADES_API_FIJA as NovedadApi[]);
  });

  it('muestra la nota solicitada con el contenido del backend', async () => {
    renderizarNota(`/noticias/${SLUG_INSCRIPCIONES}`);

    expect(
      await screen.findByRole('heading', {
        level: 1,
        name: 'Inscripciones abiertas para el ciclo lectivo 2026',
      }),
    ).toBeInTheDocument();
    // El `contenido` completo sí se muestra acá, a diferencia del listado.
    expect(screen.getByText(/Modalidad gratuita y con títulos oficiales/)).toBeInTheDocument();
  });

  it('muestra la categoría cuando el backend la trae', async () => {
    renderizarNota(`/noticias/${SLUG_INSCRIPCIONES}`);

    expect(await screen.findByText('Categoría: Ingresantes')).toBeInTheDocument();
  });

  it('lista las otras novedades', async () => {
    renderizarNota(`/noticias/${SLUG_INSCRIPCIONES}`);

    expect(
      await screen.findByRole('link', { name: 'Inicio de Clases y Tutorías para Estudiantes' }),
    ).toHaveAttribute('href', `/noticias/${SLUG_TUTORIAS}`);
  });

  it('muestra la página 404 para un id inexistente', async () => {
    renderizarNota('/noticias/inexistente');

    expect(await screen.findByText('Pagina no encontrada')).toBeInTheDocument();
  });
});
