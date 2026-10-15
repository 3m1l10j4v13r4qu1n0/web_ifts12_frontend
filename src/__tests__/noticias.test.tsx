import { fireEvent, screen, within } from '@testing-library/react';
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

  it('muestra el contador de resultados', async () => {
    renderizarPagina();

    await screen.findByText('Inscripciones abiertas para el ciclo lectivo 2026');

    expect(screen.getByText(/2 de 2 resultados/)).toBeInTheDocument();
  });

  it('muestra el breadcrumb Inicio / Novedades', () => {
    renderizarPagina();

    const nav = screen.getByRole('navigation', { name: 'Ruta de navegación' });
    expect(within(nav).getByRole('link', { name: 'Inicio' })).toHaveAttribute('href', '/');
    expect(within(nav).getByText('Novedades')).toBeInTheDocument();
    // El último nivel es la página actual: sin enlace.
    expect(within(nav).queryByRole('link', { name: 'Novedades' })).not.toBeInTheDocument();
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
    expect(screen.getByText(/1 de 1 resultados/)).toBeInTheDocument();
  });

  it('arma las categorías con las que trae el backend y filtra por ellas', async () => {
    renderizarPagina();

    await screen.findByText('Inscripciones abiertas para el ciclo lectivo 2026');

    fireEvent.click(screen.getByRole('button', { name: 'Estudiantes' }));

    expect(screen.getByText('Inicio de Clases y Tutorías para Estudiantes')).toBeInTheDocument();
    expect(
      screen.queryByText('Inscripciones abiertas para el ciclo lectivo 2026'),
    ).not.toBeInTheDocument();
  });

  it('filtra por año y por mes de publicación', async () => {
    listarNovedadesMock.mockResolvedValue([
      NOVEDADES_API_FIJA[0],
      { ...NOVEDADES_API_FIJA[1], fecha_publicacion: '2025-03-10T12:00:00' },
    ] as NovedadApi[]);

    renderizarPagina();

    await screen.findByText('Inscripciones abiertas para el ciclo lectivo 2026');

    fireEvent.change(screen.getByLabelText('Año'), { target: { value: '2025' } });

    expect(screen.getByText('Inicio de Clases y Tutorías para Estudiantes')).toBeInTheDocument();
    expect(
      screen.queryByText('Inscripciones abiertas para el ciclo lectivo 2026'),
    ).not.toBeInTheDocument();

    // El mes se arma con el nombre real de la fecha del backend.
    expect(screen.getByRole('option', { name: 'Marzo' })).toBeInTheDocument();
  });

  it('pagina los resultados de a 6 y vuelve a la primera página al filtrar', async () => {
    const muchas = Array.from({ length: 7 }, (_, indice) => ({
      ...NOVEDADES_API_FIJA[0],
      id: indice + 1,
      titulo: `Novedad número ${indice + 1}`,
      fecha_publicacion: `2026-09-${String(indice + 1).padStart(2, '0')}T12:00:00`,
    }));

    listarNovedadesMock.mockResolvedValue(muchas as NovedadApi[]);

    renderizarPagina();

    await screen.findByText('Novedad número 7');

    // Página 1: los 6 primeros, ordenados de más reciente a más antigua (7 → 2).
    expect(screen.getByText('Novedad número 7')).toBeInTheDocument();
    expect(screen.queryByText('Novedad número 1')).not.toBeInTheDocument();
    expect(screen.getByText(/6 de 7 resultados/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: '2' }));

    expect(screen.getByText('Novedad número 1')).toBeInTheDocument();
    expect(screen.getByText(/1 de 7 resultados/)).toBeInTheDocument();
  });

  it('muestra un estado vacío cuando no hay coincidencias', async () => {
    renderizarPagina();

    await screen.findByText('Inscripciones abiertas para el ciclo lectivo 2026');

    fireEvent.change(screen.getByLabelText('Buscar en novedades'), {
      target: { value: 'algo que no existe' },
    });

    expect(screen.getByText(/no se encontraron novedades/i)).toBeInTheDocument();
  });

  it('muestra la fecha que devuelve el backend en formato dd/mm/aaaa', async () => {
    renderizarPagina();

    // 2026-09-28T19:54Z, con la `Z` agregada por el mapper: no debe correr de día.
    expect(await screen.findAllByText('28/09/2026')).not.toHaveLength(0);
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

    expect(await screen.findByText(/página no encontrada/i)).toBeInTheDocument();
  });
});
