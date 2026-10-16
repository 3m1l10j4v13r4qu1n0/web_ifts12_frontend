import { screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import TutoriasPage from '../pages/TutoriasPage';
import { renderConRouter } from '../test-utils';

function renderizarPagina() {
  return renderConRouter(<TutoriasPage />, { ruta: '/tutorias' });
}

describe('TutoriasPage', () => {
  it('muestra breadcrumb, título y bajada del diseño', () => {
    renderizarPagina();

    const nav = screen.getByRole('navigation', { name: 'Ruta de navegación' });
    expect(within(nav).getByRole('link', { name: 'Inicio' })).toHaveAttribute('href', '/');
    expect(within(nav).getByText('Tutorías')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: 'Tutorías' })).toBeInTheDocument();
    expect(screen.getByText(/Espacio de acompañamiento al estudiante/)).toBeInTheDocument();
  });

  it('muestra la presentación y la foto como mensajes de proceso', () => {
    renderizarPagina();

    expect(
      screen.getByText(
        'El equipo de tutorías publica el texto de presentación del espacio cuando esté disponible.',
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText('La foto del espacio de tutorías se publica cuando esté disponible.'),
    ).toBeInTheDocument();
  });

  it('muestra la tabla de atención con las filas PENDIENTE del diseño', () => {
    renderizarPagina();

    const tabla = screen.getByRole('table', { name: 'Turnos de atención de tutorías' });
    const encabezados = within(tabla).getAllByRole('columnheader');
    expect(encabezados.map((th) => th.textContent)).toEqual(['Día', 'Horario', 'Modalidad']);

    const filas = within(tabla).getAllByRole('row').slice(1);
    expect(filas).toHaveLength(2);
    for (const fila of filas) {
      expect(within(fila).getAllByText('PENDIENTE')).toHaveLength(3);
    }
  });

  it('muestra las tres tarjetas de contacto y enlaza a Contacto', () => {
    renderizarPagina();

    expect(
      screen.getByRole('heading', { level: 3, name: 'Correo de tutorías' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('El correo oficial del equipo se publica cuando esté disponible.'),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Dónde' })).toBeInTheDocument();
    expect(
      screen.getByText(/Misiones 26, C1083 ABB, CABA · Atención exclusivamente nocturna/),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 3, name: '¿Tenés una consulta?' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Ir a Contacto' })).toHaveAttribute(
      'href',
      '/contacto',
    );
  });

  it('muestra los datos del instituto con el correo como mensaje de proceso', () => {
    renderizarPagina();

    expect(screen.getByRole('heading', { level: 3, name: 'IFTS N.º 12' })).toBeInTheDocument();
    expect(screen.getByText('Horario de atención: exclusivamente nocturno.')).toBeInTheDocument();
    expect(
      screen.getByText('Correo institucional: se publica cuando esté disponible.'),
    ).toBeInTheDocument();
  });

  it('muestra el formulario de consulta directa', () => {
    renderizarPagina();

    const formulario = screen.getByRole('region', { name: 'Consulta directa' });
    expect(within(formulario).getByLabelText('Nombre')).toBeInTheDocument();
    expect(within(formulario).getByLabelText('Correo electrónico')).toBeInTheDocument();
    expect(within(formulario).getByLabelText('Consulta')).toBeInTheDocument();
    expect(within(formulario).getByRole('button', { name: 'Enviar consulta' })).toBeInTheDocument();
    expect(within(formulario).getByRole('button', { name: 'Limpiar' })).toBeInTheDocument();
  });
});
