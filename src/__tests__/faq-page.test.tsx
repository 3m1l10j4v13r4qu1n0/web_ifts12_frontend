import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import FaqPage from '../pages/FaqPage';
import { renderConRouter } from '../test-utils';

function renderizarFaq(ruta = '/faq') {
  return renderConRouter(<FaqPage />, { ruta });
}

describe('FaqPage', () => {
  it('muestra breadcrumb, título y bajada del diseño', () => {
    renderizarFaq();

    expect(screen.getByRole('link', { name: 'Inicio' })).toHaveAttribute('href', '/');
    expect(
      screen.getByRole('heading', { level: 1, name: 'Preguntas frecuentes' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Respuestas por perfil: ingresantes, estudiantes y docentes.'),
    ).toBeInTheDocument();
  });

  it('abre en el segmento Ingresantes con la pestaña activa', () => {
    renderizarFaq();

    expect(screen.getByRole('tab', { name: 'Ingresantes' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    expect(screen.getByText('¿Qué carreras ofrece el instituto?')).toBeInTheDocument();
    expect(
      screen.getByText('¿Cuál es la modalidad y el horario de las carreras?'),
    ).toBeInTheDocument();
  });

  it('solo tiene los tres segmentos del diseño (sin Todas ni Institucional)', () => {
    renderizarFaq();

    expect(screen.getAllByRole('tab')).toHaveLength(3);
    expect(screen.queryByRole('tab', { name: 'Todas' })).not.toBeInTheDocument();
    expect(screen.queryByRole('tab', { name: 'Institucional' })).not.toBeInTheDocument();
  });

  it('filtra las preguntas del segmento activo con el buscador interno', async () => {
    const usuario = userEvent.setup();
    renderizarFaq();

    await usuario.type(screen.getByLabelText('Buscar en preguntas frecuentes'), 'carreras');

    expect(screen.getByText('¿Qué carreras ofrece el instituto?')).toBeInTheDocument();
    expect(screen.queryByText('¿Puedo presentar equivalencias?')).not.toBeInTheDocument();
  });

  it('avisa cuando la búsqueda no tiene resultados', async () => {
    const usuario = userEvent.setup();
    renderizarFaq();

    await usuario.type(screen.getByLabelText('Buscar en preguntas frecuentes'), 'textoquenoexiste');

    expect(
      screen.getByText('No encontramos preguntas que coincidan con tu búsqueda.'),
    ).toBeInTheDocument();
  });

  it('muestra el estado vacío en un segmento sin preguntas confirmadas', async () => {
    const usuario = userEvent.setup();
    renderizarFaq();

    await usuario.click(screen.getByRole('tab', { name: 'Estudiantes' }));

    expect(screen.getByText('Todavía no hay preguntas en este segmento.')).toBeInTheDocument();
  });

  it('ofrece ir a Contacto cuando no se encuentra la respuesta', () => {
    renderizarFaq();

    expect(screen.getByText('¿No encontraste lo que buscabas?')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Ir a Contacto' })).toHaveAttribute(
      'href',
      '/contacto',
    );
  });
});
