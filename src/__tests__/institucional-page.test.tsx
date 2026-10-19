import { screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import InstitucionalPage from '../pages/InstitucionalPage';
import { renderConRouter } from '../test-utils';

function renderizarPagina() {
  return renderConRouter(<InstitucionalPage />, { ruta: '/institucional' });
}

describe('InstitucionalPage', () => {
  it('muestra breadcrumb, título y bajada del diseño', () => {
    renderizarPagina();

    const nav = screen.getByRole('navigation', { name: 'Ruta de navegación' });
    expect(within(nav).getByRole('link', { name: 'Inicio' })).toHaveAttribute('href', '/');
    expect(within(nav).getByText('Institucional')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: 'Institucional' })).toBeInTheDocument();
    expect(
      screen.getByText(
        /Historia, autoridades, bedelía, normativa y enlaces de interés del IFTS N.º 12/,
      ),
    ).toBeInTheDocument();
  });

  it('muestra la historia y la foto como mensajes de proceso', () => {
    renderizarPagina();

    expect(
      screen.getByRole('heading', { level: 2, name: 'Historia del IFTS N.º 12' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'El instituto publica el texto de historia y presentación cuando esté validado por el equipo institucional.',
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText('La foto institucional se publica cuando esté disponible.'),
    ).toBeInTheDocument();
  });

  it('muestra la estructura de autoridades con mensaje de proceso', () => {
    renderizarPagina();

    expect(screen.getByRole('heading', { level: 2, name: 'Autoridades' })).toBeInTheDocument();
    expect(screen.getByText('Cargos y nombres solo con fuente verificable.')).toBeInTheDocument();

    expect(screen.getAllByRole('heading', { level: 3, name: 'Nombre y apellido' })).toHaveLength(3);
    expect(screen.getAllByText('Cargo · a validar')).toHaveLength(3);
    expect(
      screen.getAllByText('El instituto publica los nombres y cargos cuando estén verificados.'),
    ).toHaveLength(3);
  });

  it('muestra la tabla de bedelía con las filas y celdas PENDIENTE del diseño', () => {
    renderizarPagina();

    expect(screen.getByRole('heading', { level: 2, name: 'Bedelía' })).toBeInTheDocument();
    const tabla = screen.getByRole('table', { name: 'Datos de bedelía por año de cursada' });
    const encabezados = within(tabla).getAllByRole('columnheader');
    expect(encabezados.map((th) => th.textContent)).toEqual([
      'Año / carrera',
      'Bedel/a',
      'Horario',
      'Contacto',
    ]);

    const filas = within(tabla).getAllByRole('row').slice(1);
    expect(filas).toHaveLength(3);
    const anios = ['1.er año', '2.º año', '3.er año'];
    filas.forEach((fila, indice) => {
      expect(within(fila).getByRole('rowheader')).toHaveTextContent(anios[indice]);
      expect(within(fila).getAllByText('PENDIENTE')).toHaveLength(3);
    });
  });

  it('muestra la normativa con las descargas deshabilitadas', () => {
    renderizarPagina();

    expect(screen.getByRole('heading', { level: 2, name: 'Normativa' })).toBeInTheDocument();
    expect(
      screen.getByText('Marco normativo, reglamento orgánico y código de convivencia.'),
    ).toBeInTheDocument();

    expect(screen.getByText('Reglamento orgánico')).toBeInTheDocument();
    expect(screen.getByText('Código de convivencia')).toBeInTheDocument();
    expect(screen.getByText('Otra normativa institucional')).toBeInTheDocument();

    const botones = screen.getAllByRole('button', { name: 'Descargar' });
    expect(botones).toHaveLength(3);
    for (const boton of botones) {
      expect(boton).toBeDisabled();
    }
    expect(
      screen.getAllByText('El archivo oficial se publica cuando esté disponible.'),
    ).toHaveLength(3);
  });

  it('muestra los enlaces institucionales como pendientes', () => {
    renderizarPagina();

    expect(
      screen.getByRole('heading', { level: 2, name: 'Enlaces de interés institucional' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Ciudad Bilingüe' })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 3, name: 'Centro de Simulación' }),
    ).toBeInTheDocument();
    expect(screen.getAllByText('Enlace oficial próximamente')).toHaveLength(2);
  });
});
