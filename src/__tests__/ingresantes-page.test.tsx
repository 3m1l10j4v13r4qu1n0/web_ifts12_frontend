import { screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import IngresantesPage from '../pages/IngresantesPage';
import { renderConRouter } from '../test-utils';

function renderizarPagina() {
  return renderConRouter(<IngresantesPage />, { ruta: '/ingresantes' });
}

/**
 * HU-05 — Ingresantes (ticket 0000091; Mapa del Sitio V3 §5).
 * La sección explica solo cómo inscribirse: sin listado de carreras ni bloques de otra
 * sección, y sin fechas inventadas.
 */
describe('IngresantesPage', () => {
  it('muestra breadcrumb, título y bajada', () => {
    renderizarPagina();

    const nav = screen.getByRole('navigation', { name: 'Ruta de navegación' });
    expect(within(nav).getByRole('link', { name: 'Inicio' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('heading', { level: 1, name: 'Ingresantes' })).toBeInTheDocument();
    expect(
      screen.getByText(/Cómo inscribirte en el IFTS N\.º 12: preinscripción online del GCBA/),
    ).toBeInTheDocument();
  });

  it('ya no lista las carreras de la sección', () => {
    renderizarPagina();

    expect(screen.queryByRole('heading', { name: 'Carreras disponibles' })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /Ver (las )?carreras/ })).not.toBeInTheDocument();
  });

  it('no muestra los bloques Modalidad, Horarios, Equivalencias ni Pases', () => {
    renderizarPagina();

    for (const titulo of ['Modalidad', 'Horarios', 'Equivalencias']) {
      expect(screen.queryByRole('heading', { name: titulo })).not.toBeInTheDocument();
    }
    expect(
      screen.queryByRole('heading', { name: 'Pases desde otros institutos' }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/Modalidad, horarios y equivalencias/)).not.toBeInTheDocument();
  });

  it('no muestra la tabla de Fechas clave', () => {
    renderizarPagina();

    expect(screen.queryByRole('table')).not.toBeInTheDocument();
    expect(screen.queryByText('Fechas clave')).not.toBeInTheDocument();
    expect(screen.queryByText('Presentación de documentación')).not.toBeInTheDocument();
  });

  it('explica cómo inscribirse y qué requisitos se necesitan', () => {
    renderizarPagina();

    expect(screen.getByRole('heading', { name: '¿Cómo me inscribo?' })).toBeInTheDocument();
    expect(
      screen.getAllByText(/Agencia de Aprendizaje a lo Largo de la Vida/).length,
    ).toBeGreaterThan(0);
    expect(screen.getByRole('heading', { name: '¿Qué requisitos necesito?' })).toBeInTheDocument();
    expect(
      screen.getByText(
        /Título secundario o certificado en trámite; convalidación si el título es del extranjero; DNI o pasaporte/,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: '¿Dónde hago la preinscripción?' }),
    ).toBeInTheDocument();
  });

  it('muestra el enlace de preinscripción y el instructivo como pendientes, sin URL inventada', () => {
    renderizarPagina();

    expect(
      screen.getByText('El enlace oficial de preinscripción se publica cuando esté disponible.'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('El instructivo paso a paso se publica cuando esté disponible.'),
    ).toBeInTheDocument();

    const enlacesExternos = screen
      .getAllByRole('link')
      .filter((enlace) => enlace.getAttribute('href')?.startsWith('http'));
    expect(enlacesExternos).toHaveLength(0);
  });

  it('incluye título y validez oficial y el enlace a todas las preguntas', () => {
    renderizarPagina();

    expect(
      screen.getByRole('button', { name: '¿Los títulos tienen validez nacional?' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Ver todas las preguntas' })).toHaveAttribute(
      'href',
      '/faq',
    );
  });
});
