import { screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { listarTodasLasCarreras } from '../api/services/carrera.service';
import { listarNovedades } from '../api/services/novedad.service';
import Header from '../components/layout/Header';
import { ACCESOS_EXTERNOS, MENU_PRINCIPAL, UBICACION_HEADER } from '../constants/navegacion';
import { NOVEDADES_API_FIJA, PAGINA_CARRERAS_API_FIJA, renderConRouter } from '../test-utils';
import type { NovedadApi } from '../types/api/novedad.types';

vi.mock('../api/services/carrera.service');
vi.mock('../api/services/novedad.service');

const listarTodasLasCarrerasMock = vi.mocked(listarTodasLasCarreras);
const listarNovedadesMock = vi.mocked(listarNovedades);

describe('Header', () => {
  beforeEach(() => {
    listarTodasLasCarrerasMock.mockReset();
    listarTodasLasCarrerasMock.mockResolvedValue(PAGINA_CARRERAS_API_FIJA);
    listarNovedadesMock.mockReset();
    listarNovedadesMock.mockResolvedValue(NOVEDADES_API_FIJA as NovedadApi[]);
  });

  it('enlaza el nombre del instituto a la home y muestra el menu principal', async () => {
    renderConRouter(<Header />);

    expect(screen.getByRole('link', { name: /IFTS N\.º 12/ })).toHaveAttribute('href', '/');
    expect(screen.getByRole('img', { name: 'IFTS N.º 12' })).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: 'Gobierno de la Ciudad de Buenos Aires' }),
    ).toBeInTheDocument();

    for (const item of MENU_PRINCIPAL) {
      expect(screen.getByRole('link', { name: item.etiqueta })).toBeInTheDocument();
    }
  });

  it('muestra la ubicación del instituto y los accesos externos con etiqueta larga', () => {
    renderConRouter(<Header />);

    expect(screen.getByText(UBICACION_HEADER)).toBeInTheDocument();

    for (const acceso of ACCESOS_EXTERNOS) {
      expect(screen.getByText(acceso.etiqueta)).toBeInTheDocument();
    }
  });

  it('no anuncia el panel de administración: el ingreso es solo por URL directa', () => {
    renderConRouter(<Header />);

    expect(screen.queryByRole('button', { name: 'Cuenta' })).not.toBeInTheDocument();
    expect(screen.queryByRole('menu', { name: 'Cuenta' })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /administración/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('menuitem')).not.toBeInTheDocument();
  });

  it('se renderiza aunque la API de carreras y novedades falle', async () => {
    // El header es chrome: si el backend no responde, el sitio tiene que seguir siendo
    // navegable. El buscador queda vacío, pero la estructura no se cae.
    listarTodasLasCarrerasMock.mockRejectedValue({ status: 0, mensaje: 'sin conexión' });
    listarNovedadesMock.mockRejectedValue({ status: 0, mensaje: 'sin conexión' });

    renderConRouter(<Header />);

    expect(screen.getByRole('combobox', { name: 'Buscar en el sitio' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /IFTS N\.º 12/ })).toHaveAttribute('href', '/');
  });
});
