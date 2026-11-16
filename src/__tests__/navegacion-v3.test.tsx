import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { listarTodasLasCarreras } from '../api/services/carrera.service';
import { listarNovedades } from '../api/services/novedad.service';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import { MENU_PRINCIPAL, NAV_FOOTER_MAPA } from '../constants/navegacion';
import { NOVEDADES_API_FIJA, PAGINA_CARRERAS_API_FIJA, renderConRouter } from '../test-utils';
import type { NovedadApi } from '../types/api/novedad.types';

vi.mock('../api/services/carrera.service');
vi.mock('../api/services/novedad.service');

const listarTodasLasCarrerasMock = vi.mocked(listarTodasLasCarreras);
const listarNovedadesMock = vi.mocked(listarNovedades);

/**
 * HU-03 — navegación del Mapa del Sitio V3 (ticket 0000088).
 * El menú, el pie y las rutas que no migran. Las etiquetas viejas no pueden
 * reaparecer en el chrome del sitio.
 */
describe('Navegación del Mapa del Sitio V3', () => {
  beforeEach(() => {
    listarTodasLasCarrerasMock.mockReset();
    listarTodasLasCarrerasMock.mockResolvedValue(PAGINA_CARRERAS_API_FIJA);
    listarNovedadesMock.mockReset();
    listarNovedadesMock.mockResolvedValue(NOVEDADES_API_FIJA as NovedadApi[]);
  });

  it('define las 7 pestañas del mapa en el orden aprobado', () => {
    expect(MENU_PRINCIPAL.map((item) => item.etiqueta)).toEqual([
      'Inicio',
      'Instituto',
      'Carreras',
      'Ingresantes',
      'Alumnos',
      'Tutoría',
      'FAQ',
    ]);
  });

  it('conserva las rutas publicadas: el cambio de etiqueta no migra URLs', () => {
    const rutas = Object.fromEntries(MENU_PRINCIPAL.map((item) => [item.etiqueta, item.href]));

    expect(rutas.Instituto).toBe('/institucional');
    expect(rutas.Alumnos).toBe('/estudiantes');
    expect(rutas.Tutoría).toBe('/tutorias');
  });

  it('el header renderiza las 7 pestañas y no las etiquetas viejas', () => {
    renderConRouter(<Header />);

    const nav = screen.getByRole('navigation', { name: 'Navegación principal' });

    for (const item of MENU_PRINCIPAL) {
      expect(within(nav).getByRole('link', { name: item.etiqueta })).toHaveAttribute(
        'href',
        item.href,
      );
    }

    expect(within(nav).queryByRole('link', { name: 'Institucional' })).not.toBeInTheDocument();
    expect(within(nav).queryByRole('link', { name: 'Estudiantes' })).not.toBeInTheDocument();
    expect(within(nav).queryByRole('link', { name: 'Tutorías' })).not.toBeInTheDocument();
  });

  it('no pone Docentes, Novedades ni Contacto en el menú principal', () => {
    renderConRouter(<Header />);

    const nav = screen.getByRole('navigation', { name: 'Navegación principal' });

    expect(within(nav).queryByRole('link', { name: 'Docentes' })).not.toBeInTheDocument();
    expect(within(nav).queryByRole('link', { name: 'Novedades' })).not.toBeInTheDocument();
    expect(within(nav).queryByRole('link', { name: 'Contacto' })).not.toBeInTheDocument();
  });

  it('marca FAQ como pestaña activa cuando se navega a /faq', () => {
    renderConRouter(<Header />, { ruta: '/faq' });

    const nav = screen.getByRole('navigation', { name: 'Navegación principal' });

    expect(within(nav).getByRole('link', { name: 'FAQ' })).toHaveAttribute('aria-current', 'page');
  });

  it('el menú móvil muestra las mismas 7 pestañas', async () => {
    const usuario = userEvent.setup();
    renderConRouter(<Header />);

    await usuario.click(screen.getByRole('button', { name: 'Abrir menú' }));

    const panel = screen.getByRole('dialog', { name: 'Navegación principal' });

    for (const item of MENU_PRINCIPAL) {
      expect(within(panel).getByRole('link', { name: item.etiqueta })).toBeInTheDocument();
    }
  });

  it('el pie usa los nombres nuevos y conserva Novedades y Contacto', () => {
    renderConRouter(<Footer />);

    const mapa = screen.getByRole('navigation', { name: 'Mapa del sitio en el pie' });

    expect(within(mapa).getByRole('link', { name: 'Instituto' })).toHaveAttribute(
      'href',
      '/institucional',
    );
    expect(within(mapa).getByRole('link', { name: 'Alumnos' })).toHaveAttribute(
      'href',
      '/estudiantes',
    );
    expect(within(mapa).getByRole('link', { name: 'Tutoría' })).toHaveAttribute(
      'href',
      '/tutorias',
    );
    expect(within(mapa).getByRole('link', { name: 'Novedades' })).toHaveAttribute(
      'href',
      '/noticias',
    );
    expect(within(mapa).getByRole('link', { name: 'Contacto' })).toHaveAttribute(
      'href',
      '/contacto',
    );

    const etiquetasFooter = NAV_FOOTER_MAPA.map((item) => item.etiqueta);
    expect(etiquetasFooter).not.toContain('Institucional');
    expect(etiquetasFooter).not.toContain('Estudiantes');
    expect(etiquetasFooter).not.toContain('Tutorías');
  });

  it('el pie ya no anuncia Becas ni Mesas de examen como secciones propias', () => {
    renderConRouter(<Footer />);

    const servicios = screen.getByRole('navigation', { name: 'Servicios en el pie' });

    expect(within(servicios).queryByText('Becas')).not.toBeInTheDocument();
    expect(within(servicios).queryByText('Mesas de examen')).not.toBeInTheDocument();
  });
});
