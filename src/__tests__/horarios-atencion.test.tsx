import { screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { listarTodasLasCarreras } from '../api/services/carrera.service';
import { listarNovedades } from '../api/services/novedad.service';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import { HORARIO_ATENCION, UBICACION_HEADER } from '../constants/navegacion';
import { NOVEDADES_API_FIJA, PAGINA_CARRERAS_API_FIJA, renderConRouter } from '../test-utils';
import type { NovedadApi } from '../types/api/novedad.types';

vi.mock('../api/services/carrera.service');
vi.mock('../api/services/novedad.service');

const listarTodasLasCarrerasMock = vi.mocked(listarTodasLasCarreras);
const listarNovedadesMock = vi.mocked(listarNovedades);

/**
 * HU-04 — horarios de atención (ticket 0000089; devolución §11; RN-07).
 * Las dos franjas reemplazan «Atención exclusivamente nocturna» en la barra superior
 * y en el pie.
 */
describe('Horarios de atención institucional', () => {
  beforeEach(() => {
    listarTodasLasCarrerasMock.mockReset();
    listarTodasLasCarrerasMock.mockResolvedValue(PAGINA_CARRERAS_API_FIJA);
    listarNovedadesMock.mockReset();
    listarNovedadesMock.mockResolvedValue(NOVEDADES_API_FIJA as NovedadApi[]);
  });

  it('la barra superior muestra las dos franjas y ya no la leyenda nocturna', () => {
    renderConRouter(<Header />);

    expect(screen.getByText(UBICACION_HEADER)).toBeInTheDocument();
    expect(screen.getByText(/lunes a viernes de 9:00 a 13:00/)).toBeInTheDocument();
    expect(screen.getByText(/18:30 a 22:30/)).toBeInTheDocument();
    expect(screen.queryByText(/exclusivamente nocturn/i)).not.toBeInTheDocument();
  });

  it('el pie muestra las dos franjas y quita la leyenda «Exclusivamente nocturno»', () => {
    renderConRouter(<Footer />);

    expect(screen.getByText(HORARIO_ATENCION)).toBeInTheDocument();
    expect(
      screen.queryByText(/Exclusivamente nocturno · Presencial, Híbrida y a distancia/),
    ).not.toBeInTheDocument();
  });
});
