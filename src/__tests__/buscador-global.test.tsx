import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useLocation } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { listarTodasLasCarreras } from '../api/services/carrera.service';
import { listarNovedades } from '../api/services/novedad.service';
import BuscadorGlobal from '../components/layout/BuscadorGlobal';
import { NOVEDADES_API_FIJA, PAGINA_CARRERAS_API_FIJA, renderConRouter } from '../test-utils';
import type { NovedadApi } from '../types/api/novedad.types';

vi.mock('../api/services/carrera.service');
vi.mock('../api/services/novedad.service');

const listarTodasLasCarrerasMock = vi.mocked(listarTodasLasCarreras);
const listarNovedadesMock = vi.mocked(listarNovedades);

function renderizarBuscador() {
  return renderConRouter(
    <>
      <BuscadorGlobal />
      <RutaActual />
    </>,
  );
}

function RutaActual() {
  const ruta = useLocation();
  return <output data-testid="ruta-actual">{ruta.pathname + ruta.search}</output>;
}

function escribir(texto: string) {
  const input = screen.getByRole('combobox');
  fireEvent.focus(input);
  fireEvent.change(input, { target: { value: texto } });
  return input;
}

describe('BuscadorGlobal', () => {
  beforeEach(() => {
    listarTodasLasCarrerasMock.mockReset();
    listarTodasLasCarrerasMock.mockResolvedValue(PAGINA_CARRERAS_API_FIJA);
    listarNovedadesMock.mockReset();
    listarNovedadesMock.mockResolvedValue(NOVEDADES_API_FIJA as NovedadApi[]);
  });

  it('indexa las carreras que devuelve el backend', async () => {
    renderizarBuscador();

    escribir('sistemas');

    // Antes buscaba sobre `mockCarreras` y ofrecía "Gestión Parlamentaria", que el backend
    // no publica: la fila real más cercana es "Administración Pública".
    expect(
      await screen.findByText('Tecnicatura Superior en Análisis de Sistemas'),
    ).toBeInTheDocument();
  });

  it('indexa las novedades que devuelve el backend', async () => {
    renderizarBuscador();

    escribir('inscripciones');

    expect(
      await screen.findByText('Inscripciones abiertas para el ciclo lectivo 2026'),
    ).toBeInTheDocument();
  });

  it('invita a navegar a un resultado con Enter', async () => {
    renderizarBuscador();

    const input = escribir('sistemas');
    await screen.findByText('Tecnicatura Superior en Análisis de Sistemas');

    fireEvent.submit(input.closest('form') as HTMLFormElement);

    expect(
      screen.queryByText('Tecnicatura Superior en Análisis de Sistemas'),
    ).not.toBeInTheDocument();
  });

  it('avisa cuando no hay resultados', async () => {
    renderizarBuscador();

    escribir('textoquenoexiste');

    expect(await screen.findByText(/Sin resultados/)).toBeInTheDocument();
  });

  it('mantiene las sugerencias al tabular y abre la seleccionada con Enter', async () => {
    const user = userEvent.setup();
    renderizarBuscador();
    await user.type(screen.getByRole('combobox'), 'sistemas');
    const sugerencia = await screen.findByRole('button', {
      name: /Tecnicatura Superior en Análisis de Sistemas/,
    });
    await user.tab();
    expect(sugerencia).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(screen.getByTestId('ruta-actual')).toHaveTextContent('/carreras/analisis-de-sistemas');
    expect(sugerencia).not.toBeInTheDocument();
  });

  it('abre todos los resultados sin desmontar el enlace antes del clic', async () => {
    const user = userEvent.setup();
    renderizarBuscador();
    await user.type(screen.getByRole('combobox'), 'sistemas');
    await user.click(screen.getByRole('link', { name: 'Ver todos los resultados' }));
    expect(screen.getByTestId('ruta-actual')).toHaveTextContent('/buscar?q=sistemas');
  });

  it('igual sigue buscando secciones y FAQs si la API falla', async () => {
    // El buscador está en el header de todas las páginas: si el backend no responde, el
    // sitio no puede quedar sin navegación.
    listarTodasLasCarrerasMock.mockRejectedValue({ status: 0, mensaje: 'sin conexión' });
    listarNovedadesMock.mockRejectedValue({ status: 0, mensaje: 'sin conexión' });

    renderizarBuscador();

    escribir('novedades');

    // El resultado de la sección trae título y etiqueta de sección "Novedades": se busca la
    // descripción, que es única, para no chocar con el texto duplicado.
    expect(await screen.findByText('Sección del sitio')).toBeInTheDocument();
  });
});
