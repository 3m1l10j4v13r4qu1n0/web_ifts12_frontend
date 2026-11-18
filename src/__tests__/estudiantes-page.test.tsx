import { fireEvent, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { RESPUESTA_PENDIENTE } from '../constants/mock-data';
import EstudiantesPage from '../pages/EstudiantesPage';
import { renderConRouter } from '../test-utils';

function renderizarPagina() {
  return renderConRouter(<EstudiantesPage />, { ruta: '/estudiantes' });
}

/** Las diez preguntas que pidió Edith para Alumnos (devolución §6; Mapa del Sitio V3 §6). */
const PREGUNTAS_DE_EDITH = [
  '¿Cómo me inscribo a las materias?',
  '¿Qué son las correlativas y dónde las consulto?',
  '¿Cómo me inscribo a los finales?',
  '¿Cómo solicito la constancia de examen?',
  '¿Cómo obtengo la constancia de alumno regular?',
  '¿Cómo hago un pase a otro IFTS?',
  '¿A qué correo escribo para contactar a Bedelía?',
  '¿Cómo mantengo la condición de regularidad?',
  '¿Cuáles son los horarios y la modalidad de cursada?',
  '¿Cómo contacto a los docentes?',
];

/**
 * HU-05 — Alumnos (ticket 0000092; Mapa del Sitio V3 §6).
 * Calendario primero (con las mesas integradas) y después preguntas frecuentes desplegables.
 */
describe('EstudiantesPage', () => {
  it('muestra breadcrumb, título y bajada', () => {
    renderizarPagina();

    const nav = screen.getByRole('navigation', { name: 'Ruta de navegación' });
    expect(within(nav).getByRole('link', { name: 'Inicio' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('heading', { level: 1, name: 'Alumnos' })).toBeInTheDocument();
    expect(
      screen.getByText(/Calendario académico y respuestas a las dudas más frecuentes/),
    ).toBeInTheDocument();
  });

  it('muestra el calendario académico antes que las preguntas frecuentes', () => {
    renderizarPagina();

    const calendario = screen.getByRole('heading', { level: 2, name: 'Calendario académico' });
    const preguntas = screen.getByRole('heading', {
      level: 2,
      name: 'Preguntas frecuentes de alumnos',
    });

    expect(
      calendario.compareDocumentPosition(preguntas) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it('ya no muestra las tarjetas de trámites', () => {
    renderizarPagina();

    const titulos = [
      'Regularidad',
      'Constancias',
      'Becas',
      'Boleto estudiantil',
      'Trámite de títulos',
      'Traspasos entre IFTS',
      'Campus Virtual Moodle',
    ];

    for (const titulo of titulos) {
      expect(screen.queryByRole('heading', { name: titulo })).not.toBeInTheDocument();
    }
    expect(screen.queryByText('Trámites e información')).not.toBeInTheDocument();
  });

  it('integra las mesas de examen dentro del calendario, destacadas y sin sección aparte', () => {
    renderizarPagina();

    const tabla = screen.getByRole('table', {
      name: /estructura del ciclo lectivo y mesas de examen final/i,
    });
    const filasMesas = within(tabla).getAllByText('Mesas de examen final');

    expect(filasMesas).toHaveLength(2);
    for (const celda of filasMesas) {
      expect(celda.tagName).toBe('STRONG');
    }

    expect(
      screen.queryByRole('heading', { level: 2, name: 'Mesas de examen final' }),
    ).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Ver mesas' })).not.toBeInTheDocument();
  });

  it('muestra el calendario como tabla con fechas pendientes', () => {
    renderizarPagina();

    const tabla = screen.getByRole('table', {
      name: /estructura del ciclo lectivo y mesas de examen final/i,
    });
    expect(within(tabla).getByText('1.er cuatrimestre')).toBeInTheDocument();
    expect(within(tabla).getByText('Receso')).toBeInTheDocument();
    expect(within(tabla).getByText('2.º cuatrimestre')).toBeInTheDocument();
    expect(within(tabla).getAllByText('PENDIENTE')).toHaveLength(10);
  });

  it('reemplaza las tarjetas por un listado desplegable con las diez preguntas de Edith', () => {
    renderizarPagina();

    for (const pregunta of PREGUNTAS_DE_EDITH) {
      expect(screen.getByRole('button', { name: pregunta })).toHaveAttribute(
        'aria-expanded',
        'false',
      );
    }
  });

  it('abre las respuestas desplegables al hacer clic', () => {
    renderizarPagina();

    fireEvent.click(screen.getByRole('button', { name: '¿Cómo me inscribo a los finales?' }));

    expect(screen.getByText(/exclusivamente por SIU-Guaraní/)).toBeInTheDocument();
  });

  it('muestra el mensaje de proceso en las respuestas sin validar', () => {
    renderizarPagina();

    fireEvent.click(
      screen.getByRole('button', { name: '¿A qué correo escribo para contactar a Bedelía?' }),
    );

    expect(screen.getByText(RESPUESTA_PENDIENTE)).toBeInTheDocument();
  });

  it('mantiene el enlace a todas las preguntas', () => {
    renderizarPagina();

    expect(screen.getByRole('link', { name: 'Ver todas las preguntas' })).toHaveAttribute(
      'href',
      '/faq',
    );
  });
});
