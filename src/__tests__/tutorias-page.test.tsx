import { screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { HORARIO_ATENCION } from '../constants/navegacion';
import { ASUNTO_TUTORIAS, CORREO_TUTORIAS, ENLACE_CORREO_TUTORIAS } from '../constants/tutorias';
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
    expect(within(nav).getByText('Tutoría')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: 'Tutoría' })).toBeInTheDocument();
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

  it('ya no muestra la tabla de días, horarios y modalidades', () => {
    renderizarPagina();

    expect(screen.queryByRole('table')).not.toBeInTheDocument();
    expect(screen.queryByText(/Días, horarios y modalidades de atención/)).not.toBeInTheDocument();
  });

  it('publica el correo del equipo con el asunto oficial y el mailto precargado', () => {
    renderizarPagina();

    const enlace = screen.getByRole('link', { name: CORREO_TUTORIAS });

    expect(enlace).toHaveAttribute('href', ENLACE_CORREO_TUTORIAS);
    expect(enlace.getAttribute('href')).toContain(`subject=${encodeURIComponent(ASUNTO_TUTORIAS)}`);
    expect(screen.getByText(ASUNTO_TUTORIAS)).toBeInTheDocument();
    expect(screen.getByText(/indicá tu año y carrera/i)).toBeInTheDocument();
  });

  it('muestra la dirección con las dos franjas de atención vigentes', () => {
    renderizarPagina();

    expect(
      screen.getByText(`Misiones 26, C1083 ABB, CABA · ${HORARIO_ATENCION}.`),
    ).toBeInTheDocument();
    expect(screen.getByText(`Horario de atención: ${HORARIO_ATENCION}.`)).toBeInTheDocument();
    expect(screen.queryByText(/exclusivamente nocturn/i)).not.toBeInTheDocument();
  });

  it('ya no deriva las consultas al formulario de contacto', () => {
    renderizarPagina();

    expect(screen.queryByText(/asunto\s*“?Tutorías”?/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Ir a Contacto' })).not.toBeInTheDocument();
    expect(screen.queryByRole('region', { name: 'Consulta directa' })).not.toBeInTheDocument();
  });

  it('mantiene el correo institucional como mensaje de proceso', () => {
    renderizarPagina();

    expect(screen.getByRole('heading', { level: 3, name: 'IFTS N.º 12' })).toBeInTheDocument();
    expect(
      screen.getByText('Correo institucional: se publica cuando esté disponible.'),
    ).toBeInTheDocument();
  });
});
