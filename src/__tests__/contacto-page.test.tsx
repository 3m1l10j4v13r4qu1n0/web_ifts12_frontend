import { screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ContactoPage from '../pages/ContactoPage';
import { renderConRouter } from '../test-utils';

function renderizarPagina() {
  return renderConRouter(<ContactoPage />, { ruta: '/contacto' });
}

describe('ContactoPage', () => {
  it('muestra breadcrumb, título y bajada del diseño', () => {
    renderizarPagina();

    const nav = screen.getByRole('navigation', { name: 'Ruta de navegación' });
    expect(within(nav).getByRole('link', { name: 'Inicio' })).toHaveAttribute('href', '/');
    expect(within(nav).getByText('Contacto')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: 'Contacto' })).toBeInTheDocument();
    expect(
      screen.getByText(
        /Consultas generales, de ingreso y de tutorías\. También podés usar la consulta directa/,
      ),
    ).toBeInTheDocument();
  });

  it('muestra el formulario Escribinos con asunto y privacidad', () => {
    renderizarPagina();

    const formulario = screen.getByRole('region', { name: 'Escribinos' });
    expect(within(formulario).getByText('Campos obligatorios marcados con *.')).toBeInTheDocument();
    expect(within(formulario).getByLabelText('Nombre y apellido')).toBeInTheDocument();
    expect(within(formulario).getByLabelText('Correo electrónico')).toBeInTheDocument();
    expect(within(formulario).getByLabelText('Asunto')).toBeInTheDocument();
    expect(within(formulario).getByLabelText('Mensaje')).toBeInTheDocument();
    expect(
      within(formulario).getByRole('checkbox', { name: /política de privacidad/i }),
    ).toBeInTheDocument();
    expect(within(formulario).getByRole('button', { name: 'Enviar consulta' })).toBeInTheDocument();
    expect(within(formulario).getByRole('button', { name: 'Limpiar' })).toBeInTheDocument();

    const opciones = within(formulario).getByLabelText('Asunto').querySelectorAll('option');
    expect(Array.from(opciones).map((opcion) => opcion.textContent)).toEqual([
      'Seleccionar asunto',
      'Consulta general',
      'Ingreso',
      'Tutorías',
    ]);
  });

  it('muestra los datos institucionales con correo y teléfono como mensajes de proceso', () => {
    renderizarPagina();

    expect(
      screen.getByRole('heading', { level: 2, name: 'Datos institucionales' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Misiones 26, C1083 ABB, CABA')).toBeInTheDocument();
    expect(screen.getByText('Horario de atención: exclusivamente nocturno.')).toBeInTheDocument();
    expect(
      screen.getByText('El correo institucional se publica cuando esté disponible.'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('El teléfono de contacto se publica cuando esté disponible.'),
    ).toBeInTheDocument();
  });

  it('muestra la ubicación con el mapa y el enlace como pendientes', () => {
    renderizarPagina();

    expect(screen.getByRole('heading', { level: 2, name: 'Ubicación' })).toBeInTheDocument();
    expect(
      screen.getByText('El mapa de ubicación se publica cuando esté disponible.'),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cómo llegar' })).toBeDisabled();
    expect(
      screen.getByText('El enlace al mapa externo se publica cuando esté disponible.'),
    ).toBeInTheDocument();
  });

  it('muestra las tres preguntas frecuentes de contacto', () => {
    renderizarPagina();

    expect(
      screen.getByRole('heading', { level: 2, name: 'Preguntas frecuentes de contacto' }),
    ).toBeInTheDocument();

    const botones = screen.getAllByRole('button');
    const preguntas = [
      '¿A qué correo escribo para consultas de ingreso?',
      '¿Dónde pido constancias o certificados?',
      '¿Cómo contacto al equipo de tutorías?',
    ];
    for (const pregunta of preguntas) {
      expect(botones.some((boton) => boton.textContent?.includes(pregunta))).toBe(true);
    }
  });
});
