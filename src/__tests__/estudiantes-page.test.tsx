import { screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import EstudiantesPage from '../pages/EstudiantesPage';
import { renderConRouter } from '../test-utils';

function renderizarPagina() {
  return renderConRouter(<EstudiantesPage />, { ruta: '/estudiantes' });
}

describe('EstudiantesPage', () => {
  it('muestra breadcrumb, título y bajada del diseño', () => {
    renderizarPagina();

    const nav = screen.getByRole('navigation', { name: 'Ruta de navegación' });
    expect(within(nav).getByRole('link', { name: 'Inicio' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('heading', { level: 1, name: 'Estudiantes' })).toBeInTheDocument();
    expect(
      screen.getByText(/Información y trámites para estudiantes actuales/),
    ).toBeInTheDocument();
  });

  it('lista los ocho trámites del diseño', () => {
    renderizarPagina();

    const titulos = [
      'Regularidad',
      'Constancias',
      'Mesas de examen',
      'Becas',
      'Boleto estudiantil',
      'Trámite de títulos',
      'Traspasos entre IFTS',
      'Campus Virtual Moodle',
    ];

    for (const titulo of titulos) {
      expect(screen.getByRole('heading', { level: 3, name: titulo })).toBeInTheDocument();
    }
  });

  it('el CTA de mesas baja a la sección de la propia página', () => {
    renderizarPagina();

    expect(screen.getByRole('link', { name: 'Ver mesas' })).toHaveAttribute(
      'href',
      '#mesas-de-examen-final',
    );
  });

  it('muestra el calendario como tabla con fechas pendientes', () => {
    renderizarPagina();

    const tabla = screen.getByRole('table', { name: /estructura del ciclo lectivo/i });
    expect(within(tabla).getByText('1.er cuatrimestre')).toBeInTheDocument();
    expect(within(tabla).getByText('Receso')).toBeInTheDocument();
    expect(within(tabla).getByText('2.º cuatrimestre')).toBeInTheDocument();
    expect(within(tabla).getAllByText('PENDIENTE')).toHaveLength(6);
  });

  it('muestra las mesas de examen como tabla con fecha y modalidad pendientes', () => {
    renderizarPagina();

    const tabla = screen.getByRole('table', { name: /cronograma de mesas de examen final/i });
    expect(within(tabla).getAllByText('Turno de examen')).toHaveLength(2);
    expect(within(tabla).getAllByText('Todas')).toHaveLength(2);
    expect(within(tabla).getAllByText('PENDIENTE')).toHaveLength(4);
  });

  it('muestra las FAQ de estudiantes sin etiqueta de categoría y el enlace a /faq', () => {
    renderizarPagina();

    expect(
      screen.getByRole('button', { name: '¿Cómo mantengo la condición de regularidad?' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Ver todas las preguntas' })).toHaveAttribute(
      'href',
      '/faq',
    );
  });
});
